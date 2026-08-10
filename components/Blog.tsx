import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";
import { usePageContent } from "@/lib/pageContent";
import { getArticlesFromApi } from "@/lib/api";
import { blogArticles as staticBlogArticles, BlogArticle } from "@/data/blogData";

export const Blog: React.FC = () => {
  const [articles, setArticles] = useState<BlogArticle[]>(staticBlogArticles);

  useEffect(() => {
    getArticlesFromApi().then((data) => {
      if (data && data.length > 0) {
        setArticles(data);
      }
    });
  }, []);

  const homeData = usePageContent("home", {
    key: "home",
    title: "Home Page",
    path: "/",
    headline: "We connect events with vetted ushers & crew — instantly.",
    subheading: "The all-in-one platform for event organizers to find vetted, reliable, and professional ushers & crew in minutes.",
    metaTitle: "afriCrew",
    metaDescription: "We connect events with vetted ushers & crew instantly.",
    customFields: {
      blogSectionBadge: "RECENT BLOG & NEWS",
      blogSectionTitle: "Checkout Our Latest Insights",
      blogSectionTitleHighlight: "Latest Insights",
      blogSectionDescription: "Stay updated with event staffing trends, industry tips, and success stories from our network.",
    },
  });

  const sectionBadge = homeData.customFields?.blogSectionBadge || "RECENT BLOG & NEWS";
  const sectionTitle = homeData.customFields?.blogSectionTitle || "Checkout Our Latest Insights";
  const sectionTitleHighlight = homeData.customFields?.blogSectionTitleHighlight || "Latest Insights";
  const sectionDescription = homeData.customFields?.blogSectionDescription || "Stay updated with event staffing trends, industry tips, and success stories from our network.";

  // Format heading with highlight
  const renderTitle = () => {
    if (sectionTitleHighlight && sectionTitle.includes(sectionTitleHighlight)) {
      const parts = sectionTitle.split(sectionTitleHighlight);
      return (
        <>
          {parts[0]}
          <span className="text-gradient-amber">{sectionTitleHighlight}</span>
          {parts[1]}
        </>
      );
    }
    return sectionTitle;
  };

  const posts = articles.slice(0, 3);

  return (
    <section id="blog" className="py-16 md:py-20 relative bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            {sectionBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            {renderTitle()}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            {sectionDescription}
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <article
              key={(post as any)._id || post.id || post.slug || idx}
              className="group rounded-3xl overflow-hidden border shadow-sm hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 bg-white border-slate-200"
            >
              <div>
                {/* Featured Image Frame */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 px-3.5 py-1 bg-amber-400 text-slate-950 text-xs font-bold rounded-full shadow-md">
                    {post.category}
                  </span>
                </div>

                {/* Article Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-500 stroke-[1.75]" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400 stroke-[1.75]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-500 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More Footer */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 group-hover:text-amber-600 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </article>
          ))}
        </div>

        {/* View More Articles Button */}
        <div className="mt-12 text-center">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-extrabold text-sm shadow-md shadow-pink-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <span>View More Articles</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </a>
        </div>

      </div>
    </section>
  );
};
