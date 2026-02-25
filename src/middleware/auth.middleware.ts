import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User"; // ✨ User model import karna zaroori hai

interface JwtPayload {
  id: string;
  role: "farmer" | "customer";
}

// 🔐 Verify Token and Fetch User
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // ✨ Database se fresh user data fetch karein taaki role hamesha sahi rahe
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    // attach fresh user info to request
    (req as any).user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// 🧑‍🌾 Farmer-only
export const farmerOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((req as any).user.role !== "farmer") {
    return res.status(403).json({ message: "Access denied: Farmers only" });
  }
  next();
};

// 🛒 Customer-only
export const customerOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // ✨ Check current user role from database data
  if ((req as any).user.role !== "customer") {
    return res.status(403).json({ message: "Access denied: Customers only" });
  }
  next();
};