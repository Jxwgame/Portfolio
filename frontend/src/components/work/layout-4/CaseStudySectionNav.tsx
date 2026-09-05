"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, List } from "lucide-react";

import { cn } from "@/lib/utils";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

export type CaseStudyNavItem = { id: string; label: string };

const COLLAPSED_KEY = "case-study-nav-collapsed";

/**
 * ค่าย่อ/ขยายเก็บใน localStorage แล้วอ่านผ่าน useSyncExternalStore
 * (แทนที่จะ setState ใน effect ตอน mount ซึ่งทำให้ render ซ้ำรอบหนึ่งเสมอ)
 * ฝั่งเซิร์ฟเวอร์คืนค่า "ขยายอยู่" เสมอ แล้ว React จะ re-render ตามค่าจริงของเครื่องผู้ใช้หลัง hydrate
 */
const collapsedListeners = new Set<() => void>();

function subscribeCollapsed(onChange: () => void) {
  collapsedListeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    collapsedListeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readCollapsed() {
  try {
    return localStorage.getItem(COLLAPSED_KEY) === "1";
  } catch {
    // โหมดส่วนตัวของบางเบราว์เซอร์ห้ามแตะ storage — ถือว่ายังขยายอยู่
    return false;
  }
}

function writeCollapsed(next: boolean) {
  try {
    localStorage.setItem(COLLAPSED_KEY, next ? "1" : "0");
  } catch {
    // เขียนไม่ได้ก็ให้ใช้งานต่อได้ แค่ไม่จำค่าไว้รอบหน้า
  }
  collapsedListeners.forEach((onChange) => onChange());
}

/**
 * แท็บนำทางของหน้า case study — ลอยอยู่ริมขวาตั้งแต่ hero แล้วค้างอยู่ตลอดการเลื่อน ย่อ/ขยายได้
 * มีเพราะหน้านี้ยาว (เก้าโมดูลกับภาพอีกสิบแปดใบ) คนดูจึงควรกระโดดไปหัวข้อที่สนใจได้โดยไม่ต้องเลื่อนผ่านทั้งหมด
 *
 * ตอนย่อเหลือแค่ปุ่มติดขอบขวา ไม่ใช่แผงแคบ ๆ เพราะแผงยังบังเนื้อหาที่กว้างเต็มคอลัมน์อย่างแผนภาพ
 * ทั้งสองสถานะ render อยู่พร้อมกันเสมอแล้วสลับด้วย transform/opacity จึงมีจังหวะเข้า-ออก ไม่ใช่สลับแบบกระพริบ
 * ตัวที่กำลังจะหายเลื่อนออกก่อน อีกตัวค่อยเลื่อนเข้าโดยหน่วง 150ms ทั้งสองอันจึงไม่ทับกันกลางทาง
 *
 * ต้อง render นอก <Section> เพราะ Section ตั้ง `isolate` ไว้ = สร้าง stacking context ของตัวเอง
 * ถ้าอยู่ข้างในจะโดน section ถัดไปวาดทับทันทีที่เลื่อนพ้น (ดูสเกลเลเยอร์ใน globals.css)
 * และเพราะอยู่นอก Section จึงต้องพกคลาสธีมมาเอง — โทเคน --line/--line-strong ผูกอยู่กับคลาสธีมของ Section
 */
export function CaseStudySectionNav({ items, lang }: { items: CaseStudyNavItem[]; lang?: "th" }) {
  const isThai = lang === "th";
  const [active, setActive] = useState(items[0]?.id);
  const collapsed = useSyncExternalStore(subscribeCollapsed, readCollapsed, () => false);

  const heading = isThai ? TH_CASE_STUDY_UI.onThisPage : "On this page";
  const toggleLabel = collapsed
    ? isThai
      ? "ขยายแท็บหัวข้อ"
      : "Expand section tabs"
    : isThai
      ? "ย่อแท็บหัวข้อ"
      : "Collapse section tabs";

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // ยึดหัวข้อที่อยู่บนสุดของ viewport (เผื่อแถบเมนูลอย 96px) เป็นตัวชี้ว่าตอนนี้อ่านอยู่ตรงไหน
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  const toggle = () => writeCollapsed(!collapsed);

  return (
    <div className="theme-dark fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 bg-transparent xl:block">
      {/* ปุ่มติดขอบตอนย่อ — เลื่อนออกไปทางขวาและจางหายเมื่อแผงกางอยู่ */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={false}
        aria-label={toggleLabel}
        title={heading}
        inert={!collapsed}
        className={cn(
          "grid size-9 place-items-center rounded-l-xl border border-r-0 border-line bg-ink/80 text-paper/70 backdrop-blur",
          "transition-[transform,opacity] duration-300 ease-out hover:text-rust motion-reduce:transition-none",
          collapsed ? "translate-x-0 opacity-100 delay-150" : "pointer-events-none translate-x-full opacity-0",
        )}
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
      </button>

      <nav
        aria-label={heading}
        inert={collapsed}
        className={cn(
          "absolute right-6 top-1/2 w-max -translate-y-1/2 rounded-2xl border border-line bg-ink/80 p-2 backdrop-blur",
          "transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none",
          collapsed
            ? "pointer-events-none translate-x-[calc(100%+1.5rem)] opacity-0"
            : "translate-x-0 opacity-100 delay-150",
        )}
      >
        <div className="mb-1 flex items-center gap-3 px-3 py-1.5">
          <List className="size-3.5 shrink-0 text-rust" aria-hidden="true" />
          <span className="flex-1 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-paper/70">
            {heading}
          </span>
          <button
            type="button"
            onClick={toggle}
            aria-expanded
            aria-label={toggleLabel}
            className="-mr-1.5 grid size-6 place-items-center rounded-lg text-paper/70 transition hover:bg-paper/5 hover:text-rust"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>

        <ul className="grid gap-0.5">
          {items.map((item, index) => {
            const isActive = item.id === active;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2 transition",
                    isActive ? "bg-rust/15" : "hover:bg-paper/5",
                  )}
                >
                  <span
                    className={cn(
                      "h-4 w-px shrink-0 transition-colors",
                      isActive ? "bg-rust" : "bg-[var(--line-strong)]",
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "font-mono text-[10px] tabular-nums transition-colors",
                      isActive ? "text-rust" : "text-paper/70",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
                      isActive ? "text-paper" : "text-paper/70",
                    )}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

/**
 * จอที่แคบกว่า xl ไม่มีที่ว่างริมขวาให้แท็บลอย จึงใช้แถวชิปเลื่อนแนวนอนแทน วางไว้ใต้ hero
 * ตั้งใจไม่ผูกสถานะกับตำแหน่งการอ่าน เพราะแถวนี้เลื่อนหายไปกับหน้า ไม่ได้ค้างอยู่เหมือนแท็บริมขวา
 */
export function CaseStudySectionChips({ items }: { items: CaseStudyNavItem[] }) {
  return (
    <div className="-mx-6 mt-10 flex gap-2 overflow-x-auto px-6 pb-1 md:-mx-12 md:px-12 xl:hidden">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="shrink-0 rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition hover:border-rust/50 hover:text-fg"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}
