"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
  User, 
  ShieldCheck, 
  ChevronDown, 
  LogOut, 
  ExternalLink, 
  Settings, 
  Sparkles 
} from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [adminUser, setAdminUser] = useState({
    name: "Admin Manager",
    email: "admin@africrew.com",
    role: "Super Admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  });

  const loadUser = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("eventushers_admin_user");
      if (stored) {
        try {
          const user = JSON.parse(stored);
          setAdminUser((prev) => ({
            name: user.name || prev.name,
            email: user.email || prev.email,
            role: user.role || prev.role,
            avatar: user.avatar || prev.avatar,
          }));
        } catch (e) {}
      }
    }
  };

  useEffect(() => {
    loadUser();
    const handleUpdate = () => loadUser();
    window.addEventListener("eventushers_user_updated", handleUpdate);
    return () => window.removeEventListener("eventushers_user_updated", handleUpdate);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("eventushers_admin_token");
      localStorage.removeItem("eventushers_admin_user");
    }
    router.push("/admin/login");
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs sticky top-0 z-30">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs sm:text-sm text-slate-500 font-medium">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder="Search records..."
            className="pl-9 pr-4 py-2 rounded-full border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 w-56 transition-all"
          />
        </div>

        {/* Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>System Online</span>
        </div>

        {/* Interactive User Profile Dropdown Button */}
        <div className="relative pl-2 border-l border-slate-200" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2.5 hover:opacity-90 transition-all cursor-pointer p-1 rounded-2xl hover:bg-slate-50"
          >
            <img
              src={adminUser.avatar}
              alt={adminUser.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-amber-400 shadow-xs"
            />
            <div className="hidden lg:block text-left">
              <h4 className="text-xs font-bold text-slate-950 leading-tight">{adminUser.name}</h4>
              <p className="text-[10px] text-amber-600 font-semibold uppercase">{adminUser.role}</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Animated Dropdown Card */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl border border-slate-200 shadow-2xl p-3 z-50 animate-fadeIn text-left space-y-2">
              
              {/* Header Info */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xs text-slate-950">{adminUser.name}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <p className="text-[11px] text-slate-500 font-medium truncate">{adminUser.email}</p>
              </div>

              {/* Menu Links */}
              <div className="space-y-1">
                <Link
                  href="/admin/profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-amber-500/10 transition-colors"
                >
                  <Settings className="w-4 h-4 text-amber-600" />
                  <span>Profile & Security</span>
                </Link>

                <Link
                  href="/"
                  target="_blank"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                  <span>View Public Website</span>
                </Link>
              </div>

              {/* Logout Button */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Sign Out of Admin</span>
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </header>
  );
};
