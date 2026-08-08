"use client";

import React from "react";
import { Sparkles, ShieldCheck } from "lucide-react";
import { usePageContent } from "@/lib/pageContent";

interface CtaBannerProps {
  onOpenHire?: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenHire }) => {
  const homeData = usePageContent("home", {
    key: "home",
    title: "Home Page",
    path: "/",
    headline: "We connect events with vetted ushers & crew — instantly.",
    subheading: "The all-in-one platform for event organizers to find vetted, reliable, and professional ushers & crew in minutes.",
    metaTitle: "afriCrew",
    metaDescription: "We connect events with vetted ushers & crew instantly.",
    customFields: {
      ctaSectionBadge: "READY TO ELEVATE YOUR NEXT EVENT?",
      ctaSectionTitle: "Get Top Vetted Crew On-Site in 24 Hours",
      ctaSectionDescription: "Join hundreds of event organizers and corporate hosts across Kenya who trust afriCrew for flawless protocol, security, and hospitality.",
      ctaButtonText: "Hire Staff Now",
    },
  });

  const badgeText = homeData.customFields?.ctaSectionBadge || "READY TO ELEVATE YOUR NEXT EVENT?";
  const headlineText = homeData.customFields?.ctaSectionTitle || "Get Top Vetted Crew On-Site in 24 Hours";
  const subheadText = homeData.customFields?.ctaSectionDescription || "Join hundreds of event organizers and corporate hosts across Kenya who trust afriCrew for flawless protocol, security, and hospitality.";
  const buttonLabel = homeData.customFields?.ctaButtonText || "Hire Staff Now";

  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Banner Container with Dark Theme for Vibrant Button Contrast */}
        <div className="rounded-3xl p-8 sm:p-12 lg:p-14 border shadow-2xl relative overflow-hidden bg-slate-950 border-slate-800 text-white">
          
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Background Icon Decoration */}
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
            <Sparkles className="w-80 h-80 text-white" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Content Left (8 cols) */}
            <div className="lg:col-span-8 space-y-4 text-left">
              
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-md">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{badgeText}</span>
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                {headlineText}
              </h2>

              {/* Supporting Subheading */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal max-w-2xl leading-relaxed">
                {subheadText}
              </p>

            </div>

            {/* Action Right (4 cols) - Hire Staff Now Button */}
            <div className="lg:col-span-4 flex items-center justify-start lg:justify-end">
              <button
                onClick={onOpenHire}
                className="w-full sm:w-auto px-10 py-4 rounded-full font-extrabold text-base shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white border border-white/20 shadow-pink-500/30 whitespace-nowrap cursor-pointer"
              >
                <span>{buttonLabel}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
