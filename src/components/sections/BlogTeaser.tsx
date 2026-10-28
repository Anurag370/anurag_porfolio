import { PenLine } from "lucide-react";
import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllPosts } from "@/lib/blog";

interface BlogTeaserProps {
  index: number;
}

/** Home-page preview of the three most recent (published) posts. */
export async function BlogTeaser({ index }: BlogTeaserProps) {
  const posts = getAllPosts().slice(0, 3);

  return (
    <Section id="blog" ariaLabelledBy="blog-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="blog-title"
            eyebrow={`${String(index + 1).padStart(2, "0")} — Writing`}
            title="Notes from the build."
            description="Technical write-ups, tutorials and lessons learned while shipping projects."
            actions={
              posts.length > 0 ? (
                <Button href="/blog" variant="secondary" size="sm">
                  View all posts
                </Button>
              ) : undefined
            }
          />
        </Reveal>

        {posts.length === 0 ? (
          <Reveal delay={0.05}>
            <EmptyState
              icon={<PenLine className="size-5" />}
              title="No posts published yet"
              description="I write when I've learned something worth sharing. First articles are being drafted — they'll appear here."
            />
          </Reveal>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, postIndex) => (
              <Reveal key={post.slug} delay={postIndex * 0.05}>
                <li className="h-full">
                  <PostCard post={post} />
                </li>
              </Reveal>
            ))}
          </ul>
        )}

        {posts.length === 0 ? (
          <p className="mt-8 text-center text-sm text-faint">
            In the meantime,{" "}
            <Link href="#projects" className="text-accent hover:underline">
              explore the projects
            </Link>
            .
          </p>
        ) : null}
      </Container>
    </Section>
  );
}
