"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HireModal } from "@/components/HireModal";
import { JoinModal } from "@/components/JoinModal";
import { CtaBanner } from "@/components/CtaBanner";
import { usePageContent } from "@/lib/pageContent";
import { renderFormattedHeading } from "@/lib/headingUtils";
import { 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  AlertCircle, 
  UserCheck, 
  Scale, 
  Building2, 
  Mail, 
  HelpCircle,
  Zap,
  Lock
} from "lucide-react";

export default function TermsOfServicePage() {
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  const termsContent = usePageContent("terms", {
    headline: "Terms of Service",
    subheading: "Effective Date: October 2026. Standard terms governing event staffing bookings, hostess dispatches, crew payments, and platform usage across Kenya.",
    customFields: {
      termsHeroBadge: "TERMS OF SERVICE & CLIENT AGREEMENT",
      headlineHighlight: "Service",
      pillar1Title: "100% Attendance Guarantee",
      pillar1Desc: "Standby reserve dispatches ensure zero empty desks at your venue doors.",
      pillar2Title: "E-TIMS & KRA Compliant",
      pillar2Desc: "Transparent invoicing for corporate tax compliance across Kenya.",
      pillar3Title: "Flexible Cancellation",
      pillar3Desc: "No penalty for booking cancellations made 24 hours prior to event start.",
      pillar4Title: "Standardized Protocol",
      pillar4Desc: "Strict adherence to corporate dress code, grooming, and VIP etiquette.",
    },
  });

  const pillars = [
    {
      icon: ShieldCheck,
      title: termsContent.customFields?.pillar1Title || "100% Attendance Guarantee",
      desc: termsContent.customFields?.pillar1Desc || "Standby reserve dispatches ensure zero empty desks at your venue doors."
    },
    {
      icon: CreditCard,
      title: termsContent.customFields?.pillar2Title || "E-TIMS & KRA Compliant",
      desc: termsContent.customFields?.pillar2Desc || "Transparent invoicing for corporate tax compliance across Kenya."
    },
    {
      icon: Clock,
      title: termsContent.customFields?.pillar3Title || "Flexible Cancellation",
      desc: termsContent.customFields?.pillar3Desc || "No penalty for booking cancellations made 24 hours prior to event start."
    },
    {
      icon: UserCheck,
      title: termsContent.customFields?.pillar4Title || "Standardized Protocol",
      desc: termsContent.customFields?.pillar4Desc || "Strict adherence to corporate dress code, grooming, and VIP etiquette."
    }
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Navigation */}
      <Navbar
        onOpenHire={() => setHireModalOpen(true)}
        onOpenJoin={() => setJoinModalOpen(true)}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden bg-white text-slate-900 border-b border-slate-100">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-amber-300/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-bold uppercase tracking-wider bg-amber-500/10 border-amber-500/30 text-amber-800 mb-6 shadow-xs">
            <Scale className="w-4 h-4 text-amber-600" />
            {termsContent.customFields?.termsHeroBadge || termsContent.customFields?.heroBadgeText || "TERMS OF SERVICE & CLIENT AGREEMENT"}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-950 max-w-4xl mx-auto mb-6">
            {renderFormattedHeading(
              termsContent.headline || "Terms of Service",
              termsContent.customFields?.headlineHighlight || "Service"
            )}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed font-normal">
            {termsContent.subheading}
          </p>
        </div>
      </section>

      {/* Pillars Summary Grid */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-950">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Document Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              {termsContent.customFields?.scopeTitle || "1. Acceptance & Agreement Scope"}
            </h2>
            <p className="text-base text-slate-700 leading-relaxed font-normal">
              {termsContent.customFields?.scopePara1 || "This Terms of Service agreement (\"Agreement\") is entered into by and between Event Ushers Platform Ltd (\"Event Ushers\", \"Platform\", \"we\", \"us\") and any person or corporate entity (\"Client\", \"Organizer\", \"You\") using our web applications, booking engine, or contracted crew personnel."}
            </p>
            <p className="text-base text-slate-700 leading-relaxed font-normal">
              {termsContent.customFields?.scopePara2 || "By submitting a crew booking form, signing an event contract, or registering as an event usher, hostess, or security crew member, you agree to comply with all terms herein."}
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4 border-t border-slate-200 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              {termsContent.customFields?.responsibilitiesTitle || "2. Client Responsibilities & Event Setup"}
            </h2>
            <p className="text-base text-slate-700 leading-relaxed font-normal">
              {termsContent.customFields?.responsibilitiesIntro || "To ensure flawless execution, Event Organizers agree to provide:"}
            </p>
            <ul className="space-y-3 text-base text-slate-700 font-normal">
              {(termsContent.customFields?.responsibilitiesItems || "Accurate Event Briefings: Venue details, shift call times, guest count estimates, and specific protocol requirements at least 24 hours prior to shift commencement.\nSafe Working Environment: Secure venue access, designated resting break areas for long shifts (6+ hours), and hydration stations.\nVenue Badging & Credentials: Timely issuance of accreditation passes or wristbands required for crew to access restricted guest zones.")
                .split("\n")
                .map((item, idx) => {
                  const parts = item.split(":");
                  const hasTitle = parts.length > 1;
                  return (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        {hasTitle ? (
                          <>
                            <strong>{parts[0].replace(/^•\s*/, "")}:</strong> {parts.slice(1).join(":")}
                          </>
                        ) : (
                          item
                        )}
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-4 border-t border-slate-200 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              {termsContent.customFields?.slaTitle || "3. Service Level Agreement (SLA) & Headcount Guarantee"}
            </h2>
            <p className="text-base text-slate-700 leading-relaxed font-normal">
              {termsContent.customFields?.slaIntro || "We take pride in our 99.4% on-time attendance rating across Kenya. Our Service Level Guarantees include:"}
            </p>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="font-extrabold text-slate-950 text-base">
                {termsContent.customFields?.slaProtocolTitle || "The 60-Minute Pre-Door Protocol"}
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {termsContent.customFields?.slaProtocolText || "All booked hostesses, security personnel, and protocol officers must complete geo-fenced mobile check-in 60 minutes before guest doors open. If any crew member fails to check in 45 minutes prior, our automated standby engine dispatches pre-cleared reserve crew immediately at no extra charge."}
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="space-y-4 border-t border-slate-200 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              {termsContent.customFields?.ratesTitle || "4. Rates, Billing & Tax Invoicing"}
            </h2>
            <p className="text-base text-slate-700 leading-relaxed font-normal">
              {termsContent.customFields?.ratesIntro || "All financial transactions are conducted transparently in accordance with Kenyan tax laws:"}
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-slate-700">
              {(termsContent.customFields?.ratesItems || "Quotations & Deposits: Written quotes are valid for 14 days. Corporate bookings require a 50% deposit upon contract signing to lock in crew availability.\nE-TIMS Tax Compliance: Event Ushers issues official KRA E-TIMS invoices for all corporate transactions.\nOvertime Hours: Shifts extending more than 30 minutes past agreed completion times are billed at standard hourly rates rounded to the nearest hour.")
                .split("\n")
                .map((item, idx) => {
                  const parts = item.split(":");
                  const hasTitle = parts.length > 1;
                  return (
                    <li key={idx}>
                      • {hasTitle ? <strong>{parts[0].replace(/^•\s*/, "")}:</strong> : ""}{" "}
                      {hasTitle ? parts.slice(1).join(":") : item}
                    </li>
                  );
                })}
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-4 border-t border-slate-200 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              {termsContent.customFields?.cancellationTitle || "5. Cancellation & Rescheduling Policy"}
            </h2>
            <p className="text-base text-slate-700 leading-relaxed font-normal">
              {termsContent.customFields?.cancellationIntro || "We understand that event timelines can change. Cancellation terms are structured as follows:"}
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-sm font-medium">
                {termsContent.customFields?.cancelGreenText || "More than 24 Hours Notice: 100% full refund or complimentary rescheduling to a new date."}
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-sm font-medium">
                {termsContent.customFields?.cancelYellowText || "12 to 24 Hours Notice: 15% administrative processing fee applies; remaining balance fully credited."}
              </div>
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-sm font-medium">
                {termsContent.customFields?.cancelRedText || "Less than 12 Hours Notice: 30% crew mobilization fee retained to compensate assigned personnel who reserved their shift availability."}
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div className="space-y-4 border-t border-slate-200 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              {termsContent.customFields?.conductTitle || "6. Crew Code of Conduct & Etiquette"}
            </h2>
            <p className="text-base text-slate-700 leading-relaxed font-normal">
              {termsContent.customFields?.conductIntro || "All crew members admitted to the Event Ushers network are bound by strict professional standards:"}
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-slate-700 font-normal">
              {(termsContent.customFields?.conductItems || "Grooming & Attire: Immaculate corporate suit, formal dress, or custom branded uniform as specified by the client.\nZero Solicitation: Crew members are strictly prohibited from soliciting personal tips, side employment, or private contact details from event guests or clients.\nVIP Non-Disclosure (NDA): High-profile summits and private galas carry strict confidentiality. Photography of confidential VIP guest lists is strictly forbidden.")
                .split("\n")
                .map((item, idx) => {
                  const parts = item.split(":");
                  const hasTitle = parts.length > 1;
                  return (
                    <li key={idx}>
                      • {hasTitle ? <strong>{parts[0].replace(/^•\s*/, "")}:</strong> : ""}{" "}
                      {hasTitle ? parts.slice(1).join(":") : item}
                    </li>
                  );
                })}
            </ul>
          </div>

          {/* Section 7 */}
          <div className="space-y-4 border-t border-slate-200 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              {termsContent.customFields?.lawTitle || "7. Governing Law & Dispute Resolution"}
            </h2>
            <p className="text-base text-slate-700 leading-relaxed font-normal">
              {termsContent.customFields?.lawText || "This Agreement shall be governed by and construed in accordance with the Laws of the Republic of Kenya. Any disputes arising out of or in connection with this Agreement shall first be resolved through good-faith negotiation, or escalated to arbitration in Nairobi under the Nairobi Centre for International Arbitration (NCIA) rules."}
            </p>
          </div>

          {/* Contact Legal Box */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-4 border border-slate-800">
            <h3 className="text-xl font-extrabold text-white">
              {termsContent.customFields?.legalBoxTitle || "Questions About Our Terms?"}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {termsContent.customFields?.legalBoxSubtext || "If you have any questions regarding client contracts, E-TIMS billing, or crew terms, please contact our legal desk:"}
            </p>
            <div className="space-y-2 text-sm font-semibold text-amber-400 pt-2">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>{termsContent.customFields?.contactLegalEmail || "legal@eventushers.co.ke / support@eventushers.co.ke"}</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300 font-normal text-xs">
                <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{termsContent.customFields?.legalOfficeAddress || "Event Ushers Platform Ltd, Westlands Commercial Plaza, 4th Floor, Nairobi, Kenya"}</span>
              </p>
            </div>
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
