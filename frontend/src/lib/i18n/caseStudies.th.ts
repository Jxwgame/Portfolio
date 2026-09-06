/**
 * คำแปลไทยสำหรับหน้ารายละเอียดโปรเจกต์ (/th/work/[slug]) — คู่กับ src/lib/projects/<slug>/index.ts ตัวอังกฤษ
 * เก็บเฉพาะ field ที่เป็นข้อความ (ไม่พก path รูป/gradient ซ้ำ) แล้วผสานกลับเข้ากับ caseStudy ต้นฉบับผ่าน mergeArray/localizeCaseStudyForThai
 * เพิ่มโปรเจกต์ใหม่ที่ต้องแปล: เติม entry ใน TH_LAYOUT{1,2,3,4}_STUDIES ตาม layout ของโปรเจกต์นั้น โครงสร้าง array ต้องเรียงลำดับตรงกับต้นฉบับ (ผสานตาม index)
 */
import type {
  CaseStudy,
  CaseStudyLayout1,
  CaseStudyLayout2,
  CaseStudyLayout3,
  CaseStudyLayout4,
} from "@/lib/case-studies";
import type { CaseStudyChallenge, CaseStudyPhase, CaseStudyShot } from "@/lib/case-studies/layout-1";
import type {
  CaseStudyArchitectureImage,
  CaseStudyArchitectureStage,
  CaseStudyConceptFeature,
  CaseStudyConceptPanel,
  CaseStudyDiagramShot,
  CaseStudyFeature,
  CaseStudyTakeaway,
} from "@/lib/case-studies/layout-2";
import type { CaseStudyShot3 } from "@/lib/case-studies/layout-3";
import type {
  CaseStudyDeviceShot,
  CaseStudyModule,
  CaseStudyScreen,
  CaseStudyWorkflowStage,
} from "@/lib/case-studies/layout-4";

/** ผสาน array ต้นฉบับกับ array คำแปล (partial) ตำแหน่งต่อตำแหน่ง — ไม่ระบุ index ไหนไว้ก็ใช้ค่าต้นฉบับ (อังกฤษ) ต่อไป */
function mergeArray<T>(original: T[], overrides?: Partial<T>[]): T[] {
  if (!overrides) return original;
  return original.map((item, i) => (overrides[i] ? { ...item, ...overrides[i] } : item));
}

// ---------- Layout 1: khungame-restaurant ----------

type ThLayout1 = Partial<Pick<CaseStudyLayout1, "eyebrow" | "summary" | "description" | "projectType">> & {
  tags?: string[];
  highlights?: string[];
  impact?: string[];
  shots?: Partial<CaseStudyShot>[];
  phases?: Partial<CaseStudyPhase>[];
  architecture?: Partial<NonNullable<CaseStudyLayout1["architecture"]>[number]>[];
  challenges?: Partial<CaseStudyChallenge>[];
};

const TH_LAYOUT1_STUDIES: Record<string, ThLayout1> = {
  "khungame-restaurant": {
    eyebrow: "แพลตฟอร์มสั่งอาหาร",
    summary:
      "KitchenHome เป็นแพลตฟอร์มสั่งอาหารออนไลน์สำหรับร้านอาหาร รองรับการเรียกดูเมนูตามหมวดหมู่ การชำระเงินผ่านตะกร้าสินค้า การติดตามสถานะคำสั่งซื้อ การบันทึกที่อยู่จัดส่ง และบัตรสมาชิกสะสมแต้ม",
    tags: ["การสั่งอาหาร", "เว็บแอปพลิเคชันแบบครบวงจร"],
    description:
      "KitchenHome เป็นเว็บไซต์สั่งอาหารออนไลน์สำหรับร้านอาหาร ลูกค้าสามารถเรียกดูเมนูที่จัดหมวดหมู่ไว้ (เมนูแนะนำ ของทอด ซุป อาหารทะเล สเต๊ก ของหวาน เครื่องดื่ม) เพิ่มรายการลงตะกร้า และชำระเงิน ลูกค้าที่ลงชื่อเข้าใช้สามารถจัดการที่อยู่จัดส่งที่บันทึกไว้ ติดตามสถานะคำสั่งซื้อผ่านขั้นตอนกำลังเตรียมและกำลังจัดส่ง ดูประวัติคำสั่งซื้อที่ผ่านมา และสะสมแต้มผ่านบัตรสมาชิกเพื่อแลกรับโค้ดส่วนลด โครงการนี้เป็นงานกลุ่มในรายวิชา โดยรับผิดชอบทั้งหน้าเว็บฝั่งผู้ใช้และระบบหลังบ้านด้วย [[php]]PHP[[/php]]/[[mysql]]MySQL[[/mysql]]",
    highlights: [
      "เมนูจัดหมวดหมู่พร้อมระบบสั่งซื้อผ่านตะกร้าสินค้า",
      "ติดตามสถานะคำสั่งซื้อ (รับคำสั่งซื้อแล้ว / กำลังเตรียม / กำลังจัดส่ง)",
      "ประวัติคำสั่งซื้อที่ผ่านมา",
      "บันทึกที่อยู่จัดส่งพร้อมเพิ่ม/ลบได้",
      "บัตรสมาชิกสะสมแต้มพร้อมโค้ดส่วนลดที่แลกรับได้",
      "หน้าติดต่อร้านพร้อมเวลาทำการ เบอร์โทร/อีเมล และตำแหน่งบนแผนที่",
    ],
    impact: [
      "ลูกค้าดูเมนู สั่งอาหาร และตรวจสอบสถานะการเตรียมหรือจัดส่งได้ในขั้นตอนการสั่งซื้อเดียวกัน",
      "ที่อยู่จัดส่งที่บันทึกไว้และประวัติคำสั่งซื้อช่วยให้ลูกค้าที่กลับมาใช้บริการนำข้อมูลเดิมมาใช้และทบทวนรายการที่เคยสั่งได้สะดวกขึ้น",
      "แต้มสมาชิกและโค้ดส่วนลดที่แลกรับได้เปิดให้ลูกค้านำสิทธิประโยชน์มาใช้กับคำสั่งซื้อครั้งถัดไป",
    ],
    projectType: "งานกลุ่มในรายวิชา",
    shots: [
      { label: "โลโก้ Khungame Restaurant" },
      { label: "หน้าแรกส่วนหัว" },
      { label: "เกี่ยวกับ/เมนู/จุดเด่นการสั่งซื้อ" },
      { label: "เมนูและการสั่งซื้อ" },
      { label: "ติดต่อและตำแหน่งที่ตั้ง" },
      { label: "ที่อยู่จัดส่งที่บันทึกไว้" },
      { label: "ประวัติคำสั่งซื้อ" },
      { label: "การติดตามสถานะคำสั่งซื้อ" },
    ],
    phases: [
      {
        title: "วางแผนและออกแบบฐานข้อมูล",
        description: "วางโครงสร้างหมวดหมู่เมนู ขั้นตอนตะกร้าสินค้า และสคีมา MySQL สำหรับคำสั่งซื้อ ที่อยู่ และแต้มสมาชิก",
      },
      {
        title: "เมนูและตะกร้าสินค้า",
        description:
          "พัฒนาระบบเรียกดูเมนูตามหมวดหมู่ (เมนูแนะนำ ของทอด ซุป อาหารทะเล สเต๊ก ของหวาน เครื่องดื่ม) พร้อมระบบสั่งซื้อผ่านตะกร้าสินค้า",
      },
      {
        title: "การชำระเงินและติดตามคำสั่งซื้อ",
        description:
          "พัฒนาระบบชำระเงิน การบันทึกที่อยู่จัดส่ง และการติดตามสถานะคำสั่งซื้อผ่านขั้นตอนรับคำสั่งซื้อแล้ว / กำลังเตรียม / กำลังจัดส่ง",
      },
      {
        title: "บัญชีผู้ใช้และสมาชิก",
        description: "เพิ่มระบบประวัติคำสั่งซื้อและบัตรสมาชิกสะสมแต้มที่แลกรับโค้ดส่วนลดได้",
      },
    ],
  },
};

function localizeLayout1Th(study: CaseStudyLayout1): CaseStudyLayout1 {
  const th = TH_LAYOUT1_STUDIES[study.slug];
  if (!th) return study;
  return {
    ...study,
    eyebrow: th.eyebrow ?? study.eyebrow,
    summary: th.summary ?? study.summary,
    description: th.description ?? study.description,
    projectType: th.projectType ?? study.projectType,
    tags: th.tags ?? study.tags,
    highlights: th.highlights ?? study.highlights,
    impact: th.impact ?? study.impact,
    shots: mergeArray(study.shots, th.shots),
    phases: mergeArray(study.phases, th.phases),
    architecture: study.architecture ? mergeArray(study.architecture, th.architecture) : study.architecture,
    challenges: study.challenges ? mergeArray(study.challenges, th.challenges) : study.challenges,
  };
}

// ---------- Layout 2: internal-development-platform, grafana, cancer-patient-healthcare-systems, masseuseshop ----------

type ThConceptOverview = {
  eyebrow?: string;
  title?: string;
  description?: string;
  features?: Partial<CaseStudyConceptFeature>[];
  impact?: { title?: string; description?: string };
  secondary?: { title?: string; description?: string };
  panels?: Partial<CaseStudyConceptPanel>[];
};

type ThArchitectureDashboard = {
  architectureTitle?: string;
  architectureDescription?: string;
  architectureStages?: Partial<CaseStudyArchitectureStage>[];
  dashboardTitle?: string;
  dashboardImages?: Partial<CaseStudyArchitectureImage>[];
};

type ThLayout2 = Partial<
  Pick<CaseStudyLayout2, "eyebrow" | "summary" | "overview" | "responsibility" | "teamType" | "role">
> & {
  highlights?: string[];
  impact?: string[];
  features?: Partial<CaseStudyFeature>[];
  conceptOverview?: ThConceptOverview;
  architectureDashboard?: ThArchitectureDashboard;
  mainDiagram?: { label?: string };
  galleryTitle?: string;
  diagramShots?: Partial<CaseStudyDiagramShot>[];
  takeaways?: Partial<CaseStudyTakeaway>[];
};

