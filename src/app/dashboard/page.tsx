import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CircleCheck,
  ClipboardCheck,
  Clock,
  Compass,
  Flame,
  Gauge,
  Server,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import Badge, { priorityTone, statusTone } from "@/components/Badge";
import ProgressBar from "@/components/ProgressBar";
import { roadmap, skillGaps, skills, student, weeklyActivity } from "@/data/mockData";

// Summary numbers shown at the top of the dashboard.
const stats = [
  { label: "Overall skill score", value: `${student.overallScore}%`, note: "+6% since last month", icon: Gauge },
  { label: "Topics completed", value: student.completedTopics, note: "of 48 in your roadmap", icon: CircleCheck },
  { label: "Study time this week", value: `${student.hoursThisWeek} h`, note: "Goal: 8 hours", icon: Clock },
  { label: "Learning streak", value: `${student.streakDays} days`, note: "Keep it going!", icon: Flame },
];

const quickLinks = [
  { label: "Retake assessment", href: "/assessment", icon: ClipboardCheck },
  { label: "View skill profile", href: "/skills", icon: Gauge },
  { label: "Change career goal", href: "/career", icon: Compass },
  { label: "Browse resources", href: "/resources", icon: BookOpen },
];

export default function DashboardPage() {
  // Tallest bar in the activity chart, so other bars can be sized relative to it.
  const maxHours = Math.max(...weeklyActivity.map((d) => d.hours));

  return (
    <AppShell>
      {/* Welcome header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Wednesday, 21 October</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Welcome back, {student.name}
          </h1>
          <p className="mt-2 text-slate-500">
            You are <span className="font-semibold text-ink">14% of the way</span> to becoming a{" "}
            {student.careerGoal}. One stage done, six to go.
          </p>
        </div>
        <Link
          href="/roadmap"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
        >
          Continue Learning <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <Icon className="h-[18px] w-[18px] text-slate-400" />
              </div>
              <p className="mt-3 text-2xl font-bold text-ink">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-500">{stat.note}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        {/* LEFT COLUMN (2/3 width) */}
        <div className="space-y-6 xl:col-span-2">
          {/* Recommended next step */}
          <div className="relative overflow-hidden rounded-2xl bg-ink p-6 text-white sm:p-8">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-600/30" />
            <div className="absolute -bottom-16 right-20 h-32 w-32 rounded-full bg-brand-500/20" />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-brand-100">
                <Sparkles className="h-3.5 w-3.5" /> Recommended Next Step
              </span>
              <h2 className="mt-4 max-w-xl text-xl font-semibold leading-snug sm:text-2xl">
                Strengthen your Object-Oriented Programming fundamentals before moving to
                advanced backend concepts.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-slate-300">
                Your OOP score is 52%. Backend frameworks rely heavily on classes and objects,
                so this unlocks the rest of your roadmap.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/roadmap"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-brand-50"
                >
                  View Learning Roadmap <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/10"
                >
                  See OOP resources
                </Link>
              </div>
            </div>
          </div>

          {/* Skill levels */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-ink">Current skill levels</h2>
                <p className="text-sm text-slate-500">From your assessment on {student.assessmentDate}</p>
              </div>
              <Link href="/skills" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
                Details
              </Link>
            </div>
            <div className="mt-6 space-y-5">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{skill.name}</span>
                    <span className="font-semibold text-ink">{skill.score}%</span>
                  </div>
                  <ProgressBar value={skill.score} />
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" />Strong (70%+)</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-600" />Developing (50–69%)</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-500" />Needs work (40–49%)</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-500" />Weak (below 40%)</span>
            </div>
          </div>

          {/* Roadmap preview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-ink">Learning roadmap preview</h2>
              <Link href="/roadmap" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
                Full roadmap
              </Link>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              {roadmap.slice(0, 4).map((stage) => (
                <div
                  key={stage.id}
                  className={`rounded-xl border p-4 ${
                    stage.status === "Recommended Next"
                      ? "border-brand-600 bg-brand-50"
                      : "border-slate-200"
                  }`}
                >
                  <p className="text-xs font-semibold text-slate-400">Stage {stage.id}</p>
                  <p className="mt-1 text-sm font-semibold leading-snug text-ink">{stage.title}</p>
                  <div className="mt-3">
                    <Badge tone={statusTone(stage.status)}>{stage.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (1/3 width) */}
        <div className="space-y-6">
          {/* Career goal card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Server className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-slate-500">Career goal</p>
                <p className="font-semibold text-ink">{student.careerGoal}</p>
              </div>
            </div>
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-500">Readiness</span>
                <span className="font-semibold text-ink">48%</span>
              </div>
              <ProgressBar value={48} color="bg-brand-600" />
            </div>
            <Link
              href="/career"
              className="mt-5 inline-flex text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Change goal
            </Link>
          </div>

          {/* Skill gaps */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Target className="h-[18px] w-[18px] text-rose-500" />
              <h2 className="font-semibold text-ink">Your Skill Gaps</h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">Compared with Backend Developer targets</p>
            <ul className="mt-5 space-y-4">
              {skillGaps.map((gap) => (
                <li key={gap.skill}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-slate-700">{gap.skill}</span>
                    <Badge tone={priorityTone(gap.priority)}>{gap.priority}</Badge>
                  </div>
                  {/* Bar showing current score, with a marker at the target */}
                  <div className="relative mt-2 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-slate-400"
                      style={{ width: `${gap.score}%` }}
                    />
                    <div
                      className="absolute -top-1 h-4 w-0.5 rounded bg-ink"
                      style={{ left: `${gap.target}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500">
                    {gap.score}% now · target {gap.target}%
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Weekly activity chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-ink">This week</h2>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <TrendingUp className="h-3.5 w-3.5" /> 7.5 h studied
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

          {/* Quick navigation */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-ink">Quick links</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex flex-col gap-2 rounded-xl border border-slate-200 p-3 text-sm font-medium text-slate-700 transition hover:border-brand-200 hover:bg-brand-50"
                  >
                    <Icon className="h-[18px] w-[18px] text-brand-600" />
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
