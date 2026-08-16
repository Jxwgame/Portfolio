import { CaseStudyArchitectureDashboard } from "./CaseStudyArchitectureDashboard";
import { CaseStudyConceptOverview } from "./CaseStudyConceptOverview";
import { CaseStudyFeatureSections } from "./CaseStudyFeatureSections";
import { CaseStudyHero2 } from "./CaseStudyHero2";
import { CaseStudyInfoCards } from "./CaseStudyInfoCards";
import { CaseStudyInfrastructureOverview } from "./CaseStudyInfrastructureOverview";
import { CaseStudyTakeaways } from "./CaseStudyTakeaways";
import { CaseStudyTechStack2 } from "./CaseStudyTechStack2";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { CaseStudyLayout2 } from "@/lib/case-studies/layout-2";

/** Layout 2 — โปรเจกต์สาย infrastructure/devops: hero รูปเดียว + การ์ดสรุป 4 ช่อง + diagram + metrics + takeaways เรียงเป็นแถบเดียว */
export function CaseStudyLayoutTwo({ study, lang }: { study: CaseStudyLayout2; lang?: "th" }) {
  return (
    <main lang={lang}>
      <Section theme="dark" className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-24">
        <Container className="max-w-[1680px]">
          <CaseStudyHero2 study={study} lang={lang} />
          {study.takeaways && study.takeaways.length > 0 && (
            <div className="mt-12">
              <CaseStudyTakeaways items={study.takeaways} lang={lang} />
            </div>
          )}
        </Container>
      </Section>

      <Section theme="dark" className="border-t border-line pb-20 md:pb-28">
        <Container className="max-w-[1680px]">
          <div className="grid gap-14">
            <CaseStudyInfoCards study={study} lang={lang} />
            {study.conceptOverview && <CaseStudyConceptOverview concept={study.conceptOverview} lang={lang} />}
            {study.features && <CaseStudyFeatureSections items={study.features} lang={lang} />}
            {study.architectureDashboard ? (
              <CaseStudyArchitectureDashboard data={study.architectureDashboard} lang={lang} />
            ) : (
              study.diagramShots.length > 0 && (
                <CaseStudyInfrastructureOverview shots={study.diagramShots} lang={lang} />
              )
            )}
            <CaseStudyTechStack2 items={study.techStack} lang={lang} />
          </div>
        </Container>
      </Section>

    </main>
  );
}
