"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChartColumn,
  Brain,
  Check,
  Layers,
  Monitor,
  Server,
  type LucideIcon,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { careers, type CareerId } from "@/data/mockData";

// Each career id is matched with an icon.
// "Record<CareerId, LucideIcon>" means: an object whose keys are career ids
// and whose values are icon components.
const careerIcons: Record<CareerId, LucideIcon> = {
  frontend: Monitor,
  backend: Server,
  fullstack: Layers,
  data: ChartColumn,
  ml: Brain,
};

export default function CareerPage() {
  // Backend Developer is selected by default, as required for the prototype.
  const [selected, setSelected] = useState<CareerId>("backend");

  // Find the full object of the currently selected career.
  const selectedCareer = careers.find((c) => c.id === selected);

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-semibold text-brand-600">Step 3 of 4</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Choose your career goal
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            Your roadmap is built around the role you want. You can change this at any time.
          </p>
        </div>

        {/* Career cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {careers.map((career) => {
            const Icon = careerIcons[career.id];
            const isSelected = career.id === selected;

            return (
              <button
                key={career.id}
                onClick={() => setSelected(career.id)}
                className={`relative flex flex-col rounded-2xl border bg-white p-6 text-left transition hover:-translate-y-0.5 ${
                  isSelected
                    ? "border-brand-600 shadow-lg shadow-brand-600/10 ring-1 ring-brand-600"
                    : "border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md"
                }`}
              >
                {/* Selection indicator (circle in the top-right corner) */}
                <span
                  className={`absolute right-5 top-5 flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${
                    isSelected ? "border-brand-600 bg-brand-600" : "border-slate-300"
                  }`}
                >
                  {isSelected && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                </span>

                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    isSelected ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </span>

                <h2 className="mt-5 text-lg font-semibold text-ink">{career.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                  {career.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {career.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-xs font-semibold text-emerald-600">{career.demand}</p>
              </button>
            );
          })}

          {/* Helper card filling the last grid space */}
          <div className="flex flex-col justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-6">
            <p className="font-semibold text-ink">Not sure yet?</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Start with the role closest to what you enjoy. Your fundamentals stay useful for
              every path, and you can switch later.
            </p>
          </div>
        </div>

        {/* Bottom bar with the Continue button */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row">
          <p className="text-sm text-slate-600">
            Selected goal:{" "}
            <span className="font-semibold text-ink">{selectedCareer?.title}</span>
          </p>
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
          >
            Continue <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-3 text-center text-xs text-slate-400">
          Prototype: the sample roadmap is prepared for Backend Developer.
        </p>
      </div>
    </AppShell>
  );
}
