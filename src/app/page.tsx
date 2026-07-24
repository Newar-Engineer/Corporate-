import { prisma } from "@/lib/prisma";
import HeroVideo from "@/components/HeroVideo";
import SectionHeading from "@/components/SectionHeading";
import StatsCounter from "@/components/StatsCounter";
import TiltCard from "@/components/TiltCard";
import PortfolioSlider from "@/components/PortfolioSlider";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import LeadBanner from "@/components/LeadBanner";
import { FiMonitor, FiSmartphone, FiCloud, FiCode } from "react-icons/fi";

const serviceIcons: Record<string, React.ReactNode> = {
  "FiMonitor": <FiMonitor size={24} />,
  "FiSmartphone": <FiSmartphone size={24} />,
  "FiCloud": <FiCloud size={24} />,
  "FiCode": <FiCode size={24} />,
  "FiShoppingBag": <FiMonitor size={24} />,
  "FiTruck": <FiMonitor size={24} />,
  "FiTrendingUp": <FiMonitor size={24} />,
  "FiTool": <FiCode size={24} />,
  "FiUsers": <FiMonitor size={24} />,
};

const serviceDeliverables: Record<string, string[]> = {
  "General Trading & Supplies": [
    "Quality construction materials & hardware",
    "Verified manufacturer sourcing",
    "Timely Kathmandu Valley delivery",
    "Competitive bulk pricing",
  ],
  "Consultancy & Project Management": [
    "Feasibility studies & cost estimation",
    "End-to-end project supervision",
    "Vendor coordination & procurement",
    "Quality assurance & compliance",
  ],
  "Logistics & Transportation": [
    "Fleet of trucks & delivery vehicles",
    "Kathmandu Valley & highway routes",
    "Real-time shipment tracking",
    "Safe & on-time delivery guarantee",
  ],
  "E-commerce Solutions": [
    "eSewa, Khalti & COD integration",
    "Website & mobile store development",
    "Inventory & order management",
    "Last-mile delivery coordination",
  ],
  "IT & Digital Services": [
    "Custom website & web app development",
    "SEO & digital marketing campaigns",
    "IT infrastructure & support",
    "Social media management",
  ],
  "Import & Export Facilitation": [
    "Customs documentation & clearance",
    "Freight & shipping coordination",
    "Supplier verification in India & China",
    "Quality inspection services",
  ],
};

export default async function HomePage() {
  let services: any[] = [];
  let testimonials: any[] = [];
  let portfolioItems: any[] = [];

  try {
    [services, testimonials, portfolioItems] = await Promise.all([
      prisma.service.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, take: 6 }),
      prisma.testimonial.findMany({ where: { approved: true }, orderBy: { createdAt: "desc" } }),
      prisma.portfolioItem.findMany({ where: { isActive: true }, orderBy: { createdAt: "desc" }, take: 4 }),
    ]);
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  return (
    <>
      <HeroVideo />

      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
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
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <StatsCounter value={150} label="Projects Completed" suffix="+" />
              <StatsCounter value={200} label="Happy Clients" suffix="+" />
              <StatsCounter value={25} label="Expert Team" suffix="+" />
              <StatsCounter value={10} label="Years Experience" suffix="+" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-gradient py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Core Services"
            subtitle="End-to-end solutions for your business"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {services.slice(0, 6).map((s: any, i: number) => (
              <TiltCard
                key={s.id}
                href={`/services/${s.slug}`}
                icon={serviceIcons[s.icon] || <FiCode size={24} />}
                title={s.title}
                deliverables={serviceDeliverables[s.title] || [
                  "Professional service delivery",
                  "Quality assurance guaranteed",
                  "Timely project completion",
                ]}
                gradient={i % 2 === 0 ? "from-primary to-accent" : "from-accent to-primary"}
              />
            ))}
          </div>
        </div>
      </section>

      {portfolioItems.length > 0 && (
        <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Featured Work"
              subtitle="Recent projects we're proud of"
              centered
            />
            <PortfolioSlider items={portfolioItems} />
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="section-gradient py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="What Our Clients Say"
              subtitle="Trusted by businesses across Nepal"
              centered
            />
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>
      )}

      <LeadBanner />
    </>
  );
}