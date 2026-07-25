"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      const words = titleRef.current?.querySelectorAll(".word");
      if (words?.length) {
        tl.fromTo(
          words,
          { y: 80, opacity: 0, rotateX: -30 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.08 }
        );
      }
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        );
      }
      const ctaBtns = ctaRef.current?.querySelectorAll("a");
      if (ctaBtns?.length) {
        tl.fromTo(
          ctaBtns,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          "-=0.3"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const btns = containerRef.current?.querySelectorAll("a");
      if (!btns) return;
      btns.forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const dist = Math.sqrt(x * x + y * y);
        const maxDist = 150;
        if (dist < maxDist) {
          const strength = (1 - dist / maxDist) * 12;
          (btn as HTMLElement).style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        } else {
          (btn as HTMLElement).style.transform = "";
        }
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    const btns = containerRef.current?.querySelectorAll("a");
    btns?.forEach((btn) => {
      (btn as HTMLElement).style.transform = "";
    });
  }, []);

  const words = ["Building", "Nepal's", "Digital", "Future"];

  return (
    <section
      ref={containerRef}
      data-scene-section
      data-scene-index={0}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="hero-gradient absolute inset-0" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary-light mb-8">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Newa Enterprises — Baneshwor, Kathmandu
            </p>

            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
            >
              {words.map((word, i) => (
                <span key={i} className="block overflow-hidden mb-1">
                  <span className="word inline-block gradient-text">{word}</span>
                </span>
              ))}
            </h1>

            <p
              ref={subtitleRef}
              className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed mb-10"
            >
              Trusted trading, consultancy, logistics, and digital solutions — 
              serving businesses across Nepal with excellence since 2014.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Link
                href="/services"
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary to-accent overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,124,255,0.4)]"
              >
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative">Explore Services</span>
                <svg className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link
                href="/portfolio"
                className="gradient-border-btn inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-slate-200 hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(123,97,255,0.2)]"
              >
                View Our Work
              </Link>
            </div>
          </div>

          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
