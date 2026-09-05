"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import { Eyebrow } from "@/components/common/Eyebrow";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";
import type { SiteUpdate } from "@/lib/types";

export type SiteUpdateCopy = {
  eyebrow: string;
  heading: string;
  description: string;
  /** ป้ายชนิดของการอัปเดต — คีย์ตรงกับคอลัมน์ kind ในตาราง site_updates */
  kinds: Record<string, string>;
  empty: string;
  /** ชื่อเดือนแบบย่อ 12 ตัว เรียงจากมกราคม ใช้จัดรูปแบบ released_at ('YYYY-MM-DD') */
  months: readonly string[];
  /** ป้ายตัวกรอง "ทุกชนิด" */
  all: string;
  /** บรรทัดสรุปเหนือรายการ — {count} = จำนวนทั้งหมด, {date} = วันที่ของอัปเดตล่าสุด */
  summary: string;
  /** ปุ่มขยาย/ย่อรายการ — {count} = จำนวนที่ยังซ่อนอยู่ */
  showMore: string;
  showLess: string;
  /** ข้อความตอนกรองแล้วไม่เหลือรายการ */
  emptyFiltered: string;
};

/** จำนวนรายการที่โชว์ก่อนกดขยาย — คุมความสูงหน้าไม่ให้ยาวขึ้นเรื่อย ๆ ตามจำนวนอัปเดตที่สะสม */
const INITIAL_VISIBLE = 5;

/** สีป้ายตามชนิดการอัปเดต — พื้นทึบ+ตัวหนังสือขาว ให้แยกชนิดออกจากกันชัดตั้งแต่แวบแรก
 * (ตัวทดลองก่อนหน้าใช้พื้นจางสีเดียวกันหมด อ่านออกยากบนพื้นสว่างของหน้านี้)
 * ชนิดที่ไม่รู้จักใช้โทนกลางของธีมไปก่อน ไม่ทำให้หน้าพัง */
const KIND_STYLES: Record<string, string> = {
  feature: "border-rust bg-rust text-white",
  improvement: "border-[#3d6b99] bg-[#3d6b99] text-white",
  fix: "border-ink bg-ink text-paper",
  content: "border-rust-deep bg-rust-deep text-white",
};

/** "YYYY-MM-DD" เป็น "16 Aug 2026" — จัดรูปแบบเองแทน Intl เพื่อให้ server กับ browser ได้ผลตรงกันเสมอ
 * และคุมชื่อเดือนภาษาไทยได้เอง (ใช้ปี ค.ศ. เหมือนวันที่อื่นทั้งเว็บ) */
function formatReleaseDate(raw: string, months: readonly string[]) {
  const [year, month, day] = raw.split("-");
  const name = months[Number(month) - 1];
  if (!year || !name || !day) return raw;
  return `${Number(day)} ${name} ${year}`;
}

/** แทนที่ {key} ในข้อความ copy ด้วยค่าจริง — ไทยกับอังกฤษเรียงคำต่างกัน จึงใส่ตัวเลข/วันที่ผ่าน template */
function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key) => String(values[key] ?? match));
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition",
        active
          ? "border-rust bg-rust text-white"
          : "border-line text-muted hover:border-rust hover:text-rust",
      )}
    >
      {children}
    </button>
  );
}

/**
 * บันทึกการอัปเดตเว็บจากตาราง site_updates — เรียงใหม่สุดอยู่บน
 * ทุกครั้งที่เว็บมีการอัปเดต ให้เพิ่มแถวใหม่ผ่าน migration (ดู backend/migrations/0016_help_content.sql)
 * แล้วรายการจะขึ้นตรงนี้เองทั้งภาษาอังกฤษและไทย
 *
 * เลย์เอาต์คุมความยาวหน้าไว้ตั้งแต่แรก เพราะรายการมีแต่จะสะสมเพิ่มทุกครั้งที่ deploy:
 * โชว์ 5 รายการล่าสุด ที่เหลือซ่อนหลังปุ่มขยาย + กรองตามชนิดได้ และคั่นด้วยเลขปีเมื่อข้ามปี
 * แต่ละแถวเป็น 2 คอลัมน์ (วันที่/ชนิด | หัวข้อ+คำอธิบาย) ให้กวาดตาอ่านตามแนวตั้งได้เร็ว
 *
 * จงใจไม่ส่ง index ให้ <Section> — หน้านี้ไม่เอารางรถไฟ/ป้ายสถานีเหมือนหน้าอื่น
 */
