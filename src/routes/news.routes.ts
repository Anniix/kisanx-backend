import { Router, Request, Response } from "express";
import { protect, farmerOnly } from "../middleware/auth.middleware";

const router = Router();

const STATIC_DATA = {
mandi: [
    // --- VEGETABLES (35) ---
    { id: "v1", crop: "Tomato", category: "vegetables", market: "Nasik", price: "₹30 - ₹35", unit: "kg", date: "09 March 2026" },
    { id: "v2", crop: "Potato", category: "vegetables", market: "Pune", price: "₹20 - ₹25", unit: "kg", date: "09 March 2026" },
    { id: "v3", crop: "Onion", category: "vegetables", market: "Lasalgaon", price: "₹25 - ₹30", unit: "kg", date: "09 March 2026" },
    { id: "v4", crop: "Cauliflower", category: "vegetables", market: "Mumbai", price: "₹40 - ₹50", unit: "kg", date: "09 March 2026" },
    { id: "v5", crop: "Cabbage", category: "vegetables", market: "Nagpur", price: "₹22 - ₹28", unit: "kg", date: "09 March 2026" },
    { id: "v6", crop: "Spinach (Palak)", category: "vegetables", market: "Thane", price: "₹18 - ₹22", unit: "kg", date: "09 March 2026" },
    { id: "v7", crop: "Brinjal (Long)", category: "vegetables", market: "Pune", price: "₹32 - ₹38", unit: "kg", date: "09 March 2026" },
    { id: "v8", crop: "Brinjal (Round)", category: "vegetables", market: "Pune", price: "₹35 - ₹42", unit: "kg", date: "09 March 2026" },
    { id: "v9", crop: "Lady Finger", category: "vegetables", market: "Mumbai", price: "₹50 - ₹60", unit: "kg", date: "09 March 2026" },
    { id: "v10", crop: "Bottle Gourd", category: "vegetables", market: "Nasik", price: "₹25 - ₹35", unit: "kg", date: "09 March 2026" },
    { id: "v11", crop: "Bitter Gourd", category: "vegetables", market: "Nagpur", price: "₹55 - ₹65", unit: "kg", date: "09 March 2026" },
    { id: "v12", crop: "Ridge Gourd", category: "vegetables", market: "Pune", price: "₹40 - ₹50", unit: "kg", date: "09 March 2026" },
    { id: "v13", crop: "Green Chilli", category: "vegetables", market: "Mumbai", price: "₹65 - ₹75", unit: "kg", date: "09 March 2026" },
    { id: "v14", crop: "Ginger", category: "vegetables", market: "Satara", price: "₹110 - ₹130", unit: "kg", date: "09 March 2026" },
    { id: "v15", crop: "Garlic", category: "vegetables", market: "Mumbai", price: "₹170 - ₹190", unit: "kg", date: "09 March 2026" },
    { id: "v16", crop: "Capsicum (G)", category: "vegetables", market: "Pune", price: "₹60 - ₹70", unit: "kg", date: "09 March 2026" },
    { id: "v17", crop: "Capsicum (R/Y)", category: "vegetables", market: "Mumbai", price: "₹140 - ₹160", unit: "kg", date: "09 March 2026" },
    { id: "v18", crop: "Carrot (Org)", category: "vegetables", market: "Nasik", price: "₹35 - ₹45", unit: "kg", date: "09 March 2026" },
    { id: "v19", crop: "Carrot (Red)", category: "vegetables", market: "Pune", price: "₹45 - ₹55", unit: "kg", date: "09 March 2026" },
    { id: "v20", crop: "Radish", category: "vegetables", market: "Nagpur", price: "₹22 - ₹28", unit: "kg", date: "09 March 2026" },
    { id: "v21", crop: "Cucumber", category: "vegetables", market: "Thane", price: "₹30 - ₹40", unit: "kg", date: "09 March 2026" },
    { id: "v22", crop: "French Beans", category: "vegetables", market: "Mumbai", price: "₹85 - ₹95", unit: "kg", date: "09 March 2026" },
    { id: "v23", crop: "Green Peas", category: "vegetables", market: "Pune", price: "₹75 - ₹85", unit: "kg", date: "09 March 2026" },
    { id: "v24", crop: "Beetroot", category: "vegetables", market: "Nasik", price: "₹40 - ₹50", unit: "kg", date: "09 March 2026" },
    { id: "v25", crop: "Sweet Potato", category: "vegetables", market: "Nagpur", price: "₹35 - ₹45", unit: "kg", date: "09 March 2026" },
    { id: "v26", crop: "Drumstick", category: "vegetables", market: "Mumbai", price: "₹100 - ₹120", unit: "kg", date: "09 March 2026" },
    { id: "v27", crop: "Pumpkin", category: "vegetables", market: "Pune", price: "₹18 - ₹22", unit: "kg", date: "09 March 2026" },
    { id: "v28", crop: "Pointed Gourd", category: "vegetables", market: "Mumbai", price: "₹55 - ₹65", unit: "kg", date: "09 March 2026" },
    { id: "v29", crop: "Ivy Gourd", category: "vegetables", market: "Thane", price: "₹35 - ₹45", unit: "kg", date: "09 March 2026" },
    { id: "v30", crop: "Colocasia", category: "vegetables", market: "Nagpur", price: "₹40 - ₹50", unit: "kg", date: "09 March 2026" },
    { id: "v31", crop: "Mushroom", category: "vegetables", market: "Mumbai", price: "₹190 - ₹210", unit: "kg", date: "09 March 2026" },
    { id: "v32", crop: "Coriander", category: "vegetables", market: "Nasik", price: "₹12 - ₹18", unit: "kg", date: "09 March 2026" },
    { id: "v33", crop: "Mint Leaves", category: "vegetables", market: "Pune", price: "₹8 - ₹12", unit: "kg", date: "09 March 2026" },
    { id: "v34", crop: "Broccoli", category: "vegetables", market: "Mumbai", price: "₹130 - ₹150", unit: "kg", date: "09 March 2026" },
    { id: "v35", crop: "Zucchini", category: "vegetables", market: "Pune", price: "₹110 - ₹130", unit: "kg", date: "09 March 2026" },

    // --- FRUITS (30) ---
    { id: "f1", crop: "Mango (Alphonso)", category: "fruits", market: "Ratnagiri", price: "₹440 - ₹460", unit: "kg", date: "09 March 2026" },
    { id: "f2", crop: "Mango (Kesar)", category: "fruits", market: "Junagadh", price: "₹240 - ₹260", unit: "kg", date: "09 March 2026" },
    { id: "f3", crop: "Mango (Dasheri)", category: "fruits", market: "Mumbai", price: "₹110 - ₹130", unit: "kg", date: "09 March 2026" },
    { id: "f4", crop: "Apple (Kashmiri)", category: "fruits", market: "Delhi", price: "₹135 - ₹145", unit: "kg", date: "09 March 2026" },
    { id: "f5", crop: "Apple (Shimla)", category: "fruits", market: "Mumbai", price: "₹155 - ₹165", unit: "kg", date: "09 March 2026" },
    { id: "f6", crop: "Banana (Robusta)", category: "fruits", market: "Jalgaon", price: "₹38 - ₹42", unit: "kg", date: "09 March 2026" },
    { id: "f7", crop: "Banana (Elaichi)", category: "fruits", market: "Mumbai", price: "₹75 - ₹85", unit: "kg", date: "09 March 2026" },
    { id: "f8", crop: "Grapes (Green)", category: "fruits", market: "Nasik", price: "₹85 - ₹95", unit: "kg", date: "09 March 2026" },
    { id: "f9", crop: "Grapes (Black)", category: "fruits", market: "Nasik", price: "₹120 - ₹140", unit: "kg", date: "09 March 2026" },
    { id: "f10", crop: "Orange (Nagpur)", category: "fruits", market: "Nagpur", price: "₹65 - ₹75", unit: "kg", date: "09 March 2026" },
    { id: "f11", crop: "Mosambi", category: "fruits", market: "Pune", price: "₹60 - ₹70", unit: "kg", date: "09 March 2026" },
    { id: "f12", crop: "Pomegranate", category: "fruits", market: "Ahmednagar", price: "₹170 - ₹190", unit: "kg", date: "09 March 2026" },
    { id: "f13", crop: "Watermelon", category: "fruits", market: "Nagpur", price: "₹18 - ₹22", unit: "kg", date: "09 March 2026" },
    { id: "f14", crop: "Muskmelon", category: "fruits", market: "Mumbai", price: "₹40 - ₹50", unit: "kg", date: "09 March 2026" },
    { id: "f15", crop: "Papaya", category: "fruits", market: "Pune", price: "₹35 - ₹45", unit: "kg", date: "09 March 2026" },
    { id: "f16", crop: "Guava", category: "fruits", market: "Nasik", price: "₹55 - ₹65", unit: "kg", date: "09 March 2026" },
    { id: "f17", crop: "Pineapple", category: "fruits", market: "Mumbai", price: "₹75 - ₹85", unit: "kg", date: "09 March 2026" },
    { id: "f18", crop: "Chickoo", category: "fruits", market: "Palghar", price: "₹50 - ₹60", unit: "kg", date: "09 March 2026" },
    { id: "f19", crop: "Pear", category: "fruits", market: "Shimla", price: "₹100 - ₹120", unit: "kg", date: "09 March 2026" },
    { id: "f20", crop: "Kiwi", category: "fruits", market: "Mumbai", price: "₹340 - ₹360", unit: "kg", date: "09 March 2026" },
    { id: "f21", crop: "Dragon Fruit", category: "fruits", market: "Pune", price: "₹210 - ₹230", unit: "kg", date: "09 March 2026" },
    { id: "f22", crop: "Strawberry", category: "fruits", market: "Mahabaleshwar", price: "₹390 - ₹410", unit: "kg", date: "09 March 2026" },
    { id: "f23", crop: "Plum", category: "fruits", market: "Nasik", price: "₹140 - ₹160", unit: "kg", date: "09 March 2026" },
    { id: "f24", crop: "Custard Apple", category: "fruits", market: "Pune", price: "₹90 - ₹110", unit: "kg", date: "09 March 2026" },
    { id: "f25", crop: "Litchi", category: "fruits", market: "Mumbai", price: "₹190 - ₹210", unit: "kg", date: "09 March 2026" },
    { id: "f26", crop: "Tender Coconut", category: "fruits", market: "Mumbai", price: "₹45 - ₹55", unit: "unit", date: "09 March 2026" },
    { id: "f27", crop: "Dry Coconut", category: "fruits", market: "Nagpur", price: "₹32 - ₹38", unit: "unit", date: "09 March 2026" },
    { id: "f28", crop: "Peach", category: "fruits", market: "Nasik", price: "₹120 - ₹140", unit: "kg", date: "09 March 2026" },
    { id: "f29", crop: "Apricot", category: "fruits", market: "Mumbai", price: "₹240 - ₹260", unit: "kg", date: "09 March 2026" },
    { id: "f30", crop: "Cherry", category: "fruits", market: "Kashmir", price: "₹490 - ₹510", unit: "kg", date: "09 March 2026" },

    // --- GRAINS & PULSES (25) ---
    { id: "g1", crop: "Wheat (Sharbati)", category: "grains", market: "Sehore", price: "₹3,150 - ₹3,250", unit: "Quintal", date: "09 March 2026" },
    { id: "g2", crop: "Wheat (Lokwan)", category: "grains", market: "Akola", price: "₹2,750 - ₹2,850", unit: "Quintal", date: "09 March 2026" },
    { id: "g3", crop: "Rice (Basmati)", category: "grains", market: "Amritsar", price: "₹8,400 - ₹8,600", unit: "Quintal", date: "09 March 2026" },
    { id: "g4", crop: "Rice (Kolam)", category: "grains", market: "Gondia", price: "₹5,400 - ₹5,600", unit: "Quintal", date: "09 March 2026" },
    { id: "g5", crop: "Rice (Indrayani)", category: "grains", market: "Pune", price: "₹5,900 - ₹6,100", unit: "Quintal", date: "09 March 2026" },
    { id: "g6", crop: "Rice (Sona Masoori)", category: "grains", market: "Mumbai", price: "₹5,100 - ₹5,300", unit: "Quintal", date: "09 March 2026" },
    { id: "g7", crop: "Bajra", category: "grains", market: "Beed", price: "₹2,350 - ₹2,450", unit: "Quintal", date: "09 March 2026" },
    { id: "g8", crop: "Jowar", category: "grains", market: "Solapur", price: "₹3,450 - ₹3,550", unit: "Quintal", date: "09 March 2026" },
    { id: "g9", crop: "Ragi", category: "grains", market: "Satara", price: "₹2,950 - ₹3,050", unit: "Quintal", date: "09 March 2026" },
    { id: "g10", crop: "Maize", category: "grains", market: "Sangli", price: "₹2,050 - ₹2,150", unit: "Quintal", date: "09 March 2026" },
    { id: "g11", crop: "Toor Dal", category: "grains", market: "Akola", price: "₹10,900 - ₹11,100", unit: "Quintal", date: "09 March 2026" },
    { id: "g12", crop: "Moong Dal", category: "grains", market: "Latur", price: "₹9,400 - ₹9,600", unit: "Quintal", date: "09 March 2026" },
    { id: "g13", crop: "Moong (Whole)", category: "grains", market: "Nagpur", price: "₹8,400 - ₹8,600", unit: "Quintal", date: "09 March 2026" },
    { id: "g14", crop: "Chana Dal", category: "grains", market: "Jalna", price: "₹6,400 - ₹6,600", unit: "Quintal", date: "09 March 2026" },
    { id: "g15", crop: "Kabuli Chana", category: "grains", market: "Indore", price: "₹11,900 - ₹12,100", unit: "Quintal", date: "09 March 2026" },
    { id: "g16", crop: "Urad Dal", category: "grains", market: "Mumbai", price: "₹10,400 - ₹10,600", unit: "Quintal", date: "09 March 2026" },
    { id: "g17", crop: "Masoor Dal", category: "grains", market: "Nagpur", price: "₹7,400 - ₹7,600", unit: "Quintal", date: "09 March 2026" },
    { id: "g18", crop: "Rajma (Red)", category: "grains", market: "Delhi", price: "₹12,900 - ₹13,100", unit: "Quintal", date: "09 March 2026" },
    { id: "g19", crop: "Soyabean", category: "grains", market: "Latur", price: "₹4,750 - ₹4,850", unit: "Quintal", date: "09 March 2026" },
    { id: "g20", crop: "Groundnut", category: "grains", market: "Dhule", price: "₹6,900 - ₹7,100", unit: "Quintal", date: "09 March 2026" },
    { id: "g21", crop: "Mustard Seeds", category: "grains", market: "Rajasthan", price: "₹5,400 - ₹5,600", unit: "Quintal", date: "09 March 2026" },
    { id: "g22", crop: "Sunflower Seeds", category: "grains", market: "Solapur", price: "₹6,100 - ₹6,300", unit: "Quintal", date: "09 March 2026" },
    { id: "g23", crop: "Black Pepper", category: "grains", market: "Kochi", price: "₹54,500 - ₹55,500", unit: "Quintal", date: "09 March 2026" },
    { id: "g24", crop: "Turmeric (Raw)", category: "grains", market: "Sangli", price: "₹7,900 - ₹8,100", unit: "Quintal", date: "09 March 2026" },
    { id: "g25", crop: "Cumin Seeds", category: "grains", market: "Unjha", price: "₹34,500 - ₹35,500", unit: "Quintal", date: "09 March 2026" },

    // --- SPICES (10) ---
    { id: "p1", crop: "Turmeric", category: "spices", market: "Mumbai", price: "₹115 - ₹125", unit: "kg", date: "09 March 2026" },
    { id: "p2", crop: "Cumin (Jeera)", category: "spices", market: "Unjha", price: "₹340 - ₹360", unit: "kg", date: "09 March 2026" },
    { id: "p3", crop: "Dhania Powder", category: "spices", market: "Mumbai", price: "₹175 - ₹185", unit: "kg", date: "09 March 2026" },
    { id: "p4", crop: "Red Chilli", category: "spices", market: "Guntur", price: "₹210 - ₹230", unit: "kg", date: "09 March 2026" },
    { id: "p5", crop: "Black Pepper", category: "spices", market: "Kerala", price: "₹590 - ₹610", unit: "kg", date: "09 March 2026" },
    { id: "p6", crop: "Elaichi", category: "spices", market: "Idukki", price: "₹1,750 - ₹1,850", unit: "kg", date: "09 March 2026" },
    { id: "p7", crop: "Cinnamon", category: "spices", market: "Mumbai", price: "₹440 - ₹460", unit: "kg", date: "09 March 2026" },
    { id: "p8", crop: "Cloves", category: "spices", market: "Chennai", price: "₹890 - ₹910", unit: "kg", date: "09 March 2026" },
    { id: "p9", crop: "Mustard Seeds", category: "spices", market: "Jaipur", price: "₹90 - ₹100", unit: "kg", date: "09 March 2026" },
    { id: "p10", crop: "Fenugreek", category: "spices", market: "Pune", price: "₹105 - ₹115", unit: "kg", date: "09 March 2026" },
  ],
  schemes: [
    // --- MAHARASHTRA STATE SCHEMES ---
    { id: "s1", title: "Punyashlok Ahilyadevi Holkar Karjmafi (₹2 Lakh Loan Waiver)", link: "https://krishi.maharashtra.gov.in/", badge: "New Budget 2026" },
    { id: "s2", title: "Namo Shetkari Mahasanman Nidhi (Extra ₹6000 Yearly)", link: "https://nsmny.maharashtra.gov.in/", badge: "State Bonus" },
    { id: "s3", title: "Magel Tyala Shettale (Individual Farm Pond Subsidy)", link: "https://mahadbt.maharashtra.gov.in/", badge: "Irrigation" },
    { id: "s4", title: "Gopinath Munde Shetkari Apghat Suraksha (Accident Insurance)", link: "https://www.myscheme.gov.in/schemes/gopinath-munde-shetkari-apghat-suraksha-sanugrah-audhan-yojana", badge: "Insurance" },
    { id: "s5", title: "Chief Minister Sustainable Agriculture Irrigation Scheme", link: "https://www.myscheme.gov.in/schemes/chief-minister-sustainable-agriculture-irrigation-scheme", badge: "Water Supply" },
    { id: "s6", title: "Maharashtra Natural Farming Mission (5 Lakh Hectares Target)", link: "https://krishi.maharashtra.gov.in/", badge: "Organic" },
    { id: "s7", title: "Mukhyamantri Majhi Ladki Bahin Yojana (₹1500 for Farm Women)", link: "https://ladkibahin.maharashtra.gov.in/", badge: "Women Welfare" },

    // --- CENTRAL GOVERNMENT SCHEMES ---
    { id: "s8", title: "PM-Kisan Samman Nidhi (₹6000 Yearly Support)", link: "https://pmkisan.gov.in/", badge: "Central Govt" },
    { id: "s9", title: "Pradhan Mantri Fasal Bima Yojana (Affordable Insurance)", link: "https://pmfby.gov.in/", badge: "Crop Safety" },
    { id: "s10", title: "PM-Kusum: Solar Pump Subsidy (Up to 90% Support)", link: "https://mnre.gov.in/en/pradhan-mantri-kisan-urja-suraksha-evam-utthaan-mahabhiyaan-pm-kusum/", badge: "Solar Energy" },
    { id: "s11", title: "Soil Health Card Scheme (Free Testing & Fertilizers)", link: "https://soilhealth.dac.gov.in/", badge: "Soil Health" },
    { id: "s12", title: "Paramparagat Krishi Vikas Yojana (PKVY Organic Support)", link: "https://tractorkarvan.com/blog/top-central-government-schemes-for-farmers-in-india", badge: "Eco-Friendly" },
    { id: "s13", title: "PM Krishi Sinchayee Yojana (Per Drop More Crop)", link: "https://pmksy.gov.in/", badge: "Micro-Irrigation" },
    { id: "s14", title: "Kisan Credit Card (KCC) - Low Interest Loans", link: "https://www.digitalindia.gov.in/initiative/pm-kisan/", badge: "Agri Credit" },
    { id: "s15", title: "PM Kisan MaanDhan Yojana (Pension for Farmers)", link: "https://maandhan.in/", badge: "Pension" }
  ],
news: [
    {
      id: "n1",
      title: "Maharashtra Budget 2026: ₹2 Lakh tak ka Karjmafi (Loan Waiver) Elan",
      content: "CM Devendra Fadnavis ne budget 2026 mein kisanon ke liye ₹2 lakh tak ke karj maaf karne ka bada elan kiya hai. Isse lagbhag 30 lakh kisanon ko fayda hoga.",
      image: "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?w=400",
      source: "KisanX News",
      date: "06 March 2026",
      url: "https://www.thehindu.com/news/national/maharashtra/maharashtra-budget-2026-27-devendra-fadnavis-highlights/article70710286.ece"
    },
    {
      id: "n2",
      title: "PM-Kisan 22nd Installment: 13 March ko aa sakte hain ₹2000",
      content: "Sarkari sources ke mutabik, PM-Kisan ki 22vi kist March ke dusre hafte mein transfer ki jayegi. e-KYC aur Farmer ID hona ab anivarya hai.",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400",
      source: "Outlook Money",
      date: "09 March 2026",
      url: "https://www.outlookmoney.com/news/pm-kisan-22nd-instalment-date-farmers-likely-to-receive-rs-2000-soon"
    },
    {
      id: "n3",
      title: "Natural Farming: 5 Lakh Hectare par hogi Prakritik Kheti",
      content: "Maharashtra sarkar ne chemical-free kheti ko badhava dene ke liye 5 lakh hectare zameen par natural farming mission shuru kiya hai.",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400",
      source: "Drishti IAS",
      date: "09 March 2026",
      url: "https://www.drishtiias.com/state-pcs-current-affairs/maharashtra-budget-2026-27"
    },
    {
      id: "n4",
      title: "Solar Power Update: Kisanon ko milegi Muft Bijli",
      content: "Budget mein ₹20,000 crore solar projects ke liye diye gaye hain, taaki kisanon ko din mein muft aur bharosemand bijli mil sake.",
      image: "https://australianpremiumsolar.co.in/wp-content/uploads/2025/07/july-blog-img-10-1-1.jpg",
      source: "ET News",
      date: "07 March 2026",
      url: "https://m.economictimes.com/news/india/maharashtra-budget-2026-fadnavis-announces-crop-loan-waiver-up-to-rs-2-lakh-for-farmers-mukhyamantri-majhi-ladki-bahin-yojana/articleshow/129145958.cms"
    },
    {
      id: "n5",
      title: "Agri-Tech Revolution: AI Tools se badhegi paidavar",
      content: "Union Budget 2026 mein 'Bharat-VISTAAR' AI platform launch kiya gaya hai jo kisanon ko unki bhasha mein mausam aur fasal ki sahi salah dega.",
      image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=400",
      source: "DD News",
      date: "01 March 2026",
      url: "https://ddnews.gov.in/en/indias-next-agricultural-revolution-will-be-ai-driven-jitendra-singh/"
    },
    {
      id: "n6",
      title: "Regular Re-payers Bonus: ₹50,000 ka Protsahan",
      content: "Jo kisan apna karj samay par chukate hain, unhe Maharashtra sarkar ₹50,000 ka extra incentive degi.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400",
      source: "The Hindu",
      date: "06 March 2026",
      url: "https://www.thehindu.com/news/national/maharashtra/maharashtra-budget-2026-27-devendra-fadnavis-highlights/article70710286.ece"
    },
    {
      id: "n7",
      title: "Onion Market: Export ban hatne se Mandi mein tezi",
      content: "Onion export se pabdandi hatne ke baad Lasalgaon aur Pune mandi mein pyaz ke bhav mein ₹500/quintal ka uchhal dekha gaya hai.",
      image: "https://images.unsplash.com/photo-1508313880080-c4bef0730395?w=400",
      source: "KisanX Market",
      date: "08 March 2026",
      url: "https://enam.gov.in"
    },
    {
      id: "n8",
      title: "Drone Subsidy: Kisanon ko 50% tak ki choot",
      content: "Pest control ke liye drones kharidne par sarkari anudan ab chote kisanon ke liye badhakar 50% kar diya gaya hai.",
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=400",
      source: "Mitra Agri",
      date: "11 February 2026",
      url: "https://mitraweb.in/blogs/future-agriculture-technology-in-india-2026-trends/"
    },
    {
      id: "n9",
      title: "Mausam Update: West India mein 'Above Normal' barish ki sambhavna",
      content: "IMD ne forecast kiya hai ki Vidarbha aur Konkan region mein is saal monsoon samanya se behtar rahega.",
      image: "data:image/jpeg;base64,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",
      source: "Weather Dept",
      date: "08 March 2026",
      url: "https://mausam.imd.gov.in/"
    },
    {
      id: "n10",
      title: "Wheat Procurement: Record 5 Lakh Tonne ki kharid",
      content: "Madhya Pradesh aur Maharashtra mein Sharbati gehu ki kharid ne naye record banaye hain. MSP par kharid tezi se jari hai.",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
      source: "Agri Market",
      date: "09 March 2026",
      url: "https://agricoop.nic.in"
    },
    {
      id: "n11",
      title: "Krishi Rakshak Helpline: 14447 par payein bima sahayata",
      content: "Ab kisan fasal bima se judi shikayatein naye helpline number 14447 par call karke turant suljha sakte hain.",
      image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=400",
      source: "PMFBY Portal",
      date: "05 March 2026",
      url: "https://pmfby.gov.in/"
    },
    {
      id: "n12",
      title: "AgriStack: Naya 'Farmer ID' bana anivarya",
      content: "Sabhi sarkari yojnaon ka labh lene ke liye kisanon ko AgriStack portal par apni unique Farmer ID register karani hogi.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv4WxfdWjXZrM104h_SbFKfFXpxa5r-OffeA&s",
      source: "PIB India",
      date: "06 March 2026",
      url: "https://pib.gov.in"
    },
    {
      id: "n13",
      title: "Organic Certification: Muft milenge certificate",
      content: "PKVY yojna ke antargat organic farming karne wale kisanon ko ab certification ki koi fees nahi deni hogi.",
      image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=400",
      source: "Krishi Vigyan",
      date: "02 March 2026",
      url: "https://vajiramandravi.com/current-affairs/agriculture-schemes-in-india/"
    },
    {
      id: "n14",
      title: "Smart Irrigation: IoT sensors se 30% paani ki bachat",
      content: "Nayi technology wale soil moisture sensors kisanon ko unke phone par batate hain ki kab aur kitna paani dena hai.",
      image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=400",
      source: "Farmonaut",
      date: "15 February 2026",
      url: "https://farmonaut.com/asia/agriculture-india-updates-new-2026-trends-news"
    },
    {
      id: "n15",
      title: "E-NAM Update: Mandi mein cashless transactions badhe",
      content: "Ab kisan apni fasal ka bhugtan seedhe bank account mein pa rahe hain, jisse vyapariyon ki dhokhadhadi kam hui hai.",
      image: "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=400",
      source: "Market Watch",
      date: "08 March 2026",
      url: "https://www.enam.gov.in/"
    }
  ]
};

router.get("/", protect, farmerOnly, async (req: Request, res: Response) => {
  res.json(STATIC_DATA);
});

export default router;