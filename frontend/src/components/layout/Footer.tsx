"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Brand } from "./Brand";
import { Container } from "./Container";
import { FOOTER_LINKS, TH_HREF_OVERRIDES } from "@/lib/nav";
import type { Service } from "@/lib/types";

// lucide v1 ตัดไอคอนแบรนด์ออกแล้ว จึงใช้ตัวย่อไปก่อน — เปลี่ยนเป็น SVG โลโก้จริงได้ทีหลัง
const SOCIALS = [
  { label: "GitHub", short: "GH", href: "#" },
  { label: "LinkedIn", short: "IN", href: "#" },
  { label: "Instagram", short: "IG", href: "#" },
  { label: "Email", short: "@", href: "#" },
];

const TH_FOOTER_LABELS: Record<string, string> = {
  Home: "หน้าแรก",
  About: "เกี่ยวกับผม",
  "Technical Cargo": "Technical Cargo",
  Experience: "ประสบการณ์",
  Contact: "ติดต่อ",
  Help: "ช่วยเหลือ",
};

const TH_SERVICE_TITLES: Record<string, string> = {
  "Design System": "ระบบออกแบบ",
  Development: "การพัฒนาซอฟต์แวร์",
  Infrastructure: "โครงสร้างพื้นฐาน",
  Automation: "ระบบอัตโนมัติ",
};

export function Footer({
  settings,
  services,
}: {
  settings: Record<string, string>;
  services: Service[];
}) {
  const pathname = usePathname();
  const isThai = pathname === "/th" || pathname.startsWith("/th/");
  const name = settings["site.name"] ?? "Your Name";

  return (
    <footer className="theme-dark relative isolate min-h-[360px] overflow-hidden border-t border-white/10 pt-10 pb-2">
      <Container>
        <div className="grid gap-9 md:grid-cols-[1.5fr_1fr_1fr_1.2fr_1fr]">
          <div>
            <Brand name={name} className="mb-4" />
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              {isThai ? "ออกแบบ พัฒนา ส่งมอบ" : "Design. Build. Ship."}
            </p>
          </div>

          <FooterCol title={isThai ? "เมนู" : "Navigation"}>
            {FOOTER_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  href={isThai ? (TH_HREF_OVERRIDES[item.href] ?? item.href) : item.href}
                  className="transition hover:text-rust"
                >
                  {isThai ? TH_FOOTER_LABELS[item.label] ?? item.label : item.label}
                </Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title={isThai ? "บริการ" : "Services"}>
            {services.map((service) => (
              <li key={service.title}>
                {isThai ? TH_SERVICE_TITLES[service.title] ?? service.title : service.title}
              </li>
            ))}
          </FooterCol>

          <FooterCol title={isThai ? "ข้อมูลติดต่อ" : "Info"}>
            <li>{settings["contact.email"]}</li>
            <li>{settings["contact.phone"]}</li>
            <li>{settings["contact.location"]}</li>
          </FooterCol>

          <div>
            <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-sand">
              {isThai ? "ช่องทางติดต่อ" : "Let's connect"}
            </h2>
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
            </ul>
          </div>
        </div>

        <p className="mt-8 border-t border-line py-4 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          © {new Date().getFullYear()} {name}. {isThai ? "สงวนลิขสิทธิ์" : "All rights reserved."}
        </p>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-sand">
        {title}
      </h2>
      <ul className="grid gap-2.5 text-[13px] text-muted">{children}</ul>
    </div>
  );
}
