-- ข้อมูลตัวอย่าง ให้หน้าเว็บมีของแสดงตั้งแต่รันครั้งแรก (แก้ทีหลังได้)

INSERT INTO settings (key, value) VALUES
    ('site.name',        'Theerapat'),
    ('site.role',        'Full-Stack Developer'),
    ('hero.eyebrow',     'Software engineering that'),
    ('hero.title',       'Ships Ideas.'),
    ('hero.intro',       'ผมสร้างเว็บและระบบหลังบ้านที่เร็ว อ่านง่าย และดูแลต่อได้จริง'),
    ('about.heading',    'Hi, I"m Theerapat Sangsee'),
    ('about.body',       'ผมทำงานกับทั้งฝั่งหน้าบ้านและหลังบ้าน ชอบโครงสร้างที่เรียบง่าย เลือกเครื่องมือเท่าที่จำเป็น'),
    ('stat.years',       '8'),
    ('stat.projects',    '120'),
    ('stat.clients',     '45'),
    ('contact.email',    'hello@example.com'),
    ('contact.phone',    '+66 00 000 0000'),
    ('contact.location', 'Bangkok, Thailand');

INSERT INTO services (icon, title, description, sort_order) VALUES
    ('component', 'Design System',  'คอมโพเนนต์ที่ใช้ซ้ำได้ ทีมทำงานต่อได้ทันที',              1),
    ('code',      'Development',    'พัฒนาเว็บแอปและระบบหลังบ้านครบวงจร ตั้งแต่ออกแบบ UI จนถึง deploy', 2),
    ('server',    'Infrastructure', 'วางระบบเซิร์ฟเวอร์และ deployment ให้พร้อมใช้งาน ปลอดภัย และสเกลได้', 3),
    ('workflow',  'Automation',     'เขียนสคริปต์และ workflow อัตโนมัติ ลดงานซ้ำด้วย CI/CD',     4);

INSERT INTO skills (name, level, group_name, sort_order) VALUES
    ('Go',            95, 'backend',  1),
    ('TypeScript',    90, 'frontend', 2),
    ('Next.js',       88, 'frontend', 3),
    ('SQL / SQLite',  80, 'backend',  4),
    ('UI / Tailwind', 85, 'frontend', 5);

INSERT INTO projects (slug, title, category, summary, cover_url, year, role, tools_json, featured, sort_order) VALUES
    ('future-habitats', 'Future Habitats', 'Web Platform',  'แพลตฟอร์มจัดการโครงการที่อยู่อาศัย', '', 2025, 'Full-Stack', '["Next.js","Go","SQLite"]', 1, 1),
    ('velocity',        'Velocity',        'Product Launch','เว็บเปิดตัวสินค้าพร้อมระบบ pre-order', '', 2025, 'Frontend',   '["Next.js","Tailwind"]',    1, 2),
    ('orbital',         'Orbital',         'Dashboard',     'แดชบอร์ดสรุปข้อมูลแบบเรียลไทม์',      '', 2024, 'Full-Stack', '["Go","React"]',            1, 3),
    ('elevate',         'Elevate',         'API Service',   'บริการ API สำหรับระบบสมาชิก',        '', 2024, 'Backend',    '["Go","PostgreSQL"]',       1, 4),
    ('nexus',           'Nexus',           'Design System', 'ดีไซน์ซิสเต็มและคอมโพเนนต์กลาง',       '', 2023, 'Frontend',   '["React","Storybook"]',     1, 5);

INSERT INTO experiences (company, role, start_date, end_date, description, sort_order) VALUES
    ('Freelance',     'Full-Stack Developer', '2022', 'Present', 'รับงานพัฒนาเว็บและระบบหลังบ้านให้ลูกค้าหลายอุตสาหกรรม', 1),
    ('Company Name',  'Software Engineer',    '2019', '2022',    'ดูแลระบบหลักและปรับปรุงประสิทธิภาพของบริการ',          2);

INSERT INTO testimonials (name, role, company, quote, sort_order) VALUES
    ('ชื่อลูกค้า A', 'Product Lead',   'Company', 'ทำงานเร็ว สื่อสารชัด และคิดเผื่อปัญหาที่เรายังไม่ทันเห็น',           1),
    ('ชื่อลูกค้า B', 'Founder',        'Startup', 'ส่งงานตรงเวลา คุณภาพเกินที่คุยกันไว้ ระบบยังใช้ต่อได้สบายจนถึงวันนี้', 2),
    ('ชื่อลูกค้า C', 'Marketing Lead', 'Agency',  'อธิบายเรื่องเทคนิคให้ทีมที่ไม่ใช่สายเทคเข้าใจได้ ตัดสินใจง่ายขึ้นมาก', 3);
