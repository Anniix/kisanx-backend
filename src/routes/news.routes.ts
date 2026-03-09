import { Router, Request, Response } from "express";
import { protect, farmerOnly } from "../middleware/auth.middleware";

const router = Router();

const STATIC_DATA = {
  mandi: [
    { id: "m1", crop: "Wheat (गहू)", market: "Mumbai APMC", price: "₹2,900 - ₹5,000", unit: "Quintal", date: "09 March 2026" },
    { id: "m2", crop: "Rice (तांदूळ)", market: "Mumbai APMC", price: "₹6,000 - ₹10,200", unit: "Quintal", date: "09 March 2026" },
    { id: "m3", crop: "Soybean (सोयाबीन)", market: "Latur", price: "₹5,241 - ₹5,345", unit: "Quintal", date: "09 March 2026" },
    { id: "m4", crop: "Tur (तूर - Red)", market: "Akola", price: "₹7,000 - ₹8,175", unit: "Quintal", date: "09 March 2026" },
    { id: "m5", crop: "Onion (कांदा)", market: "Pune (Pimpri)", price: "₹1,100 - ₹1,600", unit: "Quintal", date: "09 March 2026" },
    { id: "m6", crop: "Cotton (कापूस)", market: "Akola", price: "₹25,700 - ₹25,900", unit: "29mm Bale", date: "09 March 2026" }
  ],
  schemes: [
    { id: "s1", title: "Punyashlok Ahilyadevi Holkar Karjmafi (₹2 Lakh Loan Waiver)", link: "https://krishi.maharashtra.gov.in/", badge: "Maharashtra Special" },
    { id: "s2", title: "PM-Kisan Samman Nidhi (₹6000 Yearly)", link: "https://pmkisan.gov.in/", badge: "Central Govt" },
    { id: "s3", title: "Free Electricity for Pumps (Up to 7.5 HP)", link: "https://www.mahadiscom.in/", badge: "New Policy" },
    { id: "s4", title: "Pradhan Mantri Fasal Bima Yojana (Crop Insurance)", link: "https://pmfby.gov.in/", badge: "Insurance" }
  ],
  news: [
    {
      id: "n1",
      title: "Maharashtra Budget 2026: ₹2 Lakh farm loan waiver announced",
      content: "Chief Minister announced a major relief package including a crop loan waiver up to ₹2 lakh and a ₹20,000 crore electricity bill waiver for pump users to support rural Maharashtra.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400",
      source: "KisanX News",
      date: "09 March 2026",
      url: "https://krishi.maharashtra.gov.in/"
    }
  ]
};

router.get("/", protect, farmerOnly, async (req: Request, res: Response) => {
  res.json(STATIC_DATA);
});

export default router;