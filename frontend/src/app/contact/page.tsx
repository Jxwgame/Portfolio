import { BookOpen, Code2, FileDown, GitFork, Mail, MapPin, UserRound } from "lucide-react";

import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { getHome } from "@/lib/api";

export const metadata = { title: "Contact" };

// lucide v1 ตัดไอคอนแบรนด์ออกแล้ว จึงใช้ไอคอนความหมายใกล้เคียงแทนโลโก้จริง
// การ์ดที่มี download คือไฟล์จริงใน public/docs — ชื่อไฟล์ตอนโหลดตั้งใหม่ให้เป็นชื่อเต็มของเจ้าของเว็บ
// ไม่มีการ์ดที่ลิงก์ไปหน้า /work แล้ว เพราะซ้ำกับเมนูหลัก และชื่อชนกับ Portfolio ที่เป็นไฟล์ PDF
const RESOURCE_LINKS = [
  { label: "GitHub", sub: "Code repositories", icon: Code2, href: "https://github.com/Jxwgame", external: true },
  { label: "GitLab", sub: "Projects and source code", icon: GitFork, href: "https://gitlab.com/theerapatsangsee", external: true },
  { label: "Email", sub: "Direct contact", icon: Mail, hrefFromEmail: true },
  { label: "CV", sub: "Download CV", icon: UserRound, href: "/docs/cv.pdf", download: "Theerapat-Sangsee-CV.pdf" },
  { label: "Resume", sub: "Download resume", icon: FileDown, href: "/docs/resume.pdf", download: "Theerapat-Sangsee-Resume.pdf" },
  { label: "Portfolio", sub: "Download portfolio", icon: BookOpen, href: "/docs/portfolio.pdf", download: "Theerapat-Sangsee-Portfolio.pdf" },
];

/** หน้าติดต่อ — การ์ดลิงก์ช่องทางติดต่อ + ข้อมูลติดต่อโดยตรง (เอาฟอร์มส่งข้อความออกแล้ว) */
export default async function ContactPage() {
  const { settings } = await getHome();

  const infoRows = [
    { icon: Mail, label: "Email", value: settings["contact.email"], href: settings["contact.email"] ? `mailto:${settings["contact.email"]}` : undefined },
    { icon: MapPin, label: "Location", value: settings["contact.location"] },
  ].filter((row) => row.value);

  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        description="Have a project in mind or want to discuss an opportunity? Reach out through any channel below"
        backgroundImage="/Background_dark_new_4.webp"
        supplement={
          // เหลือการ์ดเดียวแล้ว — ใช้ความกว้างเต็ม Container (PageHero ครอบ 1280px ไว้ให้แล้ว) แทนการจำกัดแคบแบบฟอร์มคู่เดิม
          <Reveal className="w-full rounded-2xl border border-line bg-surface p-6 shadow-[0_1px_3px_rgb(0_0_0/0.06)] sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-rust/15 text-rust">
                <UserRound className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-heading text-lg font-bold text-fg">Connect &amp; Resources</h2>
                <p className="text-[13px] text-muted">Explore my work and reach out through any channel.</p>
              </div>
            </div>

            {/* 6 การ์ดพอดี 1 แถวบนจอกว้าง */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {RESOURCE_LINKS.map(({ label, sub, icon: Icon, href, hrefFromEmail, external, download }) => {
                const resolvedHref = hrefFromEmail ? (settings["contact.email"] ? `mailto:${settings["contact.email"]}` : "#") : href;
                return (
                  <a
                    key={label}
                    href={resolvedHref}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...(download ? { download } : {})}
                    className="group flex min-h-[176px] flex-col rounded-xl border border-line p-6 transition hover:border-rust/60"
                  >
                    <span className="grid size-11 place-items-center rounded-lg bg-rust/15 text-rust">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-fg">{label}</p>
                    <p className="mt-1 text-[11px] text-muted">{sub}</p>
                    <span className="mt-auto block pt-2 font-mono text-[11px] text-rust opacity-0 transition group-hover:opacity-100">→</span>
                  </a>
                );
              })}
            </div>

            {infoRows.length > 0 && (
              <div className="mt-6 border-t border-line pt-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">General information</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {infoRows.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-center gap-2.5">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-rust/15 text-rust">
                        <Icon className="size-3.5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{label}</p>
                        {href ? (
                          <a href={href} className="text-[13px] transition hover:text-rust">
                            {value}
                          </a>
                        ) : (
                          <p className="text-[13px]">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Reveal>
        }
      />
    </main>
  );
}
