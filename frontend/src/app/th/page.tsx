import type { Metadata } from "next";

import { AboutIntro } from "@/components/home/AboutIntro";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { SkillsExperience } from "@/components/home/SkillsExperience";
import { getHome, withMinDelay } from "@/lib/api";
import { TH_HOME, localizeProjectsForThai } from "@/lib/i18n/th";
import { REAL_PROJECT_CARDS } from "@/lib/projects";

export const metadata: Metadata = {
  title: { absolute: "Theerapat-Site" },
  description: "พอร์ตโฟลิโอภาษาไทยของธีรภัทร์ สังข์สี ครอบคลุมงานซอฟต์แวร์ โครงสร้างพื้นฐาน และ DevOps",
  alternates: {
    canonical: "/th",
    languages: { en: "/", th: "/th" },
  },
};

export default async function ThaiHomePage() {
  const { settings, skills } = await withMinDelay(getHome(), 1500);
  const localizedSettings = { ...settings, ...TH_HOME.settings };
  const projects = localizeProjectsForThai(REAL_PROJECT_CARDS);

  return (
    <main lang="th">
      <Hero settings={localizedSettings} index={1} copy={TH_HOME.hero} />
      <AboutIntro settings={localizedSettings} index={2} copy={TH_HOME.about} />
      <SkillsExperience
        skills={skills}
        summary={localizedSettings["skills.summary"]}
        index={3}
        copy={TH_HOME.skills}
      />
      <FeaturedWork projects={projects} index={4} copy={TH_HOME.featuredWork} />
    </main>
  );
}
