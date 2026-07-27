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
  UserCheck, 
  Shield, 
  Camera, 
  Sliders, 
  TrendingUp, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Award 
} from "lucide-react";

interface ServiceDetailContentProps {
  serviceId: string;
}

export const ServiceDetailContent: React.FC<ServiceDetailContentProps> = ({ serviceId }) => {
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  const service = servicesData.find((s) => s.id === serviceId) || servicesData[0];

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

  const ServiceIcon = getIcon(service.id);
  const otherServices = servicesData.filter((s) => s.id !== service.id);

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
            
            {/* Title & Description */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-bold uppercase tracking-wider bg-amber-500/10 border-amber-500/30 text-amber-800 shadow-xs">
                <ServiceIcon className="w-4 h-4 text-amber-600" />
                <span>{service.category}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed font-normal">
                {service.longDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-base shadow-xl shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap inline-block"
                >
                  Book {service.title}
                </a>
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
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>24-Hour Express Dispatch Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>100% Background Checked Staff</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Includes On-Site Supervisor</span>
                    </div>
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

      {/* Features & Deliverables Section */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Core Features Column */}
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

            {/* Deliverables Column */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
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
          <div className="mt-12 p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
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
                  href={`/services/${item.id}`}
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
};
