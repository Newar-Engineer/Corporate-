import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PortfolioHubClient from "./PortfolioHubClient";
import CleanVideoSection from "@/components/CleanVideoSection";
import { FiGrid } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Portfolio — Newa Enterprises",
  description:
    "Browse our portfolio of completed projects across trading, supply, consultancy, and digital services in Nepal.",
};

export default async function PortfolioPage() {
  let items: any[] = [];
  try {
    const raw = await prisma.portfolioItem.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    items = raw.map((r) => ({
      id: r.id,
      title: r.title,
      slug: r.slug,
      description: r.description,
      category: r.category,
      client: r.client,
      metrics: r.metrics,
      techStack: r.techStack,
      testimonial: r.testimonial,
      testimonialAuthor: r.testimonialAuthor,
    }));
  } catch (error) {
    console.error("Error fetching portfolio items:", error);
  }

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6">
            <FiGrid size={14} />
            Our Work
          </div>
          <h1 className="gradient-text text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Portfolio & Case Studies
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-slate-300 leading-relaxed">
            Real projects, real results. Browse our work across industries and
            see how we deliver measurable impact for our clients.
          </p>
        </div>
      </section>

      <CleanVideoSection
        videoSrc="/videos/websss.mp4"
        badge="Project Highlights Reel"
        title="High-Performance Digital Products in Action"
        subtitle="Watch a compilation of our delivered web systems, responsive design performance, and interactive user experiences."
      />

      <PortfolioHubClient items={items} />
    </>
  );
}
