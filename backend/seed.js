const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const PageContent = require("./models/PageContent");
const Blog = require("./models/Blog");
const Category = require("./models/Category");
const HireRequest = require("./models/HireRequest");
const User = require("./models/User");
const Testimonial = require("./models/Testimonial");

const seedDatabase = async () => {
  try {
    const connStr = process.env.MONGODB_URI;
    console.log(`[MongoDB Seeder]: Connecting to Atlas Cluster...`);
    await mongoose.connect(connStr);
    console.log(`[MongoDB Connected]: ${mongoose.connection.host}`);

    // 1. Seed Page Contents
    console.log("Seeding Page Content collection...");
    await PageContent.deleteMany({});
    await PageContent.insertMany([
      {
        pageKey: "home",
        pageTitle: "Home Page",
        path: "/",
        heroHeadline: "We connect events with vetted ushers & crew — instantly.",
        heroSubheading: "The all-in-one platform for event organizers to find vetted, reliable, and professional ushers & crew in minutes across Kenya.",
        metaTitle: "Event Ushers — Premium Vetted Ushers & Crew Matching Platform",
        metaDescription: "We connect events with vetted ushers & crew instantly. Hire corporate hostesses, event security, and technical staff in Nairobi, Mombasa & Kisumu.",
        customContent: {
          heroBadgeText: "EASY AND QUICK HIRE",
          heroImageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
          organizerCount: "250+",
          usherCount: "1,500+",
          projectCount: "350+",
          cityCount: "18+",
          supportStaffCount: "500+",
          aboutSectionBadge: "WHY CHOOSE EVENT USHERS",
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
        pageKey: "about",
        pageTitle: "About Us Page",
        path: "/about",
        heroHeadline: "The Crew Connect-Hub for Unforgettable Events",
        heroSubheading: "Empowering event organizers with vetted hospitality talent and seamless protocol support.",
        metaTitle: "About Us — Event Ushers",
        metaDescription: "Learn about Event Ushers mission, vision, and staffing benchmarks across Kenya.",
        customContent: {
          missionStatement: "To transform every event experience across Africa through smart matching technology, top-tier vetted talent, and unyielding commitment to hospitality excellence.",
          visionStatement: "To become the leading digital infrastructure for event staffing, talent management, and hospitality logistics across Africa and beyond.",
        },
      },
      {
        pageKey: "contact",
        pageTitle: "Contact Us Page",
        path: "/contact",
        heroHeadline: "Get in Touch with Our Staffing Coordinators",
        heroSubheading: "Have questions about hiring ushers, event security, or technical crew for your upcoming event? We are available 24/7.",
        metaTitle: "Contact Us — Event Ushers Staffing",
        metaDescription: "Get in touch with Event Ushers staffing coordinators in Nairobi, Mombasa, and Kisumu.",
        customContent: {
          phone: "+254 (0) 700 EVENT CREW",
          email: "info@eventushers.co.ke",
          officeAddress: "Westlands Commercial Center, Ring Road, Westlands, Nairobi, Kenya",
          workingHours: "Monday - Saturday: 8:00 AM - 8:00 PM (Emergency 24/7 Dispatch)",
          instagramUrl: "https://instagram.com/eventushers",
          facebookUrl: "https://facebook.com/eventushers",
          twitterUrl: "https://twitter.com/eventushers",
          linkedinUrl: "https://linkedin.com/company/eventushers",
        },
      },
    ]);

    // 2. Seed Categories
    console.log("Seeding Categories collection...");
    await Category.deleteMany({});
    await Category.insertMany([
      { name: "Guest Services & Hostesses", slug: "guest-services", description: "Polished corporate hostesses for ushering & VIP check-in", count: 42 },
      { name: "VIP Protocol & Security", slug: "event-security", description: "Bouncers, bodyguards, and crowd control personnel", count: 28 },
      { name: "Technical & AV Crew", slug: "technical-staff", description: "Stage managers, sound technicians, and lighting engineers", count: 19 },
      { name: "Media & Photography", slug: "photography-media", description: "Event photographers, videographers, and drone operators", count: 15 },
    ]);

    // 3. Seed Inbound Hire / Contact Requests
    console.log("Seeding Hire Requests & Contact collection...");
    await HireRequest.deleteMany({});
    await HireRequest.insertMany([
      {
        type: "contact_inquiry",
        fullName: "Kamau Njuguna",
        email: "kamau@innovatekenya.co.ke",
        phone: "+254 712 345 678",
        eventType: "Corporate Tech Summit",
        crewCount: "20-50 Staff & Security",
        location: "KICC Nairobi",
        notes: "Inquiring about 15 hostesses and 5 VIP security bouncers for our annual tech summit at KICC Nairobi.",
        status: "Pending",
      },
      {
        type: "contact_inquiry",
        fullName: "Amina Hassan",
        email: "amina@mombasagalas.com",
        phone: "+254 733 987 654",
        eventType: "Gala & Award Ceremony",
        crewCount: "5-20 Crew Members",
        location: "Nyali Beach Resort Mombasa",
        notes: "Looking for 10 hostess ushers dressed in formal black gowns for an evening award ceremony.",
        status: "Replied",
      },
    ]);

    // 4. Seed Blogs
    console.log("Seeding Blogs collection...");
    await Blog.deleteMany({});
    await Blog.insertMany([
      {
        title: "How Event Ushers Support Staff Members Across Kenya",
        slug: "how-event-ushers-support-staff-members-across-kenya",
        category: "Staffing & Logistics",
        excerpt: "Explore how standardized onboarding, protocol training, and digital payout tracking empower our crew members.",
        content: "Standardized onboarding and protocol training empower our crew members to deliver world-class event hospitality across Nairobi, Mombasa, and Kisumu.",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
        author: "Event Ushers Editorial",
        date: "October 14, 2026",
        published: true,
      },
      {
        title: "How Event Ushers Connects Organizers with the Perfect Crew",
        slug: "how-event-ushers-connects-organizers-with-the-perfect-crew",
        category: "Technology",
        excerpt: "Learn how real-time location matching, verified identity checks, and automated scheduling eliminate event staffing headaches.",
        content: "Real-time location matching and identity verification ensure fast dispatch of qualified event staff.",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
        author: "Wanjiru Mwangi",
        date: "October 02, 2026",
        published: true,
      },
    ]);

    // 5. Seed Testimonials
    console.log("Seeding Testimonials collection...");
    await Testimonial.deleteMany({});
    await Testimonial.insertMany([
      {
        customerName: "Wanjiru Mwangi",
        designation: "Head of Corporate Events",
        companyName: "Innovate Africa Tech Summit",
        quote: "Event Ushers saved our 1,200-delegate tech summit in Nairobi! Their hostesses were exceptionally punctual, polished, and handled check-ins with zero queue delays. Highly recommended!",
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
        quote: "We needed 15 vetted protocol security officers and 10 ushers for a high-profile festival in Mombasa on short notice. Event Ushers dispatched the full crew in less than 12 hours. Outstanding service!",
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

    console.log("✅ [MongoDB Seeder Complete]: All Collections Created & Seeded Successfully in Atlas!");
    process.exit(0);
  } catch (err) {
    console.error("❌ [MongoDB Seeder Error]:", err);
    process.exit(1);
  }
};

seedDatabase();
