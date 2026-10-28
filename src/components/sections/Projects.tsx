import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { visibleProjects } from "@/config/projects";

interface ProjectsProps {
  index: number;
}

export function Projects({ index }: ProjectsProps) {
  const projects = visibleProjects();

  return (
    <Section id="projects" ariaLabelledBy="projects-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="projects-title"
            eyebrow={`${String(index + 1).padStart(2, "0")} — Projects`}
            title="Things I've built & am building."
            description="Each project links to a full case study: the problem, the approach, my contribution and the engineering behind it."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <ProjectGrid projects={projects} />
        </Reveal>
      </Container>
    </Section>
  );
}
