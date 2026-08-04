import SectionHeading from "@/components/sections/SectionHeading";

const tech = [
  { name: "React", role: "UI Library" },
  { name: "Next.js", role: "Web Framework" },
  { name: "Node.js", role: "Backend" },
  { name: "TypeScript", role: "Language" },
  { name: "React Native", role: "Mobile" },
  { name: "Flutter", role: "Mobile" },
  { name: "PostgreSQL", role: "Database" },
  { name: "Tailwind CSS", role: "Styling" },
  { name: "Prisma", role: "ORM" },
  { name: "Vercel", role: "Hosting" },
  { name: "eSewa API", role: "Payments" },
  { name: "Khalti API", role: "Payments" },
];

export default function TechStackSection() {
  return (
    <section
      data-scene-section
      data-scene-index={5}
      className="section-gradient-alt relative overflow-hidden py-20 lg:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(30,95,217,0.06),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Built on Modern Technology"
          subtitle="We use industry-standard tools that are fast, secure, and easy to maintain — so your product isn't tied to any one platform."
          centered
        />
        <div className="flex flex-wrap justify-center gap-3">
          {tech.map((t) => (
            <div
              key={t.name}
              className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-3 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
            >
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-primary to-accent" />
              <span className="text-sm font-semibold text-white">{t.name}</span>
              <span className="hidden sm:block text-xs text-slate-400">{t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
