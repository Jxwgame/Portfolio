import {
  Blocks,
  Code,
  Component,
  LayoutDashboard,
  type LucideIcon,
  Rocket,
  Server,
  Sparkles,
  Workflow,
  Wrench,
} from "lucide-react";

/** ชื่อไอคอนใน DB → คอมโพเนนต์จริง (ค่าที่ไม่รู้จักจะได้ไอคอนกลาง ๆ แทนที่จะพัง) */
const ICONS: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  server: Server,
  rocket: Rocket,
  component: Component,
  blocks: Blocks,
  wrench: Wrench,
  code: Code,
  workflow: Workflow,
};

export function iconFor(name: string): LucideIcon {
  return ICONS[name] ?? Sparkles;
}
