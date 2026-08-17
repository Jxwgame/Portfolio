"use client";

import { useState } from "react";
import { Images } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import { PhotoLightbox } from "../PhotoLightbox";
import type { CaseStudyShot3 } from "@/lib/case-studies/layout-3";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

/**
 * ตารางรูปครอปเต็มกรอบให้ทุกช่องขนาดสม่ำเสมอ (object-cover) — คลิกรูปไหนก็ได้เพื่อดูรูปเต็มไม่ครอปใน lightbox
 */
export function CaseStudyPhotoGallery({
  shots,
  total,
  lang,
}: {
  shots: CaseStudyShot3[];
  total: number;
  lang?: "th";
}) {
  const isThai = lang === "th";
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Eyebrow>
          <Images className="size-3.5" aria-hidden="true" />
          {isThai ? TH_CASE_STUDY_UI.photoGallery : "Photo Gallery"}
        </Eyebrow>
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          {isThai ? TH_CASE_STUDY_UI.viewAllPrefix : "View all"} ({total})
        </span>
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {shots.map((shot, i) => (
          <li key={shot.label} className="overflow-hidden rounded-xl border border-line">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`${isThai ? TH_CASE_STUDY_UI.openFullSizeImagePrefix : "Open full-size image:"} ${shot.label}`}
              className="block aspect-[4/3] w-full transition-transform duration-300 hover:scale-105"
            >
              <MediaPlaceholder
                gradient={shot.gradient}
                image={shot.image}
                label={shot.label}
                className="size-full"
                fit="cover"
                focus={shot.focus}
              />
            </button>
          </li>
        ))}
      </ul>

      <PhotoLightbox shots={shots} index={openIndex} onIndexChange={setOpenIndex} lang={lang} />
    </div>
  );
}
