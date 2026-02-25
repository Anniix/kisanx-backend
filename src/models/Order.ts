import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: any[];
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: "Online" | "COD";
  paymentStatus: "Pending" | "Paid" | "Completed" | "Failed";
  // ✨ Interface mein "Cancelled" add kiya
  orderStatus: "Pending" | "Placed" | "Dispatched" | "In-Transit" | "Delivered" | "Cancelled";
  trackingId: string;
  estimatedDelivery: Date;
  razorpayOrderId?: string;
}

const OrderSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ productId: { type: Schema.Types.ObjectId, ref: "Product" }, quantity: Number }],
  totalAmount: { type: Number, required: true },
  shippingAddress: { type: String, required: true },
  paymentMethod: { type: String, enum: ["Online", "COD"], default: "Online" },
  paymentStatus: { type: String, enum: ["Pending", "Paid", "Completed", "Failed"], default: "Pending" },
  // ✨ Schema enum mein "Cancelled" add kiya
  orderStatus: { 
    type: String, 
    enum: ["Pending", "Placed", "Dispatched", "In-Transit", "Delivered", "Cancelled"], 
    default: "Pending" 
  },
  trackingId: { type: String, default: () => `KX${Math.floor(Math.random() * 1000000)}` },
  razorpayOrderId: { type: String },
  estimatedDelivery: { type: Date, default: () => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) } 
}, { timestamps: true });

export default mongoose.model<IOrder>("Order", OrderSchema);