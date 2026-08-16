-- ส่วน "Workflow line" ในหน้า About ใช้ข้อมูลชุดนี้ — แปล description เป็นภาษาอังกฤษล้วนให้เข้ากับ title ที่เป็นอังกฤษอยู่แล้ว
UPDATE services SET description = 'Reusable components so the team can keep building right away'
    WHERE title = 'Design System';
UPDATE services SET description = 'End-to-end web apps and backend systems, from UI design to deploy'
    WHERE title = 'Development';
UPDATE services SET description = 'Server and deployment setup that is production-ready, secure, and scalable'
    WHERE title = 'Infrastructure';
UPDATE services SET description = 'Scripts and automated workflows that cut repetitive work with CI/CD'
    WHERE title = 'Automation';
