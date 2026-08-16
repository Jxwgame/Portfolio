import Link from "next/link";
import { ArrowLeft, Calendar, Code, ExternalLink, User } from "lucide-react";

import { CaseStudyGalleryCarousel } from "./CaseStudyGalleryCarousel";
import { DisplayHeading } from "@/components/common/DisplayHeading";
import { Eyebrow } from "@/components/common/Eyebrow";
import { GlossaryText } from "@/components/common/GlossaryText";
import type { CaseStudyLayout1 } from "@/lib/case-studies/layout-1";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

export function CaseStudyHero({ study, lang }: { study: CaseStudyLayout1; lang?: "th" }) {
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

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14">
        <CaseStudyGalleryCarousel shots={study.shots} lang={lang} />

        <div>
          <Eyebrow>{study.eyebrow}</Eyebrow>
          <DisplayHeading as="h1" className="mt-3 text-[clamp(2.4rem,5.5vw,4rem)]">
            {study.title}
          </DisplayHeading>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-rust">
            {study.tags.join("  •  ")}
          </p>
          <p className="mt-5 max-w-[60ch] leading-[1.75] text-muted">
            <GlossaryText text={study.summary} />
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {study.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-muted"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-muted">
            <span className="inline-flex items-center gap-2">
              <Calendar className="size-4 text-rust" aria-hidden="true" />
              {study.startDate} – {study.endDate}
            </span>
            <span className="inline-flex items-center gap-2">
              <User className="size-4 text-rust" aria-hidden="true" />
              {study.projectType}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-rust px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white shadow-[0_8px_24px_rgb(232_155_60/0.35)] transition hover:-translate-y-0.5 hover:bg-rust-deep"
              >
                {isThai ? TH_CASE_STUDY_UI.viewLiveDemo : "View live demo"}
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            )}
            {study.sourceUrl && (
              <a
                href={study.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-line px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] transition hover:-translate-y-0.5 hover:border-rust hover:text-rust"
              >
                {isThai ? TH_CASE_STUDY_UI.viewSourceCode : "View source code"}
                <Code className="size-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
