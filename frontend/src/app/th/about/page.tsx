import { Briefcase, ChartNoAxesCombined, Download, Mail, Server, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

import { DisplayHeading } from "@/components/common/DisplayHeading";
import { WorkflowLine } from "@/components/common/WorkflowLine";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { iconFor } from "@/lib/icons";
import { getHome } from "@/lib/api";
import { TH_ABOUT, TH_HOME, TH_SERVICE_DESCRIPTIONS } from "@/lib/i18n/th";

export const metadata: Metadata = {
  title: "About",
  alternates: {
    canonical: "/th/about",
    languages: { en: "/about", th: "/th/about" },
  },
};

// lucide v1 ตัดไอคอนแบรนด์ออกแล้ว จึงใช้ตัวย่อไปก่อนเหมือน Footer
const SOCIALS = [
  { label: "GitHub", short: "GH", href: "#" },
  { label: "GitLab", short: "GL", href: "#" },
];

const INTEREST_ICONS = [ChartNoAxesCombined, ShieldCheck, Server];

/** เวอร์ชันไทยของหน้าเกี่ยวกับตัวเอง — คู่กับ src/app/about/page.tsx ตัวอังกฤษ */
export default async function ThaiAboutPage() {
  const { settings, services } = await getHome();

  return (
    <main lang="th">
      <PageHero
        eyebrow={TH_ABOUT.hero.eyebrow}
        title={TH_ABOUT.hero.title}
        description={TH_ABOUT.hero.description}
        backgroundImage="/Background_dark_new_3.webp"
      />

      <Section theme="sand" className="border-t border-[var(--line)]">
        <Container>
          {/* Part 1 — basic intro */}
          <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <div className="relative aspect-square max-w-100">
                <div className="absolute inset-[6%] rotate-3 rounded-[2rem] bg-rust" />
                <div className="absolute -right-3 -top-3 size-16 rounded-full bg-sun" />
                <Image
                  src="/Profile.JPG"
                  alt={TH_HOME.about.profileAlt ?? "Profile"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="absolute inset-0 -rotate-2 rounded-[1.75rem] object-cover object-top shadow-[0_20px_40px_rgb(0_0_0/0.16)]"
                />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="font-display text-[clamp(2rem,4vw,3.25rem)] font-black leading-none tracking-[-0.01em] text-ink">
                {TH_ABOUT.story.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.8rem,7vw,5.8rem)] uppercase leading-[0.96] tracking-[0.01em]">
                {TH_ABOUT.story.name}{" "}
                <span className="text-[0.4em] tracking-[0.04em]">{TH_ABOUT.story.nickname}</span>
              </h2>
              <span className="mt-4 block h-0.5 w-8 bg-rust" aria-hidden="true" />

              <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {TH_ABOUT.educationFields.map((field) => (
                  <div key={field.label}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      {field.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-[1.6]">{field.value}</dd>
                  </div>
                ))}
              </dl>

              {TH_HOME.settings["about.body"] ? (
                <p className="mt-6 max-w-[60ch] leading-[1.75] text-muted">
                  {TH_HOME.settings["about.body"]}
                </p>
              ) : null}

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="/docs/cv.pdf"
                  download="Theerapat-Sangsee-CV.pdf"
                  className="inline-flex items-center gap-2.5 rounded-full bg-rust px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white shadow-[0_8px_24px_rgb(232_155_60/0.35)] transition hover:-translate-y-0.5 hover:bg-rust-deep"
                >
                  {TH_ABOUT.actions.downloadCv}
                  <Download className="size-3.5" aria-hidden="true" />
                </a>

                <a
                  href="/docs/resume.pdf"
                  download="Theerapat-Sangsee-Resume.pdf"
                  className="inline-flex items-center gap-2.5 rounded-full border border-line px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] transition hover:-translate-y-0.5 hover:border-rust hover:text-rust"
                >
                  {TH_ABOUT.actions.downloadResume}
                  <Download className="size-3.5" aria-hidden="true" />
                </a>

                <a
                  href="/th#work"
                  className="inline-flex items-center gap-2.5 rounded-full border border-line px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] transition hover:-translate-y-0.5 hover:border-rust hover:text-rust"
                >
                  {TH_ABOUT.actions.experience}
                  <Briefcase className="size-3.5" aria-hidden="true" />
                </a>

                <ul className="flex gap-2.5">
                  {SOCIALS.map(({ label, short, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        aria-label={label}
                        className="grid size-9 place-items-center rounded-full border border-line font-mono text-[10px] tracking-wide transition hover:border-rust hover:bg-rust"
                      >
                        {short}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href={settings["contact.email"] ? `mailto:${settings["contact.email"]}` : "#"}
                      aria-label="Email"
                      className="grid size-9 place-items-center rounded-full border border-line transition hover:border-rust hover:bg-rust"
                    >
                      <Mail className="size-3.5" aria-hidden="true" />
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Part 2 — interest */}
          <Reveal delay={150}>
            <div className="relative mt-14 overflow-hidden rounded-[1.75rem] border border-black/[0.07] bg-white px-7 py-10 shadow-[0_12px_30px_rgb(10_18_32/0.06)] sm:px-10 lg:px-20 lg:pb-12 lg:pt-12">
              {/* ภาพประกอบรถไฟวางแบบจาง ๆ หลังหัวข้อ ตามภาพอ้างอิง */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 top-7 hidden w-[47%] max-w-[620px] lg:block"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "1448 / 700" }}>
                  <img
                    src="/picture-add-ons-about.webp"
                    alt=""
                    loading="lazy"
                    className="absolute inset-x-0 -top-12 w-full mix-blend-multiply"
                  />
                </div>
              </div>

              <div className="relative max-w-[57ch]">
                <p className="flex items-center gap-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-rust sm:text-[11px]">
                  <span className="size-2 shrink-0 rounded-full bg-rust" aria-hidden="true" />
                  {TH_ABOUT.interest.eyebrow}
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-rust/25 bg-rust/[0.08] text-rust" aria-hidden="true">
                    <Sparkles className="size-3.5" strokeWidth={1.8} />
                  </span>
                </p>
                <DisplayHeading as="h2" className="mt-6 text-[clamp(2.65rem,5vw,4.2rem)] leading-[0.9]">
                  {TH_ABOUT.interest.title}
                </DisplayHeading>
                <p className="mt-6 max-w-[53ch] text-sm leading-[1.65] text-ink/75">{TH_ABOUT.interest.description}</p>
              </div>

              <div className="relative mt-10 grid gap-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-0">
                {TH_ABOUT.interest.items.map((item, i) => {
                  const Icon = INTEREST_ICONS[i];
                  return (
                    <div key={item.title} className="relative lg:px-16 lg:first:pl-0 lg:last:pr-0">
                      {i > 0 ? (
                        <span className="absolute inset-y-0 left-0 hidden w-px bg-black/[0.08] lg:block" aria-hidden="true">
                          <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/20 bg-white" />
                        </span>
                      ) : null}
                      <span className="grid size-14 place-items-center rounded-full bg-rust/[0.07] text-rust shadow-[0_7px_18px_rgb(10_18_32/0.05)]">
                        <Icon className="size-7" strokeWidth={2} aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 font-heading text-[1.02rem] font-bold uppercase tracking-[0.01em]">
                        {item.title}
                      </h3>
                      <span className="mt-3 block h-0.5 w-4 bg-rust" aria-hidden="true" />
                      <p className="mt-4 text-[13px] leading-[1.75] text-ink/75">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section theme="light">
        <Container>
          <WorkflowLine
            eyebrow={TH_ABOUT.workflowEyebrow}
            steps={services.map((service) => ({
              title: service.title,
              description: TH_SERVICE_DESCRIPTIONS[service.title] ?? service.description,
              icon: iconFor(service.icon),
            }))}
          />
        </Container>
      </Section>
    </main>
  );
}
