import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

/** ไล่เฉดสำรองสำหรับผลงานที่ยังไม่มีภาพปก — วนซ้ำตามลำดับการ์ด */
const FALLBACK_GRADIENTS = [
  "linear-gradient(150deg,#1E2A3A,#0A1220)",
  "linear-gradient(150deg,#1E88C9,#0B4E82)",
  "linear-gradient(150deg,#2A3A4D,#12222F)",
  "linear-gradient(150deg,#94A7BD,#3A4A5C)",
  "linear-gradient(150deg,#0A1220,#0B7EC8)",
];

export function ProjectCard({
  project,
  index = 0,
  className,
  viewLabel = "View project",
  recommendedLabel = "Recommended",
  hrefBase = "/work",
}: {
  project: Project;
  index?: number;
  className?: string;
  viewLabel?: string;
  recommendedLabel?: string;
  hrefBase?: string;
}) {
  return (
    <Link href={`${hrefBase}/${project.slug}`} className={cn("group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface p-3 transition-colors hover:border-rust/60", className)}>
      <div className="relative aspect-[1.55/1] shrink-0 overflow-hidden rounded-lg border border-line bg-ink">
        {project.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- ยังไม่ได้ตั้ง remote patterns ของ next/image
          <img
            src={project.coverUrl}
            alt={project.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <MediaPlaceholder
            gradient={FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length]}
            className="size-full transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute left-3 top-3 font-display text-2xl leading-none text-rust">
          {String(index + 1).padStart(2, "0")}
        </span>
        {index !== 4 && index !== 5 && (
          <span className="absolute left-12 top-3 rounded-full border border-rust/50 bg-ink/75 px-3 py-1.5 font-station text-[10px] font-bold uppercase leading-none tracking-[0.18em] text-rust shadow-[0_4px_10px_rgb(0_0_0/0.18)]">
            {recommendedLabel}
          </span>
        )}
        <span className="absolute right-3 top-3 grid size-7 place-items-center rounded-full border border-paper/35 bg-ink/70 text-paper transition group-hover:border-rust group-hover:bg-rust group-hover:text-white">
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </span>
      </div>
      <p title={project.category} className="portfolio-label mt-5 h-[2lh] shrink-0 line-clamp-2 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-rust">
        {project.category}
      </p>
      <h3 title={project.title} className="portfolio-heading mt-2 h-[2lh] shrink-0 line-clamp-2 font-heading text-lg font-bold leading-snug text-fg">
        {project.title}
      </h3>
      <p className="portfolio-copy mt-3 h-[3lh] shrink-0 line-clamp-3 text-sm leading-[1.8] text-muted">
        {project.summary}
      </p>
      {project.tools.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tools.slice(0, 6).map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-line bg-[var(--bg)] px-2.5 py-1 font-sans text-xs leading-relaxed text-muted"
            >
              {tool}
            </span>
          ))}
        </div>
      )}
      <div className="mt-auto pt-5">
        <div className="portfolio-label flex items-center justify-between gap-3 border-t border-line pt-4 font-heading text-sm font-semibold text-rust">
          {viewLabel}
          <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}
