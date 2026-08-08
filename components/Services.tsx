"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ServiceDetail } from "./ServiceModal";
import { servicesData } from "@/data/servicesData";
import { Users, ShieldCheck, Mic2, Camera, Headset, Megaphone, Sparkles, ArrowRight, Check } from "lucide-react";
import { usePageContent } from "@/lib/pageContent";

import { getServicesFromApi } from "@/lib/api";

export { servicesData };

interface ServicesProps {
  onSelectService: (service: ServiceDetail) => void;
  onOpenHire: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService, onOpenHire }) => {
  const [services, setServices] = useState<ServiceDetail[]>(servicesData);

  useEffect(() => {
    const fetchServices = () => {
      getServicesFromApi(true).then((data) => {
        if (data && data.length > 0) {
          setServices(data);
        }
      });
    };

    fetchServices();

    const handleUpdate = () => fetchServices();
    window.addEventListener("eventushers_services_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("eventushers_services_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const activeServices = services.filter((s) => s.active !== false);
  const homeData = usePageContent("home", {
    key: "home",
    title: "Home Page",
    path: "/",
    headline: "We connect events with vetted ushers & crew — instantly.",
    subheading: "The all-in-one platform for event organizers to find vetted, reliable, and professional ushers & crew in minutes.",
    metaTitle: "Event Ushers",
    metaDescription: "We connect events with vetted ushers & crew instantly.",
    customFields: {
      servicesSectionBadge: "OUR CORE SERVICES",
      servicesSectionTitle: "Comprehensive Staffing Solutions Tailored for Every Occasion",
      servicesSectionDescription: "From intimate private banquets to massive international expos, our vetted crew delivers flawless execution.",
    },
  });

  const sectionBadge = homeData.customFields?.servicesSectionBadge || "OUR CORE SERVICES";
  const sectionTitle = homeData.customFields?.servicesSectionTitle || "Comprehensive Staffing Solutions Tailored for Every Occasion";
  const sectionDescription = homeData.customFields?.servicesSectionDescription || "From intimate private banquets to massive international expos, our vetted crew delivers flawless execution.";

  const getIcon = (id: string) => {
    switch (id) {
      case "guest-services":
        return Users;
      case "event-security":
        return ShieldCheck;
      case "event-entertainers":
        return Mic2;
      case "photography-media":
        return Camera;
      case "technical-staff":
        return Headset;
      case "event-marketers":
        return Megaphone;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="services" className="py-16 md:py-20 relative bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950 text-amber-400 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            {sectionBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
            {sectionTitle}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal">
            {sectionDescription}
          </p>
        </div>

        {/* Services Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeServices.map((service) => {
            const Icon = getIcon(service.id);
            return (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group relative bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-amber-500/50 shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 cursor-pointer block"
              >
                {/* Subtle Amber Top Glow on Hover */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-5">
                  {/* Category Pill & Icon */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0 transition-colors duration-300 shadow-xs">
                      <Icon className="w-7 h-7" style={{ stroke: "url(#brand-gradient)" }} />
                    </div>
                    <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-500 group-hover:text-amber-600 transition-colors text-right max-w-[65%] leading-tight pt-1">
                      {service.category}
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

                  {/* Feature Highlights */}
                  {service.features && service.features.length > 0 && (
                    <div className="pt-3 space-y-2 border-t border-slate-200/60">
                      {(service.features || []).slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                          <Check className="w-4 h-4 shrink-0" style={{ stroke: "url(#brand-gradient)" }} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Button */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-bold text-slate-950 group-hover:text-amber-600 flex items-center gap-1.5 transition-colors">
                    <span>Learn More Specs</span>
                    <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 group-hover:from-amber-500 group-hover:to-pink-600 text-white text-xs font-extrabold transition-all shadow-md shadow-pink-500/20 group-hover:scale-105 active:scale-95 whitespace-nowrap">
                    View Details
                  </div>
                </div>

              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
