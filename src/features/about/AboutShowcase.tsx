import React from "react";
import Image from "next/image";

export default function AboutShowcase() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
      {/* Grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,95,217,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(30,95,217,0.09)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />

      {/* Soft orbs */}
      <div className="absolute top-[12%] left-[10%] h-44 w-44 rounded-full bg-primary/25 blur-3xl animate-float-y" />
      <div className="absolute bottom-[8%] right-[12%] h-44 w-44 rounded-full bg-gold/15 blur-3xl animate-float-y-slow" />
      <div className="absolute top-[45%] left-[55%] h-32 w-32 rounded-full bg-primary-sky/20 blur-2xl animate-bob-y" />

      {/* Rotating dashed orbit with logo core */}
      <div className="relative flex h-56 w-56 sm:h-64 sm:w-64 items-center justify-center animate-spin-slow rounded-full border border-dashed border-primary/40">
        <div className="absolute inset-7 flex items-center justify-center rounded-full border border-white/10 bg-[#0A0E1A]/85 shadow-2xl shadow-primary/10 backdrop-blur-xl">
          <Image
            src="/logo-removebg-preview.png"
            alt=""
            width={100}
            height={100}
            className="h-24 w-24 sm:h-28 sm:w-28 object-contain animate-bob-y"
          />
        </div>
        <span className="absolute -top-1.5 h-3.5 w-3.5 rounded-full bg-gold shadow-[0_0_14px_rgba(255,201,60,0.9)]" />
        <span className="absolute -right-1 top-1/2 h-2.5 w-2.5 rounded-full bg-primary-light shadow-[0_0_12px_rgba(41,171,226,0.9)]" />
        <span className="absolute -left-1.5 top-1/3 h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,178,255,0.9)]" />
        <span className="absolute -bottom-1 right-1/3 h-2 w-2 rounded-full bg-gold-dark shadow-[0_0_10px_rgba(232,121,67,0.9)]" />
      </div>

      {/* Floating value chips */}
      <div className="absolute top-[10%] right-[6%] animate-float-y rounded-xl border border-white/10 bg-[#0A0E1A]/90 px-4 py-2.5 shadow-xl shadow-black/40 backdrop-blur-xl">
        <p className="text-[10px] uppercase tracking-widest text-gold font-semibold">Mission</p>
        <p className="text-xs font-semibold text-slate-200">Growth for Nepali Business</p>
      </div>

      <div className="absolute bottom-[14%] left-[7%] animate-bob-y rounded-xl border border-white/10 bg-[#0A0E1A]/90 px-4 py-2.5 shadow-xl shadow-black/40 backdrop-blur-xl">
        <p className="text-[10px] uppercase tracking-widest text-primary-light font-semibold">Values</p>
        <p className="text-xs font-semibold text-slate-200">Quality, Trust & Care</p>
      </div>

      <div className="absolute bottom-[7%] right-[9%] animate-float-y-slow rounded-xl border border-white/10 bg-[#0A0E1A]/90 px-4 py-2.5 shadow-xl shadow-black/40 backdrop-blur-xl">
        <p className="text-xs font-semibold gradient-text">Design → Develop → Launch</p>
      </div>
    </div>
  );
}