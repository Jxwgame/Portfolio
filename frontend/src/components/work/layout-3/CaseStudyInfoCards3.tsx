import { CircleCheckBig, Info, Target, TrendingUp, UserCog, type LucideIcon } from "lucide-react";

import { GlossaryText } from "@/components/common/GlossaryText";
import type { CaseStudyLayout3 } from "@/lib/case-studies/layout-3";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-rust" aria-hidden="true" />
        <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-fg">{title}</h2>
      </div>
      <div className="mt-3 text-[13px] leading-[1.65] text-muted">{children}</div>
    </div>
  );
}

export function CaseStudyInfoCards3({ study, lang }: { study: CaseStudyLayout3; lang?: "th" }) {
  const t = lang === "th" ? TH_CASE_STUDY_UI : null;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <InfoCard icon={Info} title={t?.overview ?? "Overview"}>
        <GlossaryText text={study.overview} />
      </InfoCard>
      <InfoCard icon={UserCog} title={t?.roleResponsibility ?? "Role & Responsibility"}>
        <GlossaryText text={study.responsibility} />
      </InfoCard>
      <InfoCard icon={Target} title={t?.highlight ?? "Highlight"}>
        <ul className="grid gap-1.5">
          {study.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CircleCheckBig className="mt-0.5 size-3.5 shrink-0 text-rust" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </InfoCard>
      <InfoCard icon={TrendingUp} title={t?.impact ?? "Impact"}>
        <ul className="grid gap-1.5">
          {study.impact.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CircleCheckBig className="mt-0.5 size-3.5 shrink-0 text-rust" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </InfoCard>
    </div>
  );
}
