import { cn } from "@/lib/utils";

/**
 * รางรถไฟมองมุมสายตา (vanishing point) ใช้เป็นพื้นหลังของ section
 * ต้องอยู่หลังเนื้อหาเสมอ (-z-10) และไม่รับ event
 */
export function OrbitBg({
  className,
  variant = "double",
}: {
  className?: string;
  variant?: "single" | "double" | "dotted";
}) {
  const dash = variant === "dotted" ? "2 7" : undefined;

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      className={cn("pointer-events-none absolute -z-10 text-sand opacity-25", className)}
    >
      {/* รางซ้าย */}
      <path d="M40 380L164.2 81" strokeWidth="0.9" strokeDasharray={dash} />
      {/* รางขวา — แสดงเฉพาะ double/dotted เพื่อให้ single เหลือรางเดียวแบบเส้นความเร็ว */}
      {variant !== "single" && <path d="M360 380L235.8 81" strokeWidth="0.9" strokeDasharray={dash} />}
      {/* ไม้หมอน */}
      {variant !== "single" &&
        [
          [60.25, 331.25, 339.75, 331.25],
          [85.9, 269.5, 314.1, 269.5],
          [112.9, 204.5, 287.1, 204.5],
          [139.9, 139.5, 260.1, 139.5],
        ].map(([x1, y1, x2, y2]) => (
          <line key={x1} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.7" />
        ))}
      {/* ไฟสัญญาณ */}
      <circle cx="368" cy="120" r="3.5" fill="currentColor" stroke="none" />
      <circle cx="40" cy="250" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
