
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, CircleCheck, Clock, Lock, Server, Sparkles, Trophy
} from "lucide-react";
import AppShell from "@/components/AppShell";
import Badge, { difficultyTone, statusTone } from "@/components/Badge";
import { roadmap, skills, student, type RoadmapStage } from "@/data/mockData";

const STORAGE_KEY = "path-to-coding-completed-stages";

type StageStatus = RoadmapStage["status"];

function StageMarker({
  stage,
  status,
}: {
  stage: RoadmapStage;
  status: StageStatus;
}) {
  if (status === "Completed") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white ring-4 ring-slate-50">
        <CircleCheck className="h-5 w-5" />
      </span>
    );
  }

  if (status === "Recommended Next") {
    return (
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white ring-4 ring-brand-100">
        <span className="absolute inset-0 animate-ping rounded-full bg-brand-400 opacity-30" />
        {stage.id}
      </span>
    );
  }

  if (status === "Final Goal") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white ring-4 ring-slate-50">
        <Trophy className="h-5 w-5" />
      </span>
    );
  }

  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-sm font-bold text-slate-400 ring-4 ring-slate-50">
      {stage.id}
    </span>
  );
}

export default function RoadmapPage() {
  const initialCompleted = roadmap
    .filter((stage) => stage.status === "Completed")
    .map((stage) => stage.id);

  const [completedIds, setCompletedIds] = useState<number[]>(initialCompleted);

  useEffect(() => {
    const validIds = new Set(roadmap.map((stage) => stage.id));

    const loadProgress = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
          const parsed: unknown = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            setCompletedIds([
              ...new Set([
                ...initialCompleted,
                ...parsed.filter(
                  (id): id is number =>
                    typeof id === "number" && validIds.has(id)
                ),
              ]),
            ]);
          }
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCompleted));
        }
      } catch {
        console.error("Could not load learning progress.");
      }
    };

    loadProgress();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) loadProgress();
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const nextStage = roadmap.find(
    (stage) =>
      !completedIds.includes(stage.id) && stage.status !== "Final Goal"
  );

  const getStatus = (stage: RoadmapStage): StageStatus => {
    if (completedIds.includes(stage.id)) return "Completed";
    if (stage.status === "Final Goal") return "Final Goal";
    if (stage.id === nextStage?.id) return "Recommended Next";
    return "Upcoming";
  };

  const completeStage = (id: number) => {
    const updated = [...new Set([...completedIds, id])];
    setCompletedIds(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      console.error("Could not save learning progress.");
    }
  };

  const completed = roadmap.filter((stage) =>
    completedIds.includes(stage.id)
  ).length;

  const percent = roadmap.length
    ? Math.round((completed / roadmap.length) * 100)
    : 0;

  const totalWeeks = roadmap.reduce(
    (total, stage) =>
      total + Number(stage.duration.match(/\d+/)?.[0] ?? 0),
    0
  );

  const remainingWeeks = roadmap
    .filter((stage) => !completedIds.includes(stage.id))
    .reduce(
      (total, stage) =>
        total + Number(stage.duration.match(/\d+/)?.[0] ?? 0),
      0
    );

  const finishDate = new Date();
  finishDate.setDate(finishDate.getDate() + remainingWeeks * 7);

  const estimatedFinish = new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(finishDate);

  const focusStages = roadmap.filter(
    (stage) => getStatus(stage) === "Recommended Next"
  ).length;

  const fundamentalsScore = skills.find(
    (skill) => skill.name === roadmap[0]?.title
  )?.score;

  return (
    <AppShell>
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-200">
            <Server className="h-4 w-4" />
            Career goal: {student.careerGoal}
          </span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Your Personalized Learning Path
          </h1>
          <p className="mt-2 max-w-2xl text-slate-500">
            Follow your learning stages, complete each step and track your progress.
          </p>
        </div>
        <Link
          href="/career"
          className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
        >
          Change career goal
        </Link>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-ink">Your learning progress</h2>
            <p className="mt-1 text-sm text-slate-500">
              {completed} of {roadmap.length} stages completed
            </p>
          </div>
          <p className="text-2xl font-bold text-brand-600">{percent}%</p>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-brand-600 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ol className="relative">
            {roadmap.map((stage, index) => {
              const status = getStatus(stage);
              const isNext = status === "Recommended Next";
              const isLast = index === roadmap.length - 1;
              const isDone = status === "Completed";

              return (
                <li key={stage.id} className="relative flex gap-5 pb-6">
                  {!isLast && (
                    <span
                      className={`absolute left-5 top-10 -ml-px h-[calc(100%-2.5rem)] w-0.5 ${
                        isDone ? "bg-emerald-400" : "bg-slate-200"
                      }`}
                    />
                  )}

                  <div className="relative z-10 shrink-0">
                    <StageMarker stage={stage} status={status} />
                  </div>

                  <div
                    className={`flex-1 rounded-2xl border bg-white p-5 transition sm:p-6 ${
                      isNext
                        ? "border-brand-600 shadow-lg shadow-brand-600/10 ring-1 ring-brand-600"
                        : "border-slate-200 shadow-sm"
                    } ${status === "Upcoming" ? "opacity-90" : ""}`}
                  >
                    {isNext && (
                      <p className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600">
                        <Sparkles className="h-4 w-4" /> Recommended next step
                      </p>
                    )}

                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-400">
                          Stage {stage.id}
                        </p>
                        <h2 className="mt-1 text-lg font-semibold text-ink">
                          {stage.title}
                        </h2>
                      </div>
                      <Badge tone={statusTone(status)}>{status}</Badge>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {stage.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <Badge tone={difficultyTone(stage.difficulty)}>
                        {stage.difficulty}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="h-4 w-4" />
                        {stage.duration}
                      </span>
                      {stage.topics.map((topic) => (
                        <span
                          key={topic}
                          className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    {isNext && (
                      <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                        <button
                          onClick={() => completeStage(stage.id)}
                          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
                        >
                          Mark as completed <CircleCheck className="h-4 w-4" />
                        </button>
                        <Link
                          href="/resources"
                          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                        >
                          View resources <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    )}

                    {isDone && (
                      <p className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-600">
                        <CircleCheck className="h-4 w-4" />
                        Successfully completed
                      </p>
                    )}

                    {status === "Upcoming" && (
                      <p className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                        <Lock className="h-4 w-4" />
                        Complete the previous stage to continue
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-ink">Progress summary</h3>

            <div className="mt-6 flex items-center gap-5">
              <div className="relative h-24 w-24">
                <svg viewBox="0 0 36 36" className="h-24 w-24 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${percent} 100`}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-ink">
                  {percent}%
                </span>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-slate-500">
                  <strong className="text-ink">{completed}</strong> completed
                </p>
                <p className="text-slate-500">~{totalWeeks} weeks total</p>
                <p className="text-slate-500">~{remainingWeeks} weeks left</p>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Completed</span>
                <strong className="text-emerald-600">{completed}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">In focus</span>
                <strong className="text-brand-600">{focusStages}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Upcoming</span>
                <strong>{roadmap.filter((stage) => getStatus(stage) === "Upcoming").length}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated finish</span>
                <strong>{estimatedFinish}</strong>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-ink">Why this order?</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {fundamentalsScore !== undefined
                ? `Your ${roadmap[0]?.title} score is ${fundamentalsScore}%. Follow the recommended learning order and complete each stage to build your career skills.`
                : "Each stage builds on the skills needed for your career goal."}
            </p>
          </div>

          <div className="rounded-2xl bg-ink p-6 text-white">
            <Trophy className="h-6 w-6 text-brand-200" />
            <h3 className="mt-3 font-semibold">Your final goal</h3>
            <p className="mt-2 text-sm text-slate-300">
              Complete your learning path and build a portfolio-ready project.
            </p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
