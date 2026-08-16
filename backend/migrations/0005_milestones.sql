-- จุดบน road-trip timeline — เก็บแบบ generic เพราะยังไม่ล็อกว่ามีแค่ job history หรือผสมประเภทอื่นด้วย
-- category/title/start_date บังคับมี เพราะ animation ต้องใช้ 3 ตัวนี้เสมอ (ไอคอน/ชื่อ/ตำแหน่งบนเส้นทาง)
-- ที่เหลือปล่อย NULL ได้ — frontend เช็คก่อน render เอา (มีค่อยโชว์)
CREATE TABLE IF NOT EXISTS milestones (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    category     TEXT    NOT NULL,   -- 'job' | 'education' | 'certificate' | 'project' | 'award'
    title        TEXT    NOT NULL,
    subtitle     TEXT,
    description  TEXT,
    icon         TEXT,
    start_date   TEXT    NOT NULL,
    end_date     TEXT,
    location     TEXT,
    link_url     TEXT,
    cover_url    TEXT,
    sort_order   INTEGER NOT NULL DEFAULT 0,
    published    INTEGER NOT NULL DEFAULT 1,
    created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_milestones_list
    ON milestones (published, start_date, sort_order);
