"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  FolderKanban, 
  LogOut,
  ExternalLink,
  ChevronRight,
  Globe,
  User,
  Mail
} from "lucide-react";

interface AdminSidebarProps {
  onLogout?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogout }) => {
  const pathname = usePathname();

  const mainNav = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Contact Messages", href: "/admin/contact-messages", icon: Mail },
    { name: "Page Manager", href: "/admin/pages", icon: Globe },
  ];

  const contentNav = [
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Core Services", href: "/admin/services", icon: Layers },
    { name: "Categories", href: "/admin/categories", icon: FolderKanban },
    { name: "Profile Settings", href: "/admin/profile", icon: User },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-white h-screen sticky top-0 border-r border-slate-800/80 flex flex-col justify-between shrink-0 overflow-y-auto no-scrollbar z-40 selection:bg-amber-500 selection:text-slate-950">
      <div className="p-6 space-y-7">
        
        {/* Brand Header with Official Logo */}
        <Link href="/admin" className="flex flex-col items-start gap-2.5 group">
          <Logo size="sm" variant="dark" />
          <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 inline-block">
            ADMIN PORTAL
          </span>
        </Link>

        {/* Main Navigation Section */}
        <nav className="space-y-6">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-3 mb-2">Main Menu</p>
            {mainNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white shadow-md shadow-pink-500/20 font-extrabold"
                      : "text-slate-400 hover:text-white hover:bg-slate-900/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-white" />}
                </Link>
              );
            })}
          </div>

          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-3 mb-2">Content & Controls</p>
            {contentNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white shadow-md shadow-pink-500/20 font-extrabold"
                      : "text-slate-400 hover:text-white hover:bg-slate-900/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-white" />}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Footer / Quick Actions */}
      <div className="p-6 border-t border-slate-900 space-y-2.5 bg-slate-950">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors p-2.5 rounded-xl hover:bg-slate-900/80 border border-transparent hover:border-slate-800/60"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 hover:bg-red-500/10 text-slate-300 hover:text-red-400 border border-slate-800/80 text-xs font-bold transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};
