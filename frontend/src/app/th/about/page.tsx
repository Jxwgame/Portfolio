import { Briefcase, ChartNoAxesCombined, Download, Mail, ShieldCheck } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

import { Eyebrow } from "@/components/common/Eyebrow";
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

const INTEREST_ICONS = [ChartNoAxesCombined, ShieldCheck];

/** เวอร์ชันไทยของหน้าเกี่ยวกับตัวเอง — คู่กับ src/app/about/page.tsx ตัวอังกฤษ */
export default async function ThaiAboutPage() {
  const { settings, services } = await getHome();

  return (
    <main lang="th">
      <PageHero
        eyebrow={TH_ABOUT.hero.eyebrow}
        title={TH_ABOUT.hero.title}
        description={TH_ABOUT.hero.description}
        backgroundImage="/Background_dark_new_3.png"
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
              <Eyebrow>{TH_ABOUT.story.eyebrow}</Eyebrow>
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
            <div className="mt-14 rounded-[1.75rem] border border-line bg-white/70 p-8 sm:p-10">
              <Eyebrow>{TH_ABOUT.interest.eyebrow}</Eyebrow>

              <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:divide-x lg:divide-[var(--line)]">
                {TH_ABOUT.interest.items.map((item, i) => {
                  const Icon = INTEREST_ICONS[i];
                  return (
                    <div key={item.title} className="flex items-start gap-5 lg:pl-8 lg:first:pl-0">
                      <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-rust/10 text-rust">
                        <Icon className="size-7" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-heading text-xl font-semibold uppercase tracking-[0.02em]">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-[1.75] text-muted">{item.description}</p>
                      </div>
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
