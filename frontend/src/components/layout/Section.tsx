import { SectionRail, type StationIconKey } from "./SectionRail";
import { cn } from "@/lib/utils";

export type SectionTheme = "light" | "sand" | "dark" | "rust";

const themeClass: Record<SectionTheme, string> = {
  light: "theme-light",
  sand: "theme-sand",
  dark: "theme-dark",
  rust: "theme-rust",
};

/**
 * แถบเนื้อหาหนึ่งช่วงของหน้า — เป็นตัวกำหนดธีมสีให้ลูกทั้งหมด
 * padding แยกเป็น 3 ระดับ: none (คุมเอง) / compact (แถบ CTA) / default
 * ใส่ index เมื่อต้องการเส้นตกแต่งพร้อมเลขลำดับที่ริมซ้าย
 */
export function Section({
  theme = "light",
  size = "default",
  id,
  index,
  railLabel,
  railIcon,
  scrollCue = false,
  showStation = true,
  showStationIcon = true,
  className,
  children,
}: {
  theme?: SectionTheme;
  size?: "default" | "compact" | "none";
  id?: string;
  index?: number;
  /** ชื่อสถานีย่อ ๆ โชว์เป็น badge ใต้เลขลำดับบนราง — ใส่เมื่อมี index เท่านั้น */
  railLabel?: string;
  /** ไอคอนแทนเลขลำดับในป้ายสถานีบนราง — ส่งเป็นคีย์ string เพราะ Section เป็น Server Component ส่ง component ข้าม boundary ไป Client Component ไม่ได้ */
  railIcon?: StationIconKey;
  scrollCue?: boolean;
  showStation?: boolean;
  showStationIcon?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const padding =
    size === "none" ? "" : size === "compact" ? "py-14" : "py-20 md:py-32";

  return (
    <section
      id={id}
      className={cn("relative isolate overflow-hidden", themeClass[theme], padding, className)}
    >
      {index !== undefined && (
        <SectionRail
          index={index}
          label={railLabel}
          icon={railIcon}
          withScrollCue={scrollCue}
          showStation={showStation}
          showStationIcon={showStationIcon}
        />
      )}
      {children}
    </section>
  );
}
