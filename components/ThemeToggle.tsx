"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  darkMode,
  onToggle,
  className = "",
}) => {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center ${
        darkMode
          ? "bg-slate-900 border border-slate-700 text-amber-400 hover:bg-slate-800"
          : "bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 shadow-xs"
      } ${className}`}
      aria-label={`Switch to ${darkMode ? "Light" : "Dark"} Mode`}
      title={`Switch to ${darkMode ? "Light" : "Dark"} Mode`}
    >
      {darkMode ? (
        <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700" />
      )}
    </button>
  );
};
