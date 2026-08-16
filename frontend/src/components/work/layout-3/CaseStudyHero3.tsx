import Link from "next/link";
import { ArrowLeft, Calendar, Server, User, Users } from "lucide-react";

import { CaseStudyHeroGallery3 } from "./CaseStudyHeroGallery3";
import { Eyebrow } from "@/components/common/Eyebrow";
import { GlossaryText } from "@/components/common/GlossaryText";
import type { CaseStudyLayout3 } from "@/lib/case-studies/layout-3";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

export function CaseStudyHero3({ study, lang }: { study: CaseStudyLayout3; lang?: "th" }) {
  const isThai = lang === "th";

  return (
    <div>
      <Link
        href={isThai ? "/th/work" : "/work"}
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition hover:text-rust"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        {isThai ? TH_CASE_STUDY_UI.backToProjects : "Back to projects"}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
        <div>
          <Eyebrow>
            <Server className="size-3.5" aria-hidden="true" />
            {study.eyebrow}
          </Eyebrow>
          <h1 className="mt-3 font-heading text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.08] text-fg">
            {study.title}
          </h1>
          <p className="mt-4 max-w-[46ch] leading-[1.65] text-muted">
            <GlossaryText text={study.summary} />
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-muted">
            <span className="inline-flex items-center gap-2">
              <Calendar className="size-4 text-rust" aria-hidden="true" />
              {study.startDate} – {study.endDate}
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="size-4 text-rust" aria-hidden="true" />
              {study.teamType}
            </span>
            <span className="inline-flex items-center gap-2">
              <User className="size-4 text-rust" aria-hidden="true" />
              {study.role}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {study.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-muted"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <CaseStudyHeroGallery3 shots={study.heroShots} lang={lang} />
      </div>
    </div>
  );
}
