"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";
import { cn } from "@/lib/utils";

/** รูปหนึ่งใบที่ lightbox แสดงได้ — ฟิลด์ชุดเดียวกันกับ CaseStudyShot (layout-1) / CaseStudyDiagramShot (layout-2)
 * / CaseStudyShot3 (layout-3) จึงส่ง shots ของ layout ไหนเข้ามาก็ได้โดยไม่ต้องแปลงชนิด */
export type LightboxShot = {
  /** ไม่บังคับ เพราะ CaseStudyArchitectureImage (layout-2) ใส่ label เฉพาะรูปที่อยากโชว์ป้ายกำกับ */
  label?: string;
  gradient?: string;
  image?: string;
  focus?: string;
};

/** ชื่อรูปสำรองตอนไม่มี label — ใช้เป็น aria-label ให้ screen reader ไม่เจอปุ่ม/ไดอะล็อกที่ไม่มีชื่อ */
const fallbackLabel = (lang?: "th") =>
  lang === "th" ? TH_CASE_STUDY_UI.projectOverviewFallback : "Project overview";

/**
 * Lightbox แสดงรูปเต็มไม่ครอป ใช้ร่วมกันทุก layout ของ case study
 * ผู้เรียกดูแล `shots`/`index` เอง — ส่ง index เป็น null เพื่อปิด, เปลี่ยน index ผ่าน onIndexChange เพื่อเลื่อนรูป
 * รูปที่มีไฟล์จริงแสดงตามสัดส่วนของตัวเอง (ไม่ยัดใส่กรอบ aspect คงที่) เพราะ diagram/screenshot ของแต่ละหน้าสัดส่วนไม่เหมือนกัน
 *
 * ต้อง portal ไป <body> เสมอ: ตัวเรียกอยู่ใน <Section> ซึ่งมี `isolate` (isolation: isolate) = สร้าง stacking context
 * ของตัวเอง ทำให้ z-index ของ overlay ถูกจำกัดอยู่แค่ใน Section นั้น แล้วโดน section ถัดไปกับ layer ระดับ body
 * (grain 60 / เมนูมือถือ 55 / header 50 / ปุ่มฝน 40) วาดทับหมด — ดูสเกลเลเยอร์ทั้งหมดใน globals.css
 * ห่อ theme-dark ไว้เพราะโทเคน --line/--surface ผูกกับคลาสธีมของ Section เดิม พอย้ายมาอยู่ใต้ body ต้องพกธีมมาเอง
 */
export function PhotoLightbox({
  shots,
  index,
  onIndexChange,
  lang,
}: {
  shots: LightboxShot[];
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

  // ล็อกไม่ให้หน้าเบื้องหลังเลื่อนตอนเปิดอยู่ — ชดเชยความกว้าง scrollbar ที่หายไปด้วย padding กันหน้าเว็บกระตุกข้าง
  useEffect(() => {
    if (index === null) return;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [index]);

  // typeof document กัน createPortal ตอน SSR — ตอน hydrate ครั้งแรก index เป็น null อยู่แล้วทั้งสองฝั่ง จึงไม่มี mismatch
  if (index === null || typeof document === "undefined") return null;
  const activeShot = shots[index];
  const go = (delta: number) => onIndexChange((index + delta + shots.length) % shots.length);
  const single = shots.length <= 1;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={activeShot.label ?? fallbackLabel(lang)}
      className="theme-dark fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={() => onIndexChange(null)}
    >
      <button
        type="button"
        onClick={() => onIndexChange(null)}
        aria-label={isThai ? TH_CASE_STUDY_UI.close : "Close"}
        className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-paper/20 bg-ink/70 text-paper transition hover:bg-rust"
      >
        <X className="size-4" aria-hidden="true" />
      </button>

      {!single && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
          aria-label={isThai ? TH_CASE_STUDY_UI.previousImage : "Previous image"}
          className="absolute left-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-paper/20 bg-ink/70 text-paper transition hover:bg-rust sm:left-4"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
      )}

      <div className="relative w-fit max-w-full" onClick={(e) => e.stopPropagation()}>
        {activeShot.image ? (
          /* eslint-disable-next-line @next/next/no-img-element -- รูปในเครื่อง ยังไม่ได้ตั้ง remote patterns ของ next/image */
          <img
            src={activeShot.image}
            alt={activeShot.label ?? ""}
            className="block max-h-[85vh] w-auto max-w-full rounded-2xl border border-line object-contain"
          />
        ) : (
          <MediaPlaceholder
            gradient={activeShot.gradient}
            label={activeShot.label}
            className="aspect-[4/3] max-h-[80vh] w-[min(56rem,100%)] rounded-2xl border border-line"
          />
        )}
        {!single && (
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-paper/20 bg-ink/70 px-3 py-1 font-mono text-[11px] tabular-nums text-paper/80 backdrop-blur">
            {index + 1} / {shots.length}
          </span>
        )}
      </div>

      {!single && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
          aria-label={isThai ? TH_CASE_STUDY_UI.nextImage : "Next image"}
          className="absolute right-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-paper/20 bg-ink/70 text-paper transition hover:bg-rust sm:right-4"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>,
    document.body,
  );
}

/**
 * ปุ่มโปร่งใสคลุมพื้นที่รูปเพื่อกดเปิด lightbox — ค่าเริ่มต้นเป็น absolute inset-0 z-0 ให้ทับพอดีกรอบ `relative` ที่ห่ออยู่
 * และอยู่ "ใต้" ปุ่มเลื่อน/ป้ายที่วางทับรูป (ซึ่งมาหลังใน DOM) ปุ่มพวกนั้นจึงยังกดได้ตามปกติ
 * กรอบที่ไม่ได้ position: relative (เช่นการ์ดใน grid) ส่งคลาส "static block w-full" มาแทนได้
 */
export function ZoomTrigger({
  label,
  onClick,
  className,
  lang,
  children,
}: {
  label?: string;
  onClick: () => void;
  className?: string;
  lang?: "th";
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${lang === "th" ? TH_CASE_STUDY_UI.openFullSizeImagePrefix : "Open full-size image:"} ${label ?? fallbackLabel(lang)}`}
      className={cn("absolute inset-0 z-0 cursor-zoom-in", className)}
    >
      {children}
    </button>
  );
}
