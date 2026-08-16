import { AboutIntro } from "@/components/home/AboutIntro";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { SkillsExperience } from "@/components/home/SkillsExperience";
import { getHome, withMinDelay } from "@/lib/api";
import { REAL_PROJECT_CARDS } from "@/lib/projects";

/** หน้าแรก — แถบสว่าง/มืดสลับกันไปตามแผนใน docs/design-plan.md
 * TODO: projects ใช้ REAL_PROJECT_CARDS (lib/projects) ชั่วคราวเหมือนหน้า /work — backend ยังตอบข้อมูล mock (Future Habitats ฯลฯ) จาก seed อยู่ พอ seed จริงพร้อมค่อยกลับไปใช้ projects จาก getHome()
 */
export default async function HomePage() {
  const { settings, skills } = await withMinDelay(getHome(), 1500);
  const projects = REAL_PROJECT_CARDS;

  return (
    <main>
      {/* index = เลขที่โชว์บนเส้นตกแต่งริมซ้าย ไล่ตามลำดับการเลื่อน */}
      <Hero settings={settings} index={1} />
      <AboutIntro settings={settings} index={2} />
      <SkillsExperience
        skills={skills}
        summary={settings["skills.summary"] ?? ""}
        index={3}
      />
      <FeaturedWork projects={projects} index={4} />
    </main>
  );
}
