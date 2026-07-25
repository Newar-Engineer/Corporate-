import type { Metadata } from "next";
import type { PortfolioItem, Service } from "@prisma/client";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ServiceDetailClient from "./ServiceDetailClient";
import ServiceInquiryForm from "@/components/ServiceInquiryForm";
import SectionHeading from "@/components/SectionHeading";
import { FiClock, FiArrowRight, FiCheckCircle, FiMonitor, FiSmartphone, FiCloud, FiCode, FiShoppingBag, FiTruck, FiTrendingUp, FiTool, FiUsers } from "react-icons/fi";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface ServiceFeature {
  title: string;
  description: string;
}

interface TechStackItem {
  name: string;
  type: string;
}

interface ProcessStep {
  title: string;
  description: string;
  duration: string;
}

const iconMap: Record<string, React.ReactNode> = {
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

export async function generateStaticParams() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      select: { slug: true },
    });
    return services.map((s) => ({ slug: s.slug }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let service = null;
  try {
    service = await prisma.service.findUnique({ where: { slug } });
  } catch (error) {
    console.error("Error fetching service metadata:", error);
  }
  if (!service) return { title: "Service Not Found — Newa Enterprises" };
  return {
    title: `${service.title} — Newa Enterprises`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let service: (Service & { features: any; techStack: any; processSteps: any }) | null = null;
  let relatedServices: any[] = [];
  let portfolioItems: PortfolioItem[] = [];

  try {
    const raw = await prisma.service.findUnique({ where: { slug } });
    if (raw) {
      service = raw as any;
      relatedServices = await prisma.service.findMany({
        where: { isActive: true, id: { not: raw.id } },
        orderBy: { order: "asc" },
        take: 3,
      });
      portfolioItems = await prisma.portfolioItem.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
        take: 4,
      });
    }
  } catch (error) {
    console.error("Error fetching service detail:", error);
  }

  if (!service) notFound();

  const features: ServiceFeature[] = (service.features as ServiceFeature[]) || [];
  const techStack: TechStackItem[] = (service.techStack as TechStackItem[]) || [];
  const processSteps: ProcessStep[] = (service.processSteps as ProcessStep[]) || [];

  const techByType: Record<string, TechStackItem[]> = {};
  for (const t of techStack) {
    if (!techByType[t.type]) techByType[t.type] = [];
    techByType[t.type].push(t);
  }

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary transition-colors mb-6"
          >
            &larr; Back to Services
          </Link>
          <div className="max-w-3xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              {iconMap[service.icon] || <FiCode size={28} />}
            </div>
            <h1 className="gradient-text text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
              {service.title}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              {service.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {service.timeline && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600/30 bg-slate-800/50 px-3 py-1.5 text-sm text-slate-300">
                  <FiClock size={14} className="text-primary" />
                  Typical timeline: {service.timeline}
                </span>
              )}
              <ServiceDetailClient serviceTitle={service.title} />
            </div>
          </div>
        </div>
      </section>

      {features.length > 0 && (
        <section className="section-gradient py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Capability Breakdown"
              subtitle="What we deliver under this service"
              centered
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/40 p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.08)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-white">{f.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {processSteps.length > 0 && (
        <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Our Process"
              subtitle="How we deliver results, step by step"
              centered
            />
            <div className="relative mx-auto max-w-4xl">
              <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden sm:block" />
              <div className="space-y-8 sm:space-y-12">
                {processSteps.map((step, i) => (
                  <div key={i} className="relative flex flex-col sm:flex-row gap-4 sm:gap-8">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-slate-900 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                      <FiCheckCircle className="text-primary" size={18} />
                    </div>
                    <div className="flex-1 glass-light rounded-xl p-5 sm:p-6">
                      <div className="mb-1 flex items-center justify-between">
                        <h3 className="text-base font-semibold text-white">
                          {i + 1}. {step.title}
                        </h3>
                        <span className="text-xs text-primary font-medium">{step.duration}</span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {techStack.length > 0 && (
        <section className="section-gradient py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Technologies & Tools"
              subtitle="The stack behind our solutions"
              centered
            />
            <div className="mx-auto max-w-4xl space-y-8">
              {Object.entries(techByType).map(([type, items]) => (
                <div key={type}>
                  <h3 className="mb-3 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                    {type}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((t, i) => (
                      <span
                        key={i}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium ${getTypeColor(t.type)}`}
                      >
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {portfolioItems.length > 0 && (
        <section className="relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Related Projects"
              subtitle="Case studies and work samples"
              centered
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {portfolioItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/portfolio`}
                  className="group relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20"
                >
                  <div className="mb-3">
                    <span className="inline-block rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="mb-2 text-sm font-semibold text-white group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="mb-3 text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  {item.client && (
                    <p className="text-xs text-slate-500">
                      Client: <span className="text-slate-400">{item.client}</span>
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-gradient py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={`Request a Quote for ${service.title}`}
            subtitle="Tell us about your project and we'll get back to you within 24 hours"
            centered
          />
          <div className="glass rounded-2xl p-6 sm:p-8">
            <ServiceInquiryForm serviceTitle={service.title} />
          </div>
        </div>
      </section>
    </>
  );
}
