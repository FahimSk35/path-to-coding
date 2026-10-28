import Link from "next/link";
import {
  ArrowRight,
  ChartColumn,
  ClipboardCheck,
  Compass,
  Map as MapIcon,
  Target,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// The five steps of the user journey.
const journey = [
  {
    icon: ClipboardCheck,
    title: "Assess programming knowledge",
    text: "The student answers multiple-choice questions on fundamentals, loops, functions, OOP, data structures, databases, APIs and web development.",
    href: "/assessment",
    cta: "Try the assessment",
  },
  {
    icon: ChartColumn,
    title: "Build a skill profile",
    text: "Answers are grouped by topic to produce a score for each skill area, showing an overall level and the strongest skills.",
    href: "/skills",
    cta: "View a skill profile",
  },
  {
    icon: Target,
    title: "Identify knowledge gaps",
    text: "Scores are compared with what the chosen career needs. Each gap gets a High, Medium or Low priority.",
    href: "/dashboard",
    cta: "See skill gaps",
  },
  {
    icon: Compass,
    title: "Select a career goal",
    text: "The student chooses a target role such as Frontend, Backend, Full-Stack, Data Analyst or Machine Learning Engineer.",
    href: "/career",
    cta: "Choose a career",
  },
  {
    icon: MapIcon,
    title: "View a recommended learning roadmap",
    text: "The system orders topics into a step-by-step path, highlighting the single most useful next step.",
    href: "/roadmap",
    cta: "Open the roadmap",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-white">
      <SiteHeader />

      <section className="border-b border-slate-100 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-sm font-semibold text-brand-600">About the project</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
            How Path To Coding works
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Many students learn programming from random tutorials without knowing what to
            study next. Path To Coding gives every learner a clear picture of their current
            skills and a personal route toward the career they want.
          </p>

          {/* The core idea in one line */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold">
            {["Assess Skills", "Understand Gaps", "Choose Career Goal", "View Roadmap"].map((item, i, arr) => (
              <span key={item} className="flex items-center gap-2">
                <span className="rounded-full bg-white px-4 py-2 text-ink ring-1 ring-slate-200">{item}</span>
                {i < arr.length - 1 && <ArrowRight className="h-4 w-4 text-brand-500" />}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-step journey */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-ink">The user journey</h2>
          <ol className="mt-10 space-y-5">
            {journey.map((step, index) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-4 sm:w-14 sm:flex-col sm:gap-1">
                    <span className="text-xs font-bold text-slate-400">STEP</span>
                    <span className="text-3xl font-extrabold text-brand-600">{index + 1}</span>
                  </div>
                  <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 sm:flex">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{step.text}</p>
                  </div>
                  <Link
                    href={step.href}
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
                  >
                    {step.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </li>
              );
            })}
          </ol>

          {/* Scope of this prototype */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-semibold text-ink">In this prototype</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Complete visual design of every main screen</li>
                <li>• Working navigation, assessment and resource search</li>
                <li>• Realistic sample data for a fictional student</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-semibold text-ink">Planned for later phases</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• User accounts and saved progress</li>
                <li>• Real scoring from assessment answers</li>
                <li>• Smarter roadmap recommendations</li>
              </ul>
            </div>
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
