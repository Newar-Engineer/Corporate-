import type { Metadata } from "next";
import Link from "next/link";
import { FiShield, FiDatabase, FiUsers, FiFileText, FiLock, FiExternalLink, FiPhone } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Privacy Policy — Newa Tech",
  description:
    "Privacy Policy of Newa Tech — what information we collect, how we use it, and your rights.",
};

const sections = [
  {
    icon: FiShield,
    title: "Information We Collect",
    content: (
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
        When you reach out to us — through our website, a Facebook or Instagram
        lead form, WhatsApp, or a phone call — we may collect:
      </p>
    ),
    list: [
      "Your name",
      "Phone number",
      "Email address (if provided)",
      "Details about the type of website or service you're interested in",
      "Your budget range (if provided)",
    ],
  },
  {
    icon: FiUsers,
    title: "How We Use Your Information",
    content: (
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
        We use the information you provide only to:
      </p>
    ),
    list: [
      "Contact you about your inquiry",
      "Understand your project requirements",
      "Provide a quote or proposal for our services",
      "Follow up on ongoing projects if you become a client",
    ],
    extra:
      "We do not sell, rent, or trade your personal information to third parties for marketing purposes.",
  },
  {
    icon: FiDatabase,
    title: "Data Storage & Security",
    content: (
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
        Your information is stored securely and accessed only by Newa
        Tech for the purpose of responding to your inquiry and
        delivering our services.
      </p>
    ),
  },
  {
    icon: FiExternalLink,
    title: "Third-Party Services",
    content: (
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
        We use Meta (Facebook and Instagram) advertising tools, including Lead
        Ads, to reach potential clients. If you submit your details through a
        Meta Lead Form, that information is also subject to{" "}
        <a
          href="https://www.facebook.com/policy.php"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-light hover:text-primary underline decoration-primary/40 underline-offset-4 transition-colors"
        >
          Meta&apos;s Data Policy
        </a>{" "}
        in addition to this policy. We may also use standard web hosting and
        analytics tools (such as Vercel) to operate this website.
      </p>
    ),
  },
  {
    icon: FiFileText,
    title: "Your Rights",
    content: (
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
        You can request that we delete your information from our records at any
        time by contacting us using the details below.
      </p>
    ),
  },
  {
    icon: FiLock,
    title: "Changes to This Policy",
    content: (
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
        We may update this privacy policy from time to time. Any changes will
        be posted on this page with an updated revision date.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen bg-[#050816] pt-32 pb-20">
      <div className="absolute inset-0 hero-gradient pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary-light mb-6">
            <FiShield size={12} />
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            <span className="gradient-text">Privacy Policy</span>
          </h1>
          <p className="text-sm text-slate-400">
            Last updated: August 1, 2026
          </p>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-10 space-y-8">
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Newa Tech (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;)
            builds websites and digital solutions for businesses across Nepal,
            including e-learning platforms, business sites, portfolios,
            e-commerce stores, and blogs. This page explains what information
            we collect when you contact us or inquire about our services, and
            how we use it.
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
                {section.list && (
                  <ul className="mt-3 space-y-2">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm sm:text-base text-slate-400"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-primary to-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.extra && (
                  <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed border-l-2 border-orange/50 pl-4">
                    {section.extra}
                  </p>
                )}
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
