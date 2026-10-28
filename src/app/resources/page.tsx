"use client";

import { useState } from "react";
import {
  BookOpen,
  Clock,
  Code,
  FileText,
  CirclePlay,
  Search,
  SearchX,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import Badge, { difficultyTone } from "@/components/Badge";
import DemoButton from "@/components/DemoButton";
import { resources, type ResourceType } from "@/data/mockData";

// Icon and colour for each type of resource.
const typeStyles: Record<ResourceType, { icon: LucideIcon; color: string }> = {
  Course: { icon: BookOpen, color: "bg-brand-50 text-brand-600" },
  Video: { icon: CirclePlay, color: "bg-rose-50 text-rose-600" },
  Article: { icon: FileText, color: "bg-amber-50 text-amber-600" },
  Practice: { icon: Code, color: "bg-emerald-50 text-emerald-600" },
};

// The filter buttons. "All" plus every topic used in the data.
const categories = [
  "All",
  "Programming Fundamentals",
  "Object-Oriented Programming",
  "Data Structures",
  "Databases & SQL",
  "APIs",
  "Web Development",
  "Backend Development",
];

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Keep only the resources that match BOTH the search text and the category.
  const filtered = resources.filter((resource) => {
    const matchesCategory = category === "All" || resource.topic === category;
    const text = (resource.title + " " + resource.description + " " + resource.topic).toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AppShell>
      <div>
        <p className="text-sm font-semibold text-brand-600">Resource library</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Learning Resources</h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          Courses, videos, articles and practice sets matched to your roadmap. All items shown
          are fictional examples for this prototype.
        </p>
      </div>

      {/* Search field */}
      <div className="relative mt-8 max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search resources, e.g. “SQL” or “classes”"
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      {/* Category filters */}
      <div className="mt-5 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              category === cat
                ? "bg-ink text-white"
                : "bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-slate-500">
        Showing <span className="font-semibold text-ink">{filtered.length}</span> of {resources.length} resources
      </p>

      {/* Resource cards, or an empty state when nothing matches */}
      {filtered.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <SearchX className="h-10 w-10 text-slate-300" />
          <p className="mt-4 font-semibold text-ink">No resources found</p>
          <p className="mt-1 text-sm text-slate-500">Try a different search word or category.</p>
          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
            className="mt-5 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((resource) => {
            const style = typeStyles[resource.type];
            const Icon = style.icon;
            return (
              <article
                key={resource.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${style.color}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  {resource.recommended && (
                    <Badge tone="indigo">
                      <Sparkles className="h-3 w-3" /> For you
                    </Badge>
                  )}
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {resource.type} · {resource.topic}
                </p>
                <h2 className="mt-1.5 font-semibold leading-snug text-ink">{resource.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{resource.description}</p>

                <div className="mt-5 flex items-center gap-3">
                  <Badge tone={difficultyTone(resource.difficulty)}>{resource.difficulty}</Badge>
                  <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                    <Clock className="h-3.5 w-3.5" /> {resource.duration}
                  </span>
                </div>

                <DemoButton
                  className="mt-5 w-full"
                  message="Demo only — resource content will be added in a later phase."
                >
                  Explore Resource
                </DemoButton>
              </article>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
