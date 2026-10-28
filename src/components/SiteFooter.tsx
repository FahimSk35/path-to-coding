import Link from "next/link";
import Logo from "./Logo";

// Footer shown at the bottom of the public website pages.
const columns = [
  {
    title: "Product",
    links: [
      { label: "Skill Assessment", href: "/assessment" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Learning Roadmap", href: "/roadmap" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Career Goals", href: "/career" },
      { label: "My Skills", href: "/skills" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
            A personalized programming learning and career guidance system. Assess your
            skills, understand your gaps and follow a roadmap built around your goals.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold text-ink">{column.title}</p>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-brand-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-slate-400 sm:px-6 lg:px-8">
          © 2026 Path To Coding · University project prototype. All student data shown is fictional.
        </p>
      </div>
    </footer>
  );
}
