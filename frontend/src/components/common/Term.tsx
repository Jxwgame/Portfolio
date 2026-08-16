"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { GLOSSARY, type GlossaryKey } from "@/lib/glossary";
import { GLOSSARY_TH } from "@/lib/glossary.th";

const POPOVER_WIDTH = 256;
const VIEWPORT_GAP = 8;

type PopoverLayout = {
  shift: number;
  width: number;
};

/** ขีดเส้นใต้จุดๆ กดแล้วเด้ง block คำอธิบายศัพท์เทคนิค — ใช้คู่กับ GlossaryText */
export function Term({ id, children }: { id: GlossaryKey; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [popoverLayout, setPopoverLayout] = useState<PopoverLayout>({
    shift: 0,
    width: POPOVER_WIDTH,
  });
  const wrapRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const isThai = pathname === "/th" || pathname.startsWith("/th/");
  const entry = isThai ? (GLOSSARY_TH[id] ?? GLOSSARY[id]) : GLOSSARY[id];

  useEffect(() => {
    if (!open) return;

    function updateAlign() {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const sidebarRect = document
        .querySelector<HTMLElement>("[data-app-sidebar]")
        ?.getBoundingClientRect();
      const mainRect = document.querySelector("main")?.getBoundingClientRect();
      const sidebarRight = sidebarRect && sidebarRect.width > 0 ? sidebarRect.right : 0;
      const contentLeft = mainRect?.left ?? 0;
      const visibleLeft = Math.max(sidebarRight, contentLeft) + VIEWPORT_GAP;
      const visibleRight = window.innerWidth - VIEWPORT_GAP;
      const center = rect.left + rect.width / 2;
      const popoverWidth = Math.min(
        POPOVER_WIDTH,
        Math.max(0, visibleRight - visibleLeft),
      );
      const centeredLeft = center - popoverWidth / 2;
      const clampedLeft = Math.min(
        Math.max(centeredLeft, visibleLeft),
        visibleRight - popoverWidth,
      );
      setPopoverLayout({
        shift: clampedLeft - centeredLeft,
        width: popoverWidth,
      });
    }
    updateAlign();

    function onPointerDown(e: PointerEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    const sidebarObserver = new MutationObserver(updateAlign);
    sidebarObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-sidebar"],
    });
    window.addEventListener("resize", updateAlign);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("resize", updateAlign);
      sidebarObserver.disconnect();
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!entry) return <>{children}</>;

  return (
    <span ref={wrapRef} className="relative">
      <span
        ref={triggerRef}
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
        aria-expanded={open}
        className="cursor-help font-medium text-rust hover:text-rust-deep"
      >
        {children}
      </span>
      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 top-full z-50 mt-2 max-w-[85vw] rounded-xl border border-line bg-surface p-3 text-left text-[13px] leading-[1.5] normal-case shadow-lg"
          style={{
            width: popoverLayout.width,
            transform: `translateX(calc(-50% + ${popoverLayout.shift}px))`,
          }}
        >
          <span className="block font-mono text-[10px] font-bold tracking-[0.1em] text-fg">{entry.term}</span>
          <span className="mt-1 block text-muted">{entry.definition}</span>
        </span>
      )}
    </span>
  );
}
