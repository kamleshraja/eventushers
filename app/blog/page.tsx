"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HireModal } from "@/components/HireModal";
import { JoinModal } from "@/components/JoinModal";
import { CtaBanner } from "@/components/CtaBanner";
import { blogArticles } from "@/data/blogData";
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowRight, 
  User
} from "lucide-react";

import { usePageContent } from "@/lib/pageContent";
import { renderFormattedHeading } from "@/lib/headingUtils";

export default function BlogPage() {
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const blogContent = usePageContent("blog", {
    key: "blog",
    title: "Blog & Insights Page",
    path: "/blog",
    headline: "Event Industry Trends, Staffing Tips & Stories",
    subheading: "Stay ahead with expert insights on corporate protocol, venue crowd management, event tech innovations, and crew career growth across Kenya.",
    metaTitle: "Event Industry Insights & News — Event Ushers",
    metaDescription: "Read the latest articles on event staffing logistics, venue management, and corporate protocol tips across Kenya.",
    customFields: {
      blogHeroBadge: "EVENT USHERS INSIGHTS & NEWS",
      headlineHighlight: "Stories",
    },
  });

  const categories = ["All", "Staffing & Logistics", "Technology", "Career Insights", "Event Planning Tips"];

  const filteredArticles = blogArticles.filter((art) => {
    return activeCategory === "All" || art.category === activeCategory;
  });

  const visibleArticles = filteredArticles.slice(0, visibleCount);

  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Sticky Navigation */}
      <Navbar
        onOpenHire={() => setHireModalOpen(true)}
        onOpenJoin={() => setJoinModalOpen(true)}
      />

      {/* Clean White Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden bg-white text-slate-900 border-b border-slate-100">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {(blogContent.customFields?.blogHeroBadge || blogContent.customFields?.heroBadgeText || "EVENT USHERS INSIGHTS & NEWS") && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-bold uppercase tracking-wider bg-amber-500/10 border-amber-500/30 text-amber-800 mb-6 shadow-xs">
              <BookOpen className="w-4 h-4 text-amber-600" />
              {blogContent.customFields?.blogHeroBadge || blogContent.customFields?.heroBadgeText || "EVENT USHERS INSIGHTS & NEWS"}
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-950 max-w-4xl mx-auto mb-6">
            {renderFormattedHeading(
              blogContent.headline,
              blogContent.customFields?.headlineHighlight || "Stories"
            )}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed font-normal">
            {blogContent.subheading}
          </p>
        </div>
      </section>

      {/* Main Articles Grid & Filtering */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(6);
                }}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-amber-400 to-pink-500 text-white shadow-md shadow-pink-500/20 scale-105"
                    : "bg-white text-slate-700 hover:text-amber-600 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleArticles.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group cursor-pointer rounded-3xl overflow-hidden border shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 bg-white border-slate-200/80"
              >
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                    <span className="absolute top-4 left-4 px-3.5 py-1 bg-amber-400 text-slate-950 text-xs font-bold rounded-full shadow-md">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-500 stroke-[1.75]" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400 stroke-[1.75]" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-950 group-hover:text-amber-500 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-amber-500 stroke-[1.75]" />
                    {post.author}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 group-hover:text-amber-600 group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 text-amber-500" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredArticles.length && (
            <div className="mt-14 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 3)}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-sm shadow-md shadow-pink-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap inline-flex items-center gap-2"
              >
                <span>Load More Articles</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Call to Action Banner */}
      <CtaBanner />

      {/* Footer */}
      <Footer
        onOpenHire={() => setHireModalOpen(true)}
        onOpenJoin={() => setJoinModalOpen(true)}
      />

      {/* Modals */}
      <HireModal
        isOpen={hireModalOpen}
        onClose={() => setHireModalOpen(false)}
      />

      <JoinModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
      />
    </main>
  );
}
