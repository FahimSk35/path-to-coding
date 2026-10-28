"use client";

import { useState, type ReactNode } from "react";
import { Info } from "lucide-react";

// A button for features that are NOT built yet.
// Clicking it shows a small message explaining it is a prototype,
// so nobody thinks the button is broken.

type DemoButtonProps = {
  children: ReactNode;
  message?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function DemoButton({
  children,
  message = "Demo only — this feature will be built in a later project phase.",
  variant = "secondary",
  className = "",
}: DemoButtonProps) {
  // "showNote" remembers whether the message is visible (true) or hidden (false).
  const [showNote, setShowNote] = useState(false);

  // Event handler: runs when the button is clicked.
  function handleClick() {
    setShowNote(true);
    // Hide the message again after 2.5 seconds.
    setTimeout(() => setShowNote(false), 2500);
  }

  const styles =
    variant === "primary"
      ? "bg-brand-600 text-white hover:bg-brand-700"
      : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50";

  return (
    <span className={`relative inline-flex ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${styles}`}
      >
        {children}
      </button>

      {/* Only render the note when showNote is true */}
      {showNote && (
        <span className="animate-fade-up absolute bottom-full left-1/2 z-20 mb-2 flex w-60 -translate-x-1/2 items-start gap-2 rounded-lg bg-ink px-3 py-2 text-xs font-medium text-white shadow-lg">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {message}
        </span>
      )}
    </span>
  );
}
