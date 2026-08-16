import { CircleCheckBig, ClipboardList } from "lucide-react";

import { GlossaryText } from "@/components/common/GlossaryText";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

import { CaseStudyCard } from "./CaseStudyCard";

export function CaseStudyOverview({
  description,
  highlights,
  lang,
}: {
  description: string;
  highlights: string[];
  lang?: "th";
}) {
  return (
    <CaseStudyCard icon={ClipboardList} title={lang === "th" ? TH_CASE_STUDY_UI.overview : "Overview"}>
      <p className="leading-[1.75] text-muted"><GlossaryText text={description} /></p>
      <ul className="mt-5 grid gap-2.5">
        {highlights.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-fg">
            <CircleCheckBig className="mt-0.5 size-4 shrink-0 text-rust" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </CaseStudyCard>
  );
}
