import { CaseStudyHero3 } from "./CaseStudyHero3";
import { CaseStudyInfoCards3 } from "./CaseStudyInfoCards3";
import { CaseStudyPhotoGallery } from "./CaseStudyPhotoGallery";
import { CaseStudyRelatedProjects } from "./CaseStudyRelatedProjects";
import { CaseStudyTechStack3 } from "./CaseStudyTechStack3";
import { CaseStudyWorkAreas3 } from "./CaseStudyWorkAreas3";
import { CaseStudySectionChips, CaseStudySectionNav, type CaseStudyNavItem } from "@/components/work/layout-4/CaseStudySectionNav";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { CaseStudyLayout3 } from "@/lib/case-studies/layout-3";
import { REAL_PROJECT_CARDS } from "@/lib/projects";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

/** Layout 3 — เน้นภาพเยอะ: hero gallery + การ์ดสรุป 4 ช่อง + photo gallery + tech stack + related projects */
export function CaseStudyLayoutThree({ study, lang }: { study: CaseStudyLayout3; lang?: "th" }) {
  const t = lang === "th" ? TH_CASE_STUDY_UI : null;

  // เงื่อนไขตรงกับที่ CaseStudyWorkAreas3 / CaseStudyRelatedProjects ใช้คืนค่า null เอง หัวข้อจะได้หลุดออกจากแท็บเมื่อไม่มีข้อมูลจริง
  const hasWorkAreas = study.galleryShots.some((shot) => shot.category);
  const hasRelatedProjects = REAL_PROJECT_CARDS.some((p) => p.slug !== study.slug);

  const navItems: CaseStudyNavItem[] = [
    { id: "summary", label: t?.projectSummary ?? "Summary" },
    ...(hasWorkAreas ? [{ id: "work-areas", label: t?.workAreas ?? "Work Areas" }] : []),
    { id: "photo-gallery", label: t?.photoGallery ?? "Photo Gallery" },
    { id: "tech-stack", label: t?.techStack ?? "Tech Stack" },
    ...(hasRelatedProjects ? [{ id: "related-projects", label: t?.relatedProjects ?? "Related Projects" }] : []),
  ];

  return (
    <main lang={lang}>
      <CaseStudySectionNav items={navItems} lang={lang} />

      <Section theme="dark" className="pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-24">
        <Container className="max-w-[1680px]">
          <CaseStudyHero3 study={study} lang={lang} />
          <CaseStudySectionChips items={navItems} />
        </Container>
      </Section>

      <Section theme="dark" className="border-t border-line pb-20 md:pb-28">
        <Container className="max-w-[1680px]">
          <div className="grid gap-14">
            <div id="summary">
              <CaseStudyInfoCards3 study={study} lang={lang} />
            </div>
            {hasWorkAreas && (
              <div id="work-areas">
                <CaseStudyWorkAreas3 shots={study.galleryShots} lang={lang} />
              </div>
            )}
            <div id="photo-gallery">
              <CaseStudyPhotoGallery shots={study.galleryShots} total={study.galleryTotal} lang={lang} />
            </div>
            <div id="tech-stack">
              <CaseStudyTechStack3 items={study.techStack} lang={lang} />
            </div>
            {hasRelatedProjects && (
              <div id="related-projects">
                <CaseStudyRelatedProjects currentSlug={study.slug} lang={lang} />
              </div>
            )}
          </div>
        </Container>
      </Section>

    </main>
  );
}
