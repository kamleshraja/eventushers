"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HireModal } from "@/components/HireModal";
import { JoinModal } from "@/components/JoinModal";
import { CtaBanner } from "@/components/CtaBanner";
import { getArticleByIdOrSlug, blogArticles } from "@/data/blogData";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Check, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2
} from "lucide-react";

interface BlogDetailClientProps {
  articleId: string;
}

export function BlogDetailClient({ articleId }: BlogDetailClientProps) {
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const article = getArticleByIdOrSlug(articleId);

  if (!article) {
    return (
      <main className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
        <Navbar
          onOpenHire={() => setHireModalOpen(true)}
          onOpenJoin={() => setJoinModalOpen(true)}
        />
        <div className="pt-40 pb-24 text-center px-4 max-w-xl mx-auto">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Article Not Found</h1>
          <p className="text-slate-600 mb-8">The blog article you are looking for does not exist or has been relocated.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-white font-bold text-sm shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </Link>
        </div>
        <Footer
          onOpenHire={() => setHireModalOpen(true)}
          onOpenJoin={() => setJoinModalOpen(true)}
        />
      </main>
    );
  }

  // Get 3 related articles (excluding current article)
  const relatedArticles = blogArticles
    .filter((art) => art.id !== article.id)
    .slice(0, 3);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Sticky Navigation */}
      <Navbar
        onOpenHire={() => setHireModalOpen(true)}
        onOpenJoin={() => setJoinModalOpen(true)}
      />

      {/* Header & Breadcrumb Section */}
      <article className="pt-28 md:pt-36 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-full transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Insights & News</span>
          </Link>

          {/* Category Badge & Title */}
          <div className="space-y-4 mb-8">
            <span className="inline-block px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-extrabold rounded-full uppercase tracking-wider">
              {article.category}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
              {article.excerpt}
            </p>
          </div>

          {/* Author Bar & Publishing Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-slate-200 mb-10">
            <div className="flex items-center gap-3">
              <img
                src={article.authorAvatar}
                alt={article.author}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-500/30"
              />
              <div>
                <h4 className="text-sm font-extrabold text-slate-950">{article.author}</h4>
                <p className="text-xs text-slate-500">{article.authorRole}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-600" />
                {article.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Main Featured Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl mb-12 border border-slate-200">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-[320px] sm:h-[450px] object-cover"
            />
          </div>

          {/* Key Takeaways Box */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-50 via-pink-50/30 to-white border border-amber-200 shadow-sm mb-12">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-base mb-4">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span>Key Takeaways & Executive Summary</span>
              </div>
              <ul className="space-y-3">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-800 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Sections / Content */}
          <div className="space-y-10 text-base sm:text-lg text-slate-700 leading-relaxed">
            {article.sections ? (
              article.sections.map((sec, i) => (
                <section key={i} className="space-y-4">
                  {sec.heading && (
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 pt-4 leading-snug">
                      {sec.heading}
                    </h2>
                  )}

                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {sec.quote && (
                    <blockquote className="my-6 p-6 rounded-2xl bg-slate-900 text-white border-l-4 border-amber-500 font-medium italic text-lg leading-relaxed shadow-lg">
                      "{sec.quote}"
                    </blockquote>
                  )}

                  {sec.bulletPoints && (
                    <div className="my-6 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider mb-3">Core Highlights:</h4>
                      <ul className="space-y-2">
                        {sec.bulletPoints.map((bp, bpIdx) => (
                          <li key={bpIdx} className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              ))
            ) : (
              <div className="whitespace-pre-line leading-relaxed">
                {article.content}
              </div>
            )}
          </div>

          {/* Article Tags & Social Share */}
          <div className="mt-14 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-6">
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mr-2">Tags:</span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full hover:bg-slate-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Share Action */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-slate-600" />
                    <span>Share Article</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Author Profile Card */}
          <div className="mt-12 p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center gap-6 shadow-xl">
            <img
              src={article.authorAvatar}
              alt={article.author}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-amber-500/40 shrink-0"
            />
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">Written By</span>
              <h3 className="text-xl font-bold text-white">{article.author}</h3>
              <p className="text-xs text-amber-200 font-medium">{article.authorRole}</p>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Passionate about empowering youth employment and setting world-class service benchmarks for corporate and high-profile events across East Africa.
              </p>
            </div>
          </div>

        </div>
      </article>

      {/* Related Articles Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Keep Reading</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">Related Insights & Stories</h3>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-3xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 bg-white border-slate-200"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3.5 py-1 bg-amber-400 text-slate-950 text-xs font-bold rounded-full shadow-md">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-500 stroke-[1.75]" />
                        {post.date}
                      </span>
                      <span>{post.readTime}</span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-950 group-hover:text-amber-500 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-500">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
