import type { Metadata } from "next";
import type { TeamMember } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import SeamlessVideoHero from "@/components/SeamlessVideoHero";
import SeamlessVideoSection from "@/components/SeamlessVideoSection";
import SectionHeading from "@/components/SectionHeading";
import TeamCard from "@/components/TeamCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About Us — Newa Tech",
  description: "Learn about Newa Tech, a trusted business partner based in Baneshwor, Kathmandu. Discover our mission, vision, and the team driving our success.",
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
    <div className="bg-black min-h-screen text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Seamless Video Hero - Emerald Teal Theme */}
      <SeamlessVideoHero
        videoSrc="/videos/web desing.mp4"
        badge="About Newa Tech"
        title="Pioneering Excellence & Digital Innovation"
        subtitle="Headquartered in Baneshwor, Kathmandu — we empower businesses across Nepal with high-grade products, consultancy, and bespoke digital solutions."
        themeGradient="from-emerald-400 via-teal-300 to-cyan-400"
        accentColor="emerald"
        primaryCta={{ text: "Our Services", href: "/services" }}
        secondaryCta={{ text: "Contact Team", href: "/contact" }}
      />

      {/* Our Story Section with Ambient Glow */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Our Story"
            subtitle="Building Nepal's trusted business ecosystem since 2014"
            centered
          />
          <div className="space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed bg-slate-900/60 backdrop-blur-md p-8 rounded-3xl border border-emerald-500/20 shadow-xl shadow-emerald-950/40">
            <p>
              Newa Tech was founded in Baneshwor, Kathmandu, with a singular vision — to become a reliable and trusted business partner for organizations across Nepal. What began as a small trading operation has grown into a multi-faceted enterprise serving clients in diverse sectors including construction, hospitality, education, and government.
            </p>
            <p>
              Over the past decade, we have built a strong reputation for integrity, quality, and on-time delivery. Our portfolio spans trading and supply of construction materials, industrial equipment, office supplies, IT infrastructure, and consultancy services. Every engagement is driven by a deep understanding of local market dynamics and a commitment to exceeding client expectations.
            </p>
            <p>
              Today, Newa Tech employs a dedicated team of over 25 professionals and has successfully completed hundreds of projects across Nepal. We continue to expand our capabilities, embracing new technologies and partnerships to serve our clients better.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Video Showcase Section */}
      <SeamlessVideoSection
        videoSrc="/videos/web desing.mp4"
        badge="Design & Innovation Standard"
        title="Modern Architectural & Digital Craftsmanship"
        subtitle="Our solutions align with international quality standards while staying deeply grounded in local Nepali market requirements."
        themeGradient="from-teal-300 via-emerald-400 to-cyan-300"
      >
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/20">
            <span className="text-2xl font-bold text-emerald-400">10+ Years</span>
            <p className="text-xs text-slate-400 mt-1">Industry Experience in Nepal</p>
          </div>
          <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-500/20">
            <span className="text-2xl font-bold text-teal-400">200+</span>
            <p className="text-xs text-slate-400 mt-1">Trusted Corporate Clients</p>
          </div>
        </div>
      </SeamlessVideoSection>

      {/* Mission & Vision Section - Emerald Card Styling */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-slate-900/90 via-emerald-950/20 to-slate-900/90 p-8 shadow-2xl transition-all duration-300 hover:border-emerald-500/50">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 text-xl font-bold">
                🎯
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-slate-300 leading-relaxed">
                To empower businesses and communities in Nepal by providing reliable, high-quality products and expert consultancy services. We strive to build long-term partnerships rooted in trust, transparency, and mutual growth.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-teal-500/20 bg-gradient-to-br from-slate-900/90 via-teal-950/20 to-slate-900/90 p-8 shadow-2xl transition-all duration-300 hover:border-teal-500/50">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-400 text-xl font-bold">
                👁️
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-slate-300 leading-relaxed">
                To be the most trusted and respected business enterprise in Nepal, known for excellence in service, innovation in solutions, and unwavering commitment to our clients and community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {teamMembers.length > 0 && (
        <section className="py-20">
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
    </div>
  );
}
