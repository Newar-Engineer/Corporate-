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

        {/* ========================================================================
            PLACEHOLDER ILLUSTRATIONS — Studio Ghibli style Nepal scenes
            Ready to be replaced with final AI-generated / custom artwork.
            ======================================================================== */}

        {/* ===================== SCENE 1: Patan Durbar Square at golden hour ===================== */}
        {/* Background — Himalayan silhouette, warm sunset sky */}
        <motion.div
          style={{ opacity: scene1Opacity, y: parallaxY(0, 0.35, bgSpeed), scale: parallaxScale(0, 0.35, bgSpeed) }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/5 via-orange-600/10 to-amber-400/5" />
          <div className="absolute bottom-[30%] left-1/2 h-[35%] w-[120%] -translate-x-1/2 rounded-t-full bg-gradient-to-t from-blue-900/10 via-blue-800/8 to-transparent"
            style={{ clipPath: "polygon(5% 100%, 12% 70%, 20% 85%, 30% 55%, 40% 75%, 50% 40%, 60% 65%, 70% 45%, 80% 70%, 88% 50%, 95% 80%, 100% 100%)" }}
          />
          <div className="absolute right-[10%] top-[12%] h-80 w-80 rounded-full bg-gradient-to-br from-amber-400/15 via-orange-500/10 to-transparent blur-[100px]" />
        </motion.div>

        {/* Midground — pagoda temple tiers, prayer flags */}
        <motion.div
          style={{ opacity: scene1Opacity, y: parallaxY(0, 0.35, midSpeed), scale: parallaxScale(0, 0.35, midSpeed) }}
          className="pointer-events-none absolute inset-0"
        >
          {/* Pagoda silhouette */}
          <div className="absolute bottom-[20%] left-[8%] flex flex-col items-center">
            <div className="h-16 w-0.5 bg-amber-700/15" />
            <div className="-mt-1 h-0.5 w-20 bg-amber-600/20 rounded-full" />
            <div className="-mt-0.5 h-0.5 w-16 bg-amber-600/15 rounded-full" />
            <div className="-mt-0.5 h-0.5 w-24 bg-amber-500/20 rounded-full" />
            <div className="h-3 w-0.5 bg-amber-700/15" />
            <div className="-mt-0.5 h-0.5 w-28 bg-amber-500/15 rounded-full" />
            <div className="h-2 w-0.5 bg-amber-700/12" />
            <div className="-mt-0.5 h-0.5 w-32 bg-amber-400/15 rounded-full" />
            <div className="h-6 w-0.5 bg-amber-700/10" />
            <div className="-mt-0.5 h-0.5 w-36 bg-amber-400/12 rounded-full" />
          </div>
          {/* Prayer flags line */}
          <div className="absolute right-[12%] top-[20%]">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="absolute h-1 w-0.5"
                style={{
                  left: i * 10,
                  top: Math.sin(i * 0.7) * 4,
                  background: ["#ef4444", "#22c55e", "#3b82f6", "#f59e0b", "#fff"][i],
                  opacity: 0.15,
                  height: 8 + Math.sin(i * 0.5) * 3,
                  transform: `rotate(${Math.sin(i * 0.4) * 6}deg)`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Foreground — birds, architectural detail dots */}
        <motion.div
          style={{ opacity: scene1Opacity, y: parallaxY(0, 0.35, fgSpeed), scale: parallaxScale(0, 0.35, fgSpeed) }}
          className="pointer-events-none absolute inset-0"
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${35 + i * 10 + (i % 2 === 0 ? 5 : 0)}%`,
                top: `${10 + i * 4}%`,
              }}
            >
              <svg width="16" height="10" viewBox="0 0 16 10" className="opacity-20" fill="none" stroke="#f59e0b" strokeWidth="0.8">
                <path d={`M${0} ${6} Q${4} ${0}, ${8} ${5} Q${12} ${0}, ${16} ${6}`} />
              </svg>
            </div>
          ))}
          <div className="absolute bottom-[18%] left-[30%] h-1 w-1 rounded-full bg-amber-500/20" />
          <div className="absolute bottom-[22%] left-[34%] h-1.5 w-1.5 rounded-full bg-amber-500/15" />
          <div className="absolute bottom-[19%] left-[38%] h-1 w-1 rounded-full bg-amber-500/20" />
        </motion.div>

        {/* ===================== SCENE 2: Newari courtyard workshop ===================== */}
        {/* Background — warm afternoon light through brick archway */}
        <motion.div
          style={{ opacity: scene2Opacity, y: parallaxY(0.28, 0.72, bgSpeed), scale: parallaxScale(0.28, 0.72, bgSpeed) }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-800/8 via-orange-700/10 to-yellow-600/5" />
          <div className="absolute right-[25%] top-[20%] h-96 w-96 rounded-full bg-gradient-to-br from-amber-500/12 via-orange-400/8 to-transparent blur-[120px]" />
          {/* Archway shape */}
          <div className="absolute bottom-0 left-[20%] h-[70%] w-[60%] rounded-t-full border border-orange-700/10 bg-gradient-to-b from-transparent via-orange-900/5 to-amber-950/10" />
        </motion.div>

        {/* Midground — carved window lattice, wood grain texture */}
        <motion.div
          style={{ opacity: scene2Opacity, y: parallaxY(0.28, 0.72, midSpeed), scale: parallaxScale(0.28, 0.72, midSpeed) }}
          className="pointer-events-none absolute inset-0"
        >
          {/* Window lattice */}
          <div className="absolute right-[15%] top-[25%] h-32 w-24 border border-amber-600/15 rounded-sm">
            <div className="absolute inset-x-[30%] top-0 bottom-0 border-x border-amber-600/10" />
            <div className="absolute inset-y-[30%] left-0 right-0 border-y border-amber-600/10" />
            <div className="absolute inset-x-[15%] inset-y-[15%] border border-amber-600/8 rounded-sm" />
          </div>
          {/* Wood shavings scatter */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="absolute h-0.5 rounded-full bg-amber-600/15"
              style={{
                left: `${20 + i * 10 + (i % 3) * 2}%`,
                top: `${50 + i * 3}%`,
                width: `${4 + (i % 3) * 2}px`,
                transform: `rotate(${i * 25}deg)`,
              }}
            />
          ))}
        </motion.div>

        {/* Foreground — marigold garlands, carving dust */}
        <motion.div
          style={{ opacity: scene2Opacity, y: parallaxY(0.28, 0.72, fgSpeed), scale: parallaxScale(0.28, 0.72, fgSpeed) }}
          className="pointer-events-none absolute inset-0"
        >
          {/* Marigold garland curve */}
          <svg className="absolute left-[8%] top-[35%] h-24 w-16 opacity-20" viewBox="0 0 40 80" fill="none">
            <path d="M5 0 Q20 20, 10 40 Q0 60, 15 80" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2 3" />
            <circle cx="8" cy="10" r="3" fill="#f59e0b" opacity="0.4" />
            <circle cx="15" cy="25" r="2.5" fill="#f97316" opacity="0.3" />
            <circle cx="8" cy="40" r="3" fill="#f59e0b" opacity="0.35" />
            <circle cx="4" cy="55" r="2.5" fill="#f97316" opacity="0.3" />
            <circle cx="12" cy="72" r="3" fill="#f59e0b" opacity="0.35" />
          </svg>
          <div className="absolute bottom-[28%] left-[12%] h-1 w-1 rounded-full bg-amber-500/20" />
          <div className="absolute bottom-[32%] left-[16%] h-0.5 w-0.5 rounded-full bg-amber-500/15" />
          <div className="absolute bottom-[26%] left-[20%] h-1 w-1 rounded-full bg-amber-500/18" />
        </motion.div>

        {/* ===================== SCENE 3: Himalayan valley at dusk ===================== */}
        {/* Background — twilight sky, mountain silhouette */}
        <motion.div
          style={{ opacity: scene3Opacity, y: parallaxY(0.6, 1, bgSpeed), scale: parallaxScale(0.6, 1, bgSpeed) }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-purple-900/15 to-slate-950/20" />
          {/* Mountain range */}
          <div className="absolute bottom-[35%] left-0 right-0 h-[40%]"
            style={{
              background: "linear-gradient(to top, transparent, rgba(30,40,80,0.15), rgba(60,70,120,0.1))",
              clipPath: "polygon(0% 100%, 8% 55%, 15% 75%, 22% 40%, 30% 60%, 38% 30%, 45% 50%, 52% 25%, 60% 45%, 68% 35%, 75% 55%, 82% 30%, 90% 50%, 95% 40%, 100% 60%, 100% 100%)",
            }}
          />
          {/* Snow caps */}
          <div className="absolute left-[22%] top-[38%] h-4 w-8 rounded-full bg-white/5 blur-sm" />
          <div className="absolute left-[38%] top-[28%] h-5 w-10 rounded-full bg-white/8 blur-sm" />
          <div className="absolute left-[52%] top-[23%] h-4 w-8 rounded-full bg-white/6 blur-sm" />
          <div className="absolute left-[68%] top-[33%] h-4 w-7 rounded-full bg-white/5 blur-sm" />
        </motion.div>

        {/* Midground — terraced hillside, glowing village lights */}
        <motion.div
          style={{ opacity: scene3Opacity, y: parallaxY(0.6, 1, midSpeed), scale: parallaxScale(0.6, 1, midSpeed) }}
          className="pointer-events-none absolute inset-0"
        >
          {/* Terraced strips */}
          <div className="absolute bottom-[15%] left-[10%] right-[10%] h-[25%] overflow-hidden">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="absolute h-4 w-full border-t border-emerald-800/10"
                style={{ top: i * 18, opacity: 0.5 - i * 0.08 }}
              />
            ))}
          </div>
          {/* Village glow dots */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="absolute h-2 w-2 rounded-full"
              style={{
                left: `${15 + i * 12}%`,
                bottom: `${22 + Math.sin(i * 1.2) * 4}%`,
                background: "#f59e0b",
                opacity: 0.12 + Math.sin(i * 0.8) * 0.04,
                boxShadow: `0 0 ${4 + i % 2 * 2}px rgba(245,158,11,${0.06 + i * 0.01})`,
              }}
            />
          ))}
        </motion.div>

        {/* Foreground — prayer flags fluttering */}
        <motion.div
          style={{ opacity: scene3Opacity, y: parallaxY(0.6, 1, fgSpeed), scale: parallaxScale(0.6, 1, fgSpeed) }}
          className="pointer-events-none absolute inset-0"
        >
          <svg className="absolute bottom-[5%] left-0 right-0 h-16 opacity-15" viewBox="0 0 200 30" preserveAspectRatio="none">
            <path d="M0 15 Q25 5, 50 15 T100 15 T150 15 T200 15" stroke="#f59e0b" strokeWidth="0.5" fill="none" />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x={10 + i * 40} y={8 + Math.sin(i * 1.1) * 3} width="4" height="14" rx="1"
                fill={["#ef4444", "#22c55e", "#3b82f6", "#f59e0b", "#ffffff"][i]}
                opacity={0.2 - i * 0.02}
                transform={`rotate(${Math.sin(i * 0.7) * 4}, ${10 + i * 40 + 2}, ${8 + Math.sin(i * 1.1) * 3 + 7})`}
              />
            ))}
          </svg>
          {/* Floating dust motes */}
          <div className="absolute right-[30%] top-[40%] h-1 w-1 rounded-full bg-cyan-300/15 blur-[1px]" />
          <div className="absolute right-[25%] top-[55%] h-0.5 w-0.5 rounded-full bg-purple-300/12 blur-[1px]" />
          <div className="absolute left-[40%] top-[45%] h-1 w-1 rounded-full bg-indigo-300/10 blur-[1px]" />
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
