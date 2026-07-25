import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CareersFilterClient from "@/components/CareersFilterClient";
import {
  FiUsers, FiHeart, FiAward, FiCalendar,
  FiDollarSign, FiShield, FiBookOpen, FiSmile,
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
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6">
            <FiUsers size={14} />
            Join the Team
          </div>
          <h1 className="gradient-text text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Build the Future of Digital Solutions With Us
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
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-600/30 bg-slate-800/60 px-4 py-1.5 text-sm text-slate-300"
              >
                <span className="text-base">{badge.icon}</span>
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Life at Newa Enterprises — Culture Grid */}
      <section className="section-gradient py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Life at <span className="gradient-text">Newa Enterprises</span>
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
                className="glass-light rounded-xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.08)]"
                style={{
                  animation: `fadeInUp 0.4s ease-out ${i * 0.1}s both`,
                }}
              >
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {perk.icon}
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">
                  {perk.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <CareersFilterClient jobs={jobs} />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
