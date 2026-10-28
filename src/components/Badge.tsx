import type { ReactNode } from "react";

// A small rounded label, e.g. "High", "Completed", "Beginner".
// "tone" decides the colour.

type Tone = "indigo" | "green" | "amber" | "red" | "slate" | "dark";

const toneClasses: Record<Tone, string> = {
  indigo: "bg-brand-50 text-brand-700 ring-brand-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  red: "bg-rose-50 text-rose-700 ring-rose-200",
  slate: "bg-slate-100 text-slate-600 ring-slate-200",
  dark: "bg-ink text-white ring-ink",
};

type BadgeProps = {
  children: ReactNode;
  tone?: Tone;
};

export default function Badge({ children, tone = "slate" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

// Helper functions that turn data values into the right badge colour.
export function priorityTone(priority: string): Tone {
  if (priority === "High") return "red";
  if (priority === "Medium") return "amber";
  return "green";
}

export function difficultyTone(difficulty: string): Tone {
  if (difficulty === "Beginner") return "green";
  if (difficulty === "Intermediate") return "indigo";
  return "amber";
}

export function statusTone(status: string): Tone {
  if (status === "Completed") return "green";
  if (status === "Recommended Next") return "indigo";
  if (status === "Final Goal") return "dark";
  return "slate";
}
