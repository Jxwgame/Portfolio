"use client";

import { useEffect, useRef } from "react";
import { TriangleAlert } from "lucide-react";

/** popup ยืนยันก่อนสลับภาษา EN/TH — ใช้ <dialog> ของ browser เอง (ได้ focus trap, ESC ปิด, ::backdrop ฟรี)
 * ไม่พึ่ง library เพิ่ม ใช้ Tailwind ล้วนตามที่โปรเจกต์นี้ทำอยู่แล้ว (ไม่มี headless-ui/radix ใน package.json) */
export function LanguageConfirmDialog({
  open,
  isThai,
  onConfirm,
  onClose,
}: {
  open: boolean;
  /** ภาษาปัจจุบันของหน้า (ไม่ใช่ภาษาปลายทาง) — ใช้ตัดสินว่าจะโชว์ข้อความ dialog เป็นภาษาไหน */
  isThai: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const title = isThai ? "เปลี่ยนภาษา" : "Switch language";
  const message = isThai ? "ต้องการเปลี่ยนเป็นภาษาอังกฤษหรือไม่?" : "Switch to Thai?";
  const cancelLabel = isThai ? "ยกเลิก" : "Cancel";
  const confirmLabel = isThai ? "เปลี่ยนภาษา" : "Switch";
  // เตือนเฉพาะขาอังกฤษ -> ไทย เพราะตอนนี้แปลเป็นไทยแล้วแค่หน้าแรก หน้าย่อยอื่น (About/Skills/Work/Contact/Help)
  // ใน TH_NAV_ITEMS (lib/nav.ts) ยังลิงก์ไปหน้าอังกฤษเดิม ไม่ใช่เนื้อหาไทยจริง — ขาไทย -> อังกฤษไม่ต้องเตือนเพราะอังกฤษครบทุกหน้าอยู่แล้ว
  const note = !isThai
    ? "หมายเหตุ: การแปลภาษาไทยจะเน้นเฉพาะเนื้อหาสำคัญและรายละเอียดผลงานเท่านั้น ส่วนอื่นอาจยังเป็นภาษาอังกฤษ"
    : null;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={onClose}
      onClick={(e) => {
        // คลิกบน backdrop (พื้นที่ padding ของ <dialog> เอง ไม่ใช่การ์ดเนื้อหาข้างใน) ให้ปิดเหมือนกดยกเลิก
        if (e.target === ref.current) onClose();
      }}
      className="m-auto w-[min(30rem,calc(100vw-2rem))] rounded-2xl border border-white/15 bg-ink p-6 text-paper shadow-[0_20px_60px_rgb(0_0_0/0.5)] backdrop:bg-ink/70 backdrop:backdrop-blur-sm"
    >
      <h2 className="font-heading text-base font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-paper/70">{message}</p>
      {note && (
        <p className="mt-4 flex items-start gap-2 rounded-lg border border-rust/40 bg-rust/10 px-3 py-2.5 text-xs leading-relaxed text-rust">
          <TriangleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          {note}
        </p>
      )}
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/20 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-paper/70 transition hover:border-white/40 hover:text-paper"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-full bg-rust px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-rust-deep"
        >
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
