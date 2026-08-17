import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { MediaPlaceholder } from "@/components/common/MediaPlaceholder";
import type { Project } from "@/lib/types";

const FALLBACK_GRADIENT = "linear-gradient(150deg,#1E2A3A,#0A1220)";

/** การ์ดผลงานแรกของผลลัพธ์ (หลังกรอง) — แบนเนอร์แนวนอน ภาพซ้าย/เนื้อหาขวา แทนที่จะบีบให้สูงเท่าการ์ดเล็กสองใบซ้อนกัน */
export function FeaturedProjectCard({
  project,
  viewLabel = "View project",
  recommendedLabel = "Recommended",
  hrefBase = "/work",
}: {
  project: Project;
  viewLabel?: string;
  recommendedLabel?: string;
  hrefBase?: string;
}) {
  return (
    <Link
      href={`${hrefBase}/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-rust/60 sm:flex-row"
    >
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto sm:w-2/5 sm:shrink-0">
        {project.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- ยังไม่ได้ตั้ง remote patterns ของ next/image
          <img
            src={project.coverUrl}
            alt={project.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <MediaPlaceholder gradient={FALLBACK_GRADIENT} className="size-full transition-transform duration-500 group-hover:scale-105" />
        )}
        <div className="absolute left-4 top-4 flex items-center gap-3">
          <span className="font-display text-2xl leading-none text-rust">01</span>
          <span className="rounded-full border border-rust/50 bg-ink/75 px-3 py-1.5 font-station text-[10px] font-bold uppercase leading-none tracking-[0.18em] text-rust shadow-[0_4px_10px_rgb(0_0_0/0.18)]">
            {recommendedLabel}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-rust">{project.category}</p>
        <h3 className="mt-2 font-heading text-xl font-bold tracking-[0.01em] text-fg sm:text-2xl">{project.title}</h3>
        <p className="mt-3 max-w-[60ch] text-[0.9rem] leading-[1.7] text-muted">{project.summary}</p>

        {project.tools.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tools.slice(0, 6).map((tool) => (
              <span key={tool} className="rounded-full border border-line bg-[var(--bg)] px-2.5 py-1 font-mono text-[10px] text-muted">
                {tool}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-rust">
          {viewLabel}
          <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}
