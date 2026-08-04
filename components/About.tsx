"use client";

import React, { useState } from "react";
import { Target, Eye, Award, CheckCircle2, Sparkles, Zap } from "lucide-react";
import { usePageContent } from "@/lib/pageContent";

interface AboutProps {
  onOpenHire?: () => void;
}

export const About: React.FC<AboutProps> = () => {
  const [activeTab, setActiveTab] = useState<"mission" | "vision">("mission");

  const homeData = usePageContent("home", {
    key: "home",
    title: "Home Page",
    path: "/",
    headline: "We connect events with vetted ushers & crew — instantly.",
    subheading: "The all-in-one platform for event organizers to find vetted, reliable, and professional ushers & crew in minutes.",
    metaTitle: "Event Ushers",
    metaDescription: "We connect events with vetted ushers & crew instantly.",
    customFields: {
      aboutSectionBadge: "ABOUT EVENT USHERS",
      aboutSectionTitle: "The Crew Connect-Hub for Unforgettable Events",
      aboutSectionDescription: "Your ultimate partner in elevated event experiences across Kenya.",
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
    },
  });

  const sectionBadge = homeData.customFields?.aboutSectionBadge || "ABOUT EVENT USHERS";
  const sectionTitle = homeData.customFields?.aboutSectionTitle || "The Crew Connect-Hub for Unforgettable Events";
  const sectionDescription = homeData.customFields?.aboutSectionDescription || "Your ultimate partner in elevated event experiences across Kenya.";
  const missionText = homeData.customFields?.missionStatement || "To transform every event experience across Africa through smart matching technology, top-tier vetted talent, and unyielding commitment to hospitality excellence.";
  const visionText = homeData.customFields?.visionStatement || "To become the leading digital infrastructure for event staffing, talent management, and hospitality logistics across Africa and beyond.";
  const missionTitle = homeData.customFields?.missionTitle || "Empowering Event Organizers Daily";
  const visionTitle = homeData.customFields?.visionTitle || "Setting the Continental Standard";
  const aboutImage1Url = homeData.customFields?.aboutImage1Url || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80";
  const aboutImage1Label = homeData.customFields?.aboutImage1Label || "Guest Hostesses";
  const aboutImage2Url = homeData.customFields?.aboutImage2Url || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80";
  const aboutImage2Label = homeData.customFields?.aboutImage2Label || "On-Site Briefing";
  const aboutImage3Url = homeData.customFields?.aboutImage3Url || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80";
  const aboutImage3Label = homeData.customFields?.aboutImage3Label || "Protocol & VIP Security";
  const experienceBadgeYears = homeData.customFields?.experienceBadgeYears || "5+";
  const experienceBadgeTitle = homeData.customFields?.experienceBadgeTitle || "Years of Excellence";
  const experienceBadgeSubtext = homeData.customFields?.experienceBadgeSubtext || "500+ High-Profile Events Served";
  const whyChooseUsHeading = homeData.customFields?.whyChooseUsHeading || "Why Event Organizers Choose Us";

  const highlights = [
    homeData.customFields?.whyChooseUsItem1 || "Vetted & Background Checked Crew",
    homeData.customFields?.whyChooseUsItem2 || "On-Demand Instant Staff Dispatch",
    homeData.customFields?.whyChooseUsItem3 || "Corporate Dress Code & Etiquette",
    homeData.customFields?.whyChooseUsItem4 || "Dedicated On-Site Supervisor",
    homeData.customFields?.whyChooseUsItem5 || "Punctuality & Reliability Guarantee",
    homeData.customFields?.whyChooseUsItem6 || "Seamless Digital Attendance Tracking",
  ];

  return (
    <section id="about" className="py-16 md:py-20 relative overflow-hidden bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Badge */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-block p-[1.5px] rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 shadow-xs shadow-pink-500/10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{sectionBadge}</span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {sectionTitle}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal">
            {sectionDescription}
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Gallery Collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              
              <div className="space-y-4">
                <div className="relative group overflow-hidden rounded-3xl shadow-lg border border-slate-200">
                  <img
                    src={aboutImage1Url}
                    alt={aboutImage1Label}
                    className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 px-3.5 py-1.5 bg-white/90 backdrop-blur-sm text-slate-900 text-xs sm:text-sm font-bold rounded-full">
                    {aboutImage1Label}
                  </span>
                </div>

                <div className="relative group overflow-hidden rounded-3xl shadow-lg border border-slate-200">
                  <img
                    src={aboutImage2Url}
                    alt={aboutImage2Label}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  <span className="absolute bottom-3 left-4 px-3.5 py-1.5 bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold rounded-full shadow-md border border-amber-400/40">
                    {aboutImage2Label}
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="relative group overflow-hidden rounded-3xl shadow-lg border border-slate-200">
                  <img
                    src={aboutImage3Url}
                    alt={aboutImage3Label}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 px-3.5 py-1.5 bg-slate-900/90 text-white text-xs sm:text-sm font-bold rounded-full">
                    {aboutImage3Label}
                  </span>
                </div>
              </div>

            </div>

            {/* Experience Floating Badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-slate-900 text-white p-5 rounded-3xl shadow-2xl border-2 border-amber-400 flex items-center gap-4 max-w-xs animate-float">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex flex-col items-center justify-center font-black shrink-0">
                <span className="text-2xl leading-none">{experienceBadgeYears}</span>
                <span className="text-[10px] uppercase tracking-tighter font-extrabold">Years</span>
              </div>
              <div>
                <h4 className="text-base font-extrabold text-white leading-tight">
                  {experienceBadgeTitle}
                </h4>
                <p className="text-xs sm:text-sm text-amber-400 font-semibold">
                  {experienceBadgeSubtext}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Content & Mission / Vision Tabs (NO BUTTON) */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Tab Selector */}
            <div className="inline-flex p-1.5 rounded-2xl border bg-white border-slate-200 shadow-sm">
              <button
                onClick={() => setActiveTab("mission")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  activeTab === "mission"
                    ? "bg-gradient-to-r from-amber-400 to-pink-500 text-white shadow-md shadow-pink-500/20"
                    : "text-slate-700 hover:text-amber-600"
                }`}
              >
                <Target className="w-4 h-4" />
                Our Mission
              </button>

              <button
                onClick={() => setActiveTab("vision")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  activeTab === "vision"
                    ? "bg-gradient-to-r from-amber-400 to-pink-500 text-white shadow-md shadow-pink-500/20"
                    : "text-slate-700 hover:text-amber-600"
                }`}
              >
                <Eye className="w-4 h-4" />
                Our Vision
              </button>
            </div>

            {/* Tab Content Box */}
            <div className="p-6 rounded-3xl border bg-white border-slate-200/80 shadow-md transition-all">
              {activeTab === "mission" ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-amber-600 font-bold text-base">
                    <Zap className="w-5 h-5" />
                    <span>{missionTitle}</span>
                  </div>
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                    "{missionText}"
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-amber-600 font-bold text-base">
                    <Award className="w-5 h-5 text-amber-600" />
                    <span>{visionTitle}</span>
                  </div>
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                    "{visionText}"
                  </p>
                </div>
              )}
            </div>

            {/* Why Choose Us Grid */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900">
                {whyChooseUsHeading}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm sm:text-base font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
