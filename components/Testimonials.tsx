"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, CheckCircle2 } from "lucide-react";
import { usePageContent } from "@/lib/pageContent";

export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const homeData = usePageContent("home", {
    key: "home",
    title: "Home Page",
    path: "/",
    headline: "We connect events with vetted ushers & crew — instantly.",
    subheading: "The all-in-one platform for event organizers to find vetted, reliable, and professional ushers & crew in minutes.",
    metaTitle: "Event Ushers",
    metaDescription: "We connect events with vetted ushers & crew instantly.",
    customFields: {
      testimonialsSectionBadge: "ORGANIZER TESTIMONIALS",
      testimonialsSectionTitle: "Trusted by Event Leaders Across Kenya",
      testimonialsSectionDescription: "Discover how event planners, corporate brands, and private hosts across Kenya achieve event success with our vetted crew.",
    },
  });

  const sectionBadge = homeData.customFields?.testimonialsSectionBadge || "ORGANIZER TESTIMONIALS";
  const sectionTitle = homeData.customFields?.testimonialsSectionTitle || "Trusted by Event Leaders Across Kenya";
  const sectionDescription = homeData.customFields?.testimonialsSectionDescription || "Discover how event planners, corporate brands, and private hosts across Kenya achieve event success with our vetted crew.";

  // Fetch only active testimonials from backend API, ordered by displayOrder
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/testimonials");
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        const data = await res.json();

        if (Array.isArray(data)) {
          // Filter active strictly & sort by displayOrder
          const activeOnly = data
            .filter((item: any) => item.status === "Active")
            .sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0));
          setTestimonials(activeOnly);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (err) {
        console.error("Error loading testimonials, using fallback:", err);
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const fallbackTestimonials = [
    {
      _id: "1",
      quote:
        "Event Ushers saved our 1,200-delegate tech summit in Nairobi! Their hostesses were exceptionally punctual, polished, and handled check-ins with zero queue delays. Highly recommended!",
      customerName: "Wanjiru Mwangi",
      designation: "Head of Corporate Events",
      companyName: "Innovate Africa Tech Summit",
      rating: 5,
      profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      eventBadgeTitle: "1,200 Delegate Conference",
      isVerified: true,
      status: "Active",
      displayOrder: 1,
    },
    {
      _id: "2",
      quote:
        "We needed 15 vetted protocol security officers and 10 ushers for a high-profile festival in Mombasa on short notice. Event Ushers dispatched the full crew in less than 12 hours. Outstanding service!",
      customerName: "James Ochieng",
      designation: "Festival Director",
      companyName: "AfroSound Music Festival",
      rating: 5,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      eventBadgeTitle: "Outdoor Music Festival",
      isVerified: true,
      status: "Active",
      displayOrder: 2,
    },
    {
      _id: "3",
      quote:
        "The professionalism of the ushers at our daughter's wedding reception in Kisumu was unmatched. They welcomed guests with true warmth and ensured VIP tables were perfectly managed.",
      customerName: "David Kimani",
      designation: "Private Host",
      companyName: "Kimani Family Gala",
      rating: 5,
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      eventBadgeTitle: "VIP Wedding Reception",
      isVerified: true,
      status: "Active",
      displayOrder: 3,
    },
  ];

  const totalCount = testimonials.length;
  const isSliderMode = totalCount > 3;

  // Next / Prev navigation for slider
  const handleNext = useCallback(() => {
    if (totalCount === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalCount);
  }, [totalCount]);

  const handlePrev = useCallback(() => {
    if (totalCount === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalCount) % totalCount);
  }, [totalCount]);

  // If loading, show skeleton
  if (loading) {
    return (
      <section id="testimonials" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-8 w-48 bg-slate-200 rounded-full mx-auto animate-pulse mb-4" />
          <div className="h-10 w-96 bg-slate-200 rounded-2xl mx-auto animate-pulse mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white p-8 rounded-3xl h-72 animate-pulse border border-slate-200" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Configurable Empty State if no active testimonials
  if (totalCount === 0) {
    return null; // Or section hidden cleanly as per requirement
  }

  // Get items to display based on active index and view mode
  const getVisibleTestimonials = () => {
    if (!isSliderMode) {
      return testimonials;
    }
    // Infinite loop slice for Carousel (showing items wrapping around)
    const visible: any[] = [];
    for (let i = 0; i < totalCount; i++) {
      const idx = (currentIndex + i) % totalCount;
      visible.push({ ...testimonials[idx], slideIdx: idx });
    }
    return visible;
  };

  const visibleList = getVisibleTestimonials();

  return (
    <section id="testimonials" className="py-16 md:py-20 relative overflow-hidden bg-slate-50 border-b border-slate-200">
      {/* Ambient Brand Background Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-300/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-yellow-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider bg-amber-500/10 border-amber-500/30 text-amber-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            {sectionBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            {sectionTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {sectionDescription}
          </p>
        </div>

        {/* TESTIMONIAL DISPLAY CONTAINER */}
        {!isSliderMode ? (
          /* Static Grid Layout for <= 3 Testimonials */
          <div
            className={`grid gap-6 lg:gap-8 ${
              totalCount === 1
                ? "grid-cols-1 max-w-xl mx-auto"
                : totalCount === 2
                ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                : "grid-cols-1 md:grid-cols-3"
            }`}
          >
            {testimonials.map((item, idx) => (
              <TestimonialCard key={item._id || idx} item={item} isFeatured={idx === 0} />
            ))}
          </div>
        ) : (
          /* Responsive Slider / Carousel Layout for > 3 Testimonials */
          <div className="overflow-hidden py-4">
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{
                transform: `translateX(-${(currentIndex * (100 / Math.min(totalCount, 3)))}%)`,
              }}
            >
              {testimonials.map((item, idx) => (
                <div
                  key={item._id || idx}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0"
                >
                  <TestimonialCard item={item} isFeatured={idx === currentIndex} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Navigation Arrows & Dots (Visible when in Slider Mode or multiple items) */}
        {totalCount > 1 && (
          <div className="mt-12 flex items-center justify-between pt-6 border-t border-slate-200/80">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? "w-8 bg-amber-500" : "w-2.5 bg-slate-300 hover:bg-amber-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-950 flex items-center justify-center shadow-xs transition-all cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white flex items-center justify-center font-bold shadow-md shadow-pink-500/20 transition-all hover:scale-105 cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

/* Individual Testimonial Card Sub-Component (Preserves exact design) */
const TestimonialCard: React.FC<{ item: any; isFeatured?: boolean }> = ({ item, isFeatured }) => {
  return (
    <div
      className={`group rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between relative h-full ${
        isFeatured
          ? "bg-white border-amber-500/60 shadow-2xl shadow-amber-500/10 -translate-y-1 ring-2 ring-amber-500/20"
          : "bg-slate-50/90 border-slate-200/90 hover:bg-white hover:border-amber-400/50 hover:shadow-xl hover:-translate-y-1"
      }`}
    >
      {/* Top Quote Decor & Rating */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
            <Quote className="w-6 h-6 fill-slate-950" />
          </div>

          {(item.eventBadgeTitle || item.eventTag) && (
            <span className="px-3 py-1 bg-amber-400/20 text-amber-900 border border-amber-400/40 text-xs font-bold rounded-full truncate">
              {item.eventBadgeTitle || item.eventTag}
            </span>
          )}
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1">
          {[...Array(item.rating || 5)].map((_, i) => (
            <Star key={i} className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-xs sm:text-sm font-extrabold text-slate-800 ml-1">
            {item.rating ? `${item.rating}.0` : "5.0"}
          </span>
        </div>

        {/* Quote Message */}
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal italic">
          "{item.quote}"
        </p>
      </div>

      {/* Card Author Footer */}
      <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center gap-4">
        <div className="relative shrink-0">
          <img
            src={item.profileImage || item.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"}
            alt={item.customerName || item.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 ring-2 ring-amber-400/30 shadow-sm"
          />
          {item.isVerified !== false && (
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-2.5 h-2.5 text-slate-950" />
            </span>
          )}
        </div>

        <div className="overflow-hidden">
          <h4 className="text-base font-bold text-slate-950 truncate flex items-center gap-1.5">
            <span>{item.customerName || item.name}</span>
            {item.isVerified !== false && <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />}
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 truncate font-medium">
            {item.designation || item.title}
          </p>
          {item.companyName && (
            <p className="text-xs font-bold text-amber-600 truncate">
              {item.companyName}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
