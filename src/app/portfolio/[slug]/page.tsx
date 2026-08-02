import type { Metadata } from "next";
import type { PortfolioItem } from "@prisma/client";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import GalleryViewer from "@/components/GalleryViewer";
import { ButtonLink } from "@/components/ui/Button";
import { FiArrowRight, FiCalendar, FiUser, FiBarChart2, FiZap, FiTarget, FiCheckCircle } from "react-icons/fi";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface Metric {
  label: string;
  value: string;
}

interface TechItem {
  name: string;
  type: string;
}

interface GalleryImage {
  url: string;
  caption: string;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let item = null;
  try {
    item = await prisma.portfolioItem.findUnique({ where: { slug } });
  } catch (error) {
    console.error("Error fetching portfolio metadata:", error);
  }
  if (!item) return { title: "Project Not Found — Newa Tech" };
  return {
    title: `${item.title} — Newa Tech Portfolio`,
    description: item.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  let item: PortfolioItem | null = null;

  try {
    item = await prisma.portfolioItem.findUnique({ where: { slug } });
  } catch (error) {
    console.error("Error fetching portfolio item:", error);
  }

  if (!item) notFound();

  const metrics = (item.metrics as unknown as Metric[]) || [];
  const techStack = (item.techStack as unknown as TechItem[]) || [];
  const gallery = (item.gallery as unknown as GalleryImage[]) || [];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary transition-colors mb-6"
          >
            &larr; Back to Portfolio
          </Link>
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="inline-block rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {item.category}
              </span>
              {item.client && (
                <span className="inline-flex items-center gap-1.5 text-sm text-slate-400">
                  <FiUser size={14} />
                  {item.client}
                </span>
              )}
              {item.completionDate && (
                <span className="inline-flex items-center gap-1.5 text-sm text-slate-400">
                  <FiCalendar size={14} />
                  {new Date(item.completionDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              )}
            </div>
            <h1 className="gradient-text text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
              {item.title}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12 pb-16">
            {/* Gallery */}
            {gallery.length > 0 && (
              <section>
                <h2 className="mb-6 text-xl font-bold text-white flex items-center gap-2">
                  <FiBarChart2 className="text-primary" size={20} />
                  Project Gallery
                </h2>
                <GalleryViewer images={gallery} />
              </section>
            )}

            {/* Client Overview */}
            {item.clientOverview && (
              <SectionBlock
                icon={<FiUser className="text-primary" size={20} />}
                title="Client Overview"
              >
                <p className="text-slate-300 leading-relaxed">{item.clientOverview}</p>
              </SectionBlock>
            )}

            {/* Problem Statement */}
            {item.problem && (
              <SectionBlock
                icon={<FiTarget className="text-primary" size={20} />}
                title="The Challenge"
              >
                <p className="text-slate-300 leading-relaxed">{item.problem}</p>
              </SectionBlock>
            )}

            {/* Solution */}
            {item.solution && (
              <SectionBlock
                icon={<FiZap className="text-primary" size={20} />}
                title="Our Solution"
              >
                <p className="text-slate-300 leading-relaxed">{item.solution}</p>
              </SectionBlock>
            )}

            {/* Results */}
            {item.results && (
              <SectionBlock
                icon={<FiCheckCircle className="text-primary" size={20} />}
                title="Results & Impact"
              >
                <p className="text-slate-300 leading-relaxed mb-6">{item.results}</p>
                {metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {metrics.map((m, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-4 text-center"
                      >
                        <div className="text-lg sm:text-xl font-bold gradient-text mb-1">
                          {m.value}
                        </div>
                        <div className="text-xs text-slate-400">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </SectionBlock>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 pb-16">
            {/* Tech Stack */}
            {techStack.length > 0 && (
              <div className="glass rounded-xl p-5">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((t, i) => (
                    <span
                      key={i}
                      className="inline-block rounded-lg border border-slate-600/30 bg-slate-800/60 px-2.5 py-1 text-xs text-slate-300"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial */}
            {item.testimonial && (
              <div className="glass rounded-xl p-5 relative">
                <svg
                  className="absolute top-3 left-3 text-primary/20"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                </svg>
                <blockquote className="relative z-10 text-sm text-slate-300 italic leading-relaxed mb-3">
                  &ldquo;{item.testimonial}&rdquo;
                </blockquote>
                {item.testimonialAuthor && (
                  <div className="border-t border-slate-700/30 pt-3 mt-3">
                    <p className="text-sm font-semibold text-white">
                      {item.testimonialAuthor}
                    </p>
                    {item.testimonialRole && (
                      <p className="text-xs text-slate-400">{item.testimonialRole}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="glass rounded-xl p-5 text-center">
              <h3 className="text-base font-bold text-white mb-2">
                Want a Similar Project?
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                Let&apos;s discuss how we can deliver results for your business.
              </p>
              <ButtonLink href="/contact">
                Request a Similar Project
                <FiArrowRight size={16} />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SectionBlock({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-white flex items-center gap-2">
        {icon}
        {title}
      </h2>
      <div className="glass rounded-xl p-6">{children}</div>
    </section>
  );
}
