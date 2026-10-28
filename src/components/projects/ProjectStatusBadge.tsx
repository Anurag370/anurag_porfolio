import { Badge } from "@/components/ui/Badge";
import type { ProjectStatus } from "@/types/content";

const STATUS: Record<ProjectStatus, { label: string; tone: "neutral" | "accent" | "success" | "warning" }> =
  {
    planned: { label: "Planned", tone: "neutral" },
    "in-progress": { label: "In Progress", tone: "warning" },
    shipped: { label: "Shipped", tone: "success" },
    archived: { label: "Archived", tone: "neutral" },
  };

/** Honest status pill — "In Progress" is the default, never a fake "Live". */
export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const { label, tone } = STATUS[status];
  return <Badge tone={tone}>{label}</Badge>;
}
