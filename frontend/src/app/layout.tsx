import type { Metadata } from "next";
import { Anton, Doto, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { RainOverlay } from "@/components/layout/RainOverlay";
import { Sidebar } from "@/components/layout/Sidebar";
import { getHome } from "@/lib/api";

// Anton มีน้ำหนักเดียว จึงต้องระบุ weight ตรง ๆ (ไม่ใช่ variable font)
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const doto = Doto({ variable: "--font-doto", subsets: ["latin"], weight: "variable" });
// Arimo — ฟอนต์อังกฤษที่ผู้ใช้เตรียมไว้ใน public/font แทน Space Grotesk/JetBrains Mono เดิม
const arimo = localFont({
  variable: "--font-arimo",
  src: [
    { path: "../../public/font/Arimo/Arimo-VariableFont_wght.ttf", weight: "100 900", style: "normal" },
    { path: "../../public/font/Arimo/Arimo-Italic-VariableFont_wght.ttf", weight: "100 900", style: "italic" },
  ],
});
// Noto Sans Thai — ฟอนต์ไทยที่ผู้ใช้เตรียมไว้ใน public/font แทน IBM Plex Sans Thai เดิม
const notoThai = localFont({
  variable: "--font-noto-thai",
  src: "../../public/font/Noto_Sans_Thai/NotoSansThai-VariableFont_wdth,wght.ttf",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Theerapat Sangsee — Infrastructure & DevOps",
  description: "Portfolio of Theerapat Sangsee, an IT Infrastructure graduate from KMITL, featuring platform engineering, monitoring, and cloud infrastructure projects.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Header/Footer ต้องใช้ข้อมูลชุดเดียวกับหน้าแรก — ผลถูก cache ไว้ 60 วิ จึงไม่ยิงซ้ำทุกหน้า
  const { settings, services } = await getHome();

  return (
    <html
      lang="en"
      className={`${anton.variable} ${arimo.variable} ${inter.variable} ${notoThai.variable} ${doto.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <GrainOverlay />
        <RainOverlay />
        <Sidebar name={settings["site.name"] ?? "Your Name"} />
        {/* --sidebar-w กันเนื้อหาไม่ให้ถูก sidebar ถาวรทับ — เป็น 0 บนมือถือ/แท็บเล็ตที่ sidebar ซ่อนอยู่ */}
        <div className="flex flex-1 flex-col pl-[var(--sidebar-w)] transition-[padding] duration-300 ease-out">
          <div className="flex-1">{children}</div>
          <Footer settings={settings} services={services} />
        </div>
      </body>
    </html>
  );
}
