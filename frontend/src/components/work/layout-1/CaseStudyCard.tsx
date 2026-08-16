import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/** กรอบการ์ดมาตรฐานของ section ย่อยในหน้า case study — หัวเป็นไอคอน + label ตัวพิมพ์ใหญ่ */
export function CaseStudyCard({
  icon: Icon,
  title,
  className,
  children,
}: {
  icon: LucideIcon;
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-2xl border border-line bg-surface p-6", className)}>
      <div className="flex items-center gap-2.5">
        <Icon className="size-4 text-rust" aria-hidden="true" />
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-fg">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}
