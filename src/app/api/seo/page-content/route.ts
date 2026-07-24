import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");

    if (!page) {
      return NextResponse.json({ error: "Page query parameter is required" }, { status: 400 });
    }

    const pageContent = await prisma.pageContent.findUnique({ where: { page } });

    if (!pageContent) {
      return NextResponse.json({ error: "Page content not found" }, { status: 404 });
    }

    return NextResponse.json({ pageContent });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = requireAuth(request);

    if ("error" in auth) {
      return auth.error;
    }

    const body = await request.json();

    if (!body.page) {
      return NextResponse.json({ error: "Page field is required" }, { status: 400 });
    }

    const data: Record<string, unknown> = {};

    if (body.title !== undefined) data.title = body.title;
    if (body.subtitle !== undefined) data.subtitle = body.subtitle;
    if (body.content !== undefined) data.content = body.content;
    if (body.metaTitle !== undefined) data.metaTitle = body.metaTitle;
    if (body.metaDescription !== undefined) data.metaDescription = body.metaDescription;

    const pageContent = await prisma.pageContent.upsert({
      where: { page: body.page },
      update: data,
      create: { page: body.page, title: body.title || "", ...data },
    });

    return NextResponse.json({ pageContent });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
