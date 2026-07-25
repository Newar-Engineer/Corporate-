import type { Metadata } from "next";
import type { TeamMember } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/HeroSection";
import CleanVideoSection from "@/components/CleanVideoSection";
import SectionHeading from "@/components/SectionHeading";
import TeamCard from "@/components/TeamCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About Us — Newa Enterprises",
  description: "Learn about Newa Enterprises, a trusted business partner based in Baneshwor, Kathmandu. Discover our mission, vision, and the team driving our success.",
};

export default async function AboutPage() {
  let teamMembers: TeamMember[] = [];
  try {
    teamMembers = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Error fetching team members:", error);
  }

  return (
    <>
      <HeroSection
        title="About Newa Enterprises"
        subtitle="Discover our story, purpose, and the people behind our success."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Our Story" />
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p>
              Newa Enterprises was founded in Baneshwor, Kathmandu, with a singular vision — to become a reliable and trusted business partner for organizations across Nepal. What began as a small trading operation has grown into a multi-faceted enterprise serving clients in diverse sectors including construction, hospitality, education, and government.
            </p>
            <p>
              Over the past decade, we have built a strong reputation for integrity, quality, and on-time delivery. Our portfolio spans trading and supply of construction materials, industrial equipment, office supplies, IT infrastructure, and consultancy services. Every engagement is driven by a deep understanding of local market dynamics and a commitment to exceeding client expectations.
            </p>
            <p>
              Today, Newa Enterprises employs a dedicated team of over 25 professionals and has successfully completed hundreds of projects across Nepal. We continue to expand our capabilities, embracing new technologies and partnerships to serve our clients better.
            </p>
          </div>
        </div>
      </section>

      <CleanVideoSection
        videoSrc="/videos/web desing.mp4"
        badge="Design Philosophy"
        title="Modern & Purposeful Design"
        subtitle="Watch how our design thinking translates complex business requirements into intuitive, aesthetically crafted digital experiences."
      />

      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To empower businesses and communities in Nepal by providing reliable, high-quality products and expert consultancy services. We strive to build long-term partnerships rooted in trust, transparency, and mutual growth.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be the most trusted and respected business enterprise in Nepal, known for excellence in service, innovation in solutions, and unwavering commitment to our clients and community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {teamMembers.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Meet Our Team"
              subtitle="Dedicated professionals driving excellence every day"
              centered
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teamMembers.map((member: TeamMember) => (
                <TeamCard
                  key={member.id}
                  name={member.name}
                  role={member.role}
                  photoUrl={member.photoUrl}
                  bio={member.bio}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Want to Know More?"
        subtitle="Reach out to us — we'd love to hear from you."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </>
  );
}
