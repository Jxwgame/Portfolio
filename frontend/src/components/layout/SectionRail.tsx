"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  Briefcase,
  Quote,
  Send,
  Star,
  TrainFront,
  User,
} from "lucide-react";

import { TrainMarker } from "@/components/layout/TrainMarker";
import { cn } from "@/lib/utils";

/** คีย์ไอคอนสถานี — ส่งเป็น string ข้าม Server → Client Component boundary ได้ ต่างจากตัว component ที่ส่งข้ามไม่ได้ */
const STATION_ICONS = {
  home: TrainFront,
  about: User,
  skills: Star,
  work: Briefcase,
  praise: Quote,
  contact: Send,
} as const;

export type StationIconKey = keyof typeof STATION_ICONS;

const TRACK_LIGHT_PATCHES = [
  { top: "21%", offset: "-7px", width: 88, height: 150, opacity: 0.72 },
  { top: "48%", offset: "9px", width: 108, height: 190, opacity: 0.5 },
  { top: "76%", offset: "-3px", width: 80, height: 140, opacity: 0.64 },
] as const;

/**
 * เส้นตกแต่งริมซ้ายของแต่ละ section — ทรงรางรถไฟ (เส้นดิ่ง + หมอนรองราง) พร้อมป้ายสถานีเลขลำดับ
 * อยู่ข้างใน <Section> จึงได้สีพื้นและสี --line ของแถบนั้นมาเอง
 * ตำแหน่งยึดกับขอบซ้ายของ container (กว้าง 1280) ไม่ใช่ขอบจอ เส้นจึงอยู่ใกล้เนื้อหาและเห็นชัด
 * ไม่ว่าจอจะกว้างแค่ไหน — 50% - (640 + 56) = ขอบซ้าย container ถอยออกมา 56px
 * โผล่ที่ 1440px ขึ้นไปเท่านั้น ต่ำกว่านั้นช่องว่างไม่พอ เส้นจะไปเบียดตัวหนังสือ
 * แต่ละ section สังเกตตัวเองด้วย IntersectionObserver — เมื่อ section นั้นอยู่กลางจอ (แถบเดียวกับ scroll-spy ของ Header)
 * ป้ายเลขของ section นั้นจะขยาย/ติดไฮไลต์ ทำให้เห็นว่าตอนนี้เลื่อนมาถึง "สถานี" ไหนแล้ว
 * ไอคอนรถไฟของ section ที่ active อยู่จะขยับตำแหน่งตามสัดส่วนที่ section เลื่อนผ่านจอจริง ๆ (ผูกกับ scroll event) ไม่ใช่ loop เอง
 */
