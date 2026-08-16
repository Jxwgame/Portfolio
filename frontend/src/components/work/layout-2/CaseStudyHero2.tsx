import Link from "next/link";
import { ArrowLeft, Calendar, Code, ExternalLink, FileText, Server, User, Users } from "lucide-react";

import { CaseStudyHeroImage } from "./CaseStudyHeroImage";
import { DisplayHeading } from "@/components/common/DisplayHeading";
import { Eyebrow } from "@/components/common/Eyebrow";
import { GlossaryText } from "@/components/common/GlossaryText";
import type { CaseStudyLayout2 } from "@/lib/case-studies/layout-2";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

export function CaseStudyHero2({ study, lang }: { study: CaseStudyLayout2; lang?: "th" }) {
  const isThai = lang === "th";
  const shots = [study.mainDiagram, ...study.diagramShots];

  return (
    <div>
      <Link
        href={isThai ? "/th/work" : "/work"}
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition hover:text-rust"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        {isThai ? TH_CASE_STUDY_UI.backToProjects : "Back to projects"}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-14">
        <div>
          <Eyebrow>
            <Server className="size-3.5" aria-hidden="true" />
            {study.eyebrow}
          </Eyebrow>
          <DisplayHeading as="h1" className="mt-3 text-[clamp(2.2rem,4.6vw,3.4rem)] leading-[0.94]">
            {study.title}
          </DisplayHeading>
          <p className="mt-5 max-w-[52ch] leading-[1.75] text-muted">
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
              <Users className="size-4 text-rust" aria-hidden="true" />
              {study.teamType}
            </span>
            <span className="inline-flex items-center gap-2">
              <User className="size-4 text-rust" aria-hidden="true" />
              {study.role}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {study.architectureUrl && (
              <a
                href={study.architectureUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-rust px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white shadow-[0_8px_24px_rgb(232_155_60/0.35)] transition hover:-translate-y-0.5 hover:bg-rust-deep"
              >
                {isThai ? TH_CASE_STUDY_UI.viewArchitecture : "View architecture"}
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            )}
            {study.repoUrl && (
              <a
                href={study.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-line px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] transition hover:-translate-y-0.5 hover:border-rust hover:text-rust"
              >
                {isThai ? TH_CASE_STUDY_UI.viewGithubRepo : "View repository"}
                <Code className="size-3.5" aria-hidden="true" />
              </a>
            )}
            {study.thesisUrl && (
              <a
                href={study.thesisUrl}
                download
                className="inline-flex items-center gap-2.5 rounded-full border border-line px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] transition hover:-translate-y-0.5 hover:border-rust hover:text-rust"
              >
                {isThai ? TH_CASE_STUDY_UI.downloadPdfThesis : "Download PDF thesis"}
                <FileText className="size-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <CaseStudyHeroImage shots={shots} lang={lang} />
      </div>
    </div>
  );
}
