"use client";

import { useState } from "react";
import { Monitor, Smartphone, Tablet, type LucideIcon } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import { PhotoLightbox, ZoomTrigger } from "../PhotoLightbox";
import { cn } from "@/lib/utils";
import type { CaseStudyDeviceShot, CaseStudyLayout4 } from "@/lib/case-studies/layout-4";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

const DEVICE_ICONS: Record<CaseStudyDeviceShot["device"], LucideIcon> = {
  desktop: Monitor,
  tablet: Tablet,
  phone: Smartphone,
};

/**
 * สัดส่วนกรอบและความมนของแต่ละอุปกรณ์ — ตั้งใจไม่วาดแถบสถานะหรือปุ่มปลอมของเครื่อง
 * เพราะบนเครื่องจริงแถบสถานะจะซ้อนทับอยู่แล้ว วาดเพิ่มเองจะกลายเป็นซ้อนกันสองชั้น
 */
const DEVICE_FRAME: Record<CaseStudyDeviceShot["device"], { aspect: string; radius: string; width: string }> = {
  desktop: { aspect: "aspect-[16/10]", radius: "rounded-xl", width: "lg:basis-[52%]" },
  tablet: { aspect: "aspect-[3/4]", radius: "rounded-[22px]", width: "lg:basis-[26%]" },
  phone: { aspect: "aspect-[9/19]", radius: "rounded-[30px]", width: "lg:basis-[16%]" },
};

function DeviceFrame({
  shot,
  onZoom,
  lang,
}: {
  shot: CaseStudyDeviceShot;
  onZoom?: () => void;
  lang?: "th";
}) {
  const frame = DEVICE_FRAME[shot.device];

  return (
    <div className={cn("relative overflow-hidden border border-line bg-surface p-1.5 shadow-[0_20px_50px_rgb(0_0_0/0.35)]", frame.radius)}>
      <div className={cn("relative overflow-hidden", frame.aspect, frame.radius)}>
        {shot.image && onZoom ? (
          <ZoomTrigger label={shot.label} lang={lang} onClick={onZoom}>
            <MediaPlaceholder
              image={shot.image}
              focus={shot.focus ?? "top center"}
              fit="cover"
              className="size-full"
            />
          </ZoomTrigger>
        ) : (
          // ยังไม่มีภาพจริง: แผ่นไล่เฉดโทนหมึกเดียวกับหน้า ไม่ใช่ไล่เฉดอุ่นซึ่งเป็นค่าเริ่มต้นของ MediaPlaceholder
          <MediaPlaceholder
            label={shot.label}
            gradient="linear-gradient(150deg,#132436,#060d18)"
            className="size-full"
          />
        )}
      </div>
    </div>
  );
}

/**
 * แถบเทียบการแสดงผลสามขนาด — เดสก์ท็อปใหญ่สุดทางซ้าย ไล่ลงมาเป็นแท็บเล็ตและโทรศัพท์
 * กรอบทั้งสามวางชิดขอบล่างเดียวกัน เพื่อให้เห็นความต่างของสัดส่วนโดยไม่ต้องมีเส้นวัดหรือป้ายบอกความกว้าง
 * อุปกรณ์ที่ยังไม่มีภาพจริงจะขึ้นเป็นแผ่นเปล่าพร้อมป้ายชื่อ ขนาดกรอบเท่าเดิม หน้าจึงไม่ขยับตอนใส่ภาพเพิ่ม
 */
export function CaseStudyResponsive({
  responsive,
  lang,
}: {
  responsive: NonNullable<CaseStudyLayout4["responsive"]>;
  lang?: "th";
}) {
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  // lightbox เห็นเฉพาะอุปกรณ์ที่มีภาพจริง ลำดับจึงต้องนับแยกจากลำดับใน devices
  const zoomable = responsive.devices.filter((device) => device.image);
  const zoomIndexOf = (shot: CaseStudyDeviceShot) => zoomable.findIndex((item) => item.label === shot.label);

  return (
    <div>
      <Eyebrow>
        <Smartphone className="size-3.5" aria-hidden="true" />
        {responsive.eyebrow ?? (lang === "th" ? TH_CASE_STUDY_UI.responsive : "Responsive")}
      </Eyebrow>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end lg:gap-12">
        <h2 className="font-display text-[clamp(2rem,4vw,2.9rem)] uppercase leading-[1] tracking-[-0.01em] text-fg">
          {responsive.title}
        </h2>
        <p className="text-[13px] leading-[1.75] text-muted">{responsive.description}</p>
      </div>

      <div className="mt-10 flex flex-col items-stretch gap-8 lg:flex-row lg:items-end lg:gap-8">
        {responsive.devices.map((shot) => {
          const index = zoomIndexOf(shot);
          return (
            <div key={shot.label} className={cn("flex-1", DEVICE_FRAME[shot.device].width)}>
              <DeviceFrame
                shot={shot}
                lang={lang}
                onZoom={index >= 0 ? () => setZoomIndex(index) : undefined}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {responsive.devices.map((shot) => {
          const Icon = DEVICE_ICONS[shot.device];
          return (
            <div key={shot.label} className="rounded-2xl border border-line bg-surface p-5">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-rust">
                <Icon className="size-3.5" aria-hidden="true" />
                {shot.label}
              </span>
              <p className="mt-2.5 text-[12px] leading-[1.65] text-muted">{shot.note}</p>
            </div>
          );
        })}
      </div>

      <PhotoLightbox shots={zoomable} index={zoomIndex} onIndexChange={setZoomIndex} lang={lang} />
    </div>
  );
}
