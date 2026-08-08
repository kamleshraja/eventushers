const mongoose = require("mongoose");
const dns = require("dns");

// Use Google/Cloudflare DNS for resolving MongoDB Atlas SRV records on Windows
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) { }

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/africrew";
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 8000,
    });
    const hostName = conn.connection?.host || mongoose.connection?.host || "connected";
    console.log(`[MongoDB Atlas Connected]: ${hostName}`);

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
          customContent: {
            heroBadgeText: "EASY AND QUICK HIRE",
            organizerCount: "250+",
            usherCount: "1,500+",
            aboutSectionBadge: "WHY CHOOSE AFRICREW",
            aboutSectionTitle: "Kenya's Premier Tech-Enabled Staffing Engine",
            aboutSectionDescription: "We bridge the gap between event organizers and background-checked, corporate-ready hospitality talent.",
            missionStatement: "To transform every event experience across Africa through smart matching technology, top-tier vetted talent, and unyielding commitment to hospitality excellence.",
            visionStatement: "To become the leading digital infrastructure for event staffing, talent management, and hospitality logistics across Africa and beyond.",
            missionTitle: "Empowering Event Organizers Daily",
            visionTitle: "Setting the Continental Standard",
            aboutImage1Url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
            aboutImage1Label: "Guest Hostesses",
            aboutImage2Url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
            aboutImage2Label: "On-Site Briefing",
            aboutImage3Url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
            aboutImage3Label: "Protocol & VIP Security",
            experienceBadgeYears: "5+",
            experienceBadgeTitle: "Years of Excellence",
            experienceBadgeSubtext: "500+ High-Profile Events Served",
            whyChooseUsHeading: "Why Event Organizers Choose Us",
            whyChooseUsItem1: "Vetted & Background Checked Crew",
            whyChooseUsItem2: "On-Demand Instant Staff Dispatch",
            whyChooseUsItem3: "Corporate Dress Code & Etiquette",
            whyChooseUsItem4: "Dedicated On-Site Supervisor",
            whyChooseUsItem5: "Punctuality & Reliability Guarantee",
            whyChooseUsItem6: "Seamless Digital Attendance Tracking",
            servicesSectionBadge: "OUR CORE SERVICES",
            servicesSectionTitle: "Comprehensive Staffing Solutions Tailored for Every Occasion",
            servicesSectionDescription: "From intimate private banquets to massive international expos, our vetted crew delivers flawless execution.",
          },
        },
        {
          pageKey: "contact",
          pageTitle: "Contact Us Page",
          path: "/contact",
          heroHeadline: "Get in Touch with Our Staffing Coordinators",
          heroSubheading: "Have questions about hiring ushers?",
          customContent: { phone: "+254 723 742739", email: "info@africrew.com" },
        },
        {
          pageKey: "about",
          pageTitle: "About Us Page",
          path: "/about",
          heroHeadline: "Connecting Events with Vetted Crew Across East Africa",
          heroSubheading: "afriCrew is Kenya's premier tech-enabled staffing platform. We bridge the gap between event organizers and background-checked, corporate-ready staff.",
          customContent: {
            missionStatement: "To transform every event experience across Africa through smart matching technology, top-tier vetted talent, and unyielding commitment to hospitality excellence.",
            visionStatement: "To become the leading digital infrastructure for event staffing, talent management, and hospitality logistics across East Africa and beyond.",
            storyHeading: "Our Journey in Event Staffing Logistics",
            storyContent: "Founded with a vision to professionalize event ushering across Kenya, afriCrew has grown from a local Nairobi network into East Africa's leading crew dispatch hub.",
            coreValue1: "Uncompromising Hospitality Excellence",
            coreValue2: "Verified Identity & Safety Protocols",
            coreValue3: "Transparent & Timely Crew Compensation",
            aboutHeroImageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
          },
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
        email: "admin@africrew.com",
        password: "admin123",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      });
      console.log("[MongoDB Auto-Seed]: Created 'users' collection with default Admin in Atlas.");
    }
    const Testimonial = require("../models/Testimonial");
    const testCount = await Testimonial.countDocuments();
    if (testCount === 0) {
      await Testimonial.insertMany([
        {
          customerName: "Wanjiru Mwangi",
          designation: "Head of Corporate Events",
          companyName: "Innovate Africa Tech Summit",
          quote: "afriCrew saved our 1,200-delegate tech summit in Nairobi! Their hostesses were exceptionally punctual, polished, and handled check-ins with zero queue delays. Highly recommended!",
          rating: 5,
          eventBadgeTitle: "1,200 Delegate Conference",
          profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
          isVerified: true,
          displayOrder: 1,
          status: "Active",
          createdBy: "System Seed",
          updatedBy: "System Seed",
        },
        {
          customerName: "James Ochieng",
          designation: "Festival Director",
          companyName: "AfroSound Music Festival",
          quote: "We needed 15 vetted protocol security officers and 10 ushers for a high-profile festival in Mombasa on short notice. afriCrew dispatched the full crew in less than 12 hours. Outstanding service!",
          rating: 5,
          eventBadgeTitle: "Outdoor Music Festival",
          profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
          isVerified: true,
          displayOrder: 2,
          status: "Active",
          createdBy: "System Seed",
          updatedBy: "System Seed",
        },
        {
          customerName: "David Kimani",
          designation: "Private Host",
          companyName: "Kimani Family Gala",
          quote: "The professionalism of the ushers at our daughter's wedding reception in Kisumu was unmatched. They welcomed guests with true warmth and ensured VIP tables were perfectly managed.",
          rating: 5,
          eventBadgeTitle: "VIP Wedding Reception",
          profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
          isVerified: true,
          displayOrder: 3,
          status: "Active",
          createdBy: "System Seed",
          updatedBy: "System Seed",
        },
      ]);
      console.log("[MongoDB Auto-Seed]: Created 'testimonials' collection in Atlas.");
    }
  } catch (error) {
    console.warn(`[MongoDB Warning]: ${error.message}. Running in offline fallback mode.`);
  }
};

module.exports = connectDB;
