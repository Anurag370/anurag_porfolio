import type { OpenSourceConfig } from "@/types/content";

/**
 * Open-source section.
 *
 * `githubUsername` powers a live, *public* GitHub API fetch (no token, no
 * secrets in the browser). Leave it empty to disable the API entirely —
 * the section still renders your hand-written `highlights` below.
 *
 * If GitHub is rate-limited or unreachable, the site falls back to the
 * static content automatically.
 *
 * TODO(anurag): add your GitHub username and real repository highlights.
 */
export const openSource: OpenSourceConfig = {
  enabled: true,
  intro:
    "I learn best by reading how other people build. My open-source journey focuses on contributing to projects I actually use — fixing bugs, improving docs and shipping small, reviewable pull requests.",
  // TODO(anurag): your GitHub username (no @, e.g. "anurag123").
  githubUsername: "",
  showLiveStats: true,
  highlights: [
    // TODO(anurag): replace with real repositories you have contributed to
    // or maintain. Delete any that don't apply — the cards hide empty ones.
    // {
    //   name: "example/repo",
    //   description: "What the project does and what you contributed.",
    //   stats: "3 merged PRs",
    //   href: "https://github.com/example/repo",
    //   tech: ["TypeScript", "React"],
    // },
  ],
};
