# Path To Coding — Beginner Setup & Code Guide

This guide explains how to run the Path To Coding prototype, how the code is organised, and what each important file does. You do **not** need to create the project from scratch — every file is already in this folder. Read Part 1 to get it running, then use Part 3 whenever you want to understand or change something.

**Contents**

1. Get it running (software, install, run, open in Chrome)
2. Folder structure
3. File-by-file explanations
4. Key concepts in plain English
5. How to change things (common edits)
6. Troubleshooting
7. Demonstrating to your teacher (screenshots + demo script)
8. Saving to GitHub
9. Appendix: creating a Next.js project from zero (for reference)

---

## 1. Get it running

### 1.1 Required software

| Software | Why you need it | Download |
|---|---|---|
| **Node.js** (version 18.18 or newer; the "LTS" version is best) | Runs the Next.js tools on your computer. Installing it also installs **npm**, the tool that downloads packages. | https://nodejs.org |
| **VS Code** | The code editor where you open and edit the files. | https://code.visualstudio.com |
| **Google Chrome** | To view the website. | https://www.google.com/chrome |
| **Git** (optional) | Only needed to save the project to GitHub (Part 8). | https://git-scm.com |

**Check what is installed.** Open a terminal (Windows: search for *PowerShell* or *Command Prompt*; Mac: *Terminal*) and type each line, pressing Enter after each:

```bash
node -v
npm -v
git --version
```

- `node -v` should print something like `v20.17.0` or `v22.x.x`. If it says *not recognized* or *command not found*, install Node.js from nodejs.org (choose **LTS**), then **close and reopen** the terminal and try again.
- `npm -v` should print a version such as `10.8.2`.
- `git --version` is only needed for GitHub.

### 1.2 Put the project on your computer

