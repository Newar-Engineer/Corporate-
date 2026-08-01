import type { Metadata } from "next";
import type { Job } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ApplicationFormInline from "@/components/ApplicationFormInline";
import {
  FiArrowLeft, FiMapPin, FiBriefcase,
  FiDollarSign, FiCheckCircle, FiLayers,
} from "react-icons/fi";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await prisma.job.findUnique({ where: { slug, isActive: true } });
  if (!job) return { title: "Position Not Found — Newa Tech Careers" };
  return {
    title: `Apply: ${job.title} — Newa Tech Careers`,
    description: `Apply for the ${job.title} position at Newa Tech in ${job.location || "Baneshwor, Kathmandu"}.`,
  };
}

const departmentIcons: Record<string, React.ReactNode> = {
  Engineering: <FiBriefcase size={16} />,
  Design: <FiLayers size={16} />,
  Marketing: <FiBriefcase size={16} />,
  Management: <FiBriefcase size={16} />,
};

export default async function JobApplyPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await prisma.job.findUnique({ where: { slug, isActive: true } });
  if (!job) notFound();

  const reqList = (job.requirements || "")
    .split("\n")
    .map((r) => r.replace(/^-\s*/, ""))
    .filter(Boolean);

  return (
    <>
      {/* Hero / Job Header */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-primary transition-colors mb-6"
          >
            <FiArrowLeft size={14} />
            Back to Careers
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-block rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {job.department || "General"}
            </span>
            <span className="inline-block rounded-md border border-slate-600/30 bg-slate-800/60 px-2.5 py-0.5 text-xs text-slate-400">
              {job.type}
            </span>
          </div>

          <h1 className="gradient-text text-2xl sm:text-4xl font-extrabold leading-tight mb-4">
            {job.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <FiMapPin size={14} />
              {job.location || "Baneshwor, Kathmandu"}
            </span>
            {job.salary && (
              <span className="inline-flex items-center gap-1.5 font-medium text-primary">
                <FiDollarSign size={14} />
                {job.salary}
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left — Job Details */}
          <div className="lg:col-span-3 space-y-8">
            {/* Role Summary */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <FiBriefcase className="text-primary" size={18} />
                Role Summary
              </h2>
              <div className="glass rounded-xl p-5">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {job.description}
                </p>
              </div>
            </section>

            {/* Responsibilities */}
            {reqList.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <FiCheckCircle className="text-primary" size={18} />
                  Key Qualifications
                </h2>
                <div className="glass rounded-xl p-5">
                  <ul className="space-y-2.5">
                    {reqList.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Tech Stack (inferred from title/department) */}
            <section>
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <FiLayers className="text-primary" size={18} />
                Technologies You&apos;ll Work With
              </h2>
              <div className="glass rounded-xl p-5">
                <div className="flex flex-wrap gap-2">
                  {inferTechStack(job.title, job.department).map((tech, i) => (
                    <span
                      key={i}
                      className="inline-block rounded-lg border border-slate-600/30 bg-slate-800/60 px-2.5 py-1 text-xs text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right — Application Form */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <div className="glass rounded-xl p-5">
                <h3 className="text-base font-bold text-white mb-1">
                  Apply for this Position
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Fill out the form below and we&apos;ll get back to you within 5 business days.
                </p>
                <ApplicationFormInline jobSlug={job.slug} jobTitle={job.title} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function inferTechStack(title: string, department: string | null): string[] {
  const t = title.toLowerCase();
  const d = (department || "").toLowerCase();

  if (t.includes("next.js") || t.includes("fullstack") || t.includes("full stack")) {
    return ["Next.js 16", "React 19", "TypeScript", "Node.js", "PostgreSQL", "Prisma 7", "Tailwind CSS v4", "Vercel", "GitHub Actions"];
  }
  if (t.includes("react native") || t.includes("mobile")) {
    return ["React Native", "Expo SDK", "TypeScript", "WatermelonDB", "Firebase", "OneSignal", "Fastlane"];
  }
  if (t.includes("devops") || t.includes("cloud")) {
    return ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Datadog", "Sentry", "PostgreSQL"];
  }
  if (t.includes("design") || t.includes("ui") || t.includes("ux")) {
    return ["Figma", "Storybook", "Framer Motion", "Lottie", "Zeroheight", "Hotjar"];
  }
  if (t.includes("marketing") || t.includes("digital")) {
    return ["Google Analytics", "SEMrush", "Google Ads", "Meta Ads", "Mailchimp", "HubSpot"];
  }
  if (t.includes("ml") || t.includes("machine learning") || t.includes("ai")) {
    return ["Python", "TensorFlow", "PyTorch", "Apache Kafka", "AWS SageMaker", "PostgreSQL"];
  }
  if (t.includes("project manager") || t.includes("program manager")) {
    return ["Jira", "Linear", "Notion", "Slack", "Figma", "GitHub"];
  }
  return ["TypeScript", "React", "Node.js", "PostgreSQL", "Git", "Docker"];
}
