"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BookOpen,
  ClipboardCheck,
  Compass,
  Gauge,
  House,
  LayoutDashboard,
  Map as MapIcon,
  Menu,
  Search,
  X,
} from "lucide-react";
import Logo from "./Logo";
import { student } from "@/data/mockData";

// The links shown in the app sidebar. Each one is an object with
// a label, the page address (href) and an icon component.
const appLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Assessment", href: "/assessment", icon: ClipboardCheck },
  { label: "My Skills", href: "/skills", icon: Gauge },
  { label: "Career Goal", href: "/career", icon: Compass },
  { label: "Learning Roadmap", href: "/roadmap", icon: MapIcon },
  { label: "Resources", href: "/resources", icon: BookOpen },
];

// AppShell = the "frame" around every app page: sidebar on the left,
// top bar at the top, and the page content ("children") in the middle.
export default function AppShell({ children }: { children: ReactNode }) {
  // usePathname tells us which page is open, e.g. "/dashboard",
  // so we can highlight the matching sidebar link.
  const pathname = usePathname();

  // On phones the sidebar is hidden; this state opens/closes it.
  const [menuOpen, setMenuOpen] = useState(false);

  // The sidebar content is stored in a variable so we can reuse it
  // for both the desktop sidebar and the mobile slide-out menu.
  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Learning
        </p>
        {appLinks.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-ink"
              }`}
            >
              <Icon
                className={`h-[18px] w-[18px] ${
                  active ? "text-brand-600" : "text-slate-400 group-hover:text-slate-600"
                }`}
              />
              {link.label}
            </Link>
          );
        })}

        <p className="px-3 pb-2 pt-6 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Website
        </p>
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-ink"
        >
          <House className="h-[18px] w-[18px] text-slate-400" />
          Home
        </Link>
      </nav>

      {/* Career goal reminder at the bottom of the sidebar */}
      <div className="m-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-medium text-slate-500">Career goal</p>
        <p className="mt-0.5 text-sm font-bold text-ink">{student.careerGoal}</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-[14%] rounded-full bg-brand-600" />
        </div>
        <p className="mt-1.5 text-xs text-slate-500">1 of 7 stages completed</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop sidebar (hidden on small screens with "hidden lg:block") */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white lg:block">
        {sidebar}
      </aside>

      {/* Mobile slide-out menu: only rendered when menuOpen is true */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMenuOpen(false)} />
          <aside className="animate-fade-up relative h-full w-72 bg-white shadow-xl">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute right-3 top-4 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
          <button
            onClick={() => setMenuOpen(true)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative hidden max-w-sm flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search topics, lessons..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-200 md:inline-block">
              Prototype · sample data
            </span>
            <button
              className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                {student.initials}
              </div>
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-semibold text-ink">{student.fullName}</p>
                <p className="text-xs text-slate-500">Student</p>
              </div>
            </div>
          </div>
        </header>

        {/* The current page appears here */}
        <main className="animate-fade-up mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
