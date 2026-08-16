-- Normalize the remaining seeded portfolio content to English.

UPDATE settings
SET value = 'Available for new opportunities'
WHERE key = 'hero.availability' AND value = 'เปิดรับงานใหม่';

UPDATE projects
SET summary = CASE slug
    WHEN 'future-habitats' THEN 'A platform for managing housing development projects'
    WHEN 'velocity' THEN 'A product launch website with a pre-order system'
    WHEN 'orbital' THEN 'A real-time analytics dashboard'
    WHEN 'elevate' THEN 'An API service for membership systems'
    WHEN 'nexus' THEN 'A reusable design system and shared component library'
END
WHERE
    (slug = 'future-habitats' AND summary = 'แพลตฟอร์มจัดการโครงการที่อยู่อาศัย') OR
    (slug = 'velocity' AND summary = 'เว็บเปิดตัวสินค้าพร้อมระบบ pre-order') OR
    (slug = 'orbital' AND summary = 'แดชบอร์ดสรุปข้อมูลแบบเรียลไทม์') OR
    (slug = 'elevate' AND summary = 'บริการ API สำหรับระบบสมาชิก') OR
    (slug = 'nexus' AND summary = 'ดีไซน์ซิสเต็มและคอมโพเนนต์กลาง');

UPDATE experiences
SET description = CASE sort_order
    WHEN 1 THEN 'Developed web applications and backend systems for clients across multiple industries'
    WHEN 2 THEN 'Maintained core systems and improved service performance'
END
WHERE
    (sort_order = 1 AND description = 'รับงานพัฒนาเว็บและระบบหลังบ้านให้ลูกค้าหลายอุตสาหกรรม') OR
    (sort_order = 2 AND description = 'ดูแลระบบหลักและปรับปรุงประสิทธิภาพของบริการ');

UPDATE testimonials
SET
    name = 'Client A',
    quote = 'Works quickly, communicates clearly, and anticipates problems before we see them.'
WHERE name = 'ชื่อลูกค้า A' AND sort_order = 1;

UPDATE testimonials
SET
    name = 'Client B',
    quote = 'Delivered on time and exceeded expectations. The system remains easy to maintain today.'
WHERE name = 'ชื่อลูกค้า B' AND sort_order = 2;

UPDATE testimonials
SET
    name = 'Client C',
    quote = 'Explains technical topics clearly to non-technical teams, making decisions much easier.'
WHERE name = 'ชื่อลูกค้า C' AND sort_order = 3;
