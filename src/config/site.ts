import type { SiteConfig } from "@/types/content";

/**
 * ─────────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — edit this file first.
 *
 *  Everything personal (name, tagline, email, availability, resume,
 *  section order) lives here. Larger collections (projects, skills,
 *  achievements…) live in their own files next to this one.
 *
 *  TODO items are marked `TODO(anurag)` — search the repo for them and
 *  fill in your real details before deploying.
 * ─────────────────────────────────────────────────────────────────────
 */
export const site: SiteConfig = {
  /* Identity ------------------------------------------------------- */
  name: "Anurag",
  brand: "Anurag.dev",
  title: "Full-Stack Developer | Aspiring AI Engineer",
  tagline: "Building intelligent solutions, one project at a time.",
  description:
    "Portfolio of Anurag, a full-stack developer building web applications with React, Next.js and FastAPI, and exploring AI engineering through deep learning and LLM-powered systems.",
  // TODO(anurag): replace with your real public email address.
  email: "homroyanurag@gmail.com",
  // TODO(anurag): replace with your city/country, or use "Remote".
  location: "India",
  // TODO(anurag): set your production domain once you deploy (used for SEO,
  // Open Graph and the sitemap). Example: "https://anurag.dev"
  url: "https://anurag.dev",
  signOff: "Designed & built by Anurag with Next.js, TypeScript and Tailwind CSS.",

  /* Hero status pill ------------------------------------------------ */
  // Flip `enabled` to false to hide the availability indicator entirely.
  availability: {
    enabled: true,
    label: "Open to collaborations & internships",
    href: "#contact",
  },

  /* Resume ---------------------------------------------------------- */
  // Drop your PDF at public/resume/Resume.pdf — the download button only
  // renders when the file actually exists, so there are never dead links.
  resume: {
    url: "/resume/Resume.pdf",
    label: "Download résumé",
  },

  /* Theme ----------------------------------------------------------- */
  theme: {
    default: "dark",
    allowToggle: true,
  },

  /* Section visibility & order -------------------------------------- */
  sections: [
    { id: "about", enabled: true, order: 10 },
    { id: "skills", enabled: true, order: 20 },
    { id: "projects", enabled: true, order: 30 },
    { id: "achievements", enabled: true, order: 40 },
    { id: "experience", enabled: true, order: 50 },
    { id: "open-source", enabled: true, order: 60 },
    { id: "now", enabled: true, order: 70 },
    { id: "blog", enabled: true, order: 80 },
    { id: "contact", enabled: true, order: 90 },
  ],
};

/** Derived helpers used across the app. */
export const siteUrl = site.url.replace(/\/$/, "");
