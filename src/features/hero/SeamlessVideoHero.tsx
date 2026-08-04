"use client";

import React from "react";
import { ButtonLink } from "@/components/ui/Button";

interface SeamlessVideoHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
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
  badge,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  themeGradient = "from-emerald-500 via-teal-500 to-cyan-500",
  accentColor = "emerald",
  minHeight = "min-h-[400px] sm:min-h-[550px] lg:min-h-[650px]",
}: SeamlessVideoHeroProps) {
  return (
    <section className={`relative w-full overflow-hidden ${minHeight} flex items-center`}>
      {/* Background media — gradient art consistent with the brand palette */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,95,217,0.3)_0%,transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,201,60,0.14)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,195,247,0.18)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-black/70" />
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

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.15] tracking-tight mb-6">
            <span className={`bg-gradient-to-r ${themeGradient} bg-clip-text text-transparent`}>
              {title}
            </span>
          </h1>

          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed mb-8 max-w-2xl">
              {subtitle}
            </p>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-wrap gap-4">
              {primaryCta && (
                <ButtonLink
                  href={primaryCta.href}
                  size="lg"
                  className={`bg-gradient-to-r ${themeGradient}`}
                >
                  {primaryCta.text}
                </ButtonLink>
              )}
              {secondaryCta && (
                <ButtonLink
                  href={secondaryCta.href}
                  variant="secondary"
                  size="lg"
                  className="border-white/30 text-white hover:border-white/60"
                >
                  {secondaryCta.text}
                </ButtonLink>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
