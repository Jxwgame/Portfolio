import { Milestone } from "lucide-react";

import { CaseStudyCard } from "./CaseStudyCard";
import type { CaseStudyPhase } from "@/lib/case-studies/layout-1";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";
import { cn } from "@/lib/utils";

/** สถานะโครงการเป็นขั้น ๆ — จุดทึบสีส้มสำหรับขั้นที่ทำแล้ว/กำลังทำ ขั้นที่ยังไม่ถึงเป็นเส้นขอบจาง */
export function CaseStudyTimeline({
  phases,
  className,
  lang,
}: {
  phases: CaseStudyPhase[];
  className?: string;
  lang?: "th";
}) {
  return (
    <CaseStudyCard
      icon={Milestone}
      title={lang === "th" ? TH_CASE_STUDY_UI.projectTimeline : "Project Timeline"}
      className={cn("h-full", className)}
    >
      <ol className="relative border-l border-line pl-7">
        {phases.map((phase, i) => (
          <li key={phase.title} className="pb-9 last:pb-0">
            <span
              className={cn(
                "absolute -left-[7px] mt-1 size-3.5 rounded-full border-2",
                phase.status === "upcoming" ? "border-line bg-surface" : "border-rust bg-rust",
              )}
            />
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3
              className={cn(
                "mt-1 font-heading text-sm font-bold uppercase tracking-[0.04em]",
                phase.status === "upcoming" ? "text-muted" : "text-fg",
              )}
            >
              {phase.title}
            </h3>
            <p className="mt-1.5 text-[13px] leading-[1.7] text-muted">{phase.description}</p>
          </li>
        ))}
      </ol>
    </CaseStudyCard>
  );
}
