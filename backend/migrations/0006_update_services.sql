-- อัปเดตหมวด Services จาก Web Application/API & Backend/Landing Page/Design System
-- เป็น Design System/Development/Infrastructure/Automation
DELETE FROM services;

INSERT INTO services (icon, title, description, sort_order) VALUES
    ('component', 'Design System',  'คอมโพเนนต์ที่ใช้ซ้ำได้ ทีมทำงานต่อได้ทันที',              1),
    ('code',      'Development',    'พัฒนาเว็บแอปและระบบหลังบ้านครบวงจร ตั้งแต่ออกแบบ UI จนถึง deploy', 2),
    ('server',    'Infrastructure', 'วางระบบเซิร์ฟเวอร์และ deployment ให้พร้อมใช้งาน ปลอดภัย และสเกลได้', 3),
    ('workflow',  'Automation',     'เขียนสคริปต์และ workflow อัตโนมัติ ลดงานซ้ำด้วย CI/CD',     4);
