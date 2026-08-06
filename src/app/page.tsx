import type { Post } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import HomeClient from "@/features/home/HomeClient";

export const revalidate = 60;

export default async function HomePage() {
  let posts: Post[] = [];
  try {
    posts = await prisma.post.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });
  } catch (error) {
    console.error("Error fetching posts for homepage:", error);
  }

  return <HomeClient posts={posts} />;
}
