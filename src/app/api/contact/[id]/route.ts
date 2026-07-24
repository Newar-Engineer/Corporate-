import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(request);
  if ("error" in auth) return auth.error;

  const { id } = await props.params;

  try {
    const body = await request.json();
    const message = await prisma.contactMessage.update({
      where: { id },
      data: {
        isRead: body.isRead ?? undefined,
        status: body.status ?? undefined,
      },
    });
    return NextResponse.json(message);
  } catch {
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const auth = requireAuth(request);
  if ("error" in auth) return auth.error;

  const { id } = await props.params;

  try {
    await prisma.contactMessage.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}