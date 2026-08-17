import { Eyebrow } from "@/components/common/Eyebrow";
import { ArrowLink } from "@/components/common/ArrowLink";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/work/ProjectCard";
import type { Project } from "@/lib/types";

/** โชว์แค่แถวเดียว (4 คอลัมน์บนจอใหญ่) — ดูที่เหลือได้ที่ "View all work" */
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
    carouselLabel: string;
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
            <h2 className="mt-4 max-w-[12ch] font-display text-[clamp(2.8rem,6vw,5.4rem)] uppercase leading-[0.9] tracking-[0.01em] text-paper">
              {copy?.heading ?? "Built to solve. Shaped to grow."}
            </h2>
            <p className="mt-4 max-w-[48ch] text-sm leading-[1.7] text-paper/65">
              {copy?.description ?? "A collection of selected works that reflect my approach to problem-solving, system design, and real-world impact."}
            </p>
          </div>
          <ArrowLink href={copy?.viewAllHref ?? "/work"} className="shrink-0">
            {copy?.viewAllLabel ?? "View all projects"}
          </ArrowLink>
        </Reveal>

        <ul
          aria-label={copy?.carouselLabel ?? "Featured projects carousel"}
          className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, i) => (
            <Reveal
              as="li"
              key={project.slug}
              delay={i * 60}
              className="min-w-0 shrink-0 basis-full snap-start sm:basis-[calc((100%-0.75rem)/2)] lg:basis-[calc((100%-2.25rem)/4)]"
            >
              <ProjectCard
                project={project}
                index={i}
                viewLabel={copy?.projectLabel}
                recommendedLabel={copy?.recommendedLabel}
              />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
