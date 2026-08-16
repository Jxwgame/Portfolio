/** เกรนทับทั้งหน้า — ตกแต่งล้วน จึงไม่รับ pointer event และซ่อนจาก screen reader */
export function GrainOverlay() {
  return <div className="grain" aria-hidden="true" />;
}
