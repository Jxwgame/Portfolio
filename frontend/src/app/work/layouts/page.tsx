import Link from "next/link";
import { ArrowRight, LayoutGrid, LayoutList, LayoutTemplate } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { getCaseStudy } from "@/lib/case-studies";

export const metadata = { title: "Case study layouts" };

const LAYOUTS = [
  {
    slug: "future-habitats",
    icon: LayoutGrid,
    label: "Layout 1",
    tagline: "3-column card grid",
    description:
      "A left-side gallery with Timeline, Overview, Tech Stack, Architecture, and Challenges cards in a three-column grid, followed by a project gallery.",
  },
  {
    slug: "cloud-infrastructure",
    icon: LayoutTemplate,
    label: "Layout 2",
    tagline: "Summary cards + metrics",
    description:
      "A single-image hero with an image counter, followed by Overview, Role, Highlight, and Impact cards, an infrastructure diagram, key metrics, and key takeaways.",
  },
  {
    slug: "hybrid-cloud-infrastructure",
    icon: LayoutList,
    label: "Layout 3",
    tagline: "Photo-heavy gallery",
    description:
      "A large hero gallery with scrollable thumbnails, followed by summary cards, a photo gallery, Tech Stack alongside an infrastructure diagram, and a horizontal project journey.",
  },
] as const;

/** หน้ารวม 3 layout ของ project detail page — ไว้เทียบกันก่อนเลือกว่าจะใช้แบบไหนกับโปรเจกต์จริงแต่ละอัน */
export default function CaseStudyLayoutsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Work in progress"
        title="Case study layouts"
        description="Three draft case-study layouts using sample data, ready to compare before assigning them to real projects"
      />

      <Section theme="dark">
        <Container>
          <ul className="grid gap-6 lg:grid-cols-3">
            {LAYOUTS.map(({ slug, icon: Icon, label, tagline, description }) => {
              const study = getCaseStudy(slug);
              return (
                <li key={slug}>
                  <Link
                    href={`/work/${slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition hover:border-rust/60"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-9 place-items-center rounded-full border border-rust/50 bg-rust/10 text-rust">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-rust">{label}</p>
                        <p className="font-heading text-[13px] font-bold text-fg">{tagline}</p>
                      </div>
                    </div>

                    <p className="mt-4 flex-1 text-[13px] leading-[1.7] text-muted">{description}</p>

                    <p className="mt-5 border-t border-line pt-4 text-[13px] leading-tight text-fg">
                      {study?.title ?? slug}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-rust">
                      View layout
                      <span className="grid size-6 place-items-center rounded-full bg-rust text-white transition group-hover:translate-x-1">
                        <ArrowRight className="size-3" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

    </main>
  );
}
