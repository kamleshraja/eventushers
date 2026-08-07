"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  Plus,
  Search,
  Filter,
  Star,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  Upload,
  ArrowUpDown,
  MoveUp,
  MoveDown,
  Quote,
  Sparkles,
  X,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  UserCheck,
  Building,
  Briefcase,
  Tag,
} from "lucide-react";

interface Testimonial {
  _id: string;
  customerName: string;
  designation: string;
  companyName: string;
  quote: string;
  rating: number;
  eventBadgeTitle: string;
  profileImage: string;
  isVerified: boolean;
  displayOrder: number;
  status: "Active" | "Inactive";
  createdBy: string;
  updatedBy: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminTestimonialsPage() {
  const router = useRouter();

  // State Management
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("displayOrder");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Notification State
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    customerName: "",
    designation: "",
    companyName: "",
    quote: "",
    rating: 5,
    eventBadgeTitle: "1,200 Delegate Conference",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    isVerified: true,
    displayOrder: 1,
    status: "Active" as "Active" | "Inactive",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);

  // Reorder State
  const [isReordering, setIsReordering] = useState(false);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch Testimonials
  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        search,
        status: statusFilter,
        sortBy,
        page: page.toString(),
        limit: "15",
      });

      const res = await fetch(`http://localhost:5000/api/testimonials/admin?${queryParams.toString()}`);
      if (!res.ok) {
        throw new Error("Failed to load testimonials");
      }
      const data = await res.json();
      setTestimonials(data.testimonials || []);
      setTotalPages(data.totalPages || 1);
      setTotalCount(data.total || 0);
    } catch (err: any) {
      console.error(err);
      showToast("error", err.message || "Failed to load testimonials from backend");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, sortBy, page]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("eventushers_admin_token");
    }
    router.push("/admin/login");
  };

  // Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.customerName || !formData.customerName.trim()) errors.customerName = "Customer Name is required";
    if (!formData.designation || !formData.designation.trim()) errors.designation = "Designation / Job Title is required";
    if (!formData.quote || !formData.quote.trim()) errors.quote = "Testimonial Message is required";

    if (!formData.profileImage || !formData.profileImage.trim()) {
      formData.profileImage = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Open Modal Helpers
  const handleOpenAdd = () => {
    const nextOrder = testimonials.length > 0 ? Math.max(...testimonials.map((t) => t.displayOrder || 0)) + 1 : 1;
    setFormData({
      customerName: "",
      designation: "",
      companyName: "",
      quote: "",
      rating: 5,
      eventBadgeTitle: "",
      profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      isVerified: true,
      displayOrder: nextOrder,
      status: "Active",
    });
    setFormErrors({});
    setSelectedId(null);
    setModalMode("add");
    setModalOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setFormData({
      customerName: t.customerName,
      designation: t.designation,
      companyName: t.companyName,
      quote: t.quote,
      rating: t.rating,
      eventBadgeTitle: t.eventBadgeTitle,
      profileImage: t.profileImage,
      isVerified: t.isVerified,
      displayOrder: t.displayOrder,
      status: t.status,
    });
    setFormErrors({});
    setSelectedId(t._id);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleOpenView = (t: Testimonial) => {
    const found = testimonials.find((item) => item._id === t._id) || t;
    setFormData({
      customerName: found.customerName,
      designation: found.designation,
      companyName: found.companyName,
      quote: found.quote,
      rating: found.rating,
      eventBadgeTitle: found.eventBadgeTitle,
      profileImage: found.profileImage,
      isVerified: found.isVerified,
      displayOrder: found.displayOrder,
      status: found.status,
    });
    setSelectedId(found._id);
    setModalMode("view");
    setModalOpen(true);
  };

  // Submit Handler (Create / Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === "view") return;
    if (!validateForm()) return;

    setSaving(true);
    try {
      const url =
        modalMode === "add"
          ? "http://localhost:5000/api/testimonials"
          : `http://localhost:5000/api/testimonials/${selectedId}`;
      const method = modalMode === "add" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          createdBy: "Admin User",
          updatedBy: "Admin User",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Operation failed");
      }

      showToast("success", `Testimonial ${modalMode === "add" ? "created" : "updated"} successfully!`);
      setModalOpen(false);
      fetchTestimonials();
    } catch (err: any) {
      showToast("error", err.message || "Failed to save testimonial");
    } finally {
      setSaving(false);
    }
  };

  // Status Toggle
  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      const res = await fetch(`http://localhost:5000/api/testimonials/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus, updatedBy: "Admin User" }),
      });
      if (!res.ok) throw new Error("Failed to change status");
      showToast("success", `Status changed to ${nextStatus}`);
      fetchTestimonials();
    } catch (err: any) {
      showToast("error", err.message || "Status update failed");
    }
  };

  // Single Delete
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/testimonials/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete testimonial");
      showToast("success", "Testimonial deleted successfully!");
      setDeleteConfirmId(null);
      fetchTestimonials();
    } catch (err: any) {
      showToast("error", err.message || "Failed to delete testimonial");
    }
  };

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const data = new FormData();
    data.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Image upload failed");
      const result = await res.json();
      const fullUrl = result.imageUrl?.startsWith("http")
        ? result.imageUrl
        : `http://localhost:5000${result.imageUrl}`;

      setFormData((prev) => ({ ...prev, profileImage: fullUrl }));
      showToast("success", "Profile image uploaded!");
    } catch (err: any) {
      showToast("error", err.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  // Display Order Shift Helpers
  const handleMoveOrder = async (index: number, direction: "up" | "down") => {
    const newItems = [...testimonials];
    const targetIdx = direction === "up" ? index - 1 : index + 1;

    if (targetIdx < 0 || targetIdx >= newItems.length) return;

    // Swap displayOrder values
    const tempOrder = newItems[index].displayOrder;
    newItems[index].displayOrder = newItems[targetIdx].displayOrder;
    newItems[targetIdx].displayOrder = tempOrder;

    // Optimistic UI update
    setTestimonials(newItems);
    setIsReordering(true);

    try {
      const payload = newItems.map((item) => ({ id: item._id, displayOrder: item.displayOrder }));
      const res = await fetch("http://localhost:5000/api/testimonials/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: payload }),
      });
      if (!res.ok) throw new Error("Reorder failed");
      showToast("success", "Display order updated!");
    } catch (err: any) {
      showToast("error", err.message || "Failed to save new order");
      fetchTestimonials();
    } finally {
      setIsReordering(false);
    }
  };

  const selectedTestimonial = testimonials.find((t) => t._id === selectedId);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-slate-950">
      <AdminSidebar onLogout={handleLogout} />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title="Testimonials Management"
          subtitle="Dynamically control website reviews, client ratings, and customer badges"
        />

        <main className="p-6 md:p-8 space-y-6 flex-1">
          {/* Toast Notification Banner */}
          {toast && (
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between shadow-lg transition-all animate-fadeIn ${
                toast.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                  : "bg-rose-50 border-rose-200 text-rose-900"
              }`}
            >
              <div className="flex items-center gap-3">
                {toast.type === "success" ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <span className="text-sm font-bold">{toast.message}</span>
              </div>
              <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Action Toolbar & Search */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, company, quote, event badge..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filters & Add Button */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Status Filter */}
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-500">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                  className="bg-transparent font-extrabold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active Only</option>
                  <option value="Inactive">Inactive Only</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-extrabold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value="displayOrder">Display Order (Asc)</option>
                  <option value="rating_desc">Highest Rating (5-1)</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name_asc">Customer Name A-Z</option>
                </select>
              </div>

              {/* Refresh */}
              <button
                onClick={fetchTestimonials}
                className="p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors"
                title="Refresh List"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </button>

              {/* Create Testimonial Button */}
              <button
                onClick={handleOpenAdd}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-xs shadow-md shadow-pink-500/20 flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Testimonial</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase text-slate-400">Total Testimonials</p>
                <p className="text-2xl font-black text-slate-950">{totalCount}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <Quote className="w-5 h-5" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase text-slate-400">Active Testimonials</p>
                <p className="text-2xl font-black text-emerald-600">
                  {testimonials.filter((t) => t.status === "Active").length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase text-slate-400">Verified Badges</p>
                <p className="text-2xl font-black text-blue-600">
                  {testimonials.filter((t) => t.isVerified).length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase text-slate-400">Avg Rating</p>
                <p className="text-2xl font-black text-amber-500">
                  {testimonials.length > 0
                    ? (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)
                    : "5.0"}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-600 flex items-center justify-center font-bold">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
            </div>
          </div>

          {/* Testimonials Table / List View */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            {loading ? (
              <div className="p-12 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
                <p className="text-sm font-bold text-slate-500">Loading testimonials from backend API...</p>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Quote className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900">No Testimonials Found</h4>
                  <p className="text-xs text-slate-500">
                    {search || statusFilter !== "All"
                      ? "No records matched your search filters."
                      : "Click 'Add Testimonial' to create your first website review."}
                  </p>
                </div>
                {(search || statusFilter !== "All") && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("All");
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                      <th className="py-3.5 px-4 w-16 text-center">Order</th>
                      <th className="py-3.5 px-4">Customer Details</th>
                      <th className="py-3.5 px-4">Event Badge</th>
                      <th className="py-3.5 px-4">Rating</th>
                      <th className="py-3.5 px-4">Testimonial Quote</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/80 text-xs">
                    {testimonials.map((item, index) => (
                      <tr
                        key={item._id}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          item.status === "Inactive" ? "bg-slate-50/40 opacity-75" : ""
                        }`}
                      >
                        {/* Display Order with Reorder Arrows */}
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-1 font-bold text-slate-700">
                            <span className="w-6 text-center font-extrabold bg-slate-100 py-1 rounded-lg border border-slate-200">
                              {item.displayOrder}
                            </span>
                            <div className="flex flex-col gap-0.5">
                              <button
                                disabled={index === 0 || isReordering}
                                onClick={() => handleMoveOrder(index, "up")}
                                className="p-0.5 text-slate-400 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                                title="Move Up"
                              >
                                <MoveUp className="w-3 h-3" />
                              </button>
                              <button
                                disabled={index === testimonials.length - 1 || isReordering}
                                onClick={() => handleMoveOrder(index, "down")}
                                className="p-0.5 text-slate-400 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                                title="Move Down"
                              >
                                <MoveDown className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Customer Avatar & Name */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative shrink-0">
                              <img
                                src={item.profileImage}
                                alt={item.customerName}
                                className="w-10 h-10 rounded-full object-cover border border-amber-400 shadow-xs"
                              />
                              {item.isVerified && (
                                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center border border-white">
                                  <CheckCircle2 className="w-3 h-3" />
                                </span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-slate-950 truncate flex items-center gap-1">
                                {item.customerName}
                                {item.isVerified && (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 font-bold">
                                    Verified
                                  </span>
                                )}
                              </h4>
                              <p className="text-[11px] text-slate-500 truncate font-medium">
                                {item.designation}
                              </p>
                              <p className="text-[11px] font-bold text-amber-600 truncate">
                                {item.companyName}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Event Badge */}
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/20 font-extrabold text-[11px] whitespace-nowrap">
                            <Tag className="w-3 h-3 text-amber-600" />
                            {item.eventBadgeTitle}
                          </span>
                        </td>

                        {/* Star Rating */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            {[...Array(item.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                            <span className="ml-1 font-extrabold text-slate-800">{item.rating}.0</span>
                          </div>
                        </td>

                        {/* Quote Snippet */}
                        <td className="py-4 px-4 max-w-xs">
                          <p className="text-slate-600 line-clamp-2 italic font-normal text-xs">
                            "{item.quote}"
                          </p>
                        </td>

                        {/* Status Switch Badge */}
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleToggleStatus(item._id, item.status)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-extrabold text-[11px] transition-all cursor-pointer ${
                              item.status === "Active"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200"
                                : "bg-rose-100 text-rose-800 border border-rose-300 hover:bg-rose-200"
                            }`}
                          >
                            {item.status === "Active" ? (
                              <>
                                <CheckCircle2 className="w-3 h-3" /> Active
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3" /> Inactive
                              </>
                            )}
                          </button>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenView(item)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleOpenEdit(item)}
                              className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors"
                              title="Edit Testimonial"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(item._id)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                              title="Delete Testimonial"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-600">
                <span>
                  Page {page} of {totalPages} ({totalCount} total items)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 disabled:opacity-40 hover:bg-slate-100"
                  >
                    Previous
                  </button>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 disabled:opacity-40 hover:bg-slate-100"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* CRUD MODAL (ADD / EDIT / VIEW) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-scaleUp">
            {/* Modal Header */}
            <div className="p-6 bg-slate-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-extrabold">
                  <Quote className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white">
                    {modalMode === "add"
                      ? "Add New Testimonial"
                      : modalMode === "edit"
                      ? "Edit Testimonial"
                      : "Testimonial Audit Details"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {modalMode === "view"
                      ? "Full read-only audit log and profile metadata"
                      : "Fill in customer review information and event badge"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              
              {/* Profile Image & Upload Section */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative">
                  <img
                    src={formData.profileImage || "https://via.placeholder.com/150"}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-amber-400 shadow-md"
                  />
                  {formData.isVerified && (
                    <span className="absolute bottom-0 right-0 w-5 h-5 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center border-2 border-white">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <label className="text-xs font-extrabold text-slate-700 block">
                    Customer Profile Image
                  </label>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <label className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 text-xs font-bold border border-amber-500/30 cursor-pointer flex items-center gap-1.5 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? "Uploading..." : "Upload Photo"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={modalMode === "view" || uploadingImage}
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[10px] text-slate-400 font-semibold">Or paste image URL below</span>
                  </div>
                  {modalMode !== "view" && (
                    <input
                      type="text"
                      placeholder="Image URL (https://...)"
                      value={formData.profileImage}
                      onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none"
                    />
                  )}
                  {formErrors.profileImage && (
                    <p className="text-[11px] font-bold text-rose-600">{formErrors.profileImage}</p>
                  )}
                </div>
              </div>

              {/* Grid Fields: Name & Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-amber-600" /> Customer Name *
                  </label>
                  <input
                    type="text"
                    disabled={modalMode === "view"}
                    placeholder="e.g. Wanjiru Mwangi"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                  {formErrors.customerName && (
                    <p className="text-[11px] font-bold text-rose-600">{formErrors.customerName}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-amber-600" /> Job Title / Designation *
                  </label>
                  <input
                    type="text"
                    disabled={modalMode === "view"}
                    placeholder="e.g. Head of Corporate Events"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                  {formErrors.designation && (
                    <p className="text-[11px] font-bold text-rose-600">{formErrors.designation}</p>
                  )}
                </div>
              </div>

              {/* Grid Fields: Company & Event Badge Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-amber-600" /> Company / Organization <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    disabled={modalMode === "view"}
                    placeholder="e.g. Innovate Africa Tech Summit (Optional)"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                  {formErrors.companyName && (
                    <p className="text-[11px] font-bold text-rose-600">{formErrors.companyName}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-amber-600" /> Event / Badge Title <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    disabled={modalMode === "view"}
                    placeholder="e.g. 1,200 Delegate Conference (Optional)"
                    value={formData.eventBadgeTitle}
                    onChange={(e) => setFormData({ ...formData, eventBadgeTitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                  {formErrors.eventBadgeTitle && (
                    <p className="text-[11px] font-bold text-rose-600">{formErrors.eventBadgeTitle}</p>
                  )}
                </div>
              </div>

              {/* Testimonial Quote Message */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Quote className="w-3.5 h-3.5 text-amber-600" /> Testimonial Message *
                </label>
                <textarea
                  rows={4}
                  disabled={modalMode === "view"}
                  placeholder="Enter detailed customer feedback or quote..."
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 leading-relaxed"
                />
                {formErrors.quote && <p className="text-[11px] font-bold text-rose-600">{formErrors.quote}</p>}
              </div>

              {/* Rating, Order & Status Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                
                {/* Rating (1-5 stars) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Rating (1-5 Stars)</label>
                  <select
                    disabled={modalMode === "view"}
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-900"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    <option value={2}>⭐⭐ (2 Stars)</option>
                    <option value={1}>⭐ (1 Star)</option>
                  </select>
                </div>

                {/* Display Order */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Display Order Index</label>
                  <input
                    type="number"
                    min={1}
                    disabled={modalMode === "view"}
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                  />
                </div>

                {/* Status Toggle */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Publish Status</label>
                  <select
                    disabled={modalMode === "view"}
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "Active" | "Inactive" })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900"
                  >
                    <option value="Active">Active (Visible on Site)</option>
                    <option value="Inactive">Inactive (Hidden)</option>
                  </select>
                </div>

              </div>

              {/* Verification Checkbox */}
              <div className="flex items-center gap-3 pt-2">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-extrabold text-slate-800">
                  <input
                    type="checkbox"
                    disabled={modalMode === "view"}
                    checked={formData.isVerified}
                    onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                  />
                  <span>Show Verified Badge Checkmark</span>
                </label>
              </div>

              {/* Audit Metadata Box (View Mode) */}
              {modalMode === "view" && selectedTestimonial && (
                <div className="p-4 rounded-2xl bg-slate-100 text-[11px] text-slate-600 space-y-1 font-semibold border border-slate-200">
                  <p className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Audit Log Metadata</p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="text-slate-400">Created By:</span> {selectedTestimonial.createdBy || "Admin"}
                    </div>
                    <div>
                      <span className="text-slate-400">Updated By:</span> {selectedTestimonial.updatedBy || "Admin"}
                    </div>
                    <div>
                      <span className="text-slate-400">Created At:</span>{" "}
                      {selectedTestimonial.createdAt
                        ? new Date(selectedTestimonial.createdAt).toLocaleString()
                        : "N/A"}
                    </div>
                    <div>
                      <span className="text-slate-400">Updated At:</span>{" "}
                      {selectedTestimonial.updatedAt
                        ? new Date(selectedTestimonial.updatedAt).toLocaleString()
                        : "N/A"}
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-extrabold"
                >
                  {modalMode === "view" ? "Close" : "Cancel"}
                </button>

                {modalMode !== "view" && (
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white text-xs font-extrabold shadow-md flex items-center gap-2"
                  >
                    {saving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                    <span>{modalMode === "add" ? "Create Testimonial" : "Save Changes"}</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full p-6 rounded-3xl shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-950">Delete Testimonial?</h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to delete this customer review? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-extrabold hover:bg-rose-700 shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