const TH_LAYOUT2_STUDIES: Record<string, ThLayout2> = {
  "internal-development-platform": {
    eyebrow: "โปรเจกต์พัฒนาซอฟต์แวร์",
    summary:
      "แพลตฟอร์มสำหรับนักพัฒนาภายในองค์กรที่พัฒนาขึ้นระหว่างการฝึกงานที่บริษัท สห⁠พัฒนพิบูล จำกัด (มหาชน) ช่วยให้ทีมงานสร้างโครงสร้างเริ่มต้นของโปรเจกต์ได้เอง ปรับใช้งานได้ทั้งในสภาพแวดล้อมพัฒนา ทดสอบ และใช้งานจริง พร้อมติดตามสถานะของไปป์ไลน์และโครงสร้างพื้นฐานได้จากที่เดียว",
    teamType: "โปรเจกต์เดี่ยว",
    role: "นักศึกษาฝึกงานวิศวกรเครือข่าย",
    overview:
      "นอกเหนือจากงานหลักด้านวิศวกรรมเครือข่ายระหว่างการฝึกงานที่สห⁠พัฒนพิบูล ออกแบบและพัฒนาแพลตฟอร์มสำหรับนักพัฒนาภายในองค์กร (มีชื่อรหัสโครงการว่า BEAVWORKS) โดยแพลตฟอร์มนี้เปิดให้ทีมวิศวกรรมสร้างโปรเจกต์ใหม่จากเทมเพลตเริ่มต้น เชื่อมต่อกับ repository และปรับใช้งานได้หลายสภาพแวดล้อม พร้อมให้ผู้ดูแลระบบมองเห็นสถานะของ [[runner]]runner[[/runner]] เป้าหมายการปรับใช้งาน และการควบคุมสิทธิ์การเข้าถึงได้อย่างครบถ้วน",
    responsibility:
      "พัฒนาโครงการนี้ในลักษณะโปรเจกต์เดี่ยว โดยรับผิดชอบการออกแบบและพัฒนาส่วนหลักของระบบ ได้แก่ ระบบหลังบ้านด้วยภาษา Go สคีมาฐานข้อมูล [[postgresql]]PostgreSQL[[/postgresql]] และส่วนหน้าด้วย Next.js และ TypeScript รวมถึงระบบ[[scaffolding]]โครงสร้างเริ่มต้นของโปรเจกต์[[/scaffolding]]จากเทมเพลต การเชื่อมต่อ repository ด้วย [[ssh_deploy_key]]SSH Deploy Key[[/ssh_deploy_key]] ไปป์ไลน์การปรับใช้งานหลายสภาพแวดล้อมพร้อมขั้นตอนอนุมัติสำหรับสภาพแวดล้อมที่ต้องมีการป้องกันเป็นพิเศษ การจัดการโครงสร้างพื้นฐานและเป้าหมายการปรับใช้งาน ระบบควบคุมสิทธิ์การเข้าถึงตามบทบาท และ[[tamper_evident_audit_log]]บันทึกการตรวจสอบแบบเพิ่มข้อมูลได้อย่างเดียว[[/tamper_evident_audit_log]]",
    highlights: [
      "พัฒนาระบบสร้างโครงสร้างเริ่มต้นของโปรเจกต์แบบบริการตนเอง พร้อมเทมเพลตเริ่มต้นมากกว่า 10 แบบ (Go API, Node.js API, React SPA, Vue, Angular, Next.js, Python Django/Flask และอื่น ๆ)",
      "ออกแบบไปป์ไลน์การปรับใช้งานหลายสภาพแวดล้อม (พัฒนา/ทดสอบ/ใช้งานจริง) ประกอบด้วยขั้นตอนตรวจสอบความถูกต้อง สร้างระบบ และปรับใช้งาน พร้อมรองรับการย้อนกลับเวอร์ชัน",
      "เพิ่มขั้นตอนอนุมัติสำหรับการปรับใช้งานในสภาพแวดล้อมที่ต้องมีการป้องกันเป็นพิเศษ",
      "พัฒนาแดชบอร์ดตรวจสอบสถานะของแพลตฟอร์มในภาพรวม แสดงสถานะ runner จำนวนช่องการทำงานพร้อมกัน และการใช้งานเป้าหมายการปรับใช้งาน",
      "พัฒนาระบบควบคุมสิทธิ์การเข้าถึงตามบทบาท ได้แก่ เจ้าของ ผู้นำทีม นักพัฒนา และผู้ตรวจสอบ พร้อมระบบคำขอสิทธิ์การเข้าถึง",
      "พัฒนาระบบบันทึกการตรวจสอบที่เพิ่มข้อมูลได้เพียงอย่างเดียวและตรวจจับการแก้ไขได้ ครอบคลุมทุกการกระทำภายในแพลตฟอร์ม",
    ],
    impact: [
      "ช่วยควบคุมมาตรฐานการจัดการซอฟต์แวร์ที่พัฒนาและให้บริการภายในองค์กร",
      "ช่วยให้เจ้าหน้าที่ฝ่ายโครงสร้างพื้นฐาน IT ติดตามระบบและบริการได้รวดเร็วขึ้นเมื่อเกิดปัญหา",
      "ช่วยจัดสรรทรัพยากรพื้นที่สำหรับวางซอฟต์แวร์และเครือข่ายได้อย่างเป็นระบบ",
      "เสริมความปลอดภัยและตรวจสอบย้อนกลับได้ของทุกการปรับใช้งานด้วยระบบควบคุมสิทธิ์ตามบทบาทและบันทึกการตรวจสอบแบบเพิ่มข้อมูลได้อย่างเดียว",
    ],
    conceptOverview: {
      eyebrow: "ภาพรวมโปรเจกต์",
      title: "จากโครงสร้างเริ่มต้นสู่การใช้งานจริง",
      description:
        "ระบบที่พาโปรเจกต์จากคอมมิตแรกไปจนถึงการใช้งานจริงได้ด้วยตัวเอง ทุกขั้นตอนมีการตรวจสอบความถูกต้อง ทดสอบทีละสภาพแวดล้อมก่อนขึ้นใช้งานจริง และมีการเฝ้าระวังคอยดูแลตลอด",
      features: [
        { title: "ตรวจสอบก่อนเสมอ", description: "ทุกการปรับใช้งานต้องผ่านขั้นตอนตรวจสอบความถูกต้อง สร้างระบบ และปรับใช้งาน ก่อนที่จะถูกนำไปใช้จริง" },
        { title: "รองรับหลายสภาพแวดล้อม", description: "เลื่อนระดับซอฟต์แวร์รุ่นเดียวกันได้อย่างปลอดภัยข้ามสภาพแวดล้อมพัฒนา ทดสอบ และใช้งานจริง" },
        { title: "ตรวจสอบย้อนกลับได้ครบถ้วน", description: "บันทึกการตรวจสอบแบบเพิ่มข้อมูลได้อย่างเดียวจะบันทึกทุกการกระทำที่เกิดขึ้นบนแพลตฟอร์ม" },
        { title: "กำกับดูแลตั้งแต่การออกแบบ", description: "การควบคุมสิทธิ์การเข้าถึงตามบทบาทและขั้นตอนอนุมัติช่วยปกป้องสภาพแวดล้อมที่มีความสำคัญ" },
      ],
      impact: {
        title: "เหตุใดจึงสำคัญ",
        description:
          "ช่วยนำมาตรฐานตามนโยบายขององค์กรมาควบคุมและปฏิบัติได้จริงในทุกขั้นตอน แทนที่การตั้งค่าโปรเจกต์และการปรับใช้งานแบบทำมือที่ไม่เป็นระบบ ด้วยแพลตฟอร์มแบบบริการตนเองเพียงแห่งเดียว ทำให้ทีมวิศวกรรมมีเส้นทางที่ทำซ้ำได้และเป็นไปตามมาตรฐานเดียวกัน ตั้งแต่ repository เปล่าไปจนถึงระบบที่ปรับใช้งานจริงและมีการเฝ้าระวัง",
      },
      secondary: {
        title: "แพลตฟอร์มเดียว ครบทุกขั้นตอน",
        description:
          "นอกเหนือจากไปป์ไลน์การปรับใช้งานเอง แพลตฟอร์มนี้ยังเชื่อมโยงการสร้างโครงสร้างเริ่มต้น โครงสร้างพื้นฐาน และการกำกับดูแลเข้าไว้เป็นระบบเดียว ตั้งแต่การเลือกเทมเพลตเริ่มต้นไปจนถึงการติดตามสถานะการปรับใช้งานและตรวจพบปัญหาก่อนที่จะไปถึงระบบใช้งานจริง",
      },
      panels: [
        {
          title: "ตรวจสอบ สร้าง และปรับใช้งาน",
          description: "ทุกการปรับใช้งานผ่านขั้นตอนตรวจสอบความถูกต้องและสร้างระบบ ก่อนเลื่อนระดับข้ามสภาพแวดล้อมพัฒนา ทดสอบ และใช้งานจริง",
        },
        { title: "ระบบนิเวศของแพลตฟอร์ม", description: "การสร้างโครงสร้างเริ่มต้น การปรับใช้งาน และโครงสร้างพื้นฐาน ทำงานผ่านแพลตฟอร์มเดียวกันทั้งหมด" },
        { title: "การทำงานแบบครบวงจร", description: "ตั้งแต่การเลือกเทมเพลตไปจนถึงการปรับใช้งานจริงที่มีการเฝ้าระวัง ครบทุกขั้นตอนของวงจรการทำงาน" },
      ],
    },
    features: [
      {
        title: "ระบบสร้างโครงสร้างเริ่มต้นของโปรเจกต์แบบบริการตนเอง",
        description:
          "ทีมงานสามารถเลือกเทมเพลตเริ่มต้น (Go API, Node.js API, React SPA, Vue, Angular, Next.js, Python Django/Flask และอื่น ๆ) ที่ออกแบบตามมาตรฐานการพัฒนาขององค์กรเพื่อควบคุมความปลอดภัยและคุณภาพของโค้ดตั้งแต่จุดเริ่มต้น แล้วให้ระบบสร้างโปรเจกต์ใหม่โดยอัตโนมัติ พร้อมเชื่อมต่อ repository และสร้างชุดไฟล์เริ่มต้นให้ภายในไม่กี่นาที",
      },
      {
        title: "ไปป์ไลน์การปรับใช้งานหลายสภาพแวดล้อม",
        description:
          "ทุกการปรับใช้งานผ่านขั้นตอนตรวจสอบความถูกต้อง สร้างระบบ และปรับใช้งาน ครอบคลุมสภาพแวดล้อมพัฒนา ทดสอบ และใช้งานจริง พร้อมบันทึกการทำงานของแต่ละขั้นตอนอย่างครบถ้วน และสามารถ[[rollback]]ย้อนกลับเวอร์ชัน[[/rollback]]ได้ในคลิกเดียวเมื่อการปรับใช้งานล้มเหลว",
      },
      {
        title: "ภาพรวมสถานะแพลตฟอร์มในหน้าเดียว",
        description:
          "แดชบอร์ดระดับแพลตฟอร์มแสดงสถานะของ runner จำนวนช่องการทำงานพร้อมกัน และการใช้งานเป้าหมายการปรับใช้งาน ทำให้มองเห็นปัญหาคอขวด เช่น runner ที่เข้าถึงไม่ได้หรือคิวงานที่เต็ม ก่อนที่จะขัดขวางการปรับใช้งาน",
      },
      {
        title: "การกำกับดูแลที่ฝังอยู่ในระบบ",
        description:
          "การควบคุมสิทธิ์การเข้าถึงตามบทบาท (เจ้าของ ผู้นำทีม นักพัฒนา ผู้ตรวจสอบ) และบันทึกการตรวจสอบแบบเพิ่มข้อมูลได้อย่างเดียว จะบันทึกทุกการกระทำบนแพลตฟอร์ม ตั้งแต่การเปลี่ยนแปลงบัญชีผู้ใช้ไปจนถึงการอนุมัติการปรับใช้งาน เพื่อความรับผิดชอบที่ตรวจสอบย้อนกลับได้",
      },
    ],
    mainDiagram: { label: "แพลตฟอร์มพัฒนาซอฟต์แวร์ภายในองค์กร" },
    diagramShots: [
      { label: "สถาปัตยกรรมระบบ" },
      { label: "โครงสร้างการปรับใช้งานระบบ" },
      { label: "ภาพรวมโปรเจกต์" },
      { label: "ไปป์ไลน์การปรับใช้งาน" },
      { label: "แดชบอร์ดสถานะแพลตฟอร์ม" },
      { label: "เทมเพลตโปรเจกต์" },
      { label: "เป้าหมายการปรับใช้งาน" },
      { label: "รายละเอียดบันทึกการตรวจสอบ" },
    ],
    takeaways: [
      {
        title: "แพลตฟอร์มแบบบริการตนเองครบวงจร",
        description: "แทนที่การตั้งค่าโปรเจกต์และการปรับใช้งานแบบทำมือ ด้วยขั้นตอนบริการตนเอง ตั้งแต่การสร้างโครงสร้างเริ่มต้นจากเทมเพลตไปจนถึงไปป์ไลน์การปรับใช้งานแบบครบวงจร",
      },
      {
        title: "รับผิดชอบพัฒนาระบบแบบครบวงจร",
        description: "ออกแบบและพัฒนาแพลตฟอร์มทั้งระบบ ตั้งแต่ระบบหลังบ้านด้วย Go และสคีมาฐานข้อมูล PostgreSQL ไปจนถึงส่วนหน้าด้วย Next.js",
      },
      {
        title: "การกำกับดูแลที่ฝังอยู่ในระบบ",
        description:
          "รองรับทุกการปรับใช้งานและการกระทำบนแพลตฟอร์มด้วยระบบควบคุมสิทธิ์ตามบทบาท ขั้นตอนอนุมัติการปรับใช้งาน และบันทึกการตรวจสอบแบบเพิ่มข้อมูลได้อย่างเดียว เพื่อความรับผิดชอบที่ตรวจสอบได้",
      },
    ],
  },

  grafana: {
    eyebrow: "การเฝ้าระวังตัวตนและการเข้าถึงระบบ",
    summary:
      "โปรเจกต์ด้านการเฝ้าระวังระบบที่ริเริ่มและพัฒนาด้วยตนเองระหว่างการฝึกงานที่สห⁠พัฒนพิบูล โดยดึงข้อมูลตัวตนผู้ใช้จาก [[entra_id]]Microsoft Entra ID[[/entra_id]] ผ่าน [[graph_api]]Microsoft Graph API[[/graph_api]] แล้วนำมาแสดงผลแบบครบวงจรด้วย OpenSearch, Prometheus และ Grafana",
    teamType: "โปรเจกต์เดี่ยว",
    role: "นักศึกษาฝึกงานวิศวกรเครือข่าย",
    overview:
      "นอกเหนือจากงานหลักด้านวิศวกรรมเครือข่ายระหว่างการฝึกงานที่สห⁠พัฒนพิบูล ริเริ่มและพัฒนาแดชบอร์ดเฝ้าระวังตัวตนผู้ใช้ ซึ่งเป็นงานด้านความปลอดภัยเฉพาะทางที่องค์กรให้ความสำคัญเป็นพิเศษในช่วงเวลานั้น เพื่อให้ทีม IT มองเห็นกิจกรรมของ Microsoft Entra ID เช่น การลงชื่อเข้าใช้และเหตุการณ์การเข้าถึงต่าง ๆ โดยดึงข้อมูลโดยตรงจาก Microsoft Graph API",
    responsibility:
      "รับผิดชอบการออกแบบสถาปัตยกรรม การนำเข้าข้อมูล และการจัดทำแดชบอร์ดสำหรับระบบเฝ้าระวัง โดยพัฒนา[[ingestion_pipeline]]ชั้นนำเข้าข้อมูล[[/ingestion_pipeline]]ที่ยืนยันตัวตนกับ Microsoft Graph API และดึงข้อมูล Entra ID เข้ามาจัดเก็บใน [[opensearch]]OpenSearch[[/opensearch]] ตั้งค่า [[prometheus]]Prometheus[[/prometheus]] ให้ดึงเมตริกจาก OpenSearch และออกแบบแดชบอร์ดใน [[grafana]]Grafana[[/grafana]] สำหรับแสดงผลกิจกรรมด้านตัวตนและการเข้าถึงระบบ",
    highlights: [
      "พัฒนาไปป์ไลน์นำเข้าข้อมูลแบบครบวงจรจาก Microsoft Graph API เข้าสู่ OpenSearch",
      "ตั้งค่า Prometheus ให้ดึงเมตริกด้านตัวตนผู้ใช้จาก OpenSearch",
      "ออกแบบแดชบอร์ด Grafana สำหรับกิจกรรมการลงชื่อเข้าใช้และการเข้าถึงของ Microsoft Entra ID",
      "พัฒนาไปป์ไลน์ทั้งหมด ตั้งแต่การนำเข้าข้อมูลไปจนถึงการแสดงผล",
    ],
    impact: [
      "ให้ทีม IT มองเห็นกิจกรรมการลงชื่อเข้าใช้และการเข้าถึงของ Microsoft Entra ID แบบเรียลไทม์ ช่วยตรวจพบความผิดปกติด้านการเข้าถึงได้เร็วขึ้น",
      "ลดเวลาที่ใช้ตรวจสอบเหตุการณ์ด้านตัวตนและการเข้าถึง ด้วยแดชบอร์ดที่รวมข้อมูลไว้ในที่เดียวแทนการดึงข้อมูลด้วยมือจากหลายแหล่ง",
      "เสริมความสามารถด้านการเฝ้าระวังความปลอดภัยขององค์กร ด้วยข้อมูลการลงชื่อเข้าใช้จากต่างประเทศ ความพยายามเข้าสู่ระบบที่ล้มเหลว และเหตุการณ์เสี่ยงที่ตรวจสอบย้อนกลับได้",
    ],
    mainDiagram: { label: "แดชบอร์ด Grafana" },
    diagramShots: [{ label: "สถาปัตยกรรมการเฝ้าระวังการลงชื่อเข้าใช้ Entra" }],
    architectureDashboard: {
      architectureTitle: "ภาพรวมสถาปัตยกรรม",
      architectureDescription:
        "ตัวเก็บข้อมูลที่พัฒนาด้วย Python จะยืนยันตัวตนกับ Microsoft Graph API และดึงบันทึกการลงชื่อเข้าใช้ของ Entra ID ตามช่วงเวลาแบบหมุนเวียน พร้อมกลไก retry/backoff เมื่อเรียก API ไม่สำเร็จ ข้อมูลเหตุการณ์จะผ่านกฎกรองรายชื่อประเทศที่อนุญาตก่อนถูกปรับให้เป็นมาตรฐานและจัดเก็บลง OpenSearch โดยสำรองข้อมูลทั้งดัชนีข้อมูลดิบและข้อมูลที่ปรับมาตรฐานแล้ว ตัวกรองที่กำหนดค่าได้และเทมเพลตดัชนีช่วยให้การค้นหารวดเร็วและการหมุนดัชนีปลอดภัย ก่อนนำข้อมูลที่ปรับมาตรฐานแล้วไปสืบค้นและแสดงผลใน Grafana",
      architectureStages: [
        { title: "แหล่งข้อมูล", description: "บันทึกการลงชื่อเข้าใช้ของ Microsoft Entra ID ซึ่งเป็นข้อมูลดิบด้านตัวตนที่ถูกเฝ้าระวัง" },
        { title: "การเข้าถึงผ่าน API", description: "ปลายทาง /auditLogs/signIns ของ Microsoft Graph API ซึ่งเป็นช่องทางเดียวในการดึงข้อมูลนี้ออกมา" },
        { title: "ไปป์ไลน์การเก็บข้อมูล", description: "ตัวเก็บข้อมูลที่พัฒนาด้วย Python ยืนยันตัวตนผ่านการลงทะเบียนแอปพลิเคชัน ดึงข้อมูลตามช่วงเวลา พร้อมกลไก retry/backoff" },
        { title: "การจัดเก็บข้อมูล", description: "ดัชนีข้อมูลดิบและข้อมูลที่ปรับมาตรฐานแล้วใน OpenSearch โดยแต่ละดัชนีมีการสำรองข้อมูลของตนเอง" },
        { title: "การประมวลผล", description: "การปรับมาตรฐานข้อมูล ตัวกรองที่กำหนดค่าได้ และเทมเพลตดัชนีที่ปลอดภัยต่อการหมุนดัชนี" },
        { title: "การแสดงผล", description: "แดชบอร์ด Grafana ที่ใช้ Prometheus และ OpenSearch เป็นแหล่งข้อมูล" },
      ],
      dashboardTitle: "แดชบอร์ดสำหรับการปฏิบัติงาน",
      dashboardImages: [
        { label: "สถานะและความเป็นปัจจุบันของข้อมูลไปป์ไลน์" },
        { label: "แผนที่ประเทศต้นทางการลงชื่อเข้าใช้จากต่างประเทศ" },
        { label: "ความพยายามลงชื่อเข้าใช้ที่ล้มเหลวและบัญชีที่ถูกล็อก" },
        { label: "การเข้าถึงแบบมีเงื่อนไขตามช่วงเวลา" },
        { label: "การลงชื่อเข้าใช้ที่มีความเสี่ยงและประเภทเหตุการณ์เสี่ยง" },
      ],
    },
    takeaways: [
      {
        title: "การเฝ้าระวังระบบแบบครบวงจร",
        description: "เพิ่มความสามารถในการติดตามกิจกรรมด้านตัวตน ตั้งแต่ข้อมูลจาก Graph API ไปจนถึงการแสดงผลบน Grafana",
      },
      {
        title: "ไปป์ไลน์ข้อมูลแบบอัตโนมัติ",
        description: "ทำให้การนำเข้าข้อมูล Entra ID ผ่าน Microsoft Graph API เข้าสู่ OpenSearch เป็นไปโดยอัตโนมัติ ลดความจำเป็นในการดึงข้อมูลด้วยมือ",
      },
      {
        title: "รับผิดชอบระบบเฝ้าระวังทั้งหมด",
        description: "รับผิดชอบโปรเจกต์ตั้งแต่การออกแบบสถาปัตยกรรมไปจนถึงการส่งมอบ ครอบคลุมทุกส่วนของระบบเฝ้าระวัง",
      },
    ],
  },

  "cancer-patient-healthcare-systems": {
    eyebrow: "แพลตฟอร์มด้านสุขภาพ",
    summary:
      "แพลตฟอร์มประเมินสุขภาพสำหรับผู้ป่วยมะเร็งสูงอายุ ผสานแชทบอทที่ใช้เทคโนโลยี NLP สำหรับให้ข้อมูลทางการแพทย์ที่น่าเชื่อถือ เข้ากับเว็บแอปพลิเคชันสำหรับติดตามผลการประเมิน พัฒนาใหม่ให้สอดคล้องกับกระบวนการทำงานจริงของโรงพยาบาลมะเร็งชลบุรี และออกแบบมาตรการความมั่นคงปลอดภัยโดยอ้างอิง CIA Triad และใช้ STRIDE เพื่อช่วยวิเคราะห์ภัยคุกคามที่เกี่ยวข้องกับระบบ",
    teamType: "โปรเจกต์คู่",
    role: "นักพัฒนาซอฟต์แวร์แบบครบวงจรและผู้ดูแลการปรับใช้งาน",
    overview:
      "พัฒนาขึ้นเพื่อช่วยให้ผู้ป่วยมะเร็งสูงอายุได้รับการดูแลอย่างต่อเนื่องและมีข้อมูลประกอบการตัดสินใจ ท่ามกลางบริบทสังคมสูงวัยของประเทศไทยและระบบเวชระเบียนที่กระจัดกระจาย แพลตฟอร์มนี้ผสานแชทบอทที่ใช้เทคโนโลยี [[nlp]]NLP[[/nlp]] ซึ่งอ้างอิงจากฐานความรู้ที่ผ่านการคัดกรองและตรวจสอบทางการแพทย์ เข้ากับเว็บแอปพลิเคชันสำหรับบันทึกและวิเคราะห์ผลการประเมินผู้ป่วยเทียบกับมาตรฐานทางการแพทย์ ช่วยให้บุคลากรทางการแพทย์มีข้อมูลประกอบการวางแผนการรักษาที่ชัดเจนขึ้น และลดภาระงานตอบคำถามของบุคลากรทางการแพทย์",
    responsibility:
      "รับผิดชอบเว็บแอปพลิเคชันทั้งระบบ ตั้งแต่การออกแบบ พัฒนา ทดสอบ ไปจนถึงการปรับใช้งานระบบ Vue.js และ Node.js แบบครบวงจร ครอบคลุมทั้งหน้าจอผู้ป่วย หน้าจอผู้ดูแลระบบ และการปรับใช้งานจริง รวมถึงการวิเคราะห์และประเมินความเสี่ยงของระบบ พร้อมเสริมความมั่นคงปลอดภัยให้กับทั้งตัวระบบและโครงสร้างพื้นฐานให้เป็นไปตามมาตรฐานความมั่นคงปลอดภัยไซเบอร์ของ NCSA",
    highlights: [
      "วิเคราะห์ข้อจำกัดและจุดเสี่ยงของระบบเดิม เพื่อออกแบบสถาปัตยกรรมใหม่ให้สอดคล้องกับกระบวนการทำงานของโรงพยาบาลมะเร็งชลบุรีและบทบาทผู้ใช้งานทุกกลุ่ม",
      "พัฒนาระบบให้เป็นเว็บแอปพลิเคชันที่รองรับหลายอุปกรณ์ ควบคู่ไปกับการเชื่อมต่อ LINE LIFF เพื่อเพิ่มช่องทางการเข้าถึง",
      "ประยุกต์ใช้มาตรการด้านความมั่นคงปลอดภัยครอบคลุมทั้งชั้นสถาปัตยกรรม ข้อมูล และกระบวนการทำงาน โดยยึดตามมาตรฐานสากล",
      "พัฒนากลไกการติดตาม การตรวจสอบ และการบันทึกเหตุการณ์ เพื่อสนับสนุนการสืบสวนเหตุการณ์และการดูแลรักษาระบบในระยะยาว",
      "ดำเนินการทดสอบการทำงานและประเมินความมั่นคงปลอดภัย เพื่อยืนยันความถูกต้อง ความเสถียร และช่องโหว่ของระบบก่อนเปิดใช้งานจริง",
    ],
    impact: [
      "เสริมความมั่นคงปลอดภัยของข้อมูลครอบคลุมทั้งด้านการรักษาความลับ ความถูกต้องครบถ้วน ความพร้อมใช้งาน และการกู้คืนระบบ",
      "ลดความเสี่ยงจากการโจมตีทางไซเบอร์ในระดับเว็บแอปพลิเคชัน ด้วยมาตรการความมั่นคงปลอดภัยที่สอดคล้องกับ PDPA",
      "บันทึกการตรวจสอบทุกเหตุการณ์การใช้งานอย่างเป็นระบบ เพื่อรองรับการวิเคราะห์และตอบสนองต่อเหตุการณ์",
      "ลดข้อผิดพลาดจากการใช้งานด้วยหน้าจอที่ออกแบบมาอย่างรัดกุม ควบคู่กับระบบควบคุมสิทธิ์การเข้าถึงตามบทบาท เพื่อรักษาความถูกต้องและความปลอดภัยของข้อมูล",
    ],
    features: [
      {
        title: "การจัดการข้อมูลผู้ป่วย",
        description:
          "บันทึกข้อมูลผู้ป่วยแบบครบถ้วน ครอบคลุมข้อมูลประชากร การวินิจฉัย และตำแหน่งการรักษา พร้อมหน้าจอประวัติการประเมินที่ติดตามคะแนนจากเครื่องมือประเมินผู้สูงอายุทั้งเก้าชุดตามช่วงเวลา แยกผลตามหมวดหมู่ และระบุประเด็นที่ต้องติดตามทางคลินิกเป็นพิเศษ",
      },
      {
        title: "การประเมินผู้ป่วย",
        description:
          "บุคลากรทางการแพทย์ดำเนินการประเมินผู้ป่วยแต่ละรายด้วยเครื่องมือประเมินผู้สูงอายุมาตรฐานทั้งเก้าชุด (G8, Frail Scale, TUG, MNA และอื่น ๆ) ผ่านแบบฟอร์มที่นำทางทีละคำถาม พร้อมแถบแสดงความคืบหน้า และล็อกข้อมูลไว้เมื่อบันทึกส่งแล้ว",
      },
      {
        title: "สื่อให้ความรู้ผู้ป่วย",
        description:
          "ขั้นตอนการมอบหมายสื่อให้ความรู้ผู้ป่วยแบบสามขั้นตอน เริ่มจากรายชื่อผู้ป่วยที่ค้นหาและกรองได้ตามโรค โรงพยาบาล หรือเพศ ก่อนมอบหมายและยืนยันเนื้อหาการเรียนรู้สำหรับแผนการดูแล",
      },
      {
        title: "การจัดการฝั่งผู้ดูแลระบบ",
        description:
          "หน้าจอสำหรับผู้ดูแลระบบในการดูแลรายการเครื่องมือประเมิน เปิดหรือปิดการใช้งานเครื่องมือ และควบคุมเวอร์ชันของแต่ละแบบฟอร์ม พร้อมการแก้ไขฉบับร่าง การเผยแพร่ การ[[rollback]]ย้อนกลับเวอร์ชัน[[/rollback]] และคลังเก็บเวอร์ชันย้อนหลังแบบครบถ้วน",
      },
      {
        title: "บันทึกการตรวจสอบ",
        description:
          "[[audit_log]]แดชบอร์ดบันทึกการตรวจสอบ[[/audit_log]]ระดับระบบ ติดตามทุกการกระทำตามประเภทเหตุการณ์และบทบาทผู้กระทำ พร้อมบันทึกรายละเอียดเวลา การกระทำ ผู้กระทำ และผลลัพธ์ของแต่ละเหตุการณ์ เพื่อความรับผิดชอบที่ตรวจสอบได้",
      },
    ],
    mainDiagram: { label: "สถาปัตยกรรมระบบ" },
    diagramShots: [
      { label: "การลงชื่อเข้าใช้" },
      { label: "การจัดการข้อมูลผู้ป่วย" },
      { label: "การประเมินผู้ป่วย" },
      { label: "สื่อให้ความรู้ผู้ป่วย" },
      { label: "การจัดการฝั่งผู้ดูแลระบบ" },
      { label: "บันทึกการตรวจสอบ" },
    ],
  },

  masseuseshop: {
    eyebrow: "โปรเจกต์ AWS Cloud",
    summary:
      "แพลตฟอร์มจองบริการนวดแผนไทยที่พัฒนาร่วมกันเป็นทีม โดยรับผิดชอบด้านโครงสร้างพื้นฐานคลาวด์ AWS การทำ CI/CD อัตโนมัติ และการปรับใช้งานระบบ",
    teamType: "โปรเจกต์ทีม",
    role: "นักพัฒนาซอฟต์แวร์แบบครบวงจรและผู้ดูแลการปรับใช้งาน",
    overview:
      "ร่วมพัฒนา Masseuseshop ซึ่งเป็นแพลตฟอร์มจองบริการนวดแผนไทยแบบออนไลน์ที่พัฒนาร่วมกันเป็นทีม โดยรับผิดชอบโครงสร้างพื้นฐานคลาวด์ AWS และไปป์ไลน์การปรับใช้งานเป็นหลัก ควบคู่ไปกับงานพัฒนาซอฟต์แวร์แบบครบวงจรของตัวแอปพลิเคชัน",
    responsibility:
      "ออกแบบและสร้างโครงสร้างพื้นฐาน AWS แบบครบวงจร ได้แก่ [[vpc]]VPC[[/vpc]] ที่มี[[subnet]]ซับเน็ตสาธารณะและซับเน็ตส่วนตัว[[/subnet]] [[nlb]]Network Load Balancer[[/nlb]] ภายใน และ [[nat_gateway]]NAT Gateway[[/nat_gateway]] เพื่อแยกระบบหลังบ้านบน [[ec2]]EC2[[/ec2]] และฐานข้อมูล [[rds]]RDS[[/rds]] ออกจากการเข้าถึงอินเทอร์เน็ตโดยตรง เปิดให้บริการ API ผ่าน [[api_gateway]]API Gateway[[/api_gateway]] แบบ REST API ที่เชื่อมต่อผ่าน VPC Link และให้บริการส่วนหน้าเป็นเว็บไซต์แบบสแตติกบน [[amazon_s3]]Amazon S3[[/amazon_s3]] ที่อยู่หลัง [[cloudfront]]CloudFront[[/cloudfront]] พร้อมตั้งค่าไปป์ไลน์ [[ci_cd]]CI/CD[[/ci_cd]] ด้วยบริการ AWS [[aws_deployment_services]]CodePipeline, CodeBuild และ CodeDeploy[[/aws_deployment_services]] เพื่อให้การสร้างและปรับใช้งานเป็นไปโดยอัตโนมัติ พร้อมเฝ้าระวังไปป์ไลน์และโครงสร้างพื้นฐานด้วย [[cloudwatch]]CloudWatch[[/cloudwatch]] นอกจากนี้ยังร่วมพัฒนาซอฟต์แวร์แบบครบวงจรของระบบจองบริการอีกด้วย",
    highlights: [
      "ออกแบบเครือข่าย VPC ที่มีซับเน็ตสาธารณะและซับเน็ตส่วนตัว พร้อม NLB ภายในและ NAT Gateway เพื่อแยกระบบหลังบ้านและฐานข้อมูลออกจากการเข้าถึงอินเทอร์เน็ตโดยตรง",
      "สร้างไปป์ไลน์ CI/CD ด้วย AWS CodePipeline, CodeBuild และ CodeDeploy สำหรับการสร้างระบบ จัดเก็บ artifact และปรับใช้งานโดยอัตโนมัติ",
      "ให้บริการส่วนหน้าเป็นเว็บไซต์แบบสแตติกบน Amazon S3 ที่อยู่หลัง CloudFront โดยเปิดบริการฝั่งหลังบ้านผ่าน API Gateway แบบ REST API ที่เชื่อมต่อผ่าน VPC Link",
      "ปรับใช้งานระบบหลังบ้านบน EC2 โดยใช้ RDS เป็นชั้นฐานข้อมูลที่มีการจัดการ",
      "ตั้งค่า AWS CloudWatch เพื่อเฝ้าระวังไปป์ไลน์ CI/CD และโครงสร้างพื้นฐานของแอปพลิเคชัน",
      "ร่วมพัฒนาซอฟต์แวร์แบบครบวงจรของระบบจองบริการ",
    ],
    impact: [
      "เก็บทรัพยากรฝั่งหลังบ้านและฐานข้อมูลไว้ในซับเน็ตส่วนตัว ลดการเปิดเผยต่ออินเทอร์เน็ตสาธารณะโดยตรง",
      "ทำให้ไปป์ไลน์ตั้งแต่การสร้างระบบจนถึงการปรับใช้งานเป็นไปโดยอัตโนมัติ ลดขั้นตอนการปล่อยเวอร์ชันแบบทำมือ",
      "ได้รับประสบการณ์ตรงในการออกแบบและดูแลสถาปัตยกรรม AWS ในลักษณะที่ใกล้เคียงระบบใช้งานจริง ในฐานะส่วนหนึ่งของโปรเจกต์ทีม",
    ],
    mainDiagram: { label: "แผนภาพสถาปัตยกรรม" },
    takeaways: [
      {
        title: "ระบบอัตโนมัติสำหรับ CI/CD",
        description: "ทำให้การสร้างระบบและปรับใช้งานเป็นไปโดยอัตโนมัติด้วย AWS CodePipeline, CodeBuild และ CodeDeploy ลดขั้นตอนการปล่อยเวอร์ชันแบบทำมือ",
      },
      {
        title: "การออกแบบเครือข่ายแบบแบ่งชั้น",
        description: "แยกซับเน็ตสาธารณะออกจากซับเน็ตส่วนตัว พร้อม NLB ภายในและ NAT Gateway เพื่อให้ระบบหลังบ้านและฐานข้อมูลไม่เปิดเผยต่ออินเทอร์เน็ตสาธารณะโดยตรง",
      },
      {
        title: "การเฝ้าระวังโครงสร้างพื้นฐาน",
        description: "ใช้ AWS CloudWatch เฝ้าระวังสถานะของไปป์ไลน์ CI/CD และโครงสร้างพื้นฐานฝั่งหลังบ้าน",
      },
    ],
  },
};

