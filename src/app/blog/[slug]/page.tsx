import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import CTASection from "@/components/CTASection";
import { FiArrowLeft, FiUser, FiClock } from "react-icons/fi";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let post = null;
  try {
    post = await prisma.post.findUnique({ where: { slug, status: "published" } });
  } catch (error) {
    console.error("Error fetching post metadata:", error);
  }

  if (!post) return { title: "Post Not Found — Newa Tech" };

  return {
    title: `${post.title} — Newa Tech Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  let post = null;
  try {
    post = await prisma.post.findUnique({
      where: { slug, status: "published" },
    });
  } catch (error) {
    console.error("Error fetching post:", error);
  }

  if (!post) notFound();

  return (
    <>
      <article>
        {post.coverImage && (
          <div className="relative h-56 sm:h-72 md:h-96 w-full bg-gray-100">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        )}

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-amber-600 hover:text-amber-700 font-medium mb-6"
          >
            <FiArrowLeft size={16} />
            Back to Blog
          </Link>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
            <span className="flex items-center gap-1.5">
              <FiUser size={15} />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <FiClock size={15} />
              {formatDate(post.publishedAt || post.createdAt)}
            </span>
          </div>

          <div className="overflow-x-auto">
            <div
              className="prose prose-gray max-w-none leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>

      <CTASection
        title="Have Questions?"
        subtitle="We'd love to discuss how we can help your business grow."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </>
  );
}
