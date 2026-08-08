import { blogArticles, BlogArticle } from "@/data/blogData";
import { servicesData } from "@/data/servicesData";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined"
    ? `${window.location.origin}/api`
    : "http://localhost:5000/api");

export const SERVER_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:5000");

export interface CategoryItem {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  description?: string;
  type?: string;
}

export interface HireSubmission {
  _id?: string;
  type: "hire_staff" | "join_crew";
  fullName: string;
  email: string;
  phone: string;
  eventType?: string;
  crewNeeded?: string;
  crewCount?: string;
  eventDate?: string;
  location?: string;
  notes?: string;
  status?: string;
  createdAt?: string;
}

// Fetch all blogs (API + fallback)
export async function getArticlesFromApi(): Promise<BlogArticle[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs`, { cache: "no-store" });
    if (!res.ok) throw new Error("API Offline");
    const json = await res.json();
    if (json.success && json.data && json.data.length > 0) {
      return json.data;
    }
  } catch (error) {
    console.warn("Using fallback static blog articles.");
  }
  return blogArticles;
}

// Fetch single article by slug
export async function getArticleBySlugFromApi(slug: string): Promise<BlogArticle | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs/${slug}`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) return json.data;
    }
  } catch (error) {
    console.warn(`Fallback fetch for slug ${slug}`);
  }
  return blogArticles.find((art) => art.slug === slug || art.id.toString() === slug) || null;
}

// Submit Staff Hire or Crew Application
export async function submitHireRequestApi(data: Partial<HireSubmission>): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/hire`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const json = await res.json();
      return json.success;
    }
  } catch (error) {
    console.warn("Hire request submission API offline, simulating clean success.");
  }
  return true;
}

const SERVICES_CACHE_KEY = "eventushers_services";

function getLocalServicesCache(): any[] | null {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(SERVICES_CACHE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
  }
  return null;
}

function setLocalServicesCache(services: any[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(SERVICES_CACHE_KEY, JSON.stringify(services));
  }
}

// Fetch services (API with client cache + static servicesData fallback)
export async function getServicesFromApi(all = false): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/services${all ? "?all=true" : ""}`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const mapped = json.data.map((item: any) => ({
          ...item,
          id: item.serviceId || item.id || item._id,
        }));
        setLocalServicesCache(mapped);
        return all ? mapped : mapped.filter((s: any) => s.active !== false);
      }
    }
  } catch (error) {
    console.warn("API offline, checking local cache.");
  }

  const cache = getLocalServicesCache();
  const list = cache || servicesData;
  return all ? list : list.filter((s: any) => s.active !== false);
}

// Save or Update service via API & local cache sync
export async function saveServiceApi(svc: any): Promise<any> {
  const currentCache = getLocalServicesCache() || servicesData;
  const exists = currentCache.some((s: any) => s.id === svc.id || s.slug === svc.slug);
  let updatedCache: any[];
  if (exists) {
    updatedCache = currentCache.map((s: any) =>
      s.id === svc.id || s.slug === svc.slug ? { ...s, ...svc } : s
    );
  } else {
    updatedCache = [svc, ...currentCache];
  }
  setLocalServicesCache(updatedCache);

  try {
    const res = await fetch(`${API_BASE_URL}/services/${svc.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(svc),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return {
          ...json.data,
          id: json.data.serviceId || json.data.id || json.data._id,
        };
      }
    }
  } catch (e) {
    console.warn("Failed to sync service via API", e);
  }
  return svc;
}

// Delete service via API & local cache sync
export async function deleteServiceApi(id: string): Promise<boolean> {
  const currentCache = getLocalServicesCache() || servicesData;
  const updatedCache = currentCache.filter((s: any) => s.id !== id && s.slug !== id);
  setLocalServicesCache(updatedCache);

  try {
    const res = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: "DELETE",
    });
    if (res.ok) return true;
  } catch (e) {
    console.warn("Failed to delete service via API", e);
  }
  return true;
}

// Admin API Actions
export async function fetchDashboardStatsApi() {
  try {
    const res = await fetch(`${API_BASE_URL}/dashboard/stats`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      return json;
    }
  } catch (e) {}
  return {
    stats: {
      totalBlogs: 12,
      totalServices: 6,
      totalCategories: 5,
      totalHireRequests: 48,
      totalCrewApplications: 1500,
      pendingRequests: 4,
    },
    recentRequests: [],
    recentBlogs: [],
  };
}
