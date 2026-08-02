import { FiSearch, FiPenTool, FiCode, FiSend, FiLifeBuoy } from "react-icons/fi";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  {
    icon: FiSearch,
    title: "Discovery",
    desc: "We learn your business, goals, and audience — then define scope, timeline, and a fixed quote.",
  },
  {
    icon: FiPenTool,
    title: "Design",
    desc: "Wireframes and UI/UX mockups in Figma. You review and approve every screen before development.",
  },
  {
    icon: FiCode,
    title: "Development",
    desc: "We build your website or app with modern stacks — responsive, fast, and secure. Weekly demos.",
  },
  {
    icon: FiSend,
    title: "Launch",
    desc: "Testing, deployment, domain and hosting setup. We handle the launch so you can focus on your business.",
  },
  {
    icon: FiLifeBuoy,
    title: "Support",
    desc: "3 months of free bug fixes after launch, plus maintenance plans if you need ongoing care.",
  },
];

export default function ProcessSection() {
  return (
    <section
      data-scene-section
      data-scene-index={3}
      className="section-gradient relative overflow-hidden py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_80%_20%,rgba(41,171,226,0.05),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Process"
          subtitle="A clear, proven 5-step process — you always know what's happening and what comes next."
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(30,95,217,0.1)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary-light transition-all duration-300 group-hover:bg-primary/20 group-hover:text-primary-sky">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <span className="text-3xl font-bold text-white/[0.07] group-hover:text-gold/20 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mb-2 text-base font-semibold text-white">{step.title}</h3>
                <p className="text-small text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
