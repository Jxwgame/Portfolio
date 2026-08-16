-- ข้อความ teaser ของ About section บนหน้าแรก แยกจาก about.body
-- (about.body ใช้เต็ม ๆ ในหน้า /about แล้ว จะได้ไม่ซ้ำข้อความกัน)

INSERT OR REPLACE INTO settings (key, value) VALUES
    ('home.about.body', 'Although my formal background leans toward Infrastructure, most of my hands-on experience has been in development through assigned projects and the internal tools I have built at work. That is the work I keep coming back to.');
