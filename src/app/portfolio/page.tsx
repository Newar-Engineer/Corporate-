import type { Metadata } from "next";
import type { PortfolioItem } from "@/generated/prisma/index";
import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import PortfolioCard from "@/components/PortfolioCard";

export const metadata: Metadata = {
  title: "Portfolio — Newa Enterprises",
  description: "Browse our portfolio of completed projects across trading, supply, consultancy, and digital services in Nepal.",
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PortfolioPage({ searchParams }: PageProps) {
  const { category } = await searchParams;

  const allItems = await prisma.portfolioItem.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  const categories = [...new Set(allItems.map((item: PortfolioItem) => item.category))];

  const items = category
    ? allItems.filter((item: PortfolioItem) => item.category === category)
    : allItems;

  return (
    <>
      <HeroSection
        title="Our Portfolio"
        subtitle="Showcasing our best work across industries — from supply chain to digital transformation."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Featured Projects"
            subtitle="A glimpse of what we have delivered for our clients"
            centered
          />

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <a
              href="/portfolio"
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !category
                  ? "bg-amber-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </a>
            {categories.map((cat: string) => (
              <a
                key={cat}
                href={`/portfolio?category=${encodeURIComponent(cat)}`}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === cat
                    ? "bg-amber-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </a>
            ))}
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item: PortfolioItem) => (
                <PortfolioCard
                  key={item.id}
                  title={item.title}
                  category={item.category}
                  imageUrl={item.imageUrl}
                  slug={item.slug}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">
              No projects found in this category.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
