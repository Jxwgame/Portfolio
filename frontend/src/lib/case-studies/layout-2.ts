/**
 * ข้อมูลจำลองสำหรับหน้ารายละเอียดโปรเจกต์ (case study) แบบ Layout 2 — เน้นโปรเจกต์สาย infrastructure/devops
 * เช่นเดียวกับ layout-1.ts: เป็น mock ล้วน ๆ รอ backend เพิ่ม field จริง
 */

export type CaseStudyMetric = {
  icon: "uptime" | "deploy" | "cost" | "mttr";
  value: string;
  label: string;
};

export type CaseStudyTakeaway = {
  icon: "scalable" | "automation" | "observability";
  title: string;
  description: string;
};

export type CaseStudyDiagramShot = {
  label: string;
  gradient: string;
  /** path ใต้ /public — ใส่แล้วจะแสดงรูปจริงแทนไล่เฉด */
  image?: string;
  /** CSS object-position — ใช้เมื่อรูปถูกครอป (fit="cover") แล้วจุดสำคัญไม่ได้อยู่กลางภาพ */
  focus?: string;
};

export type CaseStudyTechItem2 = {
  name: string;
  image?: string;
  invert?: boolean;
};

export type CaseStudyFeature = {
  title: string;
  description: string;
  gradient: string;
  /** path ใต้ /public หนึ่งรายการขึ้นไป — ใส่มากกว่า 1 รูปแล้วฝั่งภาพจะกลายเป็น carousel ให้เลื่อนดูได้ */
  images?: string[];
  /** CSS object-position — ใช้เมื่อรูปถูกครอป (fit="cover") แล้วจุดสำคัญไม่ได้อยู่กลางภาพ */
  focus?: string;
};

export type CaseStudyConceptFeature = {
  icon: "validate" | "environments" | "traceability" | "governance";
  title: string;
  description: string;
};

export type CaseStudyConceptPanel = {
  number: number;
  title: string;
  description: string;
  /** path ใต้ /public — ยังไม่ใส่ก็ได้ ระหว่างรอครอปรูปจริง จะโชว์กรอบไล่เฉดพร้อม label แทน */
  image?: string;
  gradient?: string;
  focus?: string;
  /** ความกว้างใน grid ฝั่งขวา — "full" กว้างเต็มแถว, "half" อยู่คู่กับ panel อื่นในแถวเดียวกัน (ค่าเริ่มต้น "full") */
  span?: "full" | "half";
};

export type CaseStudyArchitectureImage = {
  /** path ใต้ /public */
  image: string;
  label?: string;
  focus?: string;
  /** ความกว้างใน grid ฝั่ง dashboard — "half" (ค่าเริ่มต้น) อยู่คู่กันแบบ 2 คอลัมน์, "full" กว้างเต็มแถว */
  span?: "full" | "half";
  /** อัตราส่วนกว้าง/สูงจริงของไฟล์รูป (width / height) — ใช้จัด dashboard เป็นแถว justified เต็มความกว้างพอดีโดยไม่ครอป/ไม่บิดสัดส่วน ไม่ใส่จะ fallback เป็น 4/3 */
  ratio?: number;
};

export type CaseStudyArchitectureStage = {
  title: string;
  description: string;
};

/** สถาปัตยกรรม (ภาพ diagram เดียว) + แดชบอร์ดจำลอง (กริดภาพ screenshot จริง) — ใช้รูปที่มีอยู่แล้ว ไม่ได้ render กราฟ/ตารางจำลอง */
export type CaseStudyArchitectureDashboard = {
  eyebrow?: string;
  architectureTitle: string;
  architectureImage: CaseStudyArchitectureImage;
  /** คำอธิบายสั้น ๆ ใต้ภาพ diagram (ไม่บังคับ) — อธิบาย data flow ของแต่ละขั้นในภาพ */
  architectureDescription?: string;
  /** รายการขั้นตอนของ pipeline (ไม่บังคับ) — สรุปสั้น ๆ ต่อขั้น เสริมจากภาพ diagram ที่บีบข้อความในรูปจนอ่านยาก */
  architectureStages?: CaseStudyArchitectureStage[];
  dashboardTitle: string;
  dashboardImages: CaseStudyArchitectureImage[];
};

export type CaseStudyConceptOverview = {
  eyebrow?: string;
  title: string;
  description: string;
  features: CaseStudyConceptFeature[];
  /** ข้อความเสริมท้าย sidebar ฝั่งซ้าย (ไม่บังคับ) — เช่นอธิบายว่าทำไม pipeline นี้ถึงสำคัญ */
  impact?: { title: string; description: string };
  /** หัวข้อ+คำอธิบายเพิ่มเติม (ไม่บังคับ) — สไตล์เดียวกับ title/description บนสุด วางต่อจาก impact เพื่อขยายความคู่กับ panel 02/03 ฝั่งขวา */
  secondary?: { title: string; description: string };
  panels: CaseStudyConceptPanel[];
};

