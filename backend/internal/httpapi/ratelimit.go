package httpapi

import (
	"sync"
	"time"
)

// rateLimiter จำกัดจำนวน request ต่อ IP ในหน้าต่างเวลาที่กำหนด
// เก็บใน memory พอสำหรับ instance เดียว ถ้าวันหลัง scale หลาย instance ค่อยย้ายไป store กลาง
type rateLimiter struct {
	mu     sync.Mutex
	hits   map[string][]time.Time
	limit  int
	window time.Duration
}

func newRateLimiter(limit int, window time.Duration) *rateLimiter {
	return &rateLimiter{hits: map[string][]time.Time{}, limit: limit, window: window}
}

// allow คืน false เมื่อ IP นี้ยิงเกินโควตาแล้ว
func (rl *rateLimiter) allow(key string) bool {
	now := time.Now()
	cutoff := now.Add(-rl.window)

	rl.mu.Lock()
	defer rl.mu.Unlock()

	// เก็บกวาดคีย์ที่หมดอายุทั้งหมด กัน map โตไม่หยุดจาก IP ที่มาครั้งเดียว
	for k, ts := range rl.hits {
		if kept := after(ts, cutoff); len(kept) == 0 {
			delete(rl.hits, k)
		} else {
			rl.hits[k] = kept
		}
	}

	if len(rl.hits[key]) >= rl.limit {
		return false
	}
	rl.hits[key] = append(rl.hits[key], now)
	return true
}

func after(ts []time.Time, cutoff time.Time) []time.Time {
	out := ts[:0]
	for _, t := range ts {
		if t.After(cutoff) {
			out = append(out, t)
		}
	}
	return out
}
