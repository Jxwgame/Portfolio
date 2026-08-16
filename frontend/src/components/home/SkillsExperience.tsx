import { Eyebrow } from "@/components/common/Eyebrow";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TECH_CATEGORIES, type TechCategory } from "@/lib/techStack";
import type { Skill } from "@/lib/types";

type TechCategoryCopy = {
  title: string;
  tags: string;
};

function TechCard({ group, copy }: { group: TechCategory; copy?: TechCategoryCopy }) {
  const { Icon } = group;

  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/25 bg-[linear-gradient(135deg,rgba(24,34,48,0.94),rgba(12,22,36,0.8))] px-4 pb-3 pt-3 shadow-[0_16px_45px_rgb(0_0_0/0.2)] sm:px-5">
      <div className="flex items-center gap-4 border-b border-white/12 pb-2.5">
        <span className="font-display text-2xl leading-none text-rust">{group.number}</span>
        <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-paper">
          {copy?.title ?? group.title}
        </h3>
        <span className="ml-auto grid size-7 place-items-center text-rust" aria-hidden="true">
          <Icon className="size-5" />
        </span>
      </div>

      <div className="grid grid-cols-4 gap-x-2 gap-y-4 py-4 sm:grid-cols-8">
        {group.items.map((item) => (
          <div key={`${group.title}-${item.name}`} className="flex min-w-0 flex-col items-center gap-1.5 text-center">
            <span className="grid size-9 place-items-center rounded-xl bg-white sm:size-10">
              {item.image ? (
                <img
                  src={`/Logo_Techstack/${item.image}`}
                  alt=""
                  className="max-h-7 max-w-7 object-contain sm:max-h-8 sm:max-w-9"
                />
              ) : (
                <span className="font-heading text-xl font-bold tracking-[-0.12em] text-ink/70">
                  {item.mark}
                </span>
              )}
            </span>
            <span className="max-w-full truncate font-mono text-[9px] leading-tight text-paper/75 sm:text-[10px]">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      <p className="border-t border-dashed border-white/15 pt-2 text-center font-mono text-[9px] tracking-[0.04em] text-rust sm:text-[10px]">
        {copy?.tags ?? group.tags}
      </p>
    </article>
  );
}

export function SkillsExperience({
  summary,
  index,
  copy,
}: {
  skills: Skill[];
  summary: string;
  index?: number;
  copy?: {
    eyebrow: string;
    heading: string;
    railLabel?: string;
    categories?: Record<string, TechCategoryCopy>;
  };
}) {
  return (
    <Section
      theme="dark"
      id="skills"
      index={index}
      railLabel={copy?.railLabel ?? "Skills"}
      railIcon="skills"
      className="min-h-screen"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[#071426]">
        <img src="/Background_dark_1.png" alt="" className="size-full object-fill" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,15,29,0.96)_0%,rgba(5,15,29,0.87)_54%,rgba(5,15,29,0.66)_100%)]" />

      <Container className="py-20 md:py-28">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>{copy?.eyebrow ?? "Skills & Toolkit"}</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(3.2rem,8vw,6.5rem)] uppercase leading-[0.88] tracking-tight text-paper">
              {copy?.heading ?? "Technical Cargo"}
            </h2>
            <span className="mt-4 block h-0.5 w-8 bg-rust" aria-hidden="true" />
            <p className="mt-4 max-w-[54ch] text-sm leading-[1.7] text-paper/65">
              {summary || "Experience across many projects has taught me that good work starts with understanding the problem before writing code. I define the structure clearly, then refine the details."}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-3">
            {TECH_CATEGORIES.map((group, i) => (
              <Reveal key={group.number} delay={i * 80}>
                <TechCard group={group} copy={copy?.categories?.[group.key]} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
