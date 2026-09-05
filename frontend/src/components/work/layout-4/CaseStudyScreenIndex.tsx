"use client";

import { useState } from "react";
import { LayoutList } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import { PhotoLightbox } from "../PhotoLightbox";
import type { CaseStudyLayout4 } from "@/lib/case-studies/layout-4";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

/**
 * แผ่นรวมทุกหน้าจอปิดท้ายหน้า — ทุกใบถูกลดเป็นขาวดำและหรี่ลง แผ่นทั้งแผ่นจึงอ่านเป็นวัตถุชิ้นเดียว
 * ใบที่ชี้เมาส์ค้างไว้เท่านั้นที่กลับมาเป็นสี เป็นวิธีบอกสายตาว่ากำลังดูใบไหนโดยไม่ต้องใส่กรอบหรือเงาเพิ่ม
 */
export function CaseStudyScreenIndex({
  index,
  lang,
}: {
  index: NonNullable<CaseStudyLayout4["screenIndex"]>;
  lang?: "th";
}) {
  const isThai = lang === "th";
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);

  return (
    <div>
      <Eyebrow>
        <LayoutList className="size-3.5" aria-hidden="true" />
        {index.eyebrow ?? (isThai ? TH_CASE_STUDY_UI.everyScreen : "Every screen")}
      </Eyebrow>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end lg:gap-12">
        <h2 className="font-display text-[clamp(2rem,4vw,2.9rem)] uppercase leading-[1] tracking-[-0.01em] text-fg">
          {index.title}
        </h2>
        <p className="text-[13px] leading-[1.75] text-muted">{index.description}</p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
        {index.shots.map((shot, i) => (
          <button
            key={shot.image}
            type="button"
            onClick={() => setZoomIndex(i)}
            aria-label={`${isThai ? TH_CASE_STUDY_UI.openFullSizeImagePrefix : "Open full-size image:"} ${shot.label}`}
            className="group cursor-zoom-in text-left"
          >
            <MediaPlaceholder
              image={shot.image}
              focus={shot.focus}
              fit="cover"
              className="aspect-[2/1] rounded-[10px] border border-line grayscale brightness-[0.8] contrast-[1.05] transition duration-300 group-hover:border-rust group-hover:grayscale-0 group-hover:brightness-100"
            />
            <span className="mt-2 flex gap-2 font-mono text-[10px] text-muted transition group-hover:text-fg">
              <span className="text-rust">{String(i + 1).padStart(2, "0")}</span>
              <span className="truncate">{shot.label}</span>
            </span>
          </button>
        ))}
      </div>

      <PhotoLightbox shots={index.shots} index={zoomIndex} onIndexChange={setZoomIndex} lang={lang} />
    </div>
  );
}
