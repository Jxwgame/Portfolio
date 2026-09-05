import { CaseStudyArchitecture } from "./CaseStudyArchitecture";
import { CaseStudyChallenges } from "./CaseStudyChallenges";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyOverview } from "./CaseStudyOverview";
import { CaseStudyShots } from "./CaseStudyShots";
import { CaseStudyTechStack } from "./CaseStudyTechStack";
import { CaseStudyTimeline } from "./CaseStudyTimeline";
import { CaseStudySectionChips, CaseStudySectionNav, type CaseStudyNavItem } from "@/components/work/layout-4/CaseStudySectionNav";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { CaseStudyLayout1 } from "@/lib/case-studies/layout-1";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

/**
 * Layout 1 — gallery ทางซ้าย + การ์ด timeline/overview/tech-stack/architecture/challenges แบบ 3 คอลัมน์
 * การ์ด timeline/overview/architecture/challenges เป็น grid item ที่ถูกจัดตำแหน่งด้วย row-span/col-span อยู่แล้ว
 * (ดู lg:grid-rows-2 ด้านล่าง) จึงใส่ id ผ่าน prop ลงบนตัวการ์ดเอง (CaseStudyCard) แทนการครอบด้วย div เพิ่ม
 * เพื่อไม่ให้ระดับ grid item เปลี่ยนไปจนตำแหน่ง row-span/col-span เพี้ยน
 */
export function CaseStudyLayoutOne({ study, lang }: { study: CaseStudyLayout1; lang?: "th" }) {
  const t = lang === "th" ? TH_CASE_STUDY_UI : null;
  const hasArchitecture = Boolean(study.architecture?.length);
  const hasChallenges = Boolean(study.challenges?.length);
  const hasSupplementarySections = hasArchitecture || hasChallenges;

  const navItems: CaseStudyNavItem[] = [
    { id: "timeline", label: t?.projectTimeline ?? "Project Timeline" },
    { id: "overview", label: t?.overview ?? "Overview" },
    ...(hasArchitecture
      ? [{ id: "architecture", label: t?.architectureOverview ?? "Architecture Overview" }]
      : []),
    ...(hasChallenges ? [{ id: "challenges", label: t?.challengesSolutions ?? "Challenges & Solutions" }] : []),
    { id: "tech-stack", label: t?.techStack ?? "Tech Stack" },
    { id: "gallery", label: t?.projectGallery ?? "Project Gallery" },
  ];

  return (
    <main lang={lang}>
      <CaseStudySectionNav items={navItems} lang={lang} />

      <Section theme="dark" className="pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-24">
        <Container className="max-w-[1680px]">
          <CaseStudyHero study={study} lang={lang} />
          <CaseStudySectionChips items={navItems} />
        </Container>
      </Section>

      <Section theme="dark" className="border-t border-line pb-20 md:pb-28">
        <Container className="max-w-[1680px]">
          <div
            className={
              hasSupplementarySections
                ? "grid gap-6 lg:grid-cols-[0.85fr_1.6fr_1.1fr] lg:grid-rows-2"
                : "grid gap-6 lg:grid-cols-[0.85fr_2.7fr]"
            }
          >
            <CaseStudyTimeline
              phases={study.phases}
              id="timeline"
              className={hasSupplementarySections ? "lg:row-span-2" : undefined}
              lang={lang}
            />
            <CaseStudyOverview
              description={study.description}
              highlights={study.highlights}
              id="overview"
              lang={lang}
            />
            {hasArchitecture && <CaseStudyArchitecture nodes={study.architecture!} id="architecture" />}
            {hasChallenges && (
              <CaseStudyChallenges items={study.challenges!} id="challenges" className="lg:col-span-2" />
            )}
          </div>

          <div id="tech-stack" className="mt-14">
            <CaseStudyTechStack groups={study.techStack} lang={lang} />
          </div>

          <div id="gallery" className="mt-14">
            <CaseStudyShots shots={study.shots} lang={lang} />
          </div>
        </Container>
      </Section>

    </main>
  );
}
