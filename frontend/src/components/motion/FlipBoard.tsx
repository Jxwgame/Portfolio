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
  /** ป้ายจำนวนโปรเจกต์ — ใหญ่กว่า sm 50% เมื่อมีที่พอ แต่ "บีบให้พอดี" ที่ว่างจริงเมื่อไม่พอ (ดู FIT_SPEC/useFitWidth)
   * w/h/font ที่ระบุไว้นี้เป็นค่าตั้งต้นฝั่ง SSR เท่านั้น พอวัดความกว้างจริงได้แล้วจะถูกแทนด้วยค่า px ที่คำนวณมา */
  status: {
    w: "clamp(12px, 3.9vw, 39px)",
    h: "clamp(18px, 5.85vw, 58.5px)",
    font: "clamp(9.7px, 3.15vw, 31.5px)",
    gap: "gap-[3px] sm:gap-2",
    fit: true,
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

/** ขนาดการ์ดใบเดียว — เป็น CSS length เสมอ ไม่ใช่ตัวเลขดิบ (ดูหมายเหตุ SIZE_MAP) */
type CardMetrics = { w: string; h: string; font: string };

/** สัดส่วนของโหมด fit — ล็อกไว้ตาม preset status ตอนกว้างสุด (w 39 : h 58.5 : font 31.5 : gap 8) */
const FIT_SPEC = { max: 39, min: 10, hRatio: 1.5, fontRatio: 31.5 / 39, gapRatio: 8 / 39 };

/** วัดที่ว่างจริงของแผง (ไม่ใช่ของวิวพอร์ต) เพื่อคำนวณขนาดการ์ดให้พอดีแถวเดียว
 * ต้องวัดจาก DOM เพราะที่ว่างขึ้นกับทั้งความยาวป้ายในแต่ละภาษา (EN "PROJECTS & WORKS: 6" 19 ช่อง /
 * TH "งานทั้งหมด: 6" 11 ช่อง) และความกว้าง sidebar เดสก์ท็อปที่ยืด-หุบได้ ซึ่ง clamp() ตาม vw มองไม่เห็น —
 * ถ้าเดาจาก vw อย่างเดียว ป้ายที่ยาวกว่าจะกว้างเกิน Container แล้วถูก overflow-hidden ของ Section ตัดท้ายหาย */
function useFitWidth(enabled: boolean) {
  const ref = useRef<HTMLSpanElement>(null);
  const [avail, setAvail] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    // วัดรอบแรกเองเลย แล้วปล่อยให้ ResizeObserver ดูแลตอนหมุนจอ/ยืด-หุบ sidebar ต่อ
    // ทิ้งค่า 0 เสมอ (เกิดตอนอยู่ใต้ ancestor ที่ display:none) ไม่งั้นการ์ดจะถูกล็อกเป็นขนาดต่ำสุดค้างไว้
    const measure = (width: number) => {
      if (width > 0) setAvail(width);
    };
    measure(el.getBoundingClientRect().width);
    const observer = new ResizeObserver(([entry]) => measure(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled]);

  return { ref, avail };
}

function fitMetrics(avail: number, chars: string[]): CardMetrics & { gap: number } {
  const spacers = chars.filter((char) => char === " ").length;
  // การ์ดเว้นวรรคกว้างครึ่งใบ (ดู FlipBoard) จึงนับเป็นครึ่งหน่วย
  const units = chars.length - spacers / 2;
  const gaps = Math.max(chars.length - 1, 0);
  const raw = avail / (units + FIT_SPEC.gapRatio * gaps);
  const w = Math.min(FIT_SPEC.max, Math.max(FIT_SPEC.min, raw));

  return {
    w: `${w}px`,
    h: `${w * FIT_SPEC.hRatio}px`,
    font: `${w * FIT_SPEC.fontRatio}px`,
    gap: w * FIT_SPEC.gapRatio,
  };
}

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
function FlipChar({ char, w, h, font }: { char: string } & CardMetrics) {
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
  const spec = SIZE_MAP[size];
  const chars = splitGraphemes(value);
  const { ref, avail } = useFitWidth("fit" in spec);
  const fitted = avail !== null ? fitMetrics(avail, chars) : null;
  const { w, h, font } = fitted ?? spec;

  const board = (
    <span
      className={cn("flex items-center", !fitted && spec.gap, className)}
      style={fitted ? { gap: `${fitted.gap}px` } : undefined}
    >
      {chars.map((char, i) =>
        char === " " ? (
          <span key={i} aria-hidden="true" style={{ width: `calc(${w} / 2)` }} />
        ) : (
          <FlipChar key={i} char={char === FLIP_BLANK ? "" : char} w={w} h={h} font={font} />
        ),
      )}
    </span>
  );

  // โหมด fit ต้องมีตัวครอบที่กว้างเต็มพื้นที่ให้วัด — ขนาดของ board เองขึ้นกับผลการวัด จะวัดตัวมันเองไม่ได้
  if (!("fit" in spec)) return board;
  return (
    <span ref={ref} className="block w-full">
      {board}
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
