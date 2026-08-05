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

  const aboutData = usePageContent("about", {
    key: "about",
    title: "About Us Page",
    path: "/about",
    headline: "Connecting Events with Vetted Crew Across East Africa",
    subheading: "Event Ushers is Kenya's premier tech-enabled staffing platform. We bridge the gap between event organizers and background-checked, corporate-ready staff.",
    metaTitle: "About Us — Event Ushers",
    metaDescription: "Discover our journey, mission, and leadership team elevating event hospitality.",
    customFields: {
      ourJourneyBadge: "OUR JOURNEY",
      ourJourneyHeading: "Built to Solve Event Staffing",
      ourJourneyHeadingHighlight: "Headaches",
      ourJourneyIntro: "For years, event organizers across Kenya faced last-minute crew no-shows, unvetted staff, and inconsistent protocol standards. Event Ushers was launched to bring technology, trust, and accountability to event logistics.",
      ourJourneyExtraDescription: "Today, our digital hub empowers hundreds of organizers every month while providing structured employment, professional training, and digital payout tracking for ambitious crew members in Nairobi, Mombasa, Kisumu, and beyond.",
      missionTabTitle: "Our Mission",
      missionStatement: "To transform every event experience across Africa through smart matching technology, top-tier vetted talent, and unyielding commitment to hospitality excellence.",
      visionTabTitle: "Our Vision",
      visionStatement: "To become the leading digital infrastructure for event staffing, talent management, and hospitality logistics across East Africa and beyond.",
      ourJourneyFeaturedImageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
      ourJourneyImageBadge: "NAIROBI TECH SUMMIT",
      ourJourneyImageCaption: "100% Vetted Usher & Hostess Dispatch",
      ourJourneyImageAltText: "Event Ushers Team at Conference",
      ourStandardsBadge: "OUR STANDARDS",
      ourStandardsHeading: "The Principles That",
      ourStandardsHeadingHighlight: "Drive Us",
      ourStandardsDescription: "We hold our platform and crew to the highest corporate standards in the African event industry.",
      leadershipBadge: "LEADERSHIP & OPERATIONS",
      leadershipHeading: "Meet the Team Behind",
      leadershipHeadingHighlight: "Event Ushers",
      leadershipDescription: "Dedicated professionals committed to elevating hospitality standards across Kenya.",
      galleryBadge: "PHOTO GALLERY",
      galleryHeading: "Our Crew in",
      galleryHeadingHighlight: "Action",
      galleryDescription: "Highlights from recent galas, summits, and VIP events across East Africa.",
    },
  });

  const defaultTab = (aboutData.customFields?.defaultActiveTab as "mission" | "vision") || "mission";
  const [activeTab, setActiveTab] = useState<"mission" | "vision">(defaultTab);

  React.useEffect(() => {
    if (aboutData.customFields?.defaultActiveTab) {
      setActiveTab(aboutData.customFields.defaultActiveTab as "mission" | "vision");
    }
  }, [aboutData.customFields?.defaultActiveTab]);

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

  const aboutHeroBadge = aboutData.customFields?.aboutHeroBadge || "ABOUT EVENT USHERS";
  const primaryCtaText = aboutData.customFields?.primaryCtaText || "Hire Staff Now";
  const primaryCtaUrl = aboutData.customFields?.primaryCtaUrl || "#hire";
  const secondaryCtaText = aboutData.customFields?.secondaryCtaText || "Join as Crew";
  const secondaryCtaUrl = aboutData.customFields?.secondaryCtaUrl || "#join";

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
              <span>{aboutHeroBadge}</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-950 max-w-4xl mx-auto mb-6">
            {aboutData.headline}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed font-normal mb-8">
            {aboutData.subheading}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {primaryCtaText && (
              <button
                onClick={() => {
                  if (primaryCtaUrl === "#hire" || primaryCtaUrl === "#") {
                    setHireModalOpen(true);
                  } else {
                    window.location.href = primaryCtaUrl;
                  }
                }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-base shadow-xl shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                {primaryCtaText}
              </button>
            )}

            {secondaryCtaText && (
              <button
                onClick={() => {
                  if (secondaryCtaUrl === "#join" || secondaryCtaUrl === "#") {
                    setJoinModalOpen(true);
                  } else {
                    window.location.href = secondaryCtaUrl;
                  }
                }}
                className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold text-base shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                {secondaryCtaText}
              </button>
            )}
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

      {/* Our Journey Section (Visible only when Status = Active) */}
      {(aboutData.customFields?.ourJourneyStatus || "Active") === "Active" && (
        <section className="py-16 md:py-24 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  {aboutData.customFields?.ourJourneyBadge || "OUR JOURNEY"}
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                  {aboutData.customFields?.ourJourneyHeading || "Built to Solve Event Staffing"}{" "}
                  {aboutData.customFields?.ourJourneyHeadingHighlight && (
                    <span className="text-gradient-amber">
                      {aboutData.customFields.ourJourneyHeadingHighlight}
                    </span>
                  )}
                </h2>

                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                  {aboutData.customFields?.ourJourneyIntro ||
                    "For years, event organizers across Kenya faced last-minute crew no-shows, unvetted staff, and inconsistent protocol standards. Event Ushers was launched to bring technology, trust, and accountability to event logistics."}
                </p>

                {aboutData.customFields?.ourJourneyExtraDescription && (
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                    {aboutData.customFields.ourJourneyExtraDescription}
                  </p>
                )}

                {/* Mission & Vision Dynamic Tab Selector */}
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
                      {aboutData.customFields?.missionIconUrl ? (
                        <img
                          src={aboutData.customFields.missionIconUrl}
                          alt="Mission Icon"
                          className="w-4 h-4 object-contain"
                        />
                      ) : (
                        <Target className="w-4 h-4" />
                      )}
                      <span>{aboutData.customFields?.missionTabTitle || "Our Mission"}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("vision")}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                        activeTab === "vision"
                          ? "bg-gradient-to-r from-amber-400 to-pink-500 text-white shadow-md shadow-pink-500/20"
                          : "text-slate-700 hover:text-amber-600"
                      }`}
                    >
                      {aboutData.customFields?.visionIconUrl ? (
                        <img
                          src={aboutData.customFields.visionIconUrl}
                          alt="Vision Icon"
                          className="w-4 h-4 object-contain"
                        />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                      <span>{aboutData.customFields?.visionTabTitle || "Our Vision"}</span>
                    </button>
                  </div>

                  {/* Tab Content Card */}
                  <div className="mt-4 p-6 rounded-2xl border bg-slate-50 border-slate-200/80 shadow-xs">
                    {activeTab === "mission" ? (
                      <p className="text-base text-slate-800 leading-relaxed font-medium">
                        "{aboutData.customFields?.missionStatement ||
                          "To transform every event experience across Africa through smart matching technology, top-tier vetted talent, and unyielding commitment to hospitality excellence."}"
                      </p>
                    ) : (
                      <p className="text-base text-slate-800 leading-relaxed font-medium">
                        "{aboutData.customFields?.visionStatement ||
                          "To become the leading digital infrastructure for event staffing, talent management, and hospitality logistics across East Africa and beyond."}"
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Featured Image with Badge & Caption */}
              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
                  <img
                    src={
                      aboutData.customFields?.ourJourneyFeaturedImageUrl ||
                      aboutData.customFields?.ourJourneyFeaturedImage ||
                      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80"
                    }
                    alt={
                      aboutData.customFields?.ourJourneyImageAltText ||
                      aboutData.customFields?.ourJourneyImageCaption ||
                      "Our Journey Showcase"
                    }
                    className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    {aboutData.customFields?.ourJourneyImageBadge && (
                      <span className="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-extrabold rounded-full inline-block">
                        {aboutData.customFields.ourJourneyImageBadge}
                      </span>
                    )}
                    {aboutData.customFields?.ourJourneyImageCaption && (
                      <h4 className="text-lg font-extrabold">
                        {aboutData.customFields.ourJourneyImageCaption}
                      </h4>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Our Standards Section (Visible when Status = Active) */}
      {(aboutData.customFields?.ourStandardsStatus || "Active") === "Active" && (
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="max-w-3xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-wider">
                {aboutData.customFields?.ourStandardsBadge || "OUR STANDARDS"}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
                {aboutData.customFields?.ourStandardsHeading || "The Principles That"}{" "}
                <span className="text-gradient-amber">
                  {aboutData.customFields?.ourStandardsHeadingHighlight || "Drive Us"}
                </span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-medium">
                {aboutData.customFields?.ourStandardsDescription ||
                  "We hold our platform and crew to the highest corporate standards in the African event industry."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
              {[
                {
                  icon: ShieldCheck,
                  title: aboutData.customFields?.standard1Title || "Vetted Integrity & Security",
                  description:
                    aboutData.customFields?.standard1Description ||
                    "Every usher and crew member undergoes multi-step identity verification, background screening, and corporate etiquette training before stepping onto your event floor.",
                },
                {
                  icon: Zap,
                  title: aboutData.customFields?.standard2Title || "Instant 24-Hour Dispatch",
                  description:
                    aboutData.customFields?.standard2Description ||
                    "Our smart matching platform connects event hosts with qualified, local talent within 24 hours — eliminating last-minute staffing panics.",
                },
                {
                  icon: HeartHandshake,
                  title: aboutData.customFields?.standard3Title || "Hospitality First",
                  description:
                    aboutData.customFields?.standard3Description ||
                    "We believe that warm greetings, professional seating management, and flawless VIP protocol transform good events into unforgettable experiences.",
                },
                {
                  icon: Award,
                  title: aboutData.customFields?.standard4Title || "Supervised Accountability",
                  description:
                    aboutData.customFields?.standard4Description ||
                    "Our dedicated on-site team leaders manage attendance, dress codes, and workflow coordination so event organizers can focus on their program.",
                },
              ].map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
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
      )}

      {/* Leadership Showcase (Visible when Status = Active) */}
      {(aboutData.customFields?.leadershipStatus || "Active") === "Active" && (
        <section className="py-16 md:py-24 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-wider">
                {aboutData.customFields?.leadershipBadge || "LEADERSHIP & OPERATIONS"}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
                {aboutData.customFields?.leadershipHeading || "Meet the Team Behind"}{" "}
                <span className="text-gradient-amber">
                  {aboutData.customFields?.leadershipHeadingHighlight || "Event Ushers"}
                </span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-medium">
                {aboutData.customFields?.leadershipDescription ||
                  "Dedicated professionals committed to elevating hospitality standards across Kenya."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: aboutData.customFields?.member1Name || "Wanjiru Mwangi",
                  role: aboutData.customFields?.member1Role || "FOUNDER & CHIEF EXECUTIVE",
                  bio:
                    aboutData.customFields?.member1Bio ||
                    "10+ years in corporate event management across East Africa. Passionate about empowering young professionals through standardized protocol training.",
                  image:
                    aboutData.customFields?.member1ImageUrl ||
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
                },
                {
                  name: aboutData.customFields?.member2Name || "David Kimani",
                  role: aboutData.customFields?.member2Role || "HEAD OF OPERATIONS & LOGISTICS",
                  bio:
                    aboutData.customFields?.member2Bio ||
                    "Oversees crew dispatch, venue logistics, and quality assurance across Nairobi, Mombasa, and Kisumu.",
                  image:
                    aboutData.customFields?.member2ImageUrl ||
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
                },
                {
                  name: aboutData.customFields?.member3Name || "Amina Ochieng",
                  role: aboutData.customFields?.member3Role || "LEAD PROTOCOL & USHER TRAINER",
                  bio:
                    aboutData.customFields?.member3Bio ||
                    "Certified hospitality specialist dedicated to training hostesses in VIP etiquette, registration software, and crowd flow management.",
                  image:
                    aboutData.customFields?.member3ImageUrl ||
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
                },
              ].map((member, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6 space-y-2">
                    <h3 className="text-xl font-bold text-slate-950">{member.name}</h3>
                    <p className="text-xs font-extrabold text-amber-700 uppercase tracking-wider">{member.role}</p>
                    <p className="text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-200/60">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* Event Showcase Gallery (Visible when Status = Active) */}
      {(aboutData.customFields?.galleryStatus || "Active") === "Active" && (
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-wider">
                {aboutData.customFields?.galleryBadge || "PHOTO GALLERY"}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
                {aboutData.customFields?.galleryHeading || "Our Crew in"}{" "}
                <span className="text-gradient-amber">
                  {aboutData.customFields?.galleryHeadingHighlight || "Action"}
                </span>
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-medium">
                {aboutData.customFields?.galleryDescription ||
                  "Highlights from recent galas, summits, and VIP events across East Africa."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  caption: aboutData.customFields?.gallery1Caption || "International Tech Summit • Nairobi",
                  url:
                    aboutData.customFields?.gallery1ImageUrl ||
                    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
                },
                {
                  caption: aboutData.customFields?.gallery2Caption || "Corporate Gala Night • Westlands",
                  url:
                    aboutData.customFields?.gallery2ImageUrl ||
                    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
                },
                {
                  caption: aboutData.customFields?.gallery3Caption || "On-Site Crew Briefing • Kisumu",
                  url:
                    aboutData.customFields?.gallery3ImageUrl ||
                    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
                },
                {
                  caption: aboutData.customFields?.gallery4Caption || "VIP Protocol & Security • Mombasa",
                  url:
                    aboutData.customFields?.gallery4ImageUrl ||
                    "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80",
                },
              ].map((img, idx) => (
                <div key={idx} className="group relative rounded-3xl overflow-hidden shadow-md border border-slate-200 h-72">
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-sm font-bold">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

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
