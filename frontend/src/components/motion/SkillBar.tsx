"use client";

import { useEffect, useRef, useState } from "react";

/** แถบสกิลที่วิ่งจาก 0 ถึงระดับจริงเมื่อเข้าจอ */
export function SkillBar({
  name,
  level,
  delay = 0,
}: {
  name: string;
  level: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFilled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-5">
      <div className="mb-2.5 flex justify-between font-mono text-[10.5px] uppercase tracking-[0.14em]">
        <span>{name}</span>
        <span className="text-rust">{level}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={name}
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-[3px] overflow-hidden rounded-sm bg-[var(--line)]"
      >
        <span
          className="block h-full rounded-sm bg-rust transition-[width] duration-1000 ease-out"
          style={{ width: filled ? `${level}%` : 0, transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}
