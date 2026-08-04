"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/api";

export interface ManagedPageData {
  key: string;
  title: string;
  path: string;
  headline: string;
  subheading: string;
  metaTitle: string;
  metaDescription: string;
  customFields?: Record<string, string>;
}

export const STORAGE_KEY = "eventushers_page_content";
export const UPDATE_EVENT = "eventushers_page_content_updated";

export function getStoredPageContent(key: string): ManagedPageData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: ManagedPageData[] = JSON.parse(raw);
      return parsed.find((p) => p.key === key) || null;
    }
  } catch (e) {
    console.warn("Failed to load page content from storage", e);
  }
  return null;
}

export function saveAllPagesToStorage(pages: ManagedPageData[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
    window.dispatchEvent(new Event(UPDATE_EVENT));

    // Async sync with MongoDB Atlas API backend
    pages.forEach((pg) => {
      fetch(`${API_BASE_URL}/pages/${pg.key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageKey: pg.key,
          pageTitle: pg.title,
          path: pg.path,
          heroHeadline: pg.headline,
          heroSubheading: pg.subheading,
          metaTitle: pg.metaTitle,
          metaDescription: pg.metaDescription,
          customContent: pg.customFields,
        }),
      }).catch(() => {});
    });
  } catch (e) {
    console.warn("Failed to save page content to storage", e);
  }
}

export function usePageContent(key: string, fallback: ManagedPageData): ManagedPageData {
  const [data, setData] = useState<ManagedPageData>(fallback);

  useEffect(() => {
    const syncContent = () => {
      const stored = getStoredPageContent(key);
      if (stored) {
        setData({
          ...fallback,
          ...stored,
          customFields: { ...fallback.customFields, ...stored.customFields },
        });
      }
    };

    syncContent();

    // Async sync with MongoDB API backend to update localStorage and state
    fetch(`${API_BASE_URL}/pages/${key}`, { cache: "no-store" })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("API Offline");
      })
      .then((json) => {
        if (json.success && json.data) {
          const pg = json.data;
          const mapped: ManagedPageData = {
            key: pg.pageKey,
            title: pg.pageTitle,
            path: pg.path,
            headline: pg.heroHeadline,
            subheading: pg.heroSubheading,
            metaTitle: pg.metaTitle,
            metaDescription: pg.metaDescription,
            customFields: pg.customContent || {},
          };

          // Save to localStorage
          if (typeof window !== "undefined") {
            try {
              const raw = localStorage.getItem(STORAGE_KEY);
              let currentPages: ManagedPageData[] = [];
              if (raw) {
                currentPages = JSON.parse(raw);
              }
              const existingIdx = currentPages.findIndex((p) => p.key === key);
              if (existingIdx > -1) {
                currentPages[existingIdx] = mapped;
              } else {
                currentPages.push(mapped);
              }
              localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPages));
            } catch (err) {}
          }

          // Update local component state
          setData({
            ...fallback,
            ...mapped,
            customFields: { ...fallback.customFields, ...mapped.customFields },
          });
        }
      })
      .catch(() => {
        // Fallback silently if API is offline
      });

    const handleStorage = () => syncContent();
    window.addEventListener(UPDATE_EVENT, handleStorage);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(UPDATE_EVENT, handleStorage);
      window.removeEventListener("storage", handleStorage);
    };
  }, [key]);

  return data;
}