export type CaseStudyLayout2 = {
  layout: 2;
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  tools: string[];
  startDate: string;
  endDate: string;
  teamType: string;
  role: string;
  architectureUrl?: string;
  repoUrl?: string;
  /** path ใต้ /public ไปยังไฟล์ PDF วิทยานิพนธ์ (ไม่บังคับ) — ใส่แล้วจะโชว์ปุ่มดาวน์โหลด PDF Thesis */
  thesisUrl?: string;
  overview: string;
  responsibility: string;
  highlights: string[];
  impact: string[];
  /** ภาพอธิบายโครงสร้าง/แนวคิดภาพรวมของโปรเจกต์ (ไม่บังคับ) — แสดงก่อน Feature Deep Dive */
  conceptOverview?: CaseStudyConceptOverview;
  /** บล็อกอธิบายฟีเจอร์แบบภาพ+ข้อความสลับข้าง (ไม่บังคับ) — ใช้เมื่ออยากขยายความแต่ละฟีเจอร์เพิ่มจาก highlights */
  features?: CaseStudyFeature[];
  mainDiagram: CaseStudyDiagramShot;
  diagramShots: CaseStudyDiagramShot[];
  /** แผนภาพสถาปัตยกรรม + แดชบอร์ดจำลอง 2 คอลัมน์ (ไม่บังคับ) — ถ้าใส่ จะแสดงแทน gallery ปกติของ Infrastructure Overview */
  architectureDashboard?: CaseStudyArchitectureDashboard;
  techStack: CaseStudyTechItem2[];
  metrics: CaseStudyMetric[];
  /** การ์ดสรุปข้อคิด/สิ่งที่ได้เรียนรู้ (ไม่บังคับ) — ไม่ใส่แล้ว section จะไม่แสดง */
  takeaways?: CaseStudyTakeaway[];
};

export const DIAGRAM_GRADIENTS = [
  "linear-gradient(150deg,#132436,#060d18)",
  "linear-gradient(150deg,#1E2A3A,#0A1220)",
  "linear-gradient(150deg,#1E3A2E,#0A1812)",
  "linear-gradient(150deg,#2A2340,#120E22)",
];

export const LAYOUT_2_STUDIES: CaseStudyLayout2[] = [
  {
    layout: 2,
    slug: "cloud-infrastructure",
    title: "Cloud Infrastructure & DevOps Platform",
    eyebrow: "Infrastructure Project",
    summary: "Designed and implemented cloud infrastructure with an end-to-end CI/CD pipeline and monitoring system.",
    tools: ["AWS", "Terraform", "Kubernetes", "Docker", "GitHub Actions", "Prometheus", "Grafana"],
    startDate: "Jan 2024",
    endDate: "May 2024",
    teamType: "Team Project",
    role: "Infrastructure Engineer",
    architectureUrl: "#",
    repoUrl: "#",
    overview: "Built a flexible, secure cloud foundation designed to support future growth.",
    responsibility: "Designed the architecture, provisioned infrastructure, implemented CI/CD and monitoring, and managed security.",
    highlights: ["High Availability & Scalability", "Automated Deployment", "Centralized Monitoring"],
    impact: ["Reduced deployment time by 70%", "Improved reliability to more than 99.95% uptime"],
    mainDiagram: { label: "VPC Architecture", gradient: DIAGRAM_GRADIENTS[0] },
    diagramShots: [
      { label: "Network Topology", gradient: DIAGRAM_GRADIENTS[1] },
      { label: "CI/CD Pipeline", gradient: DIAGRAM_GRADIENTS[2] },
      { label: "Monitoring Dashboard", gradient: DIAGRAM_GRADIENTS[3] },
      { label: "Log Analytics", gradient: DIAGRAM_GRADIENTS[0] },
      { label: "Database Schema", gradient: DIAGRAM_GRADIENTS[1] },
      { label: "Security Groups", gradient: DIAGRAM_GRADIENTS[2] },
    ],
    techStack: [
      { name: "AWS", image: "image%20(24).png" },
      { name: "Terraform" },
      { name: "Kubernetes" },
      { name: "Docker", image: "image%20(2).png" },
      { name: "GitHub Actions" },
      { name: "Nginx" },
      { name: "PostgreSQL", image: "image%20(15).png" },
      { name: "Redis", image: "Redis.png" },
      { name: "Prometheus", image: "image%20(29).png" },
      { name: "Grafana", image: "Grafana.png" },
      { name: "ELK Stack" },
    ],
    metrics: [
      { icon: "uptime", value: "99.95%", label: "System Uptime" },
      { icon: "deploy", value: "70%↓", label: "Deployment Time" },
      { icon: "cost", value: "30%↓", label: "Infrastructure Cost" },
      { icon: "mttr", value: "< 3 min", label: "MTTR (Mean Time To Recovery)" },
    ],
    takeaways: [
      {
        icon: "scalable",
        title: "Scalable & Reliable",
        description: "The system scales efficiently as traffic and workloads grow.",
      },
      {
        icon: "automation",
        title: "Automation First",
        description: "Used Infrastructure as Code and CI/CD to reduce errors and accelerate delivery.",
      },
      {
        icon: "observability",
        title: "Observability",
        description: "Centralized logs and metrics to speed up investigation and troubleshooting.",
      },
    ],
  },
];
