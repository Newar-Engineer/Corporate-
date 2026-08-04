import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get("all") === "true";

    const portfolioItems = await prisma.portfolioItem.findMany({
      where: includeInactive ? {} : { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ portfolioItems });
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

    const body = await request.json();
    const {
      title,
      description,
      category,
      imageUrl,
      client,
      link,
      clientOverview,
      problem,
      solution,
      results,
      metrics,
      techStack,
      testimonial,
      testimonialAuthor,
      testimonialRole,
      completionDate,
      isActive = true,
    } = body;

    if (!title || !description || !category) {
      return NextResponse.json({ error: "Title, description, and category are required" }, { status: 400 });
    }

    const slug = slugify(title);

    const portfolioItem = await prisma.portfolioItem.create({
      data: {
        title,
        slug,
        description,
        category,
        imageUrl,
        client,
        link,
        clientOverview,
        problem,
        solution,
        results,
        metrics: metrics || undefined,
        techStack: techStack || undefined,
        testimonial,
        testimonialAuthor,
        testimonialRole,
        completionDate: completionDate ? new Date(completionDate) : null,
        isActive,
      },
    });

    return NextResponse.json({ portfolioItem }, { status: 201 });
  } catch (error) {
    console.error("Error creating portfolio item:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
