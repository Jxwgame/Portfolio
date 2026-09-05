/**
 * Layout 4 — สำหรับระบบที่มีหลายโมดูลและมีภาพหน้าจอเยอะ (เช่น ERP/PMS)
 * โครงของหน้า: กำแพงภาพเลื่อนใน hero → แถบขั้นตอนการทำงาน → ไล่ทีละโมดูล → แผ่นรวมทุกหน้าจอ
 *
 * ต่างจาก Layout 2 ตรงวิธีจัดการภาพจำนวนมาก: โมดูลที่มีหลายหน้าจอถูกยุบเป็นสำรับซ้อน (deck)
 * จึงกินพื้นที่แนวตั้งเท่ากับโมดูลที่มีหน้าจอเดียว ส่วนหน้าจอที่ต้องอธิบายเป็นจุด ๆ ใช้กรอบเส้นประ
 * ครอบพื้นที่จริงบนภาพแล้วจับคู่หมายเลขกับคำอธิบายข้าง ๆ
 */

import type { CaseStudyTakeaway, CaseStudyTechItem2 } from "./layout-2";

/** กรอบเส้นประหนึ่งกรอบบนภาพหน้าจอ — พิกัดเป็น % ของขนาดภาพ (0-100) จึงยืดตามความกว้างจอได้ */
export type CaseStudyAnnotation = {
  /** เลขกำกับ ใช้ทั้งบนกรอบและในคำอธิบายฝั่งข้อความ */
  number: number;
  description: string;
  box: { x: number; y: number; w: number; h: number };
};

export type CaseStudyScreen = {
  /** path ใต้ /public */
  image: string;
  label: string;
  /** CSS object-position — ใช้เมื่อภาพถูกครอปแล้วจุดสำคัญไม่ได้อยู่กลางภาพ */
  focus?: string;
};

export type CaseStudyModule = {
  /** เลขโมดูลตามเมนูจริงของระบบ เช่น "01" */
  number: string;
  name: string;
  title: string;
  description: string;
  /**
   * "annotated" — ภาพเดียวขนาดใหญ่พร้อมกรอบเส้นประชี้แต่ละส่วน (ใช้กับหน้าจอที่ต้องอธิบายเป็นจุด ๆ)
   * "deck" — หน้าจอทั้งโมดูลซ้อนกันเป็นสำรับ กดใบหลังเพื่อดึงขึ้นมาข้างหน้า
   */
  display: "annotated" | "deck";
  /** ใบแรกคือหน้าจอหลักของโมดูล */
  screens: CaseStudyScreen[];
  /** ใช้เมื่อ display = "annotated" */
  annotations?: CaseStudyAnnotation[];
  /** กล่องเสริมใต้คำอธิบาย เช่นรายการข้อมูลที่โมดูลนี้อ่านจากที่อื่น */
  aside?: { title: string; items: string[] };
};

/** ภาพหน้าจอเดียวกันบนอุปกรณ์ขนาดต่าง ๆ — ใช้โชว์ว่างานนี้ทำ responsive ไว้จริง */
export type CaseStudyDeviceShot = {
  device: "desktop" | "tablet" | "phone";
  label: string;
  /** path ใต้ /public — ยังไม่ใส่ก็ได้ จะขึ้นเป็นแผ่นเปล่าพร้อมป้ายชื่อระหว่างรอภาพจริง */
  image?: string;
  focus?: string;
  /** สิ่งที่เปลี่ยนไปเมื่อจอแคบลงถึงขนาดนี้ */
  note: string;
};

export type CaseStudyResponsive = {
  eyebrow?: string;
  title: string;
  description: string;
  devices: CaseStudyDeviceShot[];
};

/** แผนภาพสถาปัตยกรรมของทั้งระบบ พร้อมโน้ตสั้น ๆ อธิบายสิ่งที่อ่านจากภาพไม่ทันในครั้งเดียว */
export type CaseStudyArchitecture = {
  eyebrow?: string;
  title: string;
  description: string;
  /** path ใต้ /public — แสดงเต็มใบไม่ครอป เพราะเป็นแผนภาพ ไม่ใช่ภาพประกอบ */
  image: string;
  notes?: { title: string; description: string }[];
};

export type CaseStudyWorkflowStage = {
  number: string;
  title: string;
  description: string;
};

export type CaseStudyLayout4 = {
  layout: 4;
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
  thesisUrl?: string;
  overview: string;
  responsibility: string;
  highlights: string[];
  impact: string[];
  /** ภาพที่ใช้ทำกำแพงเลื่อนใน hero — เรียงเป็น 3 คอลัมน์วนซ้ำ ควรมีอย่างน้อย 6 ภาพ */
  heroWall: string[];
  /** ป้ายสั้น ๆ ใต้ summary เช่น "18 screens" (ไม่บังคับ) */
  heroStats?: string[];
  /** แถบขั้นตอนการทำงานก่อนเข้าเนื้อหาโมดูล (ไม่บังคับ) */
  workflow?: {
    eyebrow?: string;
    description: string;
    stages: CaseStudyWorkflowStage[];
  };
  /** แผนภาพสถาปัตยกรรม (ไม่บังคับ) — วางต่อจากแถบขั้นตอนการทำงาน ก่อนเข้าเนื้อหาโมดูล */
  architecture?: CaseStudyArchitecture;
  modules: CaseStudyModule[];
  /** แถบเทียบการแสดงผลบนเดสก์ท็อป แท็บเล็ต และโทรศัพท์ (ไม่บังคับ) */
  responsive?: CaseStudyResponsive;
  /** แผ่นรวมทุกหน้าจอปิดท้ายหน้า (ไม่บังคับ) */
  screenIndex?: {
    eyebrow?: string;
    title: string;
    description: string;
    shots: CaseStudyScreen[];
  };
  techStack: CaseStudyTechItem2[];
  takeaways?: CaseStudyTakeaway[];
};

/** ยังไม่มีตัวอย่างดีไซน์แบบ mock สำหรับ layout นี้ — โปรเจกต์จริงประกาศเองใน lib/projects/<slug> */
export const LAYOUT_4_STUDIES: CaseStudyLayout4[] = [];
