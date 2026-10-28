import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Container, Section } from "@/components/ui/Section";
import { formatDate } from "@/lib/format";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface PageParams {
  params: Promise<{ slug: string }>;
}

/** Drafts build too, so they're previewable by direct URL. */
export function generateStaticParams() {
  return getAllPosts(true).map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const posts = getAllPosts(true);
  const post = posts.find((item) => item.slug === slug);
  if (!post) return {};

  const { frontmatter } = post;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: `/blog/${post.slug}` },
    robots: frontmatter.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: frontmatter.title,
      description: frontmatter.description,
      publishedTime: frontmatter.date,
      tags: frontmatter.tags,
    },
  };
}

export default async function PostPage({ params }: PageParams) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { meta, content } = post;
  const { frontmatter } = meta;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    keywords: frontmatter.tags.join(", "),
    author: { "@type": "Person", name: "Anurag" },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Section labelled={false} className="pb-24 pt-28 md:pt-36">
        <Container className="max-w-3xl">
          <Link
            href="/blog"
            className="group mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            All articles
          </Link>

          {frontmatter.draft ? (
            <p className="mb-6 rounded-xl border border-warning/40 bg-warning/10 px-4 py-3 text-sm text-warning">
              Draft preview — this post is unpublished and hidden from lists.
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-2xs uppercase tracking-[0.14em] text-faint">
            <time dateTime={frontmatter.date}>
              {formatDate(frontmatter.date)}
            </time>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" aria-hidden />
              {meta.readingTime} min read
            </span>
            <span aria-hidden>·</span>
            <span className="text-accent">{frontmatter.category}</span>
          </div>

          <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-balance text-ink md:text-4xl">
            {frontmatter.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {frontmatter.description}
          </p>

          {frontmatter.tags.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {frontmatter.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          ) : null}

          <hr className="my-10 border-line" />

          <div className="article-prose">{content}</div>

          <footer className="mt-14 rounded-2xl border border-line bg-surface p-6 text-center">
            <p className="text-sm text-muted">
              Thanks for reading. Got a thought or a question?
            </p>
            <Link
              href="/#contact"
              className="mt-2 inline-block text-sm font-medium text-accent transition-opacity hover:opacity-80"
            >
              Drop me a message →
            </Link>
          </footer>
        </Container>
      </Section>
    </article>
  );
}
