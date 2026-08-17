"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, ChevronLeft, ChevronRight, Languages, Menu, X } from "lucide-react";

import { Brand } from "./Brand";
import { Container } from "./Container";
import { LanguageConfirmDialog } from "./LanguageConfirmDialog";
import { NAV_ITEMS, SECTION_IDS, TH_NAV_ITEMS, type NavLeaf } from "@/lib/nav";
import { cn } from "@/lib/utils";

const COLLAPSED_KEY = "sidebar-collapsed";

export function Sidebar({ name }: { name: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const isThai = pathname === "/th" || pathname.startsWith("/th/");
  const isHome = pathname === "/" || pathname === "/th";
  const navItems = isThai ? TH_NAV_ITEMS : NAV_ITEMS;

  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>([isThai ? "หน้าแรก" : "Home"]);
  const [activeId, setActiveId] = useState<string>("home");
  // href ที่รอผู้ใช้ยืนยันใน LanguageConfirmDialog ก่อนค่อย push จริง — null คือ dialog ปิดอยู่
  const [pendingLangHref, setPendingLangHref] = useState<string | null>(null);

  // ใช้แทน <Link> ธรรมดาบนปุ่มสลับภาษาทุกปุ่ม (มือถือ/desktop ย่อ/กาง) กันคลิกพลาดแล้วเด้งข้ามภาษาทันที
  const requestLanguage = (href: string, targetIsThai: boolean) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (targetIsThai === isThai) return;
    e.preventDefault();
    setPendingLangHref(href);
  };
  const confirmLanguage = () => {
    if (pendingLangHref) router.push(pendingLangHref);
    setPendingLangHref(null);
  };
  const cancelLanguage = () => setPendingLangHref(null);

  // อ่านค่าที่ผู้ใช้เลือกไว้หลัง mount — อ่านตอน render แรกไม่ได้เพราะ server ไม่มี localStorage แล้วจะ hydrate ไม่ตรงกัน
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync ครั้งเดียวหลัง mount เพื่อเลี่ยง hydration mismatch
    if (localStorage.getItem(COLLAPSED_KEY) === "1") setCollapsed(true);
  }, []);

  // <html data-sidebar> เป็นตัวคุม --sidebar-w ที่เนื้อหาใน layout ใช้เว้นระยะ (ดู globals.css)
  useEffect(() => {
    document.documentElement.dataset.sidebar = collapsed ? "collapsed" : "expanded";
  }, [collapsed]);

  // scroll-spy ทำงานเฉพาะหน้าแรก เพราะ submenu ทั้งหมดเป็น section ของหน้าแรก — หน้าอื่นทุกหน้าตอนนี้เป็น route
  // เต็มล้วน ๆ ไม่มี anchor ย่อยอีกแล้ว (Technical Cargo ก็แยกเป็น /skills ของตัวเอง) เลยไม่ต้อง scroll-spy
  useEffect(() => {
    if (!isHome) return;

    // รีเซ็ตกลับ "home" ทุกครั้งที่เข้าเพจแรกใหม่ (รวมสลับ / ↔ /th) กัน activeId
    // ค้างจากตำแหน่งสกอลล์เพจก่อนหน้า เพราะ Sidebar ไม่ unmount ตอนสลับภาษา
    setActiveId("home");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [isHome, pathname]);

  // กันเคส Next.js ไม่ scroll ไปหา section เป้าหมายตอนลิงก์ข้ามหน้ามี hash (เช่น /about -> /#about)
  // ทำงานเฉพาะตอน pathname เปลี่ยน เพราะ hash เปลี่ยนในหน้าเดียวกัน <Link> ของ Next จัดการเองอยู่แล้ว
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    const frame = window.requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth" }));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  // ล็อกการเลื่อนพื้นหลังตอนเมนูมือถือเปิด (ตัวเมนูปิดตัวเองจาก onClick ของแต่ละลิงก์)
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem(COLLAPSED_KEY, next ? "1" : "0");
  };

  const toggleGroup = (label: string) =>
    setOpenGroups((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );

  // บนหน้าแรก active มาจากตำแหน่งสกอลล์ ส่วนหน้าอื่นเทียบ route ตรง ๆ (ทุกหน้าตอนนี้เป็น route เต็ม ไม่มี anchor
  // ย่อยของหน้าอื่นแล้ว)
  // allowSiblingHash: เมนูหน้าเต็มที่ไม่ใช่ Home (About/Technical Cargo/Experience/Contact) ใช้ hash ซ้ำกับ
  // children ของ Home เพื่อเทียบตอน sidebar ย่อ (children ถูกซ่อน เมนูหน้าเต็มเลยต้องไฮไลต์แทน) — แต่ตอนกาง
  // sidebar children ไฮไลต์เองอยู่แล้ว ถ้าให้เมนูหน้าเต็มไฮไลต์ตามด้วยจะกลายเป็นไฮไลต์ซ้อนกันสองอันพร้อมกัน
  // (เช่น Skills + Technical Cargo) เลยปิดการเทียบ hash ของเมนูหน้าเต็มไว้เฉพาะตอนกาง sidebar
  const isActive = (item: NavLeaf, allowSiblingHash = true) => {
    if (isHome) return Boolean(item.hash) && allowSiblingHash && activeId === item.hash!.slice(1);
    // ลิงก์ที่มี "#" (children ของ Home) เป็นแค่จุดยึดในหน้าแรก ปล่อยให้เมนูของหน้านั้นไฮไลต์แทน
    if (item.href.includes("#")) return false;
    // เช็คทั้ง "/" (อังกฤษ) และ "/th" (ไทย) — ถ้าเช็คแค่ "/" หน้า /th/... ทุกหน้าจะ startsWith("/th/") จริง
    // ทำให้ Home ไฮไลต์ค้างซ้อนกับเมนูหน้าปัจจุบันทุกหน้าในโซนภาษาไทย
    if (item.href === "/" || item.href === "/th") return false;
    // หน้าย่อยของ route ต้องไฮไลต์เมนูแม่ด้วย เช่น /work/[slug] → Experience
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <>
      {/* แถบบนมือถือ/แท็บเล็ต — แคปซูลลอย แสดงเฉพาะต่ำกว่า lg เพราะ desktop ใช้ sidebar ถาวรแทน */}
      <header className="fixed inset-x-0 top-0 z-50 pt-3 lg:hidden">
        <Container>
          <div className="flex items-center justify-between gap-5 rounded-full border border-white/15 bg-ink/45 py-2 pl-4 pr-2 text-paper shadow-[0_2px_16px_rgb(0_0_0/0.2)] backdrop-blur-xl">
            <Brand name={name} compact className="shrink-0" />
            <div className="flex items-center gap-2">
              <LanguageSwitcher isThai={isThai} compact onNavigate={requestLanguage} />
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-label={isThai ? "เปิดเมนู" : "Open menu"}
                className="grid size-9 place-items-center rounded-full bg-white/15 text-paper transition hover:bg-white/25"
              >
                <Menu className="size-4" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* เมนูมือถือแบบเต็มจอ */}
      <div
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={cn(
          "fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-ink text-paper transition-all duration-300 ease-out lg:hidden",
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0",
        )}
      >
        <img
          src="/Background_nav.webp"
          alt=""
          loading="lazy"
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 z-0 h-auto w-[48vw] max-w-[420px] object-contain object-bottom opacity-55"
        />
        <Container className="relative z-10 flex items-center justify-between py-5">
          <Brand name={name} href={isThai ? "/th" : "/"} onClick={() => setMenuOpen(false)} />
          <div className="flex items-center gap-2">
            <LanguageSwitcher isThai={isThai} onNavigate={requestLanguage} />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label={isThai ? "ปิดเมนู" : "Close menu"}
              className="grid size-10 place-items-center rounded-full border border-white/20"
            >
              <X className="size-4" />
            </button>
          </div>
        </Container>
        <Container className="relative z-10 flex flex-1 flex-col justify-center gap-5 py-8">
          {navItems.map((item) => (
            <div key={item.label}>
              <MobileLink item={item} onNavigate={() => setMenuOpen(false)} />
              {item.children && (
                <div className="mt-4 ml-6 flex flex-col gap-4 border-l border-white/15 pl-6">
                  {item.children.map((child) => (
                    <MobileLink
                      key={child.label}
                      item={child}
                      onNavigate={() => setMenuOpen(false)}
                      small
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </Container>
      </div>

      {/* Sidebar ถาวรฝั่งซ้าย — desktop เท่านั้น ชิดขอบเต็มความสูง */}
      <aside
        data-app-sidebar
        className="fixed inset-y-0 left-0 z-40 hidden w-[var(--sidebar-w)] overflow-y-auto border-r border-white/10 bg-ink text-paper transition-[width] duration-300 ease-out lg:block"
      >
        {/* พื้นหลังลายไฟสัญญาณรถไฟ — ยึดชิดล่างสุดให้อยู่ในส่วนโล่งใต้เมนู ไม่ทับตัวลิงก์ด้านบน */}
        <img
          src="/Background_nav.webp"
          alt=""
          loading="lazy"
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-auto w-full object-cover object-bottom opacity-60"
        />
        <nav className="relative flex min-h-full flex-col p-3">
          <div
            className={cn("flex items-center gap-2", collapsed ? "flex-col" : "justify-between pl-2")}
          >
            {!collapsed && (
              <Brand name={name} href={isThai ? "/th" : "/"} className="min-w-0 py-1" />
            )}

            <div className={cn("flex items-center gap-1.5", collapsed && "flex-col")}>
              <button
                type="button"
                onClick={toggleCollapsed}
                aria-expanded={!collapsed}
                aria-label={collapsed ? (isThai ? "ขยายเมนู" : "Expand menu") : (isThai ? "ย่อเมนู" : "Collapse menu")}
                className="grid size-8 shrink-0 place-items-center rounded-full border border-rust/50 text-rust transition hover:border-rust hover:bg-rust/10"
              >
                {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
              </button>
            </div>
          </div>

          <span aria-hidden="true" className="my-4 h-px shrink-0 bg-white/12" />

          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              // กางได้ทุกหน้า — ลิงก์ลูกเป็น "/#about" ฯลฯ ซึ่งพาไปหน้าแรกแล้วเลื่อนไปจุดนั้นได้แม้กดจากหน้าอื่น
              const hasChildren = Boolean(item.children);
              const groupOpen = hasChildren && !collapsed && openGroups.includes(item.label);

              return (
                <li key={item.label}>
                  <div className="flex items-center gap-1">
                    <SidebarLink
                      item={item}
                      active={isActive(item, hasChildren || collapsed)}
                      collapsed={collapsed}
                      className="flex-1"
                    />
                    {hasChildren && !collapsed && (
                      <button
                        type="button"
                        onClick={() => toggleGroup(item.label)}
                        aria-expanded={groupOpen}
                        aria-label={
                          isThai
                            ? groupOpen
                              ? `ย่อเมนู ${item.label}`
                              : `ขยายเมนู ${item.label}`
                            : groupOpen
                              ? `Collapse ${item.label} menu`
                              : `Expand ${item.label} menu`
                        }
                        className="grid size-7 shrink-0 place-items-center rounded-lg text-paper/50 transition hover:bg-white/10 hover:text-paper"
                      >
                        <ChevronDown
                          className={cn("size-4 transition-transform", groupOpen && "rotate-180")}
                        />
                      </button>
                    )}
                  </div>

                  {groupOpen && item.children && (
                    <ul className="mt-1 ml-5 flex flex-col gap-1 border-l border-white/15 pl-2">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <SidebarChildLink item={child} active={isActive(child)} />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <span aria-hidden="true" className="my-4 h-px shrink-0 bg-white/12" />

          {collapsed ? (
            <div className="flex justify-center">
              <LanguageSwitcher isThai={isThai} compact onNavigate={requestLanguage} />
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-xl px-3 py-2 text-paper/70">
              <Languages className="size-4.5 shrink-0" aria-hidden="true" />
              <span className="flex-1 truncate font-mono text-[11px] uppercase tracking-[0.12em]">
                {isThai ? "ภาษา" : "Language"}
              </span>
              <LanguageSwitch isThai={isThai} onNavigate={requestLanguage} />
            </div>
          )}
        </nav>
      </aside>

      <LanguageConfirmDialog
        open={pendingLangHref !== null}
        isThai={isThai}
        onConfirm={confirmLanguage}
        onClose={cancelLanguage}
      />
    </>
  );
}

function SidebarLink({
  item,
  active,
  collapsed,
  className,
}: {
  item: NavLeaf;
  active: boolean;
  collapsed: boolean;
  className?: string;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      title={collapsed ? item.label : undefined}
      className={cn(
        "flex items-center gap-3 rounded-xl py-2.5 transition-colors",
        collapsed ? "justify-center px-0" : "px-3",
        active
          ? "bg-paper text-ink shadow-[0_2px_12px_rgb(0_0_0/0.28)]"
          : "text-paper/70 hover:bg-paper hover:text-ink",
        className,
      )}
    >
      <Icon className="size-4.5 shrink-0" aria-hidden="true" />
      {!collapsed && (
        <span className="truncate font-mono text-[11px] uppercase tracking-[0.12em]">
          {item.label}
        </span>
      )}
    </Link>
  );
}

/** ลิงก์ใต้ Home — ใช้ชุดไอคอนธีมรถไฟที่ตั้งใจให้ต่างจากเมนูหลัก label เดียวกัน (ดูคอมเมนต์ใน lib/nav.ts) */
function SidebarChildLink({ item, active }: { item: NavLeaf; active: boolean }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2 transition-colors",
        active
          ? "bg-paper text-ink shadow-[0_2px_12px_rgb(0_0_0/0.28)]"
          : "text-paper/70 hover:bg-paper hover:text-ink",
      )}
    >
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      <span className="truncate font-mono text-[11px] uppercase tracking-[0.12em]">
        {item.label}
      </span>
    </Link>
  );
}

function MobileLink({
  item,
  onNavigate,
  small = false,
}: {
  item: NavLeaf;
  onNavigate: () => void;
  small?: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-4 font-display uppercase leading-none tracking-tight",
        small ? "text-2xl text-paper/80" : "text-4xl",
      )}
    >
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-full border border-white/20",
          small ? "size-9" : "size-11",
        )}
      >
        <Icon className={small ? "size-4" : "size-5"} aria-hidden="true" />
      </span>
      {item.label}
    </Link>
  );
}

/** onClick ของปุ่มสลับภาษาทุกตัว — เรียก onNavigate (ยกมาจาก Sidebar) เพื่อเปิด LanguageConfirmDialog แทนการ
 * push ทันที ปุ่มที่กดซ้ำภาษาที่ใช้อยู่แล้วปล่อยให้ <Link> ทำงานปกติ (ไม่มีอะไรให้ยืนยัน) */
type NavigateRequest = (href: string, targetIsThai: boolean) => (e: React.MouseEvent<HTMLAnchorElement>) => void;

/** สวิตช์สลับภาษาแบบมีแถบเลื่อนวิ่งไปตามฝั่งที่เลือก — ใช้ในไซด์บาร์เดสก์ท็อปตอนกางเท่านั้น (ตอนย่อใช้ LanguageSwitcher compact แทนเพราะที่ไม่พอ) */
function LanguageSwitch({ isThai, onNavigate }: { isThai: boolean; onNavigate: NavigateRequest }) {
  return (
    <div
      role="group"
      aria-label={isThai ? "เลือกภาษา" : "Choose language"}
      className="relative flex w-fit items-center rounded-full border border-white/20 bg-white/10 p-1 font-mono text-[10px] font-bold tracking-[0.08em]"
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-1 left-1 w-11 rounded-full bg-rust transition-transform duration-300 ease-out",
          isThai && "translate-x-11",
        )}
      />
      <Link
        href="/"
        hrefLang="en"
        lang="en"
        aria-current={!isThai ? "page" : undefined}
        onClick={onNavigate("/", false)}
        className={cn(
          "relative z-10 w-11 rounded-full py-2.5 text-center transition-colors",
          !isThai ? "text-white" : "text-paper/60 hover:text-paper",
        )}
      >
        EN
      </Link>
      <Link
        href="/th"
        hrefLang="th"
        lang="th"
        aria-current={isThai ? "page" : undefined}
        onClick={onNavigate("/th", true)}
        className={cn(
          "relative z-10 w-11 rounded-full py-2.5 text-center transition-colors",
          isThai ? "text-white" : "text-paper/60 hover:text-paper",
        )}
      >
        TH
      </Link>
    </div>
  );
}

function LanguageSwitcher({
  isThai,
  compact = false,
  onNavigate,
}: {
  isThai: boolean;
  compact?: boolean;
  onNavigate: NavigateRequest;
}) {
  if (compact) {
    return (
      <Link
        href={isThai ? "/" : "/th"}
        hrefLang={isThai ? "en" : "th"}
        lang={isThai ? "en" : "th"}
        aria-label={isThai ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย"}
        onClick={onNavigate(isThai ? "/" : "/th", !isThai)}
        className="grid h-7 min-w-8 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/5 px-1.5 font-mono text-[9px] font-bold tracking-[0.1em] text-paper/70 transition hover:border-rust/70 hover:bg-rust/15 hover:text-rust"
      >
        {isThai ? "EN" : "TH"}
      </Link>
    );
  }

  return (
    <div
      role="group"
      aria-label={isThai ? "เลือกภาษา" : "Choose language"}
      className="flex w-fit items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1 font-mono text-[10px] font-bold tracking-[0.08em]"
    >
      <Link
        href="/"
        hrefLang="en"
        lang="en"
        aria-current={!isThai ? "page" : undefined}
        onClick={onNavigate("/", false)}
        className={cn(
          "rounded-full px-2.5 py-1.5 transition",
          !isThai ? "bg-rust text-white" : "text-paper/60 hover:text-paper",
        )}
      >
        EN
      </Link>
      <Link
        href="/th"
        hrefLang="th"
        lang="th"
        aria-current={isThai ? "page" : undefined}
        onClick={onNavigate("/th", true)}
        className={cn(
          "rounded-full px-2.5 py-1.5 transition",
          isThai ? "bg-rust text-white" : "text-paper/60 hover:text-paper",
        )}
      >
        TH
      </Link>
    </div>
  );
}
