"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FiStar, FiChevronLeft, FiChevronRight, FiCheckCircle } from "react-icons/fi";
import { getInitials } from "@/lib/utils";

interface Testimonial {
  clientName: string;
  company?: string | null;
  message: string;
  rating: number;
  photoUrl?: string | null;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
  }, []);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    intervalRef.current = setInterval(goNext, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, goNext, testimonials.length]);

  if (!testimonials.length) return null;

  const t = testimonials[current];

  return (
    <div
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="glass rounded-3xl p-8 sm:p-10 lg:p-12 text-center">
        <div className="flex items-center justify-center gap-1 mb-6">
          {Array.from({ length: 5 }, (_, i) => (
            <FiStar
              key={i}
              size={20}
              className={i < t.rating ? "fill-accent text-accent" : "text-slate-600"}
            />
          ))}
        </div>

        <blockquote className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-8 font-medium">
          &ldquo;{t.message}&rdquo;
        </blockquote>

        <div className="flex items-center justify-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary/30 shrink-0">
            {t.photoUrl ? (
              <img
                src={t.photoUrl}
                alt={t.clientName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-accent text-white text-sm font-bold">
                {getInitials(t.clientName)}
              </div>
            )}
          </div>
          <div className="text-left">
            <cite className="not-italic text-base font-semibold text-white block">
              {t.clientName}
            </cite>
            {t.company && (
              <span className="text-sm text-slate-400">{t.company}</span>
            )}
          </div>
          <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent-light">
            <FiCheckCircle size={12} />
            Verified
          </span>
        </div>
      </div>

      {testimonials.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-6 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-300 hover:text-white hover:border-primary/50 transition-all backdrop-blur-sm"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-6 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-300 hover:text-white hover:border-primary/50 transition-all backdrop-blur-sm"
            aria-label="Next testimonial"
          >
            <FiChevronRight size={20} />
          </button>

          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === current ? "w-8 bg-gradient-to-r from-primary to-accent" : "w-2 bg-slate-700 hover:bg-slate-500"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}