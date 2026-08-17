"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
import { GlossaryText } from "@/components/common/GlossaryText";
import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import { PhotoLightbox, ZoomTrigger } from "../PhotoLightbox";
import { cn } from "@/lib/utils";
import type { CaseStudyFeature } from "@/lib/case-studies/layout-2";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

/** ฝั่งภาพของแต่ละฟีเจอร์ — ถ้ามีมากกว่า 1 รูปจะกลายเป็น carousel เลื่อนซ้าย/ขวาได้ กดที่รูปเพื่อเปิดดูเต็มใน lightbox
 * (ภาพในบล็อกนี้ถูกครอปเป็น 2:1 จึงต้องมีทางดูเต็มใบ) */
function FeatureMedia({ feature, lang }: { feature: CaseStudyFeature; lang?: "th" }) {
  const isThai = lang === "th";
  const images = feature.images ?? [];
  const [active, setActive] = useState(0);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const go = (delta: number) => setActive((i) => (i + delta + images.length) % images.length);
  const zoomShots = images.map((image) => ({
    label: feature.title,
    gradient: feature.gradient,
    image,
    focus: feature.focus,
  }));

  return (
    <div className="relative aspect-[2/1] overflow-hidden rounded-2xl">
      {images.length > 0 ? (
        <ZoomTrigger label={feature.title} lang={lang} onClick={() => setZoomIndex(active)}>
          <MediaPlaceholder
            gradient={feature.gradient}
            label={feature.title}
            image={images[active]}
            focus={feature.focus}
            fit="cover"
            className="size-full"
          />
        </ZoomTrigger>
      ) : (
        <MediaPlaceholder
          gradient={feature.gradient}
          label={feature.title}
          focus={feature.focus}
          fit="cover"
          className="size-full"
        />
      )}

      {images.length > 1 && (
        <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full border border-paper/20 bg-ink/70 p-1.5 pl-3 backdrop-blur">
          <span className="font-mono text-[11px] tabular-nums text-paper/80">
            {active + 1} / {images.length}
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
      )}

      <PhotoLightbox shots={zoomShots} index={zoomIndex} onIndexChange={setZoomIndex} lang={lang} />
    </div>
  );
}

/** บล็อกภาพ+ข้อความสลับข้างต่อฟีเจอร์ — ใช้ขยายความ highlights แต่ละข้อให้มีบริบทมากขึ้น */
export function CaseStudyFeatureSections({ items, lang }: { items: CaseStudyFeature[]; lang?: "th" }) {
  if (items.length === 0) return null;

  return (
    <div>
      <Eyebrow>{lang === "th" ? TH_CASE_STUDY_UI.featureDeepDive : "Feature Deep Dive"}</Eyebrow>
      <div className="mt-6 grid gap-12">
        {items.map((feature, index) => (
          <div key={feature.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div className={cn(index % 2 === 1 && "lg:order-2")}>
              <FeatureMedia feature={feature} lang={lang} />
            </div>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-rust">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-heading text-[22px] font-bold text-fg">{feature.title}</h3>
              <p className="mt-3 max-w-[52ch] text-[14px] leading-[1.75] text-muted">
                <GlossaryText text={feature.description} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
