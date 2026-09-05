/** ชนิดข้อมูลฝั่ง client — ต้องตรงกับ backend/internal/model/model.go */

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  bodyMd?: string;
  coverUrl: string;
  videoUrl: string;
  client?: string;
  role?: string;
  year: number;
  tools: string[];
  featured: boolean;
};

export type Service = {
  icon: string;
  title: string;
  description: string;
};

export type Skill = {
  name: string;
  level: number;
  group: string;
};

export type Experience = {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl: string;
};

/** บันทึกการอัปเดตเว็บหนึ่งครั้ง — backend เลือกภาษาให้แล้วตาม ?lang ที่ส่งไป
 * kind ใช้เลือกป้ายกำกับ/สีบนหน้า Help */
export type SiteUpdate = {
  version?: string;
  kind: string;
  title: string;
  body?: string;
  releasedAt: string;
};

/** payload ก้อนเดียวของหน้า Help */
export type HelpContent = {
  updates: SiteUpdate[];
};

/** payload ก้อนเดียวของหน้าแรก */
export type Home = {
  settings: Record<string, string>;
  services: Service[];
  skills: Skill[];
  projects: Project[];
  testimonials: Testimonial[];
};

export type ContactInput = {
  name: string;
  email: string;
  subject?: string;
  message: string;
  website?: string; // honeypot
};
