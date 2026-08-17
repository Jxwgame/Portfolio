import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * ทุก directive ต้องเขียนแยกให้ครบ ห้ามปล่อยให้ตกไปใช้ default-src
 * เพราะ default-src 'self' เฉยๆ จะบล็อก inline script ที่ Next ใช้ hydrate หน้า (หน้าตาย)
 * รวมถึง inline style ของ Tailwind และรูป data: URI (ลายน้อยส์ใน effects)
 *
 * script-src ยังต้องมี 'unsafe-inline' อยู่ เพราะ bootstrap script ของ Next เป็น inline
 * ถ้าจะตัดออกต้องทำ nonce ผ่าน middleware แล้วส่งเข้า CSP ทุก request
 * ส่วน 'unsafe-eval' กับ ws: เปิดเฉพาะตอน dev ให้ HMR ทำงาน — production ไม่มี
 */
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

/** ตัวที่สำคัญสุดกับไฟล์ static คือ nosniff เพราะกัน browser เดา Content-Type เองแล้วรันไฟล์ผิดประเภท */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Content-Security-Policy", value: CSP },
];

const nextConfig: NextConfig = {
  // ปุ่ม dev tools indicator ของ Next.js ค่าเริ่มต้นอยู่ bottom-left ทับลายไฟสัญญาณรถไฟท้าย sidebar (ดู Sidebar.tsx)
  // ย้ายไป top-right เพราะมุมอื่นชนของเดิม: bottom-right มีปุ่มเปิด/ปิดฝน, top-left มีปุ่มย่อ/ขยายเมนู
  devIndicators: {
    position: "top-right",
  },

  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      {
        // เอกสาร CV/Resume/Portfolio — บังคับให้โหลดเป็นไฟล์แนบเสมอ ไม่ให้ browser เปิด inline
        // เพราะ PDF viewer รัน JavaScript ที่ฝังในไฟล์ได้ และกัน MIME confusion ตอนเข้า URL ตรงๆ
        source: "/docs/:path*",
        headers: [
          { key: "Content-Type", value: "application/pdf" },
          { key: "Content-Disposition", value: "attachment" },
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      },
      {
        /**
         * รูป static ทั้งหมดใน public/ — ค่า default ของ Next คือ "public, max-age=0" (เอกสาร public-folder
         * บอกว่าแคชยาวให้ไม่ได้เพราะไฟล์อาจถูกแก้) ผลคือ browser ต้อง revalidate ทุกครั้งที่เปลี่ยนหน้า
         * รูปพื้นหลังหนัก ๆ จึงถูกยิงซ้ำทุก navigation และโหลดใหม่เต็มก้อนทุกครั้งที่ cache หลุด
         *
         * เราแคชยาวแบบ immutable ได้เพราะรูปในนี้เป็น asset ตายตัวของดีไซน์ ไม่ได้ generate ใหม่ตอน build
         * ⚠️ ข้อแลกเปลี่ยน: แก้รูปแล้วต้อง "เปลี่ยนชื่อไฟล์" ด้วย (เช่น _v2) ไม่งั้นคนที่เคยเข้าจะเห็นรูปเก่าค้าง
         * ไม่ครอบ /_next/image (ไม่มีนามสกุลใน path) จึงไม่ทับ cache ของ image optimizer
         */
        source: "/:path*.(png|jpg|jpeg|webp|avif|gif|svg|ico)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
