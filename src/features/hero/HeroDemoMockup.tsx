"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function HeroDemoMockup() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for the illustration
      gsap.fromTo(
        ".hero-visual-image",
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );

      // Floating metric cards staggered entrance
      gsap.fromTo(
        ".hero-metric-card",
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.15,
          delay: 0.8,
        }
      );

      // Continuous subtle float for metric cards
      gsap.to(".hero-metric-1", {
        y: -8,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".hero-metric-2", {
        y: -10,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });
      gsap.to(".hero-metric-3", {
        y: -6,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });

      // Glow pulse
      gsap.to(".hero-glow", {
        opacity: 0.6,
        scale: 1.05,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[480px] flex items-center justify-center" aria-hidden="true">
      {/* Ambient glow effects */}
      <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 via-primary-light/10 to-gold/10 rounded-full blur-[100px] opacity-40" />
      <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-primary/8 rounded-full blur-[80px]" />
      <div className="absolute -bottom-10 -left-10 w-[200px] h-[200px] bg-gold/8 rounded-full blur-[60px]" />

      {/* Main illustration */}
      <div className="hero-visual-image relative z-10 w-full max-w-[520px]">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/15">
          <Image
            src="/hero-illustration.jpg"
            alt="Professional web and app development showcase"
            width={520}
            height={520}
            priority
            className="w-full h-auto object-cover"
          />
          {/* Subtle gradient overlay to blend with the dark background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#050816]/30" />
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
        </div>
      </div>

      {/* Floating metric cards */}
      <div className="hero-metric-card hero-metric-1 absolute top-4 -left-4 xl:-left-8 z-20 flex items-center gap-3 rounded-xl border border-white/10 bg-[#0A0E1A]/90 backdrop-blur-xl px-4 py-3 shadow-xl shadow-black/30">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-light">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-none">150+</p>
          <p className="mt-0.5 text-xs text-slate-400 leading-none">Projects Delivered</p>
        </div>
      </div>

      <div className="hero-metric-card hero-metric-2 absolute bottom-16 -left-2 xl:-left-6 z-20 flex items-center gap-3 rounded-xl border border-gold/15 bg-[#0A0E1A]/90 backdrop-blur-xl px-4 py-3 shadow-xl shadow-black/30">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold-dark to-gold">
          <svg className="w-5 h-5 text-[#050816]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-none">200+</p>
          <p className="mt-0.5 text-xs text-slate-400 leading-none">Happy Clients</p>
        </div>
      </div>

      <div className="hero-metric-card hero-metric-3 absolute top-20 -right-4 xl:-right-8 z-20 flex items-center gap-3 rounded-xl border border-primary-light/20 bg-[#0A0E1A]/90 backdrop-blur-xl px-4 py-3 shadow-xl shadow-black/30">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-light">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-none">99.9%</p>
          <p className="mt-0.5 text-xs text-slate-400 leading-none">Uptime Guarantee</p>
        </div>
      </div>

      {/* Decorative dots grid */}
      <div className="absolute -bottom-6 right-8 z-0 grid grid-cols-5 gap-2 opacity-20">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary-light" />
        ))}
      </div>
    </div>
  );
}
