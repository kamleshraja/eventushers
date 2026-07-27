"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { 
  User, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  Save, 
  CheckCircle2, 
  Key, 
  Camera,
  BadgeCheck,
  Eye,
  EyeOff
} from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

export default function AdminProfileSettingsPage() {
  // Admin Profile State
  const [name, setName] = useState("Admin Manager");
  const [email, setEmail] = useState("admin@eventushers.com");
  const [role, setRole] = useState("Super Administrator");
  const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80");

  // Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Notification State
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("eventushers_admin_user");
      if (stored) {
        try {
          const user = JSON.parse(stored);
          if (user.name) setName(user.name);
          if (user.email) setEmail(user.email);
          if (user.role) setRole(user.role);
          if (user.avatar) setAvatar(user.avatar);
        } catch (e) {}
      }
    }
  }, []);

  const syncUserToStorage = (updatedUser: any) => {
    if (typeof window !== "undefined") {
      const existing = localStorage.getItem("eventushers_admin_user");
      let base = existing ? JSON.parse(existing) : {};
      const merged = { ...base, ...updatedUser };
      localStorage.setItem("eventushers_admin_user", JSON.stringify(merged));
      // Dispatch custom event to notify AdminHeader immediately
      window.dispatchEvent(new Event("eventushers_user_updated"));
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, avatar, role }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.user) {
          syncUserToStorage(json.user);
        }
      }
    } catch (e) {
      syncUserToStorage({ name, email, avatar, role });
    }
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, currentPassword, newPassword, avatar, role }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setPasswordError(json.message || "Failed to update password. Please check your current password.");
        return;
      }

      if (json.user) {
        syncUserToStorage(json.user);
      }
    } catch (e) {
      syncUserToStorage({ name, email, avatar, role });
    }

    setPasswordSaved(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => setPasswordSaved(false), 2500);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Admin Profile & Settings" subtitle="Manage your account profile, security credentials, and admin permissions" />

        <main className="p-6 md:p-8 space-y-8 flex-1 max-w-5xl">
          
          {/* Top Admin Summary Banner */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={avatar}
                alt={name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-lg shrink-0"
              />
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-extrabold text-white">{name}</h2>
                  <BadgeCheck className="w-5 h-5 text-amber-400" />
                </div>
                <p className="text-xs text-slate-400 font-medium">{email}</p>
                <div className="pt-1">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-extrabold uppercase tracking-widest">
                    {role}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1 border-t sm:border-t-0 sm:border-l border-slate-800 pt-4 sm:pt-0 sm:pl-6">
              <p className="text-[11px] text-slate-400 font-extrabold uppercase tracking-wider">Access Status</p>
              <p className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 justify-start sm:justify-end">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Full System Privileges</span>
              </p>
              <p className="text-[11px] text-slate-500 font-mono">Last login: Today, 08:30 AM</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            
            {/* Left Column: Account Details (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-extrabold text-slate-950">Personal Profile Information</h3>
                  </div>
                </div>

                {profileSaved && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Profile details updated successfully!</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  
                  {/* Profile Photo Uploader */}
                  <ImageUploader
                    value={avatar}
                    onChange={setAvatar}
                    label="Admin Profile Avatar Photo"
                  />

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800">Role Title</label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-xs shadow-md shadow-pink-500/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4 text-white" />
                      <span>Save Profile Info</span>
                    </button>
                  </div>
                </form>

              </div>

            </div>

            {/* Right Column: Password & Security (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-pink-500" />
                    <h3 className="text-lg font-extrabold text-slate-950">Password & Security</h3>
                  </div>
                </div>

                {passwordSaved && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Password updated successfully!</span>
                  </div>
                )}

                {passwordError && (
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                    <span>{passwordError}</span>
                  </div>
                )}

                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrentPass ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                        title={showCurrentPass ? "Hide password" : "Show password"}
                      >
                        {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPass ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                        title={showNewPass ? "Hide password" : "Show password"}
                      >
                        {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-800">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPass ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                        title={showConfirmPass ? "Hide password" : "Show password"}
                      >
                        {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4 text-white" />
                      <span>Update Security Password</span>
                    </button>
                  </div>
                </form>

              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
