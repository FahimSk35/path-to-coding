// A reusable horizontal progress bar.
// Props:
//   value  – a number from 0 to 100
//   color  – optional Tailwind background class for the filled part
//   size   – "sm" (thin) or "md" (thicker)

type ProgressBarProps = {
  value: number;
  color?: string;
  size?: "sm" | "md";
};

// Picks a colour based on the score, so weak skills stand out.
export function scoreColor(score: number) {
  if (score >= 70) return "bg-emerald-500";
  if (score >= 50) return "bg-brand-600";
  if (score >= 40) return "bg-amber-500";
  return "bg-rose-500";
}

export default function ProgressBar({ value, color, size = "md" }: ProgressBarProps) {
  const height = size === "sm" ? "h-1.5" : "h-2.5";

  return (
    <div className={`w-full overflow-hidden rounded-full bg-slate-100 ${height}`}>
      <div
        className={`${height} rounded-full transition-all duration-700 ${color ?? scoreColor(value)}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
