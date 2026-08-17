import type { Project } from "@/lib/types";

export const TH_HOME = {
  settings: {
    "hero.eyebrow": "ยินดีต้อนรับสู่สถานีของผม",
    "hero.title": "Platform 108\nWhat's Next Station.",
    "about.heading": "สวัสดีครับ ผมธีรภัทร์ สังข์สี",
    "about.body":
      "ผมจบการศึกษาด้านเทคโนโลยีสารสนเทศ สาขาโครงสร้างพื้นฐาน จากสถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (KMITL) และมีประสบการณ์ลงมือทำด้านการพัฒนาแบบ Full-Stack ปัจจุบันผมกำลังมุ่งสู่สายงาน DevOps ที่เชื่อมงานด้านระบบเข้ากับงานด้านซอฟต์แวร์",
    "home.about.body":
      "ผมเริ่มต้นจากงานด้าน Infrastructure และค่อย ๆ ต่อยอดมาสู่การพัฒนาซอฟต์แวร์ ประสบการณ์จากแต่ละโปรเจกต์ช่วยให้ผมเข้าใจทั้งโครงสร้างระบบและการสร้างงานที่ตอบโจทย์ผู้ใช้มากขึ้น หน้านี้รวบรวมเส้นทางการทำงาน แนวคิด และทักษะที่ผมกำลังพัฒนาต่อ",
    "skills.summary":
      "ประสบการณ์จากหลายโปรเจกต์สอนผมว่า งานที่ดีเริ่มจากการทำความเข้าใจปัญหาก่อนลงมือเขียนโค้ด ผมจะวางโครงสร้างให้ชัดเจน แล้วจึงค่อยปรับรายละเอียดให้ลงตัว",
  },
  hero: {
    aboutLabel: "รู้จักผม",
    experienceLabel: "ดูประสบการณ์",
    aboutHref: "/th#about",
    experienceHref: "/th#work",
    railLabel: "หน้าแรก",
  },
  about: {
    eyebrow: "เกี่ยวกับผม",
    linkLabel: "อ่านเรื่องราวของผม",
    linkHref: "/about",
    railLabel: "เกี่ยวกับ",
    profileAlt: "รูปโปรไฟล์ของธีรภัทร์ สังข์สี",
  },
  skills: {
    eyebrow: "ทักษะและเครื่องมือ",
    heading: "Technical Cargo",
    railLabel: "ทักษะ",
    categories: {
      development: {
        title: "การพัฒนาซอฟต์แวร์",
        tags: "Backend  •  Frontend  •  API  •  Database  •  DevOps",
      },
      infrastructure: {
        title: "โครงสร้างพื้นฐาน",
        tags: "เครือข่าย  •  คลาวด์  •  ระบบเสมือน  •  การเฝ้าระวัง  •  ความปลอดภัย",
      },
      "tools-workflow": {
        title: "เครื่องมือและขั้นตอนการทำงาน",
        tags: "ประสิทธิภาพการทำงาน  •  การทำงานร่วมกัน  •  เอกสาร  •  การออกแบบ",
      },
    },
  },
  featuredWork: {
    eyebrow: "โปรเจกต์เด่น",
    heading: "Built to solve. Shaped to grow.",
    description:
      "ผลงานที่คัดสรรซึ่งสะท้อนแนวทางของผมในการแก้ปัญหา ออกแบบระบบ และสร้างผลลัพธ์ที่เกิดประโยชน์ในการใช้งานจริง",
    viewAllLabel: "ดูโปรเจกต์ทั้งหมด",
    viewAllHref: "/work",
    carouselLabel: "รายการโปรเจกต์เด่น",
    projectLabel: "ดูโปรเจกต์",
    recommendedLabel: "แนะนำ",
    railLabel: "ผลงาน",
  },
  cta: {
    heading: "มีโปรเจกต์อยู่ในใจไหม?",
    subtitle: "มาคุยกันครับ แค่มีไอเดียคร่าว ๆ ก็พร้อมเริ่มต้นได้แล้ว",
    buttonLabel: "ติดต่อผม",
    buttonHref: "/th/contact",
    railLabel: "ติดต่อ",
  },
} as const;

