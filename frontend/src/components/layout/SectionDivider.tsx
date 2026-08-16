import { useId } from "react";

import { cn } from "@/lib/utils";

/**
 * เส้นคั่นโค้งมนแบบเดียวกับตอนต่อจาก Hero เข้า About — ลอยอยู่ที่ขอบล่างสุดของ section
 * ไล่เฉดเป็นสีของ section ถัดไป ให้การเลื่อนผ่านดูเนียนเป็นเนื้อเดียวกัน แค่ลวดลายตกแต่ง ไม่ใช่ปุ่มกด
 * ใต้สันคลื่นไล่จางเป็นโปร่งใส แทนที่จะทึบเต็มพื้นที่ — กันไม่ให้เห็นเป็นแท่งสีตัน บัง background ของ section
 * variant "signal" = กำลังเข้าสู่ธีมมืด ("โหมดกลางคืน") จึงมีแสงส้มจาง ๆ ทาบไว้เหมือนไฟสัญญาณเพิ่งติด
 */
export function SectionDivider({
  fill,
  fillMuted,
  variant = "default",
  className,
}: {
  /** สีของ section ถัดไป — ชั้นหน้าสุดของคลื่น */
  fill: string;
  /** เฉดอ่อนกว่าของสีเดียวกัน — ชั้นหลังของคลื่น ให้ความรู้สึกมีความลึก */
  fillMuted?: string;
  variant?: "default" | "signal";
  className?: string;
}) {
  const gradientId = useId();
  const frontId = `${gradientId}-front`;
  const backId = `${gradientId}-back`;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-x-0 bottom-0 z-20", className)}
    >
      {variant === "signal" && (
        <span className="absolute inset-x-0 top-4 h-3 bg-rust/40 blur-[8px]" />
      )}
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="h-28 w-full md:h-40"
      >
        <defs>
          <linearGradient id={backId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillMuted ?? fill} stopOpacity="0.5" />
            <stop offset="65%" stopColor={fillMuted ?? fill} stopOpacity="0" />
          </linearGradient>
          <linearGradient id={frontId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fill} stopOpacity="1" />
            <stop offset="65%" stopColor={fill} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,110 C160,60 300,150 480,120 C660,90 780,170 960,140 C1140,110 1260,70 1440,110 L1440,200 L0,200 Z"
          fill={`url(#${backId})`}
        />
        <path
          d="M0,140 C180,90 320,175 500,150 C700,120 820,185 1000,160 C1180,130 1300,95 1440,140 L1440,200 L0,200 Z"
          fill={`url(#${frontId})`}
        />
      </svg>
    </div>
  );
}
