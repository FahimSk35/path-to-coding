import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  Clock,
  Lock,
  Server,
  Sparkles,
  Trophy,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import Badge, { difficultyTone, statusTone } from "@/components/Badge";
import DemoButton from "@/components/DemoButton";
import { roadmap, student, type RoadmapStage } from "@/data/mockData";

// The round marker on the timeline. Its look depends on the stage status.
function StageMarker({ stage }: { stage: RoadmapStage }) {
  if (stage.status === "Completed") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white ring-4 ring-slate-50">
        <CircleCheck className="h-5 w-5" />
      </span>
    );
  }
  if (stage.status === "Recommended Next") {
    return (
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white ring-4 ring-brand-100">
        <span className="absolute inset-0 animate-ping rounded-full bg-brand-400 opacity-30" />
        {stage.id}
      </span>
    );
  }
  if (stage.status === "Final Goal") {
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
  const completed = roadmap.filter((s) => s.status === "Completed").length;
  const percent = Math.round((completed / roadmap.length) * 100);

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-200">
            <Server className="h-3.5 w-3.5" /> Career goal: {student.careerGoal}
          </span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Your Personalized Learning Path
          </h1>
          <p className="mt-2 max-w-2xl text-slate-500">
            Your next steps, organized around your current skills and career goal.
          </p>
        </div>
        <Link
          href="/career"
          className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
        >
          Change career goal
        </Link>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* TIMELINE */}
        <div className="lg:col-span-2">
          <ol className="relative">
            {roadmap.map((stage, index) => {
              const isNext = stage.status === "Recommended Next";
              const isLastStage = index === roadmap.length - 1;
              const isDone = stage.status === "Completed";

              return (
                <li key={stage.id} className="relative flex gap-5 pb-6">
                  {/* Vertical connecting line (not drawn after the last stage) */}
                  {!isLastStage && (
                    <span
                      className={`absolute left-5 top-10 -ml-px h-[calc(100%-2.5rem)] w-0.5 ${
                        isDone ? "bg-emerald-400" : "bg-slate-200"
                      }`}
                    />
                  )}

                  <div className="relative z-10 shrink-0">
                    <StageMarker stage={stage} />
                  </div>

                  {/* Stage card */}
                  <div
                    className={`flex-1 rounded-2xl border bg-white p-5 transition sm:p-6 ${
                      isNext
                        ? "border-brand-600 shadow-lg shadow-brand-600/10 ring-1 ring-brand-600"
                        : "border-slate-200 shadow-sm hover:shadow-md"
                    } ${stage.status === "Upcoming" ? "opacity-90" : ""}`}
                  >
                    {isNext && (
                      <p className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600">
                        <Sparkles className="h-3.5 w-3.5" /> Start here
                      </p>
                    )}
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-400">Stage {stage.id}</p>
                        <h2 className="mt-0.5 text-lg font-semibold text-ink">{stage.title}</h2>
                      </div>
                      <Badge tone={statusTone(stage.status)}>{stage.status}</Badge>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{stage.description}</p>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <Badge tone={difficultyTone(stage.difficulty)}>{stage.difficulty}</Badge>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                        <Clock className="h-3.5 w-3.5" /> {stage.duration}
                      </span>
                      <span className="text-slate-300">·</span>
                      {stage.topics.map((topic) => (
                        <span key={topic} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* Actions only for the recommended stage */}
                    {isNext && (
                      <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                        <DemoButton variant="primary" message="Demo only — lessons will be added in a later phase.">
                          Start Learning <ArrowRight className="h-4 w-4" />
                        </DemoButton>
                        <Link
                          href="/resources"
                          className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                        >
                          View resources
                        </Link>
                      </div>
                    )}
                    {stage.status === "Upcoming" && (
                      <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
                        <Lock className="h-3.5 w-3.5" /> Unlocks after the previous stage
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* SIDE PANEL */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-ink">Progress summary</h3>

            {/* Circular progress ring drawn with SVG */}
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
                  <span className="font-semibold text-ink">{completed}</span> of {roadmap.length} stages complete
                </p>
                <p className="text-slate-500">
                  <span className="font-semibold text-ink">~24 weeks</span> total
                </p>
                <p className="text-slate-500">
                  <span className="font-semibold text-ink">~21 weeks</span> remaining
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Completed</span>
                <span className="font-semibold text-emerald-600">{completed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">In focus</span>
                <span className="font-semibold text-brand-600">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Upcoming</span>
                <span className="font-semibold text-slate-700">
                  {roadmap.filter((s) => s.status === "Upcoming").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated finish</span>
                <span className="font-semibold text-slate-700">April 2027</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-ink">Why this order?</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Your fundamentals are strong (78%), so they are marked complete. OOP (52%) is the
              biggest building block for backend work, so it comes next. Data structures and SQL
              follow because they are your largest gaps.
            </p>
          </div>

          <div className="rounded-2xl bg-ink p-6 text-white">
            <Trophy className="h-6 w-6 text-brand-200" />
            <h3 className="mt-3 font-semibold">Final goal</h3>
            <p className="mt-1.5 text-sm text-slate-300">
              A portfolio-ready backend project that shows employers what you can build.
            </p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
