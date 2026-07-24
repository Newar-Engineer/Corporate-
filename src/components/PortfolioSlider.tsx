"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiExternalLink } from "react-icons/fi";

interface PortfolioItem {
  slug: string;
  title: string;
  category: string;
  imageUrl?: string | null;
  description: string;
}

interface PortfolioSliderProps {
  items: PortfolioItem[];
}

const placeholderImg = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80";

export default function PortfolioSlider({ items }: PortfolioSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    setTimeout(checkScroll, 400);
  }, [checkScroll]);

  if (!items.length) return null;

  return (
    <div className="relative">
      <div className="absolute right-0 top-0 flex gap-2 z-10">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 text-slate-300 hover:text-white hover:border-primary/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
          aria-label="Scroll left"
        >
          <FiArrowLeft size={18} />
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 text-slate-300 hover:text-white hover:border-primary/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
          aria-label="Scroll right"
        >
          <FiArrowRight size={18} />
        </button>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/portfolio/${item.slug}`}
            className="group relative flex-shrink-0 w-[85vw] sm:w-[380px] lg:w-[420px] snap-start rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 hover:border-primary/30 transition-all"
          >
            <div className="relative h-52 sm:h-60 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.imageUrl || placeholderImg})` }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary-light">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:gradient-text transition-all">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 line-clamp-2 mb-3">
                {item.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-light group-hover:text-accent-light transition-colors">
                View Project <FiExternalLink size={13} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}