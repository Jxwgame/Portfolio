package store

import (
	"fmt"
	"io/fs"
	"log"
	"sort"

	"myportfolio/backend/migrations"
)

// Migrate รันไฟล์ .sql ใน migrations/ ตามลำดับชื่อ แล้วจดไว้ว่ารันอันไหนไปแล้ว
// ไฟล์ทั้งหมดถูก embed เข้าไบนารี → deploy ด้วยไฟล์เดียวจบ
func (s *Store) Migrate() error {
	if _, err := s.DB.Exec(`CREATE TABLE IF NOT EXISTS schema_migrations (
		name       TEXT PRIMARY KEY,
		applied_at TEXT NOT NULL DEFAULT (datetime('now'))
	)`); err != nil {
		return fmt.Errorf("create schema_migrations: %w", err)
	}

	entries, err := fs.Glob(migrations.FS, "*.sql")
	if err != nil {
		return err
	}
	sort.Strings(entries)

	for _, name := range entries {
		var seen int
		if err := s.DB.QueryRow(`SELECT COUNT(*) FROM schema_migrations WHERE name = ?`, name).Scan(&seen); err != nil {
			return err
		}
		if seen > 0 {
			continue
		}

		body, err := fs.ReadFile(migrations.FS, name)
		if err != nil {
			return err
		}

		tx, err := s.DB.Begin()
		if err != nil {
			return err
		}
		if _, err := tx.Exec(string(body)); err != nil {
			tx.Rollback()
			return fmt.Errorf("apply %s: %w", name, err)
		}
		if _, err := tx.Exec(`INSERT INTO schema_migrations (name) VALUES (?)`, name); err != nil {
			tx.Rollback()
			return err
		}
		if err := tx.Commit(); err != nil {
			return err
		}
		log.Printf("migration applied: %s", name)
	}
	return nil
}
