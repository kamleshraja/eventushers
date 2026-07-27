"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  onOpenHire?: () => void;
  onOpenJoin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHire,
  onOpenJoin,
}) => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const isHomeRoute = pathname === "/";
  const isAboutRoute = pathname?.startsWith("/about");
  const isServicesRoute = pathname?.startsWith("/services");
  const isBlogRoute = pathname?.startsWith("/blog");
  const isContactRoute = pathname?.startsWith("/contact");
  const isCustomRoute = isAboutRoute || isServicesRoute || isBlogRoute || isContactRoute;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (!isCustomRoute) {
        const sections = ["hero", "about", "services", "testimonials", "blog", "contact"];
        const scrollPos = window.scrollY + 200;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isCustomRoute]);

  const navLinks = [
    { name: "Home", href: "/", id: "hero" },
    { name: "About Us", href: "/about", id: "about" },
    { name: "Services", href: "/services", id: "services" },
    { name: "Blog", href: "/blog", id: "blog" },
    { name: "Contact Us", href: "/contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-md py-3 border-b border-slate-200 text-slate-900"
          : "bg-white/80 backdrop-blur-md py-5 border-b border-slate-200/60 text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center">
            <Logo variant="light" />
          </Link>

          {/* Desktop Navigation Pills */}
          <nav className="hidden md:flex items-center gap-2 bg-slate-100/90 px-3.5 py-2 rounded-full border border-slate-200 shadow-xs">
            {navLinks.map((link) => {
              const isActive = isHomeRoute
                ? link.id === "hero"
                : isAboutRoute
                ? link.id === "about"
                : isServicesRoute
                ? link.id === "services"
                : isBlogRoute
                ? link.id === "blog"
                : isContactRoute
                ? link.id === "contact"
                : activeSection === link.id;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-slate-950 bg-white shadow-md border border-amber-500/40 font-extrabold"
                      : "text-slate-700 hover:text-slate-950 hover:bg-white/80"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Button: Hire Staff Now (Desktop only) */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white text-xs font-extrabold transition-all shadow-md shadow-pink-500/20 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Hire Staff Now</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 shadow-xs transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-600" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-2xl animate-fadeIn text-slate-900">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = isHomeRoute
                ? link.id === "hero"
                : isAboutRoute
                ? link.id === "about"
                : isServicesRoute
                ? link.id === "services"
                : isBlogRoute
                ? link.id === "blog"
                : isContactRoute
                ? link.id === "contact"
                : activeSection === link.id;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? "text-slate-950 bg-amber-500/10 border-l-4 border-amber-500 font-extrabold"
                      : "text-slate-800 hover:text-amber-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className={`w-4 h-4 ${isActive ? "text-amber-600" : "text-amber-500"}`} />
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25"
            >
              <span>Hire Staff Now</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
