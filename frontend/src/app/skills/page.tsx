import { SkillsExperience } from "@/components/home/SkillsExperience";
import { PageHero } from "@/components/layout/PageHero";
import { getHome } from "@/lib/api";

export const metadata = {
  title: "Technical Cargo",
  alternates: {
    canonical: "/skills",
    languages: { en: "/skills", th: "/th/skills" },
  },
};

/** หน้ารวมทักษะ/เครื่องมือทั้งหมด — แยกออกมาจากหน้า About เพราะ id="skills" ตัวเดียวในหน้าเดิมทำให้ scroll-spy ค้าง */
export default async function SkillsPage() {
  const { settings, skills } = await getHome();

  return (
    <main>
      <PageHero
        eyebrow="Technical Cargo"
        title="What's in the toolkit"
        description="Languages, frameworks, and infrastructure tools I rely on across development, networking, and DevOps work"
      />

      <SkillsExperience skills={skills} summary={settings["skills.summary"] ?? ""} />

    </main>
  );
}
