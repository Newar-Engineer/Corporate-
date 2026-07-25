import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { sendJobApplicationNotification } from "@/lib/mail";

export async function POST(request: NextRequest) {
  try {
    const { jobId, jobSlug, name, email, phone, resumeUrl, coverLetter } = await request.json();

    if ((!jobId && !jobSlug) || !name || !email) {
      return NextResponse.json({ error: "Job ID/slug, name, and email are required" }, { status: 400 });
    }

    const findById = jobId ? { id: jobId } : { slug: jobSlug };
    const job = await prisma.job.findUnique({ where: findById });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const application = await prisma.jobApplication.create({
      data: { jobId, name, email, phone, resumeUrl, coverLetter },
    });

    try {
      await sendJobApplicationNotification({ name, email, phone, jobTitle: job.title });
    } catch {
      // Notification failure should not block response
    }

    return NextResponse.json({ application, message: "Application submitted successfully" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request);

    if ("error" in auth) {
      return auth.error;
    }

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("jobId");

    const where = jobId ? { jobId } : {};

    const applications = await prisma.jobApplication.findMany({
      where,
      include: { job: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ applications });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
