"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  FiHome,
  FiServer,
  FiUsers,
  FiMessageSquare,
  FiEdit3,
  FiBriefcase,
  FiFileText,
  FiBarChart2,
  FiFolder,
  FiSettings,
  FiLogOut,
  FiX,
} from "react-icons/fi";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: FiHome },
  { href: "/admin/portfolio", label: "Portfolio", icon: FiFolder },
  { href: "/admin/services", label: "Services", icon: FiServer },
  { href: "/admin/team", label: "Team", icon: FiUsers },
  { href: "/admin/testimonials", label: "Testimonials", icon: FiMessageSquare },
  { href: "/admin/blog", label: "Blog", icon: FiEdit3 },
  { href: "/admin/messages", label: "Messages", icon: FiFileText },
  { href: "/admin/careers", label: "Careers", icon: FiBriefcase },
  { href: "/admin/applications", label: "Applications", icon: FiFileText },
  { href: "/admin/analytics", label: "Analytics", icon: FiBarChart2 },
  { href: "/admin/settings", label: "Settings", icon: FiSettings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const content = (
    <div className="flex h-full flex-col bg-gray-900 text-gray-300">
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-800">
        <Link href="/admin" className="text-lg font-bold text-white">
          Admin Panel
        </Link>
        <button
          onClick={onClose}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-gray-400 hover:text-white lg:hidden"
          aria-label="Close sidebar"
        >
          <FiX size={20} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={clsx(
                "min-h-[44px] flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              )}
            >
              <Icon size={18} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin</p>
            <p className="text-xs text-gray-500 truncate">admin@newatech.com</p>
          </div>
        </div>
        <button className="min-h-[44px] flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        {content}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 w-64 max-w-[80vw] shadow-xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
