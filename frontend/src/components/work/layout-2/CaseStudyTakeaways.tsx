import { Activity, Cog, Layers, type LucideIcon } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
import type { CaseStudyTakeaway } from "@/lib/case-studies/layout-2";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

const TAKEAWAY_ICONS: Record<CaseStudyTakeaway["icon"], LucideIcon> = {
  scalable: Layers,
  automation: Cog,
  observability: Activity,
};

export function CaseStudyTakeaways({ items, lang }: { items: CaseStudyTakeaway[]; lang?: "th" }) {
  return (
    <div>
      <Eyebrow>{lang === "th" ? TH_CASE_STUDY_UI.keyTakeaways : "Key Takeaways"}</Eyebrow>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {items.map((item) => {
          const Icon = TAKEAWAY_ICONS[item.icon];
          return (
            <div key={item.title} className="rounded-2xl border border-line bg-surface p-5">
              <span className="grid size-11 place-items-center rounded-full bg-rust/15 text-rust">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-heading text-[15px] font-bold text-fg">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.65] text-muted">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
