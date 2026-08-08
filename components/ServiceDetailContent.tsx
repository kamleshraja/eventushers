"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HireModal } from "@/components/HireModal";
import { JoinModal } from "@/components/JoinModal";
import { CtaBanner } from "@/components/CtaBanner";
import { servicesData } from "@/data/servicesData";
import { ServiceDetail } from "@/components/ServiceModal";
import {
  Sparkles,
  Users,
  UserCheck,
  ShieldCheck,
  Camera,
  Mic2,
  Headset,
  Megaphone,
  Check,
  ArrowLeft,
  ArrowRight,
  Zap,
  Clock,
  Award,
  Video,
  Calendar,
  Layers
} from "lucide-react";
import { getServicesFromApi } from "@/lib/api";

interface ServiceDetailContentProps {
  serviceId: string;
}

export const ServiceDetailContent: React.FC<ServiceDetailContentProps> = ({ serviceId }) => {
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  const [services, setServices] = useState<ServiceDetail[]>(servicesData);

  React.useEffect(() => {
    getServicesFromApi(true).then((data) => {
      if (data && data.length > 0) {
        setServices(data);
      }
    });
  }, []);

  const service = services.find((s) => s.id === serviceId || s.slug === serviceId) || services.find((s) => s.id === "photography-media") || services[0];

  const getIcon = (id: string) => {
    switch (id) {
      case "guest-services":
        return Users;
      case "event-security":
        return ShieldCheck;
      case "event-entertainers":
        return Mic2;
      case "photography-media":
      case "multi-media-production-crew":
        return Camera;
      case "technical-staff":
        return Headset;
      case "event-marketers":
        return Megaphone;
      default:
        return Users;
    }
  };

  const ServiceIcon = getIcon(service.id);
  const otherServices = services.filter((s) => s.active !== false && s.id !== service.id && s.slug !== service.id);

  if (service && service.active === false) {
    return (
      <main className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-amber-500 selection:text-slate-950">
        <Navbar
          onOpenHire={() => setHireModalOpen(true)}
          onOpenJoin={() => setJoinModalOpen(true)}
        />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center pt-36 pb-20 max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
            <X className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-950">Service Currently Inactive</h1>
          <p className="text-slate-600 text-base leading-relaxed">
            The service <span className="font-semibold text-slate-900">"{service.title}"</span> is currently marked inactive and not available for booking.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/services"
              className="px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-sm transition-all shadow-md"
            >
              Browse Active Services
            </Link>
          </div>
        </div>
        <Footer />
        <HireModal isOpen={hireModalOpen} onClose={() => setHireModalOpen(false)} />
        <JoinModal isOpen={joinModalOpen} onClose={() => setJoinModalOpen(false)} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Sticky Navigation */}
      <Navbar
        onOpenHire={() => setHireModalOpen(true)}
        onOpenJoin={() => setJoinModalOpen(true)}
      />

      {/* Hero Header Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden bg-white text-slate-900 border-b border-slate-100">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Back Navigation Link */}
          <div className="mb-6">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-amber-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-amber-500" />
              <span>Back to All Services</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Title & Subheading */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-bold uppercase tracking-wider bg-amber-500/10 border-amber-500/30 text-amber-800 shadow-xs">
                <ServiceIcon className="w-4 h-4 text-amber-600" />
                <span>{service.heroBadgeText || service.category}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed font-normal">
                {service.subheading || service.longDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setHireModalOpen(true)}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-base shadow-xl shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap inline-block"
                >
                  {service.ctaButtonText || `Book ${service.title}`}
                </button>
              </div>
            </div>

            {/* Service Highlight Card */}
            <div className="lg:col-span-4">
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-lg space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md">
                  <ServiceIcon className="w-8 h-8" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-slate-950">Service Overview</h3>
                  <div className="space-y-2 text-xs sm:text-sm font-medium text-slate-700">
                    {(service.overviewChecklist || [
                      "24-Hour Express Dispatch Available",
                      "100% Background Checked Staff",
                      "Includes On-Site Supervisor"
                    ]).map((item, idx) => {
                      const icons = [Clock, ShieldCheck, Award];
                      const IconComp = icons[idx % icons.length];
                      return (
                        <div key={idx} className="flex items-center gap-2">
                          <IconComp className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => setHireModalOpen(true)}
                  className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
                >
                  Request Instant Quote
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Short Summary & Scope Breakdown Section */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Summary Box */}
          <div className="p-8 md:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">Service Summary</h2>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
              {service.longDescription}
            </p>
          </div>

          {/* Full Scope & Highlights */}
          {service.fullScopeDescription && (
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">Detailed Service Scope</h3>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                  {service.fullScopeDescription}
                </p>
              </div>

              {service.scopeHighlights && service.scopeHighlights.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {service.scopeHighlights.map((item, idx) => {
                    const icons = [UserCheck, Video, Calendar, FileCheck];
                    const IconComp = icons[idx % icons.length];
                    return (
                      <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-2 hover:border-amber-400 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <h4 className="font-extrabold text-slate-950 text-base">{item.title}</h4>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      </section>

      {/* Subcategories Breakdown Section */}
      {service.subcategories && service.subcategories.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950 text-amber-400 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Specialized Crew Roles</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">Sub-categories Available</h2>
              <p className="text-slate-600 text-base">Select individual roles or assemble a full end-to-end media production team.</p>
            </div>

            <div className="space-y-12">
              {service.subcategories.map((group, gIdx) => (
                <div key={gIdx} className="space-y-6">
                  <h3 className="text-2xl font-extrabold text-slate-950 border-l-4 border-amber-500 pl-4">
                    {group.groupTitle}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.items.map((subItem, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-amber-400 hover:shadow-md transition-all space-y-2"
                      >
                        <div className="flex items-center gap-2 text-amber-600">
                          <Check className="w-4 h-4 shrink-0 font-extrabold" />
                          <h4 className="font-extrabold text-slate-950 text-base">{subItem.name}</h4>
                        </div>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pl-6">{subItem.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* Why Choose Us & Key Features Section */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Why Choose Us Column */}
            {service.whyChooseUs && service.whyChooseUs.length > 0 ? (
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-950">Why Choose Us</h3>
                </div>

                <div className="space-y-3 pt-2">
                  {service.whyChooseUs.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm sm:text-base font-semibold text-slate-800">
                      <Check className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-950">Key Service Features</h3>
                </div>

                <div className="space-y-3 pt-2">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm sm:text-base font-semibold text-slate-800">
                      <Check className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deliverables Column */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-950">Guaranteed Deliverables</h3>
              </div>

              <div className="space-y-3 pt-2">
                {service.deliverables.map((del, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm sm:text-base font-semibold text-slate-800">
                    <Check className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Ideal For Tags */}
          <div className="mt-12 p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-950">Ideal Event Types for {service.title}</h3>
            <div className="flex flex-wrap gap-2.5">
              {service.idealFor.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs sm:text-sm font-extrabold rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Explore Other Services */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-950">Explore Other Services</h2>
              <p className="text-slate-600 text-sm sm:text-base font-medium">Combine services for complete end-to-end event management.</p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.slice(0, 3).map((item) => {
              const IconComp = getIcon(item.id);
              return (
                <Link
                  key={item.id}
                  href={`/services/${item.slug || item.id}`}
                  className="group bg-slate-50 rounded-3xl p-6 border border-slate-200 hover:border-amber-500/50 hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-slate-950 flex items-center justify-center transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-950 group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2">{item.description}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center text-xs font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* Custom Service Call to Action Banner */}
      {service.ctaHeadline ? (
        <section className="py-16 md:py-24 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {service.ctaHeadline}
            </h2>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {service.ctaSubtext}
            </p>
            <div className="pt-4">
              <button
                onClick={() => setHireModalOpen(true)}
                className="px-9 py-4 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-base shadow-xl shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-block"
              >
                {service.ctaButtonText || "Book Your Production Crew"}
              </button>
            </div>
          </div>
        </section>
      ) : (
        <CtaBanner />
      )}

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
};
