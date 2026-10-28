import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline } from "@/components/sections/Timeline";
import { visibleAchievements } from "@/config/achievements";

interface AchievementsProps {
  index: number;
}

export function Achievements({ index }: AchievementsProps) {
  const entries = visibleAchievements();

  return (
    <Section id="achievements" ariaLabelledBy="achievements-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="achievements-title"
            eyebrow={`${String(index + 1).padStart(2, "0")} — Achievements`}
            title="Milestones worth remembering."
            description="Hackathons, certifications, awards and competitions — only entries I can actually verify."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <Timeline
            entries={entries}
            emptyTitle="This timeline is being curated"
            emptyDescription="Verified achievements and competition results will appear here as they're added — nothing on this site is invented."
          />
        </Reveal>
      </Container>
    </Section>
  );
}
