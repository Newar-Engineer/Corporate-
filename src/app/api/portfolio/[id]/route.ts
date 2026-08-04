import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const portfolioItem = await prisma.portfolioItem.findUnique({ where: { id } });

    if (!portfolioItem) {
      return NextResponse.json({ error: "Portfolio item not found" }, { status: 404 });
    }

    return NextResponse.json({ portfolioItem });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = requireAuth(request);

    if ("error" in auth) {
      return auth.error;
    }

    const { id } = await params;

    const existing = await prisma.portfolioItem.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Portfolio item not found" }, { status: 404 });
    }

    const body = await request.json();
    const data: Record<string, unknown> = {};

    if (body.title !== undefined) {
      data.title = body.title;
      data.slug = slugify(body.title);
    }
    if (body.description !== undefined) data.description = body.description;
    if (body.category !== undefined) data.category = body.category;
    if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl;
    if (body.client !== undefined) data.client = body.client;
    if (body.link !== undefined) data.link = body.link;
    if (body.clientOverview !== undefined) data.clientOverview = body.clientOverview;
    if (body.problem !== undefined) data.problem = body.problem;
    if (body.solution !== undefined) data.solution = body.solution;
    if (body.results !== undefined) data.results = body.results;
    if (body.metrics !== undefined) data.metrics = body.metrics;
    if (body.techStack !== undefined) data.techStack = body.techStack;
    if (body.testimonial !== undefined) data.testimonial = body.testimonial;
    if (body.testimonialAuthor !== undefined) data.testimonialAuthor = body.testimonialAuthor;
    if (body.testimonialRole !== undefined) data.testimonialRole = body.testimonialRole;
    if (body.completionDate !== undefined)
      data.completionDate = body.completionDate ? new Date(body.completionDate) : null;
    if (body.isActive !== undefined) data.isActive = body.isActive;

    const portfolioItem = await prisma.portfolioItem.update({ where: { id }, data });

    return NextResponse.json({ portfolioItem });
  } catch (error) {
    console.error("Error updating portfolio item:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = requireAuth(request);

    if ("error" in auth) {
      return auth.error;
    }

    const { id } = await params;

    const existing = await prisma.portfolioItem.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Portfolio item not found" }, { status: 404 });
    }

    await prisma.portfolioItem.delete({ where: { id } });

    return NextResponse.json({ message: "Portfolio item deleted" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
