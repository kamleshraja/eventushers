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
      siteLogoUrl: "/images/logo.png",
    },
  });

  const customLogo = homeData.customFields?.siteLogoUrl || "/images/logo.png";

  const sizeClasses = {
    sm: "h-9 sm:h-10",
    md: "h-12 sm:h-14 lg:h-15",
    lg: "h-16 sm:h-20",
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
          if (target.src.endsWith("logo.png")) {
            target.src = "/images/logo.jpg";
          } else if (target.src.endsWith("logo.jpg")) {
            target.src = "/images/logo.svg";
          }
        }}
      />
    </div>
  );
};