function localizeConceptOverview(
  original: NonNullable<CaseStudyLayout2["conceptOverview"]>,
  th?: ThConceptOverview,
): NonNullable<CaseStudyLayout2["conceptOverview"]> {
  if (!th) return original;
  return {
    ...original,
    eyebrow: th.eyebrow ?? original.eyebrow,
    title: th.title ?? original.title,
    description: th.description ?? original.description,
    features: mergeArray(original.features, th.features),
    impact: th.impact
      ? {
          title: th.impact.title ?? original.impact?.title ?? "",
          description: th.impact.description ?? original.impact?.description ?? "",
        }
      : original.impact,
    secondary: th.secondary
      ? {
          title: th.secondary.title ?? original.secondary?.title ?? "",
          description: th.secondary.description ?? original.secondary?.description ?? "",
        }
      : original.secondary,
    panels: mergeArray(original.panels, th.panels),
  };
}

function localizeArchitectureDashboard(
  original: NonNullable<CaseStudyLayout2["architectureDashboard"]>,
  th?: ThArchitectureDashboard,
): NonNullable<CaseStudyLayout2["architectureDashboard"]> {
  if (!th) return original;
  return {
    ...original,
    architectureTitle: th.architectureTitle ?? original.architectureTitle,
    architectureDescription: th.architectureDescription ?? original.architectureDescription,
    architectureStages: mergeArray(original.architectureStages ?? [], th.architectureStages),
    dashboardTitle: th.dashboardTitle ?? original.dashboardTitle,
    dashboardImages: mergeArray(original.dashboardImages, th.dashboardImages),
  };
}

