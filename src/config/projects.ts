import type { Project, ProjectCategory } from "@/types/content";

/**
 * ─────────────────────────────────────────────────────────────────────
 *  PROJECTS
 *
 *  Starting entries based on your project interests. Everything here is
 *  an editable draft:
 *
 *   • `status` defaults to "in-progress" — flip to "shipped" only when
 *     the project is actually live/complete.
 *   • `links` are empty strings until you add real URLs. Empty links are
 *     never rendered (no dead buttons).
 *   • `metrics` ship empty — add only numbers you can verify.
 *   • `problem` / `solution` / `contribution` are drafts: rewrite them in
 *     your own words so they match what you actually built.
 *
 *  To add a project: copy an entry, give it a unique `slug`, done.
 * ─────────────────────────────────────────────────────────────────────
 */

/** Labels + order for the project filter bar. */
export const projectCategories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "full-stack", label: "Full Stack" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "backend", label: "Backend" },
  { id: "automation", label: "Automation" },
  { id: "open-source", label: "Open Source" },
];

export const projects: Project[] = [
  {
    slug: "learnos",
    title: "LearnOS",
    tagline: "An intelligent, personalised learning platform.",
    description:
      "A learning platform that adapts study material and pacing to each learner instead of presenting the same static path to everyone.",
    status: "in-progress",
    enabled: true,
    featured: true,
    categories: ["full-stack", "ai-ml"],
    problem:
      "Most learning tools serve identical content to every student, so people either breeze through material they already know or get stuck without support.",
    solution:
      "LearnOS is designed around a personalised path: it tracks progress, surfaces the right next topic and adapts recommendations as the learner moves forward.",
    contribution:
      "TODO — describe what you specifically built (frontend, recommendation logic, data model, deployment…).",
    features: [
      "Personalised learning paths",
      "Progress tracking and dashboards",
      "Structured courses and topic hierarchy",
      "Responsive, accessible interface",
    ],
    challenges: [
      "TODO — describe the real engineering challenges you hit (data modelling, recommendation quality, state management…).",
    ],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    links: {
      github: "", // TODO(anurag): repo URL
      demo: "", // TODO(anurag): live demo URL
      docs: "",
    },
    image: null,
    accent: 235,
    metrics: [], // add only verified numbers, e.g. { value: "12", label: "Courses" }
    caseStudy: [],
    period: "2025 — Present",
  },
  {
    slug: "planthealth-ai",
    title: "PlantHealth AI",
    tagline: "Plant disease detection with PyTorch and CNNs.",
    description:
      "A computer-vision project that classifies leaf images to flag common plant diseases, built as a hands-on deep learning pipeline.",
    status: "in-progress",
    enabled: true,
    featured: true,
    categories: ["ai-ml"],
    problem:
      "Identifying plant diseases early needs expertise that casual growers don't have, and misdiagnosis leads to wrong treatment.",
    solution:
      "A convolutional neural network trained on leaf imagery classifies images into disease categories, making detection instant from a photo.",
    contribution:
      "TODO — describe your role: data preparation, model architecture, training/evaluation, inference API or UI.",
    features: [
      "CNN-based image classification",
      "Dataset preprocessing and augmentation",
      "Training and evaluation workflow",
      "Inference from a single leaf photo",
    ],
    challenges: [
      "TODO — describe real challenges (class imbalance, overfitting, dataset size, inference speed…).",
    ],
    tech: ["Python", "PyTorch", "CNNs", "OpenCV", "NumPy"],
    links: {
      github: "", // TODO(anurag): repo URL
      demo: "",
      docs: "",
    },
    image: null,
    accent: 150,
    metrics: [],
    caseStudy: [],
    period: "2025",
  },
  {
    slug: "vitalai",
    title: "VitalAI",
    tagline: "An AI-enabled health companion concept.",
    description:
      "An AI-assisted health and smart-campus companion concept exploring how LLMs can turn everyday signals into useful, timely guidance.",
    status: "archived",
    enabled: true,
    featured: true,
    categories: ["full-stack", "ai-ml"],
    problem:
      "Health and campus information is scattered across disconnected tools, so people rarely get proactive, contextual help.",
    solution:
      "VitalAI explores a single conversational surface that understands context and surfaces relevant recommendations and reminders.",
    contribution:
      "TODO — describe what you built: conversation flows, retrieval layer, UI, integrations…",
    features: [
      "Conversational AI interface",
      "Context-aware recommendations",
      "Dashboard for tracked signals",
      "Modular, extensible architecture",
    ],
    challenges: [
      "TODO — describe real challenges (grounding model outputs, privacy considerations, latency…).",
    ],
    tech: ["React", "FastAPI", "LLM APIs", "Vector database", "PostgreSQL"],
    links: {
      github: "", // TODO(anurag): repo URL
      demo: "",
      docs: "",
    },
    image: null,
    accent: 340,
    metrics: [],
    caseStudy: [],
    period: "2025",
  },
  {
    slug: "smart-attendance-system",
    title: "Smart Attendance System",
    tagline: "Facial-recognition-based attendance, automated.",
    description:
      "A facial-recognition attendance application that replaces manual roll calls with a verifiable, hands-free check-in flow.",
    status: "shipped",
    enabled: true,
    featured: true,
    categories: ["ai-ml", "backend"],
    problem:
      "Manual attendance is slow, error-prone and easy to abuse (proxy attendance).",
    solution:
      "Faces are detected and matched against an enrolled roster, writing timestamped attendance records automatically.",
    contribution:
      "TODO — describe your role: detection pipeline, enrollment flow, matching logic, records UI…",
    features: [
      "Face detection and enrolment",
      "Roster matching with confidence handling",
      "Timestamped attendance records",
      "Admin view for sessions",
    ],
    challenges: [
      "TODO — describe real challenges (lighting variation, false matches, latency…).",
    ],
    tech: ["Python", "OpenCV", "Facial recognition", "FastAPI", "SQLite"],
    links: {
      github: "", // TODO(anurag): repo URL
      demo: "",
      docs: "",
    },
    image: null,
    accent: 200,
    metrics: [],
    caseStudy: [],
    period: "2025",
  },
  {
    slug: "personal-automation-server",
    title: "Personal Automation Server",
    tagline: "A Python/FastAPI backend that automates routine tasks.",
    description:
      "An automation backend that exposes small, composable jobs as typed REST endpoints so everyday routines can be triggered by scripts, schedules or other apps.",
    status: "planned",
    enabled: true,
    featured: true,
    categories: ["backend", "automation"],
    problem:
      "Routine personal tasks (file moves, notifications, scraping, cleanups) live in scattered scripts that are hard to trigger or monitor.",
    solution:
      "A single FastAPI service standardises those jobs behind a consistent API with validation, logging and configurable schedules.",
    contribution:
      "TODO — describe the endpoints, job runner, scheduling, deployment setup…",
    features: [
      "Typed REST endpoints for each job",
      "Structured validation and error responses",
      "Scheduled and on-demand triggers",
      "Request logging and status reporting",
    ],
    challenges: [
      "TODO — describe real challenges (idempotency, secrets handling, scheduling, error recovery…).",
    ],
    tech: ["Python", "FastAPI", "REST APIs", "SQLite", "Docker"],
    links: {
      github: "", // TODO(anurag): repo URL
      demo: "",
      docs: "",
    },
    image: null,
    accent: 265,
    metrics: [],
    caseStudy: [],
    period: "2025 — Present",
  },
  {
    slug: "voice-typing-tool",
    title: "VoiceType",
    tagline: "A desktop app that types what you say.",
    description:
      "A desktop voice-typing utility that transcribes speech and inserts it wherever your cursor is, for hands-free writing and accessibility.",
    status: "shipped",
    enabled: true,
    featured: true,
    categories: ["automation"],
    problem:
      "Typing long text is slow and inaccessible for anyone who can't comfortably use a keyboard.",
    solution:
      "A lightweight desktop app records audio, transcribes it locally and streams the text into the active window with configurable hotkeys.",
    contribution:
      "TODO — describe the capture pipeline, transcription integration, UI and packaging…",
    features: [
      "Global hotkey recording",
      "Live transcription",
      "Auto-typing into the focused app",
      "Packaged desktop build",
    ],
    challenges: [
      "TODO — describe real challenges (latency, background noise, cross-app focus, packaging…).",
    ],
    tech: ["Python", "Speech recognition", "PyAudio", "PyQt", "PyInstaller"],
    links: {
      github: "https://github.com/Anurag370/VoiceType", // TODO(anurag): repo URL
      demo: "",
      docs: "",
    },
    image: {
      src: "/images/voicetypeThumbnail.png",
      alt: "VoiceType",
    },
    accent: 35,
    metrics: [],
    caseStudy: [],
    period: "2025",
  },
];

/** Featured + enabled projects, in file order. */
export function featuredProjects(): Project[] {
  return projects.filter((project) => project.enabled && project.featured);
}

/** All enabled projects (for the filterable archive + sitemap). */
export function visibleProjects(): Project[] {
  return projects.filter((project) => project.enabled);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return visibleProjects().find((project) => project.slug === slug);
}
