import { Route } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
import { GlossaryText } from "@/components/common/GlossaryText";
import type { CaseStudyLayout4 } from "@/lib/case-studies/layout-4";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

/**
 * แถบขั้นตอนการทำงานคั่นระหว่าง hero กับเนื้อหาโมดูล — บอกรูปร่างของระบบก่อนว่างานเดินจากซ้ายไปขวาอย่างไร
 * เจตนาไม่ใส่ภาพ เพราะหน้านี้มีภาพหนาแน่นอยู่แล้วทั้งด้านบนและด้านล่าง แถบนี้ทำหน้าที่เป็นที่พักสายตา
 */
export function CaseStudyWorkflowRail({
  workflow,
  lang,
}: {
  workflow: NonNullable<CaseStudyLayout4["workflow"]>;
  lang?: "th";
}) {
  return (
    <div>
      <Eyebrow>
        <Route className="size-3.5" aria-hidden="true" />
        {workflow.eyebrow ?? (lang === "th" ? TH_CASE_STUDY_UI.oneWorkflow : "One workflow")}
      </Eyebrow>

      <p className="mt-5 max-w-[74ch] text-[13px] leading-[1.75] text-muted">
        <GlossaryText text={workflow.description} />
      </p>

      <ol className="mt-7 grid gap-px border-t border-line bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {workflow.stages.map((stage) => (
          <li key={stage.number} className="bg-[var(--bg)] px-5 py-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-rust">{stage.number}</span>
            <h3 className="mt-2 font-heading text-[14px] font-bold text-fg">{stage.title}</h3>
            <p className="mt-1.5 text-[12px] leading-[1.6] text-muted">{stage.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
