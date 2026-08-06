"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HireModal } from "@/components/HireModal";
import { JoinModal } from "@/components/JoinModal";
import { ServiceModal, ServiceDetail } from "@/components/ServiceModal";
import { CtaBanner } from "@/components/CtaBanner";
import { servicesData } from "@/components/Services";
import { 
  Sparkles, 
  UserCheck, 
  Shield, 
  Camera, 
  Sliders, 
  TrendingUp, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Award,
  Users
} from "lucide-react";

import { usePageContent } from "@/lib/pageContent";
import { renderFormattedHeading } from "@/lib/headingUtils";

export default function ServicesPage() {
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const servicesDataContent = usePageContent("services", {
    key: "services",
    title: "Services Overview Page",
    path: "/services",
    headline: "Professional Staffing Services for Every Occasion",
    subheading: "From corporate tech summits in Nairobi to beach festivals in Mombasa, our vetted ushers, protocol security, hype hosts, and technical teams ensure seamless execution.",
    metaTitle: "Event Staffing Services — Event Ushers",
    metaDescription: "Explore our vetted staffing categories.",
  });

  const getIcon = (id: string) => {
    switch (id) {
      case "guest-services":
        return UserCheck;
      case "event-security":
        return Shield;
      case "event-entertainers":
        return Sparkles;
      case "photography-media":
        return Camera;
      case "technical-staff":
        return Sliders;
      case "event-marketers":
        return TrendingUp;
      default:
        return UserCheck;
    }
  };

  const guarantees = [
    {
      icon: ShieldCheck,
      title: servicesDataContent.customFields?.guarantee1Title || "100% Vetted Personnel",
      desc: servicesDataContent.customFields?.guarantee1Description || "Background checks, ID verification, and corporate dress code compliance before dispatch.",
    },
    {
      icon: Zap,
      title: servicesDataContent.customFields?.guarantee2Title || "24-Hour Express Dispatch",
      desc: servicesDataContent.customFields?.guarantee2Description || "Emergency crew replacement and last-minute staffing fulfilled within 24 hours.",
    },
    {
      icon: Award,
      title: servicesDataContent.customFields?.guarantee3Title || "On-Site Supervisors",
      desc: servicesDataContent.customFields?.guarantee3Description || "Dedicated team leader on-site at every major event to coordinate flow and attendance.",
    },
    {
      icon: Users,
      title: servicesDataContent.customFields?.guarantee4Title || "Custom Uniform Options",
      desc: servicesDataContent.customFields?.guarantee4Description || "Formal suits, branded polo shirts, traditional attire, or theme-specific hostess outfits.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Sticky Navigation */}
      <Navbar
        onOpenHire={() => setHireModalOpen(true)}
        onOpenJoin={() => setJoinModalOpen(true)}
      />

      {/* Clean White Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden bg-white text-slate-900 border-b border-slate-100">
        {/* Light Ambient Gold Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"
        />

        {servicesDataContent.customFields?.heroImageUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
            style={{ backgroundImage: `url(${servicesDataContent.customFields.heroImageUrl})` }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          {(servicesDataContent.customFields?.servicesHeroBadge || servicesDataContent.customFields?.heroBadgeText || "EXPLORE CORE OFFERINGS") && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-bold uppercase tracking-wider bg-amber-500/10 border-amber-500/30 text-amber-800 mb-6 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-600" />
              {servicesDataContent.customFields?.servicesHeroBadge || servicesDataContent.customFields?.heroBadgeText || "EXPLORE CORE OFFERINGS"}
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-950 max-w-4xl mx-auto mb-6">
            {servicesDataContent.headline}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed font-normal mb-8">
            {servicesDataContent.subheading}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                const url = servicesDataContent.customFields?.primaryCtaUrl;
                if (url && (url.startsWith("/") || url.startsWith("http"))) {
                  window.location.href = url;
                } else {
                  setHireModalOpen(true);
                }
              }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-base shadow-xl shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              {servicesDataContent.customFields?.primaryCtaText || "Hire Staff Now"}
            </button>
            <a
              href={servicesDataContent.customFields?.secondaryCtaUrl || "#services-grid"}
              className="px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold text-base shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              {servicesDataContent.customFields?.secondaryCtaText || "Explore All Categories"}
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services-grid" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
              {renderFormattedHeading(
                servicesDataContent.customFields?.servicesSectionTitle || "Our 6 Core Service Pillars",
                servicesDataContent.customFields?.servicesSectionTitleHighlight || "Service Pillars"
              )}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium">
              {servicesDataContent.customFields?.servicesSectionDescription || "Click any service category to inspect detailed specifications, deliverables, and booking options."}
            </p>
          </div>

          {/* 6 Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => {
              const IconComponent = getIcon(service.id);
              return (
                <div
                  key={service.id}
                  className="group relative bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-amber-500/50 shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
                >
                  {/* Top Accent Gradient Border */}
                  <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="space-y-5">
                    {/* Category Pill & Icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 group-hover:bg-amber-500 text-amber-600 group-hover:text-slate-950 flex items-center justify-center transition-colors duration-300 shadow-xs">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 group-hover:text-amber-600 transition-colors">
                        {service.category.split("&")[0]}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-2xl font-bold text-slate-950 group-hover:text-amber-600 transition-colors mb-2">
                        {service.title}
                      </h3>
                      <p className="text-base text-slate-600 leading-relaxed font-normal">
                        {service.description}
                      </p>
                    </div>

                    {/* Features checklist */}
                    <div className="pt-3 space-y-2 border-t border-slate-200/60">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                          <Check className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/services/${service.id}`}
                      className="text-xs sm:text-sm font-bold text-slate-950 hover:text-amber-600 flex items-center gap-1.5 transition-colors group-hover:translate-x-0.5"
                    >
                      <span>Full Specs</span>
                      <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href={`/services/${service.id}`}
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white text-xs font-extrabold transition-all shadow-md shadow-pink-500/20 hover:scale-105 active:scale-95 whitespace-nowrap"
                    >
                      View Details
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Service Guarantees Section */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-wider">
              {servicesDataContent.customFields?.guaranteesBadge || "OUR PROMISE"}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
              {renderFormattedHeading(
                servicesDataContent.customFields?.guaranteesHeading || "Why Event Organizers Trust Our Crew",
                servicesDataContent.customFields?.guaranteesHeadingHighlight || "Trust Our Crew"
              )}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium">
              {servicesDataContent.customFields?.guaranteesDescription || "We eliminate staffing risks so you can run flawless events every single time."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guarantees.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
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

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenHire={() => setHireModalOpen(true)}
      />
    </main>
  );
}
