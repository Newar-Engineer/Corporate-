import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, getTokenFromRequest, verifyToken } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    const payload = token ? verifyToken(token) : null;

    if (payload) {
      const posts = await prisma.post.findMany({ orderBy: { publishedAt: "desc" } });
      return NextResponse.json({ posts });
    }

    const posts = await prisma.post.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
    });

    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request);

    if ("error" in auth) {
      return auth.error;
    }

    const { title, content, excerpt, coverImage, author, status } = await request.json();

    if (!title || !content || !author) {
      return NextResponse.json({ error: "Title, content, and author are required" }, { status: 400 });
    }

    const slug = slugify(title);

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        coverImage,
        author,
        status: status || "draft",
        publishedAt: status === "published" ? new Date() : null,
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
