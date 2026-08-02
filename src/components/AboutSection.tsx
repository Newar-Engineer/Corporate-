"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          const headingLines = headingRef.current?.querySelectorAll(".line");
          if (headingLines?.length) {
            tl.fromTo(
              headingLines,
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }
            );
          }
          const contentTexts = contentRef.current?.querySelectorAll(".anim-text");
          if (contentTexts?.length) {
            tl.fromTo(
              contentTexts,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
              "-=0.4"
            );
          }
          const statItems = statsRef.current?.querySelectorAll(".stat-item");
          if (statItems?.length) {
            tl.fromTo(
              statItems,
              { y: 40, opacity: 0, scale: 0.9 },
              { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
              "-=0.3"
            );
          }
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-scene-section
      data-scene-index={1}
      className="section-gradient-alt relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_70%_50%,rgba(41,171,226,0.05),transparent)]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary-light mb-6">
              About Newa Tech
            </p>

            <h2 ref={headingRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-8">
              <span className="block overflow-hidden"><span className="line inline-block text-white">Your Agency</span></span>
              <span className="block overflow-hidden"><span className="line inline-block gradient-text-blue">For Web & Apps</span></span>
            </h2>

            <div ref={contentRef} className="space-y-4 mb-10">
              <p className="anim-text text-base sm:text-lg text-slate-300 leading-relaxed">
                Headquartered in <span className="text-primary-light font-medium">Baneshwor, Kathmandu</span>, Newa Tech is a web design and app development agency helping businesses in Nepal and beyond get a professional website or mobile app.
              </p>
              <p className="anim-text text-sm sm:text-base text-slate-400 leading-relaxed">
                Our team of designers and developers crafts modern websites, e-commerce stores, and mobile apps — from concept and UI/UX design to development and launch — with quality and performance at the heart of everything we build.
              </p>
            </div>

            <div
              ref={statsRef}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
            >
              {[
                { val: "150+", label: "Projects" },
                { val: "200+", label: "Clients" },
                { val: "25+", label: "Experts" },
                { val: "10+", label: "Years" },
              ].map((s, i) => (
                <div key={i} className="stat-item p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">{s.val}</div>
                  <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="anim-text group inline-flex items-center gap-2 text-sm font-semibold text-primary-light hover:text-primary transition-colors"
            >
              Learn more about us
              <FiArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>

          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
