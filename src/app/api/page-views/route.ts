import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // Dynamic import to avoid top-level prisma client issues
    const { prisma } = await import("@/lib/prisma");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.pageView.findUnique({
      where: { slug_date: { slug, date: today } },
    });

    if (existing) {
      const pageView = await prisma.pageView.update({
        where: { id: existing.id },
        data: { count: { increment: 1 } },
      });
      return NextResponse.json({ pageView });
    }

    const pageView = await prisma.pageView.create({
      data: { slug, date: today, count: 1 },
    });

    return NextResponse.json({ pageView }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
