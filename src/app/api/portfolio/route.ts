import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    const portfolioItems = await prisma.portfolioItem.findMany({
      where: { isActive: true },
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

    const { title, description, category, imageUrl, client, completionDate, testimonial } = await request.json();

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
        completionDate: completionDate ? new Date(completionDate) : null,
        testimonial,
      },
    });

    return NextResponse.json({ portfolioItem }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
