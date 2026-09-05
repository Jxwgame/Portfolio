"use client";

import { useState } from "react";
import { LayoutGrid } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
import { GlossaryText } from "@/components/common/GlossaryText";
import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import { PhotoLightbox, ZoomTrigger } from "../PhotoLightbox";
import { cn } from "@/lib/utils";
import type { CaseStudyModule } from "@/lib/case-studies/layout-4";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

/** เลขกำกับวงกลม ใช้ทั้งบนกรอบเส้นประในภาพและหน้าคำอธิบายแต่ละข้อ ให้จับคู่กันได้ด้วยสายตา */
function Marker({
  number,
  className,
  style,
}: {
  number: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={style}
      className={cn(
        "grid size-6 shrink-0 place-items-center rounded-full bg-rust font-heading text-[12px] font-bold text-ink",
        className,
      )}
    >
      {number}
    </span>
  );
}

/**
 * ชั้นบนของภาพหน้าจอ — กรอบเส้นประครอบพื้นที่ที่กำลังอธิบาย พร้อมเลขกำกับเกาะมุมซ้ายบนของกรอบ
 * พิกัดเป็น % ของภาพ จึงขยับตามความกว้างจอเองโดยไม่ต้องคำนวณใหม่ และเลขไปจับคู่กับคำอธิบายฝั่งข้อความ
 */
