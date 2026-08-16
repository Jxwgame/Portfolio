import type { Metadata } from "next";

import { WorkExperience } from "@/components/work/WorkExperience";
import { TH_WORK, localizeProjectsForThai } from "@/lib/i18n/th";
import { REAL_PROJECT_CARDS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Experience",
  alternates: {
    canonical: "/th/work",
    languages: { en: "/work", th: "/th/work" },
  },
};

/** เวอร์ชันไทยของหน้ารวมโปรเจกต์ — คู่กับ src/app/work/page.tsx ตัวอังกฤษ
 * TODO: เหมือน work/page.tsx ตัวอังกฤษ ใช้ REAL_PROJECT_CARDS ชั่วคราวจนกว่าข้อมูลจริงจาก backend จะพร้อม
 */
export default async function ThaiWorkPage() {
  const projects = localizeProjectsForThai(REAL_PROJECT_CARDS);

  return <WorkExperience projects={projects} copy={TH_WORK} lang="th" />;
}
