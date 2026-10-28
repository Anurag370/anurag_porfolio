"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { projectCategories } from "@/config/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";
import { Filter } from "lucide-react";

interface ProjectGridProps {
  projects: Project[];
}

/**
 * Filterable project grid.
 *
 * Chips animate an active indicator (layoutId); cards fade/scale in and
 * out on filter changes. Reduced-motion users get instant swaps.
 */
export function ProjectGrid({ projects }: ProjectGridProps) {
  const [active, setActive] = useState<string>("all");
  const reduced = useReducedMotion();

  const filtered = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((project) => project.categories.includes(active as never)),
    [active, projects],
  );

  const usedCategories = projectCategories.filter(
    (category) =>
      category.id === "all" ||
      projects.some((project) => project.categories.includes(category.id as never)),
  );

  return (
    <div>
      {/* Filter bar */}
      <div
        role="group"
        aria-label="Filter projects by category"
        className="mb-8 flex flex-wrap items-center gap-2"
      >
        <span className="mr-1 hidden items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-faint sm:inline-flex">
          <Filter className="size-3.5" aria-hidden />
          Filter
        </span>
        {usedCategories.map((category) => {
          const isActive = active === category.id;
          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(category.id)}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-sm transition-colors",
                isActive
                  ? "text-accent"
                  : "border border-line bg-surface text-muted hover:border-line-strong hover:text-ink",
              )}
            >
              {isActive && !reduced ? (
                <motion.span
                  layoutId="project-filter-indicator"
                  className="absolute inset-0 rounded-full border border-accent/30 bg-accent-soft"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : isActive ? (
                <span className="absolute inset-0 rounded-full border border-accent/30 bg-accent-soft" />
              ) : null}
              <span className="relative z-10">{category.label}</span>
            </button>
          );
        })}
        <span className="ml-auto font-mono text-2xs uppercase tracking-[0.14em] text-faint">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Filter className="size-5" />}
          title="Nothing in this category yet"
          description="No projects match this filter right now — try another category or check back soon."
        />
      ) : (
        <motion.ul
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
          layout={!reduced}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project, index) => (
              <motion.li
                key={project.slug}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} index={index} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