1. Unzip `path-to-coding.zip` somewhere easy to find, for example `Documents/path-to-coding`.
2. Open VS Code → **File → Open Folder…** → choose the `path-to-coding` folder (the one that contains `package.json`).
3. In VS Code open the built-in terminal: **Terminal → New Terminal** (or press <kbd>Ctrl</kbd> + <kbd>`</kbd>). The terminal opens *inside* the project folder, which is what we want.

### 1.3 Install the packages (only the first time)

```bash
npm install
```

This reads `package.json` and downloads Next.js, React, Tailwind CSS and Lucide icons into a new folder called `node_modules`. It needs internet and takes 1–3 minutes. Warnings in yellow are normal; only red **ERR!** lines are a problem (see Troubleshooting).

### 1.4 Start the website

```bash
npm run dev
```

After a few seconds you will see something like:

```
▲ Next.js 15.5.4
- Local:   http://localhost:3000
✓ Ready
```

Leave this terminal running. To stop the website later, click the terminal and press <kbd>Ctrl</kbd> + <kbd>C</kbd>.

### 1.5 Open it in Chrome

Go to **http://localhost:3000**. The first page load may take a few seconds because Next.js prepares the page on demand; after that it is fast.

`localhost` means "this computer". Nobody else can see the site — it only runs while `npm run dev` is running.

### 1.6 All the pages

| Page | Address | What it shows |
|---|---|---|
| Landing page | http://localhost:3000 | Product website: hero, 4 steps, features, sample journey, call to action |
| How It Works | http://localhost:3000/how-it-works | The 5-step user journey and prototype scope |
| Assessment | http://localhost:3000/assessment | 10-question interactive quiz with progress panel and results screen |
| Dashboard | http://localhost:3000/dashboard | "Welcome back, Fahim", stats, skills, skill gaps, recommendation, chart |
| My Skills | http://localhost:3000/skills | Radar chart, strongest/weakest skills, skill categories |
| Career Goal | http://localhost:3000/career | 5 career cards, Backend Developer selected |
| Learning Roadmap | http://localhost:3000/roadmap | 7-stage vertical timeline with progress ring |
| Resources | http://localhost:3000/resources | Search + category filters + resource cards |

**Navigating:** the landing and How It Works pages have a top navigation bar. All the app pages (assessment, dashboard, skills, career, roadmap, resources) share a **left sidebar**. On a phone-sized window the sidebar is hidden behind the ☰ menu button in the top-left.

### 1.7 What works and what is a demo

**Working:** all navigation; answering assessment questions, Previous/Next, jumping to a question number, the results screen and Retake; selecting a career card; searching and filtering resources (including the "No resources found" empty state); the mobile menus; hover effects.

**Demonstrational (clearly labelled):** "Start Learning" on the roadmap and "Explore Resource" on resource cards show a small message saying the feature comes in a later phase. All scores are sample data for the fictional student Fahim. The top bar shows a "Prototype · sample data" label so nobody mistakes it for a finished product.

---

## 2. Folder structure

```
path-to-coding/
├── package.json          ← list of packages + the "dev" command
├── tsconfig.json         ← TypeScript settings (incl. the "@/" shortcut)
├── next.config.ts        ← Next.js settings (empty for now)
├── postcss.config.mjs    ← connects Tailwind CSS to Next.js
├── .gitignore            ← files Git should NOT upload (e.g. node_modules)
├── GUIDE.md              ← this guide
├── README.md             ← short project summary
└── src/
    ├── app/                       ← every folder here = a page (route)
    │   ├── layout.tsx             ← wraps every page: font, <html>, <body>
    │   ├── globals.css            ← Tailwind + brand colours
    │   ├── icon.svg               ← browser-tab icon
    │   ├── page.tsx               ← /            Landing page
    │   ├── how-it-works/page.tsx  ← /how-it-works
    │   ├── assessment/page.tsx    ← /assessment
    │   ├── dashboard/page.tsx     ← /dashboard
    │   ├── skills/page.tsx        ← /skills
    │   ├── career/page.tsx        ← /career
    │   ├── roadmap/page.tsx       ← /roadmap
    │   └── resources/page.tsx     ← /resources
    ├── components/                ← reusable building blocks
    │   ├── AppShell.tsx           ← sidebar + top bar for app pages
    │   ├── SiteHeader.tsx         ← top navigation for website pages
    │   ├── SiteFooter.tsx         ← footer for website pages
    │   ├── Logo.tsx               ← the Path To Coding logo
    │   ├── Badge.tsx              ← small coloured labels (High, Completed…)
    │   ├── ProgressBar.tsx        ← horizontal skill bars
    │   └── DemoButton.tsx         ← button that shows "Demo only" message
    └── data/
        └── mockData.ts            ← ALL sample data (Fahim, scores, questions…)
```

Folders created automatically (do not edit or upload them): `node_modules/` (downloaded packages) and `.next/` (Next.js build cache).

**Why this structure?** It is the standard Next.js "App Router" layout, so tutorials and future teammates will recognise it. Pages live in `app`, reusable pieces in `components`, and all fake data in one `data` file — so in a later phase you can replace that single file with real data from a backend without redesigning the pages.

---

## 3. File-by-file explanations

The full code is in each file — open it in VS Code next to this guide. Files also contain short comments (lines starting with `//` or `{/* */}`) explaining sections.

### 3.1 `package.json`

**Purpose:** the project's "shopping list" and command list.

- `"scripts"` defines shortcuts. `npm run dev` runs `next dev` (development server with live reload), `npm run build` makes an optimised version, `npm run start` serves that optimised version.
- `"dependencies"` are packages the website needs: `next` (the framework), `react` + `react-dom` (the UI library), `lucide-react` (icons).
- `"devDependencies"` are tools only used while developing: `tailwindcss` and `@tailwindcss/postcss` (styling), `typescript` and the `@types/...` packages (type checking).

### 3.2 `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`

**Purpose:** settings files. You rarely need to touch them.

- `tsconfig.json` → `"strict": true` makes TypeScript catch mistakes early. `"paths": { "@/*": ["./src/*"] }` creates a shortcut: `@/components/Logo` means `src/components/Logo`, so you never write long paths like `../../components/Logo`.
- `next.config.ts` → empty settings object; it exists so you have a place for options later.
- `postcss.config.mjs` → tells the CSS processor to run Tailwind.

### 3.3 `src/app/globals.css`

**Purpose:** global styles and the design system.

- `@import "tailwindcss";` switches on Tailwind. Tailwind gives you ready-made classes such as `bg-white` (white background), `p-6` (padding), `rounded-2xl` (round corners), `text-sm` (small text), `md:grid-cols-2` (2 columns on medium screens and larger).
- `@theme { ... }` defines **our own** design tokens: the font and the `brand` colours. Because of this, classes like `bg-brand-600`, `text-brand-700` and `text-ink` exist. **Change the hex codes here to re-colour the whole website.**
- `.dot-grid` is the dotted background behind the landing hero. `@keyframes fade-up` + `.animate-fade-up` create the gentle fade-in used on page content and pop-up messages.

### 3.4 `src/app/layout.tsx`

**Purpose:** the outer wrapper of every page.

- `import { Plus_Jakarta_Sans } from "next/font/google"` loads a professional font. `variable: "--font-jakarta"` stores it in a CSS variable that `globals.css` uses.
- `export const metadata` sets the title shown in the Chrome tab.
- `RootLayout({ children })` is a **component** (a function that returns HTML-like code). `children` is the current page. Every page is placed inside `<body>` here.
- `Readonly<{ children: ReactNode }>` is a **TypeScript type**: it says "this component receives one prop called `children`, which is something React can display".

### 3.5 `src/data/mockData.ts`

**Purpose:** every piece of sample data, in one place.

- The `export type ...` blocks describe the **shape** of the data. For example `type Skill = { name: string; score: number; ... }` means every skill must have a text `name` and a number `score`. If you misspell a field, VS Code underlines it in red.
- `type Priority = "High" | "Medium" | "Low"` means a priority can **only** be one of those three words.
- `export const student = { ... }` is an **object** (a group of named values) for Fahim.
- `export const skills: Skill[] = [ ... ]` is an **array** (a list) of skill objects. `Skill[]` means "a list of Skill".
- `questions` holds the 10 assessment questions. `answer` is the **index** of the correct option — indexes start at 0, so `answer: 1` means the **second** option.
- `export` makes each value available to other files, which bring it in with `import { skills } from "@/data/mockData"`.

### 3.6 `src/components/Logo.tsx`

**Purpose:** the logo (drawn icon + name), linking back to the home page.

- `<Link href="/">` is Next.js's link component. It works like an HTML `<a>` tag but switches pages instantly without reloading the browser.
- `<svg>` draws the logo shape with code (a rounded square, a curved path and two dots representing a start and a goal).
- `light?: boolean` is an **optional prop**. The `?` means you may leave it out; `= false` gives a default.

### 3.7 `src/components/ProgressBar.tsx`

**Purpose:** the horizontal bars used for skill scores.

- Props: `value` (0–100), optional `color`, optional `size`.
- `scoreColor(score)` chooses the bar colour: green ≥ 70, indigo ≥ 50, amber ≥ 40, red below 40. It is exported so other files could reuse it.
- `style={{ width: `${value}%` }}` sets the filled width. The outer `{}` means "JavaScript goes here"; the inner `{}` is an object of CSS styles. `` `${value}%` `` is a **template string** that turns `78` into `"78%"`.
- `color ?? scoreColor(value)` means "use `color` if given, otherwise calculate one".

### 3.8 `src/components/Badge.tsx`

**Purpose:** small coloured pills such as **High**, **Completed**, **Beginner**.

- `toneClasses` is an object mapping a tone name (`"red"`, `"green"`…) to Tailwind classes. `Record<Tone, string>` is the TypeScript way of saying "an object with one string for every Tone".
- `priorityTone`, `difficultyTone`, `statusTone` are helper **functions** that convert a data value into a colour, e.g. `priorityTone("High")` returns `"red"`. Pages call them like `<Badge tone={priorityTone(gap.priority)}>`.

### 3.9 `src/components/DemoButton.tsx`

**Purpose:** a button for features that are not built yet. Clicking it shows a dark message bubble for 2.5 seconds instead of doing nothing.

- `"use client"` at the top: this component runs in the browser because it reacts to clicks. (Explained in Part 4.)
- `const [showNote, setShowNote] = useState(false);` creates a piece of **state**. `showNote` is the current value; `setShowNote` changes it, and React re-draws the button automatically.
- `function handleClick()` is an **event handler**. `onClick={handleClick}` connects it to the button.
- `setTimeout(() => setShowNote(false), 2500)` hides the message after 2500 milliseconds.
- `{showNote && ( ... )}` means "only show this part when `showNote` is true".

### 3.10 `src/components/AppShell.tsx`

**Purpose:** the frame around every app page: left sidebar, top bar, and the page content in the middle.

- `appLinks` is an array of sidebar links. Each has a `label`, `href` (address) and `icon`. **To add a sidebar link, add one object here.**
- `usePathname()` returns the current address (e.g. `/dashboard`). The sidebar compares it with each link: `const active = pathname === link.href;` and gives the active link an indigo background.
- `appLinks.map((link) => ( ... ))` loops over the array and produces one `<Link>` per item. React needs a unique `key` on each repeated item, so we use `key={link.href}`.
- `const Icon = link.icon;` then `<Icon />`: icons are components, and React component names must start with a capital letter, so we store it in a capitalised variable first.
- `menuOpen` state controls the mobile slide-out menu. `hidden lg:block` means "hidden on small screens, visible from large screens up" — this is how the layout becomes responsive.
- The top bar shows a search box (visual only), the "Prototype · sample data" label, a notification bell and Fahim's initials.
- `{children}` inside `<main>` is where each page's content appears.

### 3.11 `src/components/SiteHeader.tsx` and `SiteFooter.tsx`

**Purpose:** top navigation and footer for the public website pages (landing and How It Works).

- `SiteHeader` has a `links` array, desktop links (`hidden md:flex` = visible on medium screens and up) and a mobile menu controlled by `open` state. The ☰ / ✕ icon swaps using `{open ? <X /> : <Menu />}` — a **ternary**: "if open, show X, otherwise show Menu".
- `SiteFooter` builds its link columns from the `columns` array with two nested `.map()` loops.

### 3.12 `src/app/page.tsx` — Landing page (`/`)

**Purpose:** the product website and first impression.

- **Data at the top:** `steps` (the 4 how-it-works cards), `features` (6 feature items) and `journey` (Fahim's 4 milestones). Edit text there, not inside the HTML.
- **`HeroPreview` component:** the "app window" illustration on the right of the hero. It is built from real HTML and the real `skills` data — not an image — so it stays sharp and matches the app. It shows a fake browser bar, skill bars, a mini roadmap and a floating "Recommended next step" card.
- **`HomePage` component** (the `export default`) puts the sections in order: `SiteHeader` → hero (headline, supporting text, **Get Started** → `/assessment`, **Explore How It Works** → `/how-it-works`) → 4 steps → features → dark "sample learning journey" section → call-to-action box → `SiteFooter`.
- `lg:grid-cols-2` makes the hero two columns on large screens and one column on phones.

### 3.13 `src/app/how-it-works/page.tsx` — About / How It Works

**Purpose:** explains the 5-step journey (assess → profile → gaps → career → roadmap).

- The `journey` array holds each step's icon, title, explanation and a link to the matching page, so this page doubles as a guided tour during your presentation.
- The pill row `Assess Skills → Understand Gaps → …` uses `.map((item, i, arr) => ...)`; the arrow is only drawn when `i < arr.length - 1` (not after the last pill).
- Two cards list what this prototype includes and what is planned for later phases — useful when your teacher asks "what is real and what isn't?".

### 3.14 `src/app/assessment/page.tsx` — Skill Assessment

**Purpose:** an interactive multiple-choice test.

State used:
- `current` — which question is visible (0 = first).
- `answers` — an array with one entry per question; `null` = unanswered, otherwise the chosen option index.
- `finished` — `true` after clicking **Finish Assessment**.

Logic:
- `selectOption(index)` copies the array (`[...answers]`), stores the choice, and saves it with `setAnswers`. We copy instead of editing directly because React only notices a **new** array.
- `goNext` moves forward, or on the last question sets `finished` to true. `goPrevious` moves back.
- `answeredCount` and `progress` are calculated from `answers` every time the page re-draws.
- The **Next** button has `disabled={answers[current] === null}` so students must pick an answer first.
- The right panel shows a grid of question numbers (click to jump), colour-coded current/answered/not-yet, plus a list of topics with the current topic highlighted.
- When `finished` is true, the component returns the **results screen** instead (score, answered count, link to the dashboard, Retake). It clearly notes that the dashboard shows Fahim's sample profile.

**To edit questions:** change the `questions` array in `mockData.ts`. Add a `code: "..."` field to show a code box; `\n` inside the text means a new line.

### 3.15 `src/app/dashboard/page.tsx` — Student Dashboard

**Purpose:** the main "home" of the app for a logged-in student.

Sections, top to bottom:
1. **Welcome header** — "Welcome back, Fahim", progress summary sentence, **Continue Learning** button.
2. **Four stat cards** from the `stats` array (overall score, topics completed, study time, streak).
3. **Recommended Next Step** (dark card) — the required recommendation text and the **View Learning Roadmap** button.
4. **Current skill levels** — the five required scores as colour-coded progress bars, with a colour legend.
5. **Learning roadmap preview** — `roadmap.slice(0, 4)` takes the first 4 stages; the recommended one is highlighted.
6. Right column: **Career goal** card with readiness bar, **Your Skill Gaps** (each gap has a priority badge, a grey bar for the current score and a dark marker line showing the target), a **weekly activity bar chart** made from plain `<div>`s (height = hours ÷ max hours), and **Quick links**.

This file has no `"use client"`, because nothing on it needs clicking-state — it is drawn on the server, which is faster.

### 3.16 `src/app/skills/page.tsx` — My Skills

**Purpose:** the student's full skill profile.

- `levelFor(score)` converts a score into Beginner / Developing / Intermediate / Advanced.
- **`SkillRadar`** draws a "spider" chart with plain SVG and a little trigonometry: `point(index, value)` turns "spoke number + score" into x/y coordinates using `Math.cos` and `Math.sin`. It draws 4 background rings, 5 spokes, a dashed **Backend target** shape and the filled indigo **student** shape. To change targets, edit `[80, 75, 70, 75, 70]` (same order as the `skills` array).
- `[...skills].sort((a, b) => b.score - a.score)` makes a sorted **copy** (highest first). `slice(0, 2)` = top two (strongest); `slice(-2)` = last two (weakest).
- Also shows a "Current level" explanation and a list of every category with a level badge and bar.

### 3.17 `src/app/career/page.tsx` — Career Goal

**Purpose:** choose a target career.

- `careerIcons` connects each career `id` to an icon.
- `useState<CareerId>("backend")` — Backend Developer is selected when the page opens. `<CareerId>` tells TypeScript the state can only hold a valid career id.
- Clicking a card runs `onClick={() => setSelected(career.id)}`. The selected card gets an indigo border, filled icon and a check-mark circle.
- `careers.find((c) => c.id === selected)` looks up the selected career to show its name in the bottom bar.
- **Continue** goes to `/roadmap`. A small note explains the sample roadmap is for Backend Developer.

### 3.18 `src/app/roadmap/page.tsx` — Personalized Learning Roadmap

**Purpose:** the vertical timeline from current level to career goal.

- `StageMarker` returns a different circle per status: green with a tick (Completed), indigo with a soft pulsing ring (Recommended Next), dark trophy (Final Goal), grey number (Upcoming).
- The main list loops over `roadmap`. For each stage it draws the connecting line (`absolute left-5 ...`, green after completed stages, grey otherwise), the marker, and a card with title, status badge, description, difficulty badge, time estimate and topic chips.
- The **Recommended Next** card is highlighted with an indigo border, a "Start here" label, a **Start Learning** demo button and a **View resources** link. Upcoming cards show "Unlocks after the previous stage".
- The right panel has a **circular progress ring** drawn with SVG: `strokeDasharray={`${percent} 100`}` draws `percent` out of 100 units of the circle. Plus counts, estimated finish, a "Why this order?" explanation and the Final goal card. `lg:sticky lg:top-24` keeps the panel visible while scrolling on large screens.

### 3.19 `src/app/resources/page.tsx` — Learning Resources

**Purpose:** a searchable, filterable library.

- Two pieces of state: `search` (the text typed) and `category` (the selected filter).
- The input uses `value={search}` and `onChange={(e) => setSearch(e.target.value)}` — every keystroke updates state, so the list filters instantly. This is called a **controlled input**.
- `resources.filter(...)` keeps only items where the category matches **and** the title/description/topic contains the search text (`toLowerCase()` makes it case-insensitive).
- If nothing matches, an **empty state** with a "Clear filters" button is shown.
- `typeStyles` gives each resource type (Course/Video/Article/Practice) its own icon and colour. Recommended items show a "For you" badge.

---

## 4. Key concepts in plain English

- **Component** — a JavaScript function that returns HTML-like code (JSX). Name starts with a capital letter. Use it like a tag: `<ProgressBar value={78} />`.
- **JSX** — HTML written inside JavaScript. Differences from HTML: `className` instead of `class`; `{ }` inserts JavaScript values, e.g. `<p>{student.name}</p>`.
- **Props** — inputs to a component, like attributes on an HTML tag. In `<Badge tone="red">High</Badge>`, `tone` is a prop and `High` is the special `children` prop.
- **Import / export** — `export` shares something from a file; `import { X } from "..."` uses it in another. `export default` is the file's main thing and is imported without `{ }`.
- **State (`useState`)** — memory for a component that changes over time (selected answer, open menu). Changing it with the setter function makes React re-draw the screen.
- **Event handler** — a function that runs when something happens, connected with props like `onClick` or `onChange`.
- **Arrays & `.map()`** — an array is a list `[a, b, c]`. `.map()` turns each item into some JSX, which is how we draw cards and lists from data. `.filter()` keeps matching items; `.find()` returns the first match.
- **Objects** — groups of named values: `{ name: "Fahim", score: 78 }`. Read with a dot: `student.name`.
- **TypeScript types** — labels that describe data (`string` = text, `number`, `boolean` = true/false, `string[]` = list of text). Mistakes are underlined in VS Code before you even run the site.
- **Conditional rendering** — `{condition && <Thing />}` shows Thing only if condition is true; `{condition ? <A /> : <B />}` picks one of two.
- **Next.js routes** — a folder inside `src/app` with a `page.tsx` file becomes a web address. `src/app/roadmap/page.tsx` → `/roadmap`. No router setup needed.
- **`"use client"`** — Next.js draws pages on the server by default (fast). Files that use state, clicks or `usePathname` must start with `"use client"` so they also run in the browser.
- **Tailwind classes** — small style words combined in `className`. Prefixes change behaviour: `hover:` (on mouse hover), `sm:` / `md:` / `lg:` / `xl:` (from that screen width upward), `disabled:` (when a button is disabled).

---

## 5. How to change things

The development server **reloads automatically** when you save a file (<kbd>Ctrl</kbd> + <kbd>S</kbd>) — just look at Chrome.

| I want to… | Edit this |
|---|---|
| Change the student's name or scores | `src/data/mockData.ts` → `student`, `skills` |
| Change skill gaps or priorities | `mockData.ts` → `skillGaps` |
| Add / edit assessment questions | `mockData.ts` → `questions` |
| Change roadmap stages | `mockData.ts` → `roadmap` (status must be one of the 4 allowed words) |
| Add a resource | `mockData.ts` → add an object to `resources` with a new `id` |
| Change the brand colour | `src/app/globals.css` → the `--color-brand-...` hex codes |
| Change the hero headline | `src/app/page.tsx` → the `<h1>` in the HERO section |
| Add a sidebar link | `src/components/AppShell.tsx` → `appLinks` array |
| Add a new page | Create `src/app/new-name/page.tsx` exporting a default component; wrap content in `<AppShell>` for the sidebar look |

**Example — add a new page:**

```tsx
// src/app/settings/page.tsx
import AppShell from "@/components/AppShell";

export default function SettingsPage() {
  return (
    <AppShell>
      <h1 className="text-2xl font-bold text-ink">Settings</h1>
      <p className="mt-2 text-slate-500">Coming soon.</p>
    </AppShell>
  );
}
```

Visit http://localhost:3000/settings.

---

## 6. Troubleshooting

| Problem | Fix |
|---|---|
| `'node' is not recognized` / `command not found: npm` | Node.js is not installed or the terminal was opened before installing. Install the LTS from nodejs.org, then close and reopen VS Code. |
| `npm ERR! code ENOENT ... package.json` | The terminal is in the wrong folder. In VS Code use **File → Open Folder** on the folder that contains `package.json`, then open a new terminal. Or type `cd path/to/path-to-coding`. |
| `npm install` fails with network errors | Check your internet; try again. On university Wi-Fi, try a phone hotspot. |
| PowerShell: "running scripts is disabled on this system" | Run once: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, answer `Y`, then retry. Or use **Command Prompt** instead. |
| `Port 3000 is in use` | Next.js automatically uses 3001 — read the address it prints. Or close the other terminal running the site. |
| `Module not found: Can't resolve 'lucide-react'` (or another package) | Run `npm install` again. |
| `... is not exported from 'lucide-react'` | That icon name doesn't exist in your Lucide version. Pick another icon from https://lucide.dev/icons and update the import. |
| Font error / "Failed to fetch font" | The Google font downloads on first run; make sure you are online. The site still works with a fallback font. |
| The page looks unstyled (plain HTML) | Make sure `src/app/globals.css` starts with `@import "tailwindcss";`, `postcss.config.mjs` exists, then stop the server (<kbd>Ctrl</kbd>+<kbd>C</kbd>) and run `npm run dev` again. |
| Red error overlay in the browser after editing | Read the first lines — it gives the file and line number. Usually a missing `}` `)` or `>`, or a typo. Press <kbd>Ctrl</kbd>+<kbd>Z</kbd> in VS Code to undo your last change. |
| Changes don't appear | Save the file. If still stuck, stop the server, delete the `.next` folder and run `npm run dev` again. |
| "useState only works in Client Components" | Add `"use client";` as the very first line of that file. |

---

## 7. Demonstrating to your teacher

### 7.1 Before the presentation

1. Run `npm run dev` **before** the meeting and open each page once, so they load instantly during the demo.
2. In Chrome press <kbd>Ctrl</kbd> + <kbd>0</kbd> (zero) to reset zoom. Use full screen (<kbd>F11</kbd>) for a clean look.
3. Close unrelated tabs and turn off notifications.
4. Bring screenshots as a backup in case the laptop or projector has problems.

### 7.2 Suggested 5-minute demo script

1. **Landing page** (`/`): "Path To Coding helps students assess skills, find gaps, choose a career and follow a roadmap." Scroll through the 4 steps, features and Fahim's journey.
2. Click **Get Started** → **Assessment**: answer two or three questions, show the progress bar and question grid, click a number to jump, finish to show the results screen.
3. **View My Dashboard**: point out the skill scores, skill gaps with priorities, and the Recommended Next Step.
4. **Career Goal**: show Backend Developer selected, click another card to show selection, click back, then **Continue**.
5. **Roadmap**: walk down the timeline — completed, recommended next (click **Start Learning** to show the demo message), upcoming, final goal. Point to the progress ring.
6. **My Skills**: radar chart comparing Fahim with the Backend target.
7. **Resources**: type "SQL" in search, click a category filter, show the empty state by typing nonsense.
8. Close with **How It Works**: what is in this prototype vs planned for later phases.

### 7.3 Taking screenshots

- **Whole page (best):** in Chrome press <kbd>F12</kbd> (DevTools) → <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> (Mac: <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>) → type `screenshot` → choose **Capture full size screenshot**. A PNG of the entire page downloads.
- **Visible area:** Windows <kbd>Win</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>; Mac <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>4</kbd>.
- **Mobile view:** in DevTools click the phone/tablet icon (Toggle device toolbar), pick e.g. *iPhone 12 Pro*, then capture a screenshot the same way. Showing one mobile screenshot proves the design is responsive.
- Recommended set for your report: landing hero, assessment, dashboard, career goal, roadmap, my skills, resources, plus one mobile view.

---

## 8. Saving to GitHub

1. Create a free account at https://github.com.
2. Click **New repository** → name it `path-to-coding` → keep it Public or Private → **do not** tick "Add a README" → **Create repository**.
3. In the VS Code terminal (inside the project folder), run once:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

4. Then:

```bash
git init
git add .
git commit -m "First update: Path To Coding frontend prototype"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/path-to-coding.git
git push -u origin main
```

Replace `YOUR-USERNAME`. A browser window may ask you to sign in to GitHub — accept it.

5. Later, after making changes:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

`.gitignore` already stops `node_modules` and `.next` from being uploaded (they are huge and can be recreated with `npm install`).

**Optional:** to get a public link your teacher can open, sign in to https://vercel.com with GitHub, click **Add New → Project**, choose the repository and click **Deploy**. It is free for student projects and needs no settings for this prototype.

---

## 9. Appendix: creating a Next.js project from zero

You do **not** need this for the prototype — it already exists. It shows how this project was set up, in case your teacher asks or you start another project:

```bash
npx create-next-app@latest path-to-coding
```

Answer the questions: TypeScript **Yes**, ESLint (optional), Tailwind CSS **Yes**, `src/` directory **Yes**, App Router **Yes**, import alias **@/\***. Then:

```bash
cd path-to-coding
npm install lucide-react
npm run dev
```

After that you would replace the files in `src/` with the ones in this project.
