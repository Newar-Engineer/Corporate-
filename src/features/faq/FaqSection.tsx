import SectionHeading from "@/components/sections/SectionHeading";
import FaqAccordion from "@/features/faq/FaqAccordion";

const faqs = [
  {
    q: "How long does it take to build a website or app?",
    a: "A business website typically takes 2–4 weeks. E-commerce stores take 4–8 weeks, and mobile apps 8–16 weeks depending on features. You'll get a clear timeline with milestones before we start — and we stick to it.",
  },
  {
    q: "How many revisions do I get on design?",
    a: "Every project includes 2 full rounds of design revisions at the mockup stage. We keep iterating on small refinements until you're happy — most clients approve within 1–2 rounds.",
  },
  {
    q: "Do you handle hosting and domain setup?",
    a: "Yes. We handle domain purchase, DNS setup, SSL certificates, and deploy on fast, secure hosting (Vercel or similar). We can also manage everything on a monthly maintenance plan if you prefer a hands-off experience.",
  },
  {
    q: "What are the payment terms?",
    a: "Simple milestone payments: 30% to start, 40% at design approval, 30% on delivery. We accept bank transfer, eSewa, and Khalti — whichever is convenient for you.",
  },
  {
    q: "What happens after launch?",
    a: "Every project includes 3 months of free bug fixes after launch. For ongoing care, we offer maintenance plans covering security updates, backups, performance monitoring, and small content changes.",
  },
];

export default function FaqSection() {
  return (
    <section
      data-scene-section
      data-scene-index={6}
      className="section-gradient relative overflow-hidden py-20 lg:py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_0%,rgba(255,201,60,0.04),transparent)]" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about working with Newa Tech."
          centered
        />
        <FaqAccordion faqs={faqs} />
      </div>
    </section>
  );
}
