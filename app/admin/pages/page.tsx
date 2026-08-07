"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { STORAGE_KEY, saveAllPagesToStorage } from "@/lib/pageContent";
import { API_BASE_URL } from "@/lib/api";
import {
  Globe,
  Edit3,
  ExternalLink,
  Sparkles,
  Check,
  Home,
  Info,
  Layers,
  PhoneCall,
  ShieldCheck,
  Users,
  BookOpen,
  HelpCircle,
  ArrowLeft,
  Save,
  CheckCircle2,
  Trash2,
  Plus,
  FileText,
  Lock,
  Scale
} from "lucide-react";

interface ManagedPage {
  key: string;
  title: string;
  path: string;
  description: string;
  icon: any;
  headline: string;
  subheading: string;
  metaTitle: string;
  metaDescription: string;
  customFields?: Record<string, string>;
}

export default function AdminPageManagerPage() {
  const [pages, setPages] = useState<ManagedPage[]>([
    {
      key: "home",
      title: "Home Page",
      path: "/",
      description: "Main landing page hero, trust highlights, KPI stats & core service previews",
      icon: Home,
      headline: "We connect events with vetted ushers & crew — instantly.",
      subheading: "The all-in-one platform for event organizers to find vetted, reliable, and professional ushers & crew in minutes across Kenya.",
      metaTitle: "Event Ushers — Premium Vetted Ushers & Crew Matching Platform",
      metaDescription: "We connect events with vetted ushers & crew instantly. Hire corporate hostesses, event security, and technical staff in Nairobi, Mombasa & Kisumu.",
      customFields: {
        siteLogoUrl: "/images/logo.jpeg",
        heroBadgeText: "EASY AND QUICK HIRE",
        heroImageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
        trustHighlight1: "100% Background Vetted",
        trustHighlight2: "Instant Replacement",
        trustHighlight3: "Corporate Protocol",
        heroRatingScore: "4.9 / 5",
        heroRatingSubtext: "500+ Verified Organizers",
        heroStatusAvatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        heroStatusTitle: "Lead Hostess Assigned",
        heroStatusLocation: "Nairobi, Kenya",
        heroStatusBadgeText: "DISPATCHED",
        aboutSectionBadge: "WHY CHOOSE EVENT USHERS",
        aboutSectionTitle: "Kenya's Premier Tech-Enabled Staffing Engine",
        aboutSectionDescription: "We bridge the gap between event organizers and background-checked, corporate-ready hospitality talent.",
        missionTabLabel: "Our Mission",
        visionTabLabel: "Our Vision",
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
        blogSectionBadge: "RECENT BLOG & NEWS",
        blogSectionTitle: "Checkout Our Latest Insights",
        blogSectionTitleHighlight: "Latest Insights",
        blogSectionDescription: "Stay updated with event staffing trends, industry tips, and success stories from our network.",
        testimonialsSectionBadge: "ORGANIZER TESTIMONIALS",
        testimonialsSectionTitle: "Trusted by Event Leaders Across Kenya",
        testimonialsSectionDescription: "Discover how event planners, corporate brands, and private hosts across Kenya achieve event success with our vetted crew.",
        howItWorksSectionBadge: "HOW IT WORKS",
        howItWorksSectionTitle: "Simple, Transparent & Fast Process",
        howItWorksSectionTitleHighlight: "Process",
        howItWorksSectionDescription: "Whether you are hosting an international summit or looking for your next hospitality shift, our platform streamlines every step.",
        howItWorksTab1Label: "For Organizers",
        howItWorksTab2Label: "For Professionals",
        howItWorksOrgStep1Title: "Post or Search",
        howItWorksOrgStep1Desc: "Describe your event or browse verified professionals by category, city, and availability.",
        howItWorksOrgStep2Title: "Compare & Shortlist",
        howItWorksOrgStep2Desc: "Review portfolios, ratings, past work, and instant quotations side by side.",
        howItWorksOrgStep3Title: "Book & Contract",
        howItWorksOrgStep3Desc: "Send a booking request, agree terms digitally, and confirm with secure payment.",
        howItWorksOrgStep4Title: "Show Day",
        howItWorksOrgStep4Desc: "Your crew arrives briefed, verified, and ready. Rate your experience afterward.",
        howItWorksProfStep1Title: "Create your Digital CV",
        howItWorksProfStep1Desc: "Build a portfolio showcasing your skills, experience, and past work.",
        howItWorksProfStep2Title: "Set Your Availability",
        howItWorksProfStep2Desc: "Control your calendar and the gigs you want to be considered for.",
        howItWorksProfStep3Title: "Receive Bookings",
        howItWorksProfStep3Desc: "Get discovered, negotiate quotations, and confirm jobs digitally.",
        howItWorksProfStep4Title: "Get Paid Securely",
        howItWorksProfStep4Desc: "Payment is protected and released on schedule — no chasing clients for weeks.",
        ctaSectionBadge: "READY TO ELEVATE YOUR NEXT EVENT?",
        ctaSectionTitle: "Get Top Vetted Crew On-Site in 24 Hours",
        ctaSectionDescription: "Join hundreds of event organizers and corporate hosts across Kenya who trust Event Ushers for flawless protocol, security, and hospitality.",
        ctaButtonText: "Hire Staff Now",
        organizerCount: "250+",
        organizerLabel: "Happy Event Organizers",
        organizerSubtext: "Corporate & private clients",
        usherCount: "1,500+",
        usherLabel: "Active Vetted Ushers",
        usherSubtext: "Ready for deployment",
        projectCount: "350+",
        projectLabel: "Projects Completed",
        projectSubtext: "Galas, expos & festivals",
        cityCount: "18+",
        cityLabel: "Cities Covered",
        citySubtext: "Across Kenya & East Africa",
        supportStaffCount: "500+",
        supportStaffLabel: "Trained Support Staff",
        supportStaffSubtext: "Security, AV & Hostesses",
      },
    },
    {
      key: "about",
      title: "About Us Page",
      path: "/about",
      description: "Company story, founding journey, mission & vision statements, and leadership team showcase",
      icon: Info,
      headline: "Connecting Events with Vetted Crew Across East Africa",
      subheading: "Event Ushers is Kenya's premier tech-enabled staffing platform. We bridge the gap between event organizers and background-checked, corporate-ready staff.",
      metaTitle: "About Us — Event Ushers Staffing Platform Kenya",
      metaDescription: "Discover our journey, mission, and leadership team elevating event hospitality across Nairobi, Mombasa, Kisumu, and East Africa.",
      customFields: {
        aboutHeroBadge: "ABOUT EVENT USHERS",
        primaryCtaText: "Hire Staff Now",
        primaryCtaUrl: "#hire",
        secondaryCtaText: "Join as Crew",
        secondaryCtaUrl: "#join",

        // Our Journey Section Module (Sections 1 to 4)
        ourJourneyStatus: "Active",
        ourJourneyDisplayOrder: "1",
        ourJourneyBadge: "OUR JOURNEY",
        ourJourneyHeading: "Built to Solve Event Staffing",
        ourJourneyHeadingHighlight: "Headaches",
        ourJourneyHighlightColor: "amber",
        ourJourneyIntro: "For years, event organizers across Kenya faced last-minute crew no-shows, unvetted staff, and inconsistent protocol standards. Event Ushers was launched to bring technology, trust, and accountability to event logistics.",
        ourJourneyExtraDescription: "Today, our digital hub empowers hundreds of organizers every month while providing structured employment, professional training, and digital payout tracking for ambitious crew members in Nairobi, Mombasa, Kisumu, and beyond.",
        
        // Mission & Vision
        defaultActiveTab: "mission",
        missionTabTitle: "Our Mission",
        missionStatement: "To transform every event experience across Africa through smart matching technology, top-tier vetted talent, and unyielding commitment to hospitality excellence.",
        missionIconUrl: "",
        visionTabTitle: "Our Vision",
        visionStatement: "To become the leading digital infrastructure for event staffing, talent management, and hospitality logistics across East Africa and beyond.",
        visionIconUrl: "",

        // Featured Image Card
        ourJourneyFeaturedImageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
        // Our Standards Section Module
        ourStandardsStatus: "Active",
        ourStandardsBadge: "OUR STANDARDS",
        ourStandardsHeading: "The Principles That",
        ourStandardsHeadingHighlight: "Drive Us",
        ourStandardsDescription: "We hold our platform and crew to the highest corporate standards in the African event industry.",
        
        standard1Title: "Vetted Integrity & Security",
        standard1Description: "Every usher and crew member undergoes multi-step identity verification, background screening, and corporate etiquette training before stepping onto your event floor.",
        standard2Title: "Instant 24-Hour Dispatch",
        standard2Description: "Our smart matching platform connects event hosts with qualified, local talent within 24 hours — eliminating last-minute staffing panics.",
        standard3Title: "Hospitality First",
        standard3Description: "We believe that warm greetings, professional seating management, and flawless VIP protocol transform good events into unforgettable experiences.",
        standard4Title: "Supervised Accountability",
        standard4Description: "Our dedicated on-site team leaders manage attendance, dress codes, and workflow coordination so event organizers can focus on their program.",

        // Leadership & Operations Team Module
        leadershipStatus: "Active",
        leadershipBadge: "LEADERSHIP & OPERATIONS",
        leadershipHeading: "Meet the Team Behind",
        leadershipHeadingHighlight: "Event Ushers",
        leadershipDescription: "Dedicated professionals committed to elevating hospitality standards across Kenya.",

        member1Name: "Wanjiru Mwangi",
        member1Role: "FOUNDER & CHIEF EXECUTIVE",
        member1Bio: "10+ years in corporate event management across East Africa. Passionate about empowering young professionals through standardized protocol training.",
        member1ImageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",

        member2Name: "David Kimani",
        member2Role: "HEAD OF OPERATIONS & LOGISTICS",
        member2Bio: "Oversees crew dispatch, venue logistics, and quality assurance across Nairobi, Mombasa, and Kisumu.",
        member2ImageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",

        member3Name: "Amina Ochieng",
        member3Role: "LEAD PROTOCOL & USHER TRAINER",
        member3Bio: "Certified hospitality specialist dedicated to training hostesses in VIP etiquette, registration software, and crowd flow management.",
        member3ImageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",

        // Photo Gallery Module
        galleryStatus: "Active",
        galleryBadge: "PHOTO GALLERY",
        galleryHeading: "Our Crew in",
        galleryHeadingHighlight: "Action",
        galleryDescription: "Highlights from recent galas, summits, and VIP events across East Africa.",

        gallery1Caption: "International Tech Summit • Nairobi",
        gallery1ImageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",

        gallery2Caption: "Corporate Gala Night • Westlands",
        gallery2ImageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",

        gallery3Caption: "On-Site Crew Briefing • Kisumu",
        gallery3ImageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",

        gallery4Caption: "VIP Protocol & Security • Mombasa",
        gallery4ImageUrl: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80",

        storyHeading: "Our Journey in Event Staffing Logistics",
        storyContent: "Founded with a vision to professionalize event ushering across Kenya, Event Ushers has grown from a local Nairobi network into East Africa's leading crew dispatch hub.",
        coreValue1: "Uncompromising Hospitality Excellence",
        coreValue2: "Verified Identity & Safety Protocols",
        coreValue3: "Transparent & Timely Crew Compensation",
        aboutHeroImageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      },
    },
    {
      key: "services",
      title: "Services Overview Page",
      path: "/services",
      description: "Full directory of staffing categories (Hostesses, Security, Technical AV, Media & Entertainers)",
      icon: Layers,
      headline: "Comprehensive Staffing Solutions Tailored for Every Occasion",
      subheading: "From intimate private banquets to massive international expos, our vetted crew delivers flawless execution.",
      metaTitle: "Event Staffing Services — Event Ushers",
      metaDescription: "Explore our vetted staffing categories: corporate hostesses, event security bouncers, AV technicians, and media crews.",
      customFields: {
        servicesHeroBadge: "EXPLORE CORE OFFERINGS",
        primaryCtaText: "Hire Staff Now",
        primaryCtaUrl: "#hire",
        secondaryCtaText: "Explore All Categories",
        secondaryCtaUrl: "#services-grid",
        servicesSectionTitle: "Our 6 Core Service Pillars",
        servicesSectionTitleHighlight: "Service Pillars",
        servicesSectionDescription: "Click any service category to inspect detailed specifications, deliverables, and booking options.",
        guaranteesBadge: "OUR PROMISE",
        guaranteesHeading: "Why Event Organizers Trust Our Crew",
        guaranteesHeadingHighlight: "Trust Our Crew",
        guaranteesDescription: "We eliminate staffing risks so you can run flawless events every single time.",
        guarantee1Title: "100% Vetted Personnel",
        guarantee1Description: "Background checks, ID verification, and corporate dress code compliance before dispatch.",
        guarantee2Title: "24-Hour Express Dispatch",
        guarantee2Description: "Emergency crew replacement and last-minute staffing fulfilled within 24 hours.",
        guarantee3Title: "On-Site Supervisors",
        guarantee3Description: "Dedicated team leader on-site at every major event to coordinate flow and attendance.",
        guarantee4Title: "Custom Uniform Options",
        guarantee4Description: "Formal suits, branded polo shirts, traditional attire, or theme-specific hostess outfits.",
      },
    },
    {
      key: "contact",
      title: "Contact Us Page",
      path: "/contact",
      description: "Corporate office locations, contact phone numbers, WhatsApp, email, and business hours",
      icon: PhoneCall,
      headline: "Get in Touch with Our Staffing Coordinators",
      subheading: "Have questions about hiring ushers, event security, or technical crew for your upcoming event? We are available 24/7.",
      metaTitle: "Contact Us — Event Ushers Staffing",
      metaDescription: "Get in touch with Event Ushers staffing coordinators in Nairobi, Mombasa, and Kisumu.",
      customFields: {
        contactHeroBadge: "24/7 EVENT CREW SUPPORT & INQUIRIES",
        headlineHighlight: "Staffing Coordinators",
        phone: "+254 (0) 700 EVENT CREW",
        email: "info@eventushers.co.ke",
        officeAddress: "Nairobi, Kenya",
        workingHours: "Monday - Saturday: 8:00 AM - 8:00 PM (Emergency 24/7 Dispatch)",
        instagramUrl: "https://www.instagram.com/africrew",
        instagramIconUrl: "",
        facebookUrl: "https://www.facebook.com/AfriCrew",
        facebookIconUrl: "",
        youtubeUrl: "https://www.youtube.com/@AfriCrew",
        youtubeIconUrl: "",
        tiktokUrl: "https://www.tiktok.com/@africrewhub",
        tiktokIconUrl: "",
        faqSectionBadge: "FREQUENTLY ASKED QUESTIONS",
        faqSectionTitle: "Got Questions? We Have Answers",
        faq1Question: "How quickly can Event Ushers assemble crew for last-minute requests?",
        faq1Answer: "Our real-time matching system can dispatch pre-vetted hostesses, security officers, and ushering crews in as little as 45 to 60 minutes across Nairobi and major Kenyan cities.",
        faq2Question: "Are all crew members background-checked and protocol trained?",
        faq2Answer: "Yes! 100% of our hostesses, protocol officers, and security personnel undergo background identity verification, corporate dress code orientation, VIP seating etiquette, and crowd de-escalation training.",
        faq3Question: "What happens if a booked crew member encounters a travel delay on event morning?",
        faq3Answer: "Our platform uses geo-fenced mobile check-ins 60 minutes prior to doors opening. If any crew member is delayed, our automated standby Engine dispatches pre-cleared reserve crew immediately.",
        faq4Question: "How do corporate invoicing and crew payments work?",
        faq4Answer: "We offer flexible invoicing terms for registered corporate clients (E-TIMS compliant). Crew members receive instant automated disbursements upon shift sign-off, ensuring maximum punctuality and morale.",
      },
    },
    {
      key: "blog",
      title: "Blog & Insights Page",
      path: "/blog",
      description: "Public blog directory header, featured article highlight, and category filter bar",
      icon: BookOpen,
      headline: "Event Industry Trends, Staffing Tips & Stories",
      subheading: "Stay ahead with expert insights on corporate protocol, venue crowd management, event tech innovations, and crew career growth.",
      metaTitle: "Event Industry Insights & News — Event Ushers",
      metaDescription: "Read the latest articles on event staffing logistics, venue management, and corporate protocol tips across Kenya.",
      customFields: {
        blogHeroBadge: "EVENT USHERS INSIGHTS & NEWS",
        headlineHighlight: "Stories",
      },
    },
    {
      key: "privacy-policy",
      title: "Privacy Policy Page",
      path: "/privacy-policy",
      description: "Legal data protection policy and privacy commitments",
      icon: ShieldCheck,
      headline: "Your Privacy & Trust Matter Most",
      subheading: "Last Updated: October 2026. Discover how Event Ushers collects, uses, and safeguards personal data for event organizers and crew members across Kenya.",
      metaTitle: "Privacy Policy — Event Ushers",
      metaDescription: "Event Ushers privacy policy and data security practices.",
      customFields: {
        privacyHeroBadge: "PRIVACY POLICY & DATA PROTECTION",
        headlineHighlight: "Matter Most",
        pillar1Title: "ODPC Compliant",
        pillar1Desc: "Fully compliant with Kenya Data Protection Act 2019 regulations.",
        pillar2Title: "Bank-Grade Encryption",
        pillar2Desc: "256-bit SSL encryption in transit & AES-256 data storage at rest.",
        pillar3Title: "Geo-Fence Transparency",
        pillar3Desc: "Location pings active strictly during shift verification windows.",
        pillar4Title: "Zero Data Selling",
        pillar4Desc: "We never sell, rent, or trade personal data to third-party advertisers.",
        overviewTitle: "1. Overview & Scope",
        overviewPara1: "Event Ushers Platform Ltd (\"Event Ushers\", \"we\", \"us\", or \"our\") operates the website and mobile crew management platform. This Privacy Policy outlines our procedures regarding the collection, storage, processing, disclosure, and protection of personal data under the Kenya Data Protection Act (2019) and international hospitality compliance benchmarks.",
        overviewPara2: "This policy applies to all users accessing our services, including event organizers booking staffing, event hostesses, protocol officers, security crew members, and website visitors.",
        collectTitle: "2. Information We Collect",
        collectIntro: "We collect information to deliver seamless matching, verified shift check-ins, automated digital payouts, and high-security venue management.",
        organizerCollectTitle: "For Event Organizers",
        organizerCollectItems: "Business & Contact Person Name\nCorporate Email & Phone Number\nVenue Location & Event Schedules\nBilling, KRA PIN & E-TIMS Invoicing Data",
        crewCollectTitle: "For Crew Members & Hostesses",
        crewCollectItems: "Full Name, National ID / Passport Copy\nPhone Number & M-Pesa Disbursement Account\nProfessional Headshots & Uniform Sizes\nGeo-Fenced Check-In GPS Coordinates",
        useDataTitle: "3. How We Use Your Personal Data",
        useDataIntro: "We process personal information strictly for legitimate operational purposes:",
        useDataPoint1Title: "Crew Allocation & Matching",
        useDataPoint1Desc: "Matching event venue requirements with qualified, verified crew roster members.",
        useDataPoint2Title: "Punctuality & Safety Verification",
        useDataPoint2Desc: "Geo-fenced mobile check-ins 60 minutes prior to doors opening to guarantee attendance.",
        useDataPoint3Title: "Digital Payroll Disbursements",
        useDataPoint3Desc: "Processing immediate after-event payouts via M-Pesa or direct bank APIs.",
        useDataPoint4Title: "Customer Support & Emergency Dispatch",
        useDataPoint4Desc: "Contacting organizers or crew supervisors during live events.",
        locationDataTitle: "4. Location Data & Geo-Fencing Transparency",
        locationDataPara: "To eliminate no-shows for high-profile summits, our mobile portal requests access to device GPS location during shift check-in windows.",
        locationDataNote: "Location tracking is only requested when a crew member initiates a shift check-in ping. We do NOT track background locations outside booked event shift hours.",
        securityTitle: "5. Data Security & Storage Standards",
        securitySubtext: "We employ industry-leading technical and organizational security measures to protect data against unauthorized access, loss, or alteration:",
        securityCard1Title: "Encrypted Storage",
        securityCard1Desc: "Database entries and uploaded ID documents are encrypted using AES-256 standard.",
        securityCard2Title: "TLS/SSL In Transit",
        securityCard2Desc: "All communications between browsers, mobile web apps, and servers are TLS encrypted.",
        rightsTitle: "6. Your Rights & Data Choices",
        rightsSubtext: "Under the Office of the Data Protection Commissioner (ODPC) Kenya, you possess the following rights:",
        rightsListItems: "Right to Access: Request a full copy of personal data stored in our system.\nRight to Rectification: Update inaccurate contact details or payment details.\nRight to Erasure (\"Right to be Forgotten\"): Request removal of your crew profile or organizer account.\nRight to Object: Opt out of marketing newsletters or non-essential communications anytime.",
        dpoBoxTitle: "Contact Our Data Protection Officer (DPO)",
        dpoBoxSubtext: "If you have any questions regarding this Privacy Policy, wish to exercise your data rights, or submit a data inquiry, please contact our privacy compliance team:",
        contactDPO: "dpo@eventushers.co.ke / privacy@eventushers.co.ke",
      },
    },
    {
      key: "terms",
      title: "Terms of Service Page",
      path: "/terms",
      description: "Terms of Service, client agreements, hostess dispatches, and cancellation policies",
      icon: Scale,
      headline: "Terms of Service",
      subheading: "Effective Date: October 2026. Standard terms governing event staffing bookings, hostess dispatches, crew payments, and platform usage across Kenya.",
      metaTitle: "Terms of Service — Event Ushers",
      metaDescription: "Terms of Service and client agreements for Event Ushers staffing services.",
      customFields: {
        termsHeroBadge: "TERMS OF SERVICE & CLIENT AGREEMENT",
        headlineHighlight: "Service",
        pillar1Title: "100% Attendance Guarantee",
        pillar1Desc: "Standby reserve dispatches ensure zero empty desks at your venue doors.",
        pillar2Title: "E-TIMS & KRA Compliant",
        pillar2Desc: "Transparent invoicing for corporate tax compliance across Kenya.",
        pillar3Title: "Flexible Cancellation",
        pillar3Desc: "No penalty for booking cancellations made 24 hours prior to event start.",
        pillar4Title: "Standardized Protocol",
        pillar4Desc: "Strict adherence to corporate dress code, grooming, and VIP etiquette.",
        scopeTitle: "1. Acceptance & Agreement Scope",
        scopePara1: "This Terms of Service agreement (\"Agreement\") is entered into by and between Event Ushers Platform Ltd (\"Event Ushers\", \"Platform\", \"we\", \"us\") and any person or corporate entity (\"Client\", \"Organizer\", \"You\") using our web applications, booking engine, or contracted crew personnel.",
        scopePara2: "By submitting a crew booking form, signing an event contract, or registering as an event usher, hostess, or security crew member, you agree to comply with all terms herein.",
        responsibilitiesTitle: "2. Client Responsibilities & Event Setup",
        responsibilitiesIntro: "To ensure flawless execution, Event Organizers agree to provide:",
        responsibilitiesItems: "Accurate Event Briefings: Venue details, shift call times, guest count estimates, and specific protocol requirements at least 24 hours prior to shift commencement.\nSafe Working Environment: Secure venue access, designated resting break areas for long shifts (6+ hours), and hydration stations.\nVenue Badging & Credentials: Timely issuance of accreditation passes or wristbands required for crew to access restricted guest zones.",
        slaTitle: "3. Service Level Agreement (SLA) & Headcount Guarantee",
        slaIntro: "We take pride in our 99.4% on-time attendance rating across Kenya. Our Service Level Guarantees include:",
        slaProtocolTitle: "The 60-Minute Pre-Door Protocol",
        slaProtocolText: "All booked hostesses, security personnel, and protocol officers must complete geo-fenced mobile check-in 60 minutes before guest doors open. If any crew member fails to check in 45 minutes prior, our automated standby engine dispatches pre-cleared reserve crew immediately at no extra charge.",
        ratesTitle: "4. Rates, Billing & Tax Invoicing",
        ratesIntro: "All financial transactions are conducted transparently in accordance with Kenyan tax laws:",
        ratesItems: "Quotations & Deposits: Written quotes are valid for 14 days. Corporate bookings require a 50% deposit upon contract signing to lock in crew availability.\nE-TIMS Tax Compliance: Event Ushers issues official KRA E-TIMS invoices for all corporate transactions.\nOvertime Hours: Shifts extending more than 30 minutes past agreed completion times are billed at standard hourly rates rounded to the nearest hour.",
        cancellationTitle: "5. Cancellation & Rescheduling Policy",
        cancellationIntro: "We understand that event timelines can change. Cancellation terms are structured as follows:",
        cancelGreenText: "More than 24 Hours Notice: 100% full refund or complimentary rescheduling to a new date.",
        cancelYellowText: "12 to 24 Hours Notice: 15% administrative processing fee applies; remaining balance fully credited.",
        cancelRedText: "Less than 12 Hours Notice: 30% crew mobilization fee retained to compensate assigned personnel who reserved their shift availability.",
        conductTitle: "6. Crew Code of Conduct & Etiquette",
        conductIntro: "All crew members admitted to the Event Ushers network are bound by strict professional standards:",
        conductItems: "Grooming & Attire: Immaculate corporate suit, formal dress, or custom branded uniform as specified by the client.\nZero Solicitation: Crew members are strictly prohibited from soliciting personal tips, side employment, or private contact details from event guests or clients.\nVIP Non-Disclosure (NDA): High-profile summits and private galas carry strict confidentiality. Photography of confidential VIP guest lists is strictly forbidden.",
        lawTitle: "7. Governing Law & Dispute Resolution",
        lawText: "This Agreement shall be governed by and construed in accordance with the Laws of the Republic of Kenya. Any disputes arising out of or in connection with this Agreement shall first be resolved through good-faith negotiation, or escalated to arbitration in Nairobi under the Nairobi Centre for International Arbitration (NCIA) rules.",
        legalBoxTitle: "Questions About Our Terms?",
        legalBoxSubtext: "If you have any questions regarding client contracts, E-TIMS billing, or crew terms, please contact our legal desk:",
        contactLegalEmail: "legal@eventushers.co.ke / support@eventushers.co.ke",
        legalOfficeAddress: "Event Ushers Platform Ltd, Westlands Commercial Plaza, 4th Floor, Nairobi, Kenya",
      },
    },
  ]);

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [headline, setHeadline] = useState("");
  const [subheading, setSubheading] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [customFields, setCustomFields] = useState<Record<string, string>>({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const loadPages = async () => {
      // 1. First sync with local storage if present
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setPages((prev) =>
              prev.map((p) => {
                const found = parsed.find((item: any) => item.key === p.key);
                return found
                  ? {
                    ...p,
                    headline: found.headline ?? p.headline,
                    subheading: found.subheading ?? p.subheading,
                    metaTitle: found.metaTitle ?? p.metaTitle,
                    metaDescription: found.metaDescription ?? p.metaDescription,
                    customFields: { ...p.customFields, ...found.customFields },
                  }
                  : p;
              })
            );
          } catch (e) { }
        }
      }

      // 2. Fetch fresh data from Express API database
      try {
        const res = await fetch(`${API_BASE_URL}/pages`, { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            const backendPages = json.data;
            setPages((prev) => {
              const updated = prev.map((p) => {
                const found = backendPages.find((item: any) => item.pageKey === p.key);
                return found
                  ? {
                    ...p,
                    headline: found.heroHeadline ?? p.headline,
                    subheading: found.heroSubheading ?? p.subheading,
                    metaTitle: found.metaTitle ?? p.metaTitle,
                    metaDescription: found.metaDescription ?? p.metaDescription,
                    customFields: { ...p.customFields, ...found.customContent },
                  }
                  : p;
              });

              // Also sync back to localStorage
              if (typeof window !== "undefined") {
                const serializable = updated.map(({ icon, ...rest }) => rest);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
              }

              return updated;
            });
          }
        }
      } catch (err) {
        console.warn("Failed to fetch fresh pages from API, relying on local/fallbacks.", err);
      }
    };

    loadPages();
  }, []);

  const selectedPage = pages.find((p) => p.key === activeKey) || null;

  const handleSelectPageForEditing = (pg: ManagedPage) => {
    setActiveKey(pg.key);
    setHeadline(pg.headline);
    setSubheading(pg.subheading);
    setMetaTitle(pg.metaTitle);
    setMetaDescription(pg.metaDescription);
    setCustomFields(pg.customFields || {});
    setSavedSuccess(false);
  };

  const handleSavePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPage) return;

    const updatedPages = pages.map((p) =>
      p.key === selectedPage.key
        ? {
          ...p,
          headline,
          subheading,
          metaTitle,
          metaDescription,
          customFields,
        }
        : p
    );

    setPages(updatedPages);

    // Save only serializable data (strip React component icons)
    const serializablePages = updatedPages.map(({ icon, ...rest }) => rest);
    saveAllPagesToStorage(serializablePages as any);

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2500);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title={selectedPage ? `Editing Page: ${selectedPage.title}` : "Page Content Manager"}
          subtitle={selectedPage ? `Direct inline editor for route ${selectedPage.path}` : "Manage static content, headlines, subheadings, and contact details for all site pages"}
        />

        <main className="p-6 md:p-8 space-y-6 flex-1">

          {/* Top Quick Page Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveKey(null)}
              className={`px-4 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${activeKey === null
                  ? "bg-slate-950 text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
            >
              All Pages View
            </button>

            {pages.map((pg) => {
              const isSelected = pg.key === activeKey;
              return (
                <button
                  key={pg.key}
                  onClick={() => handleSelectPageForEditing(pg)}
                  className={`px-4 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${isSelected
                      ? "bg-gradient-to-r from-amber-400 to-pink-500 text-white shadow-md shadow-pink-500/20"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                >
                  <span>{pg.title}</span>
                  <span className="opacity-70 font-mono">({pg.path})</span>
                </button>
              );
            })}
          </div>

          {/* VIEW MODE 1: ALL PAGES CARDS GRID */}
          {!selectedPage && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-950">Managed Public Site Pages</h3>
                  <p className="text-xs text-slate-500">Click any page card below to enter the full inline page editor</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pages.map((pg) => {
                  const Icon = pg.icon;
                  return (
                    <div
                      key={pg.key}
                      className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-xl transition-all"
                    >
                      <div className="space-y-3 text-left">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                            <Icon className="w-6 h-6" />
                          </div>
                          <Link
                            href={pg.path}
                            target="_blank"
                            className="text-xs font-bold text-slate-400 hover:text-amber-600 flex items-center gap-1 transition-colors"
                          >
                            <span>Preview ({pg.path})</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                        <div>
                          <h4 className="text-xl font-extrabold text-slate-950">{pg.title}</h4>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-1">{pg.description}</p>
                        </div>

                        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                          <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-widest">Active Headline:</span>
                          <p className="text-xs font-bold text-slate-900 line-clamp-2">"{pg.headline}"</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-slate-400">Route: {pg.path}</span>
                        <button
                          onClick={() => handleSelectPageForEditing(pg)}
                          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white text-xs font-extrabold shadow-md shadow-pink-500/20 hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-white" />
                          <span>Edit Page</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW MODE 2: DEDICATED INLINE FULL-PAGE EDITOR (NO POPUP) */}
          {selectedPage && (
            <div className="space-y-6 text-left animate-fadeIn">

              {/* Back Bar & Save Button Header */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveKey(null)}
                    className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to All Pages</span>
                  </button>

                  <div>
                    <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider">Editing Page Content</span>
                    <h2 className="text-2xl font-extrabold text-slate-950">{selectedPage.title}</h2>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <Link
                    href={selectedPage.path}
                    target="_blank"
                    className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Live Page Preview</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </Link>

                  <button
                    onClick={handleSavePage}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-xs shadow-md shadow-pink-500/20 hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4 text-white" />
                    <span>Save Page Changes</span>
                  </button>
                </div>
              </div>

              {savedSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Changes saved successfully! The updated page content is now live.</span>
                </div>
              )}

              {/* Main 2-Column Editor Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column: Editable Form Fields (8 Cols) */}
                <div className="lg:col-span-8 space-y-6">

                  {/* Render Custom Fields in Separate Grouped Cards */}
                  {customFields && Object.keys(customFields).length > 0 && (() => {
                    // Define field groups for clean separate cards
                    const groups: { title: string; icon: any; color: string; keys: string[]; isHeroGroup?: boolean; isSocialGroup?: boolean }[] = [
                      {
                        title: "Section 1: Hero Content",
                        icon: Sparkles,
                        color: "text-amber-500",
                        keys: [
                          "siteLogoUrl",
                          "servicesHeroBadge",
                          "blogHeroBadge",
                          "contactHeroBadge",
                          "privacyHeroBadge",
                          "termsHeroBadge",
                          "heroBadgeText",
                          "headlineHighlight",
                          "aboutHeroBadge",
                          "primaryCtaText",
                          "primaryCtaUrl",
                          "secondaryCtaText",
                          "secondaryCtaUrl",
                          "heroImageUrl",
                          "trustHighlight1",
                          "trustHighlight2",
                          "trustHighlight3",
                          "heroRatingScore",
                          "heroRatingSubtext",
                          "heroStatusAvatarUrl",
                          "heroStatusTitle",
                          "heroStatusLocation",
                          "heroStatusBadgeText"
                        ],
                        isHeroGroup: true,
                      },
                      {
                        title: "Platform Statistics & KPI Numbers",
                        icon: Globe,
                        color: "text-amber-600",
                        keys: [
                          "organizerCount",
                          "organizerLabel",
                          "organizerSubtext",
                          "usherCount",
                          "usherLabel",
                          "usherSubtext",
                          "projectCount",
                          "projectLabel",
                          "projectSubtext",
                          "cityCount",
                          "cityLabel",
                          "citySubtext",
                          "supportStaffCount",
                          "supportStaffLabel",
                          "supportStaffSubtext"
                        ],
                      },
                      {
                        title: "Section 3: About Us & Mission/Vision Section",
                        icon: Sparkles,
                        color: "text-amber-500",
                        keys: [
                          "aboutSectionBadge",
                          "aboutSectionTitle",
                          "aboutSectionDescription",
                          "missionTabLabel",
                          "visionTabLabel",
                          "missionTitle",
                          "missionStatement",
                          "visionTitle",
                          "visionStatement",
                          "aboutImage1Url",
                          "aboutImage1Label",
                          "aboutImage2Url",
                          "aboutImage2Label",
                          "aboutImage3Url",
                          "aboutImage3Label",
                          "experienceBadgeYears",
                          "experienceBadgeTitle",
                          "experienceBadgeSubtext",
                          "whyChooseUsHeading",
                          "whyChooseUsItem1",
                          "whyChooseUsItem2",
                          "whyChooseUsItem3",
                          "whyChooseUsItem4",
                          "whyChooseUsItem5",
                          "whyChooseUsItem6"
                        ],
                      },
                      {
                        title: "Section 4: Core Services Section",
                        icon: Layers,
                        color: "text-purple-500",
                        keys: [
                          "servicesSectionBadge",
                          "servicesSectionTitle",
                          "servicesSectionTitleHighlight",
                          "servicesSectionDescription"
                        ],
                      },
                      {
                        title: "Our Standards Management Module",
                        icon: ShieldCheck,
                        color: "text-amber-500",
                        keys: [
                          "ourStandardsBadge",
                          "ourStandardsHeading",
                          "ourStandardsHeadingHighlight",
                          "ourStandardsDescription",
                          "standard1Title",
                          "standard1Description",
                          "standard2Title",
                          "standard2Description",
                          "standard3Title",
                          "standard3Description",
                          "standard4Title",
                          "standard4Description",
                        ],
                      },
                      {
                        title: "Leadership & Operations Team Module",
                        icon: Users,
                        color: "text-amber-500",
                        keys: [
                          "leadershipBadge",
                          "leadershipHeading",
                          "leadershipHeadingHighlight",
                          "leadershipDescription",
                          "member1Name",
                          "member1Role",
                          "member1Bio",
                          "member1ImageUrl",
                          "member2Name",
                          "member2Role",
                          "member2Bio",
                          "member2ImageUrl",
                          "member3Name",
                          "member3Role",
                          "member3Bio",
                          "member3ImageUrl",
                        ],
                      },
                      {
                        title: "Photo Gallery Management Module",
                        icon: Sparkles,
                        color: "text-amber-500",
                        keys: [
                          "galleryBadge",
                          "galleryHeading",
                          "galleryHeadingHighlight",
                          "galleryDescription",
                          "gallery1Caption",
                          "gallery1ImageUrl",
                          "gallery2Caption",
                          "gallery2ImageUrl",
                          "gallery3Caption",
                          "gallery3ImageUrl",
                          "gallery4Caption",
                          "gallery4ImageUrl",
                        ],
                      },

                      {
                        title: "Section 3: Our Promise & Guarantees Module",
                        icon: ShieldCheck,
                        color: "text-amber-500",
                        keys: [
                          "guaranteesBadge",
                          "guaranteesHeading",
                          "guaranteesHeadingHighlight",
                          "guaranteesDescription",
                          "guarantee1Title",
                          "guarantee1Description",
                          "guarantee2Title",
                          "guarantee2Description",
                          "guarantee3Title",
                          "guarantee3Description",
                          "guarantee4Title",
                          "guarantee4Description",
                        ],
                      },


                      {
                        title: "Section 5: Organizer Testimonials Section Content",
                        icon: Sparkles,
                        color: "text-amber-600",
                        keys: ["testimonialsSectionBadge", "testimonialsSectionTitle", "testimonialsSectionDescription"],
                      },
                      {
                        title: "Section 6: How It Works Section Module",
                        icon: Sparkles,
                        color: "text-amber-500",
                        keys: [
                          "howItWorksSectionBadge",
                          "howItWorksSectionTitle",
                          "howItWorksSectionTitleHighlight",
                          "howItWorksSectionDescription",
                          "howItWorksTab1Label",
                          "howItWorksTab2Label",
                          "howItWorksOrgStep1Title",
                          "howItWorksOrgStep1Desc",
                          "howItWorksOrgStep2Title",
                          "howItWorksOrgStep2Desc",
                          "howItWorksOrgStep3Title",
                          "howItWorksOrgStep3Desc",
                          "howItWorksOrgStep4Title",
                          "howItWorksOrgStep4Desc",
                          "howItWorksProfStep1Title",
                          "howItWorksProfStep1Desc",
                          "howItWorksProfStep2Title",
                          "howItWorksProfStep2Desc",
                          "howItWorksProfStep3Title",
                          "howItWorksProfStep3Desc",
                          "howItWorksProfStep4Title",
                          "howItWorksProfStep4Desc"
                        ],
                      },
                      {
                        title: "Section 7: Insights & Recent Blog News Section",
                        icon: BookOpen,
                        color: "text-amber-500",
                        keys: [
                          "blogSectionBadge",
                          "blogSectionTitle",
                          "blogSectionTitleHighlight",
                          "blogSectionDescription"
                        ],
                      },
                      {
                        title: "Frequently Asked Questions (FAQ) Accordion",
                        icon: HelpCircle,
                        color: "text-amber-600",
                        keys: [
                          "faqSectionBadge",
                          "faqSectionTitle",
                          "faq1Question",
                          "faq1Answer",
                          "faq2Question",
                          "faq2Answer",
                          "faq3Question",
                          "faq3Answer",
                          "faq4Question",
                          "faq4Answer",
                        ],
                      },
                      {
                        title: "Contact Info & Social Media Links",
                        icon: PhoneCall,
                        color: "text-emerald-500",
                        isSocialGroup: true,
                        keys: [
                          "phone",
                          "email",
                          "officeAddress",
                          "workingHours",
                          "instagramUrl",
                          "instagramIconUrl",
                          "facebookUrl",
                          "facebookIconUrl",
                          "youtubeUrl",
                          "youtubeIconUrl",
                          "tiktokUrl",
                          "tiktokIconUrl"
                        ],
                      },
                      {
                        title: activeKey === "terms" ? "Section 2: Terms & Client Agreement Pillars" : "Section 2: Privacy & Data Security Pillars",
                        icon: ShieldCheck,
                        color: "text-cyan-500",
                        keys: [
                          "pillar1Title",
                          "pillar1Desc",
                          "pillar2Title",
                          "pillar2Desc",
                          "pillar3Title",
                          "pillar3Desc",
                          "pillar4Title",
                          "pillar4Desc",
                        ],
                      },

                      {
                        title: "Section 3: Policy Overview & Data Collection",
                        icon: FileText,
                        color: "text-amber-500",
                        keys: [
                          "overviewTitle",
                          "overviewPara1",
                          "overviewPara2",
                          "collectTitle",
                          "collectIntro",
                          "organizerCollectTitle",
                          "organizerCollectItems",
                          "crewCollectTitle",
                          "crewCollectItems",
                        ],
                      },

                      {
                        title: "Section 4: Data Usage & Location Geo-Fencing",
                        icon: Lock,
                        color: "text-purple-500",
                        keys: [
                          "useDataTitle",
                          "useDataIntro",
                          "useDataPoint1Title",
                          "useDataPoint1Desc",
                          "useDataPoint2Title",
                          "useDataPoint2Desc",
                          "useDataPoint3Title",
                          "useDataPoint3Desc",
                          "useDataPoint4Title",
                          "useDataPoint4Desc",
                          "locationDataTitle",
                          "locationDataPara",
                          "locationDataNote",
                        ],
                      },

                      {
                        title: "Section 5: Data Security, Rights & DPO Contact Box",
                        icon: ShieldCheck,
                        color: "text-emerald-500",
                        keys: [
                          "securityTitle",
                          "securitySubtext",
                          "securityCard1Title",
                          "securityCard1Desc",
                          "securityCard2Title",
                          "securityCard2Desc",
                          "rightsTitle",
                          "rightsSubtext",
                          "rightsListItems",
                          "dpoBoxTitle",
                          "dpoBoxSubtext",
                          "contactDPO",
                          "dpoAddress",
                        ],
                      },

                      {
                        title: "Section 3: Agreement Scope & Client Responsibilities",
                        icon: FileText,
                        color: "text-amber-500",
                        keys: [
                          "scopeTitle",
                          "scopePara1",
                          "scopePara2",
                          "responsibilitiesTitle",
                          "responsibilitiesIntro",
                          "responsibilitiesItems",
                        ],
                      },

                      {
                        title: "Section 4: SLA Guarantees, Rates & Tax Invoicing",
                        icon: ShieldCheck,
                        color: "text-purple-500",
                        keys: [
                          "slaTitle",
                          "slaIntro",
                          "slaProtocolTitle",
                          "slaProtocolText",
                          "ratesTitle",
                          "ratesIntro",
                          "ratesItems",
                        ],
                      },

                      {
                        title: "Section 5: Cancellation, Conduct & Legal Resolution",
                        icon: Scale,
                        color: "text-blue-500",
                        keys: [
                          "cancellationTitle",
                          "cancellationIntro",
                          "cancelGreenText",
                          "cancelYellowText",
                          "cancelRedText",
                          "conductTitle",
                          "conductIntro",
                          "conductItems",
                          "lawTitle",
                          "lawText",
                          "legalBoxTitle",
                          "legalBoxSubtext",
                          "contactLegalEmail",
                          "legalOfficeAddress",
                        ],
                      },


                    ];

                    const assignedKeys = new Set(groups.flatMap((g) => g.keys));
                    const remainingKeys = Object.keys(customFields).filter(
                      (k) =>
                        !assignedKeys.has(k) &&
                        !k.toLowerCase().includes("twitter") &&
                        !k.toLowerCase().includes("linkedin") &&
                        !k.toLowerCase().includes("ourjourney") &&
                        !k.toLowerCase().includes("mission") &&
                        !k.toLowerCase().includes("vision") &&
                        !k.toLowerCase().includes("tab") &&
                        !k.toLowerCase().includes("cta")
                    );

                    if (remainingKeys.length > 0 && activeKey !== "about" && activeKey !== "services" && activeKey !== "blog" && activeKey !== "privacy-policy" && activeKey !== "terms") {
                      groups.push({
                        title: "Additional Custom Fields",
                        icon: Globe,
                        color: "text-slate-600",
                        keys: remainingKeys,
                      });
                    }

                    return groups.map((grp, grpIdx) => {
                      const presentKeys = grp.keys.filter((k) => k in customFields);
                      if (presentKeys.length === 0) return null;

                      const GroupIcon = grp.icon;

                      // Special UI for Contact Info & Social Media Links card
                      if (grp.isSocialGroup) {
                        const standardKeys = ["phone", "email", "officeAddress", "workingHours"];
                        const socialPairs: { prefix: string; label: string; urlKey: string; iconKey: string }[] = [];

                        // Extract all Url fields (excluding IconUrl, twitter, linkedin)
                        Object.keys(customFields).forEach((key) => {
                          const lowerKey = key.toLowerCase();
                          if (
                            key.endsWith("Url") &&
                            !key.endsWith("IconUrl") &&
                            !lowerKey.includes("twitter") &&
                            !lowerKey.includes("linkedin") &&
                            key !== "siteLogoUrl" &&
                            key !== "heroImageUrl" &&
                            key !== "aboutHeroImageUrl"
                          ) {
                            const prefix = key.replace(/Url$/, "");
                            const label = prefix.charAt(0).toUpperCase() + prefix.slice(1);
                            if (!socialPairs.some((p) => p.prefix === prefix)) {
                              socialPairs.push({
                                prefix,
                                label,
                                urlKey: key,
                                iconKey: `${prefix}IconUrl`,
                              });
                            }
                          }
                        });

                        return (
                          <div key={grpIdx} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                              <div className="flex items-center gap-2">
                                <GroupIcon className={`w-5 h-5 ${grp.color}`} />
                                <div>
                                  <h3 className="text-lg font-extrabold text-slate-950">{grp.title}</h3>
                                  <p className="text-xs text-slate-500">Manage phone, email, address, and dynamic social media links</p>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  const name = prompt("Enter Social Platform Name (e.g. Instagram, TikTok, YouTube, WhatsApp, Threads, Telegram):");
                                  if (!name || !name.trim()) return;
                                  const clean = name.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
                                  const urlKey = `${clean}Url`;
                                  const iconKey = `${clean}IconUrl`;
                                  setCustomFields({
                                    ...customFields,
                                    [urlKey]: "https://",
                                    [iconKey]: "",
                                  });
                                }}
                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer shrink-0"
                              >
                                <Plus className="w-4 h-4 text-white" />
                                <span>Add Social Link</span>
                              </button>
                            </div>

                            {/* Standard Contact Info Inputs (Phone, Email, Office, Hours) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                              {standardKeys.map((k) => {
                                if (!(k in customFields)) return null;
                                const v = customFields[k] || "";
                                return (
                                  <div key={k} className="space-y-1">
                                    <label className="text-xs font-bold text-slate-800 capitalize">
                                      {k.replace(/([A-Z])/g, " $1")}
                                    </label>
                                    <input
                                      type="text"
                                      value={v}
                                      onChange={(e) => setCustomFields({ ...customFields, [k]: e.target.value })}
                                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                                    />
                                  </div>
                                );
                              })}
                            </div>

                            {/* Dynamic Social Media Links & Icon Upload Cards */}
                            <div className="space-y-4">
                              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                                Dynamic Social Media Links ({socialPairs.length})
                              </h4>

                              <div className="grid grid-cols-1 gap-4">
                                {socialPairs.map((pair) => {
                                  const urlVal = customFields[pair.urlKey] || "";
                                  const iconVal = customFields[pair.iconKey] || "";

                                  return (
                                    <div
                                      key={pair.prefix}
                                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 relative group"
                                    >
                                      {/* Header with Title and Remove Button */}
                                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                                        <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                          <Globe className="w-3.5 h-3.5 text-amber-600" />
                                          {pair.label} Link & Icon
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            if (confirm(`Remove ${pair.label} link and icon from footer?`)) {
                                              const updated = { ...customFields };
                                              delete updated[pair.urlKey];
                                              delete updated[pair.iconKey];
                                              setCustomFields(updated);
                                            }
                                          }}
                                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-extrabold flex items-center gap-1 border border-rose-200 transition-colors cursor-pointer"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                          <span>Remove</span>
                                        </button>
                                      </div>

                                      {/* URL Input */}
                                      <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-slate-700">
                                          {pair.label} Target URL
                                        </label>
                                        <input
                                          type="text"
                                          placeholder={`https://www.${pair.prefix}.com/...`}
                                          value={urlVal}
                                          onChange={(e) =>
                                            setCustomFields({ ...customFields, [pair.urlKey]: e.target.value })
                                          }
                                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30"
                                        />
                                      </div>

                                      {/* Icon Uploader */}
                                      <div className="space-y-1">
                                        <ImageUploader
                                          value={iconVal}
                                          onChange={(newUrl) =>
                                            setCustomFields({ ...customFields, [pair.iconKey]: newUrl })
                                          }
                                          label={`${pair.label} Custom Icon Image (Optional)`}
                                        />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div key={grpIdx} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                              <GroupIcon className={`w-5 h-5 ${grp.color}`} />
                              <h3 className="text-lg font-extrabold text-slate-950">{grp.title}</h3>
                            </div>

                            {/* Headline & Subheading Fields (Included inside Hero card) */}
                            {grp.isHeroGroup && (
                              <div className="space-y-4 pb-4 border-b border-slate-100">
                                <div className="space-y-1">
                                  <label className="text-xs font-bold text-slate-800">Main Page Title / Hero Headline *</label>
                                  <input
                                    type="text"
                                    value={headline}
                                    onChange={(e) => setHeadline(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-xs font-bold text-slate-800">Subheading / Introduction Paragraph *</label>
                                  <textarea
                                    rows={4}
                                    value={subheading}
                                    onChange={(e) => setSubheading(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                                  />
                                </div>
                              </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {presentKeys.map((k) => {
                                const v = customFields[k] || "";
                                return (
                                  <div key={k} className="space-y-1 sm:col-span-2">
                                    {k === "ourJourneyStatus" ? (
                                      <>
                                        <label className="text-xs font-bold text-slate-800">
                                          Our Journey Section Status (Active / Inactive)
                                        </label>
                                        <select
                                          value={v || "Active"}
                                          onChange={(e) =>
                                            setCustomFields({ ...customFields, [k]: e.target.value })
                                          }
                                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-extrabold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 bg-white"
                                        >
                                          <option value="Active">Active (Visible on Frontend)</option>
                                          <option value="Inactive">Inactive (Hidden from Frontend)</option>
                                        </select>
                                      </>
                                    ) : k === "defaultActiveTab" ? (
                                      <>
                                        <label className="text-xs font-bold text-slate-800">
                                          Default Active Tab (Mission / Vision)
                                        </label>
                                        <select
                                          value={v || "mission"}
                                          onChange={(e) =>
                                            setCustomFields({ ...customFields, [k]: e.target.value })
                                          }
                                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-extrabold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 bg-white"
                                        >
                                          <option value="mission">Mission Tab (Default Active)</option>
                                          <option value="vision">Vision Tab</option>
                                        </select>
                                      </>
                                    ) : (
                                      k.endsWith("ImageUrl") ||
                                      k.endsWith("LogoUrl") ||
                                      k.endsWith("AvatarUrl") ||
                                      k.endsWith("IconUrl") ||
                                      k === "aboutImage1Url" ||
                                      k === "aboutImage2Url" ||
                                      k === "aboutImage3Url" ||
                                      (k.endsWith("Url") &&
                                        !k.toLowerCase().includes("label") &&
                                        !k.toLowerCase().includes("cta") &&
                                        !k.toLowerCase().includes("primary") &&
                                        !k.toLowerCase().includes("secondary") &&
                                        !k.toLowerCase().includes("instagram") &&
                                        !k.toLowerCase().includes("facebook") &&
                                        !k.toLowerCase().includes("youtube") &&
                                        !k.toLowerCase().includes("tiktok") &&
                                        !k.toLowerCase().includes("urlkey"))
                                    ) ? (
                                      <ImageUploader
                                        value={v}
                                        onChange={(newUrl) => setCustomFields({ ...customFields, [k]: newUrl })}
                                        label={
                                          ({
                                            aboutImage1Url: "Gallery Image 1 (Guest Hostesses)",
                                            aboutImage2Url: "Gallery Image 2 (On-Site Briefing)",
                                            aboutImage3Url: "Gallery Image 3 (Protocol & VIP Security)",
                                            heroImageUrl: "Hero Main Showcase Image",
                                            heroStatusAvatarUrl: "Status Card Usher Avatar Image",
                                            siteLogoUrl: "Site Logo Image",
                                          } as Record<string, string>)[k] || k.replace(/([A-Z])/g, " $1")
                                        }
                                      />
                                    ) : (
                                      <>
                                         <label className="text-xs font-bold text-slate-800 capitalize">
                                           {({
                                             aboutSectionBadge: "Section Pill Badge (e.g., ABOUT EVENT USHERS)",
                                             aboutSectionTitle: "Section Main Heading (e.g., The Crew Connect-Hub for Unforgettable Events)",
                                             aboutSectionDescription: "Section Subheading / Intro (e.g., Your ultimate partner in elevated event experiences across Kenya.)",
                                             missionTabLabel: "Mission Tab Button Label (e.g., Our Mission)",
                                             visionTabLabel: "Vision Tab Button Label (e.g., Our Vision)",
                                             missionTitle: "Mission Content Box Title (e.g., Empowering Event Organizers Daily)",
                                             missionStatement: "Mission Quote Statement Text",
                                             visionTitle: "Vision Content Box Title (e.g., Setting the Continental Standard)",
                                             visionStatement: "Vision Quote Statement Text",
                                             aboutImage1Url: "Gallery Image 1 (Guest Hostesses)",
                                             aboutImage1Label: "Gallery Image 1 Label Tag (e.g., Guest Hostesses)",
                                             aboutImage2Url: "Gallery Image 2 (On-Site Briefing)",
                                             aboutImage2Label: "Gallery Image 2 Label Tag (e.g., On-Site Briefing)",
                                             aboutImage3Url: "Gallery Image 3 (Protocol & VIP Security)",
                                             aboutImage3Label: "Gallery Image 3 Label Tag (e.g., Protocol & VIP Security)",
                                             experienceBadgeYears: "Experience Badge Number/Years (e.g., 5+)",
                                             experienceBadgeTitle: "Experience Badge Title (e.g., Years of Excellence)",
                                             experienceBadgeSubtext: "Experience Badge Subtext (e.g., 500+ High-Profile Events Served)",
                                             whyChooseUsHeading: "Why Choose Us Section Title (e.g., Why Event Organizers Choose Us)",
                                             whyChooseUsItem1: "Why Choose Us Feature 1",
                                             whyChooseUsItem2: "Why Choose Us Feature 2",
                                             whyChooseUsItem3: "Why Choose Us Feature 3",
                                             whyChooseUsItem4: "Why Choose Us Feature 4",
                                             whyChooseUsItem5: "Why Choose Us Feature 5",
                                             whyChooseUsItem6: "Why Choose Us Feature 6",
                                             organizerCount: "Stat 1 Number (e.g., 250+)",
                                             organizerLabel: "Stat 1 Title (e.g., Happy Event Organizers)",
                                             organizerSubtext: "Stat 1 Subtitle (e.g., Corporate & private clients)",
                                             usherCount: "Stat 2 Number (e.g., 1,500+)",
                                             usherLabel: "Stat 2 Title (e.g., Active Vetted Ushers)",
                                             usherSubtext: "Stat 2 Subtitle (e.g., Ready for deployment)",
                                             projectCount: "Stat 3 Number (e.g., 350+)",
                                             projectLabel: "Stat 3 Title (e.g., Projects Completed)",
                                             projectSubtext: "Stat 3 Subtitle (e.g., Galas, expos & festivals)",
                                             cityCount: "Stat 4 Number (e.g., 18+)",
                                             cityLabel: "Stat 4 Title (e.g., Cities Covered)",
                                             citySubtext: "Stat 4 Subtitle (e.g., Across Kenya & East Africa)",
                                             supportStaffCount: "Stat 5 Number (e.g., 500+)",
                                             supportStaffLabel: "Stat 5 Title (e.g., Trained Support Staff)",
                                             supportStaffSubtext: "Stat 5 Subtitle (e.g., Security, AV & Hostesses)",
                                             heroBadgeText: "Hero Pill Badge (e.g., EASY AND QUICK HIRE)",
                                             trustHighlight1: "Trust Highlight 1 (e.g., 100% Background Vetted)",
                                             trustHighlight2: "Trust Highlight 2 (e.g., Instant Replacement)",
                                             trustHighlight3: "Trust Highlight 3 (e.g., Corporate Protocol)",
                                             heroRatingScore: "Rating Score (e.g., 4.9 / 5)",
                                             heroRatingSubtext: "Rating Subtitle (e.g., 500+ Verified Organizers)",
                                             heroStatusAvatarUrl: "Status Card Usher Avatar Image",
                                             heroStatusTitle: "Status Card Title (e.g., Lead Hostess Assigned)",
                                             heroStatusLocation: "Status Card Location (e.g., Nairobi, Kenya)",
                                             heroStatusBadgeText: "Status Badge Tag (e.g., DISPATCHED)",
                                             servicesHeroBadge: "Services Hero Badge (e.g., EXPLORE CORE OFFERINGS)",
                                             howItWorksSectionBadge: "How It Works Section Pill Badge (e.g., HOW IT WORKS)",
                                             howItWorksSectionTitle: "How It Works Main Heading (e.g., Simple, Transparent & Fast Process)",
                                             howItWorksSectionTitleHighlight: "How It Works Heading Highlighted Word (e.g., Process)",
                                             howItWorksSectionDescription: "How It Works Subheading / Description",
                                             howItWorksTab1Label: "How It Works Tab 1 Label (e.g., For Organizers)",
                                             howItWorksTab2Label: "How It Works Tab 2 Label (e.g., For Professionals)",
                                             howItWorksOrgStep1Title: "Organizers Step 1 Title (e.g., Post or Search)",
                                             howItWorksOrgStep1Desc: "Organizers Step 1 Description",
                                             howItWorksOrgStep2Title: "Organizers Step 2 Title (e.g., Compare & Shortlist)",
                                             howItWorksOrgStep2Desc: "Organizers Step 2 Description",
                                             howItWorksOrgStep3Title: "Organizers Step 3 Title (e.g., Book & Contract)",
                                             howItWorksOrgStep3Desc: "Organizers Step 3 Description",
                                             howItWorksOrgStep4Title: "Organizers Step 4 Title (e.g., Show Day)",
                                             howItWorksOrgStep4Desc: "Organizers Step 4 Description",
                                             howItWorksProfStep1Title: "Professionals Step 1 Title (e.g., Create your Digital CV)",
                                             howItWorksProfStep1Desc: "Professionals Step 1 Description",
                                             howItWorksProfStep2Title: "Professionals Step 2 Title (e.g., Set Your Availability)",
                                             howItWorksProfStep2Desc: "Professionals Step 2 Description",
                                             howItWorksProfStep3Title: "Professionals Step 3 Title (e.g., Receive Bookings)",
                                             howItWorksProfStep3Desc: "Professionals Step 3 Description",
                                             howItWorksProfStep4Title: "Professionals Step 4 Title (e.g., Get Paid Securely)",
                                             howItWorksProfStep4Desc: "Professionals Step 4 Description",
                                             blogSectionBadge: "Section Pill Badge (e.g., RECENT BLOG & NEWS)",
                                             blogSectionTitle: "Section Main Heading (e.g., Checkout Our Latest Insights)",
                                             blogSectionTitleHighlight: "Heading Highlighted Text (e.g., Latest Insights)",
                                             blogSectionDescription: "Section Subheading / Description (e.g., Stay updated with event staffing trends...)",
                                             blogHeroBadge: "Blog Hero Badge (e.g., EVENT USHERS INSIGHTS & NEWS)",
                                             contactHeroBadge: "Contact Hero Badge (e.g., 24/7 EVENT CREW SUPPORT & INQUIRIES)",
                                             privacyHeroBadge: "Privacy Hero Badge (e.g., PRIVACY POLICY & DATA PROTECTION)",
                                             headlineHighlight: "Main Heading Highlighted Text (e.g., Matter Most)",
                                             primaryCtaText: "Primary CTA Button Text (e.g., Hire Staff Now)",
                                             primaryCtaUrl: "Primary CTA Button URL",
                                             secondaryCtaText: "Secondary CTA Button Text (e.g., Explore All Categories)",
                                             secondaryCtaUrl: "Secondary CTA Button URL",
                                             servicesSectionBadge: "Section Pill Badge (e.g., OUR CORE SERVICES)",
                                             servicesSectionTitle: "Section Heading (e.g., Our 6 Core Service Pillars)",
                                             servicesSectionTitleHighlight: "Section Heading Highlighted Text (e.g., Service Pillars)",
                                             servicesSectionDescription: "Section Subtext / Description",
                                             guaranteesBadge: "Guarantees Section Badge (e.g., OUR PROMISE)",
                                             guaranteesHeading: "Guarantees Section Heading (e.g., Why Event Organizers Trust Our Crew)",
                                             guaranteesHeadingHighlight: "Guarantees Heading Highlighted Text (e.g., Trust Our Crew)",
                                             guaranteesDescription: "Guarantees Section Subtext / Description",
                                             guarantee1Title: "Guarantee Card 1 Title (e.g., 100% Vetted Personnel)",
                                             guarantee1Description: "Guarantee Card 1 Description",
                                             guarantee2Title: "Guarantee Card 2 Title (e.g., 24-Hour Express Dispatch)",
                                             guarantee2Description: "Guarantee Card 2 Description",
                                             guarantee3Title: "Guarantee Card 3 Title (e.g., On-Site Supervisors)",
                                             guarantee3Description: "Guarantee Card 3 Description",
                                             guarantee4Title: "Guarantee Card 4 Title (e.g., Custom Uniform Options)",
                                             guarantee4Description: "Guarantee Card 4 Description",
                                             pillar1Title: "Pillar 1 Title (e.g., ODPC Compliant)",
                                             pillar1Desc: "Pillar 1 Description",
                                             pillar2Title: "Pillar 2 Title (e.g., Bank-Grade Encryption)",
                                             pillar2Desc: "Pillar 2 Description",
                                             pillar3Title: "Pillar 3 Title (e.g., Geo-Fence Transparency)",
                                             pillar3Desc: "Pillar 3 Description",
                                             pillar4Title: "Pillar 4 Title (e.g., Zero Data Selling)",
                                             pillar4Desc: "Pillar 4 Description",
                                             overviewTitle: "Overview & Scope Title (e.g., 1. Overview & Scope)",
                                             overviewPara1: "Overview Paragraph 1",
                                             overviewPara2: "Overview Paragraph 2",
                                             collectTitle: "Information We Collect Title (e.g., 2. Information We Collect)",
                                             collectIntro: "Information We Collect Intro Text",
                                             organizerCollectTitle: "Organizers Box Title (e.g., For Event Organizers)",
                                             organizerCollectItems: "Organizers Collected Items (One per line)",
                                             crewCollectTitle: "Crew Box Title (e.g., For Crew Members & Hostesses)",
                                             crewCollectItems: "Crew Collected Items (One per line)",
                                             useDataTitle: "Data Usage Section Title (e.g., 3. How We Use Your Personal Data)",
                                             useDataIntro: "Data Usage Section Intro Text",
                                             useDataPoint1Title: "Point 1 Title (e.g., Crew Allocation & Matching)",
                                             useDataPoint1Desc: "Point 1 Description",
                                             useDataPoint2Title: "Point 2 Title (e.g., Punctuality & Safety Verification)",
                                             useDataPoint2Desc: "Point 2 Description",
                                             useDataPoint3Title: "Point 3 Title (e.g., Digital Payroll Disbursements)",
                                             useDataPoint3Desc: "Point 3 Description",
                                             useDataPoint4Title: "Point 4 Title (e.g., Customer Support & Emergency Dispatch)",
                                             useDataPoint4Desc: "Point 4 Description",
                                             locationDataTitle: "Location Data Section Title (e.g., 4. Location Data & Geo-Fencing Transparency)",
                                             locationDataPara: "Location Data Section Paragraph",
                                             locationDataNote: "Location Data Privacy Note (Yellow Callout)",
                                             securityTitle: "Security Section Title (e.g., 5. Data Security & Storage Standards)",
                                             securitySubtext: "Security Section Subtext",
                                             securityCard1Title: "Card 1 Title (e.g., Encrypted Storage)",
                                             securityCard1Desc: "Card 1 Description",
                                             securityCard2Title: "Card 2 Title (e.g., TLS/SSL In Transit)",
                                             securityCard2Desc: "Card 2 Description",
                                             rightsTitle: "Rights Section Title (e.g., 6. Your Rights & Data Choices)",
                                             rightsSubtext: "Rights Section Subtext",
                                             rightsListItems: "Your Rights List Items (One per line)",
                                             dpoBoxTitle: "DPO Box Title (e.g., Contact Our Data Protection Officer)",
                                             dpoBoxSubtext: "DPO Box Subtext",
                                             contactDPO: "DPO Contact Email(s)",
                                             dpoAddress: "DPO Office Address",
                                             termsHeroBadge: "Terms Hero Badge (e.g., TERMS OF SERVICE & CLIENT AGREEMENT)",
                                             scopeTitle: "Scope Section Title (e.g., 1. Acceptance & Agreement Scope)",
                                             scopePara1: "Scope Paragraph 1",
                                             scopePara2: "Scope Paragraph 2",
                                             responsibilitiesTitle: "Responsibilities Section Title (e.g., 2. Client Responsibilities & Event Setup)",
                                             responsibilitiesIntro: "Responsibilities Intro Text",
                                             responsibilitiesItems: "Responsibilities Bullet Items (One per line)",
                                             slaTitle: "SLA Section Title (e.g., 3. Service Level Agreement)",
                                             slaIntro: "SLA Intro Text",
                                             slaProtocolTitle: "SLA Protocol Box Title (e.g., The 60-Minute Pre-Door Protocol)",
                                             slaProtocolText: "SLA Protocol Box Text",
                                             ratesTitle: "Rates & Billing Section Title (e.g., 4. Rates, Billing & Tax Invoicing)",
                                             ratesIntro: "Rates & Billing Intro Text",
                                             ratesItems: "Rates & Billing Items (One per line)",
                                             cancellationTitle: "Cancellation Section Title (e.g., 5. Cancellation & Rescheduling Policy)",
                                             cancellationIntro: "Cancellation Intro Text",
                                             cancelGreenText: "Green Box Text (> 24 Hours Notice)",
                                             cancelYellowText: "Yellow Box Text (12 to 24 Hours Notice)",
                                             cancelRedText: "Red Box Text (< 12 Hours Notice)",
                                             conductTitle: "Code of Conduct Section Title (e.g., 6. Crew Code of Conduct & Etiquette)",
                                             conductIntro: "Code of Conduct Intro Text",
                                             conductItems: "Code of Conduct Bullet Items (One per line)",
                                             lawTitle: "Governing Law Section Title (e.g., 7. Governing Law & Dispute Resolution)",
                                             lawText: "Governing Law Text",
                                             legalBoxTitle: "Legal Box Title (e.g., Questions About Our Terms?)",
                                             legalBoxSubtext: "Legal Box Subtext",
                                             contactLegalEmail: "Legal Desk Contact Email(s)",
                                             legalOfficeAddress: "Legal Desk Office Address",
                                           } as Record<string, string>)[k] || k.replace(/([A-Z])/g, " $1")}
                                         </label>
                                        {v.length > 50 || k.toLowerCase().includes("description") || k.toLowerCase().includes("statement") || k.toLowerCase().includes("content") || k.toLowerCase().includes("subtext") || k.toLowerCase().includes("intro") ? (
                                          <textarea
                                            rows={3}
                                            value={v}
                                            onChange={(e) =>
                                              setCustomFields({ ...customFields, [k]: e.target.value })
                                            }
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                                          />
                                        ) : (
                                          <input
                                            type="text"
                                            value={v}
                                            onChange={(e) =>
                                              setCustomFields({ ...customFields, [k]: e.target.value })
                                            }
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                                          />
                                        )}
                                      </>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }
                    });
                  })()}

                  {/* SEO Metadata Box */}
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                      <h3 className="text-lg font-extrabold text-slate-950">3. Search Engine Optimization (SEO Meta Tags)</h3>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-800">Browser Title Tag</label>
                      <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-800">Meta Description</label>
                      <textarea
                        rows={3}
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                      />
                    </div>
                  </div>

                </div>

                {/* Right Column: Live Visual Preview Card (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 sticky top-24">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700">Live Visual Preview</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>

                    {/* Simulated Page Card */}
                    <div className="p-5 rounded-2xl bg-slate-950 text-white space-y-3 shadow-lg">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                        {selectedPage.title}
                      </span>
                      <h4 className="text-lg font-extrabold leading-snug text-white">
                        {headline || "Your Page Headline Here"}
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-4 leading-relaxed font-normal">
                        {subheading || "Your page subheading text..."}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                      <p className="font-extrabold">Route Path:</p>
                      <p className="font-mono">{selectedPage.path}</p>
                    </div>

                    <button
                      onClick={handleSavePage}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-sm shadow-lg shadow-pink-500/25 hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Save className="w-4.5 h-4.5 text-white" />
                      <span>Save Changes Now</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}
