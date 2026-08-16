import { Eyebrow } from "@/components/common/Eyebrow";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import type { Testimonial } from "@/lib/types";

export function Testimonials({
  testimonials,
  index,
}: {
  testimonials: Testimonial[];
  index?: number;
}) {
  return (
    <Section theme="dark" id="testimonials" index={index} railLabel="Praise" railIcon="praise">
      <Container>
        <Eyebrow align="center">Kind words</Eyebrow>

        <ul className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {testimonials.map((item, i) => (
            <Reveal as="li" key={item.name} delay={i * 80} className="grid gap-4.5">
              <span
                aria-hidden="true"
                className="h-5 font-serif text-[2.4rem] leading-[0.6] text-rust"
              >
                &ldquo;
              </span>
              <blockquote className="text-[0.92rem] leading-[1.75] opacity-90">
                {item.quote}
              </blockquote>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid size-10.5 shrink-0 place-items-center rounded-full bg-[linear-gradient(140deg,#C3AF8B,#8B6B45)] font-heading text-sm font-bold text-ink"
                >
                  {item.name.trim().charAt(0)}
                </span>
                <span>
                  <span className="block font-heading text-[0.8rem] uppercase tracking-[0.09em]">
                    {item.name}
                  </span>
                  <span className="block font-mono text-[10px] tracking-[0.08em] text-muted">
                    {[item.role, item.company].filter(Boolean).join(", ")}
                  </span>
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