function localizeLayout2Th(study: CaseStudyLayout2): CaseStudyLayout2 {
  const th = TH_LAYOUT2_STUDIES[study.slug];
  if (!th) return study;
  return {
    ...study,
    eyebrow: th.eyebrow ?? study.eyebrow,
    summary: th.summary ?? study.summary,
    overview: th.overview ?? study.overview,
    responsibility: th.responsibility ?? study.responsibility,
    teamType: th.teamType ?? study.teamType,
    role: th.role ?? study.role,
    highlights: th.highlights ?? study.highlights,
    impact: th.impact ?? study.impact,
    features: study.features ? mergeArray(study.features, th.features) : study.features,
    conceptOverview: study.conceptOverview
      ? localizeConceptOverview(study.conceptOverview, th.conceptOverview)
      : study.conceptOverview,
    architectureDashboard: study.architectureDashboard
      ? localizeArchitectureDashboard(study.architectureDashboard, th.architectureDashboard)
      : study.architectureDashboard,
    mainDiagram: th.mainDiagram ? { ...study.mainDiagram, ...th.mainDiagram } : study.mainDiagram,
    galleryTitle: th.galleryTitle ?? study.galleryTitle,
    diagramShots: mergeArray(study.diagramShots, th.diagramShots),
    takeaways: study.takeaways ? mergeArray(study.takeaways, th.takeaways) : study.takeaways,
  };
}

