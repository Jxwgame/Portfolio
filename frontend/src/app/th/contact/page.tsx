import { BookOpen, Code2, FileDown, GitFork, Mail, MapPin, UserRound } from "lucide-react";
import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { getHome } from "@/lib/api";
import { TH_CONTACT } from "@/lib/i18n/th";

export const metadata: Metadata = {
  title: "Contact",
  alternates: {
    canonical: "/th/contact",
    languages: { en: "/contact", th: "/th/contact" },
  },
};

// ไอคอนเรียงตามลำดับเดียวกับ TH_CONTACT.resources.links (GitHub, GitLab, Email, CV, Resume, Portfolio)
const RESOURCE_ICONS = [Code2, GitFork, Mail, UserRound, FileDown, BookOpen];

// ปลายทางของการ์ดแต่ละใบ — ต้องตรงกับฝั่งอังกฤษใน src/app/contact/page.tsx
// ตัวที่มี download คือไฟล์จริงใน public/docs ส่วน Email ประกอบ mailto: จาก settings เอาเองข้างล่าง
const RESOURCE_TARGETS: Record<string, { href: string; download?: string; external?: boolean }> = {
  GitHub: { href: "https://github.com/Jxwgame", external: true },
  GitLab: { href: "https://gitlab.com/theerapatsangsee", external: true },
  CV: { href: "/docs/cv.pdf", download: "Theerapat-Sangsee-CV.pdf" },
  Resume: { href: "/docs/resume.pdf", download: "Theerapat-Sangsee-Resume.pdf" },
  Portfolio: { href: "/docs/portfolio.pdf", download: "Theerapat-Sangsee-Portfolio.pdf" },
};

/** เวอร์ชันไทยของหน้าติดต่อ — คู่กับ src/app/contact/page.tsx ตัวอังกฤษ */
export default async function ThaiContactPage() {
  const { settings } = await getHome();

  const infoRows = [
    {
      icon: Mail,
      label: TH_CONTACT.resources.fields.email,
      value: settings["contact.email"],
      href: settings["contact.email"] ? `mailto:${settings["contact.email"]}` : undefined,
    },
    { icon: MapPin, label: TH_CONTACT.resources.fields.location, value: settings["contact.location"] },
  ].filter((row) => row.value);

  return (
    <main lang="th">
      <PageHero
        eyebrow={TH_CONTACT.hero.eyebrow}
        title={TH_CONTACT.hero.title}
        description={TH_CONTACT.hero.description}
        backgroundImage="/Background_dark_new_4.webp"
        supplement={
          // เหลือการ์ดเดียวแล้ว — ใช้ความกว้างเต็ม Container (PageHero ครอบ 1280px ไว้ให้แล้ว) แทนการจำกัดแคบแบบฟอร์มคู่เดิม
          <Reveal className="w-full rounded-2xl border border-line bg-surface p-6 shadow-[0_1px_3px_rgb(0_0_0/0.06)] sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-rust/15 text-rust">
                <UserRound className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-heading text-lg font-bold text-fg">{TH_CONTACT.resources.heading}</h2>
                <p className="text-[13px] text-muted">{TH_CONTACT.resources.subheading}</p>
              </div>
            </div>

            {/* 6 การ์ดพอดี 1 แถวบนจอกว้าง */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {TH_CONTACT.resources.links.map(({ label, sub }, i) => {
                const Icon = RESOURCE_ICONS[i];
                const target = RESOURCE_TARGETS[label];
                const resolvedHref =
                  label === "Email"
                    ? settings["contact.email"]
                      ? `mailto:${settings["contact.email"]}`
                      : "#"
                    : (target?.href ?? "#");
                return (
                  <a
                    key={label}
                    href={resolvedHref}
                    {...(target?.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...(target?.download ? { download: target.download } : {})}
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
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{TH_CONTACT.resources.generalInfo}</p>
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
