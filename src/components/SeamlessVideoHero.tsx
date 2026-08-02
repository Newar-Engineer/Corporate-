"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";

interface SeamlessVideoHeroProps {
  videoSrc: string;
  badge?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  cropHeader?: boolean;
  themeGradient?: string;
  accentColor?: string;
  minHeight?: string;
}

const accentDot: Record<string, string> = {
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
  purple: "bg-purple-400",
  sky: "bg-sky-400",
  rose: "bg-rose-400",
  teal: "bg-teal-400",
  indigo: "bg-indigo-400",
  blue: "bg-blue-400",
  cyan: "bg-cyan-400",
  gold: "bg-[#FFC93C]",
};

export default function SeamlessVideoHero({
  videoSrc,
  badge,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  cropHeader = true,
  themeGradient = "from-emerald-500 via-teal-500 to-cyan-500",
  accentColor = "emerald",
  minHeight = "min-h-[400px] sm:min-h-[550px] lg:min-h-[650px]",
}: SeamlessVideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay handle
      });
    }
  }, [videoSrc]);

  return (
    <section className={`relative w-full overflow-hidden ${minHeight} flex items-center`}>
      {/* Background Video with seamless cropping */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className={`w-full h-full object-cover ${
            cropHeader ? "sm:scale-[1.14] sm:origin-bottom object-[center_50%] sm:object-[center_30%]" : "object-cover"
          }`}
        />
        {/* Gradients to blend smoothly into page styling */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      </div>

      {/* Hero Overlay Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">
          {badge && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-white mb-6">
              <span className={`h-2 w-2 rounded-full ${accentDot[accentColor] || "bg-emerald-400"} animate-pulse`} />
              {badge}
            </span>
          )}

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.15] tracking-tight mb-6">
            <span className={`bg-gradient-to-r ${themeGradient} bg-clip-text text-transparent`}>
              {title}
            </span>
          </h2>

          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed mb-8 max-w-2xl">
              {subtitle}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap gap-4">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className={`min-h-[48px] inline-flex items-center px-7 rounded-xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r ${themeGradient} shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-cyan-500/25`}
                >
                  {primaryCta.text}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="min-h-[48px] inline-flex items-center px-7 rounded-xl text-sm sm:text-base font-semibold text-slate-200 border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                >
                  {secondaryCta.text}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
