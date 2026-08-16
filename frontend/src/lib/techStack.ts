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
      { name: "Go", image: "image%20(3).png" },
      { name: "Node.js", image: "image%20(4).png" },
      { name: "Python", image: "image%20(6).png" },
      { name: "HTML", image: "HTML.webp" },
      { name: "CSS", image: "CSS.webp" },
      { name: "JavaScript", image: "JavaScript-logo.png" },
      { name: "TypeScript", image: "image%20(13).png" },
      { name: "React", image: "image%20(7).png" },
      { name: "Next.js", image: "image%20(9).png" },
      { name: "Vue.js", image: "image%20(8).png" },
      { name: "PHP", image: "image%20(5).png" },
      { name: "Express", mark: "EX" },
      { name: "MySQL", image: "image%20(14).png" },
      { name: "PostgreSQL", image: "image%20(15).png" },
      { name: "Redis", image: "Redis.png" },
      { name: "Tailwind CSS", image: "image%20(11).png" },
      { name: "Figma", image: "image%20(33).png" },
    ],
  },
  {
    key: "infrastructure",
    number: "02",
    title: "Infrastructure",
    tags: "Network  •  Cloud  •  Virtualization  •  Monitoring  •  Security",
    Icon: Cloud,
    items: [
      { name: "Linux", image: "image%20(27).png" },
      { name: "Docker", image: "image%20(2).png" },
      { name: "Proxmox", image: "proxmox.png" },
      { name: "Nginx", image: "Nginx.webp" },
      { name: "Cisco", image: "Cisco.png" },
      { name: "MikroTik", image: "image%20(23).png" },
      { name: "Huawei", image: "Huawei.png" },
      { name: "AWS", image: "image%20(24).png" },
      { name: "Huawei Cloud", image: "HuaweiCloud.png" },
      { name: "Ruijie", image: "image%20(22).png" },
      { name: "TP-Link", image: "image%20(20).png" },
      { name: "Grafana", image: "Grafana.png" },
      { name: "Prometheus", image: "image%20(29).png" },
      { name: "OpenSearch", image: "Opensearch.png" },
      { name: "GNS3", image: "image%20(31).png" },
      { name: "EVE-NG", image: "image%20(30).png" },
      { name: "Postman", image: "Postman.png" },
      { name: "Bruno", image: "Bruno.png" },
    ],
  },
  {
    key: "tools-workflow",
    number: "03",
    title: "Tools & Workflow",
    tags: "Productivity  •  Collaboration  •  Documentation  •  Design",
    Icon: BriefcaseBusiness,
    items: [
      { name: "Git / GitHub", image: "image%20(16).png" },
      { name: "GitLab", image: "image%20(18).png" },
      { name: "Notion", image: "Notion.png" },
      { name: "Obsidian", image: "obsidian.png" },
      { name: "Microsoft Teams", image: "MSTeams.png" },
      { name: "Google Workspace", image: "image%20(44).png" },
      { name: "Office", image: "image%20(45).png" },
      { name: "Canva", image: "image%20(46).png" },
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
