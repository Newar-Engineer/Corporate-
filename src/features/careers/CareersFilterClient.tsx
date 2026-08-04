"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  FiMapPin, FiBriefcase, FiDollarSign,
  FiArrowRight, FiSend,
} from "react-icons/fi";

interface JobItem {
  id: string;
  title: string;
  slug: string;
  location: string;
  type: string;
  department: string;
  salary: string | null;
  description: string;
}

const departments = [
  "All Departments",
  "Engineering",
  "Design",
  "Marketing",
  "Management",
];

const typeColors: Record<string, string> = {
  "Full-Time": "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  "Part-Time": "border-amber-500/30 text-amber-400 bg-amber-500/10",
  Contract: "border-purple-500/30 text-purple-400 bg-purple-500/10",
  Internship: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
};

const deptIcons: Record<string, React.ReactNode> = {
  Engineering: <FiBriefcase size={16} />,
  Design: <FiBriefcase size={16} />,
  Marketing: <FiBriefcase size={16} />,
  Management: <FiBriefcase size={16} />,
};

export default function CareersFilterClient({ jobs }: { jobs: JobItem[] }) {
  const [activeDept, setActiveDept] = useState("All Departments");

  const filtered = useMemo(
    () =>
      activeDept === "All Departments"
        ? jobs
        : jobs.filter((j) => j.department === activeDept),
    [jobs, activeDept]
  );

  return (
    <section className="relative py-16 sm:py-20 lg:py-24" id="openings">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Filter Tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeDept === dept
                  ? "bg-primary text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                  : "border border-slate-600/30 bg-slate-800/40 text-slate-400 hover:border-primary/30 hover:text-primary"
              }`}
            >
              {dept === "All Departments" ? "All Roles" : dept}
              {activeDept === dept && (
                <span className="absolute -inset-0.5 rounded-full border border-primary/40 animate-pulse opacity-50" />
              )}
            </button>
          ))}
        </div>

        {/* Job Cards */}
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((job, i) => (
              <Link
                key={job.id}
                href={`/careers/apply/${job.slug}`}
                className="group relative block overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/40 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_0_25px_rgba(99,102,241,0.08)]"
                style={{
                  animation: `fadeInUp 0.35s ease-out ${i * 0.06}s both`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                  {/* Left: Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-block rounded-md border border-slate-600/30 bg-slate-800/60 px-2.5 py-0.5 text-[11px] font-medium text-slate-300">
                        {job.department}
                      </span>
                      <span
                        className={`inline-block rounded-md border px-2.5 py-0.5 text-[11px] font-medium ${
                          typeColors[job.type] ||
                          "border-slate-600/30 text-slate-400 bg-slate-800/60"
                        }`}
                      >
                        {job.type}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-primary transition-colors mb-1.5">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <FiMapPin size={13} />
                        {job.location}
                      </span>
                      {job.salary && (
                        <span className="inline-flex items-center gap-1 font-medium text-primary">
                          <FiDollarSign size={13} />
                          {job.salary}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Right: CTA */}
                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      View Details & Apply
                      <FiArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State — Open Application */
          <div className="glass rounded-2xl p-8 sm:p-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <FiSend className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No Open Roles in {activeDept}
            </h3>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              We&apos;re always looking for talented people. Send us your CV and
              we&apos;ll keep you in mind for future opportunities.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
            >
              Send Open Application
              <FiArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
