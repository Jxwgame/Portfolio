import { cn } from "@/lib/utils";

/**
 * แถบรางรถไฟแนวนอนมองจากด้านบน — รางคู่บน-ล่าง + หมอนสีส้มพาดขวางเป็นจังหวะ
 * ใช้แทนเส้นประบาง ๆ ในจุดที่อยากให้เห็นเป็น "ราง" จริง ๆ (เดิมมาร์กอัปชุดนี้ฝังอยู่ใน WorkflowLine ที่เดียว)
 *
 * ตัวกล่องคุมขนาด/ตำแหน่งจาก className ที่ส่งเข้ามา และ **ต้องกำหนดความสูงมาเสมอ** เพราะข้างในเป็น absolute ล้วน
 * หมอนใช้ inset-y-1 ไม่ใช่ความสูงคงที่ จะได้ย่อ-ขยายตามความสูงของแถบที่ผู้เรียกกำหนด
 */
export function RailTrack({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("relative block", className)}>
      <span className="absolute inset-0 rounded-full border-y border-ink/10 bg-ink/[0.04] shadow-[inset_0_1px_2px_rgb(10_18_32/0.08)]" />
      {/* หมอนรถไฟ — เส้นบาง ห่าง ๆ พาดระหว่างราง ไม่ให้ทึบจนดูเป็นแถบกันขวาง */}
      <span className="absolute inset-x-1 inset-y-1 bg-[repeating-linear-gradient(90deg,rgb(232_155_60/0.62)_0_2px,transparent_2px_14px)]" />
      {/* รางคู่บน-ล่าง */}
      <span className="absolute inset-x-0 top-0.5 h-0.5 rounded-full bg-ink/75 shadow-[0_1px_0_rgb(255_255_255/0.55)]" />
      <span className="absolute inset-x-0 bottom-0.5 h-0.5 rounded-full bg-ink/75 shadow-[0_-1px_0_rgb(255_255_255/0.55)]" />
    </span>
  );
}
