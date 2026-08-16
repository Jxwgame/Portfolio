"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const FLIP_MS = 500;

/** ใส่ตัวนี้แทนตัวอักษรจริงเพื่อ "จองช่อง" ไว้เป็นการ์ดเปล่า (ทึบ ไม่มีตัวอักษร) — ต่างจาก " " ที่เป็นช่องว่างเว้นวรรคเฉย ๆ ไม่มีการ์ด */
export const FLIP_BLANK = " ";

const graphemeSegmenter = typeof Intl !== "undefined" && "Segmenter" in Intl
  ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
  : null;

/** แตก string เป็น "ตัวอักษรที่ตาเห็น" (grapheme cluster) แทนการตัดทีละ code point ด้วย [...str] —
 * จำเป็นสำหรับภาษาไทย เพราะสระ/วรรณยุกต์ลอย (เช่น ั ้ ่ ิ ์) เป็นคนละ code point จากพยัญชนะฐาน แต่ต้องเกาะ
 * แสดงผลรวมเป็นตัวเดียวกัน ถ้าตัดด้วย code point เฉย ๆ เครื่องหมายพวกนี้จะหลุดไปเป็นการ์ดของตัวเอง */
function splitGraphemes(str: string): string[] {
  if (graphemeSegmenter) return Array.from(graphemeSegmenter.segment(str), (s) => s.segment);
  return [...str];
}

/** w/h/font เป็น CSS length ล้วน (px หรือ clamp()) ไม่ใช่ตัวเลขดิบ เพื่อให้ preset "display" ใช้ clamp() ตาม breakpoint ได้
 * โดยไม่ต้องรู้ค่าที่ resolve จริงใน JS — ครึ่งบน/ล่างของการ์ดคำนวณด้วย calc() ในฝั่ง CSS แทน */
const SIZE_MAP = {
  xs: { w: "14px", h: "21px", font: "11px", gap: "gap-1" },
  sm: { w: "26px", h: "39px", font: "21px", gap: "gap-1.5" },
  /** ป้ายจำนวนโปรเจกต์ — ใหญ่กว่า sm 50% บนจอใหญ่ แต่ย่อลงบนมือถือเพื่อไม่ให้ล้นแนวนอน */
  status: {
    w: "clamp(26px, 3.05vw, 39px)",
    h: "clamp(39px, 4.57vw, 58.5px)",
    font: "clamp(21px, 2.46vw, 31.5px)",
    gap: "gap-1.5 sm:gap-2",
  },
  lg: { w: "44px", h: "70px", font: "42px", gap: "gap-2" },
  /** ขนาดหัวข้อหน้า — สัดส่วน w:h:font เท่า lg เป๊ะ แต่ผูก h กับ clamp() เดียวกับ DisplayHeading (PageHero)
   * ให้ป้ายพลิกย่อ-ขยายตามวิวพอร์ตเหมือนหัวข้อจริง แทนที่จะเป็น pixel ตายตัวแล้วล้นจอมือถือ */
  display: {
    w: "calc(clamp(2.6rem, 7vw, 5.5rem) * 0.629)",
    h: "clamp(2.6rem, 7vw, 5.5rem)",
    font: "calc(clamp(2.6rem, 7vw, 5.5rem) * 0.6)",
    gap: "gap-1.5 sm:gap-2 md:gap-2.5",
  },
} as const;

type FlipSize = keyof typeof SIZE_MAP;

