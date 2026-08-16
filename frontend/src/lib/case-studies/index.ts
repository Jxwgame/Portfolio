import { LAYOUT_1_STUDIES, type CaseStudyLayout1 } from "./layout-1";
import { LAYOUT_2_STUDIES, type CaseStudyLayout2 } from "./layout-2";
import { LAYOUT_3_STUDIES, type CaseStudyLayout3 } from "./layout-3";
import { REAL_PROJECT_CASE_STUDIES } from "@/lib/projects";

export type { CaseStudyLayout1 } from "./layout-1";
export type { CaseStudyLayout2 } from "./layout-2";
export type { CaseStudyLayout3 } from "./layout-3";

/** โปรเจกต์แต่ละอันเลือก layout ของตัวเองได้ (1, 2, หรือ 3) ผ่าน discriminant field `layout` */
export type CaseStudy = CaseStudyLayout1 | CaseStudyLayout2 | CaseStudyLayout3;

/** LAYOUT_N_STUDIES ที่เหลือคือตัวอย่างดีไซน์เดิม ส่วนโปรเจกต์จริงอยู่ที่ lib/projects/<slug> */
const ALL_CASE_STUDIES: CaseStudy[] = [
  ...LAYOUT_1_STUDIES,
  ...LAYOUT_2_STUDIES,
  ...LAYOUT_3_STUDIES,
  ...REAL_PROJECT_CASE_STUDIES,
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return ALL_CASE_STUDIES.find((study) => study.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return ALL_CASE_STUDIES.map((study) => study.slug);
}
