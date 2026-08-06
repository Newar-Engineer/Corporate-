"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight } from "react-icons/fi";
import type { Post } from "@prisma/client";
import BlogCard from "@/features/blog/BlogCard";

gsap.registerPlugin(ScrollTrigger);

interface BlogSectionProps {
  posts: Post[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
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
          const cards = cardsRef.current?.querySelectorAll(".blog-card");
          if (cards?.length) {
            tl.fromTo(
              cards,
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
              "-=0.3"
            );
          }
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      data-scene-section
      data-scene-index={7}
      className="section-gradient relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_70%_50%,rgba(41,171,226,0.05),transparent)]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-medium text-gold mb-6">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              Articles & Guides
            </p>

            <h2 ref={headingRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              <span className="block overflow-hidden"><span className="line inline-block text-white">Latest Articles</span></span>
              <span className="block overflow-hidden"><span className="line inline-block gradient-text-blue">From Our Team</span></span>
            </h2>
          </div>

          <Link
            href="/blog"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary-light hover:bg-primary/20 transition-colors"
          >
            View all articles
            <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="blog-card">
              <BlogCard
                title={post.title}
                excerpt={post.excerpt || ""}
                coverImage={post.coverImage}
                author={post.author}
                publishedAt={post.publishedAt || post.createdAt}
                slug={post.slug}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
