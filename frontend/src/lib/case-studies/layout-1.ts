/**
 * ข้อมูลจำลองสำหรับหน้ารายละเอียดโปรเจกต์ (case study) แบบ Layout 1 — ยังไม่มี field พวกนี้ใน backend
 * ใช้ระหว่างออกแบบ layout ทั้ง 3 แบบ พอ lock ดีไซน์ได้แล้วค่อยย้ายไปเป็น field จริงใน Go model + migration
 */

export type CaseStudyPhase = {
  title: string;
  description: string;
  status: "done" | "active" | "upcoming";
};

export type CaseStudyTechItem = {
  name: string;
  /** path ใต้ /Logo_Techstack — เว้นว่างไว้ให้ fallback เป็นตัวอักษรย่อ */
  image?: string;
  invert?: boolean;
};

export type CaseStudyTechGroup = {
  group: string;
  items: CaseStudyTechItem[];
};

export type CaseStudyChallenge = {
  challenge: string;
  solution: string;
};

export type CaseStudyShot = {
  label: string;
  gradient: string;
  /** path ใต้ /public — ใส่แล้วจะแสดงรูปจริงแทนไล่เฉด */
  image?: string;
  /** CSS object-position — ใช้เมื่อรูปถูกครอป (fit="cover") แล้วจุดสำคัญไม่ได้อยู่กลางภาพ */
  focus?: string;
};

export type CaseStudyLayout1 = {
  layout: 1;
  slug: string;
  title: string;
  eyebrow: string;
  tags: string[];
  summary: string;
  description: string;
  highlights: string[];
  tools: string[];
  startDate: string;
  endDate: string;
  projectType: string;
  liveUrl?: string;
  sourceUrl?: string;
  shots: CaseStudyShot[];
  phases: CaseStudyPhase[];
  techStack: CaseStudyTechGroup[];
  architecture?: { label: string; sublabel?: string }[];
  challenges?: CaseStudyChallenge[];
};

export const SHOT_GRADIENTS = [
  "linear-gradient(150deg,#1E2A3A,#0A1220)",
  "linear-gradient(150deg,#1E88C9,#0B4E82)",
  "linear-gradient(150deg,#2A3A4D,#12222F)",
  "linear-gradient(150deg,#94A7BD,#3A4A5C)",
];

export const LAYOUT_1_STUDIES: CaseStudyLayout1[] = [
  {
    layout: 1,
    slug: "future-habitats",
    title: "Future Habitats",
    eyebrow: "Featured Project",
    tags: ["Web Platform", "Full-Stack Application"],
    summary:
      "A housing project management platform that helps users plan, track, and manage projects efficiently.",
    description:
      "Future Habitats is an end-to-end housing project management system that brings project, customer, unit, booking, payment, and reporting data into one place.",
    highlights: [
      "Manage project, unit, and customer data",
      "Unit booking and payment tracking",
      "Real-time statistics and reporting dashboard",
      "Responsive experience across all devices",
    ],
    tools: ["Next.js", "Go", "SQLite", "Tailwind CSS", "Docker"],
    startDate: "Jan 2024",
    endDate: "May 2024",
    projectType: "Personal Project",
    liveUrl: "#",
    sourceUrl: "#",
    shots: [
      { label: "Dashboard Overview", gradient: SHOT_GRADIENTS[0] },
      { label: "Project List", gradient: SHOT_GRADIENTS[1] },
      { label: "Booking Table", gradient: SHOT_GRADIENTS[2] },
      { label: "Analytics", gradient: SHOT_GRADIENTS[3] },
      { label: "Unit Detail", gradient: SHOT_GRADIENTS[0] },
    ],
    phases: [
      { title: "Planning", description: "Gather requirements and analyze the system", status: "done" },
      { title: "Design", description: "Design the UI/UX and system architecture", status: "done" },
      { title: "Development", description: "Build the frontend and backend", status: "active" },
      { title: "Testing", description: "Test the system and resolve defects", status: "upcoming" },
      { title: "Deployment", description: "Deploy to production and set up monitoring", status: "upcoming" },
    ],
    techStack: [
      {
        group: "Frontend",
        items: [
          { name: "Next.js", image: "image%20(9).webp" },
          { name: "React", image: "image%20(7).webp" },
          { name: "TypeScript", image: "image%20(13).webp" },
          { name: "Tailwind CSS", image: "image%20(11).webp" },
        ],
      },
      {
        group: "Backend",
        items: [
          { name: "Go", image: "image%20(3).webp" },
          { name: "Gin" },
          { name: "SQLite" },
          { name: "GORM" },
        ],
      },
      {
        group: "DevOps",
        items: [
          { name: "Docker", image: "image%20(2).webp" },
          { name: "Nginx" },
          { name: "GitHub Actions" },
          { name: "Vercel", image: "vercel.webp" },
        ],
      },
    ],
    architecture: [
      { label: "Client", sublabel: "(Next.js)" },
      { label: "API Gateway", sublabel: "(Nginx)" },
      { label: "Backend Service", sublabel: "(Go / Gin)" },
      { label: "Database", sublabel: "(SQlite)" },
    ],
    challenges: [
      {
        challenge: "Managing booking state across concurrent users",
        solution: "Used transactions and row locking for unit reservations",
      },
      {
        challenge: "Slow dashboard performance with large data sets",
        solution: "Used server-side rendering and caching",
      },
    ],
  },
];
