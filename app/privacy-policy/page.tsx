"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HireModal } from "@/components/HireModal";
import { JoinModal } from "@/components/JoinModal";
import { CtaBanner } from "@/components/CtaBanner";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  UserCheck, 
  MapPin, 
  CreditCard, 
  Mail, 
  CheckCircle2, 
  ArrowLeft,
  Server,
  Globe
} from "lucide-react";

export default function PrivacyPolicyPage() {
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  const keyPillars = [
    {
      icon: ShieldCheck,
      title: "ODPC Compliant",
      desc: "Fully compliant with Kenya Data Protection Act 2019 regulations."
    },
    {
      icon: Lock,
      title: "Bank-Grade Encryption",
      desc: "256-bit SSL encryption in transit & AES-256 data storage at rest."
    },
    {
      icon: MapPin,
      title: "Geo-Fence Transparency",
      desc: "Location pings active strictly during shift verification windows."
    },
    {
      icon: Eye,
      title: "Zero Data Selling",
      desc: "We never sell, rent, or trade personal data to third-party advertisers."
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
            <Lock className="w-4 h-4 text-amber-600" />
            PRIVACY POLICY & DATA PROTECTION
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-950 max-w-4xl mx-auto mb-6">
            Your Privacy & Trust <span className="text-gradient-amber">Matter Most</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed font-normal">
            Last Updated: October 2026. Discover how Event Ushers collects, uses, and safeguards personal data for event organizers and crew members across Kenya.
          </p>
        </div>
      </section>

      {/* Key Protection Pillars Grid */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-950">{pillar.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Document Body Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Introduction */}
          <div className="prose prose-slate max-w-none space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">1. Overview & Scope</h2>
            <p className="text-base text-slate-700 leading-relaxed">
              Event Ushers Platform Ltd ("Event Ushers", "we", "us", or "our") operates the website and mobile crew management platform. This Privacy Policy outlines our procedures regarding the collection, storage, processing, disclosure, and protection of personal data under the <strong>Kenya Data Protection Act (2019)</strong> and international hospitality compliance benchmarks.
            </p>
            <p className="text-base text-slate-700 leading-relaxed">
              This policy applies to all users accessing our services, including event organizers booking staffing, event hostesses, protocol officers, security crew members, and website visitors.
            </p>
          </div>

          {/* Section 2: Data We Collect */}
          <div className="space-y-4 border-t border-slate-200 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">2. Information We Collect</h2>
            <p className="text-base text-slate-700 leading-relaxed">
              We collect information to deliver seamless matching, verified shift check-ins, automated digital payouts, and high-security venue management.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-slate-950 text-base flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-amber-600" />
                  For Event Organizers
                </h4>
                <ul className="space-y-2 text-sm text-slate-700 font-normal">
                  <li>• Business & Contact Person Name</li>
                  <li>• Corporate Email & Phone Number</li>
                  <li>• Venue Location & Event Schedules</li>
                  <li>• Billing, KRA PIN & E-TIMS Invoicing Data</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-slate-950 text-base flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-600" />
                  For Crew Members & Hostesses
                </h4>
                <ul className="space-y-2 text-sm text-slate-700 font-normal">
                  <li>• Full Name, National ID / Passport Copy</li>
                  <li>• Phone Number & M-Pesa Disbursement Account</li>
                  <li>• Professional Headshots & Uniform Sizes</li>
                  <li>• Geo-Fenced Check-In GPS Coordinates</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: How We Use Your Data */}
          <div className="space-y-4 border-t border-slate-200 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">3. How We Use Your Personal Data</h2>
            <p className="text-base text-slate-700 leading-relaxed">
              We process personal information strictly for legitimate operational purposes:
            </p>

            <ul className="space-y-3 text-base text-slate-700 font-normal">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Crew Allocation & Matching:</strong> Matching event venue requirements with qualified, verified crew roster members.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Punctuality & Safety Verification:</strong> Geo-fenced mobile check-ins 60 minutes prior to doors opening to guarantee attendance.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Digital Payroll Disbursements:</strong> Processing immediate after-event payouts via M-Pesa or direct bank APIs.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Customer Support & Emergency Dispatch:</strong> Contacting organizers or crew supervisors during live events.</span>
              </li>
            </ul>
          </div>

          {/* Section 4: Location & Geo-Fencing Data */}
          <div className="space-y-4 border-t border-slate-200 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">4. Location Data & Geo-Fencing Transparency</h2>
            <p className="text-base text-slate-700 leading-relaxed">
              To eliminate no-shows for high-profile summits, our mobile portal requests access to device GPS location during shift check-in windows.
            </p>
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-sm text-slate-800 leading-relaxed font-medium">
              <strong className="text-amber-900">Important Note on Privacy:</strong> Location tracking is only requested when a crew member initiates a shift check-in ping. We do NOT track background locations outside booked event shift hours.
            </div>
          </div>

          {/* Section 5: Data Security & Storage */}
          <div className="space-y-4 border-t border-slate-200 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">5. Data Security & Storage Standards</h2>
            <p className="text-base text-slate-700 leading-relaxed">
              We employ industry-leading technical and organizational security measures to protect data against unauthorized access, loss, or alteration:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <Server className="w-5 h-5 text-amber-600 mb-2" />
                <h4 className="font-extrabold text-slate-950 text-sm">Encrypted Storage</h4>
                <p className="text-xs text-slate-600 mt-1">Database entries and uploaded ID documents are encrypted using AES-256 standard.</p>
              </div>
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <Globe className="w-5 h-5 text-amber-600 mb-2" />
                <h4 className="font-extrabold text-slate-950 text-sm">TLS/SSL In Transit</h4>
                <p className="text-xs text-slate-600 mt-1">All communications between browsers, mobile web apps, and servers are TLS encrypted.</p>
              </div>
            </div>
          </div>

          {/* Section 6: Your Rights Under Kenya Data Protection Act */}
          <div className="space-y-4 border-t border-slate-200 pt-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">6. Your Rights & Data Choices</h2>
            <p className="text-base text-slate-700 leading-relaxed">
              Under the Office of the Data Protection Commissioner (ODPC) Kenya, you possess the following rights:
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-slate-700">
              <li>• <strong>Right to Access:</strong> Request a full copy of personal data stored in our system.</li>
              <li>• <strong>Right to Rectification:</strong> Update inaccurate contact details or payment details.</li>
              <li>• <strong>Right to Erasure ("Right to be Forgotten"):</strong> Request removal of your crew profile or organizer account.</li>
              <li>• <strong>Right to Object:</strong> Opt out of marketing newsletters or non-essential communications anytime.</li>
            </ul>
          </div>

          {/* Section 7: Contact Data Officer */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-4 border border-slate-800">
            <h3 className="text-xl font-extrabold text-white">Contact Our Data Protection Officer (DPO)</h3>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              If you have any questions regarding this Privacy Policy, wish to exercise your data rights, or submit a data inquiry, please contact our privacy compliance team:
            </p>
            <div className="space-y-2 text-sm font-semibold text-amber-400 pt-2">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>dpo@eventushers.co.ke / privacy@eventushers.co.ke</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300 font-normal text-xs">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Event Ushers Platform Ltd, Westlands Commercial Plaza, Nairobi, Kenya</span>
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
