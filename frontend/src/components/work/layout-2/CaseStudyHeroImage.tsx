"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import { PhotoLightbox, ZoomTrigger } from "../PhotoLightbox";
import type { CaseStudyDiagramShot } from "@/lib/case-studies/layout-2";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

/**
 * ภาพหลักของ hero พร้อมปุ่มเลื่อนดูภาพ + ตัวนับหน้าซ้อนมุมล่างขวา — กดที่รูปเพื่อเปิดดูขนาดเต็มใน lightbox
 * แสดงตามสัดส่วนจริงของรูป (ไม่ครอป ไม่มีกรอบขอบว่างจากการบังคับ aspect ratio คงที่) — กรอบห่อรูปแบบ w-fit
 * เพื่อให้ปุ่ม/ตัวนับ (absolute) เกาะติดขอบรูปจริง ไม่ลอยอยู่ในพื้นที่ว่างข้าง ๆ เวลารูปแคบกว่าคอลัมน์
 */
export function CaseStudyHeroImage({ shots, lang }: { shots: CaseStudyDiagramShot[]; lang?: "th" }) {
  const isThai = lang === "th";
  const [active, setActive] = useState(0);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const go = (delta: number) => setActive((i) => (i + delta + shots.length) % shots.length);
  const shot = shots[active];

  return (
    <div className="relative mx-auto w-fit max-w-full">
      {shot.image ? (
        <ZoomTrigger
          label={shot.label}
          lang={lang}
          onClick={() => setZoomIndex(active)}
          className="static block w-fit max-w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ยังไม่ได้ตั้ง remote patterns ของ next/image */}
          <img
            src={shot.image}
            alt={shot.label}
            className="block max-h-[640px] w-auto max-w-full rounded-2xl border border-line object-contain"
          />
        </ZoomTrigger>
      ) : (
        <MediaPlaceholder gradient={shot.gradient} label={shot.label} className="aspect-[2/1] w-full rounded-2xl" />
      )}

      <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full border border-paper/20 bg-ink/70 p-1.5 pl-3 backdrop-blur">
        <span className="font-mono text-[11px] tabular-nums text-paper/80">
          {active + 1} / {shots.length}
        </span>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={isThai ? TH_CASE_STUDY_UI.previousImage : "Previous image"}
          className="grid size-7 place-items-center rounded-full text-paper transition hover:bg-rust"
        >
          <ChevronLeft className="size-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={isThai ? TH_CASE_STUDY_UI.nextImage : "Next image"}
          className="grid size-7 place-items-center rounded-full text-paper transition hover:bg-rust"
        >
          <ChevronRight className="size-3.5" aria-hidden="true" />
        </button>
      </div>

      <PhotoLightbox shots={shots} index={zoomIndex} onIndexChange={setZoomIndex} lang={lang} />
    </div>
  );
}
