import { CaseStudyHero3 } from "./CaseStudyHero3";
import { CaseStudyInfoCards3 } from "./CaseStudyInfoCards3";
import { CaseStudyPhotoGallery } from "./CaseStudyPhotoGallery";
import { CaseStudyRelatedProjects } from "./CaseStudyRelatedProjects";
import { CaseStudyTechStack3 } from "./CaseStudyTechStack3";
import { CaseStudyWorkAreas3 } from "./CaseStudyWorkAreas3";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { CaseStudyLayout3 } from "@/lib/case-studies/layout-3";

/** Layout 3 — เน้นภาพเยอะ: hero gallery + การ์ดสรุป 4 ช่อง + photo gallery + tech stack + related projects */
export function CaseStudyLayoutThree({ study, lang }: { study: CaseStudyLayout3; lang?: "th" }) {
  return (
    <main lang={lang}>
      <Section theme="dark" className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-24">
        <Container className="max-w-[1680px]">
          <CaseStudyHero3 study={study} lang={lang} />
        </Container>
      </Section>

      <Section theme="dark" className="border-t border-line pb-20 md:pb-28">
        <Container className="max-w-[1680px]">
          <div className="grid gap-14">
            <CaseStudyInfoCards3 study={study} lang={lang} />
            <CaseStudyWorkAreas3 shots={study.galleryShots} lang={lang} />
            <CaseStudyPhotoGallery shots={study.galleryShots} total={study.galleryTotal} lang={lang} />
            <CaseStudyTechStack3 items={study.techStack} lang={lang} />
            <CaseStudyRelatedProjects currentSlug={study.slug} lang={lang} />
          </div>
        </Container>
      </Section>

    </main>
  );
}
