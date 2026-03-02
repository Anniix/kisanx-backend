import { Router, Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";
import { protect, farmerOnly } from "../middleware/auth.middleware";

const router = Router();

// 📰 1. Real-Time News Fetcher
const fetchLiveNews = async () => {
  try {
    const API_KEY = process.env.NEWS_API_KEY; 
    const url = `https://newsapi.org/v2/everything?q=agriculture+India+farming&language=hi&sortBy=publishedAt&apiKey=${API_KEY}`;
    
    // ✨ FIX: AxiosResponse type add kiya gaya hai
    const res: AxiosResponse = await axios.get(url);
    
    // NewsAPI ke structure ke mutabik articles map karein
    return res.data.articles.map((a: any, index: number) => ({
      id: `news-${index}`,
      title: a.title,
      summary: a.description,
      content: a.content || a.description,
      image: a.urlToImage || "https://via.placeholder.com/400",
      source: a.source.name,
      date: new Date(a.publishedAt).toLocaleDateString(),
      url: a.url
    }));
  } catch (error) {
    console.error("News API Error:", error);
    return [];
  }
};

// 🏛️ 2. Web Scraper for Schemes
const scrapeSchemes = async () => {
  try {
    // ✨ FIX: AxiosResponse type yahan bhi add kiya gaya hai
    const response: AxiosResponse = await axios.get("https://agricoop.nic.in/en/major-schemes");
    const html = response.data;
    const $ = cheerio.load(html);
    const schemes: any[] = [];

    $("table tr").each((i, el) => {
      const title = $(el).find("td").eq(1).text().trim();
      const link = $(el).find("a").attr("href");
      
      if (title && title.length > 5) {
        schemes.push({
          id: `scheme-${i}`,
          title: title,
          details: "Click to view official government notification.",
          link: link?.startsWith("http") ? link : `https://agricoop.nic.in${link}`,
          badge: "Govt Scheme"
        });
      }
    });
    return schemes.slice(0, 10);
  } catch (error) {
    console.error("Scraping Error:", error);
    return [{ id: "s1", title: "PM-Kisan Scheme", details: "Check official portal for updates.", link: "https://pmkisan.gov.in/", badge: "Manual Update" }];
  }
};

// 🚀 Main Route
// ✨ FIX: Request aur Response types add kiye gaye hain
router.get("/", protect, farmerOnly, async (req: Request, res: Response) => {
  try {
    const [news, schemes] = await Promise.all([fetchLiveNews(), scrapeSchemes()]);
    res.json({ news, schemes });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

export default router;