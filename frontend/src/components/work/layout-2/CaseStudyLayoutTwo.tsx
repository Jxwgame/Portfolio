import { CaseStudyArchitectureDashboard } from "./CaseStudyArchitectureDashboard";
import { CaseStudyOutcomes } from "@/components/work/CaseStudyOutcomes";
import { CaseStudyConceptOverview } from "./CaseStudyConceptOverview";
import { CaseStudyFeatureSections } from "./CaseStudyFeatureSections";
import { CaseStudyHero2 } from "./CaseStudyHero2";
import { CaseStudyInfoCards } from "./CaseStudyInfoCards";
import { CaseStudyInfrastructureOverview } from "./CaseStudyInfrastructureOverview";
import { CaseStudyTakeaways } from "./CaseStudyTakeaways";
import { CaseStudyTechStack2 } from "./CaseStudyTechStack2";
import { CaseStudySectionChips, CaseStudySectionNav, type CaseStudyNavItem } from "@/components/work/layout-4/CaseStudySectionNav";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { CaseStudyLayout2 } from "@/lib/case-studies/layout-2";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

/** Layout 2 — โปรเจกต์สาย infrastructure/devops: hero รูปเดียว + การ์ดสรุป 4 ช่อง + diagram + metrics + takeaways เรียงเป็นแถบเดียว */
export function CaseStudyLayoutTwo({ study, lang }: { study: CaseStudyLayout2; lang?: "th" }) {
  const t = lang === "th" ? TH_CASE_STUDY_UI : null;

  // architectureDashboard กับ diagramShots ผลัดกันแสดงหัวข้อเดียวกัน (Infrastructure Overview) จึงนับเป็นแท็บเดียว
  const hasTakeaways = !!study.takeaways && study.takeaways.length > 0;
  const hasFeatures = !!study.features && study.features.length > 0;
  const hasInfrastructureOverview = !!study.architectureDashboard || study.diagramShots.length > 0;

  const navItems: CaseStudyNavItem[] = [
    ...(hasTakeaways ? [{ id: "takeaways", label: t?.keyTakeaways ?? "Key Takeaways" }] : []),
    { id: "summary", label: t?.projectSummary ?? "Summary" },
    ...(study.impact.length ? [{ id: "outcomes", label: lang === "th" ? "ผลลัพธ์" : "Outcomes" }] : []),
    ...(study.conceptOverview
      ? [
          {
            id: "concept-overview",
            label: study.conceptOverview.eyebrow ?? t?.projectOverviewFallback ?? "Project Overview",
          },
        ]
      : []),
    ...(hasFeatures ? [{ id: "feature-deep-dive", label: t?.featureDeepDive ?? "Feature Deep Dive" }] : []),
    ...(hasInfrastructureOverview
      ? [
          {
            id: "infrastructure-overview",
            label:
              study.architectureDashboard?.eyebrow ??
              study.galleryTitle ??
              t?.infrastructureOverview ??
              "Infrastructure Overview",
          },
        ]
      : []),
    { id: "tech-stack", label: t?.techStack ?? "Tech Stack" },
  ];

  return (
    <main lang={lang}>
      <CaseStudySectionNav items={navItems} lang={lang} />

      <Section theme="dark" className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-24">
        <Container className="max-w-[1680px]">
          <CaseStudyHero2 study={study} lang={lang} />
          <CaseStudySectionChips items={navItems} />
          {hasTakeaways && (
            <div id="takeaways" className="mt-12">
              <CaseStudyTakeaways items={study.takeaways!} lang={lang} />
            </div>
          )}
        </Container>
      </Section>

      <Section theme="dark" className="border-t border-line pb-20 md:pb-28">
        <Container className="max-w-[1680px]">
          <div className="grid gap-14">
            <div id="summary">
              <CaseStudyInfoCards study={study} lang={lang} />
            </div>
            <CaseStudyOutcomes items={study.impact} lang={lang} />
            {study.conceptOverview && (
              <div id="concept-overview">
                <CaseStudyConceptOverview concept={study.conceptOverview} lang={lang} />
              </div>
            )}
            {hasFeatures && (
              <div id="feature-deep-dive">
                <CaseStudyFeatureSections items={study.features!} lang={lang} />
              </div>
            )}
            {hasInfrastructureOverview && (
              <div id="infrastructure-overview">
                {study.architectureDashboard ? (
                  <CaseStudyArchitectureDashboard data={study.architectureDashboard} lang={lang} />
                ) : (
                  <CaseStudyInfrastructureOverview
                    shots={study.diagramShots}
                    title={study.galleryTitle}
                    lang={lang}
                  />
                )}
              </div>
            )}
            <div id="tech-stack">
              <CaseStudyTechStack2 items={study.techStack} lang={lang} />
            </div>
          </div>
        </Container>
      </Section>

    </main>
  );
}