function AnnotationOverlay({ module: mod }: { module: CaseStudyModule }) {
  if (!mod.annotations || mod.annotations.length === 0) return null;
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {mod.annotations.map((annotation) => (
        <div key={annotation.number}>
          <span
            className="absolute rounded-md border border-dashed border-rust/90 bg-rust/[0.06]"
            style={{
              left: `${annotation.box.x}%`,
              top: `${annotation.box.y}%`,
              width: `${annotation.box.w}%`,
              height: `${annotation.box.h}%`,
            }}
          />
          <Marker
            number={annotation.number}
            className="absolute -translate-x-1/2 -translate-y-1/2 shadow-[0_0_0_4px_var(--bg)]"
            style={{ left: `${annotation.box.x}%`, top: `${annotation.box.y}%` }}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * หน้าจอทั้งโมดูลซ้อนกันเป็นสำรับ กดใบที่อยู่ข้างหลังเพื่อดึงขึ้นมาข้างหน้า
 * ทำให้โมดูลที่มี 4 หน้าจอกินพื้นที่แนวตั้งเท่าโมดูลที่มีหน้าจอเดียว จังหวะของหน้าจึงไม่เพี้ยนตามจำนวนภาพ
 */
function ScreenDeck({
  module: mod,
  onZoom,
  lang,
}: {
  module: CaseStudyModule;
  onZoom: (index: number) => void;
  lang?: "th";
}) {
  const isThai = lang === "th";
  const [active, setActive] = useState(0);
  const total = mod.screens.length;

  return (
    <div className="relative aspect-[3/2] w-full">
      {mod.screens.map((screen, index) => {
        // ลำดับความลึกวนรอบ: 0 คือใบหน้าสุด ใบถัด ๆ ไปเยื้องลงและหรี่ลงตามระยะ
        const depth = (index - active + total) % total;
        const isFront = depth === 0;

        return (
          <div
            key={screen.image}
            className={cn(
              "absolute left-0 top-0 w-full overflow-hidden rounded-2xl border transition-[transform,opacity] duration-500",
              isFront ? "border-rust shadow-[0_26px_60px_rgb(0_0_0/0.55)]" : "border-line shadow-[0_20px_50px_rgb(0_0_0/0.45)]",
            )}
            style={{
              transform: `translate(${depth * 3}%, ${depth * 22}px) rotate(${depth * -2}deg) scale(${1 - depth * 0.04})`,
              opacity: depth > 3 ? 0 : 1,
              zIndex: total - depth,
            }}
          >
            <div className="relative aspect-[2/1] w-full">
              {isFront ? (
                <ZoomTrigger label={screen.label} lang={lang} onClick={() => onZoom(index)}>
                  <MediaPlaceholder image={screen.image} focus={screen.focus} fit="cover" className="size-full" />
                </ZoomTrigger>
              ) : (
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`${isThai ? TH_CASE_STUDY_UI.showScreenPrefix : "Show screen:"} ${screen.label}`}
                  className="absolute inset-0 cursor-pointer"
                >
                  <MediaPlaceholder
                    image={screen.image}
                    focus={screen.focus}
                    fit="cover"
                    className="size-full grayscale brightness-[0.7]"
                  />
                </button>
              )}
            </div>
          </div>
        );
      })}

      <span className="absolute bottom-0 left-5 z-10 translate-y-1/2 rounded-full bg-rust px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
        {`${String(active + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")} · ${mod.screens[active].label}`}
      </span>
    </div>
  );
}

/** ฝั่งข้อความของโมดูล — หัวข้อ คำอธิบาย และรายการที่จับคู่กับเลขบนภาพ */
function ModuleCopy({ module: mod }: { module: CaseStudyModule }) {
  return (
    <div>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-rust">
        {mod.number} · {mod.name}
      </span>
      <h3 className="mt-2.5 font-heading text-[24px] font-bold leading-[1.15] text-fg">{mod.title}</h3>
      <p className="mt-3 max-w-[52ch] text-[13px] leading-[1.75] text-muted">
        <GlossaryText text={mod.description} />
      </p>

      {mod.annotations && mod.annotations.length > 0 && (
        <ul className="mt-6 grid gap-3.5">
          {mod.annotations.map((annotation) => (
            <li key={annotation.number} className="flex gap-3">
              <Marker number={annotation.number} />
              <p className="text-[12px] leading-[1.65] text-muted">
                <GlossaryText text={annotation.description} />
              </p>
            </li>
          ))}
        </ul>
      )}

      {mod.aside && (
        <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{mod.aside.title}</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {mod.aside.items.map((item) => (
              <span key={item} className="rounded-full bg-rust/15 px-3 py-1.5 font-mono text-[11px] text-rust">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * ไล่เนื้อหาทีละโมดูลตามเมนูจริงของระบบ สลับข้างภาพ-ข้อความไปมา
 * โมดูลที่ต้องชี้เป็นจุด ๆ ใช้ภาพเดียวพร้อมกรอบเส้นประ ที่เหลือยุบเป็นสำรับซ้อน
 */
export function CaseStudyModuleSections({ modules, lang }: { modules: CaseStudyModule[]; lang?: "th" }) {
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  // รวมทุกหน้าจอของทุกโมดูลเป็นชุดเดียว เพื่อให้กดลูกศรใน lightbox ไล่ดูได้ทั้งหน้าโดยไม่สะดุดที่ขอบโมดูล
  const allScreens = modules.flatMap((mod) => mod.screens);
  const offsetOf = (moduleIndex: number) =>
    modules.slice(0, moduleIndex).reduce((sum, mod) => sum + mod.screens.length, 0);

  if (modules.length === 0) return null;

  return (
    <div>
      <Eyebrow>
        <LayoutGrid className="size-3.5" aria-hidden="true" />
        {lang === "th" ? TH_CASE_STUDY_UI.moduleByModule : "Module by module"}
      </Eyebrow>

      <div className="mt-8 grid gap-14 lg:gap-20">
        {modules.map((mod, index) => {
          const offset = offsetOf(index);
          const mediaFirst = index % 2 === 0;

          return (
            <div
              key={mod.number}
              className={cn(
                "grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14",
                index > 0 && "border-t border-line pt-14 lg:pt-20",
              )}
            >
              <div className={cn(!mediaFirst && "lg:order-2")}>
                {mod.display === "annotated" ? (
                  <div className="relative aspect-[2/1] overflow-hidden rounded-2xl border border-line bg-surface">
                    <ZoomTrigger label={mod.screens[0].label} lang={lang} onClick={() => setZoomIndex(offset)}>
                      <MediaPlaceholder
                        image={mod.screens[0].image}
                        focus={mod.screens[0].focus}
                        fit="cover"
                        className="size-full"
                      />
                    </ZoomTrigger>
                    <AnnotationOverlay module={mod} />
                  </div>
                ) : (
                  <ScreenDeck module={mod} lang={lang} onZoom={(i) => setZoomIndex(offset + i)} />
                )}
              </div>

              <div className={cn(!mediaFirst && "lg:order-1")}>
                <ModuleCopy module={mod} />
              </div>
            </div>
          );
        })}
      </div>

      <PhotoLightbox shots={allScreens} index={zoomIndex} onIndexChange={setZoomIndex} lang={lang} />
    </div>
  );
}
