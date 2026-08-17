import { Briefcase, ChartNoAxesCombined, Download, Mail, Server, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";

import { DisplayHeading } from "@/components/common/DisplayHeading";
import { WorkflowLine } from "@/components/common/WorkflowLine";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { iconFor } from "@/lib/icons";
import { getHome } from "@/lib/api";

export const metadata = { title: "About" };

// lucide v1 ตัดไอคอนแบรนด์ออกแล้ว จึงใช้ตัวย่อไปก่อนเหมือน Footer
const SOCIALS = [
  { label: "GitHub", short: "GH", href: "#" },
  { label: "GitLab", short: "GL", href: "#" },
];

const EDUCATION_FIELDS = [
  { label: "Education", value: "King Mongkut's Institute of Technology Ladkrabang (KMITL)" },
  { label: "Faculty", value: "Information Technology" },
  { label: "Program", value: "Bachelor of Science Program in Information Technology" },
  { label: "Specialization", value: "IT Infrastructure" },
];

const INTEREST_ITEMS = [
  {
    icon: ChartNoAxesCombined,
    title: "AI for Data Insight",
    description:
      "Applying AI in organizations to analyze data and surface insights, turning raw data into decisions that support day-to-day operations.",
  },
  {
    icon: ShieldCheck,
    title: "AI in Cybersecurity",
    description:
      "With more news of AI agents being used to breach systems, I'm interested in the other side: using AI agents to help defend internal systems and infrastructure.",
  },
  {
    icon: Server,
    title: "AI Infrastructure",
    description:
      "Interested in the systems that keep AI running in production, from cloud compute, storage, and networking to MLOps practices like CI/CD pipelines, monitoring, and infrastructure as code that keep AI workloads reliable and scalable.",
  },
];

/** หน้าเกี่ยวกับตัวเอง — ประวัติเต็ม + สถิติ + วิธีทำงาน + ไทม์ไลน์ */
export default async function AboutPage() {
  const { settings, services } = await getHome();

  return (
    <main>
      <PageHero
        eyebrow="About me"
        title="Who I am"
        description="An overview of who I am, what I do, and how I approach my work"
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
                  alt="Profile"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="absolute inset-0 -rotate-2 rounded-[1.75rem] object-cover object-top shadow-[0_20px_40px_rgb(0_0_0/0.16)]"
                />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="font-display text-[clamp(2rem,4vw,3.25rem)] uppercase leading-none tracking-[-0.01em] text-ink">
                My story
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.8rem,7vw,5.8rem)] uppercase leading-[0.96] tracking-[0.01em]">
                Theerapat Sangsee{" "}
                <span className="text-[0.4em] tracking-[0.04em]">(Jowgame)</span>
              </h2>
              <span className="mt-4 block h-0.5 w-8 bg-rust" aria-hidden="true" />

              <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {EDUCATION_FIELDS.map((field) => (
                  <div key={field.label}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      {field.label}
                    </dt>
                    <dd className="mt-1 text-sm leading-[1.6]">{field.value}</dd>
                  </div>
                ))}
              </dl>

              {settings["about.body"] ? (
                <p className="mt-6 max-w-[60ch] leading-[1.75] text-muted">{settings["about.body"]}</p>
              ) : null}

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="/docs/cv.pdf"
                  download="Theerapat-Sangsee-CV.pdf"
                  className="inline-flex items-center gap-2.5 rounded-full border border-line px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] transition hover:-translate-y-0.5 hover:border-rust hover:text-rust"
                >
                  Download CV
                  <Download className="size-3.5" aria-hidden="true" />
                </a>

                <a
                  href="/docs/resume.pdf"
                  download="Theerapat-Sangsee-Resume.pdf"
                  className="inline-flex items-center gap-2.5 rounded-full border border-line px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] transition hover:-translate-y-0.5 hover:border-rust hover:text-rust"
                >
                  Download Resume
                  <Download className="size-3.5" aria-hidden="true" />
                </a>

                <a
                  href="/work"
                  className="inline-flex items-center gap-2.5 rounded-full bg-rust px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white shadow-[0_8px_24px_rgb(232_155_60/0.35)] transition hover:-translate-y-0.5 hover:bg-rust-deep"
                >
                  Experience
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
                  What I care about
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-rust/25 bg-rust/[0.08] text-rust" aria-hidden="true">
                    <Sparkles className="size-3.5" strokeWidth={1.8} />
                  </span>
                </p>
                <DisplayHeading as="h2" className="mt-6 text-[clamp(2.65rem,5vw,4.2rem)] leading-[0.9]">
                  Interest &amp; Passion
                </DisplayHeading>
                <p className="mt-6 max-w-[53ch] text-sm leading-[1.65] text-ink/75">
                  Exploring how AI can solve real-world problems, strengthen systems, and build the
                  infrastructure for the future.
                </p>
              </div>

              <div className="relative mt-10 grid gap-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-0">
                {INTEREST_ITEMS.map((item, index) => (
                  <div key={item.title} className="relative lg:px-16 lg:first:pl-0 lg:last:pr-0">
                    {index > 0 ? (
                      <span className="absolute inset-y-0 left-0 hidden w-px bg-black/[0.08] lg:block" aria-hidden="true">
                        <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/20 bg-white" />
                      </span>
                    ) : null}
                    <span className="grid size-14 place-items-center rounded-full bg-rust/[0.07] text-rust shadow-[0_7px_18px_rgb(10_18_32/0.05)]">
                      <item.icon className="size-7" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-heading text-[1.02rem] font-bold uppercase tracking-[0.01em]">
                      {item.title}
                    </h3>
                    <span className="mt-3 block h-0.5 w-4 bg-rust" aria-hidden="true" />
                    <p className="mt-4 text-[13px] leading-[1.65] text-ink/75">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section theme="light">
        <Container>
          <WorkflowLine
            steps={services.map((service) => ({
              title: service.title,
              description: service.description,
              icon: iconFor(service.icon),
            }))}
          />
        </Container>
      </Section>

    </main>
  );
}
