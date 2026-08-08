"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceCard from "@/features/services/ServiceCard";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: "web", title: "Web Development", slug: "web-development-engineering", desc: "Custom business websites & web apps with React, Next.js & Node.js — mobile-first and fast on Nepali internet", price: "NPR 14,999" },
  { icon: "mobile", title: "Mobile App Development", slug: "mobile-app-engineering", desc: "iOS & Android apps for your business with eSewa, Khalti & Fonepay payments built in", price: "NPR 24,999" },
  { icon: "ecommerce", title: "E-Commerce Websites", slug: "ecommerce-platforms", desc: "Online stores with eSewa/Khalti checkout, inventory, order management & COD", price: "NPR 24,999" },
  { icon: "design", title: "UI/UX Design", slug: "uiux-product-design", desc: "User research, wireframes & modern interfaces your customers will love using", price: "NPR 4,999" },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          const headingLines = headingRef.current?.querySelectorAll(".line");
          if (headingLines?.length) {
            tl.fromTo(
              headingLines,
              { y: 50, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }
            );
          }
          const cards = cardsRef.current?.querySelectorAll(".service-card");
          if (cards?.length) {
            tl.fromTo(
              cards,
              { y: 60, opacity: 0, scale: 0.95 },
              { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08 },
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
      data-scene-index={2}
      className="section-gradient relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_30%_50%,rgba(255,201,60,0.04),transparent)]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-medium text-gold mb-6">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              What We Build
            </p>

            <h2 ref={headingRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              <span className="block overflow-hidden"><span className="line inline-block text-white">Our Services</span></span>
              <span className="block overflow-hidden"><span className="line inline-block gradient-text-blue">Websites & Apps</span></span>
            </h2>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8 max-w-lg">
              From modern business websites to full-featured mobile apps — our 
              designers and developers build digital products tailored to the 
              Nepali market.
            </p>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((svc, i) => (
              <div key={i} className="service-card">
                <ServiceCard
                  title={svc.title}
                  description={svc.desc}
                  icon={svc.icon}
                  slug={svc.slug}
                  startingFrom={svc.price}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