// ---------- Layout 3: saha-pathanapibul ----------

type ThLayout3 = Partial<
  Pick<CaseStudyLayout3, "eyebrow" | "summary" | "overview" | "responsibility" | "teamType" | "role">
> & {
  highlights?: string[];
  impact?: string[];
  heroShots?: Partial<CaseStudyShot3>[];
  galleryShots?: Partial<CaseStudyShot3>[];
};

const TH_LAYOUT3_STUDIES: Record<string, ThLayout3> = {
  "saha-pathanapibul": {
    eyebrow: "งานด้านเครือข่ายและโครงสร้างพื้นฐาน",
    summary: "การฝึกงานตำแหน่งวิศวกรเครือข่ายแบบลงมือปฏิบัติจริง ครอบคลุมทั้งงานปฏิบัติการเครือข่ายและโครงสร้างพื้นฐานศูนย์ข้อมูล",
    teamType: "แผนกโครงสร้างพื้นฐานและปฏิบัติการด้านไอที (IT Infrastructure & Operation)",
    role: "นักศึกษาฝึกงานวิศวกรเครือข่าย",
    overview:
      "ฝึกงานในตำแหน่งวิศวกรเครือข่ายที่บริษัท สห⁠พัฒนพิบูล จำกัด (มหาชน) โดยเน้นงานด้านเครือข่ายเป็นหลัก ทั้งดูแลรักษาและติดตั้งอุปกรณ์ที่อยู่ภายในเครือข่ายขององค์กรและ Data center ขององค์กร ทำงานร่วมกับวิศวกรเครือข่ายและวิศวกรระบบอาวุโส เพื่อสนับสนุนการปฏิบัติงานด้านโครงสร้างพื้นฐานไอทีขององค์กร พร้อมทั้งร่วมประเมินโครงการทดลองใช้งานจริง (Proof of Concept) ด้าน[[dlp]]การป้องกันข้อมูลรั่วไหล (DLP)[[/dlp]]",
    responsibility:
      "ปฏิบัติงานตามขอบเขตที่ได้รับมอบหมาย ครอบคลุมการติดตั้งและดูแลรักษาอุปกรณ์เครือข่าย การตั้งค่าอุปกรณ์ และการปรับปรุงเอกสาร[[network_topology]]ผังโครงสร้างเครือข่าย[[/network_topology]]ให้เป็นปัจจุบัน รวมถึงงานภายในศูนย์ข้อมูลของบริษัท ทั้งการติดตั้ง ปลดระวาง และดูแลรักษาตู้แร็กเซิร์ฟเวอร์ที่ครบอายุการใช้งาน นอกจากนี้ยังมีส่วนร่วมในโครงการทดลองใช้งานจริง[[poc]]Proof of Concept[[/poc]]ด้าน Data Loss Prevention (DLP) โดยประเมินเปรียบเทียบ Google Workspace DLP และ Safetica เพื่อพิจารณาความเหมาะสมกับความต้องการด้านการป้องกันข้อมูลขององค์กร",
    highlights: [
      "ติดตั้งและดูแลรักษาอุปกรณ์เครือข่าย",
      "ตั้งค่าอุปกรณ์เครือข่ายและปรับปรุงเอกสารผังโครงสร้างเครือข่ายให้เป็นปัจจุบัน",
      "ติดตั้งและปลดระวางอุปกรณ์ฮาร์ดแวร์ภายในศูนย์ข้อมูล",
      "ดูแลรักษาตู้แร็กเซิร์ฟเวอร์ที่ใกล้ครบอายุการใช้งาน",
      "ดำเนินโครงการทดลองใช้งานจริงด้าน DLP เปรียบเทียบระหว่าง Google Workspace DLP และ Safetica",
    ],
    impact: [
      "เสริมความน่าเชื่อถือของเครือข่ายและศูนย์ข้อมูลด้วยเอกสารผังโครงสร้างเครือข่ายที่ถูกต้องและเป็นปัจจุบัน",
      "สนับสนุนการบริหารจัดการวงจรอายุการใช้งานอุปกรณ์ภายในศูนย์ข้อมูล",
      "ได้รับประสบการณ์ตรงในระดับใช้งานจริงกับโครงสร้างพื้นฐานเครือข่ายจากหลากหลายผู้ผลิต",
      "ร่วมให้ผลการประเมินในโครงการทดลองใช้งานจริงด้าน DLP เปรียบเทียบ Google Workspace DLP และ Safetica เพื่อการป้องกันข้อมูลทั่วทั้งองค์กร",
    ],
    heroShots: [
      { label: "อาคารสำนักงานใหญ่ SPC" },
      { label: "ป้ายชื่อ SPC" },
      { label: "ทีมฝึกงาน" },
      { label: "การจัดเตรียมพื้นที่จัดงาน" },
    ],
    galleryShots: [
      { label: "ทางเดินภายในศูนย์ข้อมูล" },
      { label: "ภาพรวมตู้แร็ก" },
      { label: "การตั้งค่าอุปกรณ์" },
      { label: "แผง Patch Panel" },
      { label: "การบำรุงรักษาฮาร์ดแวร์เซิร์ฟเวอร์" },
      { label: "มุมมองสายสัญญาณในตู้แร็ก" },
      { label: "การมัดรวมสายสัญญาณของสวิตช์" },
      { label: "จุดเชื่อมต่อ Core Switch" },
      { label: "จุดปฏิบัติงานและบัตรประจำตัว" },
      { label: "การวางแผนเครือข่ายงาน SPC Fair" },
      { label: "การติดตั้งระบบ PoS Sahapat Delivery" },
      { label: "พื้นที่ขยายสิ่งอำนวยความสะดวก" },
      { label: "แดชบอร์ดการป้องกันข้อมูลรั่วไหล" },
      { label: "รายงานการจัดหมวดหมู่ข้อมูล" },
    ],
  },
};

