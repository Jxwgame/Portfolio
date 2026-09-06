import { ArrowLink } from "@/components/common/ArrowLink";
import { DisplayHeading } from "@/components/common/DisplayHeading";
import { Eyebrow } from "@/components/common/Eyebrow";
import { HeroClock } from "@/components/home/HeroClock";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

export function Hero({
  settings,
  index,
  copy,
}: {
  settings: Record<string, string>;
  index?: number;
  copy?: {
    aboutLabel: string;
    experienceLabel: string;
    aboutHref: string;
    experienceHref: string;
    railLabel?: string;
  };
}) {
  const title = settings["hero.title"] ?? "Platform 108\nWhat's Next Station.";
  // แยกบรรทัดตาม \n ที่เก็บไว้ใน settings และให้บรรทัดสุดท้ายเป็นสีส้ม
  const hasPeriod = title.trim().endsWith(".");
  const lines = title
    .split("\n")
    .map((line, i, arr) =>
      hasPeriod && i === arr.length - 1 ? line.replace(/\.$/, "") : line,
    );

  return (
    <Section
      theme="dark"
      size="none"
      id="home"
      index={index}
      railLabel={copy?.railLabel ?? "Home"}
      railIcon="home"
      scrollCue
      className="flex min-h-svh items-center pt-28 pb-20 md:pt-32 md:pb-24"
    >
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <img
          src="/Background_dark_new.webp"
          alt=""
          className="size-full object-cover object-top"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,18,32,0.94) 0%, rgba(10,18,32,0.78) 38%, rgba(10,18,32,0.3) 75%, rgba(10,18,32,0.15) 100%), linear-gradient(180deg, rgba(10,18,32,0.35) 0%, rgba(10,18,32,0) 45%, rgba(10,18,32,0.8) 100%)",
        }}
      />

      <Container className="relative z-[2]">
        <Reveal>
          <HeroClock className="mb-10 min-h-24 sm:min-h-28" thai={Boolean(copy)} />

          <Eyebrow>{settings["hero.eyebrow"] ?? "Welcome to my station"}</Eyebrow>

          <DisplayHeading
            as="h1"
            className="relative mt-5 max-w-[18ch] text-[clamp(2.25rem,6vw,5.5rem)] leading-[1.06] tracking-[-0.025em] [overflow-wrap:anywhere]"
          >
            {lines.map((line, i) => (
              <span key={i} className="block text-balance">
                {line}
                {hasPeriod && i === lines.length - 1 && (
                  <span className="ml-2 text-rust">.</span>
                )}
              </span>
            ))}
          </DisplayHeading>

          <div className="mt-8 max-w-xl border-l-2 border-rust/70 pl-5">
            <p className="font-heading text-lg font-bold leading-relaxed text-paper md:text-xl">
              {settings["hero.introduction"] ?? "I'm Theerapat Sangsee."}
            </p>
            <p className="mt-2 max-w-[48ch] text-sm leading-[1.85] text-paper/80 md:text-base">
              {settings["hero.description"] ??
                "From IT infrastructure to full-stack development, I build practical systems while continuing to explore my career path."}
            </p>
          </div>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
            <ArrowLink
              href={copy?.experienceHref ?? "/work"}
              variant="outline"
              className="justify-center border-rust bg-rust px-7 py-4 font-heading text-sm font-bold normal-case tracking-normal text-ink shadow-[0_8px_24px_rgb(232_155_60/0.2)] hover:border-paper hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust"
            >
              {copy?.experienceLabel ?? "Explore my work"}
            </ArrowLink>
            <ArrowLink
              href={copy?.aboutHref ?? "/about"}
              variant="outline"
              className="justify-center border-white/30 bg-ink/25 px-7 py-4 font-heading text-sm normal-case tracking-normal text-paper backdrop-blur-sm hover:border-white/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
            >
              {copy?.aboutLabel ?? "About me"}
            </ArrowLink>
          </div>
        </Reveal>
      </Container>

    </Section>
  );
}
