const mongoose = require("mongoose");
const dns = require("dns");

// Use Google/Cloudflare DNS for resolving MongoDB Atlas SRV records on Windows
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/eventushers";
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`[MongoDB Atlas Connected]: ${conn.connection.host}`);

    // Auto-seed initial collections if empty
    const PageContent = require("../models/PageContent");
    const Category = require("../models/Category");
    const HireRequest = require("../models/HireRequest");

    const pageCount = await PageContent.countDocuments();
    if (pageCount === 0) {
      await PageContent.insertMany([
        {
          pageKey: "home",
          pageTitle: "Home Page",
          path: "/",
          heroHeadline: "We connect events with vetted ushers & crew — instantly.",
          heroSubheading: "The all-in-one platform for event organizers to find vetted ushers & crew.",
          customContent: { heroBadgeText: "EASY AND QUICK HIRE", organizerCount: "250+", usherCount: "1,500+" },
        },
        {
          pageKey: "contact",
          pageTitle: "Contact Us Page",
          path: "/contact",
          heroHeadline: "Get in Touch with Our Staffing Coordinators",
          heroSubheading: "Have questions about hiring ushers?",
          customContent: { phone: "+254 (0) 700 EVENT CREW", email: "info@eventushers.co.ke" },
        },
      ]);
      console.log("[MongoDB Auto-Seed]: Created 'pagecontents' collection in Atlas.");
    }

    const catCount = await Category.countDocuments();
    if (catCount === 0) {
      await Category.insertMany([
        { name: "Guest Services & Hostesses", slug: "guest-services", count: 42 },
        { name: "VIP Protocol & Security", slug: "event-security", count: 28 },
      ]);
      console.log("[MongoDB Auto-Seed]: Created 'categories' collection in Atlas.");
    }

    const User = require("../models/User");
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create({
        name: "Admin Manager",
        email: "admin@eventushers.com",
        password: "admin123",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      });
      console.log("[MongoDB Auto-Seed]: Created 'users' collection with default Admin in Atlas.");
    }
  } catch (error) {
    console.warn(`[MongoDB Warning]: ${error.message}. Running in offline fallback mode.`);
  }
};

module.exports = connectDB;
