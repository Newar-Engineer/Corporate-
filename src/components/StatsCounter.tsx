"use client";

import { useRef, useState, useEffect } from "react";

interface StatsCounterProps {
  value: number;
  label: string;
  suffix?: string;
  icon?: string;
}

export default function StatsCounter({ value, label, suffix = "" }: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) setHasAnimated(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [hasAnimated, value]);

  return (
    <div ref={ref} className="glass-light rounded-2xl p-6 sm:p-8 text-center">
      <div className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-1">
        {count}{suffix}
      </div>
      <p className="text-sm sm:text-base text-slate-400 font-medium">{label}</p>
    </div>
  );
}