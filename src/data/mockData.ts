// =====================================================================
// MOCK DATA
// All the sample information shown in the prototype lives in this file.
// Change a value here and every page that uses it updates automatically.
// Later, this file can be replaced by real data from a backend.
// =====================================================================

// ---------- TypeScript types ----------
// A "type" describes the shape of an object, so the editor can warn us
// if we forget a field or misspell one.

export type Priority = "High" | "Medium" | "Low";
export type StageStatus = "Completed" | "Recommended Next" | "Upcoming" | "Final Goal";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Skill = {
  name: string;
  short: string; // short label used in small charts
  score: number; // 0 to 100
  description: string;
};

export type SkillGap = {
  skill: string;
  score: number;
  target: number;
  priority: Priority;
  reason: string;
};

export type CareerId = "frontend" | "backend" | "fullstack" | "data" | "ml";

export type Career = {
  id: CareerId;
  title: string;
  description: string;
  skills: string[];
  demand: string;
};

export type RoadmapStage = {
  id: number;
  title: string;
  status: StageStatus;
  difficulty: Difficulty;
  duration: string;
  description: string;
  topics: string[];
};

export type Question = {
  id: number;
  category: string;
  question: string;
  code?: string; // optional code snippet shown with the question
  options: string[];
  answer: number; // index of the correct option (0, 1, 2 or 3)
};

export type ResourceType = "Course" | "Video" | "Article" | "Practice";

export type Resource = {
  id: number;
  title: string;
  topic: string;
  type: ResourceType;
  difficulty: Difficulty;
  duration: string;
  description: string;
  recommended?: boolean;
};

// ---------- The fictional student ----------

export const student = {
  name: "Fahim",
  fullName: "Sheikh Fahim",
  initials: "SF",
  program: "BSc in Computer Science, Year 2",
  careerGoal: "Backend Developer",
  overallScore: 54,
  level: "Intermediate Beginner",
  streakDays: 6,
  hoursThisWeek: 7.5,
  completedTopics: 12,
  assessmentDate: "18 Oct 2026",
};

// ---------- Skill scores (from the project brief) ----------

export const skills: Skill[] = [
  {
    name: "Programming Fundamentals",
    short: "Fundamentals",
    score: 78,
    description: "Variables, conditions, loops and functions.",
  },
  {
    name: "Object-Oriented Programming",
    short: "OOP",
    score: 52,
    description: "Classes, objects, inheritance and encapsulation.",
  },
  {
    name: "Data Structures",
    short: "Data Structures",
    score: 43,
    description: "Arrays, lists, stacks, queues, trees and hash maps.",
  },
  {
    name: "Database & SQL",
    short: "SQL",
    score: 35,
    description: "Tables, queries, joins and database design.",
  },
  {
    name: "Web Development",
    short: "Web Dev",
    score: 61,
    description: "HTML, CSS, JavaScript and how the web works.",
  },
];

// ---------- Skill gaps compared with the Backend Developer target ----------

export const skillGaps: SkillGap[] = [
  {
    skill: "Database & SQL",
    score: 35,
    target: 75,
    priority: "High",
    reason: "Backend developers query and design databases every day.",
  },
  {
    skill: "Data Structures",
    score: 43,
    target: 70,
    priority: "High",
    reason: "Needed to write efficient server-side code.",
  },
  {
    skill: "Object-Oriented Programming",
    score: 52,
    target: 75,
    priority: "Medium",
    reason: "Most backend frameworks are built around classes and objects.",
  },
  {
    skill: "Web Development",
    score: 61,
    target: 70,
    priority: "Low",
    reason: "Your foundation is good; a little more HTTP knowledge will help.",
  },
];

// ---------- Career goals ----------

