import type { Metadata } from "next";
import type { Post } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "Blog & Industry Insights — Newa Enterprises",
  description: "Read insights, updates, and stories from Newa Enterprises. Stay informed about industry trends and company news in Nepal.",
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
    <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-teal-500 selection:text-white">
      {/* Hero - Electric Lime & Teal Theme */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.18)_0%,transparent_65%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold text-teal-400 mb-6 backdrop-blur-md">
            📰 Articles & Perspectives
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            <span className="bg-gradient-to-r from-teal-300 via-emerald-400 to-lime-300 bg-clip-text text-transparent">
              Insights & Engineering Perspectives
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-slate-300 leading-relaxed">
            Stay informed with the latest updates on digital transformation, technology trends, and market insights across Nepal.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 border-t border-teal-500/10">
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
