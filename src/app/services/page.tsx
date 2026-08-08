import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { fallbackServices } from "@/lib/data/fallbackServices";
import SectionHeading from "@/components/sections/SectionHeading";
import SeamlessVideoHero from "@/features/hero/SeamlessVideoHero";
import SeamlessVideoSection from "@/features/services/SeamlessVideoSection";
import CtaSection from "@/components/sections/CtaSection";
import {
  FiMonitor, FiSmartphone, FiCode, FiShoppingBag,
} from "react-icons/fi";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Website Design & App Development Services — Newa Tech",
  description:
    "Newa Tech builds professional websites, e-commerce stores, and mobile apps for businesses in Nepal. Web development, app development, UI/UX design, and e-commerce development in Kathmandu.",
};

interface ServiceFeature {
  title: string;
  description: string;
}

interface TechStackItem {
  name: string;
  type: string;
}

interface ServiceWithJson {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: ServiceFeature[] | null;
  techStack: TechStackItem[] | null;
  timeline: string | null;
}

const categoryIconMap: Record<string, React.ReactNode> = {
  FiMonitor: <FiMonitor size={28} />,
  FiSmartphone: <FiSmartphone size={28} />,
  FiCode: <FiCode size={28} />,
  FiShoppingBag: <FiShoppingBag size={28} />,
};

const startingPrices: Record<string, string> = {
  "web-development-engineering": "NPR 14,999",
  "mobile-app-engineering": "NPR 24,999",
  "ecommerce-platforms": "NPR 24,999",
  "uiux-product-design": "NPR 4,999",
};

const typeColors: Record<string, string> = {
  Frontend: "border-sky-500/30 text-sky-400 bg-sky-500/10",
  Backend: "border-blue-500/30 text-blue-400 bg-blue-500/10",
  Database: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
  Design: "border-blue-400/30 text-blue-300 bg-blue-400/10",
  Payment: "border-gold/30 text-gold bg-gold/10",
  Platform: "border-primary/30 text-primary-light bg-primary/10",
};

function getTypeColor(type: string): string {
  return typeColors[type] || "border-blue-500/30 text-blue-400 bg-blue-500/10";
}

function truncate(str: string, len: number): string {
  if (str.length <= len) return str;
  return str.substring(0, len) + "...";
}

export default async function ServicesPage() {
  let services: ServiceWithJson[] = [];
  try {
    const raw = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    services = raw.map((s) => ({
      ...s,
      features: s.features as ServiceFeature[] | null,
      techStack: s.techStack as TechStackItem[] | null,
    }));
  } catch (error) {
    console.error("Error fetching services:", error);
  }

  if (services.length === 0) {
    services = fallbackServices.map((s) => ({
      id: s.id,
      title: s.title,
      slug: s.slug,
      description: s.description,
      icon: s.icon,
      features: s.features,
      techStack: s.techStack,
      timeline: s.timeline,
    }));
  }

  return (
    <div className="bg-black min-h-screen text-slate-100 selection:bg-primary selection:text-white">
      <SeamlessVideoHero
        badge="Website & App Development Agency"
        title="Websites & Apps Built for Your Business"
        subtitle="From business websites to e-commerce stores and mobile apps, we design and develop digital products that help your business grow."
        themeGradient="from-sky-400 via-blue-500 to-cyan-300"
        accentColor="sky"
        primaryCta={{ text: "Explore Services", href: "#services" }}
        secondaryCta={{ text: "Request Proposal", href: "/contact" }}
      />

      <SeamlessVideoSection
        badge="Modern Development Standards"
        title="Design & Engineering That Delivers"
        subtitle="Our team builds responsive, fast, and secure websites and apps using modern stacks like React, Next.js, and Node.js."
        themeGradient="from-cyan-300 via-sky-400 to-blue-500"
        reverseLayout
      >
        <ul className="space-y-3 mt-4 text-slate-300 text-sm sm:text-base">
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Custom Website Design & Development
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-gold" />
            Mobile App Development (iOS & Android)
          </li>
          <li className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-primary-light" />
            E-Commerce with eSewa, Khalti & Payment Gateways
          </li>
        </ul>
      </SeamlessVideoSection>

      <section id="services" className="relative py-20">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Our Services"
            subtitle="Everything you need to get online — designed and built for you"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-b from-slate-900/90 to-blue-950/20 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_0_35px_rgba(30,95,217,0.2)]"
              >
                <div className="relative z-10">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary-light border border-primary/20 group-hover:scale-110 transition-transform">
                    {categoryIconMap[service.icon] || <FiCode size={28} />}
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-white group-hover:text-primary-light transition-colors">
                    {service.title}
                  </h3>
                  {startingPrices[service.slug] && (
                    <p className="mb-2 text-sm font-semibold text-gold">
                      Starting from {startingPrices[service.slug]}
                    </p>
                  )}
                  <p className="mb-5 text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {truncate(service.description, 150)}
                  </p>

                  {service.features && service.features.length > 0 && (
                    <div className="mb-5 space-y-2">
                      {service.features.slice(0, 3).map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-light" />
                          {f.title}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Timeline: <span className="text-primary-light font-medium">{service.timeline || "Turnkey"}</span>
                    </span>
                    <span className="text-xs font-semibold text-gold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Details &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Ready to Build Your Website or App?"
        subtitle="Tell us about your project and get a free quote."
        buttonText="Get In Touch"
        buttonLink="/contact"
      />
    </div>
  );
}
