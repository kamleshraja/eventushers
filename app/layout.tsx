import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Event Ushers — Premium Vetted Ushers & Crew Matching Platform",
  description:
    "The all-in-one platform for event organizers to find vetted, reliable, and corporate-ready ushers, hostesses, security, and technical crew in minutes across Kenya.",
  keywords: [
    "Event Ushers",
    "Hostesses Nairobi",
    "Event Staffing Kenya",
    "Hire Ushers Mombasa",
    "Event Security Staff",
    "Protocol Officers",
    "Event Crew Recruitment",
  ],
  authors: [{ name: "Event Ushers" }],
  openGraph: {
    title: "Event Ushers — Premium Vetted Ushers & Crew Matching Platform",
    description:
      "We connect events with vetted ushers & crew — instantly. Hire corporate hostesses, event security, and technical staff.",
    type: "website",
    locale: "en_NG",
    siteName: "Event Ushers",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="font-sans bg-white text-slate-900 antialiased selection:bg-amber-500 selection:text-slate-950">
        {/* Global SVG Gradient Definitions for Icons */}
        <svg width="0" height="0" className="absolute w-0 h-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <defs>
            <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="brand-gradient-reverse" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
