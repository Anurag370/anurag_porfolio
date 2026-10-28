/** Rough reading-time estimate for markdown/JSX source, in minutes (min 1). */
export function estimateReadingTime(source: string): number {
  const text = source
    // strip frontmatter, JSX/HTML tags and code fences content markers
    .replace(/^---[\s\S]*?---/, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[#*_>`~\-[\]()!]/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** "2026-01-15" → "15 Jan 2026" (locale-safe, no Date parsing surprises). */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${day} ${months[month - 1]} ${year}`;
}
