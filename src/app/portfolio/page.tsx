import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PortfolioHubClient from "./PortfolioHubClient";
import SeamlessVideoHero from "@/features/hero/SeamlessVideoHero";
import SeamlessVideoSection from "@/features/services/SeamlessVideoSection";

import { fallbackPortfolio } from "@/lib/data/fallbackPortfolio";

export const metadata: Metadata = {
  title: "Portfolio — Websites & Apps by Newa Tech",
  description:
    "Browse our portfolio of websites, e-commerce stores, and mobile apps built for businesses across Nepal.",
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
      link: r.link,
      metrics: r.metrics,
      techStack: r.techStack,
      testimonial: r.testimonial,
      testimonialAuthor: r.testimonialAuthor,
    }));
  } catch (error) {
    console.error("Error fetching portfolio items:", error);
  }

  if (items.length === 0) {
    items = fallbackPortfolio;
  }

  return (
    <div className="bg-black min-h-screen text-slate-100 selection:bg-gold selection:text-black">
      <SeamlessVideoHero
        badge="Our Recent Work"
        title="Websites & Apps We've Built"
        subtitle="Explore our showcase of websites, e-commerce stores, and mobile apps delivered for businesses across Nepal."
        themeGradient="from-sky-300 via-blue-400 to-cyan-300"
        accentColor="sky"
        primaryCta={{ text: "View Projects", href: "#projects" }}
        secondaryCta={{ text: "Start a Project", href: "/contact" }}
      />

      <SeamlessVideoSection
        badge="Real World Results"
        title="High Performance & Beautiful Digital Products"
        subtitle="Every website and app we craft is engineered for speed, intuitive UX, and measurable business growth."
        themeGradient="from-cyan-300 via-sky-400 to-blue-500"
        videoSrc="/videos/video.portfolio.mp4"
      />

      <div id="projects" className="py-12">
        <PortfolioHubClient items={items} />
      </div>
    </div>
  );
}
