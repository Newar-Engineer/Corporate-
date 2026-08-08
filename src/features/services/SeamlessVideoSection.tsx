"use client";

import React from "react";
import ServiceVisual from "./ServiceVisual";
import AboutShowcase from "@/features/about/AboutShowcase";

interface SeamlessVideoSectionProps {
  badge?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  themeGradient?: string;
  reverseLayout?: boolean;
  videoSrc?: string;
  visual?: "services" | "about";
}

export default function SeamlessVideoSection({
  badge,
  title,
  subtitle,
  children,
  themeGradient = "from-emerald-400 to-teal-200",
  reverseLayout = false,
  videoSrc,
  visual = "services",
}: SeamlessVideoSectionProps) {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${reverseLayout ? "lg:flex-row-reverse" : ""}`}>
          
          {/* Text & Content Info Column */}
          <div className={`lg:col-span-5 ${reverseLayout ? "lg:order-2" : "lg:order-1"}`}>
            {badge && (
              <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-300 mb-4 backdrop-blur-md">
                ✨ {badge}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight mb-5">
              <span className={`bg-gradient-to-r ${themeGradient} bg-clip-text text-transparent`}>
                {title}
              </span>
            </h2>
            {subtitle && (
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                {subtitle}
              </p>
            )}
            {children}
          </div>

          {/* Media Frame Column — gradient art consistent with the brand palette */}
          <div className={`lg:col-span-7 ${reverseLayout ? "lg:order-1" : "lg:order-2"}`}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/80 aspect-video group">
              <div aria-hidden="true" className="absolute inset-0">
                {videoSrc && (
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  />
                )}
                {!videoSrc && (
                  <div className="absolute inset-0 hidden sm:block">
                    {visual === "about" ? <AboutShowcase /> : <ServiceVisual />}
                  </div>
                )}
                <div className={`absolute inset-0 bg-gradient-to-br ${themeGradient} opacity-25`} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,95,217,0.4),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,201,60,0.15),transparent_55%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30" />
              </div>
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
