"use client";

import { FiMapPin, FiPhone, FiMail, FiExternalLink } from "react-icons/fi";

const cards = [
  {
    icon: FiMapPin,
    title: "Office Address",
    lines: ["Baneshwor, Kathmandu", "Nepal"],
    action: {
      label: "View on Google Maps",
      href: "https://maps.google.com/?q=Baneshwor+Kathmandu+Nepal",
    },
  },
  {
    icon: FiPhone,
    title: "Call & WhatsApp",
    lines: ["+977-97444000111"],
    action: {
      label: "Call Now",
      href: "tel:+97797444000111",
    },
    secondary: {
      label: "WhatsApp Chat",
      href: "https://wa.me/97797444000111?text=Hi%20Newa%20Enterprises",
    },
  },
  {
    icon: FiMail,
    title: "Email Us",
    lines: ["info@newatech.com"],
    response: "24-hour response guarantee",
    action: {
      label: "Send Email",
      href: "mailto:info@newatech.com",
    },
  },
];

export default function ContactInfoCards() {
  return (
    <section className="relative -mt-12 pb-6 sm:pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="group glass relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_25px_rgba(99,102,241,0.08)]"
              >
                <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-primary/5 blur-2xl" />

                {/* Icon */}
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon size={20} />
                </div>

                {/* Title */}
                <h3 className="mb-1 text-sm font-semibold text-white">{card.title}</h3>

                {/* Lines */}
                {card.lines.map((line) => (
                  <p key={line} className="text-sm text-slate-400">
                    {line}
                  </p>
                ))}

                {/* Response badge */}
                {card.response && (
                  <span className="mt-2 inline-block rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                    {card.response}
                  </span>
                )}

                {/* Actions */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={card.action.href}
                    target={card.action.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary transition-all hover:bg-primary/20"
                  >
                    {card.action.label}
                    <FiExternalLink size={12} />
                  </a>
                  {card.secondary && (
                    <a
                      href={card.secondary.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400 transition-all hover:bg-emerald-500/20"
                    >
                      {card.secondary.label}
                      <FiExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
