"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { servicesData as initialServices } from "@/data/servicesData";
import { ServiceDetail, ServiceSubcategoryGroup } from "@/components/ServiceModal";
import { 
  Layers, 
  Edit3, 
  Check, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Plus,
  ArrowLeft,
  Save,
  BookOpen,
  ExternalLink,
  ShieldCheck,
  Trash2,
  Tag,
  Search,
  Globe,
  ListChecks,
  Grid
} from "lucide-react";
import { API_BASE_URL, getServicesFromApi, saveServiceApi, deleteServiceApi } from "@/lib/api";

function parseScopeHighlightsText(text: string): { title: string; description: string }[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .map((line) => {
      if (line.includes("|")) {
        const [t, ...rest] = line.split("|");
        return { title: t.trim(), description: rest.join("|").trim() };
      }
      if (line.includes("; -")) {
        const [t, ...rest] = line.split("; -");
        return { title: t.trim(), description: rest.join("; -").trim() };
      }
      if (line.includes(" - ")) {
        const [t, ...rest] = line.split(" - ");
        return { title: t.trim(), description: rest.join(" - ").trim() };
      }
      return { title: line, description: "" };
    });
}

function serializeScopeHighlights(highlights?: { title: string; description: string }[]): string {
  if (!highlights || highlights.length === 0) return "";
  return highlights.map((h) => `${h.title} | ${h.description}`).join("\n");
}

