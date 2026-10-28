import {
  ArrowUpRight,
  Award,
  Briefcase,
  Calendar,
  GitBranch,
  GraduationCap,
  Medal,
  Trophy,
} from "lucide-react";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import type { LucideIcon } from "lucide-react";
import type { TimelineCategory, TimelineEntry } from "@/types/content";

const CATEGORY_ICONS: Record<TimelineCategory, LucideIcon> = {
  hackathon: Trophy,
  "open-source": GitBranch,
  event: Calendar,
  certification: Award,
  academic: GraduationCap,
  award: Medal,
  work: Briefcase,
};

const CATEGORY_LABELS: Record<TimelineCategory, string> = {
  hackathon: "Hackathon",
  "open-source": "Open source",
  event: "Event",
  certification: "Certification",
  academic: "Academic",
  award: "Award",
  work: "Experience",
};

interface TimelineProps {
  entries: TimelineEntry[];
  /** Copy for the empty state (shown while the list is empty). */
  emptyTitle: string;
  emptyDescription: string;
}

/**
 * Vertical timeline used by both the achievements and experience sections.
 * Renders a designed empty state when no verified entries exist yet —
 * never fabricated content.
 */
export function Timeline({ entries, emptyTitle, emptyDescription }: TimelineProps) {
  if (entries.length === 0) {
    return (
      <EmptyState
        icon={<Award className="size-5" />}
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <ol className="relative ml-3 space-y-6 border-l border-line pl-8 md:ml-4 md:pl-10">
      {entries.map((entry, index) => {
        const Icon = CATEGORY_ICONS[entry.category] ?? Award;
        return (
          <li key={entry.id} className="relative">
            {/* Rail node */}
            <span
              aria-hidden
              className="absolute -left-[45px] top-6 flex size-7 items-center justify-center rounded-full border border-line bg-surface text-accent md:-left-[53px]"
            >
              <Icon className="size-3.5" />
            </span>

            <Reveal delay={index * 0.05}>
              <article className="rounded-2xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-accent/40 md:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone="accent">{entry.date}</Badge>
                  <span className="font-mono text-2xs uppercase tracking-[0.14em] text-faint">
                    {CATEGORY_LABELS[entry.category]}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">
                  {entry.title}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-accent">
                  {entry.organization}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {entry.description}
                </p>

                {entry.image ? (
                  <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-xl border border-line">
                    <Image
                      src={entry.image.src}
                      alt={entry.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 640px"
                      className="object-cover"
                    />
                  </div>
                ) : null}

                {entry.link || entry.credential ? (
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    {entry.link ? (
                      <a
                        href={entry.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-accent"
                      >
                        {entry.link.label}
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    ) : null}
                    {entry.credential ? (
                      <a
                        href={entry.credential.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-accent transition-opacity hover:opacity-80"
                      >
                        <BadgeCheck className="size-4" />
                        {entry.credential.label}
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </article>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
