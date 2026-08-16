"use client";

import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import type { CaseStudyShot3 } from "@/lib/case-studies/layout-3";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

/**
 * Lightbox แสดงรูปเต็มไม่ครอป ใช้ร่วมกันระหว่าง Photo Gallery และ Work Areas
 * ผู้เรียกดูแล `shots`/`index` เอง — ส่ง index เป็น null เพื่อปิด, เปลี่ยน index ผ่าน onIndexChange เพื่อเลื่อนรูป
 */
export function PhotoLightbox({
  shots,
  index,
  onIndexChange,
  lang,
}: {
  shots: CaseStudyShot3[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
  lang?: "th";
}) {
  const isThai = lang === "th";

  useEffect(() => {
    if (index === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onIndexChange(null);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + shots.length) % shots.length);
      if (e.key === "ArrowRight") onIndexChange((index + 1) % shots.length);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [index, shots.length, onIndexChange]);

  if (index === null) return null;
  const activeShot = shots[index];
  const go = (delta: number) => onIndexChange((index + delta + shots.length) % shots.length);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={activeShot.label}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={() => onIndexChange(null)}
    >
      <button
        type="button"
        onClick={() => onIndexChange(null)}
        aria-label={isThai ? TH_CASE_STUDY_UI.close : "Close"}
        className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-paper/20 bg-ink/70 text-paper transition hover:bg-rust"
      >
        <X className="size-4" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        aria-label={isThai ? TH_CASE_STUDY_UI.previousImage : "Previous image"}
        className="absolute left-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-paper/20 bg-ink/70 text-paper transition hover:bg-rust sm:left-4"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
      </button>

      <div
        className="relative aspect-[4/3] max-h-[80vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-line"
        onClick={(e) => e.stopPropagation()}
      >
        <MediaPlaceholder gradient={activeShot.gradient} image={activeShot.image} label={activeShot.label} className="size-full" fit="contain" />
        <span className="absolute bottom-3 right-3 rounded-full border border-paper/20 bg-ink/70 px-3 py-1 font-mono text-[11px] tabular-nums text-paper/80 backdrop-blur">
          {index + 1} / {shots.length}
        </span>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        aria-label={isThai ? TH_CASE_STUDY_UI.nextImage : "Next image"}
        className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-paper/20 bg-ink/70 text-paper transition hover:bg-rust sm:right-4"
      >
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