function localizeLayout3Th(study: CaseStudyLayout3): CaseStudyLayout3 {
  const th = TH_LAYOUT3_STUDIES[study.slug];
  if (!th) return study;
  return {
    ...study,
    eyebrow: th.eyebrow ?? study.eyebrow,
    summary: th.summary ?? study.summary,
    overview: th.overview ?? study.overview,
    responsibility: th.responsibility ?? study.responsibility,
    teamType: th.teamType ?? study.teamType,
    role: th.role ?? study.role,
    highlights: th.highlights ?? study.highlights,
    impact: th.impact ?? study.impact,
    heroShots: mergeArray(study.heroShots, th.heroShots),
    galleryShots: mergeArray(study.galleryShots, th.galleryShots),
  };
}

// ---------- Layout 4: erp-hotel ----------

type ThLayout4Module = {
  name?: string;
  title?: string;
  description?: string;
  annotations?: { description?: string }[];
  aside?: { title?: string; items?: string[] };
  screens?: Partial<CaseStudyScreen>[];
};

type ThLayout4 = Partial<
  Pick<CaseStudyLayout4, "eyebrow" | "summary" | "overview" | "responsibility" | "teamType" | "role">
> & {
  highlights?: string[];
  impact?: string[];
  heroStats?: string[];
  workflow?: {
    eyebrow?: string;
    description?: string;
    stages?: Partial<CaseStudyWorkflowStage>[];
  };
  architecture?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    notes?: Partial<{ title: string; description: string }>[];
  };
  modules?: ThLayout4Module[];
  responsive?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    devices?: Partial<CaseStudyDeviceShot>[];
  };
  screenIndex?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    shots?: Partial<CaseStudyScreen>[];
  };
  takeaways?: Partial<CaseStudyTakeaway>[];
};

