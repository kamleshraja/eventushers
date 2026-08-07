"use client";

import React from "react";
import { usePageContent } from "@/lib/pageContent";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  variant = "light",
}) => {
  const homeData = usePageContent("home", {
    key: "home",
    title: "Home Page",
    path: "/",
    headline: "We connect events with vetted ushers & crew — instantly.",
    subheading: "The all-in-one platform for event organizers to find vetted, reliable, and professional ushers & crew in minutes.",
    metaTitle: "Event Ushers",
    metaDescription: "We connect events with vetted ushers & crew instantly.",
    customFields: {
      siteLogoUrl: "/images/logo.jpeg",
    },
  });

  const customLogo = homeData.customFields?.siteLogoUrl || "/images/logo.jpeg";

  const sizeClasses = {
    sm: "h-11 sm:h-13",
    md: "h-16 sm:h-20 lg:h-24",
    lg: "h-24 sm:h-32",
  };

  const isDark = variant === "dark";

  return (
    <div
      className={`inline-flex items-center select-none transition-all ${
        isDark
          ? "bg-white p-2 rounded-2xl shadow-md border border-slate-200/20"
          : ""
      } ${className}`}
    >
      <img
        src={customLogo}
        alt="Event Ushers — The Crew Connect Hub"
        className={`${sizeClasses[size]} w-auto max-w-none object-contain filter drop-shadow-xs rounded-xl`}
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.src.endsWith("logo.jpeg")) {
            target.src = "/images/logo.jpeg";
          }
        }}
      />
    </div>
  );
};
