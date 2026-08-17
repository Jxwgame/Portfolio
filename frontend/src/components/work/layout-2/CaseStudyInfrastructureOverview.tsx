"use client";

import { useState } from "react";
import { Network } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import { PhotoLightbox, ZoomTrigger } from "../PhotoLightbox";
import { cn } from "@/lib/utils";
import type { CaseStudyDiagramShot } from "@/lib/case-studies/layout-2";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

/**
 * ภาพหลัก + thumbnail กริด — กด thumbnail เพื่อสลับภาพหลักได้ (เหมือน hero carousel) กดที่ภาพหลักเพื่อเปิด lightbox
 * ไม่รวม mainDiagram เพราะบางโปรเจกต์ใช้ตรงนั้นเป็นโลโก้ ไม่ใช่ภาพเนื้องาน
 * ถ้ามีแค่ shot เดียว จะแสดงเป็นภาพเต็มความกว้างภาพเดียว ไม่มี thumbnail/ตัวนับ — ใช้ตอนอยากใส่กราฟิกสรุปภาพเดียวแทน gallery
 */
export function CaseStudyInfrastructureOverview({
  shots: allShots,
  lang,
}: {
  shots: CaseStudyDiagramShot[];
  lang?: "th";
}) {
  const [active, setActive] = useState(0);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const isSingle = allShots.length <= 1;

  return (
    <div>
      <Eyebrow>
        <Network className="size-3.5" aria-hidden="true" />
        {lang === "th" ? TH_CASE_STUDY_UI.infrastructureOverview : "Infrastructure Overview"}
      </Eyebrow>

      <div className={cn("mt-6 grid gap-4", !isSingle && "lg:grid-cols-[1.7fr_1fr]")}>
        <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-line">
          <ZoomTrigger label={allShots[active].label} lang={lang} onClick={() => setZoomIndex(active)}>
            <MediaPlaceholder
              gradient={allShots[active].gradient}
              label={allShots[active].label}
              image={allShots[active].image}
              focus={allShots[active].focus}
              fit="contain"
              className="size-full"
            />
          </ZoomTrigger>
          {!isSingle && (
            <span className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-paper/20 bg-ink/70 px-3 py-1 font-mono text-[11px] tabular-nums text-paper/80 backdrop-blur">
              {active + 1} / {allShots.length}
            </span>
          )}
        </div>

        {!isSingle && (
          <div className="grid content-start grid-cols-2 gap-3 self-start">
            {allShots.map((shot, index) =>
              index === active ? null : (
                <button
                  key={shot.label}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={shot.label}
                  className="overflow-hidden rounded-xl border border-line text-left transition hover:border-rust/50"
                >
                  <MediaPlaceholder
                    gradient={shot.gradient}
                    label={shot.label}
                    image={shot.image}
                    focus={shot.focus}
                    fit="cover"
                    className="aspect-[4/3]"
                  />
                </button>
              ),
            )}
          </div>
        )}
      </div>

      <PhotoLightbox shots={allShots} index={zoomIndex} onIndexChange={setZoomIndex} lang={lang} />
    </div>
  );
}
