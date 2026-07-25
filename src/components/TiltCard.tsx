"use client";

import { useRef, useCallback, ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

interface TiltCardProps {
  href: string;
  icon: ReactNode;
  title: string;
  deliverables: string[];
  gradient?: string;
  index?: number;
}

export default function TiltCard({ href, icon, title, deliverables, gradient = "from-primary to-accent", index = 0 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link
        href={href}
        className="block group transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02]"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 transition-all duration-200 ease-out cursor-pointer overflow-hidden hover:border-primary/30 hover:shadow-[0_8px_40px_rgba(99,102,241,0.15)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99,102,241,0.08), transparent 40%)",
            }}
          />

          <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
            <div className={`inline-flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br ${gradient} text-white mb-5 shadow-lg transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3`}>
              {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all">
              {title}
            </h3>
            <ul className="space-y-1.5 mb-5">
              {deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {d}
                </li>
              ))}
            </ul>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-light group-hover:text-accent-light transition-colors">
              Learn more
              <FiArrowRight size={14} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </span>
          </div>

          <div
            className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(6,182,212,0.3))",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: "1px",
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
