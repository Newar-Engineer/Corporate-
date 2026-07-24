import type { Metadata } from "next";
import type { Service } from "@/generated/prisma/index";
import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Our Services — Newa Enterprises",
  description: "Explore the comprehensive range of services offered by Newa Enterprises in Baneshwor, Kathmandu — from trading and supply to IT consulting and digital solutions.",
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <HeroSection
        title="Our Services"
        subtitle="End-to-end solutions tailored for your business needs — from procurement and supply to digital transformation."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What We Offer"
            subtitle="Delivering quality across every domain we serve"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: Service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                slug={service.slug}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
