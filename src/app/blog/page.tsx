import type { Metadata } from "next";
import type { Post } from "@/generated/prisma/index";
import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "Blog — Newa Enterprises",
  description: "Read insights, updates, and stories from Newa Enterprises. Stay informed about industry trends and company news.",
};

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <HeroSection
        title="Our Blog"
        subtitle="Insights, updates, and stories from the Newa Enterprises team."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Latest Articles"
            subtitle="Stay informed with our latest news and industry perspectives"
            centered
          />

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: Post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt || ""}
                  coverImage={post.coverImage}
                  author={post.author}
                  publishedAt={post.publishedAt || post.createdAt}
                  slug={post.slug}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">
              No articles published yet. Check back soon!
            </p>
          )}
        </div>
      </section>
    </>
  );
}