function parseSubcategoriesText(text: string): ServiceSubcategoryGroup[] {
  const groups: ServiceSubcategoryGroup[] = [];
  let currentGroup: ServiceSubcategoryGroup | null = null;

  const lines = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);

  lines.forEach((line) => {
    if (line.startsWith("#") || line.startsWith("[")) {
      const groupTitle = line.replace(/^[#\[\s]+|[\]]+$/g, "").trim();
      currentGroup = { groupTitle, items: [] };
      groups.push(currentGroup);
    } else {
      let name = "";
      let description = "";

      if (line.includes("; -")) {
        const [n, ...rest] = line.split("; -");
        name = n.trim();
        description = rest.join("; -").trim();
      } else if (line.includes(" - ")) {
        const [n, ...rest] = line.split(" - ");
        name = n.trim();
        description = rest.join(" - ").trim();
      } else if (line.includes(":")) {
        const [n, ...rest] = line.split(":");
        name = n.trim();
        description = rest.join(":").trim();
      } else {
        name = line;
        description = line;
      }

      if (name) {
        if (!currentGroup) {
          currentGroup = { groupTitle: "General Roles", items: [] };
          groups.push(currentGroup);
        }
        currentGroup.items.push({ name, description: description || name });
      }
    }
  });

  return groups;
}

function serializeSubcategories(subcategories?: ServiceSubcategoryGroup[]): string {
  if (!subcategories || subcategories.length === 0) return "";
  return subcategories
    .map(
      (g) =>
        `# ${g.groupTitle}\n` +
        g.items.map((i) => `${i.name} - ${i.description}`).join("\n")
    )
    .join("\n\n");
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceDetail[]>(initialServices);

  useEffect(() => {
    getServicesFromApi(true).then((data) => {
      if (data && data.length > 0) {
        setServices(data);
      }
    });
  }, []);

  const [viewMode, setViewMode] = useState<"list" | "edit">("list");
  const [editingService, setEditingService] = useState<ServiceDetail | null>(null);
  const [isNewService, setIsNewService] = useState(false);

  // Form State
  const [active, setActive] = useState<boolean>(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [heroBadgeText, setHeroBadgeText] = useState("");
  const [subheading, setSubheading] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [fullScopeDescription, setFullScopeDescription] = useState("");
  const [scopeHighlightsText, setScopeHighlightsText] = useState("");
  const [subcategoriesText, setSubcategoriesText] = useState("");
  const [image, setImage] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [deliverablesText, setDeliverablesText] = useState("");
  const [idealForText, setIdealForText] = useState("");
  const [overviewChecklistText, setOverviewChecklistText] = useState("");
  const [whyChooseUsText, setWhyChooseUsText] = useState("");
  const [ctaHeadline, setCtaHeadline] = useState("");
  const [ctaSubtext, setCtaSubtext] = useState("");
  const [ctaButtonText, setCtaButtonText] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [primaryKeyword, setPrimaryKeyword] = useState("");
  const [secondaryKeywords, setSecondaryKeywords] = useState("");
  const [imageAltText, setImageAltText] = useState("");
  const [savedNotification, setSavedNotification] = useState(false);

  const handleToggleActiveStatus = (id: string, currentActiveStatus: boolean) => {
    const nextActive = !currentActiveStatus;
    const target = services.find((s) => s.id === id || s.slug === id);
    if (!target) return;

    const updatedService = { ...target, active: nextActive };
    saveServiceApi(updatedService);

    setServices((prev) =>
      prev.map((s) => (s.id === id || s.slug === id ? updatedService : s))
    );
  };

  const handleAddNewService = () => {
    const slugId = `service-${Date.now()}`;
    const newSvc: ServiceDetail = {
      id: slugId,
      slug: slugId,
      title: "",
      category: "Photography and Media Production",
      active: true,
      description: "",
      longDescription: "",
      features: [],
      deliverables: [],
      idealFor: [],
    };
    setEditingService(newSvc);
    setIsNewService(true);
    setActive(true);
    setTitle("");
    setCategory("Photography and Media Production");
    setHeroBadgeText("");
    setSubheading("");
    setDescription("");
    setLongDescription("");
    setFullScopeDescription("");
    setScopeHighlightsText("");
    setSubcategoriesText("");
    setImage("https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80");
    setFeaturesText("");
    setDeliverablesText("");
    setIdealForText("");
    setOverviewChecklistText("");
    setWhyChooseUsText("");
    setCtaHeadline("");
    setCtaSubtext("");
    setCtaButtonText("");
    setSeoTitle("");
    setSeoDescription("");
    setPrimaryKeyword("");
    setSecondaryKeywords("");
    setImageAltText("");
    setSavedNotification(false);
    setViewMode("edit");
  };

  const handleOpenEditPage = (svc: ServiceDetail) => {
    setEditingService(svc);
    setIsNewService(false);
    setActive(svc.active !== false);
    setTitle(svc.title);
    setCategory(svc.category);
    setHeroBadgeText(svc.heroBadgeText || "");
    setSubheading(svc.subheading || "");
    setDescription(svc.description);
    setLongDescription(svc.longDescription || svc.description);
    setFullScopeDescription(svc.fullScopeDescription || "");
    setScopeHighlightsText(serializeScopeHighlights(svc.scopeHighlights));
    setSubcategoriesText(serializeSubcategories(svc.subcategories));
    setImage(svc.image || "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80");
    setFeaturesText(svc.features ? svc.features.join("\n") : "");
    setDeliverablesText(svc.deliverables ? svc.deliverables.join("\n") : "");
    setIdealForText(svc.idealFor ? svc.idealFor.join("\n") : "");
    setOverviewChecklistText(
      svc.overviewChecklist
        ? svc.overviewChecklist.join("\n")
        : "24-Hour Express Dispatch Available\n100% Background Checked Staff\nIncludes On-Site Supervisor"
    );
    setWhyChooseUsText(svc.whyChooseUs ? svc.whyChooseUs.join("\n") : "");
    setCtaHeadline(svc.ctaHeadline || "");
    setCtaSubtext(svc.ctaSubtext || "");
    setCtaButtonText(svc.ctaButtonText || "");
    setSeoTitle(svc.seoTitle || "");
    setSeoDescription(svc.seoDescription || "");
    setPrimaryKeyword(svc.primaryKeyword || "");
    setSecondaryKeywords(svc.secondaryKeywords || "");
    setImageAltText(svc.imageAltText || "");
    setSavedNotification(false);
    setViewMode("edit");
  };

  const handleDeleteService = (id: string) => {
    if (confirm("Are you sure you want to remove this service from the admin list?")) {
      deleteServiceApi(id);
      setServices((prev) => prev.filter((s) => s.id !== id && s.slug !== id));
      if (editingService?.id === id) {
        setViewMode("list");
      }
    }
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    const parsedFeatures = featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const parsedDeliverables = deliverablesText
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const parsedIdealFor = idealForText
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const parsedOverviewChecklist = overviewChecklistText
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const parsedWhyChooseUs = whyChooseUsText
      .split("\n")
      .map((w) => w.trim())
      .filter((w) => w.length > 0);

    const parsedScopeHighlights = parseScopeHighlightsText(scopeHighlightsText);
    const parsedSubcategories = parseSubcategoriesText(subcategoriesText);

    const generatedSlug = editingService.slug || editingService.id || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const updatedServicePayload: ServiceDetail = {
      ...editingService,
      id: editingService.id || generatedSlug,
      slug: generatedSlug,
      title,
      category,
      active,
      heroBadgeText,
      subheading,
      description,
      longDescription,
      fullScopeDescription,
      scopeHighlights: parsedScopeHighlights,
      subcategories: parsedSubcategories,
      image,
      features: parsedFeatures,
      deliverables: parsedDeliverables,
      idealFor: parsedIdealFor,
      overviewChecklist: parsedOverviewChecklist,
      whyChooseUs: parsedWhyChooseUs,
      ctaHeadline,
      ctaSubtext,
      ctaButtonText,
      seoTitle,
      seoDescription,
      primaryKeyword,
      secondaryKeywords,
      imageAltText,
    };

    saveServiceApi(updatedServicePayload);

    if (isNewService) {
      setServices((prev) => [updatedServicePayload, ...prev]);
    } else {
      setServices((prev) =>
        prev.map((s) => (s.id === editingService.id ? { ...s, ...updatedServicePayload } : s))
      );
    }

    setSavedNotification(true);
    setTimeout(() => {
      setSavedNotification(false);
      setViewMode("list");
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Core Services Manager" subtitle="Control and edit staffing category offerings across the platform" />

        <main className="p-6 md:p-8 space-y-6 flex-1">
          
          {/* VIEW MODE 1: SERVICES DIRECTORY GRID */}
          {viewMode === "list" && (
            <div className="space-y-6">
              {/* Header Action Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider">Service Management</span>
                  <h2 className="text-2xl font-extrabold text-slate-950">All Platform Services ({services.length})</h2>
                </div>

                <button
                  onClick={handleAddNewService}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-xs shadow-md shadow-pink-500/20 hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-white" />
                  <span>Add New Service</span>
                </button>
              </div>

              {/* Services Directory Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((svc) => (
                  <div
                    key={svc.id}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-xl hover:border-amber-400/40 transition-all duration-300 group"
                  >
                    <div className="space-y-4">
                      {/* Category Pill & Active Status Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80 truncate max-w-[180px]" title={svc.category}>
                          {svc.category}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleToggleActiveStatus(svc.id, svc.active !== false)}
                          className={`flex items-center gap-1.5 text-[11px] font-extrabold px-3 py-1 rounded-full border cursor-pointer transition-all shrink-0 ${
                            svc.active !== false
                              ? "text-emerald-700 bg-emerald-50 border-emerald-200/80 hover:bg-emerald-100"
                              : "text-slate-500 bg-slate-100 border-slate-200 hover:bg-slate-200"
                          }`}
                          title={svc.active !== false ? "Click to set Inactive" : "Click to set Active"}
                        >
                          {svc.active !== false ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active
                            </>
                          ) : (
                            <>
                              <X className="w-3.5 h-3.5 text-slate-400" /> Inactive
                            </>
                          )}
                        </button>
                      </div>

                      {/* Title & Short Description */}
                      <div className="space-y-2">
                        <div className="min-h-[56px] flex items-center">
                          <h3 className="text-lg font-extrabold text-slate-950 group-hover:text-amber-600 transition-colors leading-snug">
                            {svc.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 min-h-[48px]">
                          {svc.description || svc.longDescription}
                        </p>
                      </div>

                      {/* Features Included List */}
                      {svc.features && svc.features.length > 0 && (
                        <div className="pt-3 border-t border-slate-100 space-y-2">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Features Included:</p>
                          <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                            {svc.features.slice(0, 3).map((f, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                                <span className="truncate">{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Card Action Footer */}
                    <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-bold text-slate-400 truncate">/services/{svc.slug || svc.id}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDeleteService(svc.id)}
                          className="p-2 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEditPage(svc)}
                          className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Specs</span>
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW MODE 2: DEDICATED FULL-PAGE INLINE SERVICE EDITOR */}
          {viewMode === "edit" && editingService && (
            <div className="space-y-6 text-left animate-fadeIn">
              
              {/* Back Bar & Save Action Header */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <button
                    onClick={() => setViewMode("list")}
                    className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer flex items-center gap-2 text-xs font-bold whitespace-nowrap shrink-0"
                  >
                    <ArrowLeft className="w-4 h-4 text-slate-600" />
                    <span>Back to Services</span>
                  </button>

                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-mono font-extrabold text-amber-600 uppercase tracking-wider block">
                      {isNewService ? "Adding New Service Page" : "Editing Service Specifications"}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 truncate" title={title || "New Service"}>
                      {title || "Untitled New Service"}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end whitespace-nowrap shrink-0">
                  {!isNewService && (
                    <Link
                      href={`/services/${editingService.slug || editingService.id}`}
                      target="_blank"
                      className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      <span>Public Preview</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </Link>
                  )}

                  <button
                    onClick={handleSaveService}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-xs shadow-md shadow-pink-500/20 hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Save className="w-4 h-4 text-white" />
                    <span>Save Service Specs</span>
                  </button>
                </div>
              </div>

              {savedNotification && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Service updated successfully! Returning to list...</span>
                </div>
              )}

              {/* 2-Column Editor Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column: Form Editor (8 Cols) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Block 1: Service Identity & Hero Section */}
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <Layers className="w-5 h-5 text-amber-500" />
                      <h3 className="text-lg font-extrabold text-slate-950">1. Hero Section & Main Identity</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1 sm:col-span-2">
                          <label className="text-xs font-bold text-slate-800">Service Status *</label>
                          <div className="flex items-center gap-3 pt-1">
                            <button
                              type="button"
                              onClick={() => setActive(true)}
                              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer border ${
                                active
                                  ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              <CheckCircle2 className="w-4 h-4" /> Active (Visible on Frontend)
                            </button>
                            <button
                              type="button"
                              onClick={() => setActive(false)}
                              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer border ${
                                !active
                                  ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                              }`}
                            >
                              <X className="w-4 h-4" /> Inactive (Hidden from Frontend)
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-800">Service Title *</label>
                          <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="e.g. Multi-Media Production Crew"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-800">Category Name *</label>
                          <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            placeholder="e.g. Photography and Media Production"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">Hero Pill Badge Text</label>
                        <input
                          type="text"
                          value={heroBadgeText}
                          onChange={(e) => setHeroBadgeText(e.target.value)}
                          placeholder="e.g. WE SUPPLY THE STORYTELLERS. FOR YOUR CUSTOM STORY."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">Subheading / Hero Tagline</label>
                        <textarea
                          rows={2}
                          value={subheading}
                          onChange={(e) => setSubheading(e.target.value)}
                          placeholder="e.g. Your event happens once; the footage lasts forever..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Block 2: Service Summary & Detailed Scope */}
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <BookOpen className="w-5 h-5 text-amber-500" />
                      <h3 className="text-lg font-extrabold text-slate-950">2. Service Summary & Detailed Scope</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">Short Summary Description (Service Summary Box & Directory Cards)</label>
                        <textarea
                          rows={3}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          placeholder="e.g. AfriCrew matches end-to-end multimedia production crews to events..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">Detailed Scope Intro Paragraph</label>
                        <textarea
                          rows={5}
                          value={fullScopeDescription}
                          onChange={(e) => setFullScopeDescription(e.target.value)}
                          placeholder="e.g. AfriCrew's Multi-Media Production Crew service goes beyond booking a photographer or videographer..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-slate-800">Detailed Scope Highlights Cards (Title | Description)</label>
                          <span className="text-[10px] font-mono font-bold text-slate-400">Format: Card Title | Card Description</span>
                        </div>
                        <textarea
                          rows={4}
                          value={scopeHighlightsText}
                          onChange={(e) => setScopeHighlightsText(e.target.value)}
                          placeholder="Talent Matching | Matched to your specific shoot and creative brief, not a generic search result&#10;Shot List Coordination | Required shots and coverage agreed before the day&#10;Call Time Management | Confirmed arrival times and schedules for every crew member&#10;NDA Management | Non-disclosure agreements issued and signed digitally ahead of sensitive shoots"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Block 3: Sub-categories Available */}
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <Grid className="w-5 h-5 text-amber-500" />
                        <h3 className="text-lg font-extrabold text-slate-950">3. Sub-categories Available (Specialized Roles)</h3>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">Use # Group Name to create groups</span>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">Sub-categories Roles & Descriptions</label>
                        <textarea
                          rows={12}
                          value={subcategoriesText}
                          onChange={(e) => setSubcategoriesText(e.target.value)}
                          placeholder="# On-Camera & Post-Production&#10;Event Photographers - Full event photographic coverage&#10;Videographers - Promotional and archival event video&#10;Cinematographers - Cinematic event films with advanced techniques&#10;Drone Operators - Aerial photography and videography&#10;&#10;# Broadcast & Camera Support&#10;Graphic Designers - Motion graphics, animated titles, and on-screen branding&#10;Lower Thirds / CG Operators - Live insertion of names, titles, and captions"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Block 4: Why Choose Us & Guaranteed Deliverables */}
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <ShieldCheck className="w-5 h-5 text-amber-500" />
                      <h3 className="text-lg font-extrabold text-slate-950">4. Why Choose Us & Guaranteed Deliverables</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">Why Choose Us Points (One per line)</label>
                        <textarea
                          rows={4}
                          value={whyChooseUsText}
                          onChange={(e) => setWhyChooseUsText(e.target.value)}
                          placeholder="Content delivered to spec with platform-managed shot lists and timelines.&#10;Fast turnaround options and same-day highlight packages.&#10;Clear licensing and usage tracking."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">Guaranteed Deliverables (One per line)</label>
                        <textarea
                          rows={4}
                          value={deliverablesText}
                          onChange={(e) => setDeliverablesText(e.target.value)}
                          placeholder="Content Delivered to Spec with Timelines&#10;Fast Turnaround & Same-Day Highlight Packages&#10;Clear Licensing & Single Unified Invoice"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">Ideal Event Types Tags (One per line)</label>
                        <textarea
                          rows={3}
                          value={idealForText}
                          onChange={(e) => setIdealForText(e.target.value)}
                          placeholder="Corporate Summits&#10;Product Launches&#10;Fashion Shows&#10;Live Broadcast Events"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">Service Overview Card Checklist (Right Card, One per line)</label>
                        <textarea
                          rows={3}
                          value={overviewChecklistText}
                          onChange={(e) => setOverviewChecklistText(e.target.value)}
                          placeholder="Platform-Managed Shot Lists & NDAs&#10;Vetted Creatives with Event Experience&#10;Single Platform Invoice for All Creatives"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Block 5: Bottom CTA Banner Settings */}
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <h3 className="text-lg font-extrabold text-slate-950">5. Bottom CTA Banner Settings</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">CTA Banner Headline</label>
                        <input
                          type="text"
                          value={ctaHeadline}
                          onChange={(e) => setCtaHeadline(e.target.value)}
                          placeholder="e.g. Your Shoot, Fully Coordinated."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">CTA Banner Subtext</label>
                        <textarea
                          rows={2}
                          value={ctaSubtext}
                          onChange={(e) => setCtaSubtext(e.target.value)}
                          placeholder="e.g. Book verified photographers, videographers, and full broadcast crews..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">CTA Button Text</label>
                        <input
                          type="text"
                          value={ctaButtonText}
                          onChange={(e) => setCtaButtonText(e.target.value)}
                          placeholder="e.g. Book Your Production Crew"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Block 6: SEO Meta Tags & Keywords */}
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <Globe className="w-5 h-5 text-amber-500" />
                      <h3 className="text-lg font-extrabold text-slate-950">6. SEO Meta Tags & Keywords</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">Page SEO Title Tag</label>
                        <input
                          type="text"
                          value={seoTitle}
                          onChange={(e) => setSeoTitle(e.target.value)}
                          placeholder="e.g. Hire Multi-Media Production Crews | AfriCrew"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">Page SEO Meta Description</label>
                        <textarea
                          rows={2}
                          value={seoDescription}
                          onChange={(e) => setSeoDescription(e.target.value)}
                          placeholder="e.g. Hire verified production crews across Kenya — photographers, gaffers & broadcast engineers."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-800">Primary Keyword</label>
                          <input
                            type="text"
                            value={primaryKeyword}
                            onChange={(e) => setPrimaryKeyword(e.target.value)}
                            placeholder="e.g. hire production crew Kenya"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-800">Image Alt Text Example</label>
                          <input
                            type="text"
                            value={imageAltText}
                            onChange={(e) => setImageAltText(e.target.value)}
                            placeholder='e.g. "Multi-camera production crew filming in Nairobi"'
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">Secondary Keywords (Comma Separated)</label>
                        <input
                          type="text"
                          value={secondaryKeywords}
                          onChange={(e) => setSecondaryKeywords(e.target.value)}
                          placeholder="e.g. multi-camera production team Kenya, broadcast engineer for hire..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column: Featured Image & Media Upload (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                  
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <h3 className="text-base font-extrabold text-slate-950">Featured Media Banner</h3>
                    </div>

                    <ImageUploader
                      value={image}
                      onChange={(url) => setImage(url)}
                      label="Service Banner Image"
                    />
                  </div>

                  <div className="bg-slate-900 p-6 rounded-3xl text-white space-y-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-amber-400" />
                      <h4 className="text-sm font-extrabold text-white">Live Platform Status</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Changes saved here instantly update the public Service Directory, individual detail pages, and booking engine modal options across Kenya.
                    </p>
                  </div>

                </div>

              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}
