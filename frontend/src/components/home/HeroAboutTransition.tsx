"use client";

import { useEffect, useId, useRef } from "react";

const BACK_WAVE =
  "M0,110 C160,60 300,150 480,120 C660,90 780,170 960,140 C1140,110 1260,70 1440,110 L1440,200 L0,200 Z";
const FRONT_WAVE =
  "M0,140 C180,90 320,175 500,150 C700,120 820,185 1000,160 C1180,130 1300,95 1440,140 L1440,200 L0,200 Z";

export function HeroAboutTransition() {
  const rootRef = useRef<HTMLDivElement>(null);
  const backImageRef = useRef<SVGImageElement>(null);
  const frontImageRef = useRef<SVGImageElement>(null);
  const id = useId().replace(/:/g, "");
  const backClipId = `${id}-back-wave`;
  const frontClipId = `${id}-front-wave`;
  const shadeId = `${id}-shade`;

  useEffect(() => {
    const root = rootRef.current;
    const backImage = backImageRef.current;
    const frontImage = frontImageRef.current;

    if (!root || !backImage || !frontImage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));

      backImage.style.transform = `translate3d(0, ${14 - progress * 26}px, 0) scale(1.08)`;
      frontImage.style.transform = `translate3d(0, ${20 - progress * 38}px, 0) scale(1.1)`;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 overflow-hidden md:h-44"
    >
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="size-full">
        <defs>
          <clipPath id={backClipId}>
            <path d={BACK_WAVE} />
          </clipPath>
          <clipPath id={frontClipId}>
            <path d={FRONT_WAVE} />
          </clipPath>
          <linearGradient id={shadeId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0a1220" stopOpacity="0.58" />
            <stop offset="48%" stopColor="#0a1220" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#eef1f6" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        <g clipPath={`url(#${backClipId})`} opacity="0.48">
          <image
            ref={backImageRef}
            href="/Background_2_fix.webp"
            x="-40"
            y="-26"
            width="1520"
            height="270"
            preserveAspectRatio="xMidYMid slice"
            style={{ transformOrigin: "center", transformBox: "fill-box" }}
          />
          <rect width="1440" height="200" fill="#eef1f6" opacity="0.28" />
        </g>

        <g clipPath={`url(#${frontClipId})`}>
          <image
            ref={frontImageRef}
            href="/Background_2_fix.webp"
            x="-40"
            y="-26"
            width="1520"
            height="270"
            preserveAspectRatio="xMidYMid slice"
            style={{ transformOrigin: "center", transformBox: "fill-box" }}
          />
          <rect width="1440" height="200" fill={`url(#${shadeId})`} />
        </g>

        <path d={FRONT_WAVE} fill="none" stroke="#e89b3c" strokeOpacity="0.52" strokeWidth="2" />
      </svg>
    </div>
  );
}
