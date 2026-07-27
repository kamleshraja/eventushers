"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { blogArticles as initialArticles, BlogArticle } from "@/data/blogData";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Sparkles, 
  ArrowLeft, 
  Save, 
  CheckCircle2, 
  ExternalLink,
  Image as ImageIcon,
  Tag,
  User,
  BookOpen,
  ChevronDown
} from "lucide-react";

import { API_BASE_URL } from "@/lib/api";

const BLOGS_STORAGE_KEY = "eventushers_blogs";

export default function AdminBlogsPage() {
  const [articles, setArticles] = useState<BlogArticle[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(BLOGS_STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {}
      }
    }
    return initialArticles;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Fetch from MongoDB Atlas on mount
  useEffect(() => {
    const fetchBlogsFromMongo = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/blogs?category=All`, { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && json.data.length > 0) {
            setArticles(json.data);
            if (typeof window !== "undefined") {
              localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(json.data));
            }
          }
        }
      } catch (e) {
        console.warn("MongoDB API offline; using local blogs state.");
      }
    };
    fetchBlogsFromMongo();
  }, []);

  const saveArticlesToStateAndStorage = (newArticles: BlogArticle[]) => {
    setArticles(newArticles);
    if (typeof window !== "undefined") {
      localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(newArticles));
    }
  };

  // View Mode: 'list' | 'create' | 'edit'
  const [viewMode, setViewMode] = useState<"list" | "create" | "edit">("list");
  const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Staffing & Logistics");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Event Ushers Team");
  const [image, setImage] = useState("https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80");
  const [savedNotification, setSavedNotification] = useState(false);

  const categories = ["All", "Staffing & Logistics", "Technology", "Career Insights", "Event Planning Tips"];

  const filteredArticles = articles.filter((art) => {
    const matchesCategory = categoryFilter === "All" || art.category === categoryFilter;
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenCreateView = () => {
    setEditingArticle(null);
    setTitle("");
    setCategory("Staffing & Logistics");
    setExcerpt("");
    setContent("");
    setAuthor("Event Ushers Team");
    setImage("https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80");
    setSavedNotification(false);
    setViewMode("create");
  };

  const handleOpenEditView = (article: BlogArticle) => {
    setEditingArticle(article);
    setTitle(article.title);
    setCategory(article.category);
    setExcerpt(article.excerpt);
    setContent(article.content || article.excerpt);
    setAuthor(article.author);
    setImage(article.image);
    setSavedNotification(false);
    setViewMode("edit");
  };

  // Delete confirmation state
  const [deletingId, setDeletingId] = useState<number | string | null>(null);

  const handleConfirmDelete = async () => {
    if (deletingId !== null) {
      const updated = articles.filter((a) => a.id !== deletingId && (a as any)._id !== deletingId);
      saveArticlesToStateAndStorage(updated);

      if (editingArticle?.id === deletingId || (editingArticle as any)?._id === deletingId) setViewMode("list");
      
      // Delete in MongoDB Atlas API
      fetch(`${API_BASE_URL}/blogs/${deletingId}`, { method: "DELETE" }).catch(() => {});

      setDeletingId(null);
    }
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt) return;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const payload = {
      title,
      slug,
      category,
      excerpt,
      content: content || excerpt,
      author,
      image,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }),
    };

    if (editingArticle) {
      // Update existing
      const targetId = (editingArticle as any)._id || editingArticle.id || editingArticle.slug;
      try {
        const res = await fetch(`${API_BASE_URL}/blogs/${targetId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            const updated = articles.map((a) =>
              a.id === editingArticle.id || (a as any)._id === (editingArticle as any)._id
                ? { ...a, ...json.data }
                : a
            );
            saveArticlesToStateAndStorage(updated);
          }
        }
      } catch (err) {
        const updated = articles.map((a) =>
          a.id === editingArticle.id || (a as any)._id === (editingArticle as any)._id
            ? { ...a, ...payload }
            : a
        );
        saveArticlesToStateAndStorage(updated);
      }
    } else {
      // Create new
      try {
        const res = await fetch(`${API_BASE_URL}/blogs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            const updated = [json.data, ...articles];
            saveArticlesToStateAndStorage(updated);
          }
        }
      } catch (err) {
        const newArticle: BlogArticle = {
          id: Date.now(),
          ...payload,
          readTime: "4 min read",
          authorRole: "Operations Specialist",
          authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
          tags: ["Kenya Events", "Staffing"],
          keyTakeaways: ["Standardized protocol ensures event hospitality excellence."],
          sections: [
            {
              heading: "Executive Overview",
              paragraphs: [content || excerpt],
            },
          ],
        };
        const updated = [newArticle, ...articles];
        saveArticlesToStateAndStorage(updated);
      }
    }

    setSavedNotification(true);
    setTimeout(() => {
      setSavedNotification(false);
      setViewMode("list");
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title={viewMode === "list" ? "Blogs Manager" : viewMode === "create" ? "Create New Blog" : `Editing: ${editingArticle?.title}`}
          subtitle={viewMode === "list" ? "Create, edit, and publish dynamic blog content for the public site" : "Full-screen blog content & media editor"}
        />

        <main className="p-6 md:p-8 space-y-6 flex-1">
          
          {/* VIEW MODE 1: ARTICLES TABLE LISTING */}
          {viewMode === "list" && (
            <div className="space-y-6">
              
              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>

                  <div className="relative">
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="appearance-none py-2.5 pl-4 pr-9 rounded-full border border-slate-200 text-xs font-bold bg-slate-50 focus:bg-white cursor-pointer transition-colors"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                <button
                  onClick={handleOpenCreateView}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-xs shadow-md shadow-pink-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Blog</span>
                </button>
              </div>

              {/* Clean Table Listing */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold">
                      <tr>
                        <th className="p-4 pl-6">Article</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Author</th>
                        <th className="p-4">Publish Date</th>
                        <th className="p-4 text-right pr-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {filteredArticles.map((article) => (
                        <tr key={article.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 pl-6">
                            <div className="flex items-center gap-3">
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                              />
                              <div className="max-w-md">
                                <h4 className="font-bold text-slate-950 line-clamp-1">{article.title}</h4>
                                <p className="text-xs text-slate-500 line-clamp-1">{article.excerpt}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <span className="inline-block whitespace-nowrap px-3 py-1 bg-amber-400 text-slate-950 text-[11px] font-extrabold rounded-full border border-amber-500/20 shadow-2xs">
                              {article.category}
                            </span>
                          </td>
                          <td className="p-4 text-slate-700 font-bold whitespace-nowrap">{article.author}</td>
                          <td className="p-4 text-slate-500 whitespace-nowrap">{article.date}</td>
                          <td className="p-4 text-right pr-6 space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => handleOpenEditView(article)}
                              className="p-2.5 rounded-xl bg-slate-100 hover:bg-amber-500/10 text-slate-700 hover:text-amber-600 transition-colors cursor-pointer"
                              title="Edit Article Page"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeletingId(article.id)}
                              className="p-2.5 rounded-xl bg-slate-100 hover:bg-red-500/10 text-slate-700 hover:text-red-600 transition-colors cursor-pointer"
                              title="Delete Blog"
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

            </div>
          )}

          {/* VIEW MODE 2: DEDICATED INLINE FULL-PAGE EDITOR (NO POPUP) */}
          {(viewMode === "create" || viewMode === "edit") && (
            <div className="space-y-6 text-left animate-fadeIn">
              
              {/* Back Bar & Save Action Header */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <button
                    onClick={() => setViewMode("list")}
                    className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer flex items-center gap-2 text-xs font-bold whitespace-nowrap shrink-0"
                  >
                    <ArrowLeft className="w-4 h-4 text-slate-600" />
                    <span>Back to Blogs</span>
                  </button>

                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-mono font-extrabold text-amber-600 uppercase tracking-wider block">
                      {viewMode === "create" ? "Creating Blog" : "Editing Blog"}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 truncate" title={viewMode === "create" ? "New Blog Submission" : editingArticle?.title}>
                      {viewMode === "create" ? "New Blog Submission" : editingArticle?.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end whitespace-nowrap shrink-0">
                  {editingArticle && (
                    <Link
                      href={`/blog/${editingArticle.slug || editingArticle.id}`}
                      target="_blank"
                      className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      <span>Public Preview</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    </Link>
                  )}

                  <button
                    onClick={handleSaveArticle}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-xs shadow-md shadow-pink-500/20 hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Save className="w-4 h-4 text-white" />
                    <span>{viewMode === "create" ? "Publish Blog" : "Save Changes"}</span>
                  </button>
                </div>
              </div>

              {savedNotification && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Article saved successfully! Returning to directory...</span>
                </div>
              )}

              {/* 2-Column Full Editor Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column: Form Editor (8 Cols) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Article Metadata Box */}
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <BookOpen className="w-5 h-5 text-amber-500" />
                      <h3 className="text-lg font-extrabold text-slate-950">Article Core Details</h3>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-800">Article Title *</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="e.g. How Standardized Protocol Transforms Event Hospitality"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">Category Domain *</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold bg-white focus:outline-hidden cursor-pointer"
                        >
                          <option value="Staffing & Logistics">Staffing & Logistics</option>
                          <option value="Technology">Technology</option>
                          <option value="Career Insights">Career Insights</option>
                          <option value="Event Planning Tips">Event Planning Tips</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-800">Author Name *</label>
                        <input
                          type="text"
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                        />
                      </div>
                    </div>

                    <ImageUploader
                      value={image}
                      onChange={setImage}
                      label="Featured Banner Image"
                    />
                  </div>

                  {/* Summary & Content Box */}
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <Sparkles className="w-5 h-5 text-pink-500" />
                      <h3 className="text-lg font-extrabold text-slate-950">Article Excerpt & Full Content Body</h3>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-800">Short Summary / Card Excerpt *</label>
                      <textarea
                        rows={3}
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        required
                        placeholder="Provide a concise 2-sentence summary that appears on blog cards..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-800">Full Article Content Body</label>
                      <textarea
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write or paste the full article body content..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                      />
                    </div>
                  </div>

                </div>

                {/* Right Column: Live Article Card Preview (4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 sticky top-24">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700">Live Card Preview</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>

                    {/* Simulated Article Card */}
                    <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-md space-y-3">
                      <img
                        src={image || "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"}
                        alt="Preview"
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-5 space-y-3 text-left">
                        <span className="inline-block px-3 py-1 bg-amber-400 text-slate-950 text-[11px] font-extrabold rounded-full">
                          {category}
                        </span>
                        <h4 className="text-base font-extrabold text-slate-950 line-clamp-2 leading-snug">
                          {title || "Your Article Title Will Appear Here"}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {excerpt || "Article summary excerpt preview..."}
                        </p>
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-bold">
                          <span>By {author}</span>
                          <span>4 min read</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleSaveArticle}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-sm shadow-lg shadow-pink-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Save className="w-4.5 h-4.5 text-white" />
                      <span>{viewMode === "create" ? "Publish Article" : "Save Changes Now"}</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={deletingId !== null}
        title="Delete Blog Post?"
        message="Are you sure you want to delete this blog post? This action will permanently remove it from the platform."
        confirmText="Yes, Delete Blog"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}
