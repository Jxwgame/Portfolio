import type { CSSProperties } from "react";
import Image from "next/image";

import { ArrowLink } from "@/components/common/ArrowLink";
import { Eyebrow } from "@/components/common/Eyebrow";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

export function AboutIntro({
  settings,
  index,
  copy,
}: {
  settings: Record<string, string>;
  index?: number;
  copy?: {
    eyebrow: string;
    linkLabel: string;
    linkHref: string;
    railLabel?: string;
    profileAlt?: string;
  };
}) {
  return (
    <Section
      theme="dark"
      id="about"
      index={index}
      railLabel={copy?.railLabel ?? "About"}
      railIcon="about"
      showStationIcon={false}
      className="flex min-h-screen items-center border-t border-[var(--line)]"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <img
          src="/Background_dark_new_2.png"
          alt=""
          className="size-full object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,18,32,0.92) 0%, rgba(10,18,32,0.65) 32%, rgba(10,18,32,0.15) 62%, rgba(10,18,32,0) 78%)",
        }}
      />

      <Container className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <div
            style={
              {
                "--fg": "#eef1f6",
                "--muted": "#c7cedb",
                "--line": "rgba(255,255,255,0.28)",
                "--line-strong": "rgba(255,255,255,0.55)",
                color: "var(--fg)",
              } as CSSProperties
            }
          >
            <Eyebrow>{copy?.eyebrow ?? "About me"}</Eyebrow>
            <h2 className="mt-4 max-w-[10ch] font-display text-[clamp(2.8rem,7vw,5.8rem)] uppercase leading-[0.96] tracking-[0.01em] text-paper">
              {settings["about.heading"]}
            </h2>
            <span className="mt-4 block h-0.5 w-8 bg-rust" aria-hidden="true" />
            <p className="mt-5 max-w-[52ch] leading-[1.75] text-muted">
              {settings["home.about.body"] ?? settings["about.body"]}
            </p>
            <ArrowLink href={copy?.linkHref ?? "/about"} variant="outline" className="mt-7">
              {copy?.linkLabel ?? "More about me"}
            </ArrowLink>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative ml-auto aspect-square max-w-100">
            <div className="absolute inset-[6%] rotate-3 rounded-[2rem] bg-rust" />
            <div className="absolute -right-3 -top-3 size-16 rounded-full bg-sun" />
            <Image
              src="/Profile.JPG"
              alt={copy?.profileAlt ?? "Profile"}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="absolute inset-0 -rotate-2 rounded-[1.75rem] border border-black/15 object-cover object-top shadow-[0_20px_40px_rgb(0_0_0/0.16)]"
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
