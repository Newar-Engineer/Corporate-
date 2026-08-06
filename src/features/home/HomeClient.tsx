"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Post } from "@prisma/client";
import HeroSection from "@/features/hero/HeroSection";
import AboutSection from "@/features/about/AboutSection";
import ServicesSection from "@/features/services/ServicesSection";
import ProcessSection from "@/features/process/ProcessSection";
import TestimonialsSection from "@/features/testimonials/TestimonialsSection";
import TechStackSection from "@/features/tech-stack/TechStackSection";
import FaqSection from "@/features/faq/FaqSection";
import BlogSection from "@/features/blog/BlogSection";
import LeadBanner from "@/components/sections/LeadBanner";
import PaymentStrip from "@/components/sections/PaymentStrip";

gsap.registerPlugin(ScrollTrigger);

interface HomeClientProps {
  posts: Post[];
}

export default function HomeClient({ posts }: HomeClientProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.lagSmoothing(0);
    };
  }, []);

  return (
    <div className="relative z-10">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <TechStackSection />
      <TestimonialsSection />
      <FaqSection />
      <BlogSection posts={posts} />
      <LeadBanner />
      <PaymentStrip />
    </div>
  );
}
