"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HireModal } from "@/components/HireModal";
import { JoinModal } from "@/components/JoinModal";
import { CtaBanner } from "@/components/CtaBanner";
import { 
  Mail, 
  PhoneCall, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  MessageSquare, 
  Users, 
  Calendar, 
  ChevronDown, 
  HelpCircle,
  ShieldCheck,
  Zap
} from "lucide-react";

import { usePageContent } from "@/lib/pageContent";
import { saveContactMessage } from "@/lib/contactMessages";
import { renderFormattedHeading } from "@/app/admin/services-hero/page";

export default function ContactPage() {
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  const contactData = usePageContent("contact", {
    key: "contact",
    title: "Contact Us Page",
    path: "/contact",
    headline: "Let's Make Your Next Event Extraordinary",
    subheading: "Whether you need corporate hostesses, VIP security, or full venue crowd logistics across Kenya, our operations team is ready 24/7.",
    metaTitle: "Contact Us — Event Ushers",
    metaDescription: "Get in touch with Event Ushers staffing coordinators.",
    customFields: {
      phone: "+254 700 123 456 / +254 711 987 654",
      email: "info@eventushers.co.ke / bookings@eventushers.co.ke",
      officeAddress: "Westlands Commercial Plaza, 4th Floor, Woodvale Groove, Nairobi, Kenya",
      workingHours: "Monday - Saturday: 8:00 AM - 8:00 PM (24/7 Shift Management)",
    },
  });

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventCategory: "Corporate Summit",
    crewSize: "5-20 Crew Members",
    eventDate: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    saveContactMessage({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      eventCategory: formData.eventCategory,
      crewSize: formData.crewSize,
      eventDate: formData.eventDate,
      message: formData.message,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const faqBadge = contactData.customFields?.faqSectionBadge || "FREQUENTLY ASKED QUESTIONS";
  const faqTitle = contactData.customFields?.faqSectionTitle || "Got Questions? We Have Answers";

  const faqs = [
    {
      q: contactData.customFields?.faq1Question || "How quickly can Event Ushers assemble crew for last-minute requests?",
      a: contactData.customFields?.faq1Answer || "Our real-time matching system can dispatch pre-vetted hostesses, security officers, and ushering crews in as little as 45 to 60 minutes across Nairobi and major Kenyan cities."
    },
    {
      q: contactData.customFields?.faq2Question || "Are all crew members background-checked and protocol trained?",
      a: contactData.customFields?.faq2Answer || "Yes! 100% of our hostesses, protocol officers, and security personnel undergo background identity verification, corporate dress code orientation, VIP seating etiquette, and crowd de-escalation training."
    },
    {
      q: contactData.customFields?.faq3Question || "What happens if a booked crew member encounters a travel delay on event morning?",
      a: contactData.customFields?.faq3Answer || "Our platform uses geo-fenced mobile check-ins 60 minutes prior to doors opening. If any crew member is delayed, our automated standby Engine dispatches pre-cleared reserve crew immediately."
    },
    {
      q: contactData.customFields?.faq4Question || "How do corporate invoicing and crew payments work?",
      a: contactData.customFields?.faq4Answer || "We offer flexible invoicing terms for registered corporate clients (E-TIMS compliant). Crew members receive instant automated disbursements upon shift sign-off, ensuring maximum punctuality and morale."
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
          {(contactData.customFields?.contactHeroBadge || contactData.customFields?.heroBadgeText || "24/7 EVENT CREW SUPPORT & INQUIRIES") && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-bold uppercase tracking-wider bg-amber-500/10 border-amber-500/30 text-amber-800 mb-6 shadow-xs">
              <Mail className="w-4 h-4 text-amber-600" />
              {contactData.customFields?.contactHeroBadge || contactData.customFields?.heroBadgeText || "24/7 EVENT CREW SUPPORT & INQUIRIES"}
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-950 max-w-4xl mx-auto mb-6">
            {renderFormattedHeading(
              contactData.headline || "Get in Touch with Our Staffing Coordinators",
              contactData.customFields?.headlineHighlight || "Staffing Coordinators"
            )}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed font-normal">
            {contactData.subheading}
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Office HQ */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-950">Head Operations Hub</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {contactData.customFields?.officeAddress || "Westlands Commercial Plaza, Ring Road, Westlands, Nairobi, Kenya"}
              </p>
              <div className="pt-2 text-xs font-extrabold text-amber-600 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Nairobi HQ • Kenya Operations</span>
              </div>
            </div>

            {/* Direct Hotline */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-950">Direct Phone & WhatsApp</h3>
              <div className="space-y-1 text-sm font-semibold text-slate-800">
                <p>{contactData.customFields?.phone || "+254 700 000 000 / +254 712 345 678"}</p>
              </div>
              <div className="pt-2 text-xs font-extrabold text-amber-600 flex items-center gap-1">
                <Zap className="w-4 h-4" />
                <span>Instant WhatsApp Responses</span>
              </div>
            </div>

            {/* Email Support */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-950">Corporate Inquiries</h3>
              <div className="space-y-1 text-sm font-semibold text-slate-800">
                <p>{contactData.customFields?.email || "info@eventushers.com / hire@eventushers.com"}</p>
              </div>
              <div className="pt-2 text-xs font-extrabold text-amber-600 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Sub-15 Min Business Reply</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Contact Form & Details Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-7 bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-md">
              <div className="mb-8">
                <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">Send Us A Message</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">Book Crew or Ask a Question</h2>
                <p className="text-sm text-slate-600 mt-2">Fill in your event details below and our coordinator will get in touch immediately.</p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-950">Thank You! Message Received</h3>
                  <p className="text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                    Our operations lead is reviewing your requirements and will reach back out via phone or email within 15 minutes.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-extrabold hover:bg-slate-800"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-extrabold uppercase text-slate-700 tracking-wider">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Wanjiku Kamau"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-amber-500 text-sm text-slate-900 font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-extrabold uppercase text-slate-700 tracking-wider">Work Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. wanjiku@company.co.ke"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-amber-500 text-sm text-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-extrabold uppercase text-slate-700 tracking-wider">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+254 7XX XXX XXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-amber-500 text-sm text-slate-900 font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-extrabold uppercase text-slate-700 tracking-wider">Event Category</label>
                      <select
                        value={formData.eventCategory}
                        onChange={(e) => setFormData({ ...formData, eventCategory: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-amber-500 text-sm text-slate-900 font-semibold"
                      >
                        <option>Corporate Summit</option>
                        <option>Gala & Award Ceremony</option>
                        <option>Wedding & Private Reception</option>
                        <option>Concert & Festival Security</option>
                        <option>Trade Expo & Exhibition</option>
                        <option>Brand Activation</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-extrabold uppercase text-slate-700 tracking-wider">Estimated Crew Size</label>
                      <select
                        value={formData.crewSize}
                        onChange={(e) => setFormData({ ...formData, crewSize: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-amber-500 text-sm text-slate-900 font-semibold"
                      >
                        <option>1-5 Ushers / Hostesses</option>
                        <option>5-20 Crew Members</option>
                        <option>20-50 Staff & Security</option>
                        <option>50+ Multi-Venue Crew</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-extrabold uppercase text-slate-700 tracking-wider">Event Date</label>
                      <input
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-amber-500 text-sm text-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-extrabold uppercase text-slate-700 tracking-wider">Event Details & Specific Needs</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your venue, dress code requirements, shift times, or specific protocol requests..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:outline-none focus:border-amber-500 text-sm text-slate-900 font-medium placeholder-slate-400"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-base shadow-lg shadow-pink-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Information & Regional Coverage Side Column */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Regional Coverage Card */}
              <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6 shadow-xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-extrabold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>NATIONWIDE COVERAGE ACROSS KENYA</span>
                </div>

                <h3 className="text-2xl font-extrabold text-white">Serving All Major Kenyan Hubs</h3>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  Our network of 1,500+ vetted event crew members operates seamlessly across key urban centers and resort destinations.
                </p>

                <ul className="space-y-3 pt-2">
                  {[
                    "Nairobi & Westlands Commercial Hubs",
                    "Mombasa, Nyali & Diani Coastal Resorts",
                    "Kisumu & Lake Region Conventions",
                    "Nakuru & Naivasha Safari Lodge Events",
                    "Eldoret & Rift Valley Trade Summits"
                  ].map((city, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                      <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                      <span>{city}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Fast Emergency Dispatch</p>
                    <p className="text-sm font-extrabold text-amber-400">&lt; 60 Minutes Response</p>
                  </div>
                  <button
                    onClick={() => setHireModalOpen(true)}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-white text-xs font-extrabold shadow-md"
                  >
                    Hire Staff Now
                  </button>
                </div>
              </div>

              {/* Operating Hours Box */}
              <div className="p-8 rounded-3xl bg-amber-50 border border-amber-200 space-y-4">
                <div className="flex items-center gap-3 text-amber-900 font-extrabold text-lg">
                  <Clock className="w-6 h-6 text-amber-600" />
                  <span>Operations Desk Hours</span>
                </div>
                <div className="space-y-2 text-sm text-slate-800 font-medium">
                  <div className="flex justify-between pb-2 border-b border-amber-200/60">
                    <span>Monday - Friday:</span>
                    <span className="font-bold text-slate-950">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-amber-200/60">
                    <span>Saturday - Sunday:</span>
                    <span className="font-bold text-slate-950">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between pt-1 text-amber-900 font-bold">
                    <span>Live Event Days:</span>
                    <span className="text-amber-700">24 / 7 Shift Management</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/30 text-xs font-extrabold">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>{faqBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950">{faqTitle}</h2>
            <p className="text-base text-slate-600 max-w-xl mx-auto">Everything you need to know about booking, crew vetting, protocol, and event coverage.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left font-extrabold text-slate-950 text-base sm:text-lg flex items-center justify-between gap-4 cursor-pointer hover:text-amber-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-600 shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFaq === i && (
                  <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed font-normal border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
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
