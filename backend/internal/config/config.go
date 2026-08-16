package config

import (
	"os"
	"strings"
)

// Config รวมค่าที่อ่านจาก environment ทั้งหมดไว้ที่เดียว
// ไม่ใช้ไลบรารีเพิ่มเพราะมีแค่ไม่กี่ค่า
type Config struct {
	Addr    string   // ที่อยู่ที่ server bind เช่น ":8080"
	DBPath  string   // path ไฟล์ SQLite
	Origins []string // origin ที่อนุญาตให้เรียกตรงจาก browser (ปกติว่าง เพราะยิงผ่าน Next server)
	Env     string   // "development" | "production"
}

func Load() Config {
	c := Config{
		Addr:   ":" + env("PORT", "8080"),
		DBPath: env("DB_PATH", "./data/portfolio.db"),
		Env:    env("APP_ENV", "development"),
	}
	if raw := env("ALLOWED_ORIGINS", ""); raw != "" {
		for _, o := range strings.Split(raw, ",") {
			if o = strings.TrimSpace(o); o != "" {
				c.Origins = append(c.Origins, o)
			}
		}
	}
	return c
}

func (c Config) IsDev() bool { return c.Env != "production" }

func env(key, fallback string) string {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		return v
	}
	return fallback
}
