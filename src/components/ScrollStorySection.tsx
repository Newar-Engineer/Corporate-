"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const scenes = [
  {
    label: "Our Vision",
    title: "Building Nepal's Digital Future",
    description:
      "From Baneshwor, Kathmandu, we engineer enterprise-grade web, mobile, and cloud solutions that power businesses across Nepal. Every project is a step toward a digitally sovereign Nepal.",
    href: "/about",
    cta: "Our Story",
    bgGradient: "from-blue-600/20 via-indigo-600/10 to-transparent",
    accentColor: "rgb(59,130,246)",
    midColor: "#3b82f6",
    fgColor: "#8b5cf6",
  },
  {
    label: "Our Process",
    title: "From Idea to Launch",
    description:
      "Discovery, architecture, agile sprints, deployment — we take your concept from whiteboard to production with full transparency, milestone tracking, and 24/7 support at every step.",
    href: "/services",
    cta: "How We Work",
    bgGradient: "from-violet-600/20 via-purple-600/10 to-transparent",
    accentColor: "rgb(139,92,246)",
    midColor: "#8b5cf6",
    fgColor: "#ec4899",
  },
  {
    label: "Our Impact",
    title: "Trusted Across Nepal",
    description:
      "150+ projects delivered, 200+ happy clients, 25+ expert team members. From fintech dashboards to e-commerce platforms, our work speaks for itself.",
    href: "/portfolio",
    cta: "View Case Studies",
    bgGradient: "from-cyan-600/20 via-indigo-600/10 to-transparent",
    accentColor: "rgb(6,182,212)",
    midColor: "#06b6d4",
    fgColor: "#6366f1",
  },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function ScrollStorySection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: isMobile ? ["start end", "end start"] : ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      progressRef.current = v;
    });
  }, [scrollYProgress]);

  /* --- Scene opacities & translateY --- */
  const scene1Opacity = useTransform(scrollYProgress, [0, 0.22, 0.35], [1, 1, 0]);
  const scene1Y = useTransform(scrollYProgress, [0, 0.35], [0, -24]);

  const scene2Opacity = useTransform(scrollYProgress, [0.28, 0.4, 0.6, 0.72], [0, 1, 1, 0]);
  const scene2Y = useTransform(scrollYProgress, [0.28, 0.72], [24, -24]);

  const scene3Opacity = useTransform(scrollYProgress, [0.6, 0.72, 1], [0, 1, 1]);
  const scene3Y = useTransform(scrollYProgress, [0.6, 1], [24, 0]);

  /* --- Progress dot indicator --- */
  const pinDot = useTransform(scrollYProgress, [0, 0.5, 1], [0, 50, 100]);

  /* --- Parallax layer transforms per scene --- */
  function parallaxY(
    sceneStart: number,
    sceneEnd: number,
    speed: number,
  ) {
    return useTransform(scrollYProgress, [sceneStart, sceneEnd], [0, -60 * speed]);
  }

  function parallaxScale(sceneStart: number, sceneEnd: number, speed: number) {
    return useTransform(scrollYProgress, [sceneStart, sceneEnd], [1, 1 + 0.08 * speed]);
  }

  /* --- Parallax speeds (higher = faster / further) --- */
  const bgSpeed = 0.3;
  const midSpeed = 0.6;
  const fgSpeed = 1.0;

  /* ============ MOBILE: normal scroll ============ */
  if (isMobile) {
    return (
      <section className="relative overflow-hidden bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
          {scenes.map((scene, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              {/* Placeholder illustration */}
              <div className="relative mb-8 h-48 w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
                <div className={`absolute inset-0 bg-gradient-to-br ${scene.bgGradient}`} />
                <div
                  className="absolute left-1/4 top-1/3 h-24 w-24 rounded-full blur-3xl"
                  style={{ background: scene.midColor, opacity: 0.25 }}
                />
                <div
                  className="absolute right-1/4 bottom-1/4 h-16 w-16 rounded-full blur-2xl"
                  style={{ background: scene.fgColor, opacity: 0.2 }}
                />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {scene.label}
              </span>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                {scene.title}
              </h2>
              <div className="mt-3 h-px w-12 bg-gradient-to-r from-primary to-accent" />
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {scene.description}
              </p>
              <Link
                href={scene.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-light transition-colors hover:text-accent-light"
              >
                {scene.cta}
                <FiArrowUpRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  /* ============ DESKTOP: pinned scroll ============ */
  return (
    <section ref={sectionRef} className="relative" style={{ height: "400vh" }}>
      <div
        ref={pinRef}
        className="sticky top-0 flex h-screen items-center overflow-hidden bg-slate-950"
      >
        {/* Persistent gradient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/5 blur-[120px]" />
        </div>

        {/* ===================== BACKGROUND LAYERS (parallax) ===================== */}
        {/* Scene 1 bg layer */}
        <motion.div
          style={{ opacity: scene1Opacity, y: parallaxY(0, 0.35, bgSpeed), scale: parallaxScale(0, 0.35, bgSpeed) }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute right-[10%] top-[15%] h-80 w-80 rounded-full bg-gradient-to-br from-blue-600/15 to-transparent blur-[100px]" />
          <div className="absolute bottom-[20%] left-[5%] h-48 w-48 rounded-full bg-indigo-600/10 blur-[80px]" />
        </motion.div>

        {/* Scene 2 bg layer */}
        <motion.div
          style={{ opacity: scene2Opacity, y: parallaxY(0.28, 0.72, bgSpeed), scale: parallaxScale(0.28, 0.72, bgSpeed) }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-[15%] top-[10%] h-72 w-72 rounded-full bg-gradient-to-br from-violet-600/15 to-transparent blur-[100px]" />
          <div className="absolute right-[20%] bottom-[25%] h-40 w-40 rounded-full bg-purple-600/10 blur-[70px]" />
        </motion.div>

        {/* Scene 3 bg layer */}
        <motion.div
          style={{ opacity: scene3Opacity, y: parallaxY(0.6, 1, bgSpeed), scale: parallaxScale(0.6, 1, bgSpeed) }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute right-[20%] top-[12%] h-80 w-80 rounded-full bg-gradient-to-br from-cyan-600/15 to-transparent blur-[100px]" />
          <div className="absolute bottom-[15%] left-[10%] h-44 w-44 rounded-full bg-indigo-600/10 blur-[70px]" />
        </motion.div>

        {/* ===================== MIDGROUND LAYERS ===================== */}
        <motion.div
          style={{ opacity: scene1Opacity, y: parallaxY(0, 0.35, midSpeed), scale: parallaxScale(0, 0.35, midSpeed) }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute right-[15%] top-[30%] h-0.5 w-32 rotate-45 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
          <div className="absolute left-[25%] top-[55%] h-0.5 w-48 -rotate-12 bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent" />
          <svg className="absolute right-[8%] top-[40%] h-32 w-32 opacity-10" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="#3b82f6" strokeWidth="0.3" />
          </svg>
        </motion.div>

        <motion.div
          style={{ opacity: scene2Opacity, y: parallaxY(0.28, 0.72, midSpeed), scale: parallaxScale(0.28, 0.72, midSpeed) }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-[10%] top-[35%] h-0.5 w-40 rotate-[30deg] bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />
          <div className="absolute right-[30%] top-[60%] h-0.5 w-36 -rotate-[20deg] bg-gradient-to-r from-transparent via-purple-400/20 to-transparent" />
          <svg className="absolute left-[5%] top-[15%] h-28 w-28 opacity-10" viewBox="0 0 100 100">
            <rect x="10" y="10" width="80" height="80" rx="8" fill="none" stroke="#8b5cf6" strokeWidth="0.5" />
            <rect x="25" y="25" width="50" height="50" rx="4" fill="none" stroke="#8b5cf6" strokeWidth="0.3" />
          </svg>
        </motion.div>

        <motion.div
          style={{ opacity: scene3Opacity, y: parallaxY(0.6, 1, midSpeed), scale: parallaxScale(0.6, 1, midSpeed) }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute right-[20%] top-[35%] h-0.5 w-44 -rotate-[15deg] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
          <div className="absolute left-[15%] top-[50%] h-0.5 w-36 rotate-[25deg] bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent" />
        </motion.div>

        {/* ===================== FOREGROUND LAYERS ===================== */}
        <motion.div
          style={{ opacity: scene1Opacity, y: parallaxY(0, 0.35, fgSpeed), scale: parallaxScale(0, 0.35, fgSpeed) }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute bottom-[15%] right-[10%] h-4 w-4 rounded-full bg-blue-400/30 blur-sm" />
          <div className="absolute top-[25%] left-[12%] h-2 w-2 rounded-full bg-indigo-400/25 blur-[2px]" />
        </motion.div>

        <motion.div
          style={{ opacity: scene2Opacity, y: parallaxY(0.28, 0.72, fgSpeed), scale: parallaxScale(0.28, 0.72, fgSpeed) }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute bottom-[20%] left-[8%] h-3 w-3 rounded-full bg-violet-400/30 blur-sm" />
          <div className="absolute top-[30%] right-[15%] h-5 w-5 rounded-full bg-purple-400/25 blur-[2px]" />
        </motion.div>

        <motion.div
          style={{ opacity: scene3Opacity, y: parallaxY(0.6, 1, fgSpeed), scale: parallaxScale(0.6, 1, fgSpeed) }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute bottom-[25%] right-[20%] h-4 w-4 rounded-full bg-cyan-400/30 blur-sm" />
          <div className="absolute top-[20%] left-[10%] h-2 w-2 rounded-full bg-indigo-400/25 blur-[2px]" />
        </motion.div>

        {/* ===================== CONTENT ===================== */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ---------- Scene 1 ---------- */}
          <motion.div
            style={{ opacity: scene1Opacity, y: scene1Y }}
            className="max-w-xl"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {scenes[0].label}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {scenes[0].title}
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary to-accent" />
            <p className="mt-5 text-sm leading-relaxed text-slate-400 sm:text-base">
              {scenes[0].description}
            </p>
            <Link
              href={scenes[0].href}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-light transition-colors hover:text-accent-light"
            >
              {scenes[0].cta}
              <FiArrowUpRight size={14} />
            </Link>
          </motion.div>

          {/* ---------- Scene 2 ---------- */}
          <motion.div
            style={{ opacity: scene2Opacity, y: scene2Y }}
            className="max-w-xl"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {scenes[1].label}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {scenes[1].title}
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary to-accent" />
            <p className="mt-5 text-sm leading-relaxed text-slate-400 sm:text-base">
              {scenes[1].description}
            </p>
            <Link
              href={scenes[1].href}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-light transition-colors hover:text-accent-light"
            >
              {scenes[1].cta}
              <FiArrowUpRight size={14} />
            </Link>
          </motion.div>

          {/* ---------- Scene 3 ---------- */}
          <motion.div
            style={{ opacity: scene3Opacity, y: scene3Y }}
            className="max-w-xl"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {scenes[2].label}
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {scenes[2].title}
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary to-accent" />
            <p className="mt-5 text-sm leading-relaxed text-slate-400 sm:text-base">
              {scenes[2].description}
            </p>
            <Link
              href={scenes[2].href}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-light transition-colors hover:text-accent-light"
            >
              {scenes[2].cta}
              <FiArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* ===================== PROGRESS INDICATOR ===================== */}
        <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium uppercase tracking-widest text-slate-600">
              Scroll
            </span>
            <div className="relative h-px w-24 bg-slate-800">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent"
                style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
              />
            </div>
            <span className="text-[10px] font-medium text-slate-500">03</span>
          </div>
        </div>
      </div>
    </section>
  );
}
