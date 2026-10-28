import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  CloudCog,
  Code,
  Database,
  Eye,
  LayoutGrid,
  Server,
} from "lucide-react";

/** Icon keys → Lucide components, referenced from `config/skills.ts`. */
export const skillIcons: Record<string, LucideIcon> = {
  code: Code,
  layout: LayoutGrid,
  server: Server,
  database: Database,
  brain: BrainCircuit,
  eye: Eye,
  cloud: CloudCog,
};

export function getSkillIcon(key: string): LucideIcon {
  return skillIcons[key] ?? Code;
}
