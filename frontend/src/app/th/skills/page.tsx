import type { Metadata } from "next";

import { SkillsExperience } from "@/components/home/SkillsExperience";
import { PageHero } from "@/components/layout/PageHero";
import { getHome } from "@/lib/api";
import { TH_HOME, TH_SKILLS } from "@/lib/i18n/th";

export const metadata: Metadata = {
  title: "Technical Cargo",
  alternates: {
    canonical: "/th/skills",
    languages: { en: "/skills", th: "/th/skills" },
  },
};

/** เวอร์ชันไทยของหน้ารวมทักษะ/เครื่องมือ — คู่กับ src/app/skills/page.tsx ตัวอังกฤษ */
export default async function ThaiSkillsPage() {
  const { skills } = await getHome();

  return (
    <main lang="th">
      <PageHero
        eyebrow={TH_SKILLS.hero.eyebrow}
        title={TH_SKILLS.hero.title}
        description={TH_SKILLS.hero.description}
      />

      <SkillsExperience
        skills={skills}
        summary={TH_HOME.settings["skills.summary"]}
        copy={TH_HOME.skills}
      />
    </main>
  );
}
