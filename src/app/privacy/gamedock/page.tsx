import type { Metadata } from "next";
import Link from "next/link";
import {
  FiSmartphone,
  FiDatabase,
  FiMapPin,
  FiUsers,
  FiEyeOff,
  FiShield,
  FiLock,
  FiRefreshCw,
  FiCheckCircle,
  FiPhone,
  FiMail,
  FiExternalLink,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "Privacy Policy — GameDock | Newa Tech",
  description:
    "Privacy Policy for the GameDock mobile app developed by Newa Tech — what information we collect, how we use it, and your rights.",
};

const thirdPartyLinks = [
  {
    name: "Google Play Services",
    href: "https://policies.google.com/privacy",
  },
  {
    name: "Google Analytics for Firebase",
    href: "https://firebase.google.com/policies/analytics",
  },
  {
    name: "AdMob",
    href: "https://support.google.com/admob/answer/6128543",
  },
  {
    name: "Firebase Crashlytics",
    href: "https://firebase.google.com/support/privacy",
  },
];

const sections = [
  {
    icon: FiDatabase,
    title: "Information Collection and Use",
    content: (
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
        The Application collects information when you download and use it. This
        information may include information such as:
      </p>
    ),
    list: [
      "Your device's Internet Protocol address (e.g. IP address)",
      "The pages of the Application that you visit, the time and date of your visit, the time spent on those pages",
      "The time spent on the Application",
      "Your mobile operating system you use",
    ],
  },
  {
    icon: FiMapPin,
    title:
      "Does the Application Collect Precise Real Time Location Information of the Device?",
    content: (
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
        This Application does not collect precise information about the
        location of your mobile device.
      </p>
    ),
  },
  {
    icon: FiUsers,
    title:
      "Do Third Parties See and/or Have Access to Information Obtained by the Application?",
    content: (
      <div className="space-y-4">
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Only aggregated, anonymized data is periodically transmitted to
          external services to help the Service Provider improve the
          Application and their service. The Service Provider may share your
          information with third parties in the ways that are described in this
          privacy statement.
        </p>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Please note that the Application utilizes third-party services that
          have their own Privacy Policy about handling data. Below are the
          links to the Privacy Policy of the third-party service providers used
          by the Application:
        </p>
        <ul className="space-y-2">
          {thirdPartyLinks.map((service) => (
            <li key={service.name}>
              <a
                href={service.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm sm:text-base text-primary-light hover:text-primary underline decoration-primary/40 underline-offset-4 transition-colors"
              >
                {service.name}
                <FiExternalLink size={12} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    icon: FiEyeOff,
    title: "What Are My Opt-Out Rights?",
    content: (
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
        You can stop all collection of information by the Application easily by
        uninstalling the Application. You may use the standard uninstall
        processes as may be available as part of your mobile device or via the
        mobile application marketplace or network.
      </p>
    ),
  },
  {
    icon: FiShield,
    title: "Children",
    content: (
      <div className="space-y-4">
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          The Service Provider does not use the Application to knowingly solicit
          data from or market to children under the age of 13.
        </p>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          The Application does not address anyone under the age of 13. The
          Service Provider does not knowingly collect personally identifiable
          information from children under 13 years of age. In the case the
          Service Provider discovers that a child under 13 has provided
          personal information, the Service Provider will immediately delete
          this from their servers.
        </p>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          If you are a parent or guardian and you are aware that your child has
          provided us with personal information, please contact the Service
          Provider (Newa Tech) so that they will be able to take the necessary
          actions.
        </p>
      </div>
    ),
  },
  {
    icon: FiLock,
    title: "Security",
    content: (
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
        The Service Provider is concerned about safeguarding the
        confidentiality of your information. The Service Provider provides
        physical, electronic, and procedural safeguards to protect information
        the Service Provider processes and maintains.
      </p>
    ),
  },
  {
    icon: FiRefreshCw,
    title: "Changes",
    content: (
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
        This Privacy Policy may be updated from time to time for any reason. The
        Service Provider will notify you of any changes to the Privacy Policy by
        updating this page with the new Privacy Policy. You are advised to
        consult this Privacy Policy regularly for any changes, as continued use
        is deemed approval of all changes.
      </p>
    ),
  },
  {
    icon: FiCheckCircle,
    title: "Your Consent",
    content: (
      <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
        By using the Application, you are consenting to the processing of your
        information as set forth in this Privacy Policy now and as amended by
        us. &ldquo;Processing&rdquo; means using cookies on a computer/hand held
        device or using or touching information in any way, including, but not
        limited to, collecting, storing, deleting, using, combining and
        disclosing information, all of which activities will take place in
        Nepal. The Service Provider&apos;s processing of your information will
        be undertaken in Nepal.
      </p>
    ),
  },
];
export default function GameDockPrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen bg-[#050816] pt-32 pb-20">
      <div className="absolute inset-0 hero-gradient pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary-light mb-6">
            <FiSmartphone size={12} />
            GameDock &middot; Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            <span className="gradient-text">Privacy Policy</span>
          </h1>
          <p className="text-sm text-slate-400">
            For the GameDock mobile app &middot; Last updated: August 31, 2026
          </p>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-10 space-y-8">
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            This privacy policy applies to the GameDock app for mobile devices,
            together with any related services operated by Newa Tech
            (collectively, the &ldquo;Application&rdquo;). Newa Tech is hereby
            referred to as the &ldquo;Service Provider&rdquo;.
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
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-4">
              If you have any questions regarding privacy while using the
              Application, or have questions about the practices, please contact
              the Service Provider via email at{" "}
              <a
                href="mailto:info@newatech.com"
                className="text-primary-light hover:text-primary underline decoration-primary/40 underline-offset-4 transition-colors"
              >
                info@newatech.com
              </a>
              .
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                <strong className="text-white">Newa Tech</strong>
                <br />
                <FiMapPin size={14} className="inline -mt-0.5 mr-1 text-primary-light" /> Baneshwor, Kathmandu, Nepal
                <br />
                <FiMail size={14} className="inline -mt-0.5 mr-1 text-primary-light" />{" "}
                <a
                  href="mailto:info@newatech.com"
                  className="text-primary-light hover:text-primary transition-colors"
                >
                  info@newatech.com
                </a>
                <br />
                <FiPhone size={14} className="inline -mt-0.5 mr-1 text-primary-light" />{" "}
                <a
                  href="tel:+97797444000111"
                  className="text-primary-light hover:text-primary transition-colors"
                >
                  +977-97444000111
                </a>
                <br />
                <FiExternalLink size={14} className="inline -mt-0.5 mr-1 text-primary-light" />{" "}
                <a
                  href="https://newatech.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-light hover:text-primary transition-colors"
                >
                  newatech.vercel.app
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