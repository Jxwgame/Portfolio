import { Images } from "lucide-react";

import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import { Eyebrow } from "@/components/common/Eyebrow";
import type { CaseStudyShot } from "@/lib/case-studies/layout-1";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

export function CaseStudyShots({ shots, lang }: { shots: CaseStudyShot[]; lang?: "th" }) {
  return (
    <div>
      <Eyebrow>
        <Images className="size-3.5" aria-hidden="true" />
        {lang === "th" ? TH_CASE_STUDY_UI.projectGallery : "Project Gallery"}
      </Eyebrow>
      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {shots.map((shot) => (
          <li key={shot.label} className="overflow-hidden rounded-xl border border-line">
            <MediaPlaceholder
              gradient={shot.gradient}
              label={shot.label}
              image={shot.image}
              focus={shot.focus}
              fit="cover"
              className="aspect-[4/3]"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
