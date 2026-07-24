import Link from "next/link";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
];

const serviceLinks = [
  { href: "/services/web-development", label: "Web Development" },
  { href: "/services/mobile-apps", label: "Mobile Apps" },
  { href: "/services/digital-marketing", label: "Digital Marketing" },
  { href: "/services/consulting", label: "IT Consulting" },
  { href: "/services/ecommerce", label: "eCommerce Solutions" },
  { href: "/services/payment-integration", label: "Payment Integration" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">
              Newa <span className="text-amber-500">Enterprises</span>
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Your trusted partner in digital transformation. We deliver
              innovative technology solutions to help businesses grow and
              succeed in the modern era.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <FiMapPin className="mt-0.5 shrink-0 text-amber-500" size={16} />
                <span>Baneshwor, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="shrink-0 text-amber-500" size={16} />
                <a
                  href="tel:+977-1-4XXXXXX"
                  className="hover:text-white transition-colors"
                >
                  +977-1-4XXXXXX
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="shrink-0 text-amber-500" size={16} />
                <a
                  href="mailto:info@newaenterprises.com"
                  className="hover:text-white transition-colors"
                >
                  info@newaenterprises.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-amber-600 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-amber-600 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-amber-600 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Newa Enterprises. All rights
            reserved. Baneshwor, Kathmandu, Nepal.
          </p>
        </div>
      </div>
    </footer>
  );
}
