import { Eyebrow } from "@/components/common/Eyebrow";
import { ArrowLink } from "@/components/common/ArrowLink";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/work/ProjectCard";
import { FeaturedProjectCard } from "@/components/work/FeaturedProjectCard";
import type { Project } from "@/lib/types";

/** ผลงานหลัก 1 ใบและงานรอง 2 ใบ — ดูที่เหลือได้ที่ "View all projects" */
export function FeaturedWork({
  projects,
  index,
  copy,
}: {
  projects: Project[];
  index?: number;
  copy?: {
    eyebrow: string;
    heading: string;
    description: string;
    viewAllLabel: string;
    viewAllHref: string;
    listLabel: string;
    projectLabel: string;
    recommendedLabel?: string;
    railLabel?: string;
  };
}) {
  return (
    <Section
      theme="dark"
      id="work"
      index={index}
      railLabel={copy?.railLabel ?? "Work"}
      railIcon="work"
      size="none"
      className="flex min-h-screen items-center"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <img src="/Background_dark_2.webp" alt="" loading="lazy" className="size-full object-cover" />
      </div>
      {/* ไล่เฉดจาง ๆ ที่ขอบบน กลืนรอยต่อกับพื้นหลังของ Skills & Experience ด้านบน ไม่ให้เห็นรอยตัดภาพ */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-20 h-56 bg-gradient-to-b from-[var(--bg)] to-transparent"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[var(--bg)]/85" />
      <Container className="py-20 md:py-24">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Eyebrow>{copy?.eyebrow ?? "Featured projects"}</Eyebrow>
            <h2 className="portfolio-heading mt-4 max-w-[16ch] font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[1.04] tracking-[0.01em] text-paper">
              {copy?.heading ?? "Built to solve. Shaped to grow."}
            </h2>
            <p className="portfolio-copy mt-6 max-w-[52ch] text-base leading-[1.8] text-muted">
              {copy?.description ?? "A collection of selected works that reflect my approach to problem-solving, system design, and real-world impact."}
            </p>
          </div>
          <ArrowLink href={copy?.viewAllHref ?? "/work"} className="shrink-0">
            {copy?.viewAllLabel ?? "View all projects"}
          </ArrowLink>
        </Reveal>

        <ul
          aria-label={copy?.listLabel ?? "Selected projects"}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6"
        >
          {projects.slice(0, 3).map((project, i) => (
            <Reveal
              as="li"
              key={project.slug}
              delay={i * 60}
              className={i === 0 ? "min-w-0 sm:col-span-2" : "min-w-0"}
            >
              {i === 0 ? (
                <FeaturedProjectCard
                  project={project}
                  viewLabel={copy?.projectLabel}
                  recommendedLabel={copy?.recommendedLabel}
                  hrefBase={copy?.viewAllHref ?? "/work"}
                />
              ) : (
                <ProjectCard
                  project={project}
                  index={i}
                  viewLabel={copy?.projectLabel}
                  recommendedLabel={copy?.recommendedLabel}
                  hrefBase={copy?.viewAllHref ?? "/work"}
                />
              )}
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
