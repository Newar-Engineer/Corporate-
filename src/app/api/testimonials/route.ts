import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    const payload = token ? verifyToken(token) : null;

    if (payload) {
      const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
      return NextResponse.json({ testimonials });
    }

    const testimonials = await prisma.testimonial.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ testimonials });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { clientName, company, message, rating, photoUrl } = await request.json();

    if (!clientName || !message) {
      return NextResponse.json({ error: "Client name and message are required" }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName,
        company,
        message,
        rating: rating || 5,
        photoUrl,
        approved: false,
      },
    });

    return NextResponse.json({ testimonial }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
