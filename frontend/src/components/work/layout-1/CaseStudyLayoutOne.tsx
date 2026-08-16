import { CaseStudyArchitecture } from "./CaseStudyArchitecture";
import { CaseStudyChallenges } from "./CaseStudyChallenges";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyOverview } from "./CaseStudyOverview";
import { CaseStudyShots } from "./CaseStudyShots";
import { CaseStudyTechStack } from "./CaseStudyTechStack";
import { CaseStudyTimeline } from "./CaseStudyTimeline";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { CaseStudyLayout1 } from "@/lib/case-studies/layout-1";

/** Layout 1 — gallery ทางซ้าย + การ์ด timeline/overview/tech-stack/architecture/challenges แบบ 3 คอลัมน์ */
export function CaseStudyLayoutOne({ study, lang }: { study: CaseStudyLayout1; lang?: "th" }) {
  const hasArchitecture = Boolean(study.architecture?.length);
  const hasChallenges = Boolean(study.challenges?.length);
  const hasSupplementarySections = hasArchitecture || hasChallenges;

  return (
    <main lang={lang}>
      <Section theme="dark" className="pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-24">
        <Container className="max-w-[1680px]">
          <CaseStudyHero study={study} lang={lang} />
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
              className={hasSupplementarySections ? "lg:row-span-2" : undefined}
              lang={lang}
            />
            <CaseStudyOverview description={study.description} highlights={study.highlights} lang={lang} />
            {hasArchitecture && <CaseStudyArchitecture nodes={study.architecture!} />}
            {hasChallenges && <CaseStudyChallenges items={study.challenges!} className="lg:col-span-2" />}
          </div>

          <div className="mt-14">
            <CaseStudyTechStack groups={study.techStack} lang={lang} />
          </div>

          <div className="mt-14">
            <CaseStudyShots shots={study.shots} lang={lang} />
          </div>
        </Container>
      </Section>

    </main>
  );
}
