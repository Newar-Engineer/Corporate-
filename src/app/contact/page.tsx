import type { Metadata } from "next";
import ContactFormAdvanced from "@/components/ContactFormAdvanced";
import FaqAccordion from "@/components/FaqAccordion";
import ContactInfoCards from "./ContactInfoCards";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Contact Us — Newa Enterprises",
  description:
    "Let's build something extraordinary together. Reach Newa Enterprises in Baneshwor, Kathmandu for project inquiries, partnerships, or general questions.",
};

export default function ContactPage() {
  return (
    <>
      {/* ========================= HERO ========================= */}
      <section className="relative overflow-hidden bg-slate-900 py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15)_0%,transparent_60%)]" />
        <div className="absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="gradient-text text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Let&rsquo;s Build Something Extraordinary Together
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Have a project idea, question, or need a custom enterprise solution?{" "}
            <br className="hidden sm:block" />
            Talk directly with our engineering team.
          </p>
        </div>
      </section>

      {/* ========================= CONTACT INFO CARDS ========================= */}
      <ContactInfoCards />

      {/* ========================= FORM + FAQ ========================= */}
      <section className="border-t border-slate-800/50 bg-slate-900 pb-20 pt-16 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <SectionHeading title="Get a Project Quote" />
              <p className="mb-6 mt-2 text-sm text-slate-400">
                Fill in the details below and our team will respond within 24 hours with a tailored
                proposal.
              </p>
              <ContactFormAdvanced />
            </div>

            {/* FAQ */}
            <div className="lg:col-span-2">
              <SectionHeading title="Frequently Asked Questions" />
              <p className="mb-6 mt-2 text-sm text-slate-400">
                Quick answers to common client questions.
              </p>
              <FaqAccordion />
            </div>
          </div>
        </div>
      </section>

      {/* ========================= MAP ========================= */}
      <section className="border-t border-slate-800/50 bg-slate-900 pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-xl border border-slate-700/50">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0300186772647!2d85.3236!3d27.7026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190000000001%3A0x1b2b7b1b3b3b3b3b!2sBaneshwor%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2snp!4v1"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Newa Enterprises — Baneshwor, Kathmandu"
            />
          </div>
        </div>
      </section>
    </>
  );
}
