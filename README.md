# MyPortfolio

เว็บพอร์ตโฟลิโอ — Go (chi + SQLite) เป็น API, Next.js App Router เป็นหน้าเว็บ รองรับสองภาษา (EN `/`, TH `/th`)

- แผนดีไซน์และโครงสร้างหน้า: [docs/design-plan.md](docs/design-plan.md)
- HTML mock ของหน้าแรก: [docs/mock/index.html](docs/mock/index.html)

## โครงสร้าง

```
backend/     Go API — chi, modernc.org/sqlite (pure Go, ไม่ต้องมี CGO)
frontend/    Next.js 16 + Tailwind v4
docs/        แผนงานและ mock
design/      ไฟล์ design canvas (.dc.html) + ภาพอ้างอิงของ layout-4
output/      ไฟล์ที่ generate ระหว่างทำงาน (ไม่ได้ถูกเว็บเรียกใช้)
scripts/     สคริปต์ PowerShell สำหรับ dev (ใช้ผ่าน Makefile)
render.yaml  ตั้งค่า deploy backend บน Render
```

## รันครั้งแรก

**1. Backend** — migration + seed จะรันอัตโนมัติตอน start

```bash
cd backend && go run ./cmd/server
```

ค่าเริ่มต้นคือพอร์ต `8080` และฐานข้อมูลที่ `backend/data/portfolio.db`

backend อ่านค่าจาก environment variable ตรง ๆ (ไม่มีตัวโหลดไฟล์ `.env`) — `backend/.env.example`
เป็นเอกสารบอกว่ามีคีย์อะไรบ้าง ถ้าจะเปลี่ยนค่าให้ตั้งเป็น env var เอง เช่น `PORT=9080 go run ./cmd/server`
(ตอน deploy บน Render ค่าเหล่านี้ตั้งไว้ใน `render.yaml`)

**2. Frontend** — คัดลอก `.env.example` เป็น `.env.local` ก่อน

```bash
cd frontend && cp .env.example .env.local && npm install && npm run dev
```

ค่าเริ่มต้นคือพอร์ต `3000` และเรียก API ที่ `http://localhost:8080`

### หรือเปิดทั้งสองฝั่งพร้อมกันด้วย make (Windows)

```bash
make up        # เช็ก port -> kill ตัวที่ชน -> เปิด backend + frontend
make status    # ดูว่าฟัง port อยู่ไหม
make down      # ปิดทั้งหมด
```

`make` ใช้พอร์ต `9080` (backend) และ `9000` (frontend) โดยตั้งใจเลี่ยงพอร์ต `8080/3000`
ไม่ให้ชนกับโปรเจกต์อื่นที่เปิดค้างอยู่ — เปลี่ยนได้ด้วย `make up BACKEND_PORT=... FRONTEND_PORT=...`
log และ pid ของโหมดนี้อยู่ใน `.dev/` (ไม่ถูก commit)

เพราะพอร์ตไม่เท่ากับค่า default ถ้าใช้ `make up` ต้องตั้ง `API_URL=http://localhost:9080`
ใน `frontend/.env.local` ด้วย ไม่งั้น frontend จะยิงไป `8080` ที่ไม่มีอะไรฟังอยู่

## API

| Method | Path | คำอธิบาย |
|---|---|---|
| GET | `/healthz` | เช็คสถานะ + ping ฐานข้อมูล |
| GET | `/api/v1/home` | ข้อมูลทั้งหมดของหน้าแรกในก้อนเดียว |
| GET | `/api/v1/projects?category=&limit=` | รายการผลงาน |
| GET | `/api/v1/projects/{slug}` | ผลงานรายชิ้น |
| GET | `/api/v1/experience` | ประสบการณ์ + สกิล |
| GET | `/api/v1/help` | บันทึกการอัปเดตเว็บ (หน้า /help) |
| POST | `/api/v1/contact` | ฟอร์มติดต่อ (มี honeypot + rate limit 5 ครั้ง/ชม. ต่อ IP) |

### Environment

| ตัวแปร | ฝั่ง | ค่าเริ่มต้น | คำอธิบาย |
|---|---|---|---|
| `PORT` | backend | `8080` | พอร์ตที่ API ฟัง |
| `DB_PATH` | backend | `./data/portfolio.db` | ไฟล์ SQLite |
| `APP_ENV` | backend | `development` | `production` เมื่อ deploy |
| `ALLOWED_ORIGINS` | backend | ว่าง | ใส่เมื่อจำเป็นต้องให้ browser เรียก API ตรง (คั่นด้วยจุลภาค) |
| `API_URL` | frontend | `http://localhost:8080` | URL ของ Go API |

`API_URL` ใช้ฝั่ง server ของ Next เท่านั้น ไม่ใช่ `NEXT_PUBLIC_*` เพื่อไม่ให้ URL จริงหลุดไป browser

## เพิ่มบันทึกการอัปเดตเว็บ

สร้าง migration ที่ทำให้รายการขึ้นหน้า `/help` และ `/th/help`:

```bash
make update-note TITLE_EN="..." TITLE_TH="..." BODY_EN="..." BODY_TH="..." VERSION=v0.6.0 KIND=feature
```

`KIND` เลือกได้: `feature` | `improvement` | `fix` | `content` (ไม่ใส่ = `feature`)

## หมายเหตุ

- ฐานข้อมูลอยู่ที่ `backend/data/portfolio.db` — แบ็กอัพคือคัดลอกไฟล์ (ไม่ถูก commit)
- แก้ schema ได้โดยเพิ่มไฟล์ `backend/migrations/000N_*.sql` แล้ว restart server
- ไฟล์ที่ไม่ถูก commit โดยตั้งใจ: `.env` / `.env.local` (ค่าจริง), `backend/data/` (ฐานข้อมูล),
  `.dev/` (log + pid), `node_modules/`, `.next/` — ดู `.gitignore`
- ไฟล์ `.env.example` ทั้งสองฝั่งถูก commit โดยตั้งใจ เพราะมีแค่ชื่อคีย์กับค่า localhost ไม่มีความลับ
