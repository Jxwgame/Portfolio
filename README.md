# MyPortfolio

เว็บพอร์ตโฟลิโอ — Go (chi + SQLite) เป็น API, Next.js App Router เป็นหน้าเว็บ

- แผนดีไซน์และโครงสร้างหน้า: [docs/design-plan.md](docs/design-plan.md)
- HTML mock ของหน้าแรก: [docs/mock/index.html](docs/mock/index.html)

## โครงสร้าง

```
backend/    Go API — chi, modernc.org/sqlite (pure Go, ไม่ต้องมี CGO)
frontend/   Next.js 16 + Tailwind v4
docs/       แผนงานและ mock
```

## รันครั้งแรก

**1. Backend** (พอร์ต 8080) — migration + seed จะรันอัตโนมัติตอน start

```bash
cd backend && go run ./cmd/server
```

**2. Frontend** (พอร์ต 3000) — คัดลอก `.env.example` เป็น `.env.local` ก่อนถ้ายังไม่มี

```bash
cd frontend && npm run dev
```

## API

| Method | Path | คำอธิบาย |
|---|---|---|
| GET | `/healthz` | เช็คสถานะ + ping ฐานข้อมูล |
| GET | `/api/v1/home` | ข้อมูลทั้งหมดของหน้าแรกในก้อนเดียว |
| GET | `/api/v1/projects?category=&limit=` | รายการผลงาน |
| GET | `/api/v1/projects/{slug}` | ผลงานรายชิ้น |
| GET | `/api/v1/experience` | ประสบการณ์ + สกิล |
| POST | `/api/v1/contact` | ฟอร์มติดต่อ (มี honeypot + rate limit ต่อ IP) |

## หมายเหตุ

- ฐานข้อมูลอยู่ที่ `backend/data/portfolio.db` — แบ็กอัพคือคัดลอกไฟล์ (ไม่ถูก commit)
- แก้ schema ได้โดยเพิ่มไฟล์ `backend/migrations/000N_*.sql` แล้ว restart server
- `API_URL` ใช้ฝั่ง server ของ Next เท่านั้น ไม่ใช่ `NEXT_PUBLIC_*` เพื่อไม่ให้ URL จริงหลุดไป browser
