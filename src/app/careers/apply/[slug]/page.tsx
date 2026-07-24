import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SectionHeading from "@/components/SectionHeading";
import ApplicationForm from "@/components/ApplicationForm";
import { FiArrowLeft, FiMapPin, FiBriefcase, FiDollarSign } from "react-icons/fi";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await prisma.job.findUnique({ where: { slug, isActive: true } });

  if (!job) return { title: "Position Not Found — Newa Enterprises Careers" };

  return {
    title: `Apply: ${job.title} — Newa Enterprises Careers`,
    description: `Apply for the ${job.title} position at Newa Enterprises in ${job.location || "Baneshwor, Kathmandu"}.`,
  };
}

export default async function JobApplyPage({ params }: PageProps) {
  const { slug } = await params;

  const job = await prisma.job.findUnique({ where: { slug, isActive: true } });

  if (!job) notFound();

  return (
    <>
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 text-sm text-amber-600 hover:text-amber-700 font-medium mb-6"
          >
            <FiArrowLeft size={16} />
            Back to Careers
          </Link>

          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 mb-8">
            <div className="mb-2">
              <span className="inline-block rounded-full bg-amber-50 text-amber-700 text-xs font-medium px-2.5 py-1">
                {job.department || "General"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {job.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              <span className="flex items-center gap-1.5">
                <FiMapPin size={15} className="text-gray-400" />
                {job.location || "Baneshwor, Kathmandu"}
              </span>
              <span className="flex items-center gap-1.5">
                <FiBriefcase size={15} className="text-gray-400" />
                {job.type}
              </span>
              {job.salary && (
                <span className="flex items-center gap-1.5">
                  <FiDollarSign size={15} className="text-gray-400" />
                  {job.salary}
                </span>
              )}
            </div>

            <div className="prose prose-sm sm:prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">{job.description}</p>

              {job.requirements && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Requirements</h3>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">{job.requirements}</div>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <SectionHeading title="Apply for this Position" />
            <ApplicationForm jobSlug={slug} jobTitle={job.title} />
          </div>
        </div>
      </section>
    </>
  );
}
