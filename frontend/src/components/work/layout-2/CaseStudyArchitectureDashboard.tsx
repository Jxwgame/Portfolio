import { LayoutDashboard, Network, Workflow } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import { cn } from "@/lib/utils";
import type { CaseStudyArchitectureDashboard as CaseStudyArchitectureDashboardType } from "@/lib/case-studies/layout-2";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

/**
 * ฝั่งซ้าย: ภาพ diagram สถาปัตยกรรมเดียว, ฝั่งขวา: กริดภาพ screenshot แดชบอร์ดจริง 2 คอลัมน์เท่ากันทุกช่อง (ไม่ใช่กราฟจำลอง)
 * ใช้ fit="cover" ให้ทุกช่องขนาดเท่ากัน (เลย์เอาต์กริดสำคัญกว่าการโชว์ภาพเต็มไม่ครอป) — ตั้ง `focus` ต่อรูปถ้าจุดสำคัญไม่ได้อยู่กลางภาพ
 * แทนที่ gallery ปกติของ Infrastructure Overview เมื่อโปรเจกต์มีทั้ง diagram และ screenshot แดชบอร์ดพร้อมใช้
 */
export function CaseStudyArchitectureDashboard({
  data,
  lang,
}: {
  data: CaseStudyArchitectureDashboardType;
  lang?: "th";
}) {
  const isThai = lang === "th";
  return (
    <div>
      <Eyebrow>
        <Network className="size-3.5" aria-hidden="true" />
        {data.eyebrow ?? (isThai ? TH_CASE_STUDY_UI.infrastructureOverview : "Infrastructure Overview")}
      </Eyebrow>

      <div className="mt-6 grid gap-4 lg:grid-cols-2 lg:items-start">
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl bg-paper p-5 shadow-lg sm:p-6">
            <div className="flex items-center gap-2">
              <Workflow className="size-4 text-ink/70" aria-hidden="true" />
              <h3 className="font-heading text-[15px] font-bold text-ink">{data.architectureTitle}</h3>
            </div>
            <div className="relative mt-4 aspect-video overflow-hidden rounded-xl">
              <MediaPlaceholder
                image={data.architectureImage.image}
                label={data.architectureImage.label}
                focus={data.architectureImage.focus}
                fit="contain"
                className="size-full"
              />
            </div>
          </div>
          {data.architectureDescription && (
            <p className="text-sm leading-relaxed text-muted">{data.architectureDescription}</p>
          )}
          {data.architectureStages && data.architectureStages.length > 0 && (
            <div>
              <Eyebrow className="text-muted">{isThai ? TH_CASE_STUDY_UI.pipelineStages : "Pipeline Stages"}</Eyebrow>
              <ol className="mt-4 flex flex-col gap-3">
                {data.architectureStages.map((stage, i) => (
                  <li key={stage.title} className="flex gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-rust/50 font-mono text-[11px] font-bold text-rust">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-muted">
                      <span className="font-semibold text-paper">{stage.title}.</span> {stage.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-paper p-5 shadow-lg sm:p-6">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="size-4 text-ink/70" aria-hidden="true" />
            <h3 className="font-heading text-[15px] font-bold text-ink">{data.dashboardTitle}</h3>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {data.dashboardImages.map((item) => (
              <div
                key={item.image}
                className={cn(
                  "relative aspect-[3/2] overflow-hidden rounded-xl border border-ink/10",
                  item.span === "full" && "col-span-2 aspect-[16/9]",
                )}
              >
                <MediaPlaceholder image={item.image} label={item.label} focus={item.focus} fit="cover" className="size-full" />
                {item.label && (
                  <span className="absolute bottom-2 left-2 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[10px] text-paper/85 backdrop-blur">
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