function FlipHalf({
  half,
  value,
  fullH,
  fontSize,
  className,
  style,
}: {
  half: "top" | "bottom";
  value: string;
  fullH: string;
  fontSize: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const halfH = `calc(${fullH} / 2)`;
  return (
    <span
      className={cn(
        "absolute inset-x-0 z-0 block overflow-hidden bg-ink-2 text-paper",
        half === "top"
          ? "top-0 rounded-t-md shadow-[inset_0_-6px_6px_-6px_rgba(0,0,0,0.45)]"
          : "bottom-0 rounded-b-md shadow-[inset_0_6px_6px_-6px_rgba(0,0,0,0.45)]",
        className,
      )}
      style={{ height: halfH, ...style }}
    >
      {/* ตัวอักษรสูงเท่าการ์ดเต็มใบเสมอ — overflow-hidden ของครึ่งนอกเป็นตัวตัดให้เหลือแค่บน/ล่างจริง ๆ */}
      <span
        className="block w-full text-center font-mono font-bold tabular-nums"
        style={{
          height: fullH,
          lineHeight: fullH,
          fontSize,
          marginTop: half === "bottom" ? `calc(${fullH} / -2)` : 0,
        }}
      >
        {value}
      </span>
    </span>
  );
}

/** การ์ดตัวอักษรเดียวที่พลิกเหมือนป้ายสถานีจริง — ครึ่งบนพับหุบลง แล้วครึ่งล่างพับเปิดขึ้นตามมา */
function FlipChar({ char, size }: { char: string; size: FlipSize }) {
  const { w, h, font } = SIZE_MAP[size];
  const [current, setCurrent] = useState(char);
  const [previous, setPrevious] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (char === current) return;
    setPrevious(current);
    setCurrent(char);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setPrevious(null), FLIP_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- อยากรันแค่ตอน char เปลี่ยนเท่านั้น
  }, [char]);

  const flipping = previous !== null;

  return (
    <span
      className="relative inline-block shrink-0 select-none rounded-md shadow-[0_2px_6px_rgb(0_0_0/0.4)]"
      style={{ width: w, height: h, perspective: `calc(${h} * 4)` }}
    >
      {/* เส้นรอยพับกึ่งกลาง ลอยอยู่บนสุดเสมอ ให้เห็นแม้ตอนใบพับกำลังหมุนทับ */}
      <span className="absolute inset-x-0 top-1/2 z-20 h-px -translate-y-1/2 bg-black/70" />

      <FlipHalf half="top" value={current} fullH={h} fontSize={font} />
      <FlipHalf half="bottom" value={flipping ? (previous as string) : current} fullH={h} fontSize={font} />

      {flipping && (
        <>
          {/* ใบบน: โชว์ค่าเก่า พับหุบลงจากแนวตั้งไปจนเสมอเส้นกึ่งกลาง เผยค่าใหม่ที่ซ่อนอยู่ข้างหลัง */}
          <FlipHalf
            key={`t-${previous}`}
            half="top"
            value={previous as string}
            fullH={h}
            fontSize={font}
            className="z-10"
            style={{
              transformOrigin: "bottom",
              animation: `flip-fold-top ${FLIP_MS / 2}ms ease-in forwards`,
            }}
          />
          {/* ใบล่าง: เริ่มพับหุบอยู่ (มองไม่เห็น) รอครึ่งแรกจบค่อยพับกางออกมาโชว์ค่าใหม่ */}
          <FlipHalf
            key={`b-${current}`}
            half="bottom"
            value={current}
            fullH={h}
            fontSize={font}
            className="z-10"
            style={{
              transformOrigin: "top",
              animation: `flip-fold-bottom ${FLIP_MS / 2}ms ease-out ${FLIP_MS / 2}ms both`,
            }}
          />
        </>
      )}
    </span>
  );
}

/** แผงตัวอักษรพลิกสไตล์ป้ายสถานี (split-flap) — ส่ง value ใหม่เข้ามาแล้วตัวที่เปลี่ยนจะพลิกเองทีละตัว */
export function FlipBoard({
  value,
  size = "sm",
  className,
}: {
  value: string;
  size?: FlipSize;
  className?: string;
}) {
  const { w, gap } = SIZE_MAP[size];

  return (
    <span className={cn("flex items-center", gap, className)}>
      {splitGraphemes(value).map((char, i) =>
        char === " " ? (
          <span key={i} aria-hidden="true" style={{ width: `calc(${w} / 2)` }} />
        ) : (
          <FlipChar key={i} char={char === FLIP_BLANK ? "" : char} size={size} />
        ),
      )}
    </span>
  );
}

/** เหมือน FlipBoard เป๊ะ แต่เริ่มจากช่องว่างล้วนแล้วพลิกเข้าเป็นค่าจริงทีเดียวหลัง mount — ใช้กับหัวข้อหน้าที่ไม่มีค่าเปลี่ยนเองตามเวลา
 * (ต่างจาก HeroClock ที่ค่าขยับเองทุกวินาทีอยู่แล้ว จึงพลิกจาก FlipBoard ธรรมดาได้เลยโดยไม่ต้องมี wrapper นี้) */
export function FlipReveal({
  value,
  size = "sm",
  className,
  delayMs = 300,
}: {
  value: string;
  size?: FlipSize;
  className?: string;
  delayMs?: number;
}) {
  const [shown, setShown] = useState(() => FLIP_BLANK.repeat(splitGraphemes(value).length));
  const revealedRef = useRef(false);

  useEffect(() => {
    // ครั้งแรกพลิกเข้าจากช่องว่างแบบมีดีเลย์ ครั้งถัดไป (value เปลี่ยนเพราะ props เปลี่ยน เช่น filter)
    // ให้ตัวเลขพลิกจากค่าเดิมไปค่าใหม่ทันที ผ่าน FlipChar เอง แทนที่จะรีเซ็ตกลับไปช่องว่างก่อน
    if (!revealedRef.current) {
      const timer = setTimeout(() => {
        revealedRef.current = true;
        setShown(value);
      }, delayMs);
      return () => clearTimeout(timer);
    }
    setShown(value);
  }, [value, delayMs]);

  return <FlipBoard value={shown} size={size} className={className} />;
}