export function SectionRail({
  index,
  label,
  icon,
  withScrollCue = false,
  showStation = true,
  showStationIcon = true,
}: {
  index: number;
  label?: string;
  icon?: StationIconKey;
  withScrollCue?: boolean;
  showStation?: boolean;
  showStationIcon?: boolean;
}) {
  const Icon = icon ? STATION_ICONS[icon] : undefined;
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(index === 1);
  // สถานีที่เคยเป็น active มาแล้วอย่างน้อยหนึ่งครั้ง — ค้างสถานะไว้ ไม่ดึงกลับไปจางแบบสถานีที่ยังไปไม่ถึง
  // ให้จุดที่รถไฟเคลื่อนผ่านมาแล้วดูเด่นเหมือนกันหมดทุกจุด ต่างจากจุดข้างหน้าที่ยังไม่ถึง
  const [visited, setVisited] = useState(index === 1);
  const [progress, setProgress] = useState(0);
  const [tiePhase, setTiePhase] = useState(0);

  useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
        if (entry.isIntersecting) setVisited(true);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // ตำแหน่งรถไฟผูกกับสัดส่วนที่ section เลื่อนผ่านจอจริง ๆ — ไม่ loop เอง เลื่อนหน้าขึ้นลงเท่าไร รถไฟขยับตามนั้น
  useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section) return;

    let frame = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const span = window.innerHeight + rect.height;
      const raw = span > 0 ? (window.innerHeight - rect.top) / span : 0;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // หมอนรองรางของแต่ละ section เริ่มนับจังหวะที่ 0 ของตัวเองเสมอ (repeat-y ในกรอบตัวเอง)
  // พอรางแต่ละ section มาเรียงชนกันสนิท จังหวะ 12px จากสอง section จะไม่ตรงกัน เห็นเป็นรอยสะดุดตรงรอยต่อ
  // เลยต้อง offset background-position ตามตำแหน่งจริงของ section บนหน้าเทียบกับ grid 12px เดียวกันทั้งหน้า ให้จังหวะเรียงต่อกันสนิท
  useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section) return;

    const updatePhase = () => {
      const absoluteTop = section.getBoundingClientRect().top + window.scrollY;
      setTiePhase(((absoluteTop % 12) + 12) % 12);
    };

    updatePhase();
    window.addEventListener("resize", updatePhase);
    return () => window.removeEventListener("resize", updatePhase);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-[calc(50%-696px)] z-10 hidden w-12 min-[1440px]:block"
    >
      <div
        className={cn(
          "absolute inset-y-0 left-1/2 w-32 -translate-x-1/2 transition-opacity duration-700",
          active ? "opacity-100" : visited ? "opacity-65" : "opacity-35",
        )}
      >
        {TRACK_LIGHT_PATCHES.map((patch) => (
          <span
            key={patch.top}
            className="absolute left-1/2 rounded-full blur-[3px]"
            style={{
              top: patch.top,
              width: patch.width,
              height: patch.height,
              opacity: patch.opacity,
              transform: `translate(-50%, -50%) translateX(${patch.offset})`,
              background:
                "radial-gradient(ellipse at center, rgba(232,155,60,0.34) 0%, rgba(232,155,60,0.16) 30%, rgba(232,155,60,0.05) 52%, transparent 74%)",
            }}
          />
        ))}
      </div>

      {/* รางรถไฟ — เต็มความสูงของ section เสมอ (inset-y-0) ให้ราง section ติด ๆ กันประกบกันสนิทเป็นเส้นเดียวยาวต่อเนื่องทั้งหน้า
          ไม่ผูกความสูงกับไอคอน/ป้าย/scroll cue ที่ลอยทับอยู่ด้านบนอีกที ต่างจากเดิมที่รางหดสั้นลงเพื่อเว้นที่ให้องค์ประกอบเหล่านั้น
          รางคู่ซ้าย-ขวา เชื่อมด้วยหมอนรองรางพาดขวางเป็นจังหวะ ไทล์เป็นพิกเซลจริงจึงคงที่ไม่ว่า section จะสูงแค่ไหน
          section ที่กำลัง active จะมีไอคอนรถไฟวิ่งไล่จากบนลงล่างของราง วนซ้ำ จำลองว่ารถไฟกำลังวิ่งผ่านสถานีนั้นอยู่ */}
      <span
        className={cn(
          "absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 drop-shadow-[0_0_5px_rgb(232_155_60/0.24)] transition-opacity duration-300",
          active ? "opacity-100" : "opacity-65",
        )}
        style={{
          backgroundImage:
            "linear-gradient(to right, transparent 0, transparent 1px, rgb(148 167 189 / 0.4) 1px, rgb(148 167 189 / 0.4) 2px, rgb(232 155 60 / 0.9) 2px, rgb(232 155 60 / 0.9) 4px, transparent 4px, transparent 12px, rgb(232 155 60 / 0.9) 12px, rgb(232 155 60 / 0.9) 14px, rgb(148 167 189 / 0.4) 14px, rgb(148 167 189 / 0.4) 15px, transparent 15px, transparent 16px), repeating-linear-gradient(to bottom, rgb(148 167 189 / 0.72) 0, rgb(148 167 189 / 0.72) 2px, transparent 2px, transparent 12px)",
          backgroundRepeat: "no-repeat, repeat-y",
          backgroundSize: "16px 100%, 16px 12px",
          backgroundPosition: `0 0, 0 -${tiePhase}px`,
        }}
      >
        {active && (
          <span
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-[top] duration-100 ease-linear"
            style={{ top: `${progress * 100}%` }}
            aria-hidden="true"
          >
            <TrainMarker />
          </span>
        )}
      </span>

      {/* ไอคอนสถานี + ป้ายชื่อ + scroll cue ลอยทับอยู่บนราง (สีทั้งหมดสืบทอด currentColor ของ section อยู่แล้ว จึงคุมความเข้มด้วย opacity ล้วน ๆ
          ป้ายสถานีรับ pointer event เองจุดเดียว ที่เหลือทั้งรางและ container นี้ pointer-events-none เพื่อให้ hover เปลี่ยนสีได้) */}
      <div className={cn("relative flex h-full flex-col items-center", !showStation && "hidden")}>
        <div className="relative mt-8 flex shrink-0 flex-col items-center">
          {/* เว้นช่องว่างเล็ก ๆ ในรางตรงตำแหน่งป้ายสถานี กันเส้นประของรางทะลุลอดหลังป้ายจนมองไม่ชัด
              ขนาด/ตำแหน่งต้องตรงกับ span ครอบไอคอนด้านล่างเป๊ะ ๆ (ทั้งคู่ size-16 เริ่มที่ top-0 ของ div นี้เหมือนกัน)
              ไม่ใช้ top-1/2 + translate-y-1/2 เพราะต้องเผื่อคำนวณจุดกึ่งกลางเอง พลาดง่ายเวลาโครงสร้างเปลี่ยน */}
          {showStationIcon && (
            <>
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-0 size-16 -translate-x-1/2 rounded-full"
                style={{ background: "var(--bg)" }}
              />

              <span className="relative flex size-16 items-center justify-center overflow-hidden rounded-full">
                <span className="relative block">
                  {active && (
                    <span className="absolute -inset-1.5 animate-ping rounded-full border-2 border-rust opacity-50" />
                  )}
                  <span
                    className={cn(
                      "group relative grid cursor-pointer place-items-center rounded-full border pointer-events-auto font-mono tracking-[0.1em] transition-all duration-300 hover:!scale-110 hover:!border-rust hover:!bg-rust/15 hover:!text-rust hover:!opacity-100 hover:shadow-[0_0_16px_-2px_var(--color-rust)]",
                      active
                        ? "size-12 border-2 border-rust bg-rust/15 text-rust text-[12px] opacity-100 shadow-[0_0_22px_-4px_var(--color-rust)]"
                        : visited
                          ? "size-10 border-black bg-black text-white text-[10px] opacity-100"
                          : "size-9 border-current/30 text-[10px] opacity-45",
                    )}
                  >
                    {Icon ? (
                      <Icon className={active ? "size-6" : visited ? "size-5" : "size-4"} aria-hidden="true" />
                    ) : (
                      String(index).padStart(2, "0")
                    )}
                  </span>
                </span>
              </span>
            </>
          )}

          {/* ป้ายชื่อสถานี — เดิมเป็น pill เล็ก ๆ ลอยข้างไอคอน อ่านยาก เปลี่ยนเป็นป้ายบอร์ดสถานีต่อขาลงมาจากไอคอนแทน
              ตัวป้ายใช้สีพื้น/ตัวอักษรคงที่ (paper/ink/rust) ไม่ตามธีมของ section เพื่อให้เด่นชัดเจนบนพื้นทุกแบบเหมือนป้ายสถานีจริง */}
          {label && (
            <div className="relative mt-1.5 flex flex-col items-center">
              <span
                aria-hidden="true"
                className={cn(
                  "h-2 w-px transition-colors duration-300",
                  active ? "bg-rust" : "bg-current/25",
                )}
              />
              <div
                className={cn(
                  "pointer-events-auto flex flex-col items-center gap-0.5 whitespace-nowrap rounded-lg border border-rust/60 bg-ink px-2.5 py-1.5 text-center shadow-md transition-all duration-300",
                  active
                    ? "scale-105 shadow-[0_10px_28px_-6px_rgba(0,0,0,0.45)] opacity-100"
                    : visited
                      ? "opacity-90"
                      : "opacity-55",
                )}
              >
                <span
                  className={cn(
                    // mr เท่ากับ tracking ติดลบ — ตัดช่องว่างท้ายตัวสุดท้ายที่ tracking แถมมา ไม่งั้นตัวหนังสือจะดูเยื้องซ้ายจากกึ่งกลางกล่อง
                    "mr-[-0.16em] font-station text-[8px] font-semibold uppercase leading-none tracking-[0.16em]",
                    active ? "text-rust" : "text-rust/60",
                  )}
                >
                  Station {String(index).padStart(2, "0")}
                </span>
                <span className="mr-[-0.025em] font-station text-[13px] font-bold uppercase leading-none tracking-wide text-rust">
                  {label}
                </span>
              </div>
            </div>
          )}
        </div>

        {withScrollCue && (
          // ลูกศรอยู่ตรงเส้นราง (เหมือนของเดิม) ส่วนคำว่า Scroll Down ย้ายไปลอยด้านข้างแทนที่จะซ้อนทับเส้นประของราง
          <div className="relative mb-20 mt-auto flex flex-col items-center">
            <ArrowDown
              className="size-6 rounded-full border border-rust/70 bg-ink/90 p-1 text-rust shadow-[0_0_12px_rgb(232_155_60/0.28)]"
              aria-hidden="true"
            />
            <span className="absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap text-right font-station text-[10px] font-bold uppercase leading-[1.55] tracking-[0.16em] text-rust opacity-90">
              Scroll
              <br />
              Down
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
