"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { 
  FileText, 
  Users, 
  Layers, 
  ArrowUpRight, 
  Sparkles, 
  Plus,
  Globe
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats] = useState({
    totalBlogs: 12,
    totalServices: 6,
    totalCategories: 5,
    totalHireRequests: 48,
    totalCrewApplications: 1500,
    pendingRequests: 4,
  });

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("eventushers_admin_token");
    }
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar onLogout={handleLogout} />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Dashboard Overview" subtitle="Real-time control panel for Event Ushers platform" />

        <main className="p-6 md:p-8 space-y-8 flex-1">
          
          {/* Top Metric Cards (4 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Blogs</span>
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-slate-950">{stats.totalBlogs}</span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +2 this week
                </span>
              </div>
              <Link href="/admin/blogs" className="text-xs font-bold text-amber-600 hover:underline inline-flex items-center gap-1">
                Manage Blogs &rarr;
              </Link>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Public Site Pages</span>
                <div className="w-10 h-10 rounded-2xl bg-pink-500/10 text-pink-600 flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-slate-950">6</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                  All Active
                </span>
              </div>
              <Link href="/admin/pages" className="text-xs font-bold text-amber-600 hover:underline inline-flex items-center gap-1">
                Edit Content &rarr;
              </Link>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Active Crew</span>
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-slate-950">{stats.totalCrewApplications}+</span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                  Vetted Roster
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-500">Across Kenya & East Africa</span>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Core Services</span>
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-slate-950">{stats.totalServices}</span>
                <span className="text-xs font-bold text-slate-500">Categories: {stats.totalCategories}</span>
              </div>
              <Link href="/admin/services" className="text-xs font-bold text-amber-600 hover:underline inline-flex items-center gap-1">
                Edit Offerings &rarr;
              </Link>
            </div>

          </div>

          {/* Action Banner */}
          <div className="rounded-3xl p-6 sm:p-8 bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                QUICK CREATION SHORTCUTS
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">Manage Platform Content</h3>
              <p className="text-xs sm:text-sm text-slate-300">Create new blog posts, adjust service details, or edit site page content.</p>
            </div>

            <div className="flex items-center gap-3 whitespace-nowrap">
              <Link
                href="/admin/blogs"
                className="px-5 py-3 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white text-xs font-extrabold shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Blog
              </Link>
              <Link
                href="/admin/pages"
                className="px-5 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-950 text-xs font-extrabold shadow-sm"
              >
                Page Manager
              </Link>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
