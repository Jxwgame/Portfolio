import { WorkExperience } from "@/components/work/WorkExperience";
import { REAL_PROJECT_CARDS } from "@/lib/projects";

export const metadata = { title: "Experience" };

/** หน้ารวมโปรเจกต์ทั้งหมด — filter ตาม category ได้
 * TODO: ตอนนี้ใช้ REAL_PROJECT_CARDS (lib/projects) ชั่วคราวเพื่อดูตัวอย่างการ์ด — พอข้อมูลจริงพร้อม ค่อยย้ายกลับไปใช้ getProjects() จาก backend
 */
export default async function WorkPage() {
  const projects = REAL_PROJECT_CARDS;

  return <WorkExperience projects={projects} />;
}
