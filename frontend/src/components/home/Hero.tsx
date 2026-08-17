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
      className="flex min-h-screen items-center pt-32 pb-20 md:pt-38 md:pb-28"
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
            "linear-gradient(270deg, rgba(10,18,32,0.75) 0%, rgba(10,18,32,0.4) 28%, rgba(10,18,32,0) 55%), linear-gradient(90deg, rgba(10,18,32,0.8) 0%, rgba(10,18,32,0.45) 32%, rgba(10,18,32,0) 62%), linear-gradient(180deg, rgba(10,18,32,0.7) 0%, rgba(10,18,32,0.15) 22%, rgba(10,18,32,0) 40%)",
        }}
      />

      <Container className="relative z-[2]">
        <Reveal>
          <HeroClock className="mb-8" thai={Boolean(copy)} />

          <Eyebrow>{settings["hero.eyebrow"] ?? "Welcome to my station"}</Eyebrow>

          <DisplayHeading
            as="h1"
            className="relative mt-6 text-[clamp(2.25rem,8vw,6.5rem)] leading-[0.96] tracking-[-0.025em]"
          >
            {lines.map((line, i) => (
              <span key={i} className="block sm:whitespace-nowrap">
                {line}
                {hasPeriod && i === lines.length - 1 && (
                  <span className="ml-2 text-rust">.</span>
                )}
              </span>
            ))}
          </DisplayHeading>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <ArrowLink
              href={copy?.aboutHref ?? "/about"}
              variant="outline"
              className="border-rust bg-rust px-7 py-4 text-white shadow-[0_8px_24px_rgb(232_155_60/0.35)] hover:bg-rust-deep hover:border-rust-deep"
            >
              {copy?.aboutLabel ?? "About Me"}
            </ArrowLink>
            <ArrowLink
              href={copy?.experienceHref ?? "/work"}
              variant="outline"
              className="border-white/30 bg-white/10 px-7 py-4 text-paper backdrop-blur-sm hover:border-white/60 hover:bg-white/20"
            >
              {copy?.experienceLabel ?? "My Experience"}
            </ArrowLink>
          </div>
        </Reveal>
      </Container>

    </Section>
  );
}
