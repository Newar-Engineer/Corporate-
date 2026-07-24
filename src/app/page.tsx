import type { Service, Testimonial } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import HeroVideo from "@/components/HeroVideo";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import StatsCounter from "@/components/StatsCounter";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default async function HomePage() {
  let services: Service[] = [];
  let testimonials: Testimonial[] = [];
  try {
    [services, testimonials] = await Promise.all([
      prisma.service.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, take: 6 }),
      prisma.testimonial.findMany({ where: { approved: true }, orderBy: { createdAt: "desc" } }),
    ]);
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  return (
    <>
      <HeroVideo />

      <section className="section-gradient py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What We Do"
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
          {services.length > 0 && (
            <div className="mt-10 text-center">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 min-h-[48px] px-6 rounded-xl text-sm font-semibold text-white border border-slate-700 hover:border-primary/50 hover:text-primary-light hover:bg-white/5 transition-all"
              >
                View All Services <FiArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <SectionHeading
                title="Who We Are"
                subtitle="Our journey since 2014"
              />
              <p className="text-slate-300 leading-relaxed mb-4">
                Newa Enterprises is a dynamic and trusted business house headquartered in Baneshwor, Kathmandu. Since our inception, we have been dedicated to providing high-quality products, reliable consultancy, and end-to-end supply chain solutions to clients across Nepal.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                Our team brings decades of combined experience across multiple industries, enabling us to deliver results that meet the highest standards of quality and professionalism.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-primary-light font-medium hover:text-accent-light transition-colors"
              >
                Learn More About Us <FiArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <StatsCounter value={150} label="Projects Completed" suffix="+" />
              <StatsCounter value={200} label="Happy Clients" suffix="+" />
              <StatsCounter value={25} label="Team Members" suffix="+" />
              <StatsCounter value={10} label="Years Experience" suffix="+" />
            </div>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="section-gradient py-16 sm:py-20 lg:py-28">
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