export const careers: Career[] = [
  {
    id: "frontend",
    title: "Frontend Developer",
    description: "Build the visual, interactive parts of websites and apps that people use.",
    skills: ["HTML & CSS", "JavaScript", "React"],
    demand: "High demand",
  },
  {
    id: "backend",
    title: "Backend Developer",
    description: "Design servers, APIs and databases that power applications behind the scenes.",
    skills: ["OOP", "SQL", "REST APIs"],
    demand: "High demand",
  },
  {
    id: "fullstack",
    title: "Full-Stack Developer",
    description: "Work across both frontend and backend to deliver complete features.",
    skills: ["JavaScript", "React", "Node.js"],
    demand: "Very high demand",
  },
  {
    id: "data",
    title: "Data Analyst",
    description: "Turn raw data into insights using queries, statistics and visualisation.",
    skills: ["SQL", "Python", "Statistics"],
    demand: "Growing demand",
  },
  {
    id: "ml",
    title: "Machine Learning Engineer",
    description: "Build and deploy models that learn from data to make predictions.",
    skills: ["Python", "Math", "ML Libraries"],
    demand: "Growing demand",
  },
];

// ---------- Personalized learning roadmap ----------

export const roadmap: RoadmapStage[] = [
  {
    id: 1,
    title: "Programming Fundamentals",
    status: "Completed",
    difficulty: "Beginner",
    duration: "3 weeks",
    description: "Core building blocks of every program: variables, conditions, loops and functions.",
    topics: ["Variables", "Loops", "Functions"],
  },
  {
    id: 2,
    title: "Object-Oriented Programming",
    status: "Recommended Next",
    difficulty: "Intermediate",
    duration: "3 weeks",
    description: "Learn to organise code with classes and objects — the foundation of backend frameworks.",
    topics: ["Classes", "Inheritance", "Encapsulation", "Polymorphism"],
  },
  {
    id: 3,
    title: "Data Structures",
    status: "Upcoming",
    difficulty: "Intermediate",
    duration: "4 weeks",
    description: "Store and organise data efficiently with arrays, lists, stacks, queues and hash maps.",
    topics: ["Lists", "Stacks & Queues", "Hash Maps"],
  },
  {
    id: 4,
    title: "SQL & Databases",
    status: "Upcoming",
    difficulty: "Intermediate",
    duration: "3 weeks",
    description: "Design tables, write queries and connect related data using joins.",
    topics: ["SELECT queries", "Joins", "Database design"],
  },
  {
    id: 5,
    title: "REST APIs",
    status: "Upcoming",
    difficulty: "Intermediate",
    duration: "2 weeks",
    description: "Understand how applications talk to each other using HTTP requests and JSON.",
    topics: ["HTTP methods", "JSON", "Status codes"],
  },
  {
    id: 6,
    title: "Backend Development",
    status: "Upcoming",
    difficulty: "Advanced",
    duration: "5 weeks",
    description: "Build server-side applications with routing, validation and database access.",
    topics: ["Node.js / Express", "Authentication basics", "Testing"],
  },
  {
    id: 7,
    title: "Build a Backend Project",
    status: "Final Goal",
    difficulty: "Advanced",
    duration: "4 weeks",
    description: "Bring everything together in a portfolio-ready API for a real-world idea.",
    topics: ["Project planning", "API + database", "Deployment"],
  },
];

// ---------- Assessment questions ----------

export const questions: Question[] = [
  {
    id: 1,
    category: "Programming Fundamentals",
    question: "What is the main purpose of a function in programming?",
    options: [
      "To store images",
      "To reuse a block of code",
      "To create a database",
      "To connect to the internet",
    ],
    answer: 1,
  },
  {
    id: 2,
    category: "Loops",
    question: "How many times will this loop print \"Hello\"?",
    code: 'for (let i = 0; i < 3; i++) {\n  console.log("Hello");\n}',
    options: ["2 times", "3 times", "4 times", "It never stops"],
    answer: 1,
  },
  {
    id: 3,
    category: "Programming Fundamentals",
    question: "Which data type is best for storing the value true or false?",
    options: ["String", "Integer", "Boolean", "Array"],
    answer: 2,
  },
  {
    id: 4,
    category: "Object-Oriented Programming",
    question: "In object-oriented programming, what is a class?",
    options: [
      "A blueprint for creating objects",
      "A type of loop",
      "A database table",
      "An error message",
    ],
    answer: 0,
  },
  {
    id: 5,
    category: "Object-Oriented Programming",
    question: "Which OOP principle hides an object's internal details and exposes only what is needed?",
    options: ["Inheritance", "Encapsulation", "Recursion", "Compilation"],
    answer: 1,
  },
  {
    id: 6,
    category: "Data Structures",
    question: "Which data structure follows the \"Last In, First Out\" (LIFO) rule?",
    options: ["Queue", "Stack", "Array", "Graph"],
    answer: 1,
  },
  {
    id: 7,
    category: "Databases & SQL",
    question: "Which SQL command is used to read data from a table?",
    code: "___ name, email FROM students;",
    options: ["GET", "READ", "SELECT", "FETCH"],
    answer: 2,
  },
  {
    id: 8,
    category: "APIs",
    question: "Which HTTP method is normally used to create a new resource through a REST API?",
    options: ["GET", "POST", "DELETE", "HEAD"],
    answer: 1,
  },
  {
    id: 9,
    category: "Web Development",
    question: "Which language is mainly used to style the appearance of a web page?",
    options: ["HTML", "CSS", "SQL", "Python"],
    answer: 1,
  },
  {
    id: 10,
    category: "Data Structures",
    question: "What is the index of the first element in a JavaScript or Python array?",
    options: ["0", "1", "-1", "It depends on the array"],
    answer: 0,
  },
];

