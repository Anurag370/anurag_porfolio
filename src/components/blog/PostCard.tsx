import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { PostMeta } from "@/lib/blog";

interface PostCardProps {
  post: PostMeta;
  className?: string;
}

/** Article card used on the home page and the blog index. */
export function PostCard({ post, className }: PostCardProps) {
  const { frontmatter } = post;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-2xs uppercase tracking-[0.14em] text-faint">
        <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
        <span aria-hidden>·</span>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3" aria-hidden />
          {post.readingTime} min read
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-ink">
        <Link
          href={`/blog/${post.slug}`}
          className="transition-colors after:absolute after:inset-0 after:content-[''] hover:text-accent"
        >
          {frontmatter.title}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
        {frontmatter.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {frontmatter.tags.slice(0, 4).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <span className="mt-5 inline-flex items-center gap-1.5 border-t border-line/70 pt-4 text-sm font-medium text-accent">
        Read article
        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}
