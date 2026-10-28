import type { TimelineEntry } from "@/types/content";

/**
 * Experience, internships, organising roles, academic milestones.
 *
 * Intentionally EMPTY — add only roles you have actually held.
 * Copy the commented example to start.
 *
 * Category for this file is usually "work" or "academic", but any
 * TimelineCategory is accepted.
 */
export const experience: TimelineEntry[] = [
  // {
  //   id: "role-example",
  //   title: "Role title",
  //   description: "What you were responsible for and what you shipped.",
  //   date: "Jun 2025 — Aug 2025",
  //   organization: "Organisation name",
  //   category: "work",
  //   enabled: true,
  //   link: null,
  //   credential: null,
  //   image: null,
  // },
];

export function visibleExperience(): TimelineEntry[] {
  return experience.filter((entry) => entry.enabled);
}
