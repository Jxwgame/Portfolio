"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import type { CaseStudyShot } from "@/lib/case-studies/layout-1";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";
import { cn } from "@/lib/utils";

/** ภาพหลัก + แถบ thumbnail เลื่อนดูภาพโปรเจกต์ในหัวหน้า case study */
export function CaseStudyGalleryCarousel({ shots, lang }: { shots: CaseStudyShot[]; lang?: "th" }) {
  const isThai = lang === "th";
  const [active, setActive] = useState(0);
  const go = (delta: number) => setActive((i) => (i + delta + shots.length) % shots.length);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
        <MediaPlaceholder
          gradient={shots[active].gradient}
          label={shots[active].label}
          image={shots[active].image}
          focus={shots[active].focus}
          fit="cover"
          className="size-full"
        />

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={isThai ? TH_CASE_STUDY_UI.previousImage : "Previous image"}
          className="absolute left-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-paper/25 bg-ink/70 text-paper backdrop-blur transition hover:border-rust hover:bg-rust"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={isThai ? TH_CASE_STUDY_UI.nextImage : "Next image"}
          className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-paper/25 bg-ink/70 text-paper backdrop-blur transition hover:border-rust hover:bg-rust"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1">
        {shots.map((shot, i) => (
          <button
            key={shot.label}
            type="button"
            onClick={() => setActive(i)}
            aria-current={i === active}
            aria-label={shot.label}
            className={cn(
              "relative aspect-[4/3] w-16 shrink-0 overflow-hidden rounded-lg border transition sm:w-20",
              i === active ? "border-rust" : "border-line opacity-60 hover:opacity-100",
            )}
          >
            <MediaPlaceholder gradient={shot.gradient} image={shot.image} focus={shot.focus} fit="cover" className="size-full" />
          </button>
        ))}
      </div>
    </div>
  );
}
