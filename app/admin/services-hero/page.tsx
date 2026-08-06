"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { STORAGE_KEY, UPDATE_EVENT, ManagedPageData, getStoredPageContent } from "@/lib/pageContent";
import { API_BASE_URL } from "@/lib/api";
import {
  Sparkles,
  Save,
  CheckCircle2,
  RotateCcw,
  ExternalLink,
  ArrowLeft,
  Eye,
  Layers,
  Globe,
  Tag,
  Type,
  AlignLeft,
  Link2,
  Image as ImageIcon,
  Search,
  Highlighter
} from "lucide-react";

export function renderFormattedHeading(text: string, highlight?: string) {
  if (!text) return null;

  // 1. Check for curly braces syntax {word}
  if (text.includes("{") && text.includes("}")) {
    const parts = text.split(/(\{.*?\})/g);
    return (
      <>
        {parts.map((part, idx) => {
          if (part.startsWith("{") && part.endsWith("}")) {
            const inner = part.slice(1, -1);
            return (
              <span key={idx} className="bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 bg-clip-text text-transparent font-extrabold">
                {inner}
              </span>
            );
          }
          return part;
        })}
      </>
    );
  }

  // 2. Check for explicit highlight phrase
  if (highlight && highlight.trim() && text.includes(highlight.trim())) {
    const parts = text.split(highlight.trim());
    return (
      <>
        {parts.map((part, idx) => (
          <React.Fragment key={idx}>
            {part}
            {idx < parts.length - 1 && (
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 bg-clip-text text-transparent font-extrabold">
                {highlight.trim()}
              </span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  }

  return text;
}

export default function AdminServicesHeroPage() {
  const defaultHeroData = {
    badgeText: "EVENT CREW SOLUTIONS",
    headline: "Comprehensive Staffing Solutions Tailored for Every Occasion",
    headlineHighlight: "Tailored for Every Occasion",
    subheading: "From intimate private banquets to massive international expos, our vetted crew delivers flawless execution.",
    primaryCtaText: "Hire Staff Now",
    primaryCtaUrl: "#hire",
    secondaryCtaText: "Explore All Categories",
    secondaryCtaUrl: "#services-grid",
    bgStyle: "ambient-gold",
    heroImageUrl: "",
    metaTitle: "Event Staffing Services — Event Ushers",
    metaDescription: "Explore our vetted staffing categories: corporate hostesses, event security bouncers, AV technicians, and media crews.",
  };

  const [heroBadgeText, setHeroBadgeText] = useState(defaultHeroData.badgeText);
  const [headline, setHeadline] = useState(defaultHeroData.headline);
  const [headlineHighlight, setHeadlineHighlight] = useState(defaultHeroData.headlineHighlight);
  const [subheading, setSubheading] = useState(defaultHeroData.subheading);
  const [primaryCtaText, setPrimaryCtaText] = useState(defaultHeroData.primaryCtaText);
  const [primaryCtaUrl, setPrimaryCtaUrl] = useState(defaultHeroData.primaryCtaUrl);
  const [secondaryCtaText, setSecondaryCtaText] = useState(defaultHeroData.secondaryCtaText);
  const [secondaryCtaUrl, setSecondaryCtaUrl] = useState(defaultHeroData.secondaryCtaUrl);
  const [bgStyle, setBgStyle] = useState(defaultHeroData.bgStyle);
  const [heroImageUrl, setHeroImageUrl] = useState(defaultHeroData.heroImageUrl);
  const [metaTitle, setMetaTitle] = useState(defaultHeroData.metaTitle);
  const [metaDescription, setMetaDescription] = useState(defaultHeroData.metaDescription);

  const [saving, setSaving] = useState(false);
  const [savedNotification, setSavedNotification] = useState(false);

  useEffect(() => {
    // Load existing services page data
    const storedServices = getStoredPageContent("services");
    if (storedServices) {
      if (storedServices.headline) setHeadline(storedServices.headline);
      if (storedServices.subheading) setSubheading(storedServices.subheading);
      if (storedServices.metaTitle) setMetaTitle(storedServices.metaTitle);
      if (storedServices.metaDescription) setMetaDescription(storedServices.metaDescription);

      const custom = storedServices.customFields || {};
      if (custom.heroBadgeText || custom.servicesHeroBadge) {
        setHeroBadgeText(custom.heroBadgeText || custom.servicesHeroBadge || defaultHeroData.badgeText);
      }
      if (custom.headlineHighlight) setHeadlineHighlight(custom.headlineHighlight);
      if (custom.primaryCtaText) setPrimaryCtaText(custom.primaryCtaText);
      if (custom.primaryCtaUrl) setPrimaryCtaUrl(custom.primaryCtaUrl);
      if (custom.secondaryCtaText) setSecondaryCtaText(custom.secondaryCtaText);
      if (custom.secondaryCtaUrl) setSecondaryCtaUrl(custom.secondaryCtaUrl);
      if (custom.bgStyle) setBgStyle(custom.bgStyle);
      if (custom.heroImageUrl) setHeroImageUrl(custom.heroImageUrl);
    } else {
      // Fetch from API backend if available
      fetch(`${API_BASE_URL}/pages/services`, { cache: "no-store" })
        .then((res) => res.json())
        .then((json) => {
          if (json.success && json.data) {
            const data = json.data;
            if (data.heroHeadline) setHeadline(data.heroHeadline);
            if (data.heroSubheading) setSubheading(data.heroSubheading);
            if (data.metaTitle) setMetaTitle(data.metaTitle);
            if (data.metaDescription) setMetaDescription(data.metaDescription);

            const custom = data.customContent || {};
            if (custom.heroBadgeText || custom.servicesHeroBadge) {
              setHeroBadgeText(custom.heroBadgeText || custom.servicesHeroBadge);
            }
            if (custom.headlineHighlight) setHeadlineHighlight(custom.headlineHighlight);
            if (custom.primaryCtaText) setPrimaryCtaText(custom.primaryCtaText);
            if (custom.primaryCtaUrl) setPrimaryCtaUrl(custom.primaryCtaUrl);
            if (custom.secondaryCtaText) setSecondaryCtaText(custom.secondaryCtaText);
            if (custom.secondaryCtaUrl) setSecondaryCtaUrl(custom.secondaryCtaUrl);
            if (custom.bgStyle) setBgStyle(custom.bgStyle);
            if (custom.heroImageUrl) setHeroImageUrl(custom.heroImageUrl);
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const updatedCustomFields: Record<string, string> = {
      heroBadgeText,
      servicesHeroBadge: heroBadgeText,
      headlineHighlight,
      primaryCtaText,
      primaryCtaUrl,
      secondaryCtaText,
      secondaryCtaUrl,
      bgStyle,
      heroImageUrl,
    };

    const payload: ManagedPageData = {
      key: "services",
      title: "Services Overview Page",
      path: "/services",
      headline,
      subheading,
      metaTitle,
      metaDescription,
      customFields: updatedCustomFields,
    };

    // 1. Update localStorage & dispatch event for instant frontend refresh
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        let pagesList: ManagedPageData[] = [];
        if (raw) pagesList = JSON.parse(raw);
        const idx = pagesList.findIndex((p) => p.key === "services");
        if (idx > -1) {
          pagesList[idx] = payload;
        } else {
          pagesList.push(payload);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(pagesList));
        window.dispatchEvent(new Event(UPDATE_EVENT));
      } catch (err) {
        console.error("Failed to update local storage", err);
      }
    }

    // 2. Sync to Mongo API backend
    try {
      await fetch(`${API_BASE_URL}/pages/services`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageKey: "services",
          pageTitle: "Services Overview Page",
          path: "/services",
          heroHeadline: headline,
          heroSubheading: subheading,
          metaTitle,
          metaDescription,
          customContent: updatedCustomFields,
        }),
      });
    } catch (err) {
      console.warn("Backend API sync fallback executed");
    }

    setSaving(false);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 4000);
  };

  const handleReset = () => {
    if (confirm("Reset Services Hero Section back to default content?")) {
      setHeroBadgeText(defaultHeroData.badgeText);
      setHeadline(defaultHeroData.headline);
      setHeadlineHighlight(defaultHeroData.headlineHighlight);
      setSubheading(defaultHeroData.subheading);
      setPrimaryCtaText(defaultHeroData.primaryCtaText);
      setPrimaryCtaUrl(defaultHeroData.primaryCtaUrl);
      setSecondaryCtaText(defaultHeroData.secondaryCtaText);
      setSecondaryCtaUrl(defaultHeroData.secondaryCtaUrl);
      setBgStyle(defaultHeroData.bgStyle);
      setHeroImageUrl(defaultHeroData.heroImageUrl);
      setMetaTitle(defaultHeroData.metaTitle);
      setMetaDescription(defaultHeroData.metaDescription);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("eventushers_admin_token");
    }
    window.location.href = "/admin/login";
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-slate-950">
      <AdminSidebar onLogout={handleLogout} />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title="Services Hero Section Manager"
          subtitle="Dynamically manage the badge, headline text, description, and CTA buttons on the Services page"
        />

        <main className="p-6 md:p-8 space-y-8 flex-1 max-w-7xl mx-auto w-full">
          {/* Top Bar Actions & Breadcrumb */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/services"
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Back to Core Services"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                    Hero Section Module
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 font-semibold">Public Route: /services</span>
                </div>
                <h2 className="text-xl font-black text-slate-950 mt-0.5">Services Hero Section</h2>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <Link
                href="/services"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
              >
                <Eye className="w-4 h-4 text-amber-600" />
                View Public Services Page
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 font-bold text-xs transition-colors border border-slate-200 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white font-extrabold text-xs shadow-md shadow-pink-500/20 cursor-pointer transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {saving ? (
                  <Sparkles className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Hero Banner
              </button>
            </div>
          </div>

          {/* Success Toast */}
          {savedNotification && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-sm font-extrabold">Services Hero Section Updated Successfully!</p>
                  <p className="text-xs text-emerald-700">Changes are live on the public /services page.</p>
                </div>
              </div>
              <Link
                href="/services"
                target="_blank"
                className="text-xs font-black text-emerald-700 hover:text-emerald-950 underline inline-flex items-center gap-1"
              >
                Check Live Page &rarr;
              </Link>
            </div>
          )}

          {/* Live Preview Card */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-600" />
                Live Interactive Hero Banner Preview
              </span>
              <span className="text-xs text-slate-400 font-medium">Matches exact layout on /services</span>
            </div>

            <div className="relative rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-lg">
              {/* Clean White Hero Background */}
              <div className="pt-16 pb-16 px-6 md:px-12 relative overflow-hidden bg-white text-slate-900 border-b border-slate-100 min-h-[340px] flex flex-col justify-center">
                {/* Light Ambient Gold Glow */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-[120px] pointer-events-none" />

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />

                {heroImageUrl && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
                    style={{ backgroundImage: `url(${heroImageUrl})` }}
                  />
                )}

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
                  {/* Hero Badge */}
                  {heroBadgeText && (
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider bg-amber-500/10 border-amber-500/30 text-amber-800 shadow-xs">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      {heroBadgeText}
                    </div>
                  )}

                  {/* Main Headline with Highlight Support */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-slate-950 max-w-3xl mx-auto">
                    {renderFormattedHeading(headline || "Enter Headline...", headlineHighlight)}
                  </h1>

                  {/* Subheading / Description */}
                  <p className="text-sm sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed font-normal">
                    {subheading || "Enter Description..."}
                  </p>

                  {/* Action CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-white font-extrabold text-sm shadow-xl shadow-pink-500/25 pointer-events-none whitespace-nowrap">
                      {primaryCtaText || "Hire Staff Now"}
                    </button>
                    <button className="px-8 py-3.5 rounded-full bg-white text-slate-900 border border-slate-300 font-bold text-sm shadow-xs pointer-events-none whitespace-nowrap">
                      {secondaryCtaText || "Explore All Categories"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Settings Grid */}
          <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Section 1: Hero Content (2 Cols) */}
            <div className="lg:col-span-2 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-black uppercase tracking-wider mb-2">
                  SECTION 1
                </div>
                <h3 className="text-xl font-black text-slate-950 flex items-center gap-2">
                  <Type className="w-5 h-5 text-amber-600" />
                  Hero Content Settings
                </h3>
                <p className="text-xs text-slate-500">
                  Manage the badge, main heading (with highlighted text), description, and primary/secondary CTA buttons.
                </p>
              </div>

              {/* Field 1: Section Badge Text */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-600" />
                    Section Badge Text
                  </span>
                  <span className="text-[10px] text-amber-600 font-semibold">Field 1</span>
                </label>
                <input
                  type="text"
                  value={heroBadgeText}
                  onChange={(e) => setHeroBadgeText(e.target.value)}
                  placeholder="e.g., EVENT CREW SOLUTIONS"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-sm font-semibold transition-all"
                />
                <p className="text-[11px] text-slate-400">Pill badge shown above the main heading on the Services page.</p>
              </div>

              {/* Field 2: Main Heading & Highlighted Text */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Type className="w-3.5 h-3.5 text-amber-600" />
                      Main Heading
                    </span>
                    <span className="text-[10px] text-amber-600 font-semibold">Field 2</span>
                  </label>
                  <textarea
                    rows={3}
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g. Comprehensive Staffing Solutions Tailored for Every Occasion"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-sm font-bold transition-all leading-snug"
                  />
                  <p className="text-[11px] text-slate-400">
                    The main title displayed on the Services page hero banner. Tip: You can also use &#123;curly braces&#125; around any words to highlight them directly!
                  </p>
                </div>

                <div className="space-y-2 bg-amber-50/40 p-4 rounded-2xl border border-amber-200/50">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Highlighter className="w-3.5 h-3.5 text-amber-600" />
                    Highlighted Phrase / Words (Optional)
                  </label>
                  <input
                    type="text"
                    value={headlineHighlight}
                    onChange={(e) => setHeadlineHighlight(e.target.value)}
                    placeholder="e.g., Tailored for Every Occasion"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-xs font-bold"
                  />
                  <p className="text-[11px] text-slate-500">
                    Specific phrase inside the Main Heading that will be highlighted with a vibrant amber-pink gradient.
                  </p>
                </div>
              </div>

              {/* Field 3: Hero Description */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <AlignLeft className="w-3.5 h-3.5 text-amber-600" />
                    Hero Description
                  </span>
                  <span className="text-[10px] text-amber-600 font-semibold">Field 3</span>
                </label>
                <textarea
                  rows={4}
                  value={subheading}
                  onChange={(e) => setSubheading(e.target.value)}
                  placeholder="e.g., From intimate private banquets to massive international expos, our vetted crew delivers flawless execution."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-sm font-medium transition-all leading-relaxed"
                />
                <p className="text-[11px] text-slate-400">Descriptive paragraph under the hero main heading.</p>
              </div>

              {/* Fields 4, 5, 6, 7: CTA Buttons Group */}
              <div className="pt-6 border-t border-slate-100 space-y-6">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-amber-600" />
                  Call-To-Action (CTA) Buttons
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Primary CTA (Fields 4 & 5) */}
                  <div className="space-y-3 p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 flex items-center justify-between">
                      <span>Primary CTA Button</span>
                      <span className="text-[10px] text-amber-700">Fields 4 & 5</span>
                    </span>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Primary CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={primaryCtaText}
                        onChange={(e) => setPrimaryCtaText(e.target.value)}
                        placeholder="e.g., Hire Staff Now"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Primary CTA Button URL
                      </label>
                      <input
                        type="text"
                        value={primaryCtaUrl}
                        onChange={(e) => setPrimaryCtaUrl(e.target.value)}
                        placeholder="e.g., #hire (Opens Modal) or /contact"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                    </div>
                  </div>

                  {/* Secondary CTA (Fields 6 & 7) */}
                  <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                      <span>Secondary CTA Button</span>
                      <span className="text-[10px] text-slate-500">Fields 6 & 7</span>
                    </span>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Secondary CTA Button Text
                      </label>
                      <input
                        type="text"
                        value={secondaryCtaText}
                        onChange={(e) => setSecondaryCtaText(e.target.value)}
                        placeholder="e.g., Explore All Categories"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Secondary CTA Button URL
                      </label>
                      <input
                        type="text"
                        value={secondaryCtaUrl}
                        onChange={(e) => setSecondaryCtaUrl(e.target.value)}
                        placeholder="e.g., #services-grid"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Controls: Image & SEO (1 Col) */}
            <div className="space-y-6">
              {/* Optional Hero Background Image */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-extrabold text-slate-950 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <ImageIcon className="w-4 h-4 text-amber-600" />
                  Hero Background Image (Optional)
                </h3>
                <p className="text-xs text-slate-500">
                  Upload or supply an image URL to display subtle background imagery on the Services hero section.
                </p>

                <ImageUploader
                  label="Hero Background Overlay Image"
                  value={heroImageUrl}
                  onChange={(url) => setHeroImageUrl(url)}
                />
              </div>

              {/* SEO Meta Tags */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-extrabold text-slate-950 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Search className="w-4 h-4 text-amber-600" />
                  Services Page SEO Metadata
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">SEO Title Tag</label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder="Event Staffing Services — Event Ushers"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">SEO Meta Description</label>
                    <textarea
                      rows={3}
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder="Explore our vetted staffing categories..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                </div>
              </div>

              {/* Save Card */}
              <div className="bg-slate-950 text-white p-6 rounded-3xl space-y-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h4 className="text-sm font-black">Publish Hero Section</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Saving will immediately update both local application cache and MongoDB Atlas backend.
                </p>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-xs shadow-lg shadow-pink-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <Sparkles className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Publish Services Hero Banner
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
