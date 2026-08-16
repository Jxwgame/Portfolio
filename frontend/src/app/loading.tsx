/**
 * Loading UI ของ Next.js (app/loading.tsx) — ครอบ page.tsx ทุกหน้าใน route group นี้ด้วย Suspense อัตโนมัติ
 * เห็นชัดที่สุดตอนสลับภาษา (/ ↔ /th) เพราะ page.tsx ทั้งสองฝั่ง fetch ข้อมูลใหม่ทุกครั้ง
 * ใช้ไฟล์ public/effects/Loader.svg ที่เตรียมไว้ — เป็น SVG แอนิเมชันสำเร็จรูป (SMIL animate ในตัว) เลยฝัง
 * ด้วย <img> ธรรมดาแทน next/image เพื่อให้แอนิเมชันเล่นได้ ไม่ผ่านการ optimize ที่ next/image ทำกับ raster image
 */
export default function Loading() {
  return (
    <div className="theme-dark fixed inset-0 z-[100] grid place-items-center">
      <img src="/effects/Loader.svg" alt="" width={220} height={220} className="block" />
    </div>
  );
}
