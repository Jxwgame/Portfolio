import { LayoutGrid } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
import { ProjectCard } from "@/components/work/ProjectCard";
import { REAL_PROJECT_CARDS } from "@/lib/projects";
import { TH_CASE_STUDY_UI, localizeProjectsForThai } from "@/lib/i18n/th";

/** โปรเจกต์อื่นที่น่าสนใจ — สุ่มหยิบจากรายการจริง ไม่รวมโปรเจกต์ปัจจุบัน */
export function CaseStudyRelatedProjects({ currentSlug, lang }: { currentSlug: string; lang?: "th" }) {
  const isThai = lang === "th";
  const cards = isThai ? localizeProjectsForThai(REAL_PROJECT_CARDS) : REAL_PROJECT_CARDS;
  const related = cards.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <div>
      <Eyebrow>
        <LayoutGrid className="size-3.5" aria-hidden="true" />
        {isThai ? TH_CASE_STUDY_UI.relatedProjects : "Related Projects"}
      </Eyebrow>
      <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((project, i) => (
          <li key={project.slug}>
            <ProjectCard
              project={project}
              index={i}
              hrefBase={isThai ? "/th/work" : "/work"}
              viewLabel={isThai ? "ดูโปรเจกต์" : undefined}
              recommendedLabel={isThai ? "แนะนำ" : undefined}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
