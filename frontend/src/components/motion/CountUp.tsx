"use client";

import { useEffect, useRef, useState } from "react";

/**
 * นับเลขขึ้นเมื่อเข้าจอครั้งแรก
 * ค่าเริ่มต้นคือเลขปลายทาง เผื่อ JS ไม่ทำงาน — เฟรมแรกของ animation จะรีเซ็ตเป็น 0 ให้เอง
 * จึงไม่ต้อง setState ในตัว effect (ซึ่งทำให้เกิด render ซ้อน)
 */
export function CountUp({
  to,
  suffix = "+",
  duration = 1100,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setValue(Math.round(to * progress));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      // เริ่มทันทีที่โผล่ขอบจอ ตอนนั้น Reveal ยังจางอยู่ ผู้ใช้จึงไม่เห็นเลขกระโดดกลับเป็น 0
      { threshold: 0.1 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
