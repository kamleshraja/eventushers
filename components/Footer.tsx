import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Mail, Phone, MapPin, Send, CheckCircle2, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import { usePageContent } from "@/lib/pageContent";

interface FooterProps {
  onOpenHire: () => void;
  onOpenJoin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenHire, onOpenJoin }) => {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const contactData = usePageContent("contact", {
    key: "contact",
    title: "Contact Us Page",
    path: "/contact",
    headline: "Get in Touch with Our Staffing Coordinators",
    subheading: "Have questions about hiring ushers, event security, or technical crew?",
    metaTitle: "Contact Us",
    metaDescription: "Contact Us",
    customFields: {
      phone: "+254 (0) 700 EVENT CREW",
      email: "info@eventushers.co.ke",
      officeAddress: "Nairobi, Kenya",
      instagramUrl: "https://instagram.com/eventushers",
      facebookUrl: "https://facebook.com/eventushers",
      twitterUrl: "https://twitter.com/eventushers",
      linkedinUrl: "https://linkedin.com/company/eventushers",
    },
  });

  const displayPhone = contactData.customFields?.phone?.trim() || "+254 (0) 700 EVENT CREW";
  const displayEmail = contactData.customFields?.email?.trim() || "info@eventushers.co.ke";
  const displayLocation = contactData.customFields?.officeAddress?.trim() || "Nairobi, Kenya";

  const instagram = contactData.customFields?.instagramUrl || "https://instagram.com/eventushers";
  const facebook = contactData.customFields?.facebookUrl || "https://facebook.com/eventushers";
  const twitter = contactData.customFields?.twitterUrl || "https://twitter.com/eventushers";
  const linkedin = contactData.customFields?.linkedinUrl || "https://linkedin.com/company/eventushers";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      setSubscribed(true);
    }
  };

  return (
    <footer id="contact" className="bg-white text-slate-900 border-t border-slate-200 pt-10 pb-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Footer Grid - Mobile Optimized (2 cols for links on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-8 border-b border-slate-200">

          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-5 space-y-4">
            <Logo variant="light" />

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-md font-normal">
              Kenya’s premier event crew matching platform. Connecting organizers with vetted hostesses, security, and technical staff in minutes.
            </p>

            {/* Newsletter Subscription Box */}
            <div className="space-y-2 pt-1 max-w-md">
              <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-amber-800">
                Subscribe for Staffing Insights & Updates
              </h4>
              {subscribed ? (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs sm:text-sm font-semibold text-amber-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Thank you for subscribing! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      placeholder="Enter your work email address"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:border-amber-500 text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md shadow-pink-500/20 hover:scale-105 active:scale-95 shrink-0"
                    aria-label="Subscribe"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links Section: Side-by-side 2-column grid on mobile (7 cols on desktop) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8">

            {/* Quick Links Column */}
            <div className="space-y-3">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-950 uppercase tracking-wider">
                Navigation
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-bold text-slate-800">
                <li><Link href="/about" className="hover:text-amber-600 transition-colors">About Us</Link></li>
                <li><Link href="/services" className="hover:text-amber-600 transition-colors">Our Services</Link></li>
                <li><Link href="/blog" className="hover:text-amber-600 transition-colors">Latest News</Link></li>
                <li><Link href="/contact" className="hover:text-amber-600 transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Crew Solutions Column */}
            <div className="space-y-3">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-950 uppercase tracking-wider">
                Services
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-bold text-slate-800">
                <li><Link href="/services/guest-services" className="hover:text-amber-600 transition-colors">Guest Services & Hostesses</Link></li>
                <li><Link href="/services/event-security" className="hover:text-amber-600 transition-colors">VIP Protocol & Security</Link></li>
                <li><Link href="/services/photography-media" className="hover:text-amber-600 transition-colors">Photography & Media</Link></li>
                <li><Link href="/services/technical-staff" className="hover:text-amber-600 transition-colors">Technical & AV Crew</Link></li>
              </ul>
            </div>

            {/* Contact & Support Column */}
            <div className="col-span-2 sm:col-span-1 space-y-3">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-950 uppercase tracking-wider">
                Contact & Support
              </h4>
              <div className="space-y-2 text-xs sm:text-sm font-semibold text-slate-800">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{displayLocation}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                  <a href={`tel:${displayPhone}`} className="hover:text-amber-600 transition-colors">{displayPhone}</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                  <a href={`mailto:${displayEmail}`} className="hover:text-amber-600 transition-colors">{displayEmail}</a>
                </div>
              </div>

              {/* Social Icons */}
              <div className="pt-1 flex items-center gap-2">
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-amber-600 hover:border-amber-500/50 flex items-center justify-center transition-all" aria-label="Instagram">
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a href={facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-amber-600 hover:border-amber-500/50 flex items-center justify-center transition-all" aria-label="Facebook">
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a href={twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-amber-600 hover:border-amber-500/50 flex items-center justify-center transition-all" aria-label="Twitter">
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-amber-600 hover:border-amber-500/50 flex items-center justify-center transition-all" aria-label="LinkedIn">
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-600 font-semibold text-center sm:text-left">
          <p>© {new Date().getFullYear()} Event Ushers Platform Ltd. All rights reserved.  | Developed by <Link href="https://databrainit.com" target="_blank" rel="noopener noreferrer">Databrain Technology Pvt. Ltd.</Link></p>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="hover:text-amber-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-amber-600 transition-colors">Terms of Service</Link>
            <Link href="/blog" className="hover:text-amber-600 transition-colors">Crew Guidelines</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
