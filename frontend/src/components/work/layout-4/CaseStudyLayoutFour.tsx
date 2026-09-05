import { CaseStudyArchitecture } from "./CaseStudyArchitecture";
import { CaseStudyHero4 } from "./CaseStudyHero4";
import { CaseStudyModuleSections } from "./CaseStudyModuleSections";
import { CaseStudyResponsive } from "./CaseStudyResponsive";
import { CaseStudyScreenIndex } from "./CaseStudyScreenIndex";
import { CaseStudySectionChips, CaseStudySectionNav, type CaseStudyNavItem } from "./CaseStudySectionNav";
import { CaseStudyWorkflowRail } from "./CaseStudyWorkflowRail";
import { CaseStudyInfoCards } from "@/components/work/layout-2/CaseStudyInfoCards";
import { CaseStudyTakeaways } from "@/components/work/layout-2/CaseStudyTakeaways";
import { CaseStudyTechStack2 } from "@/components/work/layout-2/CaseStudyTechStack2";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { CaseStudyLayout4 } from "@/lib/case-studies/layout-4";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

/**
 * Layout 4 — สำหรับระบบหลายโมดูลที่มีภาพหน้าจอเยอะ (ERP/PMS)
 * เรียงเป็น: กำแพงภาพเลื่อนใน hero → การ์ดสรุป 4 ช่อง → เทียบขนาดจอ → แถบขั้นตอนการทำงาน → แผนภาพสถาปัตยกรรม → ไล่ทีละโมดูล → แผ่นรวมทุกหน้าจอ
 * เทียบขนาดจออยู่ค่อนไปทางบน เพราะเป็นสิ่งที่คนดูควรเห็นตั้งแต่ต้น โดยไม่ต้องเลื่อนผ่านโมดูลทั้งเก้าไปก่อน
 * ปิดท้ายด้วย tech stack และ takeaways ที่ใช้คอมโพเนนต์ร่วมกับ Layout 2
 *
 * แท็บนำทางริมขวาต้องอยู่นอก <Section> เพราะ Section ตั้ง isolate ไว้ ถ้าอยู่ข้างในจะโดน section ถัดไปวาดทับ
 */
export function CaseStudyLayoutFour({ study, lang }: { study: CaseStudyLayout4; lang?: "th" }) {
  const t = lang === "th" ? TH_CASE_STUDY_UI : null;

  // ป้ายของแท็บใช้ eyebrow ของแต่ละหัวข้อเป็นหลัก จะได้ตรงกับที่คนดูเห็นตอนเลื่อนไปถึงจริง ๆ
  const navItems: CaseStudyNavItem[] = [
    { id: "overview", label: t?.overview ?? "Overview" },
    ...(study.responsive
      ? [{ id: "responsive", label: study.responsive.eyebrow ?? t?.responsive ?? "Responsive" }]
      : []),
    ...(study.workflow ? [{ id: "workflow", label: study.workflow.eyebrow ?? t?.oneWorkflow ?? "Workflow" }] : []),
    ...(study.architecture
      ? [{ id: "architecture", label: study.architecture.eyebrow ?? t?.architectureOverview ?? "Architecture" }]
      : []),
    { id: "modules", label: t?.moduleByModule ?? "Modules" },
    ...(study.screenIndex
      ? [{ id: "screens", label: study.screenIndex.eyebrow ?? t?.everyScreen ?? "Every screen" }]
      : []),
    { id: "stack", label: t?.techStack ?? "Tech stack" },
  ];

  return (
    <main lang={lang}>
      <CaseStudySectionNav items={navItems} lang={lang} />

      <Section theme="dark" size="none" className="pt-28 pb-14 md:pt-32 md:pb-16 lg:pt-20">
        <Container className="max-w-[1680px]">
          <CaseStudyHero4 study={study} lang={lang} />
          <CaseStudySectionChips items={navItems} />
        </Container>
      </Section>

      <Section theme="dark" size="none" className="border-t border-line py-16 md:py-20">
        <Container className="max-w-[1680px]">
          <div className="grid gap-16 lg:gap-24">
            <div id="overview">
              <CaseStudyInfoCards study={study} lang={lang} />
            </div>
            {study.responsive && (
              <div id="responsive">
                <CaseStudyResponsive responsive={study.responsive} lang={lang} />
              </div>
            )}
            {study.workflow && (
              <div id="workflow">
                <CaseStudyWorkflowRail workflow={study.workflow} lang={lang} />
              </div>
            )}
            {study.architecture && (
              <div id="architecture">
                <CaseStudyArchitecture architecture={study.architecture} lang={lang} />
              </div>
            )}
            <div id="modules">
              <CaseStudyModuleSections modules={study.modules} lang={lang} />
            </div>
            {study.screenIndex && (
              <div id="screens">
                <CaseStudyScreenIndex index={study.screenIndex} lang={lang} />
              </div>
            )}
            <div id="stack">
              <CaseStudyTechStack2 items={study.techStack} lang={lang} />
            </div>
            {study.takeaways && study.takeaways.length > 0 && (
              <CaseStudyTakeaways items={study.takeaways} lang={lang} />
            )}
          </div>
        </Container>
      </Section>
    </main>
  );
}
