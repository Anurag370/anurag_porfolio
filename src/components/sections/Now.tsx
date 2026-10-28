import { ArrowUpRight, CircleCheck, Hammer, BookOpen } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/EmptyState";
import { visibleLearningEntries } from "@/config/learning";
import { cn } from "@/lib/utils";
import type { LearningStatus } from "@/types/content";

interface NowProps {
  index: number;
}

const STATUS: Record<
  LearningStatus,
  { label: string; dot: string; text: string }
> = {
  learning: {
    label: "Learning",
    dot: "bg-accent",
    text: "text-accent",
  },
  building: {
    label: "Building",
    dot: "bg-warning",
    text: "text-warning",
  },
  completed: {
    label: "Completed",
    dot: "bg-success",
    text: "text-success",
  },
};

/** "Now" — currently learning, building and exploring. */
export function Now({ index }: NowProps) {
  const entries = visibleLearningEntries();

  return (
    <Section id="now" ariaLabelledBy="now-title" className="bg-bg-alt">
      <Container>
        <Reveal>
          <SectionHeading
            id="now-title"
            eyebrow={`${String(index + 1).padStart(2, "0")} — Now`}
            title="What I'm focused on right now."
            description="A live snapshot of what I'm learning, building and exploring — progress labels, never claims of mastery."
          />
        </Reveal>

        {entries.length === 0 ? (
          <Reveal delay={0.05}>
            <EmptyState
              icon={<BookOpen className="size-5" />}
              title="Currently between rabbit holes"
              description="What I'm learning and building will show up here as soon as I log it."
            />
          </Reveal>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry, entryIndex) => {
              const status = STATUS[entry.status] ?? STATUS.learning;
              const Icon =
                entry.status === "completed"
                  ? CircleCheck
                  : entry.status === "building"
                    ? Hammer
                    : BookOpen;
              const content = (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-2.5 py-1 font-mono text-2xs uppercase tracking-[0.14em]",
                        status.text,
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn("size-1.5 rounded-full", status.dot)}
                      />
                      {status.label}
                    </span>
                    <Icon className="size-4 text-faint" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-semibold tracking-tight text-ink">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {entry.detail}
                  </p>
                </>
              );

              return (
                <Reveal key={entry.id} delay={entryIndex * 0.05}>
                  <li className="h-full">
                    {entry.href ? (
                      <a
                        href={entry.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
                      >
                        {content}
                        <span className="mt-4 inline-flex items-center gap-1 text-xs text-faint transition-colors group-hover:text-accent">
                          Resource
                          <ArrowUpRight className="size-3" />
                        </span>
                      </a>
                    ) : (
                      <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/40">
                        {content}
                      </div>
                    )}
                  </li>
                </Reveal>
              );
            })}
          </ul>
        )}
      </Container>
    </Section>
  );
}
