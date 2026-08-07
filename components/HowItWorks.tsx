"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Building2,
  UserCheck,
  Search,
  SlidersHorizontal,
  ShieldCheck,
  CalendarCheck2,
  UserPlus,
  Clock,
  Send,
  Lock,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

interface HowItWorksProps {
  onOpenHire?: () => void;
  onOpenJoin?: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenHire, onOpenJoin }) => {
  const [activeTab, setActiveTab] = useState<"organizers" | "professionals">("organizers");

  const organizerSteps = [
    {
      step: "01",
      title: "Post or Search",
      description: "Describe your event or browse verified professionals by category, city, and availability.",
      icon: Search,
      badge: "Step 1",
    },
    {
      step: "02",
      title: "Compare & Shortlist",
      description: "Review portfolios, ratings, past work, and instant quotations side by side.",
      icon: SlidersHorizontal,
      badge: "Step 2",
    },
    {
      step: "03",
      title: "Book & Contract",
      description: "Send a booking request, agree terms digitally, and confirm with secure payment.",
      icon: ShieldCheck,
      badge: "Step 3",
    },
    {
      step: "04",
      title: "Show Day",
      description: "Your crew arrives briefed, verified, and ready. Rate your experience afterward.",
      icon: CalendarCheck2,
      badge: "Step 4",
    },
  ];

  const professionalSteps = [
    {
      step: "01",
      title: "Create your Digital CV",
      description: "Build a portfolio showcasing your skills, experience, and past work.",
      icon: UserPlus,
      badge: "Step 1",
    },
    {
      step: "02",
      title: "Set Your Availability",
      description: "Control your calendar and the gigs you want to be considered for.",
      icon: Clock,
      badge: "Step 2",
    },
    {
      step: "03",
      title: "Receive Bookings",
      description: "Get discovered, negotiate quotations, and confirm jobs digitally.",
      icon: Send,
      badge: "Step 3",
    },
    {
      step: "04",
      title: "Get Paid Securely",
      description: "Payment is protected and released on schedule — no chasing clients for weeks.",
      icon: Lock,
      badge: "Step 4",
    },
  ];

  const activeSteps = activeTab === "organizers" ? organizerSteps : professionalSteps;

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-slate-50 text-slate-900 border-b border-slate-200/80 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-400/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950 text-amber-400 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-4 h-4" />
            <span>HOW IT WORKS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Simple, Transparent & Fast <span className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">Process</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
            Whether you are hosting an international summit or looking for your next hospitality shift, our platform streamlines every step.
          </p>

          {/* Role Switcher Tabs */}
          <div className="pt-4 flex items-center justify-center">
            <div className="p-1.5 bg-slate-200/80 rounded-full flex items-center gap-2 border border-slate-300/70 shadow-inner">
              <button
                onClick={() => setActiveTab("organizers")}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                  activeTab === "organizers"
                    ? "bg-slate-950 text-white shadow-md shadow-slate-950/20"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                }`}
              >
                <Building2 className={`w-4 h-4 ${activeTab === "organizers" ? "text-amber-400" : "text-slate-500"}`} />
                <span>For Organizers</span>
              </button>

              <button
                onClick={() => setActiveTab("professionals")}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                  activeTab === "professionals"
                    ? "bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-md shadow-pink-500/20"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                }`}
              >
                <UserCheck className={`w-4 h-4 ${activeTab === "professionals" ? "text-white" : "text-slate-500"}`} />
                <span>For Professionals</span>
              </button>
            </div>
          </div>
        </div>

        {/* Steps Grid (4 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4">
          {activeSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group bg-white rounded-3xl p-7 border border-slate-200/90 hover:border-amber-500/50 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between relative hover:-translate-y-1.5"
              >
                {/* Top Step Number Badge & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:to-pink-500 transition-colors duration-300 flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors duration-300" />
                    </div>

                    <span className="px-3 py-1 bg-slate-100 text-slate-700 font-mono text-xs font-bold rounded-full group-hover:bg-amber-400/20 group-hover:text-amber-900 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-extrabold text-slate-950 group-hover:text-amber-600 transition-colors mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Step Indicator Bar */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-600">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{item.badge}</span>
                  </div>

                  {idx < activeSteps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all hidden lg:block" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
