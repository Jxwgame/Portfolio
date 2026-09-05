-- เนื้อหาหน้า Help — บันทึกการอัปเดตเว็บ (site_updates)
--
-- ตารางนี้เก็บสองภาษาไว้ในแถวเดียว (คอลัมน์ *_en / *_th) ต่างจากตารางอื่นในระบบที่เก็บอังกฤษ
-- อย่างเดียวแล้วปล่อยให้ไทยอยู่ใน frontend/src/lib/i18n/th.ts เพราะแถวพวกนี้จะถูกเพิ่มเรื่อย ๆ
-- ทุกครั้งที่เว็บมีการอัปเดต ถ้าแยกภาษาไทยไปไว้ในโค้ดจะต้องแก้สองที่ทุกครั้ง และมีโอกาสที่
-- แถวใหม่จะโผล่เฉพาะหน้าอังกฤษ ส่วนหน้าไทยว่างเปล่า
--
-- วิธีเพิ่มบันทึกการอัปเดตใหม่: สร้าง migration ถัดไป (scripts\new-site-update.ps1 สร้างโครงให้ได้)
-- แล้ว INSERT ลง site_updates — backend รัน migration ตอนบูตอยู่แล้ว พอ deploy รอบถัดไปแถวใหม่
-- จะขึ้นหน้า /help และ /th/help เองโดยไม่ต้องแก้โค้ด

-- kind ใช้เลือกสี/ป้ายกำกับฝั่ง frontend: 'feature' | 'improvement' | 'fix' | 'content'
-- released_at เก็บเป็น 'YYYY-MM-DD' (เรียงแบบ string ได้ตรงกับเรียงตามเวลา)
CREATE TABLE IF NOT EXISTS site_updates (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    version     TEXT    NOT NULL DEFAULT '',
    kind        TEXT    NOT NULL DEFAULT 'feature',
    title_en    TEXT    NOT NULL,
    title_th    TEXT    NOT NULL,
    body_en     TEXT    NOT NULL DEFAULT '',
    body_th     TEXT    NOT NULL DEFAULT '',
    released_at TEXT    NOT NULL,
    published   INTEGER NOT NULL DEFAULT 1,
    created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_site_updates_list
    ON site_updates (published, released_at, id);

INSERT INTO site_updates (version, kind, title_en, title_th, body_en, body_th, released_at) VALUES
('v0.1.0', 'feature',
 'Site launched',
 'เปิดตัวเว็บไซต์',
 'First public version: a Next.js frontend on top of a Go API backed by SQLite, covering the home, about, skills, work, and contact pages.',
 'เวอร์ชันแรกที่เปิดให้เข้าชม frontend เป็น Next.js ต่อกับ API ที่เขียนด้วย Go และใช้ SQLite เก็บข้อมูล ครอบคลุมหน้าแรก เกี่ยวกับผม ทักษะ ผลงาน และติดต่อ',
 '2026-08-16'),
('v0.2.0', 'feature',
 'Thai version of every page',
 'เพิ่มภาษาไทยครบทุกหน้า',
 'Added a full Thai counterpart for every page under /th, plus a language switch in the sidebar.',
 'เพิ่มหน้าเวอร์ชันไทยครบทุกหน้าใต้ /th พร้อมปุ่มสลับภาษาบนแถบเมนูด้านซ้าย',
 '2026-08-17'),
('v0.3.0', 'feature',
 'Case study pages for project work',
 'หน้ารายละเอียดโปรเจกต์',
 'Project pages gained three case study layouts with an image gallery and a full-size lightbox for diagrams and screenshots.',
 'หน้าโปรเจกต์มีเลย์เอาต์ case study 3 แบบ พร้อมแกลเลอรีรูปและ lightbox สำหรับดูไดอะแกรมและสกรีนช็อตขนาดเต็ม',
 '2026-08-18'),
('v0.4.0', 'content',
 'ERP-Hotel case study added',
 'เพิ่ม case study ของ ERP-Hotel',
 'A write-up of the hotel ERP/PMS project: bookings, front desk, stays, billing, night audit, and analytics in one connected workflow.',
 'เพิ่มรายละเอียดโปรเจกต์ ERP/PMS สำหรับโรงแรม ครอบคลุมการจอง งานหน้าเคาน์เตอร์ การเข้าพัก การวางบิล night audit และการวิเคราะห์ผลในเวิร์กโฟลว์เดียวกัน',
 '2026-09-05'),
('v0.4.1', 'fix',
 'Steadier case study image frame',
 'กรอบรูปใน case study นิ่งขึ้น',
 'The hero gallery now uses a fixed frame, so switching between a square logo and a wide screenshot no longer resizes the page around it.',
 'แกลเลอรีรูปด้านบนใช้กรอบขนาดคงที่แล้ว การสลับระหว่างโลโก้จัตุรัสกับสกรีนช็อตแนวนอนจึงไม่ดันเนื้อหารอบ ๆ ให้ขยับอีกต่อไป',
 '2026-09-05'),
('v0.5.0', 'feature',
 'Update log on the help page',
 'บันทึกการอัปเดตบนหน้าช่วยเหลือ',
 'The help page now reads from SQLite and lists every site update, newest first - the log you are reading right now.',
 'หน้าช่วยเหลืออ่านข้อมูลจาก SQLite แล้ว และแสดงบันทึกการอัปเดตเว็บทุกครั้ง เรียงใหม่สุดขึ้นก่อน คือรายการที่คุณกำลังอ่านอยู่นี้',
 '2026-09-05');
