import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const teamMember = await prisma.teamMember.findUnique({ where: { id } });

    if (!teamMember) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    return NextResponse.json({ teamMember });
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

    const existing = await prisma.teamMember.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    const body = await request.json();
    const data: Record<string, unknown> = {};

    if (body.name !== undefined) data.name = body.name;
    if (body.role !== undefined) data.role = body.role;
    if (body.photoUrl !== undefined) data.photoUrl = body.photoUrl;
    if (body.bio !== undefined) data.bio = body.bio;
    if (body.socialLinks !== undefined) data.socialLinks = body.socialLinks;
    if (body.order !== undefined) data.order = body.order;
    if (body.isActive !== undefined) data.isActive = body.isActive;

    const teamMember = await prisma.teamMember.update({ where: { id }, data });

    return NextResponse.json({ teamMember });
  } catch {
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

    const existing = await prisma.teamMember.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    await prisma.teamMember.delete({ where: { id } });

    return NextResponse.json({ message: "Team member deleted" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
