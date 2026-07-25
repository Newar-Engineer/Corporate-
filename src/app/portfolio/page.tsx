import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PortfolioHubClient from "./PortfolioHubClient";
import SeamlessVideoHero from "@/components/SeamlessVideoHero";
import SeamlessVideoSection from "@/components/SeamlessVideoSection";

export const metadata: Metadata = {
  title: "Portfolio & Case Studies — Newa Enterprises",
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
    <div className="bg-black min-h-screen text-slate-100 selection:bg-amber-500 selection:text-black">
      {/* Seamless Video Hero - Golden Amber & Rose Theme */}
      <SeamlessVideoHero
        videoSrc="/videos/websss.mp4"
        badge="Proven Track Record"
        title="Featured Work & Case Studies"
        subtitle="Explore our showcase of completed web applications, supply initiatives, and strategic consultancy results delivered for Nepali businesses."
        themeGradient="from-amber-300 via-orange-400 to-rose-400"
        accentColor="amber"
        primaryCta={{ text: "View Case Studies", href: "#projects" }}
        secondaryCta={{ text: "Start a Project", href: "/contact" }}
      />

      {/* Interactive Video Showcase Section */}
      <SeamlessVideoSection
        videoSrc="/videos/websss.mp4"
        badge="Real World Results"
        title="High Performance & Interactive Web Platforms"
        subtitle="Every product we craft is engineered for high speed, intuitive UX, and measurable business growth."
        themeGradient="from-rose-300 via-amber-300 to-orange-400"
      />

      <div id="projects" className="py-12">
        <PortfolioHubClient items={items} />
      </div>
    </div>
  );
}
