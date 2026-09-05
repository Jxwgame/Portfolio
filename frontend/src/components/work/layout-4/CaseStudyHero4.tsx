import Link from "next/link";
import { ArrowLeft, Calendar, Code, ExternalLink, FileText, Server, User, Users } from "lucide-react";

import { DisplayHeading } from "@/components/common/DisplayHeading";
import { Eyebrow } from "@/components/common/Eyebrow";
import { GlossaryText } from "@/components/common/GlossaryText";
import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import type { CaseStudyLayout4 } from "@/lib/case-studies/layout-4";
import { TH_CASE_STUDY_UI } from "@/lib/i18n/th";

/** แบ่งภาพเป็น 3 คอลัมน์แบบวนรอบ เพื่อให้ภาพติดกันในเมนูเดียวกันไม่ไปกองอยู่คอลัมน์เดียว */
function toColumns(images: string[], count = 3): string[][] {
  const columns: string[][] = Array.from({ length: count }, () => []);
  images.forEach((image, i) => columns[i % count].push(image));
  return columns.filter((column) => column.length > 0);
}

/** ระยะเวลาเลื่อนครบรอบของแต่ละคอลัมน์ — ไล่ให้ไม่เท่ากันเพื่อไม่ให้กำแพงเลื่อนเป็นแผงเดียว */
const DRIFT_SECONDS = [64, 82, 72];
/** ขยับคอลัมน์เหลื่อมกันตั้งแต่เริ่ม เพื่อไม่ให้ขอบบนของภาพเรียงตรงกันเป็นแถว */
const DRIFT_OFFSETS = ["0px", "-140px", "-70px"];

/**
 * Hero ของ Layout 4 — กำแพงภาพหน้าจอเลื่อนช้า ๆ อยู่หลังชื่อโปรเจกต์
 * ภาพทั้งหมดถูกลดเป็นขาวดำและจมอยู่ใต้ไล่เฉดสีหมึก ทำหน้าที่บอกขนาดของระบบ ไม่ได้ให้อ่าน
 * ตัวเลื่อนหยุดเมื่อชี้เมาส์ และหยุดสนิทเมื่อผู้ใช้ตั้งค่า prefers-reduced-motion (ดู .drift-* ใน globals.css)
 */
export function CaseStudyHero4({ study, lang }: { study: CaseStudyLayout4; lang?: "th" }) {
  const isThai = lang === "th";
  const columns = toColumns(study.heroWall);

  return (
    <div className="relative isolate min-h-[620px] overflow-hidden lg:min-h-[760px]">
      <div
        className="drift-wall pointer-events-none absolute -right-10 -top-32 hidden gap-6 lg:flex"
        style={{ transform: "rotate(-8deg)" }}
        aria-hidden="true"
      >
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="drift-col grid w-[260px] content-start gap-6 xl:w-[290px]"
            style={{
              animationDuration: `${DRIFT_SECONDS[columnIndex % DRIFT_SECONDS.length]}s`,
              marginTop: DRIFT_OFFSETS[columnIndex % DRIFT_OFFSETS.length],
            }}
          >
            {/* วนภาพชุดเดิมสองรอบ เพื่อให้เลื่อนถึง -50% แล้วต่อกันสนิทโดยไม่เห็นรอยต่อ */}
            {[...column, ...column].map((image, i) => (
              <MediaPlaceholder
                key={`${image}-${i}`}
                image={image}
                fit="cover"
                className="aspect-[2/1] rounded-xl border border-line grayscale brightness-[0.68]"
              />
            ))}
          </div>
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(96deg,var(--bg) 32%,color-mix(in srgb,var(--bg) 86%,transparent) 47%,color-mix(in srgb,var(--bg) 12%,transparent) 74%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{ background: "linear-gradient(180deg,var(--bg),transparent)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(0deg,var(--bg),transparent)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[640px] pt-2">
        <Link
          href={isThai ? "/th/work" : "/work"}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition hover:text-rust"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          {isThai ? TH_CASE_STUDY_UI.backToProjects : "Back to projects"}
        </Link>

        <Eyebrow className="mt-8">
          <Server className="size-3.5" aria-hidden="true" />
          {study.eyebrow}
        </Eyebrow>

        <DisplayHeading as="h1" className="mt-4 text-[clamp(2.8rem,6.5vw,5rem)] leading-[0.92]">
          {study.title}
        </DisplayHeading>

        <p className="mt-6 max-w-[46ch] text-[14px] leading-[1.75] text-muted">
          <GlossaryText text={study.summary} />
        </p>

        {study.heroStats && study.heroStats.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {study.heroStats.map((stat) => (
              <span
                key={stat}
                className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] text-muted"
              >
                {stat}
              </span>
            ))}
          </div>
        )}

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

        <div className="mt-10 flex gap-3 lg:hidden">
          {study.heroWall.slice(0, 3).map((image) => (
            <MediaPlaceholder
              key={image}
              image={image}
              fit="cover"
              className="aspect-[2/1] flex-1 rounded-xl border border-line grayscale brightness-[0.72]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
