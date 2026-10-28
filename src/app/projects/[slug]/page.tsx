import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { Badge } from "@/components/ui/Badge";
import { Container, Section } from "@/components/ui/Section";
import { getProjectBySlug, visibleProjects } from "@/config/projects";

interface PageParams {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return visibleProjects().map((project) => ({ slug: project.slug }));
}

/** Only pre-generated slugs resolve — anything else is a 404. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}`,
      title: project.title,
      description: project.tagline,
    },
  };
}

function BlockHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent">
      {children}
    </h2>
  );
}

export default async function ProjectPage({ params }: PageParams) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const all = visibleProjects();
  const position = all.findIndex((item) => item.slug === project.slug);
  const previous = position > 0 ? all[position - 1] : null;
  const next =
    position >= 0 && position < all.length - 1 ? all[position + 1] : null;

  const showLinks = Boolean(project.links.github || project.links.demo);

  return (
    <article>
      {/* Header */}
      <Section labelled={false} className="pb-10 pt-28 md:pt-36">
        <Container>
          <Link
            href="/#projects"
            className="group mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            All projects
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <ProjectStatusBadge status={project.status} />
            <span className="font-mono text-2xs uppercase tracking-[0.16em] text-faint">
              {project.period}
            </span>
            <span className="text-faint" aria-hidden>
              ·
            </span>
            <span className="font-mono text-2xs uppercase tracking-[0.16em] text-faint">
              {project.categories.join(" · ")}
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance text-ink md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            {project.tagline}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong bg-surface px-5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                View source
                <ArrowUpRight className="size-4" />
              </a>
            ) : null}
            {project.links.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-accent-gradient px-5 text-sm font-medium text-on-accent transition-all hover:brightness-110"
              >
                Live demo
                <ArrowUpRight className="size-4" />
              </a>
            ) : null}
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-line">
            <ProjectVisual
              slug={project.slug}
              accent={project.accent}
              categories={project.categories}
              image={project.image}
              className="aspect-[16/9] border-b-0"
            />
          </div>
        </Container>
      </Section>

      {/* Body */}
      <Section labelled={false} className="pb-20 md:pb-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
            <div className="min-w-0 space-y-12">
              <section aria-labelledby="problem-heading">
                <BlockHeading>
                  <span id="problem-heading">The problem</span>
                </BlockHeading>
                <p className="mt-4 leading-relaxed text-muted">
                  {project.problem}
                </p>
              </section>

              <section aria-labelledby="solution-heading">
                <BlockHeading>
                  <span id="solution-heading">The solution</span>
                </BlockHeading>
                <p className="mt-4 leading-relaxed text-muted">
                  {project.solution}
                </p>
              </section>

              <section aria-labelledby="contribution-heading">
                <BlockHeading>
                  <span id="contribution-heading">My contribution</span>
                </BlockHeading>
                <p className="mt-4 leading-relaxed text-muted">
                  {project.contribution}
                </p>
              </section>

              <section aria-labelledby="features-heading">
                <BlockHeading>
                  <span id="features-heading">Key features</span>
                </BlockHeading>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-muted"
                    >
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-accent"
                        aria-hidden
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>

              {project.challenges.length > 0 ? (
                <section aria-labelledby="challenges-heading">
                  <BlockHeading>
                    <span id="challenges-heading">Engineering challenges</span>
                  </BlockHeading>
                  <ul className="mt-5 space-y-3">
                    {project.challenges.map((challenge) => (
                      <li
                        key={challenge}
                        className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-muted"
                      >
                        <TriangleAlert
                          className="mt-0.5 size-4 shrink-0 text-warning"
                          aria-hidden
                        />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {project.caseStudy.length > 0 ? (
                <section aria-labelledby="casestudy-heading">
                  <BlockHeading>
                    <span id="casestudy-heading">Case study</span>
                  </BlockHeading>
                  <div className="mt-5 space-y-6">
                    {project.caseStudy.map((part) => (
                      <div
                        key={part.heading}
                        className="rounded-2xl border border-line bg-surface p-6"
                      >
                        <h3 className="font-semibold text-ink">
                          {part.heading}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {part.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {project.metrics.length > 0 ? (
                <section aria-labelledby="metrics-heading">
                  <BlockHeading>
                    <span id="metrics-heading">Verified metrics</span>
                  </BlockHeading>
                  <dl className="mt-5 grid gap-4 sm:grid-cols-3">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-line bg-surface p-5"
                      >
                        <dt className="font-mono text-2xs uppercase tracking-[0.14em] text-faint">
                          {metric.label}
                        </dt>
                        <dd className="mt-1 text-2xl font-semibold text-ink">
                          {metric.value}
                        </dd>
                        {metric.note ? (
                          <dd className="mt-1 text-xs text-muted">
                            {metric.note}
                          </dd>
                        ) : null}
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="space-y-6 rounded-2xl border border-line bg-surface p-6">
                <div>
                  <h2 className="font-mono text-2xs uppercase tracking-[0.16em] text-faint">
                    Status
                  </h2>
                  <div className="mt-2">
                    <ProjectStatusBadge status={project.status} />
                  </div>
                </div>
                <div>
                  <h2 className="font-mono text-2xs uppercase tracking-[0.16em] text-faint">
                    Timeline
                  </h2>
                  <p className="mt-2 text-sm text-muted">{project.period}</p>
                </div>
                <div>
                  <h2 className="font-mono text-2xs uppercase tracking-[0.16em] text-faint">
                    Stack
                  </h2>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <li key={tech}>
                        <Badge>{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
                {showLinks ? (
                  <div>
                    <h2 className="font-mono text-2xs uppercase tracking-[0.16em] text-faint">
                      Links
                    </h2>
                    <ul className="mt-2 space-y-2">
                      {project.links.github ? (
                        <li>
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
                          >
                            Source code
                            <ArrowUpRight className="size-3.5" />
                          </a>
                        </li>
                      ) : null}
                      {project.links.demo ? (
                        <li>
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
                          >
                            Live demo
                            <ArrowUpRight className="size-3.5" />
                          </a>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                ) : null}
                <div>
                  <h2 className="font-mono text-2xs uppercase tracking-[0.16em] text-faint">
                    Categories
                  </h2>
                  <p className="mt-2 text-sm capitalize text-muted">
                    {project.categories.join(", ")}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-2xl border border-line bg-surface p-4 text-xs leading-relaxed text-faint">
                <Sparkles className="size-4 shrink-0 text-accent" aria-hidden />
                Want something similar built?{" "}
                <Link href="/#contact" className="text-accent hover:underline">
                  Get in touch
                </Link>
              </div>
            </aside>
          </div>

          {/* Prev / next */}
          <nav
            aria-label="Project pagination"
            className="mt-16 flex items-stretch justify-between gap-4 border-t border-line pt-8"
          >
            {previous ? (
              <Link
                href={`/projects/${previous.slug}`}
                className="group max-w-[45%]"
              >
                <span className="block font-mono text-2xs uppercase tracking-[0.16em] text-faint">
                  ← Previous
                </span>
                <span className="mt-1 block font-medium text-ink transition-colors group-hover:text-accent">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group max-w-[45%] text-right"
              >
                <span className="block font-mono text-2xs uppercase tracking-[0.16em] text-faint">
                  Next →
                </span>
                <span className="mt-1 block font-medium text-ink transition-colors group-hover:text-accent">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </Container>
      </Section>
    </article>
  );
}
