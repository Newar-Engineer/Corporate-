import type { Metadata } from "next";
import Link from "next/link";
import { FiFileText, FiCheckCircle, FiCreditCard, FiPackage, FiUserX, FiShield, FiPhone } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Terms of Service — Newa Tech",
  description:
    "Terms of Service of Newa Tech — the terms that govern the use of our website and services.",
};

const sections = [
  {
    icon: FiFileText,
    title: "Acceptance of Terms",
    content: (
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
        By accessing this website or engaging Newa Tech for any service, you
        agree to these Terms of Service. If you do not agree with any part of
        these terms, please do not use our website or services.
      </p>
    ),
  },
  {
    icon: FiPackage,
    title: "Our Services",
    content: (
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
        Newa Tech builds websites and digital solutions for businesses across
        Nepal, including e-learning platforms, business sites, portfolios,
        e-commerce stores, and blogs. The specific scope, timeline, and
        deliverables for every project are defined in a written quote or
        proposal agreed upon before work begins.
      </p>
    ),
  },
  {
    icon: FiCreditCard,
    title: "Payments",
    content: (
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
        Project payments are typically split into an upfront deposit and
        milestone or completion payments, as stated in your quote. Deposits are
        non-refundable once work has commenced, unless we fail to deliver the
        agreed scope.
      </p>
    ),
  },
  {
    icon: FiCheckCircle,
    title: "Client Responsibilities",
    content: (
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
        You agree to provide accurate information, content, and timely feedback
        required to complete your project. Delays in providing materials may
        affect delivery timelines.
      </p>
    ),
  },
  {
    icon: FiShield,
    title: "Intellectual Property",
    content: (
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
        Upon full payment, you own the final delivered website and its custom
        content. We retain the right to showcase completed projects in our
        portfolio unless otherwise agreed in writing. Third-party assets
        (fonts, plugins, stock media) remain subject to their own licenses.
      </p>
    ),
  },
  {
    icon: FiUserX,
    title: "Limitation of Liability",
    content: (
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
        Newa Tech is not liable for indirect or consequential damages arising
        from the use of this website or our services. Our total liability for
        any claim is limited to the amount paid for the service in question.
      </p>
    ),
  },
  {
    icon: FiFileText,
    title: "Changes to These Terms",
    content: (
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
        We may update these Terms of Service from time to time. Any changes
        will be posted on this page with an updated revision date.
      </p>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="relative min-h-screen bg-[#050816] pt-32 pb-20">
      <div className="absolute inset-0 hero-gradient pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary-light mb-6">
            <FiFileText size={12} />
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            <span className="gradient-text">Terms of Service</span>
          </h1>
          <p className="text-sm text-slate-400">
            Last updated: August 1, 2026
          </p>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-10 space-y-8">
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            These Terms of Service govern your use of the Newa Tech website and
            the services we provide. Please read them carefully.
          </p>

          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <section key={section.title}>
                <h2 className="flex items-center gap-3 text-lg font-bold text-white mb-3">
                  <span className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent text-white shrink-0">
                    <Icon size={16} />
                  </span>
                  {section.title}
                </h2>
                {section.content}
              </section>
            );
          })}

          <section>
            <h2 className="flex items-center gap-3 text-lg font-bold text-white mb-3">
              <span className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent text-white shrink-0">
                <FiPhone size={16} />
              </span>
              Contact Us
            </h2>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                <strong className="text-white">Newa Tech</strong>
                <br />
                Phone:{" "}
                <a
                  href="tel:+97797444000111"
                  className="text-primary-light hover:text-primary transition-colors"
                >
                  +977-97444000111
                </a>
                <br />
                Website:{" "}
                <a
                  href="https://corporate-roan.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-light hover:text-primary transition-colors"
                >
                  corporate-roan.vercel.app
                </a>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-light hover:text-primary transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
