import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Load the "Plus Jakarta Sans" font from Google Fonts.
// "variable" creates a CSS variable we use in globals.css.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

// The text shown in the browser tab.
export const metadata: Metadata = {
  title: "Path To Coding — Personalized Programming Learning",
  description:
    "Assess your programming skills, understand your gaps, choose a career goal and follow a personalized learning roadmap.",
};

// RootLayout wraps EVERY page of the website.
// "children" is whichever page the visitor is currently looking at.
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans`}>{children}</body>
    </html>
  );
}
