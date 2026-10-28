import Link from "next/link";
import { ArrowRight, Award, ClipboardCheck, TrendingDown, TrendingUp } from "lucide-react";
import AppShell from "@/components/AppShell";
import Badge from "@/components/Badge";
import ProgressBar from "@/components/ProgressBar";
import { skills, student } from "@/data/mockData";

// Turn a score into a level name.
function levelFor(score: number) {
  if (score >= 75) return "Advanced";
  if (score >= 55) return "Intermediate";
  if (score >= 40) return "Developing";
  return "Beginner";
}

// ---------------------------------------------------------------
// SkillRadar: a "spider" chart drawn with plain SVG (no library).
// Each skill gets one spoke; the further the dot, the higher the score.
// ---------------------------------------------------------------
function SkillRadar() {
  const size = 300;
  const center = size / 2;
  const radius = 105;
  const count = skills.length;

  // Convert a spoke number + a value (0–100) into an x/y point.
  function point(index: number, value: number) {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    const r = (value / 100) * radius;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  }

  // Build an SVG polygon string like "150,45 250,120 ..."
  function polygon(value: (i: number) => number) {
    return skills
      .map((_, i) => {
        const p = point(i, value(i));
        return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      })
      .join(" ");
  }

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-[320px]">
      {/* Background rings at 25%, 50%, 75%, 100% */}
      {[25, 50, 75, 100].map((ring) => (
        <polygon key={ring} points={polygon(() => ring)} fill="none" stroke="#e2e8f0" strokeWidth="1" />
      ))}

      {/* Spokes */}
      {skills.map((_, i) => {
        const end = point(i, 100);
        return <line key={i} x1={center} y1={center} x2={end.x} y2={end.y} stroke="#e2e8f0" />;
      })}

      {/* Target for Backend Developer (dashed) */}
      <polygon
        points={polygon((i) => [80, 75, 70, 75, 70][i])}
        fill="none"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      {/* Student's scores */}
      <polygon
        points={polygon((i) => skills[i].score)}
        fill="rgba(79, 70, 229, 0.15)"
        stroke="#4f46e5"
        strokeWidth="2"
      />
      {skills.map((skill, i) => {
        const p = point(i, skill.score);
        return <circle key={skill.name} cx={p.x} cy={p.y} r="4" fill="#4f46e5" stroke="#fff" strokeWidth="2" />;
      })}

      {/* Labels */}
      {skills.map((skill, i) => {
        const p = point(i, 128);
        return (
          <text
            key={skill.name}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-600 text-[11px] font-semibold"
          >
            {skill.short}
          </text>
        );
      })}
    </svg>
  );
}

export default function SkillsPage() {
  // Sort a copy of the skills from highest to lowest score.
  const sorted = [...skills].sort((a, b) => b.score - a.score);
  const strongest = sorted.slice(0, 2);
  const weakest = sorted.slice(-2).reverse();

  return (
    <AppShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-brand-600">Skill profile</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">My Skills</h1>
          <p className="mt-2 text-slate-500">
            Based on your assessment on {student.assessmentDate}.
          </p>
        </div>
        <Link
          href="/assessment"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
        >
          <ClipboardCheck className="h-4 w-4" /> Retake assessment
        </Link>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* Radar + level explanation */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="font-semibold text-ink">Skill overview</h2>
          <SkillRadar />
          <div className="mt-2 flex justify-center gap-5 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-600" /> Your level
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-0 w-4 border-t-2 border-dashed border-slate-400" /> Backend target
            </span>
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 p-5">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-brand-600" />
              <p className="font-semibold text-ink">Current level: {student.level}</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Fahim writes working programs and understands core logic well. The next challenge
              is organising larger programs (OOP), storing data efficiently (data structures)
              and working with databases — the core of backend development.
            </p>
          </div>
        </div>

        {/* Strongest / weakest + category cards */}
        <div className="space-y-6 lg:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                <TrendingUp className="h-4 w-4" /> Strongest skills
              </p>
              <ul className="mt-4 space-y-3">
                {strongest.map((s) => (
                  <li key={s.name} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-ink">{s.name}</span>
                    <span className="font-bold text-emerald-700">{s.score}%</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-rose-700">
                <TrendingDown className="h-4 w-4" /> Needs improvement
              </p>
              <ul className="mt-4 space-y-3">
                {weakest.map((s) => (
                  <li key={s.name} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-ink">{s.name}</span>
                    <span className="font-bold text-rose-700">{s.score}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-4">
              <h2 className="font-semibold text-ink">Skill categories</h2>
            </div>
            <ul className="divide-y divide-slate-100">
              {skills.map((skill) => (
                <li key={skill.name} className="px-6 py-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-medium text-ink">{skill.name}</p>
                      <p className="text-sm text-slate-500">{skill.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        tone={
                          skill.score >= 75 ? "green" : skill.score >= 55 ? "indigo" : skill.score >= 40 ? "amber" : "red"
                        }
                      >
                        {levelFor(skill.score)}
                      </Badge>
                      <span className="w-10 text-right text-sm font-bold text-ink">{skill.score}%</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <ProgressBar value={skill.score} size="sm" />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/roadmap"
            className="flex items-center justify-between rounded-2xl border border-brand-200 bg-brand-50 p-5 transition hover:bg-brand-100"
          >
            <div>
              <p className="font-semibold text-ink">See how to close these gaps</p>
              <p className="text-sm text-slate-600">Your roadmap targets the weakest skills first.</p>
            </div>
            <ArrowRight className="h-5 w-5 text-brand-600" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
