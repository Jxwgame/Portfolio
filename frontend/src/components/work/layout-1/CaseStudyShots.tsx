"use client";

import { useState } from "react";
import { Images } from "lucide-react";

import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import { Eyebrow } from "@/components/common/Eyebrow";
import { PhotoLightbox } from "../PhotoLightbox";
import type { CaseStudyShot } from "@/lib/case-studies/layout-1";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

/** ตารางรูปโปรเจกต์ ครอปเต็มกรอบให้ทุกช่องขนาดเท่ากัน — กดรูปไหนก็ได้เพื่อดูรูปเต็มไม่ครอปใน lightbox */
export function CaseStudyShots({ shots, lang }: { shots: CaseStudyShot[]; lang?: "th" }) {
  const isThai = lang === "th";
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <Eyebrow>
        <Images className="size-3.5" aria-hidden="true" />
        {isThai ? TH_CASE_STUDY_UI.projectGallery : "Project Gallery"}
      </Eyebrow>
      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {shots.map((shot, i) => (
          <li key={shot.label} className="overflow-hidden rounded-xl border border-line">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`${isThai ? TH_CASE_STUDY_UI.openFullSizeImagePrefix : "Open full-size image:"} ${shot.label}`}
              className="block aspect-[4/3] w-full cursor-zoom-in transition-transform duration-300 hover:scale-105"
            >
              <MediaPlaceholder
                gradient={shot.gradient}
                label={shot.label}
                image={shot.image}
                focus={shot.focus}
                fit="cover"
                className="size-full"
              />
            </button>
          </li>
        ))}
      </ul>

      <PhotoLightbox shots={shots} index={openIndex} onIndexChange={setOpenIndex} lang={lang} />
    </div>
  );
}