// ---------- Learning resources (fictional examples) ----------

export const resources: Resource[] = [
  {
    id: 1,
    title: "OOP from Zero: Classes & Objects",
    topic: "Object-Oriented Programming",
    type: "Course",
    difficulty: "Intermediate",
    duration: "6 hours",
    description: "Build a small library-management system while learning classes, objects and methods.",
    recommended: true,
  },
  {
    id: 2,
    title: "Inheritance and Polymorphism Explained",
    topic: "Object-Oriented Programming",
    type: "Video",
    difficulty: "Intermediate",
    duration: "45 min",
    description: "A visual walkthrough of how classes share and override behaviour.",
    recommended: true,
  },
  {
    id: 3,
    title: "Stacks and Queues in Practice",
    topic: "Data Structures",
    type: "Practice",
    difficulty: "Intermediate",
    duration: "2 hours",
    description: "Ten short coding exercises that use stacks and queues to solve real problems.",
  },
  {
    id: 4,
    title: "SQL Basics: Your First Queries",
    topic: "Databases & SQL",
    type: "Course",
    difficulty: "Beginner",
    duration: "4 hours",
    description: "Learn SELECT, WHERE, ORDER BY and JOIN using a sample university database.",
    recommended: true,
  },
  {
    id: 5,
    title: "Designing Good Database Tables",
    topic: "Databases & SQL",
    type: "Article",
    difficulty: "Intermediate",
    duration: "20 min",
    description: "Primary keys, foreign keys and normalisation explained with simple examples.",
  },
  {
    id: 6,
    title: "How REST APIs Work",
    topic: "APIs",
    type: "Video",
    difficulty: "Beginner",
    duration: "30 min",
    description: "Requests, responses, JSON and status codes, explained with everyday analogies.",
  },
  {
    id: 7,
    title: "Loops and Functions Workout",
    topic: "Programming Fundamentals",
    type: "Practice",
    difficulty: "Beginner",
    duration: "1.5 hours",
    description: "Strengthen the basics with 15 bite-sized problems and instant feedback.",
  },
  {
    id: 8,
    title: "Build Your First Express API",
    topic: "Backend Development",
    type: "Course",
    difficulty: "Advanced",
    duration: "8 hours",
    description: "Create routes, connect a database and test endpoints for a to-do application.",
  },
  {
    id: 9,
    title: "Responsive Layouts with Modern CSS",
    topic: "Web Development",
    type: "Article",
    difficulty: "Beginner",
    duration: "25 min",
    description: "Flexbox and Grid basics for pages that look good on every screen size.",
  },
];

// ---------- Weekly study activity (used by the dashboard chart) ----------

export const weeklyActivity = [
  { day: "Mon", hours: 1.5 },
  { day: "Tue", hours: 0.5 },
  { day: "Wed", hours: 2 },
  { day: "Thu", hours: 1 },
  { day: "Fri", hours: 0 },
  { day: "Sat", hours: 1.5 },
  { day: "Sun", hours: 1 },
];
