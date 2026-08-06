"use client";

import React from "react";
import { X, CheckCircle, ArrowRight, ShieldCheck, Clock, Users } from "lucide-react";

export interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  features: string[];
  deliverables: string[];
  idealFor: string[];
  image?: string;
  overviewChecklist?: string[];
}

interface ServiceModalProps {
  service: ServiceDetail | null;
  onClose: () => void;
  onOpenHire: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onOpenHire }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-amber-500/30 transform transition-all my-8">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 font-semibold text-xs rounded-full mb-3 uppercase tracking-wider">
            {service.category}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            {service.title}
          </h3>
          <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Overview
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {service.longDescription}
            </p>
          </div>

          {/* Highlights & Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/60">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600" />
                Key Service Features
              </h4>
              <ul className="space-y-2">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-900" />
                Guaranteed Deliverables
              </h4>
              <ul className="space-y-2">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Ideal For */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Ideal Event Types
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.idealFor.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Fast dispatch within 24 hours</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-all"
            >
              Close
            </button>
            <a
              href="#"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white text-xs font-extrabold shadow-md shadow-pink-500/20 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <span>Book {service.title}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
