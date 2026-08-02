import type { Metadata } from "next";
import type { TeamMember } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import SeamlessVideoHero from "@/components/SeamlessVideoHero";
import SeamlessVideoSection from "@/components/SeamlessVideoSection";
import SectionHeading from "@/components/SectionHeading";
import TeamCard from "@/components/TeamCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About Us — Newa Tech | Web Design & App Development Agency",
  description: "Newa Tech is a web design and app development agency in Baneshwor, Kathmandu. We build professional websites, e-commerce stores, and mobile apps for businesses in Nepal.",
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
    <div className="bg-black min-h-screen text-slate-100 selection:bg-primary selection:text-white">
      <SeamlessVideoHero
        badge="About Newa Tech"
        title="We Build Websites & Apps That Work"
        subtitle="Newa Tech is a web design and app development agency in Baneshwor, Kathmandu — helping businesses get a professional website or mobile app."
        themeGradient="from-sky-400 via-blue-500 to-cyan-300"
        accentColor="sky"
        primaryCta={{ text: "Our Services", href: "/services" }}
        secondaryCta={{ text: "Contact Team", href: "/contact" }}
      />

      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Our Story"
            subtitle="A design and development agency helping Nepali businesses go digital"
            centered
          />
          <div className="space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed bg-slate-900/60 backdrop-blur-md p-8 rounded-3xl border border-primary/20 shadow-xl shadow-primary/10">
            <p>
              Newa Tech was founded in Baneshwor, Kathmandu, with a singular vision — to help businesses in Nepal get a professional online presence. We are a web design and app development agency that designs, builds, and launches modern websites and mobile apps.
            </p>
            <p>
              Our team of designers, developers, and project managers has delivered websites and apps across e-commerce, education, healthcare, hospitality, and services. From UI/UX design and front-end development to back-end systems and payment gateway integration, we handle the entire journey.
            </p>
            <p>
              Today, Newa Tech employs a dedicated team of over 25 professionals and has successfully completed hundreds of digital projects across Nepal. We keep pace with modern technology so your website or app stays fast, secure, and beautiful.
            </p>
          </div>
        </div>
      </section>

      <SeamlessVideoSection
        badge="Design & Development Standard"
        title="Modern Design, Reliable Engineering"
        subtitle="Our websites and apps are built with modern stacks, clean UI, and performance — grounded in the real needs of the Nepali market."
        themeGradient="from-cyan-300 via-sky-400 to-blue-500"
      >
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-blue-950/40 border border-primary/20">
            <span className="text-2xl font-bold text-primary-light">150+</span>
            <p className="text-xs text-slate-400 mt-1">Websites & Apps Delivered</p>
          </div>
          <div className="p-4 rounded-2xl bg-blue-950/40 border border-gold/20">
            <span className="text-2xl font-bold text-gold">200+</span>
            <p className="text-xs text-slate-400 mt-1">Businesses Served</p>
          </div>
        </div>
      </SeamlessVideoSection>

      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-slate-900/90 via-blue-950/20 to-slate-900/90 p-8 shadow-2xl transition-all duration-300 hover:border-primary/50">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary-light text-xl font-bold">
                🎯
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-slate-300 leading-relaxed">
                To empower businesses in Nepal with professional websites and mobile apps that build trust, attract customers, and drive growth. We turn ideas into polished digital products.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-slate-900/90 via-amber-950/10 to-slate-900/90 p-8 shadow-2xl transition-all duration-300 hover:border-gold/50">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold text-xl font-bold">
                👁️
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-slate-300 leading-relaxed">
                To be Nepal&apos;s most trusted web design and app development agency — known for modern, high-quality digital products and genuine client care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {teamMembers.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Meet Our Team"
              subtitle="Designers and developers behind every launch"
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
        title="Have a Project in Mind?"
        subtitle="Tell us about your website or app idea — we'd love to build it."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </div>
  );
}
