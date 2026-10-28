import type { SkillCategory } from "@/types/content";

/**
 * Technical skills.
 *
 * These are *starting entries* based on the technologies you work with —
 * not claims of equal proficiency. Set each skill's `level`
 * ("exploring" | "learning" | "comfortable" | "proficient"), reorder
 * categories, add or delete freely, or set `enabled: false` to hide one.
 *
 * No percentage meters anywhere — levels render as small qualitative badges.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    description: "Languages I reach for when building and experimenting.",
    icon: "code",
    enabled: true,
    order: 10,
    skills: [
      { name: "Python", level: "comfortable", emphasis: true },
      { name: "JavaScript", level: "comfortable", emphasis: true },
      { name: "TypeScript", level: "learning", emphasis: true },
      { name: "C", level: "learning" },
      { name: "C++", level: "learning" },
      { name: "SQL", level: "learning" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Interfaces with strong hierarchy, motion and accessibility.",
    icon: "layout",
    enabled: true,
    order: 20,
    skills: [
      { name: "React", level: "comfortable", emphasis: true },
      { name: "Next.js", level: "comfortable", emphasis: true },
      { name: "Tailwind CSS", level: "comfortable" },
      { name: "HTML & CSS", level: "proficient" },
      { name: "Framer Motion", level: "learning" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "APIs and services powering the interfaces above.",
    icon: "server",
    enabled: true,
    order: 30,
    skills: [
      { name: "FastAPI", level: "comfortable", emphasis: true },
      { name: "Node.js", level: "learning" },
      { name: "REST APIs", level: "comfortable" },
      { name: "Express", level: "exploring" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    description: "Relational stores, ORM workflows and vector search.",
    icon: "database",
    enabled: true,
    order: 40,
    skills: [
      { name: "PostgreSQL", level: "learning" },
      { name: "SQLite", level: "comfortable" },
      { name: "Prisma", level: "learning" },
      { name: "Vector databases", level: "exploring" },
    ],
  },
  {
    id: "ai-ml",
    title: "AI / Machine Learning",
    description: "Deep learning fundamentals and LLM-powered applications.",
    icon: "brain",
    enabled: true,
    order: 50,
    skills: [
      { name: "PyTorch", level: "learning", emphasis: true },
      { name: "scikit-learn", level: "learning" },
      { name: "CNNs", level: "learning" },
      { name: "Embeddings", level: "exploring" },
      { name: "RAG", level: "exploring" },
      { name: "LLM applications", level: "exploring" },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Infrastructure",
    description: "The workflow glue: version control, containers, deploys.",
    icon: "cloud",
    enabled: true,
    order: 70,
    skills: [
      { name: "Git", level: "comfortable", emphasis: true },
      { name: "GitHub", level: "comfortable" },
      { name: "Docker", level: "learning" },
      { name: "Deployment workflows", level: "learning" },
      { name: "Linux", level: "learning" },
    ],
  },
];

/** Enabled categories sorted by `order`. */
export function visibleSkillCategories(): SkillCategory[] {
  return skillCategories
    .filter((category) => category.enabled)
    .sort((a, b) => a.order - b.order);
}
