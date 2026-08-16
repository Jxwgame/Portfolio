"use client";

import { useState } from "react";

import { FeaturedProjectCard } from "./FeaturedProjectCard";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { REAL_PROJECT_CARDS } from "@/lib/projects";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const FILTER_GROUPS = [
  {
    label: "Software Development",
    categories: ["Platform Engineering", "Healthcare Platform", "Food Ordering Platform"],
  },
  {
    label: "Infrastructure",
    categories: ["Infrastructure", "Monitoring & Observability", "AWS Cloud Project", "Healthcare Platform", "Platform Engineering"],
  },
] as const;

const FILTER_CATEGORIES = ["All", ...FILTER_GROUPS.map((group) => group.label)];

/** category ต้นฉบับภาษาอังกฤษ ผูกกับ slug — ใช้ทำ filter แทน project.category ตรง ๆ เพราะหน้าไทย
 * (/th/work) แปล category ที่แสดงผลเป็นไทยแล้ว แต่ปุ่ม filter ตั้งใจให้เป็นอังกฤษเหมือนเดิม */
const CANONICAL_CATEGORY_BY_SLUG = new Map(REAL_PROJECT_CARDS.map((project) => [project.slug, project.category]));

function filterProjects(projects: Project[], category: string) {
  if (category === "All") return projects;

  const group = FILTER_GROUPS.find((item) => item.label === category);
  return group
    ? projects.filter((project) => {
        const canonicalCategory = CANONICAL_CATEGORY_BY_SLUG.get(project.slug) ?? project.category;
        return group.categories.some((item) => item === canonicalCategory);
      })
    : projects;
}

/** กริดผลงานทั้งหมด + filter chip ตาม category — filter ฝั่ง client เพราะข้อมูลดึงมาครั้งเดียวจบ
 * การ์ดแรกของผลลัพธ์ที่กรองแล้วแสดงเป็นแบนเนอร์ featured เต็มความกว้าง ที่เหลือเรียงเป็น grid ปกติด้านล่าง
 */
export function ProjectGrid({
  projects,
  onVisibleCountChange,
  projectLabel,
  recommendedLabel,
  emptyLabel,
  hrefBase = "/work",
}: {
  projects: Project[];
  onVisibleCountChange?: (count: number) => void;
  projectLabel?: string;
  recommendedLabel?: string;
  emptyLabel?: string;
  hrefBase?: string;
}) {
  const [active, setActive] = useState("All");
  const filtered = filterProjects(projects, active);
  const [featuredItem, ...restItems] = filtered;
  const columnBreak = Math.ceil(FILTER_CATEGORIES.length / 2);
  const categoryColumns = [
    FILTER_CATEGORIES.slice(0, columnBreak),
    FILTER_CATEGORIES.slice(columnBreak),
  ];

  return (
    <>
      <p id="project-filter-label" className="font-station text-xs font-bold uppercase tracking-[0.16em] text-muted">
        Filter by category
      </p>

      <nav
        aria-labelledby="project-filter-label"
        className="relative mt-4 overflow-hidden rounded-xl border border-white/15 bg-[#060a0f]/90 p-3 shadow-[inset_0_0_32px_rgb(0_0_0/0.7),0_16px_45px_rgb(0_0_0/0.2)] sm:p-4"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(255,255,255,.035) 4px), radial-gradient(circle at 50% 0%, rgba(232,155,60,.12), transparent 45%)",
          }}
        />

        <div className="relative grid md:grid-cols-2">
          {categoryColumns.map((column, columnIndex) => (
            <ol
              key={columnIndex}
              className={cn(
                "min-w-0 px-1 sm:px-2",
                columnIndex === 1 && "border-t border-dashed border-white/10 pt-2 md:border-l md:border-t-0 md:pt-0",
              )}
            >
              {column.map((category, rowIndex) => {
                const categoryIndex = columnIndex === 0 ? rowIndex : columnBreak + rowIndex;
                const isActive = active === category;
                const isFirst = rowIndex === 0;
                const isLast = rowIndex === column.length - 1;

                return (
                  <li
                    key={category}
                    className="border-b border-dashed border-white/10 last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActive(category);
                        onVisibleCountChange?.(filterProjects(projects, category).length);
                      }}
                      aria-pressed={isActive}
                      className={cn(
                        "group my-1 grid min-h-16 w-full grid-cols-[44px_32px_minmax(0,1fr)_22px] items-center gap-2 rounded-md border px-2 py-3 text-left font-station uppercase transition sm:min-h-18 sm:grid-cols-[48px_36px_minmax(0,1fr)_28px] sm:gap-3 sm:px-3",
                        isActive
                          ? "border-rust bg-[linear-gradient(90deg,rgba(232,155,60,.13),rgba(232,155,60,.04))] text-rust shadow-[inset_0_0_22px_rgb(232_155_60/0.08),0_0_12px_rgb(232_155_60/0.08)]"
                          : "border-transparent text-[#e6b667] hover:border-rust/45 hover:bg-rust/5 hover:text-rust",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-9 items-center justify-center rounded border text-base font-extrabold tracking-[0.04em] sm:h-10 sm:text-lg",
                          isActive
                            ? "border-rust bg-rust/10 shadow-[inset_0_0_10px_rgb(232_155_60/0.18)]"
                            : "border-rust/65 text-rust/85 group-hover:border-rust",
                        )}
                        aria-hidden="true"
                      >
                        {String(categoryIndex + 1).padStart(2, "0")}
                      </span>

                      <span
                        className={cn(
                          "relative flex self-stretch items-center justify-center before:absolute before:left-1/2 before:w-px before:-translate-x-1/2 before:bg-rust/45",
                          isFirst ? "before:top-1/2" : "before:-top-4",
                          isLast ? "before:bottom-1/2" : "before:-bottom-4",
                        )}
                        aria-hidden="true"
                      >
                        <span
                          className={cn(
                            "relative z-10 size-4 rounded-full border-2 border-[#060a0f] ring-1 ring-rust transition sm:size-5",
                            isActive
                              ? "bg-rust shadow-[0_0_9px_rgb(232_155_60/0.85)]"
                              : "bg-[#111820] group-hover:bg-rust/35",
                          )}
                        />
                      </span>

                      <span className="min-w-0 text-[13px] font-extrabold leading-snug tracking-[0.08em] sm:text-[15px] lg:text-base">
                        {category}
                      </span>

                      <span
                        aria-hidden="true"
                        className={cn(
                          "text-right text-lg font-bold tracking-[-0.08em] transition sm:text-xl",
                          isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-55",
                        )}
                      >
                        ›››
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          ))}
        </div>
      </nav>

      {filtered.length === 0 ? (
        <p className="mt-14 text-muted">{emptyLabel ?? "No projects in this category yet."}</p>
      ) : (
        <div className="mt-10 grid gap-6">
          {featuredItem && (
            <Reveal key={featuredItem.slug}>
              <FeaturedProjectCard
                project={featuredItem}
                viewLabel={projectLabel}
                recommendedLabel={recommendedLabel}
                hrefBase={hrefBase}
              />
            </Reveal>
          )}

          {restItems.length > 0 && (
            <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {restItems.map((project, i) => (
                <Reveal as="li" key={project.slug} delay={((i + 1) % 6) * 60}>
                  <ProjectCard
                    project={project}
                    index={i + 1}
                    viewLabel={projectLabel}
                    recommendedLabel={recommendedLabel}
                    hrefBase={hrefBase}
                  />
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
