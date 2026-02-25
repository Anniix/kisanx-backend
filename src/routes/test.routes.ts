import { Router } from "express";
import { protect, farmerOnly, customerOnly } from "../middleware/auth.middleware";

const router = Router();

// Any logged-in user
router.get("/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed ✅",
    user: (req as any).user
  });
});

// Farmer only
router.get("/farmer", protect, farmerOnly, (req, res) => {
  res.json({ message: "Farmer route accessed 🌾" });
});

// Customer only
router.get("/customer", protect, customerOnly, (req, res) => {
  res.json({ message: "Customer route accessed 🛒" });
});

export default router;
