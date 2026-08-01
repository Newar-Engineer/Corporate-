import type { Metadata } from "next";
import ContactFormAdvanced from "@/components/ContactFormAdvanced";
import FaqAccordion from "@/components/FaqAccordion";
import ContactInfoCards from "./ContactInfoCards";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Contact Us — Newa Tech",
  description:
    "Let's build something extraordinary together. Reach Newa Tech in Baneshwor, Kathmandu for project inquiries, partnerships, or general questions.",
};

export default function ContactPage() {
  return (
    <div className="bg-black min-h-screen text-slate-100 selection:bg-sky-500 selection:text-white">
      {/* ========================= HERO - Deep Ocean Blue Theme ========================= */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.18)_0%,transparent_65%)]" />
        <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold text-sky-400 mb-6 backdrop-blur-md">
            📍 Baneshwor, Kathmandu, Nepal
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Let&rsquo;s Build Something Extraordinary Together
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
            Have a project idea, inquiry, or need a custom corporate solution?
            Connect directly with our team in Baneshwor.
          </p>
        </div>
      </section>

      {/* ========================= CONTACT INFO CARDS ========================= */}
      <ContactInfoCards />

      {/* ========================= FORM + FAQ ========================= */}
      <section className="relative border-t border-sky-500/10 bg-black pb-20 pt-16 sm:pb-24 sm:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3 bg-slate-900/60 backdrop-blur-md p-5 sm:p-8 rounded-3xl border border-sky-500/20 shadow-2xl">
              <SectionHeading title="Get a Project Quote" />
              <p className="mb-6 mt-2 text-sm text-slate-400">
                Fill in the details below and our team will respond within 24 hours with a tailored proposal.
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
      <section className="border-t border-sky-500/10 bg-black pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-sky-500/20 shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0300186772647!2d85.3236!3d27.7026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190000000001%3A0x1b2b7b1b3b3b3b3b!2sBaneshwor%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2snp!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Newa Tech — Baneshwor, Kathmandu"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
