import { Router, Request, Response } from "express"; // Added Request and Response types
import jwt from "jsonwebtoken";
import User from "../models/User";
import Order from "../models/Order"; 
import Product from "../models/Product";
import { protect } from "../middleware/auth.middleware";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs"; 

const router = Router();
// ✨ Temporary storage for registration OTPs
const otpStore: { [key: string]: { otp: string, expires: number } } = {};

// 📧 Helper: Send Mail
const sendEmailOTP = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { 
      user: process.env.EMAIL_USER, // e.g. saniya122400@gmail.com
      pass: process.env.EMAIL_PASS  // e.g. joan vdzz dhzw lxeg
    }
  });

  await transporter.sendMail({
    from: `"KisanX Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "KisanX Email Verification Code",
    text: `Aapka verification code hai: ${otp}. Ye 10 minutes ke liye valid hai.`
  });
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

    await sendEmailOTP(email.toLowerCase(), otp);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
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

    // Security: Bina verification ke registration nahi hoga
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

// FORGOT PASSWORD (Email focus + Simulation for Phone)
router.post("/forgot-password", async (req: Request, res: Response) => { // Added explicit types
  const { contact, method } = req.body; 
  try {
    const user = await User.findOne({ 
        $or: [{ email: contact }, { phone: contact }] 
    });
    
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[contact] = { otp, expires: Date.now() + 600000 }; 

    if (method === "email") {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { 
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASS  
        }
      });

      await transporter.sendMail({
        from: `"KisanX Support" <${process.env.EMAIL_USER}>`,
        to: contact,
        subject: "Password Reset OTP",
        text: `Your OTP for KisanX password reset is: ${otp}`
      });
    } else {
      console.log(`[SIMULATION] SMS Sent to ${contact}: Your OTP is ${otp}`);
    }

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// RESET PASSWORD
router.post("/reset-password", async (req: Request, res: Response) => { // Added explicit types
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
      // 🧑‍🌾 Farmer: Sirf Delivered products ka count sales mein aayega
      const farmerProducts = await Product.find({ farmerId: req.user.id });
      const productIds = farmerProducts.map(p => p._id);
      
      salesOrOrdersCount = await Order.countDocuments({ 
        "items.productId": { $in: productIds },
        orderStatus: "Delivered" 
      });
    } else {
      // 🛒 Customer: Unke total orders (except cancelled)
      salesOrOrdersCount = await Order.countDocuments({ 
        userId: req.user.id, 
        orderStatus: { $ne: "Cancelled" } 
      });
    }

    // Points aur count ke saath response bhejein
    res.json({ 
      ...user.toObject(), 
      orderCount: salesOrOrdersCount, 
      points: user.points || 0 
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

router.put("/update", protect, async (req: any, res: Response) => { // Added explicit types
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select("-password");
    res.json({ message: "Success", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
});

// ✨ NEW: DELETE USER ROUTE
router.delete("/delete-user/:id", protect, async (req: any, res: Response) => {
  try {
    const userIdToDelete = req.params.id;
    // Simple security: Ensure user can only delete themselves
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