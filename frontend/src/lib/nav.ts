import {
  Boxes,
  Briefcase,
  Container,
  HelpCircle,
  IdCard,
  Mail,
  Route,
  TrainFront,
  type LucideIcon,
  User,
} from "lucide-react";

export type NavLeaf = {
  label: string;
  href: string;
  /** จุดยึด section บนหน้าแรก — ใช้ทำ scroll-spy */
  hash?: string;
  icon: LucideIcon;
};

export type NavNode = NavLeaf & { children?: NavLeaf[] };

/**
 * เมนูหลักคือหน้าเต็มทั้ง 6 ตัว ส่วน children ของ Home คือ section เดียวกันแต่เข้าจากหน้าแรก
 * label ของ children ตั้งใจให้ต่างจากเมนูหลัก (About/Technical Cargo/Experience/Contact) ทั้ง label และไอคอน
 * เดิมใช้ label ซ้ำกัน ทำให้ตอน sidebar กาง Home ออกมาเห็นสอง "About", สอง "Contact" ติดกันดูเหมือน link ผิด
 * เลยเปลี่ยน label ของ children ให้ตรงกับ railLabel ที่ section นั้นโชว์บนหน้าจริงแทน (Overview/Skills/Work/Say Hello)
 */
export const NAV_ITEMS: NavNode[] = [
  {
    label: "Home",
    href: "/",
    hash: "#home",
    icon: TrainFront,
    children: [
      // บัตรผู้โดยสาร — คนละไอคอนกับ About หน้าเต็ม (User)
      { label: "Overview", href: "/#about", hash: "#about", icon: IdCard },
      // ลังสินค้าในโบกี้ — คนละไอคอนกับ Technical Cargo หน้าเต็ม (Container)
      { label: "Skills", href: "/#skills", hash: "#skills", icon: Boxes },
      // เส้นทางที่ผ่านมา — คนละไอคอนกับ Experience หน้าเต็ม (Briefcase)
      { label: "Work", href: "/#work", hash: "#work", icon: Route },
    ],
  },
  // hash ที่ใส่ไว้ที่นี่ (ตรงกับ children ของ Home) ไม่ได้ใช้ตอนคลิก — ใช้เทียบกับ activeId จาก scroll-spy
  // เท่านั้น กันบั๊กที่เมนูหน้าเต็มไม่เคยไฮไลต์เลยตอนอยู่หน้าแรก (สำคัญมากตอน sidebar ย่อเหลือแต่ไอคอน
  // เพราะ children ถูกซ่อน เมนูหน้าเต็มจึงเป็นตัวเดียวที่บอกได้ว่ากำลังอยู่ section ไหน)
  { label: "About", href: "/about", hash: "#about", icon: User },
  // มีหน้าของตัวเองแยกจาก About แล้ว (ไม่ใช่ anchor ในหน้าอื่นอีกต่อไป) — ยังเก็บ hash ไว้เพื่อให้เมนูนี้
  // ไฮไลต์แทน children ของ Home ตอน sidebar ย่อได้เหมือนเมนูอื่น (ดูคอมเมนต์ isActive ใน Sidebar.tsx)
  { label: "Technical Cargo", href: "/skills", hash: "#skills", icon: Container },
  { label: "Experience", href: "/work", hash: "#work", icon: Briefcase },
  { label: "Contact", href: "/contact", hash: "#contact", icon: Mail },
  { label: "Help", href: "/help", icon: HelpCircle },
];

/** หน้ารองที่มี route ภาษาไทยจริงแล้ว (ตรงข้ามกับหน้าที่ TH_NAV_ITEMS ยังชี้ไป href อังกฤษเดิม) —
 * Footer.tsx ก็ใช้ตัวนี้ด้วยเพื่อสลับ href ของลิงก์ท้ายหน้าให้ตรงกัน */
export const TH_HREF_OVERRIDES: Record<string, string> = {
  "/": "/th",
  "/about": "/th/about",
  "/skills": "/th/skills",
  "/work": "/th/work",
  "/contact": "/th/contact",
  "/help": "/th/help",
};

/** ระยะแรกของหน้าไทย: แปลเมนูของหน้าแรกก่อน ส่วนหน้ารองยังชี้ไปหน้าอังกฤษเดิม (ยกเว้นหน้าที่อยู่ใน TH_HREF_OVERRIDES) */
export const TH_NAV_ITEMS: NavNode[] = NAV_ITEMS.map((item) => {
  const childLabels: Record<string, string> = {
    Overview: "ภาพรวม",
    Skills: "ทักษะ",
    Work: "ผลงาน",
  };

  const itemLabels: Record<string, string> = {
    Home: "หน้าแรก",
    About: "เกี่ยวกับผม",
    "Technical Cargo": "Technical Cargo",
    Experience: "ประสบการณ์",
    Contact: "ติดต่อ",
    Help: "ช่วยเหลือ",
  };

  if (item.href !== "/") {
    return {
      ...item,
      label: itemLabels[item.label] ?? item.label,
      href: TH_HREF_OVERRIDES[item.href] ?? item.href,
    };
  }

  return {
    ...item,
    label: itemLabels[item.label],
    href: "/th",
    children: item.children?.map((child) => ({
      ...child,
      label: childLabels[child.label] ?? child.label,
      href: `/th${child.hash ?? ""}`,
    })),
  };
});

export const SECTION_IDS = Array.from(
  new Set(
    NAV_ITEMS.flatMap((item) => [item, ...(item.children ?? [])])
      .filter((item) => item.hash)
      .map((item) => item.hash!.slice(1)),
  ),
);

/** เมนูท้ายหน้า — เอาเฉพาะหน้าเต็ม ไม่เอา section ย่อยของหน้าแรก */
export const FOOTER_LINKS = NAV_ITEMS.map(({ label, href }) => ({ label, href }));
