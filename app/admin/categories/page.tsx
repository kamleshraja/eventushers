"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { FolderKanban, Plus, Edit3, Trash2, Tag, Check, Sparkles, X } from "lucide-react";

interface CategoryRecord {
  id: string;
  name: string;
  type: "blog" | "service";
  description: string;
  count: number;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryRecord[]>([
    { id: "1", name: "Staffing & Logistics", type: "blog", description: "Crew management and onboarding standards", count: 5 },
    { id: "2", name: "Technology", type: "blog", description: "Real-time matching and tech innovations", count: 4 },
    { id: "3", name: "Career Insights", type: "blog", description: "Hospitality career tips and protocol training", count: 3 },
    { id: "4", name: "Event Planning Tips", type: "blog", description: "Best practices for corporate organizers", count: 2 },
    { id: "5", name: "Hospitality & Front of House", type: "service", description: "Guest hostesses and VIP ushers", count: 1 },
    { id: "6", name: "Safety & Crowd Management", type: "service", description: "Security and perimeter protection", count: 1 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryRecord | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<CategoryRecord | null>(null);
  const [name, setName] = useState("");
  const [type, setType] = useState<"blog" | "service">("blog");
  const [description, setDescription] = useState("");

  const handleOpenCreateModal = () => {
    setEditingCategory(null);
    setName("");
    setType("blog");
    setDescription("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cat: CategoryRecord) => {
    setEditingCategory(cat);
    setName(cat.name);
    setType(cat.type);
    setDescription(cat.description);
    setIsModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    if (editingCategory) {
      // Update existing category
      setCategories((prev) =>
        prev.map((c) => (c.id === editingCategory.id ? { ...c, name, type, description } : c))
      );
    } else {
      // Create new category
      const newCat: CategoryRecord = {
        id: Date.now().toString(),
        name,
        type,
        description: description || "Category section",
        count: 0,
      };
      setCategories((prev) => [newCat, ...prev]);
    }

    setName("");
    setDescription("");
    setEditingCategory(null);
    setIsModalOpen(false);
  };

  const handleConfirmDeleteCategory = () => {
    if (deletingCategory) {
      setCategories((prev) => prev.filter((c) => c.id !== deletingCategory.id));
      setDeletingCategory(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Categories Manager" subtitle="Organize blog topics and service categories across the platform" />

        <main className="p-6 md:p-8 space-y-6 flex-1">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-lg font-extrabold text-slate-950">Taxonomy Categories</h3>
              <p className="text-xs text-slate-500">Currently managing {categories.length} active categories</p>
            </div>

            <button
              onClick={handleOpenCreateModal}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-xs shadow-md shadow-pink-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold">
                  <tr>
                    <th className="p-4 pl-6">Category Name</th>
                    <th className="p-4">Target Domain</th>
                    <th className="p-4">Description</th>
                    <th className="p-4 text-right pr-6">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 pl-6 font-bold text-slate-950 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-amber-500" />
                        <span>{cat.name}</span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-extrabold ${
                            cat.type === "blog" ? "bg-amber-100 text-amber-900" : "bg-blue-100 text-blue-900"
                          }`}
                        >
                          {cat.type === "blog" ? "Blog Topic" : "Service Domain"}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600 max-w-sm">{cat.description}</td>
                      <td className="p-4 text-right pr-6 space-x-2">
                        <button
                          onClick={() => handleOpenEditModal(cat)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-amber-500/10 text-slate-700 hover:text-amber-600 transition-colors cursor-pointer"
                          title="Edit Category"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingCategory(cat)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-red-500/10 text-slate-700 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-xl font-extrabold text-slate-950">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">Category Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. VIP Protocol Standards"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">Target Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as "blog" | "service")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold bg-white focus:outline-hidden"
                >
                  <option value="blog">Blog Topic</option>
                  <option value="service">Service Domain</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">Short Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-slate-300 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-white font-extrabold text-xs shadow-md cursor-pointer"
                >
                  {editingCategory ? "Update Category" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={deletingCategory !== null}
        title={`Delete Category "${deletingCategory?.name}"?`}
        message="Are you sure you want to delete this taxonomy category? Articles and services associated with it may need re-categorization."
        confirmText="Yes, Delete Category"
        onConfirm={handleConfirmDeleteCategory}
        onCancel={() => setDeletingCategory(null)}
      />
    </div>
  );
}
