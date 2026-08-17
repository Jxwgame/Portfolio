"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import { PhotoLightbox, ZoomTrigger } from "../PhotoLightbox";
import type { CaseStudyShot3 } from "@/lib/case-studies/layout-3";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";
import { cn } from "@/lib/utils";

/** ภาพหลักขนาดใหญ่ + ตัวนับหน้าซ้อนมุมล่างขวา พร้อมแถบ thumbnail เลื่อนได้ด้านล่าง — กดที่ภาพหลักเพื่อเปิดดูเต็มไม่ครอปใน lightbox */
export function CaseStudyHeroGallery3({ shots, lang }: { shots: CaseStudyShot3[]; lang?: "th" }) {
  const isThai = lang === "th";
  const [active, setActive] = useState(0);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const stripRef = useRef<HTMLUListElement>(null);
  const go = (delta: number) => setActive((i) => (i + delta + shots.length) % shots.length);
  const scrollStrip = (delta: number) => stripRef.current?.scrollBy({ left: delta, behavior: "smooth" });

  return (
    <div>
      <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-line">
        <ZoomTrigger label={shots[active].label} lang={lang} onClick={() => setZoomIndex(active)}>
          <MediaPlaceholder
            gradient={shots[active].gradient}
            image={shots[active].image}
            label={shots[active].label}
            className="size-full"
            fit="cover"
            focus={shots[active].focus}
            priority
          />
        </ZoomTrigger>

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
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => scrollStrip(-240)}
          aria-label={isThai ? TH_CASE_STUDY_UI.scrollThumbnailsLeft : "Scroll thumbnails left"}
          className="hidden size-8 shrink-0 place-items-center rounded-full border border-line text-muted transition hover:border-rust hover:text-rust sm:grid"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>

        <ul ref={stripRef} className="flex flex-1 gap-2.5 overflow-x-auto pb-1">
          {shots.map((shot, i) => (
            <li key={shot.label} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={i === active}
                aria-label={shot.label}
                className={cn(
                  "relative h-[60px] w-20 shrink-0 overflow-hidden rounded-lg border transition",
                  i === active ? "border-rust" : "border-line opacity-60 hover:opacity-100",
                )}
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

        <button
          type="button"
          onClick={() => scrollStrip(240)}
          aria-label={isThai ? TH_CASE_STUDY_UI.scrollThumbnailsRight : "Scroll thumbnails right"}
          className="hidden size-8 shrink-0 place-items-center rounded-full border border-line text-muted transition hover:border-rust hover:text-rust sm:grid"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>

      <PhotoLightbox shots={shots} index={zoomIndex} onIndexChange={setZoomIndex} lang={lang} />
    </div>
  );
}
