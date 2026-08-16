"use client";

import { useState } from "react";

import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { FlipReveal } from "@/components/motion/FlipBoard";
import type { Project } from "@/lib/types";

import { ProjectGrid } from "./ProjectGrid";

export function WorkExperience({
  projects,
  copy,
  lang,
}: {
  projects: Project[];
  lang?: string;
  copy?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    flipLabel?: string;
    visibleLabel?: string;
    projectLabel?: string;
    recommendedLabel?: string;
    emptyLabel?: string;
  };
}) {
  const [visibleCount, setVisibleCount] = useState(projects.length);

  return (
    <main lang={lang}>
      <PageHero
        eyebrow={copy?.eyebrow ?? "Experience"}
        title={copy?.title ?? "All projects"}
        className="pb-8 md:pb-8"
        description={copy?.description ?? "A collection of projects I have worked on, from web applications to backend systems"}
        supplement={
          <>
            <span className="sr-only" aria-live="polite">
              {copy?.visibleLabel ?? "Projects displayed"}: {visibleCount}
            </span>
            <span aria-hidden="true">
              <FlipReveal
                value={`${copy?.flipLabel ?? "PROJECTS & WORKS"}: ${visibleCount}`}
                size="status"
              />
            </span>
          </>
        }
      />

      <Section theme="dark" size="none" className="pb-20 md:pb-32">
        <div aria-hidden="true" className="absolute inset-0 -z-20">
          <img src="/Background_dark_3.png" alt="" className="size-full object-cover" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[var(--bg)]/85" />
        <Container>
          <ProjectGrid
            projects={projects}
            onVisibleCountChange={setVisibleCount}
            projectLabel={copy?.projectLabel}
            recommendedLabel={copy?.recommendedLabel}
            emptyLabel={copy?.emptyLabel}
            hrefBase={lang === "th" ? "/th/work" : "/work"}
          />
        </Container>
      </Section>

    </main>
  );
}
