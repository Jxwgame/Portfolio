import { Layers } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
import type { CaseStudyTechItem3 } from "@/lib/case-studies/layout-3";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

/** ตัวย่อสำรองเมื่อไม่มีโลโก้ — หลายคำใช้อักษรแรกของแต่ละคำ, คำเดียวใช้ 3 ตัวแรก */
function initials(name: string) {
  const words = name.split(/\s+/);
  return words.length > 1 ? words.map((word) => word[0]).join("").slice(0, 3) : words[0].slice(0, 3);
}

export function CaseStudyTechStack3({ items, lang }: { items: CaseStudyTechItem3[]; lang?: "th" }) {
  return (
    <div>
      <Eyebrow>
        <Layers className="size-3.5" aria-hidden="true" />
        {lang === "th" ? TH_CASE_STUDY_UI.techStack : "Tech Stack"}
      </Eyebrow>
      <ul className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-6">
        {items.map((item) => (
          <li key={item.name} className="flex flex-col items-center gap-2 text-center">
            <span className="grid size-13 place-items-center rounded-2xl border border-line bg-white">
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element -- โลโก้ในเครื่อง ไม่ผ่าน next/image
                <img
                  src={`/Logo_Techstack/${item.image}`}
                  alt={item.name}
                  className="max-h-7 max-w-8 object-contain"
                />
              ) : (
                <span className="font-heading text-[11px] font-bold uppercase tracking-tight text-ink/70">
                  {initials(item.name)}
                </span>
              )}
            </span>
            <span className="max-w-full truncate font-mono text-[10px] text-muted">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