const TH_LAYOUT4_STUDIES: Record<string, ThLayout4> = {
  "erp-hotel": {
    eyebrow: "ระบบ ERP / PMS สำหรับงานโรงแรม",
    summary:
      "ระบบ ERP/PMS สำหรับโรงแรมที่เชื่อมงานจอง การเข้าพัก การจัดการห้อง การเรียกเก็บเงิน และการวิเคราะห์ผลการดำเนินงาน พร้อมแผนพัฒนา AI ช่วยวิเคราะห์ข้อมูลและเชื่อมต่อระบบสิทธิ์เข้าห้องพักในอนาคต",
    teamType: "โปรเจกต์ส่วนตัว",
    role: "Full-Stack Engineer และผู้ออกแบบระบบ",
    overview:
      "ERP-Hotel (DD-Resort) เชื่อมงานจอง การเข้าพัก การเรียกเก็บเงิน และการรับชำระเงินไว้ในระบบเดียว ปัจจุบันครอบคลุมประเภทห้องและราคา การจองหลายห้อง การเช็กอิน การจัดและย้ายห้อง Walk-in การพักแบบ Day-use Folio ใบแจ้งหนี้ การชำระเงิน และ[[night_audit]]Night Audit[[/night_audit]] พร้อมข้อมูลแขก งานซ่อมบำรุง รายรับและรายจ่าย รายงาน การวิเคราะห์ การแจ้งเตือน สิทธิ์ผู้ใช้ และประวัติการเปลี่ยนแปลงข้อมูล ส่วน AI ช่วยวิเคราะห์ข้อมูลและ Room Access เป็นแผนต่อยอดที่ยังไม่ได้พัฒนา",
    responsibility:
      "ออกแบบและพัฒนาระบบด้วยตัวเอง ตั้งแต่โมเดลธุรกิจจนถึงหน้าจอไทยและอังกฤษ ใช้ Next.js React และ TypeScript สำหรับ Frontend ส่วน Backend ใช้[[go]]Go[[/go]]กับ Gin ในสถาปัตยกรรม[[modular_monolith]]Modular Monolith[[/modular_monolith]] โดยเข้าถึงฐานข้อมูลกลาง[[postgresql]]PostgreSQL[[/postgresql]]ผ่าน sqlc และ pgx โมดูล Frontdesk ประสานงานข้ามโมดูลภายในทรานแซกชัน และมี[[idempotency]]Idempotency[[/idempotency]]ป้องกันคำสั่งซ้ำในรายการที่กำหนด สำหรับสภาพแวดล้อมพัฒนา Nginx ส่งคำขอจากเบราว์เซอร์ไปยัง Frontend หรือ API ส่วนการอ่านข้อมูลจาก Server เรียก API โดยตรง โดย Nginx และ PostgreSQL ทำงานผ่าน[[docker]]Docker[[/docker]] Compose",
    highlights: [
      "พัฒนาขั้นตอน Booking → Stay → Folio → Invoice → Payment พร้อมทรานแซกชันข้ามโมดูลและการป้องกันคำสั่งซ้ำในรายการที่กำหนด",
      "พัฒนาเครื่องมือหน้าเคาน์เตอร์สำหรับเช็กอิน เช็กเอาต์ ย้ายห้อง Walk-in พักชั่วคราวแบบ Day-use และการปิดวันทำการด้วย Night Audit",
      "พัฒนาปฏิทินราคาพร้อมแผนราคาแยกตามชนิดห้อง และเครื่องมือตรวจสอบราคาที่ใช้ตัวคำนวณเดียวกับระบบจองจริง",
      "พัฒนากระดานสถานะห้องแบบเรียลไทม์ ครอบคลุมสถานะมีแขกพัก พร้อมขาย รอทำความสะอาด กำลังทำความสะอาด และปิดปรับปรุง",
      "พัฒนารายงานและการวิเคราะห์ธุรกิจ ทั้งอัตราการเข้าพัก ADR RevPAR สัดส่วนรายได้ตามประเภทห้องและช่องทางการจอง พร้อมการติดตามจุดคุ้มทุน",
      "พัฒนาการวิเคราะห์ข้อมูลผู้เข้าพัก ทั้งแนวโน้มแขกใหม่เทียบแขกกลับมาพักซ้ำ ความถี่ในการเข้าพัก ระยะเวลาจองล่วงหน้า และประวัติการเข้าพักรายบุคคล",
      "พัฒนาการจัดการงานซ่อมบำรุงและรายจ่าย พร้อมมุมมองรายรับ รายจ่าย และกำไรรายเดือน",
      "ส่งมอบหน้าจอ Responsive สองภาษา (อังกฤษ/ไทย) รองรับทั้งธีมสว่างและมืด สำหรับงานประจำวันของโรงแรม",
    ],
    impact: [
      "แทนที่การทำงานหน้าเคาน์เตอร์ด้วยกระดาษและสเปรดชีต ด้วยระบบเดียวที่ครอบคลุมตั้งแต่การจองจนถึงการรับชำระเงิน",
      "ทำให้พนักงานเห็นสถานะห้อง การเข้าพัก การเช็กเอาต์ และห้องที่เลยกำหนดเช็กเอาต์ได้จากที่เดียวตลอดทั้งวัน",
      "ทำให้เห็นตัวเลขรายได้ได้ภายในวันเดียวกันผ่านหน้าวิเคราะห์ผลการดำเนินงาน โดยไม่ต้องรอให้ Night Audit ปิดยอดก่อน",
      "รักษาความรับผิดชอบต่อรายการเงินและการตั้งค่าระบบที่อ่อนไหว ด้วยสิทธิ์ตามบทบาทและ Audit Log แบบเพิ่มข้อมูลได้อย่างเดียว",
    ],
    heroStats: ["18 หน้าจอ", "9 โมดูล", "พัฒนาคนเดียว", "อังกฤษ/ไทย"],
    workflow: {
      eyebrow: "ขั้นตอนการทำงานทั้งวงจร",
      description:
        "ขั้นตอนหลักเริ่มจากจองประเภทห้อง จัดห้องจริง บันทึกค่าใช้จ่ายระหว่างเข้าพัก และชำระใบแจ้งหนี้ โดยอาจรับมัดจำหรือชำระเงินบางส่วนก่อนเช็กเอาต์ได้ ส่วน Night Audit เป็นงานประจำวันแยกต่างหาก สำหรับลงค่าห้อง บันทึกสถิติรายวัน และเลื่อนวันทำการของโรงแรม การเข้าพักหนึ่งครั้งจึงครอบคลุมหลายวันทำการได้",
      stages: [
        { title: "การจอง", description: "ตรวจห้องว่าง เสนอราคา และสร้างการจอง" },
        { title: "เช็กอิน", description: "จัดห้อง เปิดการเข้าพัก และรับมัดจำกุญแจหากเลือกเก็บ" },
        { title: "ระหว่างเข้าพัก", description: "สถานะห้อง การย้ายห้อง และค่าใช้จ่ายที่บันทึกรายวัน" },
        { title: "Folio", description: "ทุกรายการระบุพนักงานที่บันทึกไว้" },
        { title: "ใบแจ้งหนี้ / ชำระเงิน", description: "ออกใบแจ้งหนี้ บันทึกการชำระเงิน และนำมัดจำมาใช้หรือคืนตามเงื่อนไข" },
        { title: "Night Audit", description: "ลงค่าห้อง บันทึกสถิติรายวัน และเลื่อนวันทำการ" },
      ],
    },
    architecture: {
      eyebrow: "สถาปัตยกรรมของระบบ",
      title: "เส้นทางเดียว ฐานข้อมูลเดียว",
      description:
        "พนักงานเข้าถึงระบบผ่าน Nginx ซึ่งให้บริการหน้าจอ Next.js และส่งต่อคำขอไปยัง Go API ที่อยู่ด้านหลัง ตัว Modular Monolith วางขั้นตอนงานหน้าเคาน์เตอร์ไว้เหนือโมดูลหลักและชั้นพื้นฐานที่ใช้ร่วมกัน โดยทุกการเขียนข้อมูลผ่านชั้น Repository ชั้นเดียวลงสู่ PostgreSQL",
      notes: [
        {
          title: "เส้นทางของคำขอ",
          description:
            "Nginx อยู่หน้าสุด Next.js รับผิดชอบหน้าจอและการอ่านข้อมูลฝั่งเซิร์ฟเวอร์ ส่วนคำสั่งที่เขียนข้อมูลทั้งหมดวิ่งผ่าน REST API ที่เขียนด้วย Go และ Gin",
        },
        {
          title: "Modular Monolith",
          description:
            "ขั้นตอนงานหน้าเคาน์เตอร์ที่พาดผ่านหลายโมดูลวางอยู่เหนือโมดูลหลัก และชั้นพื้นฐานที่ใช้ร่วมกัน ทั้งการยืนยันตัวตนและสิทธิ์ Audit Business Date และการแจ้งเตือน",
        },
        {
          title: "ส่วนที่วางแผนไว้ ยังไม่ได้ทำ",
          description:
            "ระบบเข้าห้องผ่าน MQTT Gateway และการวิเคราะห์ด้วย AI ถูกวาดไว้ในแผนภาพในฐานะงานอนาคต แยกกรอบออกจากส่วนที่ใช้งานจริงแล้วอย่างชัดเจน",
        },
      ],
    },
    modules: [
      {
        name: "หน้าหลัก",
        title: "ทางลัดของงานที่ต้องทำในแต่ละวัน",
        description:
          "ศูนย์รวมทางลัดของงานที่ต้องทำในแต่ละวัน ซึ่งพนักงานหน้าเคาน์เตอร์เปิดค้างไว้ตลอดเวลาปฏิบัติงาน คำสั่งที่ใช้บ่อยที่สุดถูกจัดไว้ให้เรียกใช้ได้ในคลิกเดียว ทั้งการขายห้องแบบ Walk-in การให้บริการแบบ Day-use การจองล่วงหน้า และการเช็กอิน",
        annotations: [
          {
            description:
              "อัตราการเข้าพักของวันนี้ จำนวนห้องที่ขายได้ จำนวนแขกที่กำลังเข้าพัก และจำนวนห้องที่รอการทำความสะอาด เป็นตัวเลขสำหรับใช้ตัดสินใจ ไม่ใช่สำหรับนั่งวิเคราะห์",
          },
          {
            description:
              "ขายห้องแบบ Walk-in ให้บริการแบบ Day-use จองล่วงหน้า และเช็กอิน ทั้งหมดเรียกใช้ได้ในคลิกเดียว ไม่ต้องไล่หาในเมนู",
          },
          {
            description:
              "ห้องที่ใกล้ถึงเวลาเช็กเอาต์ ห้องที่เลยกำหนดแล้ว ผังห้องแบบเรียลไทม์ และรายการห้องที่มีแขกพักอยู่ ซึ่งสั่งเช็กเอาต์ได้จากแต่ละแถวโดยตรง",
          },
        ],
        screens: [
          { label: "หน้าหลัก · ทางลัดและตัวเลขของวันนี้" },
          { label: "หน้าหลัก · ห้องที่กำลังเข้าพักและการแจ้งเตือน" },
        ],
      },
      {
        name: "ห้องพัก",
        title: "ทุกห้องและสถานะ ณ ตอนนี้",
        description:
          "กระดานแสดงทุกห้องและสถานะ ณ ตอนนั้น ทั้งมีแขกพัก พร้อมขาย รอทำความสะอาด กำลังทำความสะอาด และปิดปรับปรุง แม่บ้านกดอัปเดตสถานะได้จากการ์ดห้องโดยตรง ส่วนแผงด้านข้างสรุปจำนวนห้องตามสถานะและตามชนิดห้อง พร้อมราคาและจำนวนห้องที่ยังว่างของแต่ละชนิด",
        screens: [{ label: "ห้องพัก · ผังสถานะห้อง" }],
      },
      {
        name: "การจอง",
        title: "มองคืนเดียวกันจากสองมุม",
        description:
          "ตารางจองวางทุกการเข้าพักเป็นห้อง × วันที่ ทำให้เห็นห้องว่างได้ในปราดเดียว ส่วนหน้าสร้างการจองใช้ตรวจห้องว่างตามช่วงวันที่ แล้วสร้างการจองพร้อมข้อมูลแขก ชนิดห้อง แผนราคา ช่องทางการจอง และจำนวนผู้เข้าพัก หรือค้นหาการจองเดิมด้วยเลขที่การจอง ราคามาจากแผนราคาที่ใช้งานอยู่ และกำหนดเองได้เมื่อหน้าเคาน์เตอร์จำเป็นต้องปรับ",
        aside: { title: "อ่านข้อมูลจาก", items: ["ห้องว่าง", "แผนราคา", "ทะเบียนแขก"] },
        screens: [
          { label: "การจอง · ตารางจอง" },
          { label: "การจอง · ตรวจห้องว่างและสร้างการจอง" },
        ],
      },
      {
        name: "ราคาห้อง",
        title: "คำนวณชุดเดียว ทั้งราคาที่เสนอและที่เรียกเก็บ",
        description:
          "ปฏิทินรายเดือนแสดงราคาต่อคืนของทุกชนิดห้องในหน้าเดียว แยกแผนราคามาตรฐานที่คงที่ทั้งปีออกจากแผนราคาสำหรับ Walk-in และมีเครื่องหมายกำกับวันนี้ วันหยุดสุดสัปดาห์ และวันธรรมดา ส่วนเครื่องมือตรวจสอบราคาใช้ตัวคำนวณเดียวกับระบบจองจริง ราคาที่พนักงานแจ้งจึงเป็นราคาที่แขกถูกเรียกเก็บจริง",
        screens: [{ label: "ราคาห้อง · ปฏิทินราคา" }],
      },
      {
        name: "การเงิน",
        title: "ตั้งแต่เปิด Folio จนถึงปิดยอด",
        description:
          "การเข้าพักทุกครั้งจะเปิด Folio ที่รวบรวมค่าห้องและค่าใช้จ่ายอื่นเรียงตามวัน โดยแต่ละรายการระบุพนักงานที่บันทึกไว้ จากนั้นยอดจะเดินต่อไปยังใบแจ้งหนี้และการรับชำระเงิน ยกเลิกรายการทีละรายการได้ และแยกจัดการมัดจำกุญแจทั้งการรับ คืน และริบ พร้อมหน้าภาพรวมที่แสดง Folio ที่เปิดอยู่และปิดแล้ว กรองดูเป็นรายวัน สัปดาห์ หรือเดือนได้",
        screens: [
          { label: "การเงิน · รายการ Folio" },
          { label: "การเงิน · รายละเอียด Folio และค่าใช้จ่าย" },
        ],
      },
      {
        name: "รายงาน",
        title: "ข้อมูลรายวัน อธิบายผ่านตัวชี้วัด",
        description:
          "รายงานใช้สถิติรายวันที่ Night Audit บันทึกไว้ โดย Analytics คำนวณตัวชี้วัด เช่น อัตราการเข้าพัก ADR และ RevPAR เมื่อเปิดอ่านรายงาน การแก้สูตรจึงอาจเปลี่ยนผลคำนวณย้อนหลังได้ พร้อมเปรียบเทียบช่วงเวลาและแยกรายได้ตามประเภทห้อง ช่องทางการจอง และวิธีขาย เพื่ออธิบายผลการดำเนินงานทั้งการพักค้างคืนและ Day-use",
        aside: { title: "อ้างอิงข้อมูลจาก", items: ["Night Audit", "Business Date", "สถิติรายวัน"] },
        screens: [
          { label: "รายงาน · KPI อัตราการเข้าพักและรายได้" },
          { label: "รายงาน · แนวโน้มและสัดส่วนรายได้" },
          { label: "รายงาน · ห้องค้างคืน Day-use และงานซ่อม" },
          { label: "รายงาน · รายละเอียดสัดส่วนรายได้" },
        ],
      },
      {
        name: "ผลการดำเนินงานธุรกิจ",
        title: "เห็นผลการดำเนินงานวันนี้ พร้อมแผนต่อยอด AI",
        description:
          "Dashboard ปัจจุบันคำนวณรายรับ รายจ่าย อัตราการเข้าพัก ADR RevPAR และความคืบหน้าสู่จุดคุ้มทุนจากข้อมูลการทำงานที่มีอยู่ โดยไม่ต้องรอ Night Audit ตัวเลขเหล่านี้มาจากสูตรคำนวณ ยังไม่ได้ใช้ AI แผนต่อไปคือเพิ่ม AI ช่วยวิเคราะห์ข้อมูลที่จัดเตรียมผ่าน Analytics Service แล้วแสดงผลให้ผู้บริหารพิจารณา",
        aside: {
          title: "แผน AI Analysis — ยังไม่ได้พัฒนา",
          items: [
            "ข้อมูลโรงแรม → ตัวชี้วัดและแนวโน้มย้อนหลัง → AI ช่วยวิเคราะห์ → Dashboard ผู้บริหาร",
            "ตัวอย่างที่เสนอ: อธิบายแนวโน้ม ตรวจจับความผิดปกติ และพยากรณ์รายได้หรืออัตราการเข้าพัก",
            "ข้อมูลเชิงลึกและข้อเสนอแนะใช้ประกอบการพิจารณาและตัดสินใจของผู้บริหาร",
          ],
        },
        screens: [
          { label: "ผลการดำเนินงานธุรกิจ · KPI แบบสด" },
          { label: "ผลการดำเนินงานธุรกิจ · อัตราการเข้าพักและ ADR" },
          { label: "ผลการดำเนินงานธุรกิจ · จุดคุ้มทุน" },
        ],
      },
      {
        name: "การวิเคราะห์ข้อมูลผู้เข้าพัก",
        title: "ใครคือคนที่มาพักจริง ๆ",
        description:
          "แนวโน้มแขกใหม่เทียบแขกที่กลับมาพักซ้ำ ส่วนผสมของแขกตามช่องทางการจอง ระยะพักเฉลี่ยและเวลาจองล่วงหน้าเฉลี่ย พร้อมโปรไฟล์รายบุคคลที่บอกว่าแขกคนนั้นกลับมาบ่อยแค่ไหน ชอบห้องประเภทไหน และมีประวัติการเข้าพักย้อนหลังทั้งหมดอย่างไร",
        screens: [
          { label: "การวิเคราะห์ผู้เข้าพัก · แขกใหม่เทียบแขกเก่า" },
          { label: "การวิเคราะห์ผู้เข้าพัก · โปรไฟล์แขก" },
        ],
      },
      {
        name: "บัญชี",
        title: "เงินไปอยู่ที่ไหนบ้าง",
        description:
          "มุมมองรายรับและรายจ่ายรายเดือน แสดงรายรับ รายจ่าย กำไรสุทธิ และอัตรากำไร พร้อมแยกหมวดค่าใช้จ่าย เช่น ค่าแรง ค่าสาธารณูปโภค ซ่อมบำรุง แม่บ้าน และการตลาด เป็นมุมมองสรุปสำหรับการบริหาร ยังไม่ใช่ระบบบัญชีแยกประเภทเต็มรูปแบบ",
        screens: [{ label: "บัญชี · กำไรขาดทุนรายเดือน" }],
      },
    ],
    responsive: {
      eyebrow: "รองรับทุกขนาดหน้าจอ",
      title: "กะเดียวกัน บนเครื่องอะไรก็ได้ที่อยู่ตรงหน้า",
      description:
        "หน้าเคาน์เตอร์ใช้งานบนเดสก์ท็อปตลอดวัน แต่หน้าจอชุดเดียวกันก็ถูกเรียกใช้นอกเคาน์เตอร์ด้วย ทุกโมดูลจึงออกแบบให้รองรับความกว้างระดับแท็บเล็ตและโทรศัพท์ไปพร้อมกัน",
      devices: [
        {
          label: "เดสก์ท็อป",
          note: "พื้นที่ทำงานเต็มรูปแบบ เมนูกางค้างไว้ ตัวเลขของวันเรียงอยู่ด้านบน และรายการห้องที่มีแขกพักอยู่ข้างผังห้อง",
        },
        {
          label: "แท็บเล็ต",
          note: "หน้า Business Performance บนความกว้างระดับแท็บเล็ต เมนูย่อเหลือไอคอนและการ์ดตัวเลขจัดเรียงใหม่ สำหรับดูสถานะของวันเมื่อไม่ได้อยู่ที่เคาน์เตอร์",
        },
        {
          label: "โทรศัพท์",
          note: "หน้าแรกบนโทรศัพท์ ปุ่มลัดและรายการห้องที่ต้องเช็คเอาต์เรียงลงมาเป็นคอลัมน์เดียว สำหรับพนักงานที่ทำงานอยู่หน้างานแทนที่จะอยู่หน้าเคาน์เตอร์",
        },
      ],
    },
    screenIndex: {
      eyebrow: "ทุกหน้าจอในระบบ",
      title: "ทั้งระบบบนแผ่นเดียว",
      description:
        "ภาพเหล่านี้แสดงหน้าจอระบบโรงแรมที่มีอยู่ปัจจุบัน พร้อมฟังก์ชันสนับสนุน ได้แก่ งานหน้าเคาน์เตอร์ ทะเบียนแขก งานแจ้งซ่อม สิทธิ์ผู้ใช้ และประวัติการใช้งาน ส่วน AI Analysis และ Room Access ใน Diagram เป็นแผนอนาคต ยังไม่ใช่ฟังก์ชันในภาพหน้าจอชุดนี้",
      shots: [
        { label: "หน้าหลัก" },
        { label: "หน้าหลัก · การแจ้งเตือน" },
        { label: "ห้องพัก" },
        { label: "ตารางจอง" },
        { label: "สร้างการจอง" },
        { label: "ราคาห้อง" },
        { label: "รายการ Folio" },
        { label: "รายละเอียด Folio" },
        { label: "รายงาน · KPI" },
        { label: "รายงาน · สัดส่วนรายได้" },
        { label: "รายงาน · กลุ่มลูกค้า" },
        { label: "รายงาน · รายละเอียดรายได้" },
        { label: "ผลการดำเนินงาน" },
        { label: "อัตราการเข้าพักและ ADR" },
        { label: "จุดคุ้มทุน" },
        { label: "ส่วนผสมของแขก" },
        { label: "โปรไฟล์แขก" },
        { label: "บัญชี" },
      ],
    },
    takeaways: [
      {
        title: "โดเมนเดียว หลายโมดูล",
        description:
          "พัฒนาระบบหลังบ้านเป็น Modular Monolith เพื่อให้การจอง การเข้าพัก การเรียกเก็บเงิน และงานหลังบ้าน ใช้ฐานข้อมูลและทรานแซกชันเดียวกัน โดยยังคงขอบเขตของแต่ละโมดูลไว้ชัดเจน",
      },
      {
        title: "งานปฏิบัติการที่ไม่มีช่องว่าง",
        description:
          "พัฒนา Night Audit สำหรับลงค่าห้อง จัดการการจองที่ไม่มาเข้าพักและ Day-use ที่ยังเปิดอยู่ บันทึกสถิติรายวัน และเลื่อนวันทำการ มีคำสั่งแบบรันครั้งเดียวรองรับการตั้งเวลา โดยการตั้งตารางเวลาของ OS เป็นขั้นตอนตอนนำระบบไปใช้งาน",
      },
      {
        title: "เห็นตัวเลขได้ภายในวันเดียวกัน",
        description:
          "ใช้รายงานจากข้อมูลที่ Night Audit บันทึกไว้ควบคู่กับหน้าผลการดำเนินงานปัจจุบัน เพื่อให้พนักงานตรวจอัตราการเข้าพัก รายได้ และความคืบหน้าสู่จุดคุ้มทุนได้ก่อนปิดวัน",
      },
      {
        title: "อนาคต: AI ช่วยวิเคราะห์ข้อมูล",
        description:
          "มีแผนใช้ข้อมูลที่จัดเตรียมผ่าน Analytics Service ให้ AI ช่วยอธิบายแนวโน้ม ตรวจจับความผิดปกติ และพยากรณ์รายได้หรืออัตราการเข้าพัก ทั้งหมดเป็นตัวอย่างการใช้งานที่เสนอ ยังไม่ได้พัฒนา โดยจะแสดงข้อมูลเชิงลึกบน Dashboard ให้ผู้บริหารพิจารณา",
      },
      {
        title: "อนาคต: ระบบสิทธิ์เข้าห้องพัก",
        description:
          "มีแผนเชื่อมสิทธิ์เข้าห้องกับการเช็กอินและเช็กเอาต์ Diagram แสดงตัวอย่าง Encoder ออกคีย์การ์ด และ MQTT เชื่อมผ่าน Gateway ไปยัง Lock ของห้อง A1 A2 และ A3 เป็นแนวทางที่เสนอ โดยรูปแบบการเชื่อมต่อจริงขึ้นอยู่กับอุปกรณ์และระบบสิทธิ์เข้าห้องที่เลือกใช้",
      },
    ],
  },
};

