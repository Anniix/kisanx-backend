import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Order from "../models/Order"; 
import Product from "../models/Product";
import { protect } from "../middleware/auth.middleware";
import { Resend } from "resend"; // Resend import kiya gaya
import bcrypt from "bcryptjs"; 

const router = Router();

// Resend Configuration (API Key aapke image se li gayi hai)
const resend = new Resend(process.env.RESEND_API_KEY || "re_EBvBdw1Q_2M98Bcyq3vmzNPJzZkEads93");

// ✨ Temporary storage for registration OTPs
const otpStore: { [key: string]: { otp: string, expires: number } } = {};

// 📧 Helper: Send Mail using Resend
const sendEmailOTP = async (email: string, otp: string, subject: string) => {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Aap apna verified domain yahan daal sakte hain
      to: email,
      subject: subject,
      html: `<p>Aapka KisanX verification code hai: <strong>${otp}</strong>. Ye 10 minutes ke liye valid hai.</p>`
    });
  } catch (error) {
    console.error("Resend Error:", error);
    throw new Error("Email sending failed");
  }
};

// 1️⃣ ROUTE: SEND OTP (For Registration)
router.post("/send-registration-otp", async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email.toLowerCase()] = { otp, expires: Date.now() + 600000 };

    await sendEmailOTP(email.toLowerCase(), otp, "KisanX Email Verification Code");
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log("OTP Error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// 2️⃣ ROUTE: VERIFY OTP (For Registration)
router.post("/verify-registration-otp", async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const record = otpStore[email.toLowerCase()];

  if (record && record.otp === otp && record.expires > Date.now()) {
    delete otpStore[email.toLowerCase()];
    res.json({ success: true, message: "Email verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }
});

// 3️⃣ ROUTE: REGISTER
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, phone, role, address, farmName, location, isVerified } = req.body;

    if (!isVerified) return res.status(400).json({ message: "Please verify your email first" });

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      firstName, lastName, email: email.toLowerCase(), password, phone, role, address, farmName, location
    });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });
    res.status(201).json({ token, user: { id: user._id, firstName: user.firstName, role: user.role } });
  } catch (error: any) {
    res.status(500).json({ message: "Registration failed" });
  }
});

// LOGIN
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });
      res.json({ token, user: { id: user._id, firstName: user.firstName, role: user.role } });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

// FORGOT PASSWORD
router.post("/forgot-password", async (req: Request, res: Response) => {
  const { contact, method } = req.body; 
  try {
    const user = await User.findOne({ 
        $or: [{ email: contact }, { phone: contact }] 
    });
    
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[contact] = { otp, expires: Date.now() + 600000 }; 

    if (method === "email") {
      // Nodemailer ki jagah Resend helper use kiya
      await sendEmailOTP(contact, otp, "KisanX Password Reset OTP");
    } else {
      console.log(`[SIMULATION] SMS Sent to ${contact}: Your OTP is ${otp}`);
    }

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// RESET PASSWORD
router.post("/reset-password", async (req: Request, res: Response) => {
  const { contact, otp, newPassword } = req.body;
  const record = otpStore[contact];

  if (!record || record.otp !== otp || record.expires < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP. Password not changed." });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    await User.findOneAndUpdate(
        { $or: [{ email: contact }, { phone: contact }] }, 
        { password: hashedPassword }
    );

    delete otpStore[contact];
    res.json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update password" });
  }
});

// ME ROUTE
router.get("/me", protect, async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    let salesOrOrdersCount = 0;

    if (user.role === "farmer") {
      const farmerProducts = await Product.find({ farmerId: req.user.id });
      const productIds = farmerProducts.map(p => p._id);
      
      salesOrOrdersCount = await Order.countDocuments({ 
        "items.productId": { $in: productIds },
        orderStatus: "Delivered" 
      });
    } else {
      salesOrOrdersCount = await Order.countDocuments({ 
        userId: req.user.id, 
        orderStatus: { $ne: "Cancelled" } 
      });
    }

    res.json({ 
      ...user.toObject(), 
      orderCount: salesOrOrdersCount, 
      points: user.points || 0 
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

router.put("/update", protect, async (req: any, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select("-password");
    res.json({ message: "Success", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
});

// DELETE USER ROUTE
router.delete("/delete-user/:id", protect, async (req: any, res: Response) => {
  try {
    const userIdToDelete = req.params.id;
    if (req.user.id !== userIdToDelete) {
      return res.status(403).json({ message: "Access denied. You can only delete your own account." });
    }

    await User.findByIdAndDelete(userIdToDelete);
    res.json({ message: "User account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user account" });
  }
});

export default router;