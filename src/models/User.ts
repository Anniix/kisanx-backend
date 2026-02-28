import mongoose, { Schema, Document, Query } from "mongoose";
import bcrypt from "bcryptjs";
import Product from "./Product";

/* ================= USER INTERFACE ================= */

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  role: "customer" | "farmer";
  profilePic?: string;
  farmName?: string;
  location?: string;
  points: number;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

/* ================= USER SCHEMA ================= */

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["customer", "farmer"], default: "customer" },
    profilePic: { type: String, default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
    farmName: { type: String, default: "" },
    location: { type: String, default: "" },
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* ================= MIDDLEWARES ================= */

// ✅ CASCADE DELETE: Farmer ke saare products delete karo
userSchema.pre("findOneAndDelete", async function (this: any, next: any) {
  try {
    const user = await this.model.findOne(this.getQuery());
    if (user && user.role === "farmer") {
      await Product.deleteMany({ farmerId: user._id });
      console.log(`🗑️ Deleted all products for farmer: ${user.firstName}`);
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

// ✅ PASSWORD HASH FIX: genSalt() pehle, phir hash() — double hashing band
userSchema.pre("save", async function (this: any, next: any) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);          // ✅ Step 1: salt banao
    this.password = await bcrypt.hash(this.password, salt); // ✅ Step 2: hash karo
    next();
  } catch (error: any) {
    next(error);
  }
});

/* ================= METHODS ================= */

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;