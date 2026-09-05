"use client";

import { useState } from "react";
import { Network } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
import { GlossaryText } from "@/components/common/GlossaryText";
import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import { PhotoLightbox, ZoomTrigger } from "../PhotoLightbox";
import type { CaseStudyLayout4 } from "@/lib/case-studies/layout-4";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

/**
 * แผนภาพสถาปัตยกรรมหนึ่งใบเต็มความกว้าง — แสดงแบบ contain ไม่ครอป เพราะกล่องริมภาพคือเนื้อหา ไม่ใช่ขอบ
 * ตัวหนังสือในแผนภาพเล็กเกินกว่าจะอ่านที่ขนาดนี้ จึงกดเปิดดูขนาดเต็มได้ และมีโน้ตสั้น ๆ สรุปไว้ด้านล่าง
 */
export function CaseStudyArchitecture({
  architecture,
  lang,
}: {
  architecture: NonNullable<CaseStudyLayout4["architecture"]>;
  lang?: "th";
}) {
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const shots = [{ label: architecture.title, image: architecture.image }];

  return (
    <div>
      <Eyebrow>
        <Network className="size-3.5" aria-hidden="true" />
        {architecture.eyebrow ?? (lang === "th" ? TH_CASE_STUDY_UI.architectureOverview : "System architecture")}
      </Eyebrow>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end lg:gap-12">
        <h2 className="font-display text-[clamp(2rem,4vw,2.9rem)] uppercase leading-[1] tracking-[-0.01em] text-fg">
          {architecture.title}
        </h2>
        <p className="text-[13px] leading-[1.75] text-muted">
          <GlossaryText text={architecture.description} />
        </p>
      </div>

      {/* สัดส่วนตรงกับไฟล์ภาพ (1536×1024) จึงไม่เหลือขอบว่าง ไม่ต้องมีพื้นหลังหรือกรอบมาคั่นระหว่างแผนภาพกับหน้า */}
      <div className="relative mt-8 aspect-[3/2] overflow-hidden">
        <ZoomTrigger label={architecture.title} lang={lang} onClick={() => setZoomIndex(0)}>
          <MediaPlaceholder image={architecture.image} fit="contain" className="size-full" />
        </ZoomTrigger>
      </div>

      {architecture.notes && architecture.notes.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {architecture.notes.map((note) => (
            <div key={note.title} className="rounded-2xl border border-line bg-surface p-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-rust">{note.title}</span>
              <p className="mt-2.5 text-[12px] leading-[1.65] text-muted">
                <GlossaryText text={note.description} />
              </p>
            </div>
          ))}
        </div>
      )}

      <PhotoLightbox shots={shots} index={zoomIndex} onIndexChange={setZoomIndex} lang={lang} />
    </div>
  );
}
