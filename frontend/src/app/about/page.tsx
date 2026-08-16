import { Briefcase, ChartNoAxesCombined, Download, Mail, ShieldCheck } from "lucide-react";
import Image from "next/image";

import { Eyebrow } from "@/components/common/Eyebrow";
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
                  alt="Profile"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="absolute inset-0 -rotate-2 rounded-[1.75rem] object-cover object-top shadow-[0_20px_40px_rgb(0_0_0/0.16)]"
                />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <Eyebrow>My story</Eyebrow>
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
            <div className="mt-14 rounded-[1.75rem] border border-line bg-white/70 p-8 sm:p-10">
              <Eyebrow>Interest</Eyebrow>

              <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:divide-x lg:divide-[var(--line)]">
                {INTEREST_ITEMS.map((item) => (
                  <div key={item.title} className="flex items-start gap-5 lg:pl-8 lg:first:pl-0">
                    <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-rust/10 text-rust">
                      <item.icon className="size-7" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-heading text-xl font-semibold uppercase tracking-[0.02em]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-[1.75] text-muted">
                        {item.description}
                      </p>
                    </div>
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
