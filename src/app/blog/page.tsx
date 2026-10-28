import type { Metadata } from "next";
import { PenLine } from "lucide-react";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { Container, Section } from "@/components/ui/Section";
import { getAllPosts, getAllTags } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical write-ups, tutorials and lessons learned while building full-stack and AI projects.",
  alternates: { canonical: "/blog" },
  openGraph: {
    url: "/blog",
    title: "Blog — Anurag.dev",
    description:
      "Technical write-ups, tutorials and lessons learned while building full-stack and AI projects.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <Section labelled={false} className="pb-24 pt-28 md:pt-36">
      <Container>
        <header className="mb-10">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Writing
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            Articles & notes
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Everything I publish here starts as something I had to figure out
            while building — written down so the next person has a shorter
            path.
          </p>
          {posts.length === 0 ? (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs text-muted">
              <PenLine className="size-3.5 text-accent" aria-hidden />
              Articles are added as Markdown files — none published yet.
            </p>
          ) : null}
        </header>

        <BlogExplorer posts={posts} tags={tags} />
      </Container>
    </Section>
  );
}
