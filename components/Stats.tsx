import React from "react";
import { Users, Award, Briefcase, MapPin, Smile } from "lucide-react";
import { usePageContent } from "@/lib/pageContent";

export const Stats: React.FC = () => {
  const homeData = usePageContent("home", {
    key: "home",
    title: "Home Page",
    path: "/",
    headline: "We connect events with vetted ushers & crew — instantly.",
    subheading: "The all-in-one platform for event organizers to find vetted ushers.",
    metaTitle: "Event Ushers",
    metaDescription: "We connect events with vetted ushers & crew instantly.",
    customFields: {
      organizerCount: "250+",
      usherCount: "1,500+",
      projectCount: "350+",
      cityCount: "18+",
      supportStaffCount: "500+",
    },
  });

  const stats = [
    {
      icon: Smile,
      value: homeData.customFields?.organizerCount || "250+",
      label: "Happy Event Organizers",
      subtext: "Corporate & private clients",
    },
    {
      icon: Users,
      value: homeData.customFields?.usherCount || "1,500+",
      label: "Active Vetted Ushers",
      subtext: "Ready for deployment",
    },
    {
      icon: Briefcase,
      value: homeData.customFields?.projectCount || "350+",
      label: "Projects Completed",
      subtext: "Galas, expos & festivals",
    },
    {
      icon: MapPin,
      value: homeData.customFields?.cityCount || "18+",
      label: "Cities Covered",
      subtext: "Across Kenya & East Africa",
    },
    {
      icon: Award,
      value: homeData.customFields?.supportStaffCount || "500+",
      label: "Trained Support Staff",
      subtext: "Security, AV & Hostesses",
    },
  ];

  return (
    <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl shadow-xl border p-6 sm:p-8 dark:bg-slate-900/95 dark:border-slate-800 dark:shadow-amber-500/5 bg-white border-slate-200/80 transition-colors duration-300">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 divide-y lg:divide-y-0 lg:divide-x dark:divide-slate-800 divide-slate-100">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`pt-4 lg:pt-0 ${idx !== 0 ? "lg:pl-6" : ""} group transition-transform duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5" style={{ stroke: "url(#brand-gradient)" }} />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black dark:text-white text-slate-900 tracking-tight">
                    {stat.value}
                  </span>
                </div>
                <h3 className="text-sm font-bold dark:text-slate-200 text-slate-800 leading-tight">
                  {stat.label}
                </h3>
                <p className="text-xs dark:text-slate-400 text-slate-500 mt-0.5">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