function localizeLayout4Module(original: CaseStudyModule, th?: ThLayout4Module): CaseStudyModule {
  if (!th) return original;
  return {
    ...original,
    name: th.name ?? original.name,
    title: th.title ?? original.title,
    description: th.description ?? original.description,
    annotations: original.annotations ? mergeArray(original.annotations, th.annotations) : original.annotations,
    aside:
      original.aside && th.aside
        ? {
            title: th.aside.title ?? original.aside.title,
            items: th.aside.items ?? original.aside.items,
          }
        : original.aside,
    screens: mergeArray(original.screens, th.screens),
  };
}

function localizeLayout4Th(study: CaseStudyLayout4): CaseStudyLayout4 {
  const th = TH_LAYOUT4_STUDIES[study.slug];
  if (!th) return study;
  return {
    ...study,
    eyebrow: th.eyebrow ?? study.eyebrow,
    summary: th.summary ?? study.summary,
    overview: th.overview ?? study.overview,
    responsibility: th.responsibility ?? study.responsibility,
    teamType: th.teamType ?? study.teamType,
    role: th.role ?? study.role,
    highlights: th.highlights ?? study.highlights,
    impact: th.impact ?? study.impact,
    heroStats: th.heroStats ?? study.heroStats,
    workflow:
      study.workflow && th.workflow
        ? {
            ...study.workflow,
            eyebrow: th.workflow.eyebrow ?? study.workflow.eyebrow,
            description: th.workflow.description ?? study.workflow.description,
            stages: mergeArray(study.workflow.stages, th.workflow.stages),
          }
        : study.workflow,
    architecture:
      study.architecture && th.architecture
        ? {
            ...study.architecture,
            eyebrow: th.architecture.eyebrow ?? study.architecture.eyebrow,
            title: th.architecture.title ?? study.architecture.title,
            description: th.architecture.description ?? study.architecture.description,
            notes: study.architecture.notes
              ? mergeArray(study.architecture.notes, th.architecture.notes)
              : study.architecture.notes,
          }
        : study.architecture,
    modules: study.modules.map((mod, i) => localizeLayout4Module(mod, th.modules?.[i])),
    responsive:
      study.responsive && th.responsive
        ? {
            ...study.responsive,
            eyebrow: th.responsive.eyebrow ?? study.responsive.eyebrow,
            title: th.responsive.title ?? study.responsive.title,
            description: th.responsive.description ?? study.responsive.description,
            devices: mergeArray(study.responsive.devices, th.responsive.devices),
          }
        : study.responsive,
    screenIndex:
      study.screenIndex && th.screenIndex
        ? {
            ...study.screenIndex,
            eyebrow: th.screenIndex.eyebrow ?? study.screenIndex.eyebrow,
            title: th.screenIndex.title ?? study.screenIndex.title,
            description: th.screenIndex.description ?? study.screenIndex.description,
            shots: mergeArray(study.screenIndex.shots, th.screenIndex.shots),
          }
        : study.screenIndex,
    takeaways: study.takeaways ? mergeArray(study.takeaways, th.takeaways) : study.takeaways,
  };
}

/** จุดเข้าใช้งานหลัก — เลือก localizer ตาม discriminant `layout` แล้วคืน case study ที่แปลไทยแล้ว (คืนต้นฉบับถ้ายังไม่มีคำแปลของ slug นั้น) */
export function localizeCaseStudyForThai(study: CaseStudy): CaseStudy {
  if (study.layout === 1) return localizeLayout1Th(study);
  if (study.layout === 2) return localizeLayout2Th(study);
  if (study.layout === 4) return localizeLayout4Th(study);
  return localizeLayout3Th(study);
}
