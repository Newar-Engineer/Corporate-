import type { Metadata } from "next";
import type { Service } from "@prisma/client";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let service = null;
  try {
    service = await prisma.service.findUnique({ where: { slug } });
  } catch (error) {
    console.error("Error fetching service metadata:", error);
  }

  if (!service) return { title: "Service Not Found — Newa Enterprises" };

  return {
    title: `${service.title} — Newa Enterprises`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let service = null;
  let relatedServices: Service[] = [];

  try {
    service = await prisma.service.findUnique({ where: { slug } });
    if (service) {
      relatedServices = await prisma.service.findMany({
        where: { isActive: true, id: { not: service.id } },
        orderBy: { order: "asc" },
        take: 3,
      });
    }
  } catch (error) {
    console.error("Error fetching service detail:", error);
  }

  if (!service) notFound();

  return (
    <>
      <HeroSection
        title={service.title}
        subtitle={service.description}
        ctaText="Get in Touch"
        ctaLink="/contact"
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed">
              {service.description}
            </p>
            {service.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-full rounded-xl mt-8"
              />
            )}
          </div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="bg-gray-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Related Services"
              subtitle="Explore more of what we offer"
              centered
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((rs: Service) => (
                <ServiceCard
                  key={rs.id}
                  title={rs.title}
                  description={rs.description}
                  icon={rs.icon}
                  slug={rs.slug}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Need a Custom Solution?"
        subtitle="Contact us to discuss your requirements and get a tailored proposal."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </>
  );
}
