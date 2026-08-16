/**
 * ข้อมูลจำลองสำหรับหน้ารายละเอียดโปรเจกต์ (case study) แบบ Layout 3 — เน้นภาพเยอะ (hero gallery + photo gallery)
 * เช่นเดียวกับ layout-1.ts / layout-2.ts: เป็น mock ล้วน ๆ รอ backend เพิ่ม field จริง
 */

export type CaseStudyShot3 = {
  label: string;
  gradient: string;
  /** path ใต้ /public — ใส่แล้วจะแสดงรูปจริงแทนไล่เฉด */
  image?: string;
  /** CSS object-position — ใช้เมื่อรูปถูกครอป (fit="cover") แล้วจุดสำคัญไม่ได้อยู่กลางภาพ */
  focus?: string;
  /** จัดกลุ่มรูปใน galleryShots ตามพื้นที่งาน (เช่น "Data Center" / "Site" / "DLP") — ใช้โดย CaseStudyWorkAreas3 */
  category?: string;
};

export type CaseStudyTechItem3 = {
  name: string;
  image?: string;
  invert?: boolean;
};

export type CaseStudyLayout3 = {
  layout: 3;
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  tools: string[];
  startDate: string;
  endDate: string;
  teamType: string;
  role: string;
  overview: string;
  responsibility: string;
  highlights: string[];
  impact: string[];
  heroShots: CaseStudyShot3[];
  galleryShots: CaseStudyShot3[];
  galleryTotal: number;
  techStack: CaseStudyTechItem3[];
};

export const NIGHT_GRADIENTS = [
  "linear-gradient(150deg,#1B2A44,#070C16)",
  "linear-gradient(150deg,#12213A,#050A14)",
  "linear-gradient(150deg,#22314C,#0A1220)",
  "linear-gradient(150deg,#1E88C9,#0B1E33)",
  "linear-gradient(150deg,#2A3A55,#0C1420)",
];

export const LAYOUT_3_STUDIES: CaseStudyLayout3[] = [
  {
    layout: 3,
    slug: "hybrid-cloud-infrastructure",
    title: "Hybrid Cloud Infrastructure",
    eyebrow: "Infrastructure Project",
    summary: "Design & Build Scalable Cloud Infrastructure with DevOps Automation",
    tools: ["AWS", "Terraform", "Kubernetes", "Docker", "Ansible", "Prometheus", "Grafana"],
    startDate: "Jan 2024",
    endDate: "May 2024",
    teamType: "Team Project",
    role: "Infrastructure Engineer",
    overview:
      "Designed and built hybrid-cloud AWS infrastructure to run systems securely and efficiently.",
    responsibility: "Designed the architecture, managed infrastructure, wrote IaC, and maintained CI/CD pipelines and monitoring.",
    highlights: [
      "Multi-AZ High Availability",
      "Infrastructure as Code",
      "Automated Deployment",
      "Centralized Monitoring",
    ],
    impact: [
      "Supported three times more users",
      "Reduced deployment time by 60%",
      "Reduced infrastructure costs by 25%",
    ],
    heroShots: [
      { label: "Hybrid Cloud Site", gradient: NIGHT_GRADIENTS[0] },
      { label: "Network Diagram", gradient: NIGHT_GRADIENTS[1] },
      { label: "Data Center", gradient: NIGHT_GRADIENTS[2] },
      { label: "Kubernetes Cluster", gradient: NIGHT_GRADIENTS[3] },
      { label: "Twilight Skyline", gradient: NIGHT_GRADIENTS[4] },
      { label: "Terminal Session", gradient: NIGHT_GRADIENTS[0] },
      { label: "Monitoring Dashboard", gradient: NIGHT_GRADIENTS[1] },
      { label: "IaC Source", gradient: NIGHT_GRADIENTS[2] },
      { label: "Server Racks", gradient: NIGHT_GRADIENTS[3] },
    ],
    galleryShots: [
      { label: "Data Center Aisle", gradient: NIGHT_GRADIENTS[2] },
      { label: "Engineer at Workstation", gradient: NIGHT_GRADIENTS[1] },
      { label: "Night Container Yard", gradient: NIGHT_GRADIENTS[3] },
      { label: "City Skyline at Dusk", gradient: NIGHT_GRADIENTS[4] },
      { label: "Server Racks", gradient: NIGHT_GRADIENTS[2] },
      { label: "Monitoring Dashboard", gradient: NIGHT_GRADIENTS[1] },
      { label: "Terraform Source", gradient: NIGHT_GRADIENTS[0] },
    ],
    galleryTotal: 12,
    techStack: [
      { name: "AWS", image: "image%20(24).png" },
      { name: "Terraform" },
      { name: "Kubernetes" },
      { name: "Docker", image: "image%20(2).png" },
      { name: "Ansible" },
      { name: "GitHub Actions" },
      { name: "Nginx" },
      { name: "Prometheus", image: "image%20(29).png" },
      { name: "Grafana", image: "Grafana.png" },
      { name: "Loki" },
      { name: "ELK Stack" },
      { name: "Vault" },
    ],
  },
];
