"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { STORAGE_KEY, saveAllPagesToStorage } from "@/lib/pageContent";
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
  BookOpen,
  HelpCircle,
  ArrowLeft,
  Save,
  CheckCircle2
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
        siteLogoUrl: "/images/logo.png",
        heroBadgeText: "EASY AND QUICK HIRE",
        heroImageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
        trustHighlight1: "100% Background Vetted",
        trustHighlight2: "Instant Replacement Guarantee",
        trustHighlight3: "Corporate Attire & Protocol Ready",
        aboutSectionBadge: "WHY CHOOSE EVENT USHERS",
        aboutSectionTitle: "Kenya's Premier Tech-Enabled Staffing Engine",
        aboutSectionDescription: "We bridge the gap between event organizers and background-checked, corporate-ready hospitality talent.",
        servicesSectionBadge: "OUR CORE OFFERINGS",
        servicesSectionTitle: "Tailored Staffing Categories for Every Occasion",
        blogSectionBadge: "INSIGHTS & NEWS",
        blogSectionTitle: "Latest Event Industry Trends & Protocol Guides",
        testimonialsSectionBadge: "ORGANIZER TESTIMONIALS",
        testimonialsSectionTitle: "Trusted by Event Leaders Across Kenya",
        testimonialsSectionDescription: "Discover how event planners, corporate brands, and private hosts across Kenya achieve event success with our vetted crew.",
        ctaSectionBadge: "READY TO ELEVATE YOUR NEXT EVENT?",
        ctaSectionTitle: "Get Top Vetted Crew On-Site in 24 Hours",
        ctaSectionDescription: "Join hundreds of event organizers and corporate hosts across Kenya who trust Event Ushers for flawless protocol, security, and hospitality.",
        ctaButtonText: "Hire Staff Now",
        organizerCount: "250+",
        usherCount: "1,500+",
        projectCount: "350+",
        cityCount: "18+",
        supportStaffCount: "500+",
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
        missionStatement: "To transform every event experience across Africa through smart matching technology, top-tier vetted talent, and unyielding commitment to hospitality excellence.",
        visionStatement: "To become the leading digital infrastructure for event staffing, talent management, and hospitality logistics across East Africa and beyond.",
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
        servicesOverviewText: "Select from our verified staffing categories for your upcoming event across Kenya.",
        bookingBannerHeading: "Need Custom Staffing Options for Large Expos?",
        bookingBannerSubtext: "Our staffing coordinators build custom staffing teams for multi-day events in Nairobi, Mombasa, and Kisumu.",
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
        phone: "+254 (0) 700 EVENT CREW",
        email: "info@eventushers.co.ke",
        officeAddress: "Nairobi, Kenya",
        workingHours: "Monday - Saturday: 8:00 AM - 8:00 PM (Emergency 24/7 Dispatch)",
        instagramUrl: "https://instagram.com/eventushers",
        facebookUrl: "https://facebook.com/eventushers",
        twitterUrl: "https://twitter.com/eventushers",
        linkedinUrl: "https://linkedin.com/company/eventushers",
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
        blogHeroBadge: "EXPERT INSIGHTS",
        blogIntroHeading: "Event Industry News & Protocol Guides",
        newsletterHeading: "Subscribe to Event Ushers Quarterly Digest",
        newsletterSubtext: "Receive expert event logistics tips and crew highlights delivered to your inbox.",
      },
    },
    {
      key: "privacy-policy",
      title: "Privacy Policy Page",
      path: "/privacy-policy",
      description: "Legal data protection policy and privacy commitments",
      icon: ShieldCheck,
      headline: "Privacy Policy & Data Security",
      subheading: "How Event Ushers collects, uses, and protects personal information for organizers and crew members.",
      metaTitle: "Privacy Policy — Event Ushers",
      metaDescription: "Event Ushers privacy policy and data security practices.",
      customFields: {
        lastUpdatedDate: "October 2026",
        dataProtectionSummary: "Event Ushers is committed to protecting the privacy of our clients and crew members in accordance with the Kenya Data Protection Act.",
        contactDPO: "privacy@eventushers.co.ke",
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
        } catch (e) {}
      }
    }
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
              className={`px-4 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                activeKey === null
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
                  className={`px-4 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
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
                  
                  {/* Hero & Headlines Box */}
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <h3 className="text-lg font-extrabold text-slate-950">1. Hero Section & Main Headlines</h3>
                    </div>

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

                  {/* Render Custom Fields in Separate Grouped Cards */}
                  {customFields && Object.keys(customFields).length > 0 && (() => {
                    // Define field groups for clean separate cards
                    const groups: { title: string; icon: any; color: string; keys: string[] }[] = [
                      {
                        title: "Hero & Brand Logo Customizations",
                        icon: Sparkles,
                        color: "text-amber-500",
                        keys: ["siteLogoUrl", "heroBadgeText", "heroImageUrl", "trustHighlight1", "trustHighlight2", "trustHighlight3"],
                      },
                      {
                        title: "About Us Section Content",
                        icon: Info,
                        color: "text-blue-500",
                        keys: ["aboutSectionBadge", "aboutSectionTitle", "aboutSectionDescription", "missionStatement", "visionStatement", "storyHeading", "storyContent", "coreValue1", "coreValue2", "coreValue3", "aboutHeroImageUrl"],
                      },
                      {
                        title: "Services Section Content",
                        icon: Layers,
                        color: "text-purple-500",
                        keys: ["servicesSectionBadge", "servicesSectionTitle", "servicesHeroBadge", "servicesOverviewText", "bookingBannerHeading", "bookingBannerSubtext"],
                      },
                      {
                        title: "Blog & Insights Section Content",
                        icon: BookOpen,
                        color: "text-pink-500",
                        keys: ["blogSectionBadge", "blogSectionTitle", "blogHeroBadge", "blogIntroHeading", "newsletterHeading", "newsletterSubtext"],
                      },
                      {
                        title: "Organizer Testimonials Section Content",
                        icon: Sparkles,
                        color: "text-amber-600",
                        keys: ["testimonialsSectionBadge", "testimonialsSectionTitle", "testimonialsSectionDescription"],
                      },
                      {
                        title: "Call-To-Action (CTA) Banner Content",
                        icon: ShieldCheck,
                        color: "text-pink-600",
                        keys: ["ctaSectionBadge", "ctaSectionTitle", "ctaSectionDescription", "ctaButtonText"],
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
                        keys: ["phone", "email", "officeAddress", "workingHours", "instagramUrl", "facebookUrl", "twitterUrl", "linkedinUrl"],
                      },
                      {
                        title: "Platform Statistics & KPI Numbers",
                        icon: Globe,
                        color: "text-amber-600",
                        keys: ["organizerCount", "usherCount", "projectCount", "cityCount", "supportStaffCount"],
                      },
                      {
                        title: "Legal & Data Protection Details",
                        icon: ShieldCheck,
                        color: "text-cyan-500",
                        keys: ["lastUpdatedDate", "dataProtectionSummary", "contactDPO"],
                      },
                    ];

                    const assignedKeys = new Set(groups.flatMap((g) => g.keys));
                    const remainingKeys = Object.keys(customFields).filter((k) => !assignedKeys.has(k));

                    if (remainingKeys.length > 0) {
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

                      return (
                        <div key={grpIdx} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                            <GroupIcon className={`w-5 h-5 ${grp.color}`} />
                            <h3 className="text-lg font-extrabold text-slate-950">{grp.title}</h3>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {presentKeys.map((k) => {
                              const v = customFields[k] || "";
                              return (
                                <div key={k} className="space-y-1 sm:col-span-2">
                                  {k.toLowerCase().includes("image") || k.toLowerCase().includes("img") || k.toLowerCase().includes("logo") || k.toLowerCase().includes("avatar") ? (
                                    <ImageUploader
                                      value={v}
                                      onChange={(newUrl) => setCustomFields({ ...customFields, [k]: newUrl })}
                                      label={k.replace(/([A-Z])/g, " $1")}
                                    />
                                  ) : (
                                    <>
                                      <label className="text-xs font-bold text-slate-800 capitalize">
                                        {k.replace(/([A-Z])/g, " $1")}
                                      </label>
                                      {v.length > 50 || k.toLowerCase().includes("description") || k.toLowerCase().includes("statement") || k.toLowerCase().includes("content") || k.toLowerCase().includes("subtext") ? (
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
