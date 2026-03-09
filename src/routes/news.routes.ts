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
      image: "https://images.unsplash.com/photo-1509391366360-fe5bb658582f?w=400",
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
      image: "https://images.unsplash.com/photo-1514632595863-60838b44744b?w=400",
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
      image: "https://images.unsplash.com/photo-1454165833467-13524899616d?w=400",
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