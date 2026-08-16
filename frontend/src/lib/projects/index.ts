/**
 * รวมข้อมูลโปรเจกต์จริงทั้งหมด — โฟลเดอร์ละ 1 โปรเจกต์ ใต้ lib/projects/<slug>/index.ts
 * แต่ละไฟล์ export `card` (สำหรับการ์ดใน /work) และ `caseStudy` (สำหรับหน้า /work/[slug])
 * เพิ่มโปรเจกต์ใหม่: สร้างโฟลเดอร์ใหม่ตามแบบที่มีอยู่ แล้วเติมเข้า ALL_PROJECTS ด้านล่าง
 */

import * as sahaPathanapibul from "./saha-pathanapibul";
import * as internalDevelopmentPlatform from "./internal-development-platform";
import * as grafana from "./grafana";
import * as cancerPatientHealthcareSystems from "./cancer-patient-healthcare-systems";
import * as masseuseshop from "./masseuseshop";
import * as khungameRestaurant from "./khungame-restaurant";

const ALL_PROJECTS = [
  sahaPathanapibul,
  internalDevelopmentPlatform,
  grafana,
  cancerPatientHealthcareSystems,
  masseuseshop,
  khungameRestaurant,
];

export const REAL_PROJECT_CARDS = ALL_PROJECTS.map((p) => p.card);
export const REAL_PROJECT_CASE_STUDIES = ALL_PROJECTS.map((p) => p.caseStudy);
