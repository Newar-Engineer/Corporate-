"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FiArrowRight, FiFolder } from "react-icons/fi";

interface Metric {
  label: string;
  value: string;
}

interface TechItem {
  name: string;
  type: string;
}

interface PortfolioItemData {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  client: string | null;
  metrics: Metric[] | null;
  techStack: TechItem[] | null;
  testimonial: string | null;
  testimonialAuthor: string | null;
}

export default function PortfolioHubClient({ items }: { items: PortfolioItemData[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = [...new Set(items.map((i) => i.category))];
    return ["All", ...cats];
  }, [items]);

  const filtered = useMemo(
    () => (activeCategory === "All" ? items : items.filter((i) => i.category === activeCategory)),
    [items, activeCategory]
  );

  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filter Tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                  : "border border-slate-600/30 bg-slate-800/40 text-slate-400 hover:border-primary/30 hover:text-primary"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute -inset-0.5 rounded-full border border-primary/40 animate-pulse opacity-50" />
              )}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 transition-all duration-500"
          style={{
            gridTemplateColumns: undefined,
          }}
        >
          {filtered.map((item, index) => (
            <Link
              key={item.id}
              href={`/portfolio/${item.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]"
              style={{
                animation: `fadeInUp 0.4s ease-out ${index * 0.08}s both`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                {/* Category Badge + Client */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-block rounded-md bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                    {item.category}
                  </span>
                  {item.client && (
                    <span className="text-[11px] text-slate-500">{item.client}</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-bold text-white group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="mb-4 text-sm text-slate-400 leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {/* Metrics */}
                {item.metrics && item.metrics.length > 0 && (
                  <div className="mb-4 grid grid-cols-2 gap-2">
                    {item.metrics.slice(0, 4).map((m, i) => (
                      <div key={i} className="rounded-lg bg-slate-800/60 border border-slate-700/30 p-2 text-center">
                        <div className="text-sm font-bold gradient-text">{m.value}</div>
                        <div className="text-[10px] text-slate-500 leading-tight">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack Pills */}
                {item.techStack && item.techStack.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {item.techStack.slice(0, 4).map((t, i) => (
                      <span
                        key={i}
                        className="inline-block rounded-md border border-slate-600/30 px-2 py-0.5 text-[10px] text-slate-400"
                      >
                        {t.name}
                      </span>
                    ))}
                    {item.techStack.length > 4 && (
                      <span className="inline-block rounded-md border border-slate-600/30 px-2 py-0.5 text-[10px] text-slate-500">
                        +{item.techStack.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* CTA */}
                <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 translate-x-[-4px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  View Case Study <FiArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <FiFolder className="mx-auto mb-4 text-slate-600" size={48} />
            <p className="text-slate-400">No projects found in this category.</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
