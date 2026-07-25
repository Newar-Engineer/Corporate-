import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import SectionHeading from "@/components/SectionHeading";
import SeamlessVideoHero from "@/components/SeamlessVideoHero";
import SeamlessVideoSection from "@/components/SeamlessVideoSection";
import CTASection from "@/components/CTASection";
import {
  FiMonitor, FiSmartphone, FiCloud, FiCode, FiShoppingBag,
  FiTruck, FiTrendingUp, FiTool, FiUsers,
} from "react-icons/fi";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services — Newa Enterprises",
  description:
    "Explore the comprehensive range of services offered by Newa Enterprises in Baneshwor, Kathmandu — from trading and supply to IT consulting and digital solutions.",
};

interface ServiceFeature {
  title: string;
  description: string;
}

interface TechStackItem {
  name: string;
  type: string;
}

interface ServiceWithJson {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: ServiceFeature[] | null;
  techStack: TechStackItem[] | null;
  timeline: string | null;
}

const categoryIconMap: Record<string, React.ReactNode> = {
  FiMonitor: <FiMonitor size={28} />,
  FiSmartphone: <FiSmartphone size={28} />,
  FiCloud: <FiCloud size={28} />,
  FiCode: <FiCode size={28} />,
  FiShoppingBag: <FiShoppingBag size={28} />,
  FiTruck: <FiTruck size={28} />,
  FiTrendingUp: <FiTrendingUp size={28} />,
  FiTool: <FiTool size={28} />,
  FiUsers: <FiUsers size={28} />,
};

const typeColors: Record<string, string> = {
  Frontend: "border-pink-500/30 text-pink-400 bg-pink-500/10",
  Backend: "border-purple-500/30 text-purple-400 bg-purple-500/10",
  Database: "border-amber-500/30 text-amber-400 bg-amber-500/10",
  Cloud: "border-sky-500/30 text-sky-400 bg-sky-500/10",
  Design: "border-fuchsia-500/30 text-fuchsia-400 bg-fuchsia-500/10",
  Payment: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
  Platform: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10",
};

function getTypeColor(type: string): string {
  return typeColors[type] || "border-purple-500/30 text-purple-400 bg-purple-500/10";
}

function truncate(str: string, len: number): string {
  if (str.length <= len) return str;
  return str.substring(0, len) + "...";
}

export default async function ServicesPage() {
  let services: ServiceWithJson[] = [];
  try {
    const raw = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    services = raw.map((s) => ({
      ...s,
      features: s.features as ServiceFeature[] | null,
      techStack: s.techStack as TechStackItem[] | null,
    }));
  } catch (error) {
    console.error("Error fetching services:", error);
  }

  return (
    <div className="bg-black min-h-screen text-slate-100 selection:bg-purple-500 selection:text-white">
      {/* Seamless Video Hero - Cosmic Violet Theme */}
      <SeamlessVideoHero
        videoSrc="/videos/webdes.mp4"
        badge="End-to-End Enterprise Services"
        title="Comprehensive Solutions for Growing Enterprises"
        subtitle="From construction and trading to advanced digital product engineering, we deliver end-to-end execution across Nepal."
        themeGradient="from-violet-400 via-purple-300 to-fuchsia-400"
        accentColor="purple"
        primaryCta={{ text: "Explore Divisions", href: "#divisions" }}
        secondaryCta={{ text: "Request Proposal", href: "/contact" }}
      />

      {/* Interactive Video Showcase Section */}
      <SeamlessVideoSection
        videoSrc="/videos/webdes.mp4"
        badge="High-Tech Service Standards"
        title="Scalable Infrastructure & Digital Engineering"
        subtitle="Our engineering division builds resilient React, Next.js, and Cloud architectures optimized for maximum security, speed, and business growth."
        themeGradient="from-fuchsia-300 via-purple-400 to-violet-300"
        reverseLayout
      >
        <ul className="space-y-3 mt-4 text-slate-300 text-sm sm:text-base">
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-purple-400" />
            Custom Web & Mobile Software Development
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
            Cloud DevOps & 24/7 Managed Infrastructure
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-violet-400" />
            Supply Chain, Trading & Institutional Procurement
          </li>
        </ul>
      </SeamlessVideoSection>

      {/* Main Services Grid */}
      <section id="divisions" className="relative py-20">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Our Core Business Divisions"
            subtitle="Six specialized divisions serving Kathmandu and beyond"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-b from-slate-900/90 to-purple-950/20 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-500/50 hover:shadow-[0_0_35px_rgba(168,85,247,0.15)]"
              >
                <div className="relative z-10">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">
                    {categoryIconMap[service.icon] || <FiCode size={28} />}
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="mb-5 text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {truncate(service.description, 150)}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <div className="mb-5 space-y-2">
                      {service.features.slice(0, 3).map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
                          {f.title}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Timeline: <span className="text-purple-300 font-medium">{service.timeline || "Turnkey"}</span>
                    </span>
                    <span className="text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Details &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Transform Your Business?"
        subtitle="Consult with our experts in Baneshwor today."
        buttonText="Get In Touch"
        buttonLink="/contact"
      />
    </div>
  );
}
