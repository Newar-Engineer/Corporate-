"use client";

import React, { useRef, useEffect } from "react";

interface SeamlessVideoSectionProps {
  videoSrc: string;
  badge?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  themeGradient?: string;
  reverseLayout?: boolean;
}

export default function SeamlessVideoSection({
  videoSrc,
  badge,
  title,
  subtitle,
  children,
  themeGradient = "from-emerald-400 to-teal-200",
  reverseLayout = false,
}: SeamlessVideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [videoSrc]);

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

          {/* Seamless Video Frame Column - Cropping recorded navbars/frames */}
          <div className={`lg:col-span-7 ${reverseLayout ? "lg:order-1" : "lg:order-2"}`}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/80 aspect-video group">
              <video
                ref={videoRef}
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover scale-[1.12] origin-bottom object-[center_35%] transition-transform duration-700 group-hover:scale-[1.16]"
              />
              {/* Subtle edge overlay blending */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20 pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
