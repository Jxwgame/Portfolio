package store

import (
	"database/sql"
	"fmt"
	"path/filepath"
	"os"

	_ "modernc.org/sqlite" // pure-Go driver: ไม่ต้องมี CGO/gcc
)

type Store struct {
	DB *sql.DB
}

// Open เปิดไฟล์ SQLite (สร้างโฟลเดอร์ให้ถ้ายังไม่มี) แล้วตั้ง pragma ที่จำเป็น
func Open(path string) (*Store, error) {
	if dir := filepath.Dir(path); dir != "" && dir != "." {
		if err := os.MkdirAll(dir, 0o755); err != nil {
			return nil, fmt.Errorf("create data dir: %w", err)
		}
	}

	// WAL = อ่านพร้อมเขียนได้, busy_timeout กัน "database is locked" ตอนมีหลาย request
	dsn := path + "?_pragma=journal_mode(WAL)&_pragma=busy_timeout(5000)&_pragma=foreign_keys(1)"
	db, err := sql.Open("sqlite", dsn)
	if err != nil {
		return nil, err
	}

	// SQLite เขียนได้ทีละ connection อยู่แล้ว จำกัดไว้ให้ชัดดีกว่าปล่อยไม่จำกัด
	db.SetMaxOpenConns(4)
	db.SetMaxIdleConns(4)

	if err := db.Ping(); err != nil {
		db.Close()
		return nil, fmt.Errorf("ping: %w", err)
	}
	return &Store{DB: db}, nil
}

func (s *Store) Close() error { return s.DB.Close() }
