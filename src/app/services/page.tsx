import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import {
  FiMonitor, FiSmartphone, FiCloud, FiCode, FiShoppingBag,
  FiTruck, FiTrendingUp, FiTool, FiUsers, FiLayout,
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
  Backend: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  Database: "border-amber-500/30 text-amber-400 bg-amber-500/10",
  Cloud: "border-sky-500/30 text-sky-400 bg-sky-500/10",
  Design: "border-purple-500/30 text-purple-400 bg-purple-500/10",
  Payment: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
  Platform: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10",
  ERP: "border-orange-500/30 text-orange-400 bg-orange-500/10",
  Logistics: "border-teal-500/30 text-teal-400 bg-teal-500/10",
  Tracking: "border-rose-500/30 text-rose-400 bg-rose-500/10",
  Planning: "border-violet-500/30 text-violet-400 bg-violet-500/10",
  Compliance: "border-yellow-500/30 text-yellow-400 bg-yellow-500/10",
  Accounting: "border-green-500/30 text-green-400 bg-green-500/10",
  Management: "border-blue-500/30 text-blue-400 bg-blue-500/10",
  Collaboration: "border-fuchsia-500/30 text-fuchsia-400 bg-fuchsia-500/10",
  Navigation: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
  Optimization: "border-lime-500/30 text-lime-400 bg-lime-500/10",
  Inventory: "border-red-500/30 text-red-400 bg-red-500/10",
  Government: "border-stone-500/30 text-stone-400 bg-stone-500/10",
  Freight: "border-slate-500/30 text-slate-400 bg-slate-500/10",
  Blockchain: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10",
  Language: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
  Analytics: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
  Hosting: "border-blue-500/30 text-blue-400 bg-blue-500/10",
};

function getTypeColor(type: string): string {
  return typeColors[type] || "border-slate-500/30 text-slate-400 bg-slate-500/10";
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
    <>
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6">
            <FiLayout size={14} />
            End-to-End Solutions
          </div>
          <h1 className="gradient-text text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Our Services
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
            From construction materials to digital transformation — we deliver
            end-to-end business solutions tailored for Nepali enterprises.
          </p>
        </div>
      </section>

      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Comprehensive Business Solutions"
            subtitle="Six specialized divisions serving Kathmandu and beyond"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {categoryIconMap[service.icon] || <FiCode size={28} />}
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-white group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="mb-4 text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {truncate(service.description, 150)}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <div className="mb-4 space-y-1.5">
                      {service.features.slice(0, 3).map((f, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                          {f.title}
                        </div>
                      ))}
                      {service.features.length > 3 && (
                        <p className="text-xs text-primary/60">+{service.features.length - 3} more features</p>
                      )}
                    </div>
                  )}

                  {service.techStack && service.techStack.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {service.techStack.slice(0, 4).map((t, i) => (
                        <span
                          key={i}
                          className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-medium ${getTypeColor(t.type)}`}
                        >
                          {t.name}
                        </span>
                      ))}
                      {service.techStack.length > 4 && (
                        <span className="inline-block rounded-md border border-slate-600/30 px-2 py-0.5 text-[10px] text-slate-500">
                          +{service.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    {service.timeline && (
                      <span className="text-xs text-slate-500">
                        Timeline: <span className="text-slate-300 font-medium">{service.timeline}</span>
                      </span>
                    )}
                    <span className="text-sm font-medium text-primary opacity-0 translate-x-[-4px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      View Full Details &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
