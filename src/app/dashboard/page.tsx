
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, BookOpen, CircleCheck, ClipboardCheck, Clock,
  Compass, Flame, Gauge, Server, Sparkles, Target, TrendingUp
} from "lucide-react";
import AppShell from "@/components/AppShell";
import Badge, { priorityTone, statusTone } from "@/components/Badge";
import ProgressBar from "@/components/ProgressBar";
import { roadmap, skillGaps, skills, student, weeklyActivity } from "@/data/mockData";

const STORAGE_KEY = "path-to-coding-completed-stages";

const quickLinks = [
  { label: "Retake assessment", href: "/assessment", icon: ClipboardCheck },
  { label: "View skill profile", href: "/skills", icon: Gauge },
  { label: "Change career goal", href: "/career", icon: Compass },
  { label: "Browse resources", href: "/resources", icon: BookOpen },
];

export default function DashboardPage() {
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

  const completedStages = roadmap.filter((stage) =>
    completedIds.includes(stage.id)
  ).length;

  const roadmapProgress = roadmap.length
    ? Math.round((completedStages / roadmap.length) * 100)
    : 0;

  const nextStage = roadmap.find(
    (stage) =>
      !completedIds.includes(stage.id) && stage.status !== "Final Goal"
  );

  const nextSkillScore = skills.find(
    (skill) => skill.name === nextStage?.title
  )?.score;

  const maxHours = Math.max(1, ...weeklyActivity.map((d) => d.hours));

  const stats = [
    {
      label: "Overall skill score",
      value: `${student.overallScore}%`,
      note: "Based on your assessment",
      icon: Gauge,
    },
    {
      label: "Stages completed",
      value: `${completedStages}/${roadmap.length}`,
      note: `${roadmapProgress}% roadmap progress`,
      icon: CircleCheck,
    },
    {
      label: "Study time this week",
      value: `${student.hoursThisWeek} h`,
      note: "Goal: 8 hours",
      icon: Clock,
    },
    {
      label: "Learning streak",
      value: `${student.streakDays} days`,
      note: "Keep learning!",
      icon: Flame,
    },
  ];

  const today = new Intl.DateTimeFormat("en", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <AppShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{today}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Welcome back, {student.name}
          </h1>
          <p className="mt-2 text-slate-500">
            You have completed{" "}
            <span className="font-semibold text-ink">{roadmapProgress}%</span>{" "}
            of your learning roadmap.
          </p>
        </div>
        <Link
          href="/roadmap"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Continue Learning <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <Icon className="h-5 w-5 text-slate-400" />
              </div>
              <p className="mt-3 text-2xl font-bold text-ink">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-500">{stat.note}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <div className="relative overflow-hidden rounded-2xl bg-ink p-6 text-white sm:p-8">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-600/30" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-brand-100">
                <Sparkles className="h-4 w-4" /> Personalized next step
              </span>
              <h2 className="mt-4 text-xl font-semibold sm:text-2xl">
                {nextStage
                  ? `Your next focus: ${nextStage.title}`
                  : "Congratulations! You completed your learning stages."}
              </h2>
              <p className="mt-3 text-sm text-slate-300">
                {nextSkillScore !== undefined
                  ? `Your current ${nextStage?.title} score is ${nextSkillScore}%. Focus on improving this skill to move forward.`
                  : "Continue developing your skills and building practical projects."}
              </p>
              <Link
                href="/roadmap"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-ink hover:bg-brand-50"
              >
                View Learning Roadmap <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-ink">Current skill levels</h2>
            <p className="mt-1 text-sm text-slate-500">
              Your assessment results
            </p>
            <div className="mt-6 space-y-5">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-700">{skill.name}</span>
                    <span className="font-semibold text-ink">{skill.score}%</span>
                  </div>
                  <ProgressBar value={skill.score} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-ink">Learning roadmap</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {completedStages} of {roadmap.length} stages completed
                </p>
              </div>
              <Link href="/roadmap" className="text-sm font-semibold text-brand-600">
                View all
              </Link>
            </div>
            <div className="mt-4">
              <ProgressBar value={roadmapProgress} />
              <p className="mt-2 text-right text-sm font-semibold text-brand-600">
                {roadmapProgress}%
              </p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              {roadmap.slice(0, 4).map((stage) => {
                const done = completedIds.includes(stage.id);
                const status = done
                  ? "Completed"
                  : stage.id === nextStage?.id
                    ? "Recommended Next"
                    : stage.status === "Final Goal"
                      ? "Final Goal"
                      : "Upcoming";

                return (
                  <div key={stage.id} className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs text-slate-400">Stage {stage.id}</p>
                    <p className="mt-1 text-sm font-semibold text-ink">{stage.title}</p>
                    <div className="mt-3">
                      <Badge tone={statusTone(status)}>{status}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <Server className="h-6 w-6 text-brand-600" />
              <div>
                <p className="text-xs text-slate-500">Career goal</p>
                <p className="font-semibold text-ink">{student.careerGoal}</p>
              </div>
            </div>
            <div className="mt-5 flex justify-between text-sm">
              <span className="text-slate-500">Readiness score</span>
              <span className="font-semibold">{student.overallScore}%</span>
            </div>
            <ProgressBar value={student.overallScore} />
            <Link href="/career" className="mt-5 inline-block text-sm font-semibold text-brand-600">
              Change career goal
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-rose-500" />
              <h2 className="font-semibold text-ink">Your Skill Gaps</h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Skills to improve
            </p>
            <ul className="mt-5 space-y-4">
              {skillGaps.map((gap) => (
                <li key={gap.skill}>
                  <div className="flex justify-between gap-2">
                    <span className="text-sm font-medium">{gap.skill}</span>
                    <Badge tone={priorityTone(gap.priority)}>{gap.priority}</Badge>
                  </div>
                  <div className="relative mt-2 h-2 rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-slate-400" style={{ width: `${gap.score}%` }} />
                    <div className="absolute -top-1 h-4 w-0.5 bg-ink" style={{ left: `${gap.target}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {gap.score}% now · Target {gap.target}%
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-ink">Weekly activity</h2>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <TrendingUp className="h-4 w-4" /> {student.hoursThisWeek} h
              </span>
            </div>
            <div className="mt-6 flex h-32 items-end justify-between gap-2">
              {weeklyActivity.map((d) => (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-24 w-full items-end">
                    <div
                      className={`w-full rounded-md ${d.hours === maxHours ? "bg-brand-600" : "bg-brand-200"}`}
                      style={{ height: `${Math.max((d.hours / maxHours) * 100, 4)}%` }}
                      title={`${d.hours} hours`}
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-ink">Quick links</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.href} href={link.href} className="flex flex-col gap-2 rounded-xl border border-slate-200 p-3 text-sm font-medium text-slate-700 hover:border-brand-200 hover:bg-brand-50">
                    <Icon className="h-5 w-5 text-brand-600" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
