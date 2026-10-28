/**
 * Central content model for the portfolio.
 *
 * Every piece of personal content shown on the site is typed here, so the
 * config files in `src/config` stay the single source of truth and components
 * never hardcode copy.
 *
 * Convention: fields you must fill in yourself are marked with a `TODO`
 * comment in the config files. Anything optional degrades gracefully —
 * links that are empty strings are simply not rendered.
 */

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

/** Every major section of the home page. Order and visibility are config-driven. */
export type SectionId =
  | "about"
  | "skills"
  | "projects"
  | "achievements"
  | "experience"
  | "open-source"
  | "now"
  | "blog"
  | "contact";

export interface SectionConfig {
  id: SectionId;
  /** Hide a section completely without deleting its code. */
  enabled: boolean;
  /** Ascending sort order on the home page. */
  order: number;
}

/* ------------------------------------------------------------------ */
/* Site-level identity                                                 */
/* ------------------------------------------------------------------ */

export type ThemePreference = "dark" | "light" | "system";

export interface Availability {
  enabled: boolean;
  /** Short label, e.g. "Open to internships & collaborations". */
  label: string;
  /** Optional link — leave empty ("") for no link. */
  href: string;
}

export interface ResumeConfig {
  /** Public path to the PDF. Leave empty ("") to hide the download button. */
  url: string;
  label: string;
}

export interface SiteConfig {
  /** Person's first name — drives the logo wordmark and metadata. */
  name: string;
  /** Brand / domain name shown in the navbar and footer. */
  brand: string;
  /** Professional identity line (hero + metadata). */
  title: string;
  tagline: string;
  /** Meta description used for SEO + social cards. */
  description: string;
  /** Public contact email. */
  email: string;
  /** Short location string — use a placeholder if you prefer not to share. */
  location: string;
  /** Canonical production origin, e.g. "https://anurag.dev". Used for SEO/OG/sitemap. */
  url: string;
  /** Short line in the footer. */
  signOff: string;
  availability: Availability;
  resume: ResumeConfig;
  theme: {
    /** Initial theme. "system" follows the OS preference. */
    default: ThemePreference;
    /** Whether visitors can toggle the theme from the header. */
    allowToggle: boolean;
  };
  /** Ordered list controlling which home sections render. */
  sections: SectionConfig[];
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export interface NavItem {
  label: string;
  /** Hash link ("#projects") or route ("/blog"). */
  href: string;
  /** Only shown when its section is enabled (for hash links). */
  section?: SectionId;
}

export interface NavigationConfig {
  main: NavItem[];
  footer: NavItem[];
}

/* ------------------------------------------------------------------ */
/* Social links                                                        */
/* ------------------------------------------------------------------ */

export type SocialId =
  | "github"
  | "linkedin"
  | "twitter"
  | "devto"
  | "hashnode"
  | "email"
  | "website";

export interface SocialLink {
  id: SocialId;
  label: string;
  /** Full URL (or mailto:). Empty string hides the link everywhere. */
  href: string;
  enabled: boolean;
  /** Optional @handle shown in tooltips / open-source section. */
  handle?: string;
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

/**
 * Qualitative proficiency labels — deliberately not percentages, which are
 * misleading. Map them to copy in the UI layer.
 */
export type SkillLevel =
  | "exploring"
  | "learning"
  | "comfortable"
  | "proficient";

export interface Skill {
  name: string;
  /** Omit to display the skill without a level badge. */
  level?: SkillLevel;
  /** Visually emphasise this skill inside its category. */
  emphasis?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  /** One-line context for the category. */
  description?: string;
  /** Icon key resolved in `src/components/skills/icons.ts`. */
  icon: string;
  skills: Skill[];
  enabled: boolean;
  order: number;
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type ProjectStatus = "planned" | "in-progress" | "shipped" | "archived";

export type ProjectCategory =
  | "full-stack"
  | "ai-ml"
  | "backend"
  | "automation"
  | "open-source";

export interface ProjectLink {
  /** Empty string = hidden. Never render dead links. */
  github: string;
  demo: string;
  docs: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

/** Only use for numbers you can actually verify. */
export interface ProjectMetric {
  value: string;
  label: string;
  note?: string;
}

export interface ProjectCaseStudySection {
  heading: string;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  /** One-liner used on cards. */
  tagline: string;
  /** Longer card/detail intro. */
  description: string;
  status: ProjectStatus;
  enabled: boolean;
  /** Show in the featured grid on the home page. */
  featured: boolean;
  categories: ProjectCategory[];
  /** The problem this project set out to solve. */
  problem: string;
  /** How it approaches the problem. */
  solution: string;
  /** Your specific contribution. */
  contribution: string;
  features: string[];
  /** Engineering hurdles — keep honest, editable drafts. */
  challenges: string[];
  /** Technology chips. */
  tech: string[];
  links: ProjectLink;
  /** Screenshot/photo. null = a generated in-brand visual is rendered. */
  image: ProjectImage | null;
  /** Accent hue (0–360) for the generated visual. Defaults per category. */
  accent?: number;
  metrics: ProjectMetric[];
  caseStudy: ProjectCaseStudySection[];
  /** Free-form year/period label, e.g. "2025 — Present". */
  period: string;
}

/* ------------------------------------------------------------------ */
/* Achievements / experience (timeline)                                */
/* ------------------------------------------------------------------ */

export type TimelineCategory =
  | "hackathon"
  | "open-source"
  | "event"
  | "certification"
  | "academic"
  | "award"
  | "work";

export interface TimelineLink {
  label: string;
  href: string;
}

export interface TimelineEntry {
  id: string;
  title: string;
  description: string;
  /** Display date, e.g. "Mar 2025" or "2024 — 2025". */
  date: string;
  /** Company, college, organiser, issuer… */
  organization: string;
  category: TimelineCategory;
  enabled: boolean;
  link: TimelineLink | null;
  credential: TimelineLink | null;
  image: ProjectImage | null;
}

/* ------------------------------------------------------------------ */
/* Currently learning / "Now"                                          */
/* ------------------------------------------------------------------ */

export type LearningStatus = "learning" | "building" | "completed";

export interface LearningEntry {
  id: string;
  title: string;
  /** What you're doing with it, one sentence. */
  detail: string;
  status: LearningStatus;
  enabled: boolean;
  /** Optional resource link. */
  href: string;
}

/* ------------------------------------------------------------------ */
/* Open source                                                         */
/* ------------------------------------------------------------------ */

export interface RepoHighlight {
  name: string;
  description: string;
  /** Star/fork counts etc. Only include real numbers. */
  stats: string;
  href: string;
  tech: string[];
}

export interface OpenSourceConfig {
  enabled: boolean;
  /** Short intro paragraph. */
  intro: string;
  /** GitHub username used for the public API fetch. Empty = API disabled. */
  githubUsername: string;
  /** Hand-written highlights shown even if the API is unavailable. */
  highlights: RepoHighlight[];
  /** Attempt to show live repo stats from GitHub's public API (no token). */
  showLiveStats: boolean;
}
