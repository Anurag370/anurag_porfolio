/**
 * About section content.
 *
 * Structured so you can edit prose without touching components.
 * Fields marked `TODO(anurag)` must be personalised before launch — they
 * are deliberately generic and contain no invented facts about you.
 */

export interface AboutConfig {
  /** Eyebrow above the heading. */
  eyebrow: string;
  heading: string;
  /** Short intro paragraph. */
  intro: string;
  /** Grouped detail blocks (background, interests, philosophy, goals, focus). */
  blocks: { title: string; body: string }[];
  /** Optional portrait. null = an in-brand avatar is rendered instead. */
  portrait: { src: string; alt: string } | null;
}

export const about: AboutConfig = {
  eyebrow: "About",
  heading: "Developer by practice, engineer in progress.",
  intro:
    "I'm Anurag, a full-stack developer who enjoys taking an idea from a blank file to a working product — and is now going deeper into AI engineering. I care about interfaces that feel considered, backends that stay understandable, and systems I can explain line by line.",
  blocks: [
    {
      title: "Background & journey",
      // TODO(anurag): personalise — your current studies, how you started,
      // and what you are working towards. Keep it factual.
      body: "I started with the web — HTML, JavaScript and React — and quickly moved to building full products with Next.js and FastAPI. Recently I've been going past the API layer into how models actually work: training CNNs in PyTorch, embeddings, and LLM-powered applications like retrieval-augmented generation.",
    },
    {
      title: "Technical interests",
      body: "Full-stack product development, AI/ML engineering (computer vision and LLM applications), backend architecture, and the tooling that makes shipping reliable — Docker, Git workflows and deployment pipelines.",
    },
    {
      title: "How I build",
      body: "Small, understandable pieces over clever ones. Strong types and clear boundaries. Measured animation over decoration. I'd rather ship a feature I fully understand than a framework I can't debug at 2am.",
    },
    {
      title: "Where I'm headed",
      body: "My goal is to work as a full-stack or AI engineer on products where software meets intelligent systems — and to give back to the open-source projects I depend on along the way.",
    },
    {
      title: "Currently focused on",
      body: "PyTorch and CNN fundamentals, end-to-end deployment of AI applications, and shipping polished Next.js projects with a maintainable architecture.",
    },
  ],
  // TODO(anurag): add a photo at /public/images/portrait.jpg then set:
  // portrait: { src: "/images/portrait.jpg", alt: "Portrait of Anurag" },
  portrait: { src: "/images/ProfileImage.png", alt: "Portrait of Anurag" },
};
