"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CloudRain, CloudOff } from "lucide-react";

const STORAGE_KEY = "rain-effect-enabled";

/** Decorative rain across every page; kept below navigation and outside pointer handling. */
export function RainOverlay() {
  const [enabled, setEnabled] = useState(true);

  // อ่านค่าที่ผู้ใช้เลือกไว้หลัง mount เท่านั้น — อ่านตอน render แรกไม่ได้เพราะ server ไม่มี localStorage แล้วจะ hydrate ไม่ตรงกัน
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync ครั้งเดียวหลัง mount เพื่อเลี่ยง hydration mismatch
    if (localStorage.getItem(STORAGE_KEY) === "0") setEnabled(false);
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  };

  return (
    <>
      {enabled && (
        <div
          className="rain-effect pointer-events-none fixed inset-0 z-30"
          aria-hidden="true"
        >
          <Image
            src="/effects/Rain.svg"
            alt=""
            fill
            sizes="100vw"
            unoptimized
            className="object-cover opacity-30 mix-blend-screen"
          />
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-pressed={enabled}
        aria-label={enabled ? "Turn off weather effect" : "Turn on weather effect"}
        title={enabled ? "Turn off weather effect" : "Turn on weather effect"}
        className="fixed bottom-4 right-4 z-40 grid size-9 place-items-center rounded-full border border-rust/50 bg-paper text-rust shadow-[0_2px_12px_rgb(0_0_0/0.15)] transition hover:border-rust hover:bg-rust/10"
      >
        {enabled ? <CloudRain className="size-4" /> : <CloudOff className="size-4" />}
      </button>
    </>
  );
}
