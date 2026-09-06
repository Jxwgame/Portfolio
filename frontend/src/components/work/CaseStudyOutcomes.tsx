import { CircleCheckBig } from "lucide-react";

import { GlossaryText } from "@/components/common/GlossaryText";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

export function CaseStudyOutcomes({ items, lang }: { items: string[]; lang?: "th" }) {
  if (items.length === 0) return null;

  return (
    <section id="outcomes" aria-labelledby="outcomes-heading" className="rounded-2xl border border-rust/30 bg-surface p-6 md:p-8">
      <h2 id="outcomes-heading" className="portfolio-heading font-heading text-2xl font-bold text-fg">
        {lang === "th" ? TH_CASE_STUDY_UI.impact : "Outcomes & Benefits"}
      </h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 rounded-xl border border-line bg-[var(--bg)] p-5">
            <CircleCheckBig className="mt-1 size-5 shrink-0 text-rust" aria-hidden="true" />
            <p className="portfolio-copy text-base leading-[1.8] text-muted">
              <GlossaryText text={item} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
