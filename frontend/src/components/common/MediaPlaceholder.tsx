import { cn } from "@/lib/utils";

/**
 * ที่ว่างสำหรับรูปที่ยังไม่มี — ไล่เฉดตามโทนของธีมพร้อมป้ายบอกว่าควรใส่อะไร
 * ถ้ามี `image` (path ใต้ /public) จะแสดงรูปจริงแทนไล่เฉด
 * `fit="cover"` ครอปเต็มกรอบให้กล่องขนาดสม่ำเสมอ (ใช้ใน grid) ค่าเริ่มต้น `fit="contain"` แสดงรูปเต็มไม่ครอป (เช่นใน lightbox)
 * `focus` คือ CSS object-position — ใช้ตอน fit="cover" กับรูปที่จุดสำคัญไม่ได้อยู่กลางภาพ (เช่นรูปแนวตั้งที่เนื้อหาอยู่ด้านล่าง)
 * `priority` สำหรับรูปที่อยู่ในจอตั้งแต่เปิดหน้า (ภาพหลักของ hero) — ที่เหลือ lazy ให้หมด เพราะหน้า case study
 * มีรูปเป็นสิบใบ ถ้าโหลดพร้อมกันทั้งหน้าคือหลายสิบ MB ต่อการเปิดหน้าเดียว
 */
export function MediaPlaceholder({
  label,
  gradient = "linear-gradient(150deg,#5C5347,#1E1A14)",
  image,
  className,
  fit = "contain",
  focus = "center",
  priority = false,
}: {
  label?: string;
  gradient?: string;
  image?: string;
  className?: string;
  fit?: "cover" | "contain";
  focus?: string;
  priority?: boolean;
}) {
  if (image) {
    return (
      <div style={{ backgroundImage: gradient }} className={cn("relative overflow-hidden", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element -- ยังไม่ได้ตั้ง remote patterns ของ next/image */}
        <img
          src={image}
          alt={label ?? ""}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : undefined}
          style={{ objectPosition: focus }}
          className={cn("absolute inset-0 size-full", fit === "cover" ? "object-cover" : "object-contain")}
        />
      </div>
    );
  }

  return (
    <div
      style={{ backgroundImage: gradient }}
      className={cn("grid place-items-center text-center", className)}
      aria-hidden="true"
    >
      {label && (
        <span className="px-4 font-mono text-[10px] uppercase leading-loose tracking-[0.2em] text-sand">
          {label}
        </span>
      )}
    </div>
  );
}
