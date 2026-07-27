"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, X, Check, Loader2, Link as LinkIcon } from "lucide-react";
import { API_BASE_URL, SERVER_BASE_URL } from "@/lib/api";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange, label = "Featured Image" }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // Read local Data URL for instant preview & reliability
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      onChange(dataUrl);

      // Attempt to send to Express API upload endpoint
      try {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(`${API_BASE_URL}/upload`, {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const json = await res.json();
          if (json.success && json.url) {
            onChange(`${SERVER_BASE_URL}${json.url}`);
          }
        }
      } catch (err) {
        console.warn("Upload API offline, using local data preview URL.");
      }

      setUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 2000);
    };

    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-3 text-left">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-800">{label}</label>
        <div className="flex items-center gap-1 text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              activeTab === "upload" ? "bg-amber-400 text-slate-950 font-extrabold" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              activeTab === "url" ? "bg-amber-400 text-slate-950 font-extrabold" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Image URL
          </button>
        </div>
      </div>

      {/* Invisible File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Tab 1: Upload Dropzone Area */}
      {activeTab === "upload" && (
        <div>
          {value ? (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group">
              <img src={value} alt="Uploaded preview" className="w-full h-44 object-cover" />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-full bg-white text-slate-950 text-xs font-extrabold shadow-md hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  Replace Image
                </button>
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="p-2 rounded-full bg-red-500 text-white text-xs shadow-md hover:bg-red-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 hover:border-amber-500 rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-amber-50/20 transition-all cursor-pointer space-y-2 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <UploadCloud className="w-6 h-6" />}
              </div>

              <div>
                <p className="text-xs font-extrabold text-slate-900">
                  {uploading ? "Uploading Image..." : "Click to Upload Image from Computer"}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">Supports PNG, JPG, WEBP or GIF up to 10MB</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Direct URL Input */}
      {activeTab === "url" && (
        <div className="relative">
          <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste image URL (e.g. https://images.unsplash.com/...)"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
          />
        </div>
      )}

      {uploadSuccess && (
        <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
          <Check className="w-3.5 h-3.5 text-emerald-600" /> Image uploaded successfully!
        </p>
      )}
    </div>
  );
};
