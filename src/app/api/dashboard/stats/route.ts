import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request);

    if ("error" in auth) {
      return auth.error;
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalServices,
      totalTeam,
      totalMessages,
      totalTestimonials,
      totalPosts,
      totalApplications,
      totalPortfolioItems,
      totalJobs,
      messagesThisMonth,
      topPageViews,
    ] = await Promise.all([
      prisma.service.count(),
      prisma.teamMember.count(),
      prisma.contactMessage.count(),
      prisma.testimonial.count(),
      prisma.post.count(),
      prisma.jobApplication.count(),
      prisma.portfolioItem.count(),
      prisma.job.count(),
      prisma.contactMessage.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.pageView.groupBy({
        by: ["slug"],
        _sum: { count: true },
        orderBy: { _sum: { count: "desc" } },
        take: 10,
      }),
    ]);

    const topPages = topPageViews.map((pv) => ({
      slug: pv.slug,
      views: pv._sum.count || 0,
    }));

    return NextResponse.json({
      totalServices,
      totalTeam,
      totalMessages,
      totalTestimonials,
      totalPosts,
      totalApplications,
      totalPortfolioItems,
      totalJobs,
      messagesThisMonth,
      topPages,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
