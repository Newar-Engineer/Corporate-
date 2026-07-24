import type { Service, Testimonial } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import StatsCounter from "@/components/StatsCounter";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import Link from "next/link";

export default async function HomePage() {
  const [services, testimonials] = await Promise.all([
    prisma.service.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, take: 6 }),
    prisma.testimonial.findMany({ where: { approved: true }, orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <>
      <HeroSection
        title="Newa Enterprises — Your Trusted Business Partner"
        subtitle="Based in Baneshwor, Kathmandu, we deliver reliable trading, consultancy, supply chain, and digital solutions that drive growth and excellence across Nepal."
        ctaText="Explore Our Services"
        ctaLink="/services"
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Services"
            subtitle="Comprehensive solutions tailored for the Nepali market"
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

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title="Who We Are"
                subtitle="Learn about our journey and commitment to excellence"
              />
              <p className="text-gray-700 leading-relaxed mb-4">
                Newa Enterprises is a dynamic and trusted business house headquartered in Baneshwor, Kathmandu. Since our inception, we have been dedicated to providing high-quality products, reliable consultancy, and end-to-end supply chain solutions to clients across Nepal.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our team brings decades of combined experience across multiple industries, enabling us to deliver results that meet the highest standards of quality and professionalism.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors"
              >
                Learn More About Us →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <StatsCounter value={150} label="Projects Completed" suffix="+" />
              <StatsCounter value={200} label="Happy Clients" suffix="+" />
              <StatsCounter value={25} label="Team Members" suffix="+" />
              <StatsCounter value={10} label="Years Experience" suffix="+" />
            </div>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="What Our Clients Say"
              subtitle="Trusted by businesses across Nepal"
              centered
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t: Testimonial) => (
                <TestimonialCard
                  key={t.id}
                  clientName={t.clientName}
                  company={t.company || ""}
                  message={t.message}
                  rating={t.rating}
                  photoUrl={t.photoUrl}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Ready to Work With Us?"
        subtitle="Get in touch today and let us help your business reach new heights."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </>
  );
}
