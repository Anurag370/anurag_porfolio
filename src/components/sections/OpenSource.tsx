import { ArrowUpRight, Code, GitFork, Star } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { openSource } from "@/config/open-source";
import { LANGUAGE_COLORS, fetchGithubData, type GithubRepo } from "@/lib/github";

interface OpenSourceProps {
  index: number;
}

function RepoCard({ repo }: { repo: GithubRepo }) {
  const color = repo.language ? LANGUAGE_COLORS[repo.language] : null;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="truncate font-mono text-sm font-medium text-ink transition-colors group-hover:text-accent">
          {repo.name}
        </span>
        <ArrowUpRight
          className="size-4 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          aria-hidden
        />
      </div>

      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
        {repo.description ?? "No description provided."}
      </p>

      <div className="mt-4 flex items-center gap-4 border-t border-line/70 pt-3 text-xs text-faint">
        {repo.language ? (
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden
              className="size-2 rounded-full"
              style={{ backgroundColor: color ?? "var(--text-faint)" }}
            />
            {repo.language}
          </span>
        ) : null}
        <span className="inline-flex items-center gap-1">
          <Star className="size-3.5" aria-hidden />
          {repo.stargazers_count}
        </span>
      </div>
    </a>
  );
}

/**
 * Open source.
 *
 * Live stats come from GitHub's public API when a username is configured;
 * otherwise (or on failure) the section falls back to hand-written
 * highlights — and finally to a designed empty state.
 */
export async function OpenSource({ index }: OpenSourceProps) {
  if (!openSource.enabled) return null;

  const data = await fetchGithubData();
  const highlights = openSource.highlights;
  const hasLiveRepos = Boolean(data && data.repos.length > 0);
  const hasContent = hasLiveRepos || highlights.length > 0;

  return (
    <Section id="open-source" ariaLabelledBy="open-source-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="open-source-title"
            eyebrow={`${String(index + 1).padStart(2, "0")} — Open Source`}
            title="Contributing to the tools I use."
            description={openSource.intro}
          />
        </Reveal>

        {/* Profile stats */}
        {data ? (
          <Reveal delay={0.05}>
            <div className="mb-8 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-5">
              <span className="flex size-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent">
                <Code className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-medium text-ink">
                  {data.profile.name ?? data.profile.login}
                </p>
                <a
                  href={data.profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  @{data.profile.login}
                </a>
              </div>
              <dl className="ml-auto flex items-center gap-6 text-sm">
                <div className="text-center">
                  <dt className="font-mono text-2xs uppercase tracking-[0.14em] text-faint">
                    Repos
                  </dt>
                  <dd className="mt-0.5 font-semibold text-ink">
                    {data.profile.public_repos}
                  </dd>
                </div>
                <div className="text-center">
                  <dt className="font-mono text-2xs uppercase tracking-[0.14em] text-faint">
                    Followers
                  </dt>
                  <dd className="mt-0.5 font-semibold text-ink">
                    {data.profile.followers}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        ) : null}

        {hasContent ? (
          <>
            {/* Live repositories */}
            {hasLiveRepos && data ? (
              <Reveal delay={0.08}>
                <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-faint">
                  Recent repositories
                </h3>
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {data.repos.map((repo) => (
                    <li key={repo.name} className="flex">
                      <div className="flex w-full">
                        <RepoCard repo={repo} />
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            {/* Hand-written highlights */}
            {highlights.length > 0 ? (
              <Reveal delay={0.12} className={hasLiveRepos ? "mt-10" : undefined}>
                <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-faint">
                  Contribution highlights
                </h3>
                <ul className="grid gap-5 sm:grid-cols-2">
                  {highlights.map((highlight) => (
                    <li key={highlight.name}>
                      <a
                        href={highlight.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-mono text-sm font-medium text-ink transition-colors group-hover:text-accent">
                            {highlight.name}
                          </span>
                          <span className="inline-flex items-center gap-1 font-mono text-2xs uppercase tracking-[0.12em] text-accent">
                            <GitFork className="size-3" aria-hidden />
                            {highlight.stats}
                          </span>
                        </div>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                          {highlight.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {highlight.tech.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-2xs text-muted"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </>
        ) : (
          <Reveal delay={0.05}>
            <EmptyState
              icon={<Code className="size-5" />}
              title="Open source, in progress"
              description="My contribution graph is warming up. I'm working through good-first-issues and small, reviewable pull requests — this section will fill in as work merges."
              action={
                data ? (
                  <a
                    href={data.profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-accent transition-opacity hover:opacity-80"
                  >
                    Follow along on GitHub →
                  </a>
                ) : undefined
              }
            />
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
