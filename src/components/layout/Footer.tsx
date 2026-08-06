"use client";

import Link from "next/link";
import Image from "next/image";
import { FiMapPin, FiPhone, FiMail, FiSend, FiArrowUpRight } from "react-icons/fi";
import { ButtonLink } from "@/components/ui/Button";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
  { href: "/payment", label: "Payments" },
];

const serviceLinks = [
  { href: "/services/web-development-engineering", label: "Web Development" },
  { href: "/services/mobile-app-engineering", label: "Mobile App Development" },
  { href: "/services/uiux-product-design", label: "UI/UX Design" },
  { href: "/services/ecommerce-platforms", label: "E-Commerce Websites" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61592553510986",
    path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
  },
  {
    label: "Twitter",
    href: "https://x.com/newa_tech",
    path: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
  },
  {
    label: "LinkedIn",
    href: "https://np.linkedin.com/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-slate-800/50">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-2">
<Link href="/" className="inline-flex items-center gap-2.5 text-xl font-bold mb-4">
              <Image
                src="/logo-removebg-preview.png"
                alt="Newa Tech logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span>
                <span className="text-white">Newa</span>
                <span className="gradient-text">Tech</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              Newa Tech is a web design and app development agency in Baneshwor,
              Kathmandu — helping businesses get a professional website or
              mobile app.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 text-primary-light">
                  <FiMapPin size={15} />
                </span>
                <span className="text-slate-400 pt-1">Baneshwor, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 text-primary-light">
                  <FiPhone size={15} />
                </span>
                <a href="tel:+97797444000111" className="text-slate-400 hover:text-white transition-colors pt-1 break-all">
                  +977-97444000111
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 text-primary-light">
                  <FiMail size={15} />
                </span>
                <a href="mailto:info@newatech.com" className="text-slate-400 hover:text-white transition-colors pt-1">
                  info@newatech.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                    <FiArrowUpRight size={12} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                    <FiArrowUpRight size={12} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-4">
              Stay Connected
            </h3>
            <div className="flex gap-2 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-slate-800 text-slate-400 hover:border-primary/40 hover:text-primary-light hover:bg-primary/5 transition-all"
                  aria-label={social.label}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-3">
              Have a Project?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Get a free quote for your website or app in 24 hours.
            </p>
            <ButtonLink
              href="/contact"
              size="sm"
              className="w-full"
            >
              <FiSend size={16} />
              Get a Free Quote
            </ButtonLink>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} Newa Tech. All rights reserved. Baneshwor, Kathmandu, Nepal.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}