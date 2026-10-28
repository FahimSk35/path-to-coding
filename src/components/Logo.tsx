import Link from "next/link";

// The Path To Coding logo: a small icon plus the product name.
// "light" is an optional prop: when true, the text is white (for dark backgrounds).
type LogoProps = {
  light?: boolean;
};

export default function Logo({ light = false }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#4f46e5" />
        <path
          d="M9 22c0-4 3-5 7-5s7-1 7-5"
          fill="none"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="9" cy="22" r="2.6" fill="#fff" />
        <circle cx="23" cy="10" r="2.6" fill="#c7d2fe" />
      </svg>
      <span
        className={`text-[17px] font-bold tracking-tight ${
          light ? "text-white" : "text-ink"
        }`}
      >
        Path To Coding
      </span>
    </Link>
  );
}
