import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CareersFilterClient from "@/components/CareersFilterClient";
import {
  FiUsers, FiDollarSign, FiShield, FiBookOpen, FiSmile,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "Careers — Newa Enterprises",
  description:
    "Join the Newa Enterprises team in Baneshwor, Kathmandu. Explore current job openings and grow your career with us.",
};

const perks = [
  {
    icon: <FiDollarSign size={22} />,
    title: "Competitive Compensation & Bonuses",
    desc: "Top-of-market salaries in Kathmandu with quarterly performance bonuses and annual profit sharing.",
  },
  {
    icon: <FiShield size={22} />,
    title: "Health Insurance & Paid Leave",
    desc: "Comprehensive health coverage for you and your family, plus 30 days paid leave annually.",
  },
  {
    icon: <FiBookOpen size={22} />,
    title: "Learning & Conference Budget",
    desc: "Sponsored certifications (AWS, Google), annual tech conference attendance, and Udemy for Business access.",
  },
  {
    icon: <FiSmile size={22} />,
    title: "Team Retreats & Gaming Sessions",
    desc: "Quarterly team retreats to Pokhara, Chitwan, and beyond. Weekly gaming nights and team lunches.",
  },
];

export default async function CareersPage() {
  let jobs: any[] = [];
  try {
    const raw = await prisma.job.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    jobs = raw.map((j) => ({
      id: j.id,
      title: j.title,
      slug: j.slug,
      location: j.location || "Baneshwor, Kathmandu",
      type: j.type,
      department: j.department || "General",
      salary: j.salary,
      description: j.description,
    }));
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }

  return (
    <div className="bg-black min-h-screen text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Hero - Vibrant Coral Theme */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(244,63,94,0.18),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold text-rose-400 mb-6 backdrop-blur-md">
            <FiUsers size={14} />
            Join Our Team in Kathmandu
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            <span className="bg-gradient-to-r from-rose-400 via-red-400 to-amber-400 bg-clip-text text-transparent">
              Build the Future of Digital Solutions With Us
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
            Join a passionate, innovative team in Baneshwor, Kathmandu pushing
            boundaries in web, mobile, and enterprise technology.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "Flexible Work Culture", icon: "🚀" },
              { label: "Top-Tier Tech Stack", icon: "⚡" },
              { label: "Learning Budget", icon: "🎓" },
            ].map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-950/40 px-4 py-1.5 text-sm text-rose-200"
              >
                <span className="text-base">{badge.icon}</span>
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Life at Newa Enterprises — Culture Grid */}
      <section className="relative py-16 sm:py-20 border-t border-rose-500/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Life at <span className="bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">Newa Enterprises</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              We believe great work happens when people are supported, challenged,
              and celebrated.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {perks.map((perk, i) => (
              <div
                key={i}
                className="rounded-2xl border border-rose-500/20 bg-slate-900/60 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-rose-500/50 hover:shadow-lg hover:shadow-rose-950/40"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  {perk.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {perk.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <CareersFilterClient jobs={jobs} />
    </div>
  );
}
