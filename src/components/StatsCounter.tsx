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
  const animatedRef = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || animatedRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          observer.disconnect();
          animateCount();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function animateCount() {
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
  }

  return (
    <div ref={ref} className="glass-light rounded-2xl p-4 sm:p-8 text-center">
      <div className="text-2xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-1">
        {count}{suffix}
      </div>
      <p className="text-sm sm:text-base text-slate-400 font-medium">{label}</p>
    </div>
  );
}