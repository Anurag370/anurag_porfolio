import type { LearningEntry } from "@/types/content";

/**
 * "Now" — what you're currently learning, building and exploring.
 *
 * Status labels are honest: `learning`, `building`, `completed`.
 * They describe progress, never mastery.
 */
export const learningEntries: LearningEntry[] = [
  {
    id: "pytorch-cnns",
    title: "PyTorch & CNN fundamentals",
    detail:
      "Working through convolutional networks end-to-end — datasets, training loops and evaluation.",
    status: "learning",
    enabled: true,
    href: "",
  },
  {
    id: "ai-deployment",
    title: "End-to-end AI application deployment",
    detail:
      "Taking trained models from a notebook into a real API with reproducible environments.",
    status: "building",
    enabled: true,
    href: "",
  },
  {
    id: "backend-engineering",
    title: "Backend engineering",
    detail:
      "Designing maintainable FastAPI services: validation, auth patterns, testing and structure.",
    status: "learning",
    enabled: true,
    href: "",
  },
  {
    id: "opensource-workflows",
    title: "Open-source contribution workflows",
    detail:
      "Finding good-first-issues, reviewing code and shipping pull requests to established repos.",
    status: "learning",
    enabled: true,
    href: "",
  },
  {
    id: "llm-rag",
    title: "LLM applications & RAG",
    detail:
      "Building retrieval-augmented pipelines: chunking, embeddings, vector stores and evaluation.",
    status: "learning",
    enabled: true,
    href: "",
  },
];

/** Enabled entries in display order. */
export function visibleLearningEntries(): LearningEntry[] {
  return learningEntries.filter((entry) => entry.enabled);
}
