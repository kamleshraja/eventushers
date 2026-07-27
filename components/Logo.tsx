"use client";

import React from "react";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "h-10 sm:h-11",
    md: "h-13 sm:h-15 lg:h-16",
    lg: "h-18 sm:h-22",
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/images/logo.png"
        alt="Event Ushers — The Crew Connect Hub"
        className={`${sizeClasses[size]} w-auto max-w-none object-contain filter drop-shadow-xs`}
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
