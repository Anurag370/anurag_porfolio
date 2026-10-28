import type { TimelineEntry } from "@/types/content";

/**
 * Achievements & recognitions.
 *
 * This list intentionally ships EMPTY — nothing on this site is invented.
 * Add verified entries only. Copy the commented example below to start;
 * the timeline renders a designed empty state while there are no entries.
 *
 * Categories: "hackathon" | "open-source" | "event" | "certification" |
 * "academic" | "award"
 */
export const achievements: TimelineEntry[] = [
  {
    id: "internal-college-hackathon-first-prize",
    title: "First Prize — Internal College Hackathon",
    description:
      "Led Team Code of Duty to a first-place finish at the Internal College Hackathon.",
    date: "TODO — add date",
    organization: "Internal College Hackathon",
    category: "hackathon",
    enabled: true,
    link: null,
    credential: null,
    image: null,
  },
  // {
  //   id: "hackathon-example",
  //   title: "Hackathon name — placement or award",
  //   description: "What you built and your specific role, in one or two sentences.",
  //   date: "Mar 2025",
  //   organization: "Organiser / venue",
  //   category: "hackathon",
  //   enabled: true,
  //   link: { label: "Devpost", href: "https://devpost.com/..." },
  //   credential: null,
  //   image: null,
  // },
  // {
  //   id: "certification-example",
  //   title: "Certification name",
  //   description: "Issuer and what it covers.",
  //   date: "2025",
  //   organization: "Issuing organisation",
  //   category: "certification",
  //   enabled: true,
  //   link: null,
  //   credential: { label: "Credential", href: "https://..." },
  //   image: null,
  // },
];

/** Enabled entries sorted newest-first by array position (add newest on top). */
export function visibleAchievements(): TimelineEntry[] {
  return achievements.filter((entry) => entry.enabled);
}
