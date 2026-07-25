"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const els = document.querySelectorAll("[data-scene-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-scene-index"));
            if (!isNaN(idx)) setActiveSection(idx);
          }
        }
      },
      { threshold: 0.3 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 lg:h-20">
        <Link
          href="/"
          className="min-h-[44px] flex items-center gap-2 shrink-0"
        >
          <span className="text-lg font-bold tracking-tight">
            <span className="text-white">Newa</span>
            <span className="gradient-text ml-1">Enterprises</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative min-h-[44px] flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                isActive(link.href)
                  ? "text-primary-light"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-gradient-to-r from-primary to-accent rounded-full" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact"
            className="min-h-[44px] inline-flex items-center px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_25px_rgba(79,124,255,0.3)] transition-all duration-300"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="min-h-[44px] min-w-[44px] flex lg:hidden items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
          aria-label="Open navigation menu"
        >
          <FiMenu size={22} />
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-[#050816] border-l border-white/10 flex flex-col">
            <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
              <span className="text-base font-bold gradient-text">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                aria-label="Close navigation menu"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`min-h-[44px] flex items-center px-3 py-2.5 text-base rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "text-primary-light bg-primary/10"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="p-4 border-t border-white/10">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center min-h-[48px] w-full rounded-xl text-base font-semibold text-white bg-gradient-to-r from-primary to-accent transition-all"
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
