import type { Metadata } from "next";
import type { Job } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import JobCard from "@/components/JobCard";

export const metadata: Metadata = {
  title: "Careers — Newa Enterprises",
  description: "Join the Newa Enterprises team in Baneshwor, Kathmandu. Explore current job openings and grow your career with us.",
};

export default async function CareersPage() {
  const jobs = await prisma.job.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <HeroSection
        title="Join Our Team"
        subtitle="Be part of a growing, dynamic team in Baneshwor, Kathmandu. Explore opportunities to make an impact."
        ctaText={jobs.length > 0 ? "View Open Positions" : undefined}
        ctaLink="#openings"
      />

      <section id="openings" className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Current Openings"
            subtitle={jobs.length > 0 ? "Find your next role at Newa Enterprises" : "No open positions at the moment. Check back soon!"}
            centered
          />

          {jobs.length > 0 && (
            <div className="space-y-4">
              {jobs.map((job: Job) => (
                <JobCard
                  key={job.id}
                  title={job.title}
                  location={job.location || "Baneshwor, Kathmandu"}
                  type={job.type}
                  department={job.department || "General"}
                  salary={job.salary}
                  slug={job.slug}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
