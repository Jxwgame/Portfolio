import { BriefcaseBusiness, Cloud, Code2, type LucideIcon } from "lucide-react";

/** ทะเบียนกลาง (single source of truth) ของโลโก้ tech stack ทั้งหมด แบ่งเป็นหมวดหมู่ — หน้าอื่นๆ import จากที่นี่แทนการประกาศ path โลโก้ซ้ำในแต่ละหน้า */

export type TechItem = {
  name: string;
  /** path ใต้ /Logo_Techstack — เว้นว่างไว้ให้ fallback เป็นตัวอักษรย่อ */
  image?: string;
  /** ตัวย่อสำรองเมื่อไม่มีโลโก้ */
  mark?: string;
  invert?: boolean;
};

export type TechCategory = {
  key: string;
  number: string;
  title: string;
  tags: string;
  Icon: LucideIcon;
  items: TechItem[];
};

export const TECH_CATEGORIES: TechCategory[] = [
  {
    key: "development",
    number: "01",
    title: "Development",
    tags: "Backend  •  Frontend  •  API  •  Database  •  DevOps",
    Icon: Code2,
    items: [
      { name: "Go", image: "image%20(3).webp" },
      { name: "Node.js", image: "image%20(4).webp" },
      { name: "Python", image: "image%20(6).webp" },
      { name: "HTML", image: "HTML.webp" },
      { name: "CSS", image: "CSS.webp" },
      { name: "JavaScript", image: "JavaScript-logo.webp" },
      { name: "TypeScript", image: "image%20(13).webp" },
      { name: "React", image: "image%20(7).webp" },
      { name: "Next.js", image: "image%20(9).webp" },
      { name: "Vue.js", image: "image%20(8).webp" },
      { name: "PHP", image: "image%20(5).webp" },
      { name: "Express", mark: "EX" },
      { name: "MySQL", image: "image%20(14).webp" },
      { name: "PostgreSQL", image: "image%20(15).webp" },
      { name: "Redis", image: "Redis.webp" },
      { name: "Tailwind CSS", image: "image%20(11).webp" },
      { name: "Figma", image: "image%20(33).webp" },
    ],
  },
  {
    key: "infrastructure",
    number: "02",
    title: "Infrastructure",
    tags: "Network  •  Cloud  •  Virtualization  •  Monitoring  •  Security",
    Icon: Cloud,
    items: [
      { name: "Linux", image: "image%20(27).webp" },
      { name: "Docker", image: "image%20(2).webp" },
      { name: "Proxmox", image: "proxmox.webp" },
      { name: "Nginx", image: "Nginx.webp" },
      { name: "Cisco", image: "Cisco.webp" },
      { name: "MikroTik", image: "image%20(23).webp" },
      { name: "Huawei", image: "Huawei.webp" },
      { name: "AWS", image: "image%20(24).webp" },
      { name: "Huawei Cloud", image: "HuaweiCloud.webp" },
      { name: "Ruijie", image: "image%20(22).webp" },
      { name: "TP-Link", image: "image%20(20).webp" },
      { name: "Grafana", image: "Grafana.webp" },
      { name: "Prometheus", image: "image%20(29).webp" },
      { name: "OpenSearch", image: "Opensearch.webp" },
      { name: "GNS3", image: "image%20(31).webp" },
      { name: "EVE-NG", image: "image%20(30).webp" },
      { name: "Postman", image: "Postman.webp" },
      { name: "Bruno", image: "Bruno.webp" },
    ],
  },
  {
    key: "tools-workflow",
    number: "03",
    title: "Tools & Workflow",
    tags: "Productivity  •  Collaboration  •  Documentation  •  Design",
    Icon: BriefcaseBusiness,
    items: [
      { name: "Git / GitHub", image: "image%20(16).webp" },
      { name: "GitLab", image: "image%20(18).webp" },
      { name: "Notion", image: "Notion.webp" },
      { name: "Obsidian", image: "obsidian.webp" },
      { name: "Microsoft Teams", image: "MSTeams.webp" },
      { name: "Google Workspace", image: "image%20(44).webp" },
      { name: "Office", image: "image%20(45).webp" },
      { name: "Canva", image: "image%20(46).webp" },
    ],
  },
];

const TECH_ITEM_BY_NAME = new Map(
  TECH_CATEGORIES.flatMap((category) => category.items).map((item) => [item.name, item]),
);

/** ดึงโลโก้ tech ตัวเดียวจากชื่อ ใช้เมื่อหน้าอื่นอยากได้แค่บาง item ไม่ใช่ทั้งหมวด */
export function getTechItem(name: string): TechItem | undefined {
  return TECH_ITEM_BY_NAME.get(name);
}
