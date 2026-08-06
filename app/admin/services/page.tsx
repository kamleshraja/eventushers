"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { servicesData as initialServices } from "@/data/servicesData";
import { ServiceDetail } from "@/components/ServiceModal";
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
  ShieldCheck
} from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

const SERVICES_STORAGE_KEY = "eventushers_services";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceDetail[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(SERVICES_STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {}
      }
    }
    return initialServices;
  });

  const [viewMode, setViewMode] = useState<"list" | "edit">("list");
  const [editingService, setEditingService] = useState<ServiceDetail | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [image, setImage] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [savedNotification, setSavedNotification] = useState(false);

  const saveServicesState = (updated: ServiceDetail[]) => {
    setServices(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const handleOpenEditPage = (svc: ServiceDetail) => {
    setEditingService(svc);
    setTitle(svc.title);
    setCategory(svc.category);
    setDescription(svc.description);
    setLongDescription(svc.longDescription || svc.description);
    setImage(svc.image || "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80");
    setFeaturesText(svc.features ? svc.features.join("\n") : "");
    setSavedNotification(false);
    setViewMode("edit");
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    const parsedFeatures = featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const updatedServicePayload = {
      title,
      category,
      description,
      longDescription,
      image,
      features: parsedFeatures.length > 0 ? parsedFeatures : editingService.features,
    };

    const updated = services.map((s) =>
      s.id === editingService.id ? { ...s, ...updatedServicePayload } : s
    );

    saveServicesState(updated);

    // Sync with MongoDB API
    fetch(`${API_BASE_URL}/services/${editingService.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedServicePayload),
    }).catch(() => {});

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
              {/* Services Hero Section Banner Card */}
              <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 p-6 rounded-3xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl border border-slate-800">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-extrabold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Services Page Hero Module
                  </div>
                  <h3 className="text-xl font-black text-white">Dynamic Services Hero Section Manager</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Update the main banner headline, badge text, subheadings, background styling, and CTA buttons displayed on the top of the Services page.
                  </p>
                </div>
                <Link
                  href="/admin/services-hero"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-xs shadow-lg shadow-pink-500/20 transition-all cursor-pointer hover:scale-105 active:scale-95 whitespace-nowrap shrink-0 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Manage Hero Banner &rarr;
                </Link>
              </div>

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
                        <span className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active
                        </span>
                      </div>

                      {/* Title & Short Description */}
                      <div className="space-y-2">
                        <div className="min-h-[56px] flex items-center">
                          <h3 className="text-lg font-extrabold text-slate-950 group-hover:text-amber-600 transition-colors leading-snug">
                            {svc.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 min-h-[48px]">
                          {svc.description}
                        </p>
                      </div>

                      {/* Features Included List */}
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
                    </div>

                    {/* Card Action Footer */}
                    <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-400">ID: #{svc.id}</span>
                      <button
                        onClick={() => handleOpenEditPage(svc)}
                        className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Specs</span>
                      </button>
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
                      Editing Service Specifications
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 truncate" title={editingService.title}>
                      {editingService.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end whitespace-nowrap shrink-0">
                  <Link
                    href={`/services/${editingService.id}`}
                    target="_blank"
                    className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <span>Public Preview</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </Link>

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
                  
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <Layers className="w-5 h-5 text-amber-500" />
                      <h3 className="text-lg font-extrabold text-slate-950">Service Identity & Descriptions</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">Service Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">Category Name</label>
                        <input
                          type="text"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">Short Summary Description (Directory Card View)</label>
                        <textarea
                          rows={3}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">Full Detailed Description & Service Scope</label>
                        <textarea
                          rows={6}
                          value={longDescription}
                          onChange={(e) => setLongDescription(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">Features Included (One feature per line)</label>
                        <textarea
                          rows={5}
                          value={featuresText}
                          onChange={(e) => setFeaturesText(e.target.value)}
                          placeholder="Corporate Attire Ready&#10;Multilingual Greeting Staff&#10;Badge Printing & QR Check-in"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
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
                      Changes saved here instantly update the public Service Directory and booking engine modal options for clients across Kenya.
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
