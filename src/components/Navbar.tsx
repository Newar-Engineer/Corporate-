"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

interface NavItem {
  href?: string;
  label: string;
  dropdown?: { href: string; label: string }[];
}

const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    label: "Services",
    dropdown: [
      { href: "/services/general-trading-supplies", label: "General Trading" },
      { href: "/services/consultancy-project-management", label: "Consultancy" },
      { href: "/services/logistics-transportation", label: "Logistics" },
      { href: "/services/ecommerce-solutions", label: "E-commerce" },
      { href: "/services/it-digital-services", label: "IT & Digital" },
      { href: "/services/import-export-facilitation", label: "Import/Export" },
    ],
  },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 lg:h-20">
        <Link
          href="/"
          className="min-h-[44px] flex items-center gap-1.5 text-xl font-bold shrink-0"
        >
          <span className="text-white">Newa</span>
          <span className="gradient-text">Enterprises</span>
        </Link>

        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    className="min-h-[44px] flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <FiChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {dropdownOpen && link.dropdown && (
                    <div className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-slate-800 bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-black/40 py-2 z-50">
                      {link.dropdown.map((item) => {
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-4 py-2.5 text-sm transition-colors ${
                              isActive(item.href)
                                ? "text-primary bg-primary/10"
                                : "text-slate-300 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href || "/"}
                className={`min-h-[44px] flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.href || "/")
                    ? "text-primary bg-primary/10"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact"
            className="min-h-[44px] inline-flex items-center px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="min-h-[44px] min-w-[44px] flex lg:hidden items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
          aria-label="Open navigation menu"
        >
          <FiMenu size={24} />
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-slate-950 border-l border-slate-800 flex flex-col">
            <div className="flex items-center justify-between px-4 h-16 border-b border-slate-800">
              <span className="text-lg font-bold text-white">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                aria-label="Close navigation menu"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {navLinks.map((link) => {
                if (link.dropdown) {
                  return (
                    <div key={link.label}>
                      <span className="min-h-[44px] flex items-center px-3 py-2.5 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                        {link.label}
                      </span>
                      {link.dropdown.map((item) => {
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`min-h-[44px] flex items-center px-3 py-2.5 text-base rounded-lg transition-colors ml-3 ${
                              isActive(item.href)
                                ? "text-primary bg-primary/10"
                                : "text-slate-300 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href || "/"}
                    onClick={() => setMobileOpen(false)}
                    className={`min-h-[44px] flex items-center px-3 py-2.5 text-base rounded-lg transition-colors ${
                      isActive(link.href || "/")
                        ? "text-primary bg-primary/10"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="p-4 border-t border-slate-800">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center min-h-[48px] w-full rounded-xl text-base font-semibold text-white bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}