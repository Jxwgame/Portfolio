-- โครงสร้างเริ่มต้นของ portfolio

CREATE TABLE IF NOT EXISTS settings (
    key   TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    slug       TEXT NOT NULL UNIQUE,
    title      TEXT NOT NULL,
    category   TEXT NOT NULL DEFAULT '',
    summary    TEXT NOT NULL DEFAULT '',
    body_md    TEXT NOT NULL DEFAULT '',
    cover_url  TEXT NOT NULL DEFAULT '',
    video_url  TEXT NOT NULL DEFAULT '',
    client     TEXT NOT NULL DEFAULT '',
    role       TEXT NOT NULL DEFAULT '',
    year       INTEGER NOT NULL DEFAULT 0,
    tools_json TEXT NOT NULL DEFAULT '[]',
    featured   INTEGER NOT NULL DEFAULT 0,
    sort_order INTEGER NOT NULL DEFAULT 0,
    published  INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_projects_list
    ON projects (published, featured, sort_order);

CREATE TABLE IF NOT EXISTS services (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    icon        TEXT NOT NULL DEFAULT '',
    title       TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    body_md     TEXT NOT NULL DEFAULT '',
    sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS skills (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    level      INTEGER NOT NULL DEFAULT 0,
    group_name TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experiences (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    company     TEXT NOT NULL,
    role        TEXT NOT NULL,
    start_date  TEXT NOT NULL DEFAULT '',
    end_date    TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS testimonials (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    role       TEXT NOT NULL DEFAULT '',
    company    TEXT NOT NULL DEFAULT '',
    quote      TEXT NOT NULL,
    avatar_url TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL,
    subject    TEXT NOT NULL DEFAULT '',
    message    TEXT NOT NULL,
    ip         TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
