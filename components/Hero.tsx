"use client";

import React from "react";
import { ShieldCheck, Sparkles, Star, CheckCircle2, Zap, ArrowRight, UserPlus } from "lucide-react";

import { usePageContent } from "@/lib/pageContent";

interface HeroProps {
  onOpenHire?: () => void;
  onOpenJoin?: () => void;
  heroImage?: string;
}

export const Hero: React.FC<HeroProps> = ({ onOpenHire, onOpenJoin, heroImage }) => {
  const homeData = usePageContent("home", {
    key: "home",
    title: "Home Page",
    path: "/",
    headline: "We connect events with vetted ushers & crew — instantly.",
    subheading: "The all-in-one platform for event organizers to find vetted, reliable, and professional ushers & crew in minutes.",
    metaTitle: "afriCrew",
    metaDescription: "We connect events with vetted ushers & crew instantly.",
    customFields: {
      heroBadgeText: "EASY AND QUICK HIRE",
      heroImageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
      trustHighlight1: "100% Background Vetted",
      trustHighlight2: "Instant Replacement",
      trustHighlight3: "Corporate Protocol",
    },
  });

  const displayImage = heroImage || homeData.customFields?.heroImageUrl || "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80";
  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-white text-slate-900 border-b border-slate-100">
      {/* Light Ambient Gold Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* Left Column: Headline & Content */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">

            {/* Top Brand Pill Badge */}
            <div className="inline-block p-[1.5px] rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 shadow-sm shadow-pink-500/10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                <Zap className="w-4 h-4 text-pink-500" />
                <span>{homeData.customFields?.heroBadgeText || "EASY AND QUICK HIRE"}</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-slate-950">
              {homeData.headline}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 max-w-2xl leading-relaxed font-normal">
              {homeData.subheading}
            </p>

            {/* Quick Trust Highlights */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-3 gap-3 text-xs sm:text-sm font-bold text-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" style={{ stroke: "url(#brand-gradient)" }} />
                </div>
                <span>{homeData.customFields?.trustHighlight1 || "100% Background Vetted"}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ stroke: "url(#brand-gradient)" }} />
                </div>
                <span>{homeData.customFields?.trustHighlight2 || "Instant Replacement"}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" style={{ stroke: "url(#brand-gradient)" }} />
                </div>
                <span>{homeData.customFields?.trustHighlight3 || "Corporate Protocol"}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 opacity-40 blur-lg" />

              <div className="relative rounded-3xl p-3 border shadow-2xl overflow-hidden bg-white border-slate-200">
                <img
                  src={displayImage}
                  alt="Corporate Event Usher & Crew Management"
                  className="w-full h-[360px] sm:h-[400px] lg:h-[420px] object-cover rounded-2xl filter brightness-[0.98]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent rounded-2xl" />

                {/* Floating Glass Metric Badge 1: Rating Card */}
                <div className="absolute top-4 right-4 backdrop-blur-md p-3 rounded-2xl border shadow-xl flex items-center gap-3 animate-float bg-white/95 border-slate-200 text-slate-900">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center font-bold">
                    <Star className="w-5 h-5" style={{ fill: "url(#brand-gradient)", stroke: "url(#brand-gradient)" }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-base font-extrabold text-slate-900">{homeData.customFields?.heroRatingScore || "4.9 / 5"}</span>
                      <span className="text-xs text-amber-500">★★★★★</span>
                    </div>
                    <p className="text-xs text-slate-600 font-semibold">{homeData.customFields?.heroRatingSubtext || "500+ Verified Organizers"}</p>
                  </div>
                </div>

                {/* Floating Glass Metric Badge 2: Status Card */}
                <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md p-3.5 rounded-2xl border shadow-2xl flex items-center justify-between bg-white/95 border-slate-200 text-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={homeData.customFields?.heroStatusAvatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                        alt="Lead Usher"
                        className="w-9 h-9 rounded-full object-cover border-2 border-amber-400 ring-2 ring-amber-400/40"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{homeData.customFields?.heroStatusTitle || "Lead Hostess Assigned"}</h4>
                      <p className="text-xs text-slate-600">{homeData.customFields?.heroStatusLocation || "Nairobi, Kenya"}</p>
                    </div>
                  </div>

                  <span className="px-3.5 py-1 bg-amber-400 text-slate-950 text-xs font-bold rounded-full shadow-xs border border-amber-400/50">
                    {homeData.customFields?.heroStatusBadgeText || "DISPATCHED"}
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
