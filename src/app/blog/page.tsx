import type { Metadata } from "next";
import type { Post } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import SectionHeading from "@/components/sections/SectionHeading";
import BlogCard from "@/features/blog/BlogCard";

export const metadata: Metadata = {
  title: "Blog — Web Design & App Development Insights | Newa Tech",
  description: "Read insights, guides, and updates from Newa Tech on website design, app development, e-commerce, and digital growth in Nepal.",
};

export default async function BlogPage() {
  let posts: Post[] = [];
  try {
    posts = await prisma.post.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div className="bg-black min-h-screen text-slate-100 selection:bg-primary selection:text-white">
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,95,217,0.18)_0%,transparent_65%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary-light mb-6 backdrop-blur-md">
            📰 Articles & Guides
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            <span className="bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Web & App Development Insights
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-slate-300 leading-relaxed">
            Guides, tips, and updates on building websites, e-commerce stores, and mobile apps for businesses in Nepal.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 border-t border-primary/10">
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
            <p className="text-center text-slate-400 py-12">
              No articles published yet. Check back soon!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
