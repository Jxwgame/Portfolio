import { cn } from "@/lib/utils";

/** ตารางจุดเล็ก ๆ — ลวดลายตกแต่งสไตล์คอลลาจ ไม่มีความหมายเชิงข้อมูล */
export function DotGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("opacity-70", className)}
      style={{
        backgroundImage: "radial-gradient(currentColor 1.4px, transparent 1.4px)",
        backgroundSize: "12px 12px",
      }}
    />
  );
}
