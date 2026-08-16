"use client";

import { useState } from "react";
import { Building2, Layers, type LucideIcon, Server, ShieldCheck } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import { PhotoLightbox } from "./PhotoLightbox";
import { cn } from "@/lib/utils";
import type { CaseStudyShot3 } from "@/lib/case-studies/layout-3";
import { TH_CASE_STUDY_UI, TH_WORK_AREA_CATEGORY } from "@/lib/i18n/th";

const CATEGORY_ICON: Record<string, LucideIcon> = {
  "Data Center": Server,
  Site: Building2,
  DLP: ShieldCheck,
};

const CATEGORY_DESCRIPTION: Record<string, string> = {
  "Data Center": "Installed and maintained network equipment across server racks, from device configuration to full hardware swaps.",
  Site: "Supported on-site company activities, including trade fair booth setup and facility expansion.",
  DLP: "Evaluated Google Workspace DLP and Safetica through a hands-on proof-of-concept for data protection.",
};

/** จำนวนรูปที่มากกว่านี้ใช้ bento grid (รูปแรกเป็น hero ใหญ่) — น้อยกว่าหรือเท่ากับนี้แสดงเท่ากันหมดเป็นแถวเดียว */
const BENTO_THRESHOLD = 4;

function ThumbGrid({
  items,
  onOpen,
  lang,
}: {
  items: CaseStudyShot3[];
  onOpen: (index: number) => void;
  lang?: "th";
}) {
  const isThai = lang === "th";
  const openLabelPrefix = isThai ? TH_CASE_STUDY_UI.openFullSizeImagePrefix : "Open full-size image:";

  if (items.length > BENTO_THRESHOLD) {
    return (
      <div className="grid grid-flow-dense grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
        {items.map((shot, i) => (
          <button
            key={shot.label}
            type="button"
            onClick={() => onOpen(i)}
            aria-label={`${openLabelPrefix} ${shot.label}`}
            className={cn(
              "block overflow-hidden rounded-lg border border-line transition-transform duration-300 hover:scale-105",
              i === 0 ? "col-span-2 row-span-2" : "aspect-square",
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
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {items.map((shot, i) => (
        <button
          key={shot.label}
          type="button"
          onClick={() => onOpen(i)}
          aria-label={`${openLabelPrefix} ${shot.label}`}
          className="aspect-[4/3] flex-1 overflow-hidden rounded-lg border border-line transition-transform duration-300 hover:scale-105"
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
      ))}
    </div>
  );
}

/** จัดกลุ่ม galleryShots ตาม category แล้วสรุปเป็นการ์ดพื้นที่งาน — แสดงถัดจาก 4 การ์ดสรุป ก่อนถึง Photo Gallery แบบ grid เต็ม */
export function CaseStudyWorkAreas3({ shots, lang }: { shots: CaseStudyShot3[]; lang?: "th" }) {
  const isThai = lang === "th";
  const [active, setActive] = useState<{ items: CaseStudyShot3[]; index: number } | null>(null);

  const groups = new Map<string, CaseStudyShot3[]>();
  for (const shot of shots) {
    if (!shot.category) continue;
    const list = groups.get(shot.category) ?? [];
    list.push(shot);
    groups.set(shot.category, list);
  }

  if (groups.size === 0) return null;

  return (
    <div>
      <Eyebrow>
        <Layers className="size-3.5" aria-hidden="true" />
        {isThai ? TH_CASE_STUDY_UI.workAreas : "Work Areas"}
      </Eyebrow>

      <div className="mt-6 grid gap-4">
        {Array.from(groups.entries()).map(([category, items]) => {
          const Icon = CATEGORY_ICON[category] ?? Layers;
          const categoryLabel = (isThai && TH_WORK_AREA_CATEGORY[category]?.label) || category;
          const categoryDescription =
            (isThai && TH_WORK_AREA_CATEGORY[category]?.description) || CATEGORY_DESCRIPTION[category];
          const photosLabel = isThai ? `${items.length} ${TH_CASE_STUDY_UI.photosSuffix}` : `${items.length} photos`;

          return (
            <div key={category} className="rounded-2xl border border-line bg-surface p-5 md:flex md:items-start md:gap-6">
              <div className="shrink-0 md:w-64">
                <div className="flex items-center gap-2">
                  <Icon className="size-4 text-rust" aria-hidden="true" />
                  <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-fg">{categoryLabel}</h2>
                  <span className="ml-auto font-mono text-[10px] tabular-nums text-muted md:hidden">{photosLabel}</span>
                </div>

                {categoryDescription && (
                  <p className="mt-3 text-[13px] leading-[1.65] text-muted">{categoryDescription}</p>
                )}
                <span className="mt-3 hidden font-mono text-[10px] tabular-nums text-muted md:block">{photosLabel}</span>
              </div>

              <div className="mt-4 md:mt-0 md:flex-1">
                <ThumbGrid items={items} onOpen={(index) => setActive({ items, index })} lang={lang} />
              </div>
            </div>
          );
        })}
      </div>

      <PhotoLightbox
        shots={active?.items ?? []}
        index={active?.index ?? null}
        onIndexChange={(index) => setActive((a) => (a && index !== null ? { items: a.items, index } : null))}
        lang={lang}
      />
    </div>
  );
}
