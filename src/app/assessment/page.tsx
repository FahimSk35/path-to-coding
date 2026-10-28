"use client";
// "use client" is needed because this page uses state (it remembers
// which question you are on and which answers you picked).

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheck,
  Clock,
  Flag,
  Lightbulb,
  RotateCcw,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import Badge from "@/components/Badge";
import { questions } from "@/data/mockData";

const letters = ["A", "B", "C", "D"];

export default function AssessmentPage() {
  // Which question is showing (0 = first question).
  const [current, setCurrent] = useState(0);

  // The chosen answer for each question. null means "not answered yet".
  // Example after answering Q1 with B: [1, null, null, ...]
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );

  // Becomes true after the last question is submitted.
  const [finished, setFinished] = useState(false);

  const question = questions[current];
  const answeredCount = answers.filter((a) => a !== null).length;
  const progress = Math.round((answeredCount / questions.length) * 100);
  const isLast = current === questions.length - 1;

  // Event handler: save the option the student clicked.
  function selectOption(optionIndex: number) {
    const updated = [...answers]; // copy the array
    updated[current] = optionIndex;
    setAnswers(updated);
  }

  function goNext() {
    if (isLast) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
    }
  }

  function goPrevious() {
    if (current > 0) setCurrent(current - 1);
  }

  function restart() {
    setAnswers(Array(questions.length).fill(null));
    setCurrent(0);
    setFinished(false);
  }

  // ---------- Results screen (shown after the last question) ----------
  if (finished) {
    const correct = answers.filter((a, i) => a === questions[i].answer).length;
    const score = Math.round((correct / questions.length) * 100);

    return (
      <AppShell>
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <CircleCheck className="h-9 w-9 text-emerald-500" />
          </span>
          <h1 className="mt-6 text-2xl font-bold text-ink">Assessment complete</h1>
          <p className="mt-2 text-slate-500">
            You answered {correct} of {questions.length} questions correctly.
          </p>

          <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-2xl font-bold text-ink">{score}%</p>
              <p className="text-xs text-slate-500">Score</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-2xl font-bold text-ink">{answeredCount}</p>
              <p className="text-xs text-slate-500">Answered</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-2xl font-bold text-ink">8</p>
              <p className="text-xs text-slate-500">Topics</p>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-md rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-700">
            Prototype note: the dashboard shows a sample skill profile for Alex. In the final
            system, your real answers would generate it.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              View My Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              onClick={restart}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" /> Retake
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  // ---------- Question screen ----------
  return (
    <AppShell>
      {/* Page heading */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-brand-600">Skill Assessment</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Programming Skill Assessment
          </h1>
          <p className="mt-2 max-w-2xl text-slate-500">
            Choose the best answer for each question. There is no time pressure — answer
            honestly so your roadmap matches your real level.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
          <Clock className="h-4 w-4 text-slate-400" />
          About 10 minutes
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Main question card */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Progress header */}
            <div className="border-b border-slate-100 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-ink">
                    Question {current + 1} of {questions.length}
                  </span>
                  <Badge tone="indigo">{question.category}</Badge>
                </div>
                <span className="text-sm text-slate-500">{progress}% complete</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-brand-600 transition-all duration-500"
                  style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* The question */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold leading-snug text-ink">{question.question}</h2>

              {/* Optional code snippet */}
              {question.code && (
                <pre className="mt-5 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-sm leading-relaxed text-slate-100">
                  <code>{question.code}</code>
                </pre>
              )}

              {/* Answer options */}
              <div className="mt-6 space-y-3">
                {question.options.map((option, index) => {
                  const selected = answers[current] === index;
                  return (
                    <button
                      key={option}
                      onClick={() => selectOption(index)}
                      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                        selected
                          ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${
                          selected ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {selected ? <Check className="h-4 w-4" /> : letters[index]}
                      </span>
                      <span
                        className={`text-[15px] ${
                          selected ? "font-semibold text-brand-700" : "text-slate-700"
                        }`}
                      >
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Previous / Next */}
            <div className="flex items-center justify-between border-t border-slate-100 p-6">
              <button
                onClick={goPrevious}
                disabled={current === 0}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </button>
              <button
                onClick={goNext}
                disabled={answers[current] === null}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {isLast ? "Finish Assessment" : "Next"}
                {isLast ? <Flag className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Side panel: progress overview */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-ink">Your progress</h3>
            <p className="mt-1 text-sm text-slate-500">
              {answeredCount} of {questions.length} answered
            </p>

            {/* Question number grid – click a number to jump to it */}
            <div className="mt-5 grid grid-cols-5 gap-2">
              {questions.map((q, index) => {
                const isCurrent = index === current;
                const isAnswered = answers[index] !== null;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrent(index)}
                    className={`flex h-10 items-center justify-center rounded-lg text-sm font-semibold transition ${
                      isCurrent
                        ? "bg-brand-600 text-white"
                        : isAnswered
                        ? "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200"
                        : "bg-slate-50 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-brand-600" /> Current
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-brand-200" /> Answered
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-slate-200" /> Not yet
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-ink">Topics covered</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
              {[
                "Programming Fundamentals",
                "Loops",
                "Object-Oriented Programming",
                "Data Structures",
                "Databases & SQL",
                "APIs",
                "Web Development",
              ].map((topic) => (
                <li key={topic} className="flex items-center gap-2.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      topic === question.category ? "bg-brand-600" : "bg-slate-300"
                    }`}
                  />
                  <span className={topic === question.category ? "font-semibold text-ink" : ""}>
                    {topic}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <Lightbulb className="h-5 w-5 shrink-0 text-amber-600" />
            <p className="text-sm leading-relaxed text-amber-800">
              Not sure? Pick your best guess. The goal is to find gaps, not to get a perfect
              score.
            </p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
