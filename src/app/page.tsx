import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChartColumn,
  CircleCheck,
  ClipboardCheck,
  Compass,
  Map as MapIcon,
  Route,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProgressBar from "@/components/ProgressBar";
import { skills } from "@/data/mockData";

// ----- Content for the landing page sections -----

const steps = [
  {
    icon: ClipboardCheck,
    title: "Assess Skills",
    text: "Answer a short programming assessment covering fundamentals to APIs.",
  },
  {
    icon: ChartColumn,
    title: "Understand Skill Gaps",
    text: "See your strengths and the exact topics holding you back.",
  },
  {
    icon: Compass,
    title: "Choose Career Goal",
    text: "Pick the role you want: frontend, backend, data and more.",
  },
  {
    icon: MapIcon,
    title: "View Learning Roadmap",
    text: "Follow a step-by-step path built around your goal and level.",
  },
];

const features = [
  {
    icon: Target,
    title: "Skill-gap detection",
    text: "Compare your current level with what your chosen career actually requires, and see priorities clearly.",
  },
  {
    icon: Route,
    title: "Personalized roadmaps",
    text: "Every learner gets a different path. Skip what you know and focus on what matters next.",
  },
  {
    icon: TrendingUp,
    title: "Progress tracking",
    text: "Watch your skill profile grow over time with clear scores, milestones and weekly activity.",
  },
  {
    icon: BookOpen,
    title: "Curated resources",
    text: "Find courses, videos, articles and practice sets matched to your level and your roadmap.",
  },
  {
    icon: Compass,
    title: "Career guidance",
    text: "Understand what different developer roles do and which skills each one depends on.",
  },
  {
    icon: Sparkles,
    title: "Clear next steps",
    text: "No more guessing what to learn. One recommended next step, always visible on your dashboard.",
  },
];

const journey = [
  { week: "Week 0", title: "Takes the assessment", text: "Scores 78% in fundamentals but only 35% in SQL." },
  { week: "Week 1", title: "Chooses Backend Developer", text: "The platform highlights OOP and databases as key gaps." },
  { week: "Weeks 2–4", title: "Strengthens OOP", text: "Follows the recommended stage with curated practice." },
  { week: "Week 16", title: "Builds a backend project", text: "Finishes the roadmap with a portfolio-ready API." },
];

// ----- A small fake "app window" used as the hero illustration -----
function HeroPreview() {
  const stages = [
    { label: "Fundamentals", state: "done" },
    { label: "Object-Oriented Programming", state: "next" },
    { label: "Data Structures", state: "todo" },
    { label: "SQL & Databases", state: "todo" },
  ];

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
        {/* Fake browser bar */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="ml-3 rounded-md bg-white px-3 py-1 text-[11px] text-slate-400 ring-1 ring-slate-200">
            pathtocoding.app/dashboard
          </span>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-5">
          {/* Skill bars */}
          <div className="rounded-xl border border-slate-100 p-4 sm:col-span-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">Skill profile</p>
              <span className="text-xs text-slate-400">Updated today</span>
            </div>
            <div className="mt-4 space-y-3.5">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="font-medium text-slate-600">{skill.short}</span>
                    <span className="font-semibold text-ink">{skill.score}%</span>
                  </div>
                  <ProgressBar value={skill.score} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Mini roadmap */}
          <div className="rounded-xl border border-slate-100 p-4 sm:col-span-2">
            <p className="text-sm font-semibold text-ink">Your roadmap</p>
            <p className="text-xs text-slate-400">Backend Developer</p>
            <ol className="mt-4 space-y-3">
              {stages.map((stage) => (
                <li key={stage.label} className="flex items-center gap-2.5">
                  {stage.state === "done" ? (
                    <CircleCheck className="h-5 w-5 shrink-0 text-emerald-500" />
                  ) : (
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        stage.state === "next" ? "border-brand-600" : "border-slate-200"
                      }`}
                    >
                      {stage.state === "next" && <span className="h-2 w-2 rounded-full bg-brand-600" />}
                    </span>
                  )}
                  <span
                    className={`text-xs ${
                      stage.state === "next" ? "font-semibold text-brand-700" : "text-slate-600"
                    }`}
                  >
                    {stage.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Floating recommendation card */}
      <div className="absolute -bottom-6 -left-4 hidden w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/10 sm:block">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50">
            <Sparkles className="h-4 w-4 text-brand-600" />
          </span>
          <p className="text-xs font-semibold text-ink">Recommended next step</p>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          Strengthen Object-Oriented Programming before advanced backend concepts.
        </p>
      </div>
    </div>
  );
}

// ----- The landing page itself -----
export default function HomePage() {
  return (
    <div className="bg-white">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pt-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-200">
              <Sparkles className="h-3.5 w-3.5" />
              Personalized programming learning & career guidance
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Find Your Path.
              <br />
              <span className="text-brand-600">Build Your Future.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Understand your programming skills, discover what to learn next, and build a
              learning path aligned with your career goals.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/assessment"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
              >
                Explore How It Works
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <CircleCheck className="h-4 w-4 text-emerald-500" /> 10-minute assessment
              </span>
              <span className="flex items-center gap-2">
                <CircleCheck className="h-4 w-4 text-emerald-500" /> 5 career paths
              </span>
              <span className="flex items-center gap-2">
                <CircleCheck className="h-4 w-4 text-emerald-500" /> Step-by-step roadmap
              </span>
            </div>
          </div>

          <HeroPreview />
        </div>
      </section>

      {/* HOW IT WORKS: 4 steps */}
      <section id="how" className="border-y border-slate-100 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-brand-600">How it works</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink">
              Four steps from “where am I?” to “what do I learn next?”
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="relative rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-3xl font-extrabold text-slate-100">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-brand-600">Features</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink">
              Everything a student needs to learn with direction
            </h2>
            <p className="mt-4 text-slate-500">
              Path To Coding replaces random tutorials with a clear, personal plan.
            </p>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{feature.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{feature.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SAMPLE LEARNING JOURNEY */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-brand-200">A sample learning journey</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Meet Fahim, a second-year CS student
            </h2>
            <p className="mt-4 text-slate-400">
              Fahim knew the basics but did not know what to learn next. Here is how Path To
              Coding turns that uncertainty into a plan.
            </p>
          </div>

          <div className="relative mt-14 grid gap-8 md:grid-cols-4">
            <div className="absolute left-0 right-0 top-[11px] hidden h-px bg-slate-700 md:block" />
            {journey.map((item, index) => (
              <div key={item.title} className="relative">
                <span
                  className={`relative flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-ink ${
                    index === journey.length - 1 ? "bg-emerald-400" : "bg-brand-500"
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {item.week}
                </p>
                <h3 className="mt-1 font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-brand-100 bg-brand-50 px-6 py-14 text-center sm:px-12">
            <h2 className="text-3xl font-bold tracking-tight text-ink">
              Ready to discover your path?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              Take the 10-question assessment and see your personalized skill profile and
              learning roadmap in minutes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/assessment"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
              >
                Start the Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
              >
                View Sample Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
