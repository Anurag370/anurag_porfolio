import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Now } from "@/components/sections/Now";
import { OpenSource } from "@/components/sections/OpenSource";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { site } from "@/config/site";
import type { SectionId } from "@/types/content";

/**
 * Home page.
 *
 * Sections are assembled entirely from `config/site.ts`: disable, reorder
 * or extend entries in `site.sections` and this page adapts — no component
 * edits required. Numbering in section headings follows the visible order.
 */
function renderSection(id: SectionId, index: number) {
  switch (id) {
    case "about":
      return <About key={id} index={index} />;
    case "skills":
      return <Skills key={id} index={index} />;
    case "projects":
      return <Projects key={id} index={index} />;
    case "achievements":
      return <Achievements key={id} index={index} />;
    case "experience":
      return <Experience key={id} index={index} />;
    case "open-source":
      return <OpenSource key={id} index={index} />;
    case "now":
      return <Now key={id} index={index} />;
    case "blog":
      return <BlogTeaser key={id} index={index} />;
    case "contact":
      return <Contact key={id} index={index} />;
    default:
      return null;
  }
}

export default function HomePage() {
  const sections = site.sections
    .filter((section) => section.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <Hero />
      {sections.map((section, index) => renderSection(section.id, index))}
    </>
  );
}