/** เนื้อหาหน้า /th/about — คนละก้อนกับ TH_HOME เพราะ /about เป็น route เต็มของตัวเอง ไม่ได้ยืม settings จาก backend เหมือนหน้าแรก */
export const TH_ABOUT = {
  hero: {
    eyebrow: "เกี่ยวกับผม",
    title: "เกี่ยวกับฉัน",
    description: "ภาพรวมโดยสังเขปเกี่ยวกับตัวตน หน้าที่ และแนวทางการทำงาน",
  },
  story: {
    eyebrow: "เรื่องราวของผม",
    name: "ธีรภัทร์ สังข์สี",
    nickname: "(เกม)",
  },
  educationFields: [
    { label: "การศึกษา", value: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (KMITL)" },
    { label: "คณะ", value: "เทคโนโลยีสารสนเทศ" },
    { label: "หลักสูตร", value: "หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาเทคโนโลยีสารสนเทศ" },
    { label: "วิชาเฉพาะทาง", value: "กลุ่มวิชาเฉพาะด้านโครงสร้างพื้นฐานเทคโนโลยีสารสนเทศ" },
  ],
  actions: {
    downloadCv: "ดาวน์โหลด CV",
    downloadResume: "ดาวน์โหลด Resume",
    experience: "ประสบการณ์ส่วนตัว",
  },
  interest: {
    eyebrow: "สิ่งที่ผมสนใจ",
    title: "Interest & Passion",
    description:
      "สำรวจว่า AI จะช่วยแก้ปัญหาในโลกจริง เสริมความแข็งแกร่งให้ระบบ และสร้างโครงสร้างพื้นฐานสำหรับอนาคตได้อย่างไร",
    items: [
      {
        title: "AI เพื่อข้อมูลเชิงลึก",
        description:
          "นำ AI มาใช้ในองค์กรเพื่อวิเคราะห์ข้อมูลและดึงอินไซต์ออกมา เปลี่ยนข้อมูลดิบให้กลายเป็นการตัดสินใจที่ช่วยสนับสนุนการทำงานประจำวัน",
      },
      {
        title: "AI ด้านความปลอดภัยไซเบอร์",
        description:
          "เมื่อมีข่าวการใช้ AI agent เจาะระบบมากขึ้น ผมสนใจอีกด้านหนึ่งคือการใช้ AI agent มาช่วยป้องกันระบบภายในและโครงสร้างพื้นฐานแทน",
      },
      {
        title: "AI ด้านโครงสร้างพื้นฐาน",
        description:
          "สนใจระบบที่ทำให้ AI ทำงานได้อย่างต่อเนื่องในระบบจริง ตั้งแต่โครงสร้างพื้นฐานคลาวด์อย่าง compute, storage และ network ไปจนถึงแนวทาง MLOps เช่น CI/CD pipeline, การเฝ้าระวังระบบ และ Infrastructure as Code ที่ช่วยให้ AI workload ทำงานได้อย่างเสถียรและรองรับการขยายตัว",
      },
    ],
  },
  workflowEyebrow: "ขั้นตอนการทำงาน",
} as const;

export const TH_SERVICE_DESCRIPTIONS: Record<string, string> = {
  "Design System": "คอมโพเนนต์ที่นำกลับมาใช้ซ้ำได้ เพื่อให้ทีมพัฒนาต่อยอดได้ทันที",
  Development: "พัฒนาเว็บแอปและระบบหลังบ้านแบบครบวงจร ตั้งแต่การออกแบบ UI ไปจนถึงการนำขึ้นใช้งาน",
  Infrastructure: "วางระบบเซิร์ฟเวอร์และการปรับใช้ให้พร้อมใช้งานจริง ปลอดภัย และรองรับการขยายตัว",
  Automation: "สคริปต์และขั้นตอนการทำงานอัตโนมัติด้วย CI/CD เพื่อช่วยลดงานซ้ำซ้อน",
};

/** เนื้อหาหน้า /th/skills — คู่กับ src/app/skills/page.tsx ตัวอังกฤษ ใช้ categories และ summary ชุดเดียวกับ TH_HOME.skills */
export const TH_SKILLS = {
  hero: {
    eyebrow: "Technical Cargo",
    title: "What's in the toolkit",
    description:
      "ภาษาโปรแกรม เฟรมเวิร์ก และเครื่องมือด้านโครงสร้างพื้นฐานที่ผมใช้งานจริง ทั้งในงานพัฒนาซอฟต์แวร์ เครือข่าย และโครงสร้างพื้นฐาน",
  },
} as const;

/** เนื้อหาหน้า /th/work — คู่กับ src/app/work/page.tsx ตัวอังกฤษ ส่วน filter chip (FILTER_GROUPS ใน ProjectGrid.tsx) ตั้งใจปล่อยเป็นอังกฤษไว้ตามเดิม */
export const TH_WORK = {
  eyebrow: "ประสบการณ์",
  title: "โปรเจกต์ทั้งหมด",
  description: "รวมโปรเจกต์ที่ผมเคยลงมือทำ ตั้งแต่เว็บแอปพลิเคชันไปจนถึงระบบฝั่งเซิร์ฟเวอร์",
  flipLabel: "งานทั้งหมด",
  visibleLabel: "จำนวนโปรเจกต์ที่แสดง",
  projectLabel: "ดูโปรเจกต์",
  recommendedLabel: "แนะนำ",
  emptyLabel: "ยังไม่มีโปรเจกต์ในหมวดหมู่นี้",
} as const;

/** เนื้อหาหน้า /th/contact — คู่กับ src/app/contact/page.tsx ตัวอังกฤษ
 * ป้ายชื่อช่องทาง (GitHub, GitLab, Email, Portfolio, CV, Resume) ตั้งใจปล่อยเป็นอังกฤษไว้เหมือนหน้าอื่น ๆ */
export const TH_CONTACT = {
  hero: {
    eyebrow: "ติดต่อ",
    title: "ช่องทางการติดต่อ",
    description:
      "หากมีโครงการที่ต้องการพัฒนา หรือต้องการหารือเกี่ยวกับโอกาสในการทำงาน สามารถติดต่อได้ผ่านช่องทางด้านล่าง",
  },
  resources: {
    heading: "ช่องทางติดต่อและทรัพยากร",
    subheading: "ดูผลงานของผมและติดต่อผ่านช่องทางไหนก็ได้ครับ",
    links: [
      { label: "GitHub", sub: "แหล่งรวบรวมผลงานและซอร์สโค้ด" },
      { label: "GitLab", sub: "แหล่งรวบรวมโครงการและซอร์สโค้ด" },
      { label: "Email", sub: "ช่องทางติดต่อทางอีเมล" },
      { label: "CV", sub: "ประวัติการศึกษาและประสบการณ์" },
      { label: "Resume", sub: "สรุปประสบการณ์และทักษะ" },
      { label: "Portfolio", sub: "เอกสารรวบรวมผลงานและโครงการ" },
    ],
    generalInfo: "ข้อมูลทั่วไป",
    fields: {
      email: "อีเมล",
      phone: "เบอร์โทร",
      location: "ที่อยู่",
      availability: "สถานะว่าง",
    },
    availabilityValue: "พร้อมคุยเรื่องโปรเจกต์",
  },
} as const;

/** เนื้อหาหน้า /th/help — คู่กับ src/app/help/page.tsx ตัวอังกฤษ */
export const TH_HELP = {
  hero: {
    eyebrow: "ช่วยเหลือ",
    title: "ช่วยเหลือและคำถามที่พบบ่อย",
    description: "คำถามที่พบบ่อยและวิธีติดต่อกำลังจะมาเร็ว ๆ นี้",
  },
  body: "ระหว่างนี้ หากมีคำถามหรืออยากคุยเรื่องโอกาสในการทำงาน ส่งข้อความหาผมได้ผ่านหน้าติดต่อครับ",
  linkLabel: "ไปหน้าติดต่อ",
  linkHref: "/th/contact",
} as const;

/** ป้ายและข้อความ UI คงที่บนหน้า /th/work/[slug] — ใช้ร่วมกันทั้ง 3 เลย์เอาต์ของหน้ารายละเอียดโปรเจกต์ */
export const TH_CASE_STUDY_UI = {
  backToProjects: "กลับไปหน้าโปรเจกต์",
  viewLiveDemo: "ดูตัวอย่างใช้งานจริง",
  viewSourceCode: "ดูซอร์สโค้ด",
  viewArchitecture: "ดูสถาปัตยกรรมระบบ",
  viewGithubRepo: "ดูซอร์สโค้ดบน GitHub",
  downloadPdfThesis: "ดาวน์โหลดวิทยานิพนธ์ (PDF)",
  projectGallery: "แกลเลอรีภาพโปรเจกต์",
  architectureOverview: "ภาพรวมสถาปัตยกรรมระบบ",
  techStack: "เทคโนโลยีที่ใช้",
  challengesSolutions: "ความท้าทายและแนวทางแก้ไข",
  challengeLabel: "ความท้าทาย:",
  solutionLabel: "แนวทางแก้ไข:",
  projectTimeline: "ไทม์ไลน์โปรเจกต์",
  overview: "ภาพรวมโปรเจกต์",
  roleResponsibility: "บทบาทและความรับผิดชอบ",
  highlight: "จุดเด่นของโปรเจกต์",
  impact: "ผลลัพธ์และประโยชน์ที่ได้รับ",
  infrastructureOverview: "ภาพรวมโครงสร้างพื้นฐาน",
  pipelineStages: "ขั้นตอนการทำงานของระบบ",
  featureDeepDive: "รายละเอียดเชิงลึกของฟีเจอร์",
  keyTakeaways: "สิ่งที่ได้เรียนรู้จากโปรเจกต์",
  relatedProjects: "โปรเจกต์อื่นที่เกี่ยวข้อง",
  photoGallery: "คลังภาพ",
  viewAllPrefix: "ดูทั้งหมด",
  workAreas: "พื้นที่การปฏิบัติงาน",
  photosSuffix: "รูปภาพ",
  openFullSizeImagePrefix: "เปิดดูภาพขนาดเต็ม:",
  previousImage: "ภาพก่อนหน้า",
  nextImage: "ภาพถัดไป",
  close: "ปิด",
  scrollThumbnailsLeft: "เลื่อนภาพย่อไปทางซ้าย",
  scrollThumbnailsRight: "เลื่อนภาพย่อไปทางขวา",
  projectOverviewFallback: "ภาพรวมโปรเจกต์",
} as const;

/** คำอธิบาย/ป้ายของแต่ละหมวดพื้นที่งาน ใน CaseStudyWorkAreas3 — คีย์ตรงกับค่า category ภาษาอังกฤษในข้อมูลโปรเจกต์เดิม (ใช้เป็น lookup key เท่านั้น ไม่ใช่ข้อความที่แสดงผล) */
export const TH_WORK_AREA_CATEGORY: Record<string, { label: string; description: string }> = {
  "Data Center": {
    label: "ศูนย์ข้อมูล (Data Center)",
    description:
      "ติดตั้งและดูแลรักษาอุปกรณ์เครือข่ายภายในตู้แร็กเซิร์ฟเวอร์ ตั้งแต่งานตั้งค่าอุปกรณ์ไปจนถึงการเปลี่ยนอุปกรณ์ทั้งชุด",
  },
  Site: {
    label: "พื้นที่ปฏิบัติงาน",
    description: "สนับสนุนกิจกรรมต่าง ๆ ของบริษัทในพื้นที่จริง เช่น การจัดเตรียมบูธในงานแสดงสินค้า และการขยายพื้นที่ปฏิบัติงาน",
  },
  DLP: {
    label: "การป้องกันข้อมูลรั่วไหล (DLP)",
    description:
      "ประเมินโซลูชัน Google Workspace DLP และ Safetica ผ่านการทดลองใช้งานจริงในลักษณะ Proof of Concept เพื่อพิจารณาแนวทางป้องกันข้อมูลรั่วไหลที่เหมาะสม",
  },
};

const TH_PROJECT_COPY: Record<string, Pick<Project, "category" | "summary">> = {
  "saha-pathanapibul": {
    category: "โครงสร้างพื้นฐาน",
    summary: "วิศวกรเครือข่าย (ฝึกงาน) ที่บริษัท สห⁠พัฒนพิบูล จำกัด (มหาชน) โดยทำงานในแผนก IT Infrastructure & Operation รับผิดชอบงานด้านเครือข่ายและระบบขององค์กร",
  },
  "internal-development-platform": {
    category: "วิศวกรรมแพลตฟอร์ม",
    summary: "แพลตฟอร์มสำหรับนักพัฒนาภายในเพื่อควบคุมมาตรฐานการผลิตซอฟต์แวร์และการจัดการภายในองค์กร",
  },
  grafana: {
    category: "การตรวจสอบและสังเกตการณ์ระบบ",
    summary: "แดชบอร์ดเฝ้าระวังสำหรับความปลอดภัยเฉพาะระหว่างทำงานที่บริษัท สห⁠พัฒนพิบูล จำกัด (มหาชน)",
  },
  "cancer-patient-healthcare-systems": {
    category: "แพลตฟอร์มสุขภาพ",
    summary: "แพลตฟอร์มประเมินสุขภาพสำหรับผู้ป่วยมะเร็งสูงอายุร่วมกับโรงพยาบาลมะเร็งชลบุรี",
  },
  masseuseshop: {
    category: "โปรเจกต์ AWS Cloud",
    summary: "แพลตฟอร์มจองบริการนวดแผนไทยที่พัฒนาร่วมกันเป็นทีม",
  },
  "khungame-restaurant": {
    category: "แพลตฟอร์มสั่งอาหาร",
    summary: "เว็บสำหรับสั่งอาหารออนไลน์สำหรับร้านอาหาร",
  },
};

export function localizeProjectsForThai(projects: Project[]): Project[] {
  return projects.map((project) => ({
    ...project,
    ...(TH_PROJECT_COPY[project.slug] ?? {}),
  }));
}
