/** ข้อมูลโปรเจกต์: Cancer Patient Healthcare Systems (Layout 2) — ทำเป็น Duo กับเพื่อนร่วมทีม, รอเติมรายละเอียดแต่ละฟีเจอร์ */

import type { Project } from "@/lib/types";
import type { CaseStudyLayout2 } from "@/lib/case-studies/layout-2";
import { DIAGRAM_GRADIENTS } from "@/lib/case-studies/layout-2";

const IMG = "/work/Cancer-patient-healthcare-system";

export const card: Project = {
  slug: "cancer-patient-healthcare-systems",
  title: "Cancer Patient Healthcare Systems",
  category: "Healthcare Platform",
  summary:
    "An assessment platform for elderly cancer patients, combining an NLP chatbot for reliable medical info with a web app to track their assessments, redeveloped with NCSA-aligned cybersecurity across the CIA Triad and STRIDE threat modeling.",
  coverUrl: `${IMG}/New_logo_cover.png`,
  videoUrl: "",
  role: "Full-Stack Developer & Deployment",
  year: 2026,
  tools: ["Node.js", "Vue.js", "Tailwind CSS", "Docker", "Redis", "Nginx", "AWS", "Railway"],
  featured: true,
};

export const caseStudy: CaseStudyLayout2 = {
  layout: 2,
  slug: "cancer-patient-healthcare-systems",
  title: "Cancer Patient Healthcare Systems",
  eyebrow: "Healthcare Platform",
  summary:
    "An assessment platform for elderly cancer patients, combining an NLP chatbot for reliable medical information with a web application for tracking assessments. Redeveloped to align with Chonburi Cancer Hospital's clinical workflows, with security measures informed by the CIA Triad and STRIDE threat modeling to help identify threats relevant to the system.",
  tools: ["Node.js", "Vue.js", "Tailwind CSS", "Docker", "Redis", "Nginx", "AWS", "Railway"],
  startDate: "Jan 2026",
  endDate: "Apr 2026",
  teamType: "Duo Project",
  role: "Full-Stack Developer & Deployment",
  thesisUrl: "/docs/thesis.pdf",
  overview:
    "Built to help elderly cancer patients get continuous, informed care despite Thailand's aging population and fragmented health records. The platform pairs an [[nlp]]NLP[[/nlp]] chatbot, grounded in a curated, medically-vetted knowledge base, with a web app for recording and analyzing patient assessments against medical standards, giving clinicians a clearer basis for treatment planning and easing the Q&A workload on medical staff.",
  responsibility:
    "Owned the entire web application: designed, developed, tested, and deployed the full Vue.js and Node.js system end to end, from the patient and admin interfaces to the production deployment. Also led risk analysis and security assessment of the system, hardening both the application and its infrastructure to meet NCSA-aligned cybersecurity standards.",
  highlights: [
    "Analyzed legacy system limitations and risk points to redesign an architecture aligned with Chonburi Cancer Hospital's clinical workflows and every user role",
    "Built the system as a responsive web app alongside a LINE LIFF integration for multi-channel access",
    "Applied security measures across architecture, data, and process layers, following international standards",
    "Built tracking, audit, and logging mechanisms to support incident investigation and long-term maintenance",
    "Ran functional testing and security assessments to validate correctness, stability, and vulnerabilities before launch",
  ],
  impact: [
    "Strengthened data security across confidentiality, integrity, availability, and recovery",
    "Reduced web-application-level cyberattack risk with security measures aligned to PDPA",
    "Systematic audit logging of every usage event for incident analysis and response",
    "Error-reducing UI backed by role-based access control to keep data accurate and secure",
  ],
  features: [
    {
      title: "Patient Management",
      description:
        "A full patient record covering demographics, diagnosis, and treatment site, paired with an assessment history view that tracks scores across all nine geriatric tools over time, breaks results down by domain, and flags specific areas needing clinical follow-up.",
      gradient: DIAGRAM_GRADIENTS[0],
      images: [
        `${IMG}/Patient.png`,
        `${IMG}/Patient_detail_1.png`,
        `${IMG}/Patient_detail_2.png`,
        `${IMG}/Patient_detail_3.png`,
        `${IMG}/Patient_detail_4.png`,
      ],
    },
    {
      title: "Patient Assessment",
      description:
        "Medical staff work through nine standardized geriatric assessment tools per patient (G8, Frail Scale, TUG, MNA, and more) via a guided, question-by-question form with progress tracking and locked, saved states once submitted.",
      gradient: DIAGRAM_GRADIENTS[1],
      images: [`${IMG}/assessment_1.png`, `${IMG}/assessment_2.png`],
    },
    {
      title: "Patient Education Media",
      description:
        "A 3-step workflow for assigning patient education materials, starting with a searchable and filterable patient list by disease, hospital, or gender, then assigning and confirming learning content for their care plan.",
      gradient: DIAGRAM_GRADIENTS[2],
      images: [`${IMG}/attach_media.png`],
    },
    {
      title: "Admin Management",
      description:
        "An admin console for maintaining the assessment tool catalog, enabling or disabling tools, and version controlling each form with draft editing, publishing, [[rollback]]rollback[[/rollback]], and a full archive of past versions.",
      gradient: DIAGRAM_GRADIENTS[3],
      images: [`${IMG}/admin_management.png`, `${IMG}/admin_management_2.png`],
    },
    {
      title: "Audit Logs",
      description:
        "A system wide [[audit_log]]audit dashboard[[/audit_log]] tracking every action by event type and actor role, with a detailed log of each event's timestamp, action, actor, and outcome for accountability.",
      gradient: DIAGRAM_GRADIENTS[0],
      images: [`${IMG}/Audit_logs.png`],
    },
  ],
  mainDiagram: { label: "System Architecture", gradient: DIAGRAM_GRADIENTS[0], image: `${IMG}/Diagram.png` },
  diagramShots: [
    { label: "Sign In", gradient: DIAGRAM_GRADIENTS[1], image: `${IMG}/1.png`, focus: "100% center" },
    { label: "Patient Management", gradient: DIAGRAM_GRADIENTS[2], image: `${IMG}/Patient.png` },
    { label: "Patient Assessment", gradient: DIAGRAM_GRADIENTS[3], image: `${IMG}/assessment_1.png` },
    { label: "Patient Education Media", gradient: DIAGRAM_GRADIENTS[0], image: `${IMG}/attach_media.png` },
    { label: "Admin Management", gradient: DIAGRAM_GRADIENTS[1], image: `${IMG}/admin_management.png` },
    { label: "Audit Logs", gradient: DIAGRAM_GRADIENTS[2], image: `${IMG}/Audit_logs.png` },
  ],
  techStack: [
    { name: "Node.js", image: "image%20(4).webp" },
    { name: "Vue.js", image: "image%20(8).webp" },
    { name: "Tailwind CSS", image: "image%20(11).webp" },
    { name: "Docker", image: "image%20(2).webp" },
    { name: "Redis", image: "Redis.webp" },
    { name: "Nginx", image: "Nginx.webp" },
    { name: "AWS", image: "image%20(24).webp" },
    { name: "Railway", image: "Railway.webp" },
  ],
  metrics: [{ icon: "uptime", value: "TODO", label: "TODO" }],
};
