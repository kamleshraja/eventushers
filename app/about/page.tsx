"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HireModal } from "@/components/HireModal";
import { JoinModal } from "@/components/JoinModal";
import { CtaBanner } from "@/components/CtaBanner";
import { 
  Sparkles, 
  ShieldCheck, 
  Target, 
  Eye, 
  Users, 
  Award, 
  CheckCircle2, 
  HeartHandshake, 
  MapPin, 
  Zap,
  ArrowRight
} from "lucide-react";

import { usePageContent } from "@/lib/pageContent";

export default function AboutPage() {
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"mission" | "vision">("mission");

  const aboutData = usePageContent("about", {
    key: "about",
    title: "About Us Page",
    path: "/about",
    headline: "Connecting Events with Vetted Crew Across East Africa",
    subheading: "Event Ushers is Kenya's premier tech-enabled staffing platform. We bridge the gap between event organizers and background-checked, corporate-ready staff.",
    metaTitle: "About Us — Event Ushers",
    metaDescription: "Discover our journey, mission, and leadership team elevating event hospitality.",
    customFields: {
      missionStatement: "To transform every event experience across Africa through smart matching technology, top-tier vetted talent, and unyielding commitment to hospitality excellence.",
      visionStatement: "To become the leading digital infrastructure for event staffing, talent management, and hospitality logistics across East Africa and beyond.",
    },
  });

  const metrics = [
    { label: "Verified Crew Members", value: "1,500+", sub: "Trained & Vetted" },
    { label: "High-Profile Events", value: "500+", sub: "Conferences & Galas" },
    { label: "On-Time Guarantee", value: "99.4%", sub: "Punctuality Rating" },
    { label: "Cities Covered", value: "18+", sub: "Across Kenya & East Africa" },
  ];

  const coreValues = [
    {
      icon: ShieldCheck,
      title: "Vetted Integrity & Security",
      description:
        "Every usher and crew member undergoes multi-step identity verification, background screening, and corporate etiquette training before stepping onto your event floor.",
    },
    {
      icon: Zap,
      title: "Instant 24-Hour Dispatch",
      description:
        "Our smart matching platform connects event hosts with qualified, local talent within 24 hours — eliminating last-minute staffing panics.",
    },
    {
      icon: HeartHandshake,
      title: "Hospitality First",
      description:
        "We believe that warm greetings, professional seating management, and flawless VIP protocol transform good events into unforgettable experiences.",
    },
    {
      icon: Award,
      title: "Supervised Accountability",
      description:
        "Our dedicated on-site team leaders manage attendance, dress codes, and workflow coordination so event organizers can focus on their program.",
    },
  ];

  const leadershipTeam = [
    {
      name: "Wanjiru Mwangi",
      title: "Founder & Chief Executive",
      bio: "10+ years in corporate event management across East Africa. Passionate about empowering young professionals through standardized protocol training.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "David Kimani",
      title: "Head of Operations & Logistics",
      bio: "Oversees crew dispatch, venue logistics, and quality assurance across Nairobi, Mombasa, and Kisumu.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Amina Ochieng",
      title: "Lead Protocol & Usher Trainer",
      bio: "Certified hospitality specialist dedicated to training hostesses in VIP etiquette, registration software, and crowd flow management.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
      caption: "International Tech Summit • Nairobi",
    },
    {
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      caption: "Corporate Gala Night • Westlands",
    },
    {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      caption: "On-Site Crew Briefing • Kisumu",
    },
    {
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      caption: "VIP Protocol & Security • Mombasa",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Sticky Navigation */}
      <Navbar
        onOpenHire={() => setHireModalOpen(true)}
        onOpenJoin={() => setJoinModalOpen(true)}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden bg-white text-slate-900 border-b border-slate-100">
        {/* Light Ambient Gold Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge with Button Gradient Border */}
          <div className="inline-block p-[1.5px] rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 mb-6 shadow-sm shadow-pink-500/10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>ABOUT EVENT USHERS</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-950 max-w-4xl mx-auto mb-6">
            {aboutData.headline}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed font-normal mb-8">
            {aboutData.subheading}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setHireModalOpen(true)}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-base shadow-xl shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              Hire Staff Now
            </button>
            <button
              onClick={() => setJoinModalOpen(true)}
              className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold text-base shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              Join as Crew
            </button>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="py-12 bg-amber-50 border-y border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {metrics.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-950">
                  {item.value}
                </div>
                <div className="text-sm font-bold text-slate-900">{item.label}</div>
                <div className="text-xs text-slate-600">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-wider">
                OUR JOURNEY
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Built to Solve Event Staffing <span className="text-gradient-amber">Headaches</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                For years, event organizers across Kenya faced last-minute crew no-shows, unvetted staff, and inconsistent protocol standards. Event Ushers was launched to bring technology, trust, and accountability to event logistics.
              </p>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                Today, our digital hub empowers hundreds of organizers every month while providing structured employment, professional training, and digital payout tracking for ambitious crew members in Nairobi, Mombasa, Kisumu, and beyond.
              </p>

              {/* Tab Selector */}
              <div className="pt-2">
                <div className="inline-flex p-1.5 rounded-2xl border bg-slate-50 border-slate-200 shadow-xs">
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

                <div className="mt-4 p-6 rounded-2xl border bg-slate-50 border-slate-200/80 shadow-xs">
                  {activeTab === "mission" ? (
                    <p className="text-base text-slate-800 leading-relaxed font-medium">
                      "{aboutData.customFields?.missionStatement || "To transform every event experience across Africa through smart matching technology, top-tier vetted talent, and unyielding commitment to hospitality excellence."}"
                    </p>
                  ) : (
                    <p className="text-base text-slate-800 leading-relaxed font-medium">
                      "{aboutData.customFields?.visionStatement || "To become the leading digital infrastructure for event staffing, talent management, and hospitality logistics across East Africa and beyond."}"
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80"
                  alt="Event Ushers Team at Conference"
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-extrabold rounded-full">
                    NAIROBI TECH SUMMIT
                  </span>
                  <h4 className="text-lg font-extrabold">100% Vetted Usher & Hostess Dispatch</h4>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-wider">
              OUR STANDARDS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
              The Principles That <span className="text-gradient-amber">Drive Us</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium">
              We hold our platform and crew to the highest corporate standards in the African event industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center justify-center">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-950">{val.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{val.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Leadership Showcase */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-wider">
              LEADERSHIP & OPERATIONS
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
              Meet the Team Behind <span className="text-gradient-amber">Event Ushers</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium">
              Dedicated professionals committed to elevating hospitality standards across Kenya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipTeam.map((member, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 space-y-2">
                  <h3 className="text-xl font-bold text-slate-950">{member.name}</h3>
                  <p className="text-xs font-extrabold text-amber-700 uppercase tracking-wider">{member.title}</p>
                  <p className="text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-200/60">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Event Showcase Gallery */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-wider">
              PHOTO GALLERY
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
              Our Crew in <span className="text-gradient-amber">Action</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium">
              Highlights from recent galas, summits, and VIP events across East Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="group relative rounded-3xl overflow-hidden shadow-md border border-slate-200 h-72">
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-white text-xs font-extrabold">
                  {img.caption}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Call to Action Banner */}
      <CtaBanner />

      {/* Footer */}
      <Footer
        onOpenHire={() => setHireModalOpen(true)}
        onOpenJoin={() => setJoinModalOpen(true)}
      />

      {/* Modals */}
      <HireModal
        isOpen={hireModalOpen}
        onClose={() => setHireModalOpen(false)}
      />

      <JoinModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
      />
    </main>
  );
}