export function SiteUpdateLog({ updates, copy }: { updates: SiteUpdate[]; copy: SiteUpdateCopy }) {
  const [kind, setKind] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  // ชนิดที่มีอยู่จริงในข้อมูล เรียงตามลำดับที่เจอ — ไม่โชว์ตัวกรองของชนิดที่ยังไม่เคยใช้
  const kindsPresent = useMemo(() => [...new Set(updates.map((u) => u.kind))], [updates]);

  // เปลี่ยนตัวกรองแล้วย่อกลับเสมอ ไม่งั้นพอสลับไปชนิดที่มีรายการเยอะ หน้าจะยาวขึ้นทันทีโดยไม่ได้สั่ง
  const selectKind = (next: string | null) => {
    setKind(next);
    setExpanded(false);
  };

  const filtered = kind ? updates.filter((u) => u.kind === kind) : updates;
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hiddenCount = filtered.length - visible.length;
  const canToggle = filtered.length > INITIAL_VISIBLE;

  return (
    <Section theme="light">
      <Container>
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-[24ch] font-heading text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.2] tracking-[0.02em]">
          {copy.heading}
        </h2>
        <p className="mt-5 max-w-[60ch] leading-[1.75] text-muted">{copy.description}</p>

        {updates.length === 0 ? (
          <p className="mt-10 leading-[1.75] text-muted">{copy.empty}</p>
        ) : (
          <div className="mt-10 max-w-[74ch]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {fill(copy.summary, {
                  count: updates.length,
                  date: formatReleaseDate(updates[0].releasedAt, copy.months),
                })}
              </p>

              {kindsPresent.length > 1 && (
                <div className="flex flex-wrap gap-2">
                  <Chip active={kind === null} onClick={() => selectKind(null)}>
                    {copy.all}
                  </Chip>
                  {kindsPresent.map((k) => (
                    <Chip key={k} active={kind === k} onClick={() => selectKind(k)}>
                      {copy.kinds[k] ?? k}
                    </Chip>
                  ))}
                </div>
              )}
            </div>

            {visible.length === 0 ? (
              <p className="py-10 leading-[1.75] text-muted">{copy.emptyFiltered}</p>
            ) : (
              <ol className="divide-y divide-line">
                {visible.map((update, i) => {
                  const year = update.releasedAt.slice(0, 4);
                  // คั่นปีเฉพาะตอนข้ามปี — พอรายการยาวขึ้นจะได้รู้ว่ากำลังอ่านช่วงไหนอยู่
                  const showYear = i === 0 || visible[i - 1].releasedAt.slice(0, 4) !== year;

                  return (
                    <li
                      key={`${update.releasedAt}-${update.version || update.title}`}
                      className="py-6 first:pt-7"
                    >
                      {showYear && (
                        <p className="mb-4 font-display text-2xl leading-none text-rust-deep">
                          {year}
                        </p>
                      )}

                      <div className="grid gap-x-6 gap-y-2 sm:grid-cols-[9.5rem_1fr]">
                        <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-start sm:pt-0.5">
                          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                            {formatReleaseDate(update.releasedAt, copy.months)}
                          </span>
                          <span
                            className={cn(
                              "rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]",
                              KIND_STYLES[update.kind] ?? "border-line text-muted",
                            )}
                          >
                            {copy.kinds[update.kind] ?? update.kind}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-heading text-[1.02rem] leading-[1.5] tracking-[0.02em]">
                            {update.title}
                            {update.version && (
                              <span className="ml-2.5 font-mono text-[10px] tracking-[0.1em] text-muted">
                                {update.version}
                              </span>
                            )}
                          </h3>
                          {update.body && (
                            <p className="mt-1.5 leading-[1.7] text-muted">{update.body}</p>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}

            {canToggle && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="group mt-6 inline-flex items-center gap-2.5 rounded-full border border-line px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] transition hover:border-rust hover:text-rust"
              >
                {expanded ? copy.showLess : fill(copy.showMore, { count: hiddenCount })}
                <ChevronDown
                  className={cn("size-3.5 transition", expanded && "rotate-180")}
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
}
