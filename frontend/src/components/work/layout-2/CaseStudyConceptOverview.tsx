import { Layers, Route, ScrollText, ShieldCheck, Sparkles, Users, type LucideIcon } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import { cn } from "@/lib/utils";
import type { CaseStudyConceptOverview as CaseStudyConceptOverviewType } from "@/lib/case-studies/layout-2";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

const FEATURE_ICONS: Record<CaseStudyConceptOverviewType["features"][number]["icon"], LucideIcon> = {
  validate: ShieldCheck,
  environments: Layers,
  traceability: ScrollText,
  governance: Users,
};

/**
 * สรุปโครงสร้าง/แนวคิดภาพรวมของโปรเจกต์ก่อนเข้าเนื้อหา Feature Deep Dive
 * ฝั่งซ้ายเป็นข้อความ (หัวข้อ + จุดเด่น + สถิติ), ฝั่งขวาเป็นกริดภาพ diagram ที่มีเลขกำกับ
 * panel ที่ยังไม่มีรูปจริง (`image` ว่าง) จะโชว์กรอบไล่เฉดพร้อม label แทน รอใส่รูปที่ครอปแล้ว
 */
export function CaseStudyConceptOverview({
  concept,
  lang,
}: {
  concept: CaseStudyConceptOverviewType;
  lang?: "th";
}) {
  return (
    <div>
      <Eyebrow>
        <Route className="size-3.5" aria-hidden="true" />
        {concept.eyebrow ?? (lang === "th" ? TH_CASE_STUDY_UI.projectOverviewFallback : "Project Overview")}
      </Eyebrow>

      <div className="mt-6 grid gap-10 lg:grid-cols-[340px_1fr] lg:items-start lg:gap-12">
        <div>
          <h3 className="font-heading text-[30px] font-bold leading-[1.1] text-fg">{concept.title}</h3>
          <p className="mt-4 text-[13px] leading-[1.75] text-muted">{concept.description}</p>

          <div className="mt-8 grid gap-5">
            {concept.features.map((feature) => {
              const Icon = FEATURE_ICONS[feature.icon];
              return (
                <div key={feature.title} className="flex items-start gap-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-rust/15 text-rust">
                    <Icon className="size-4.5" aria-hidden="true" />
                  </span>
                  <div>
                    <h4 className="font-heading text-[13px] font-bold text-fg">{feature.title}</h4>
                    <p className="mt-0.5 text-[12px] leading-[1.6] text-muted">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {concept.impact && (
            <div className="mt-8 rounded-2xl border border-line bg-surface p-5">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                <Sparkles className="size-3.5" aria-hidden="true" />
                {concept.impact.title}
              </span>
              <p className="mt-2 text-[12px] leading-[1.65] text-muted">{concept.impact.description}</p>
            </div>
          )}

          {concept.secondary && (
            <div className="mt-8">
              <h3 className="font-heading text-[22px] font-bold leading-[1.15] text-fg">{concept.secondary.title}</h3>
              <p className="mt-3 text-[13px] leading-[1.75] text-muted">{concept.secondary.description}</p>
            </div>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {concept.panels.map((panel) => (
            <div
              key={panel.number}
              className={cn("rounded-2xl bg-paper p-5 shadow-lg sm:p-6", panel.span !== "half" && "sm:col-span-2")}
            >
              <span className="font-mono text-[11px] font-bold uppercase tracking-normal text-rust-deep">
                {String(panel.number).padStart(2, "0")}. {panel.title}
              </span>
              <p className="mt-1 text-[12px] leading-[1.6] text-ink/60">{panel.description}</p>
              <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-xl">
                <MediaPlaceholder
                  image={panel.image}
                  gradient={panel.gradient}
                  label={panel.title}
                  focus={panel.focus}
                  fit="contain"
                  className="size-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
