import { openSource } from "@/config/open-source";

/**
 * Optional GitHub public API integration.
 *
 *  • Uses only GitHub's *public, unauthenticated* endpoints — no tokens,
 *    no secrets, nothing shipped to the browser.
 *  • Every request has a hard timeout and returns `null` on any failure,
 *    so the site builds and renders even when GitHub is down or
 *    rate-limited (60 req/hr unauthenticated).
 */

export interface GithubProfile {
  login: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
}

export interface GithubRepo {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
  fork: boolean;
}

export interface GithubData {
  profile: GithubProfile;
  repos: GithubRepo[];
}

const HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "anurag-portfolio-site",
};

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      headers: HEADERS,
      signal: AbortSignal.timeout(6000),
      next: { revalidate: 86400 },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

/** Fetch profile + top repositories. Returns null whenever unavailable. */
export async function fetchGithubData(): Promise<GithubData | null> {
  const username = openSource.githubUsername.trim();
  if (!username || !openSource.showLiveStats) return null;

  const [profile, repos] = await Promise.all([
    getJson<GithubProfile>(`https://api.github.com/users/${username}`),
    getJson<GithubRepo[]>(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=30`,
    ),
  ]);

  if (!profile) return null;

  const topRepos = (repos ?? [])
    .filter((repo) => !repo.fork)
    .slice(0, 6);

  return { profile, repos: topRepos };
}

/** Small language→colour map for repo cards. */
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  CSS: "#563d7c",
  HTML: "#e34c26",
  SCSS: "#c6538c",
  Shell: "#89e051",
  Rust: "#dea584",
  Go: "#00add8",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
};
