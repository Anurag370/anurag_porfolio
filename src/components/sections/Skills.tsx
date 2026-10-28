import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSkillIcon } from "@/components/skills/icons";
import { visibleSkillCategories } from "@/config/skills";
import { cn } from "@/lib/utils";
import type { SkillLevel } from "@/types/content";

interface SkillsProps {
  index: number;
}

const LEVEL_LABELS: Record<SkillLevel, string> = {
  exploring: "exploring",
  learning: "learning",
  comfortable: "comfortable",
  proficient: "proficient",
};

/**
 * Skills — grouped category cards with qualitative level rows.
 * No percentage meters: levels are honest self-descriptions only.
 */
export function Skills({ index }: SkillsProps) {
  const categories = visibleSkillCategories();

  if (categories.length === 0) return null;

  return (
    <Section id="skills" ariaLabelledBy="skills-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="skills-title"
            eyebrow={`${String(index + 1).padStart(2, "0")} — Skills`}
            title="The tools I reach for."
            description="Organised by area, labelled by how I actually work with each technology — no inflated meters."
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, categoryIndex) => {
            const Icon = getSkillIcon(category.icon);
            return (
              <Reveal key={category.id} delay={categoryIndex * 0.05}>
                <article className="group h-full rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/40">
                  <div className="flex items-start gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent transition-colors group:border-accent/40">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-semibold tracking-tight text-ink">
                        {category.title}
                      </h3>
                      {category.description ? (
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {category.description}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <ul className="mt-5 space-y-0.5">
                    {category.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex items-center justify-between gap-3 border-b border-line/60 py-2 last:border-0"
                      >
                        <span
                          className={cn(
                            "text-sm",
                            skill.emphasis
                              ? "font-medium text-ink"
                              : "text-muted",
                          )}
                        >
                          {skill.name}
                        </span>
                        {skill.level ? (
                          <span className="font-mono text-2xs uppercase tracking-[0.12em] text-faint">
                            {LEVEL_LABELS[skill.level]}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
