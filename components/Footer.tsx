import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Mail, Phone, MapPin, Send, CheckCircle2, Instagram, Facebook, Twitter, Linkedin, Youtube, Video, Globe } from "lucide-react";
import { usePageContent } from "@/lib/pageContent";

interface FooterProps {
  onOpenHire: () => void;
  onOpenJoin: () => void;
}

// TikTok SVG Icon component
const TiktokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525 2.015c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.55-1.35 1.52-1.37 2.51-.04 1.25.66 2.45 1.75 3.01 1.05.57 2.37.49 3.37-.17.84-.54 1.37-1.47 1.45-2.46.04-3.53.01-7.06.02-10.59z" />
  </svg>
);

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

  // Dynamically extract all custom social URL and Icon pairs from customFields
  const dynamicSocialLinks: any[] = [];
  if (contactData.customFields) {
    const fields = contactData.customFields;
    Object.keys(fields).forEach((key) => {
      if (key.endsWith("Url") && key !== "siteLogoUrl" && key !== "heroImageUrl" && key !== "aboutHeroImageUrl") {
        const urlValue = fields[key]?.trim();
        if (urlValue) {
          const prefix = key.replace(/Url$/, "");
          const customIconUrl = fields[`${prefix}IconUrl`] || "";
          
          let defaultName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
          let defaultIcon: React.ComponentType<{ className?: string }> = Globe;
          const lower = urlValue.toLowerCase();

          if (lower.includes("youtube.com") || lower.includes("youtu.be")) {
            defaultName = "YouTube";
            defaultIcon = Youtube;
          } else if (lower.includes("tiktok.com")) {
            defaultName = "TikTok";
            defaultIcon = TiktokIcon;
          } else if (lower.includes("instagram.com")) {
            defaultName = "Instagram";
            defaultIcon = Instagram;
          } else if (lower.includes("facebook.com")) {
            defaultName = "Facebook";
            defaultIcon = Facebook;
          }

          dynamicSocialLinks.push({
            url: urlValue,
            customIconUrl,
            label: defaultName,
            icon: defaultIcon,
          });
        }
      }
    });
  }

  // Ensure exactly max 4 social links are displayed
  const displaySocialLinks = dynamicSocialLinks.slice(0, 4);

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

              {/* Render 4 Social Icons (URL + Optional Custom Icon Image) */}
              <div className="pt-1 flex items-center gap-2">
                {displaySocialLinks.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={idx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-2xl bg-slate-100/90 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-amber-600 hover:border-amber-500/50 flex items-center justify-center transition-all overflow-hidden p-2 shadow-2xs"
                      aria-label={item.label}
                    >
                      {item.customIconUrl ? (
                        <img src={item.customIconUrl} alt={item.label} className="w-full h-full object-contain" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </a>
                  );
                })}
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
