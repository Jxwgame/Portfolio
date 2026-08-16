"use client";

import { useEffect, useState } from "react";

import { FLIP_BLANK, FlipBoard } from "@/components/motion/FlipBoard";
import { cn } from "@/lib/utils";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// "September" คือชื่อเดือนยาวสุด (9 ตัว) — เดือนสั้นกว่านั้นเติมช่องว่างที่จองไว้ (การ์ดเปล่า) ต่อท้ายให้ครบ
// ความกว้างแถววันที่จะได้คงที่ทุกเดือน ไม่ขยับเวลาสลับเดือน
const MONTH_SLOTS = 9;

function formatDate(d: Date, thai: boolean) {
  const day = String(d.getDate()).padStart(2, "0");
  // เดือนไทยแบบเต็ม (มกราคม ฯลฯ) มีสระ/วรรณยุกต์ลอยที่ FlipBoard จะแยกเป็นการ์ดของตัวเอง
  // (ตัดขาดจากพยัญชนะ) เลยใช้ตัวเลข DD/MM/YYYY แทนสำหรับหน้าไทย ไม่ใช้ชื่อเดือน
  if (thai) {
    const month = String(d.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}/${d.getFullYear()}`;
  }
  const month = MONTHS[d.getMonth()].padEnd(MONTH_SLOTS, FLIP_BLANK);
  return `${day} ${month} ${d.getFullYear()}`;
}

function formatTime(d: Date) {
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

/** ป้ายวันที่-เวลาสไตล์สถานีรถไฟ อัปเดตตามเวลาเครื่องจริง */
export function HeroClock({ className, thai = false }: { className?: string; thai?: boolean }) {
  // รอ mount ฝั่ง client ก่อนค่อยอ่านเวลา — เวลาที่ server กับ client render ไม่ตรงกันแน่นอน ถ้าใส่ตอน SSR จะ hydration mismatch
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync ครั้งแรกหลัง mount ตามเหตุผลข้างบน
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const date = formatDate(now, thai);
  const time = formatTime(now);

  return (
    <div aria-hidden="true" className={cn("flex flex-col items-start", className)}>
      {/* จอเล็กกว่า sm: แถวเต็ม (จอง 9 ช่องเดือน + วินาที) กว้างเกินจอมือถือ ต้องย่อการ์ดลงกันโดน overflow-hidden ของ Section ตัดขอบ */}
      <div className="flex flex-col items-start gap-1.5 sm:hidden">
        <FlipBoard value={date} size="xs" />
        <FlipBoard value={time} size="sm" />
      </div>
      <div className="hidden flex-col items-start gap-2 sm:flex">
        <FlipBoard value={date} size="sm" />
        <FlipBoard value={time} size="lg" />
      </div>
    </div>
  );
}
