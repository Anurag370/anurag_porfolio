import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectStatusBadge } from "@/components/projects/ProjectStatusBadge";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

const CATEGORY_LABELS: Record<string, string> = {
  "full-stack": "Full Stack",
  "ai-ml": "AI / ML",
  backend: "Backend",
  automation: "Automation",
  "open-source": "Open Source",
};

interface ProjectCardProps {
  project: Project;
  index?: number;
  className?: string;
}

/**
 * Project card with a stretched title link (whole card is clickable) and
 * separate external links for GitHub / demo — which only render when the
 * URL is actually configured.
 */
export function ProjectCard({ project, index, className }: ProjectCardProps) {
  const { links } = project;
  const showLinkRow = Boolean(links.github || links.demo);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_48px_-32px_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      <ProjectVisual
        title={project.title}
        slug={project.slug}
        accent={project.accent}
        categories={project.categories}
        image={project.image}
        index={index}
      />

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <ProjectStatusBadge status={project.status} />
          <span className="font-mono text-2xs uppercase tracking-[0.14em] text-faint">
            {project.categories.map((c) => CATEGORY_LABELS[c] ?? c).join(" · ")}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors after:absolute after:inset-0 after:content-[''] hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.tagline}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {project.tech.length > 4 ? (
            <Badge>+{project.tech.length - 4}</Badge>
          ) : null}
        </div>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-4">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              Case study
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>

            {/* External links sit above the stretched link */}
            {showLinkRow ? (
              <span className="relative z-10 flex items-center gap-3">
                {links.github ? (
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent"
                  >
                    GitHub
                    <ArrowUpRight className="size-3" />
                  </a>
                ) : null}
                {links.demo ? (
                  <a
                    href={links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent"
                  >
                    Live demo
                    <ArrowUpRight className="size-3" />
                  </a>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
