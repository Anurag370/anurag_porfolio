import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline } from "@/components/sections/Timeline";
import { visibleExperience } from "@/config/experience";

interface ExperienceProps {
  index: number;
}

export function Experience({ index }: ExperienceProps) {
  const entries = visibleExperience();

  return (
    <Section id="experience" ariaLabelledBy="experience-title" className="bg-bg-alt">
      <Container>
        <Reveal>
          <SectionHeading
            id="experience-title"
            eyebrow={`${String(index + 1).padStart(2, "0")} — Experience`}
            title="Roles, events & academic milestones."
            description="Internships, organising teams and formal milestones — added only once they've actually happened."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <Timeline
            entries={entries}
            emptyTitle="No roles logged yet"
            emptyDescription="Internships, event-organising experience and academic milestones will be listed here as they're confirmed."
          />
        </Reveal>
      </Container>
    </Section>
  );
}
