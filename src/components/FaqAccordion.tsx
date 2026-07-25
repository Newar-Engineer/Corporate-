"use client";

import { useState } from "react";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";

const faqs = [
  {
    q: "What is your typical project kickoff timeline?",
    a: "For most projects, we can begin within 1–2 weeks after signing the agreement and receiving the initial deposit. Smaller scoped projects may start within days, while larger enterprise engagements typically require a 2–4 week planning phase. We'll provide a clear timeline during our discovery call.",
  },
  {
    q: "How do project milestones and payment structures work?",
    a: "We follow a milestone-based payment structure. Typically: 30% upfront to begin, 30% at the design approval milestone, 30% at development completion, and 10% upon final delivery and sign-off. For long-term retainers, we invoice monthly. All milestones and payment schedules are transparently outlined in the project proposal.",
  },
  {
    q: "Do you sign NDAs (Non-Disclosure Agreements) before project discussion?",
    a: "Absolutely. We regularly sign NDAs before discussing project specifics. Your ideas and business information are safe with us. Just send over your NDA or request ours, and we'll have it signed before the first call.",
  },
  {
    q: "What post-launch support and maintenance do you offer?",
    a: "We provide 30 days of complimentary bug-fix support after launch. For ongoing maintenance, we offer monthly retainer packages that include security patches, performance monitoring, content updates, and priority email support. Custom SLA agreements are also available for enterprise clients.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`rounded-xl border transition-all duration-300 ${
              isOpen
                ? "border-primary/30 bg-primary/5 shadow-[0_0_15px_rgba(99,102,241,0.08)]"
                : "border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              className="flex w-full items-center gap-3 px-5 py-4 text-left"
            >
              <FiHelpCircle
                size={16}
                className={`shrink-0 transition-colors ${
                  isOpen ? "text-primary" : "text-slate-500"
                }`}
              />
              <span
                className={`flex-1 text-sm font-medium transition-colors ${
                  isOpen ? "text-white" : "text-slate-300"
                }`}
              >
                {faq.q}
              </span>
              <FiChevronDown
                size={16}
                className={`shrink-0 text-slate-500 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="border-t border-slate-700/30 px-5 pb-4 pt-3 text-sm leading-relaxed text-slate-400">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
