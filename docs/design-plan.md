# MyPortfolio — แผนโครงสร้างการแสดงผล (Display Structure Plan)

เอกสารนี้กำหนด **โทนสี / ระบบดีไซน์ / โครงสร้างหน้า / คอมโพเนนต์ / API contract** ก่อนลงมือเขียนโค้ด
Reference ดีไซน์: high-speed rail / modern train (steel white + navy + rail blue, track/grain motif)

> **ข้อสมมติ (ปรับได้)** — เนื้อหาเป็น portfolio สาย dev/designer โดยยึด nav 6 ตัวจาก reference
> (Home / About / Services / Work / Experience / Contact) ถ้าสายงานต่างจากนี้ เปลี่ยนแค่ "เนื้อหาใน section"
> โครงสร้าง layout ทั้งหมดยังใช้ได้เหมือนเดิม

---

## 1. Design Tokens

### 1.1 Color palette

| Token | Hex | ใช้กับ |
|---|---|---|
| `--color-paper` | `#EEF1F6` | พื้นหลัง band สว่าง (hero, services, work) — ขาวเหล็ก/ชานชาลา |
| `--color-paper-2` | `#DDE5ED` | card / surface บนพื้นสว่าง |
| `--color-ink` | `#0A1220` | พื้นหลัง band มืด + ตัวอักษรบนพื้นสว่าง — กราไฟต์/เนวี่เข้ม |
| `--color-ink-2` | `#121C2E` | card / surface บนพื้นมืด |
| `--color-rust` | `#0B7EC8` | **accent หลัก** — CTA, ตัวเลขสถิติ, จุด, เส้น highlight — น้ำเงินรถไฟความเร็วสูง |
| `--color-rust-deep` | `#085A92` | hover / gradient ปลายล่างของ CTA band |
| `--color-sun` | `#E4002B` | accent รอง — ควอเตอร์เซอร์เคิล, ชิปไอคอนสถิติ, ของตกแต่ง (Hero/About เท่านั้น) — แดงสัญญาณ |
| `--color-sand` | `#94A7BD` | เส้นคั่น, icon stroke, label รอง — เทาเหล็ก |
| `--color-muted-dark` | `#7E8FA6` | ตัวอักษรรองบนพื้นมืด |
| `--color-muted-light` | `#526175` | ตัวอักษรรองบนพื้นสว่าง |
| `--color-line` | `#00000014` / `#FFFFFF1F` | hairline 1px (light / dark) |

กติกาการใช้สี:
- accent `rust` ใช้ **ไม่เกิน ~8%** ของพื้นที่จอ — เอาไว้ชี้ตำแหน่งที่ต้องการให้คลิก/อ่านก่อน
- ทุก section ต้องเลือกได้ว่าเป็น `theme-light` (paper) หรือ `theme-dark` (ink) แล้วสีลูกทั้งหมดอ่านจาก token เดียวกัน → สลับ band ได้อิสระ

### 1.2 Section rhythm (สำคัญที่สุดของหน้ายาว)

หน้ายาวอ่านง่ายเพราะ **สลับ band สว่าง–มืด** ไม่ใช่เพราะเอฟเฟกต์:

```
HERO      light  (paper)
ABOUT     sand   (paper-2 — ครีมเข้มกว่า Hero เล็กน้อย คั่นด้วย hairline บนสุด)
SERVICES  light
SKILLS    dark
WORK      light
TESTIM.   dark
CTA       rust (เต็มแถบสีส้ม)
FOOTER    dark
```

> **ข้อยกเว้นที่ตัดสินใจร่วมกัน**: เดิม About เป็นแถบมืดเพื่อรักษาจังหวะสลับสี แต่ตามการอ้างอิงดีไซน์คอลลาจ
> (ตัวอักษรใหญ่ + รูปภาพซ้อนชั้น + การ์ดไอคอนสี) Hero กับ About ต้องเป็นโทนครีมต่อเนื่องกัน คั่นด้วยเส้นบางแทนการสลับสี
> ผลคือมี 3 แถบโทนสว่างติดกันก่อนแถบมืดแรก (Hero → About → Services) — ยอมรับ trade-off นี้แล้ว
> ส่วน Services/Skills/Work/Testimonials/CTA/Footer ที่เหลือยังคงจังหวะเดิมทั้งหมด

### 1.3 Typography

| Role | Font | ขนาด |
|---|---|---|
| Display | `Anton` / `Archivo Black` (condensed หนา, uppercase) | `clamp(3.5rem, 9vw, 8rem)`, leading `0.88`, tracking `-0.02em` |
| Heading | `Space Grotesk` | h2 `clamp(2rem,4vw,3.25rem)` / h3 `1.5rem` |
| Body | `Inter` + `IBM Plex Sans Thai` (fallback ภาษาไทย) | `1rem` leading `1.7`, ความกว้างสูงสุด `65ch` |
| Label / eyebrow | `JetBrains Mono` uppercase | `0.75rem`, tracking `0.18em`, สี `rust` หรือ `sand` |

โหลดผ่าน `next/font/google` (self-host อัตโนมัติ ไม่มี layout shift)

### 1.4 Spacing / shape / texture

- Container: `max-w-[1280px]`, padding `px-5 md:px-10`
- ระยะระหว่าง section: `py-20 md:py-32` (band มืดใช้ค่ามากกว่าเล็กน้อยเพื่อให้ "หนัก")
- Radius: การ์ด `rounded-none`–`rounded-md` (ดีไซน์แนว editorial ชอบมุมคม), ปุ่ม/badge `rounded-full`
- Border: hairline `1px` สี `--color-line` — ใช้แทน shadow เกือบทั้งหมด
- **Grain overlay**: `<div>` fixed, `pointer-events-none`, noise SVG/PNG data-uri, `opacity .05–.08`, `mix-blend-mode: multiply`
- **Track motif**: SVG รางรถไฟมุมสายตา (vanishing point) stroke 1px + ไม้หมอน + จุดไฟสัญญาณ วางเป็น background ของ section (absolute, `-z-10`, ไม่รับ event)
- **Section rail** (เส้นตกแต่งริมซ้าย): แต่ละ section มีเลขลำดับ `01`–`07` + เส้นดิ่ง **2px** ปลายมน
  ใช้ `--line-strong` (ดำ 30% บนแถบสว่าง / ขาว 38% บนแถบมืด) ไม่ใช่ `--line` เพราะต้องเห็นชัดในตัวเอง
  วางยึดกับขอบซ้ายของ container ด้วย `left-[calc(50%-696px)]` เส้นจึงขยับตามเนื้อหาทุกความกว้างจอ
  อยู่ข้างใน `<Section>` จึงได้สีพื้นของแถบนั้นมาเอง — section แรกมีจุด + ลูกศร + `SCROLL DOWN` เพิ่ม
  แสดงที่ **≥1440px เท่านั้น** เพราะต่ำกว่านั้นช่องว่างข้าง container (1280px) เหลือไม่พอ เส้นจะเบียดตัวหนังสือ

### 1.5 `globals.css` (Tailwind v4 — พร้อมวาง)

```css
@import "tailwindcss";

@theme {
  --color-paper:       #EEF1F6;
  --color-paper-2:     #DDE5ED;
  --color-ink:         #0A1220;
  --color-ink-2:       #121C2E;
  --color-rust:        #0B7EC8;
  --color-rust-deep:   #085A92;
  --color-sand:        #94A7BD;
  --color-muted-dark:  #7E8FA6;
  --color-muted-light: #526175;

  --font-display: var(--font-anton), sans-serif;
  --font-sans:    var(--font-inter), var(--font-plex-thai), sans-serif;
  --font-heading: var(--font-space-grotesk), sans-serif;
  --font-mono:    var(--font-jetbrains), monospace;

  --spacing-section:    5rem;   /* py-20 */
  --spacing-section-lg: 8rem;   /* py-32 */
}

/* section เป็นตัวกำหนดสีให้ลูกทั้งหมด — สลับ band ได้โดยไม่แตะคลาสข้างใน */
@layer components {
  .theme-light { --bg: var(--color-paper); --fg: var(--color-ink);   --muted: var(--color-muted-light); --line: #00000014; }
  .theme-dark  { --bg: var(--color-ink);   --fg: var(--color-paper); --muted: var(--color-muted-dark);  --line: #FFFFFF1F; }
  .theme-rust  { --bg: var(--color-rust);  --fg: var(--color-ink);   --muted: #00000099;               --line: #00000026; }
}
```

### 1.6 Motion

| ที่ไหน | อะไร |
|---|---|
| เข้าสู่ section | fade + translateY 16px, stagger 60ms (IntersectionObserver ตัวเดียว reuse) |
| ตัวเลขสถิติ (8+ / 120+ / 45+) | count-up เมื่อเข้า viewport ครั้งแรก |
| Skill bar | animate `scaleX` จาก 0 → % |
| Project card | hover: cover zoom 1.04 + ปุ่ม play เด้ง |
| ทั้งหมด | เคารพ `prefers-reduced-motion: reduce` → ปิด transform เหลือแค่ opacity |

---

## 2. Route Map

```
/                      หน้ายาว scroll เดียว (8 section + scroll-spy nav)
/about                 ประวัติเต็ม + timeline + ปรัชญาการทำงาน
/services              รายละเอียดบริการแต่ละตัว + ขั้นตอนทำงาน + FAQ
/work                  กริดผลงานทั้งหมด + filter ตาม category
/work/[slug]           case study รายชิ้น
/experience            timeline การทำงาน + skill matrix เต็ม
/contact               ฟอร์มติดต่อ + ช่องทางอื่น
/not-found, /error     สไตล์เดียวกับธีม
```

หน้าย่อย = "โซนเดียวกันแต่ลงลึก" ดังนั้น section บนหน้าแรกต้องมีปุ่มพาไปหน้าย่อยเสมอ
(`MORE ABOUT ME →`, `VIEW ALL WORK →`, `GET IN TOUCH →`)

**Nav behavior**
- หน้าแรก: nav link เป็น anchor `#about`, `#services`, … + scroll-spy ไฮไลต์จุดสีส้มใต้เมนู
- หน้าอื่น: nav link ชี้ไป `/about`, `/services`, … (ตรวจจาก `usePathname()`)
- Header sticky, พื้นหลัง `transparent → paper/90 + backdrop-blur` หลัง scroll 80px
- Mobile: ปุ่ม hamburger → full-screen overlay สีเข้ม, เมนูตัวใหญ่ display font

---

## 3. โครงสร้างหน้าแรก (Homepage — long scroll)

| # | Section | id | Theme | Layout | ข้อมูลจาก |
|---|---|---|---|---|---|
| 0 | Header | – | overlay | logo ซ้าย / nav กลาง / CTA + hamburger ขวา | static |
| 1 | Hero | `#home` | light | 2 คอลัมน์ 55/45 — ซ้าย: eyebrow + squiggle + display 2 บรรทัด + dot-grid ประดับ + intro + ปุ่ม rust "VIEW MY WORK" + badge "เปิดรับงานใหม่" / ขวา: รูปในกรอบเอียงซ้อนวงครีม + ป้ายลอย role + globe + แถบสีเล็ก มุมบนซ้าย: ควอเตอร์เซอร์เคิลสีเหลือง | static/API |
| 2 | About | `#about` | **sand** (ครีมเข้ม ต่อจาก Hero ด้วย hairline) | 2 คอลัมน์ — ซ้าย: รูปกรอบเอียงซ้อนกรอบส้ม + วงเหลือง, ตามด้วย eyebrow/หัวข้อ/ย่อหน้า/ปุ่ม MORE ABOUT ME / ขวา: การ์ดสถิติ 3 ใบ (ไอคอน+เลข+label) ไล่สีชิป rust→sun→ink | `/home` → about |
| 3 | Services | `#services` | light | grid 4 คอลัมน์ (มือถือ 1, tablet 2) — icon วงกลม + ชื่อ + คำอธิบายสั้น, คั่นด้วยเส้นตั้ง dashed | `/home` → services |
| 4 | Skills & Experience | `#experience` | dark | 3 คอลัมน์ — ซ้าย: skill bar 5 แถว (ชื่อ + % + track) / กลาง: ย่อหน้าสรุป + process 4 ขั้น (Ideation→Delivery) เชื่อมด้วยเส้นประ / ขวา: ภาพประกอบวงกลม | `/home` → skills, process |
| 5 | Featured Work | `#work` | light | หัวข้อ + ปุ่ม VIEW ALL WORK ขวาบน, การ์ด 5 ใบเรียงแนวนอน (ใบแรกกว้าง 2 เท่า) — cover + ปุ่ม play + ชื่อ + category | `/home` → featuredProjects |
| 6 | Testimonials | `#testimonials` | dark | 3 คอลัมน์ quote — เครื่องหมายคำพูดสีส้ม + ข้อความ + avatar/ชื่อ/ตำแหน่ง | `/home` → testimonials |
| 7 | CTA | `#contact` | rust | แถบเต็มความกว้าง สีส้ม + texture — หัวข้อใหญ่ซ้าย + ปุ่มดำ GET IN TOUCH ขวา | static |
| 8 | Footer | – | dark | 5 คอลัมน์ (brand / navigation / services / info / social) + แถบ copyright | static |

**หมายเหตุการ implement**
- section 1–8 ทั้งหมดเป็น **Server Component** ดึงข้อมูลจาก `/api/v1/home` ครั้งเดียว (`revalidate: 60`)
- Client Component เฉพาะที่จำเป็น: `<Header/>` (scroll-spy), `<CountUp/>`, `<SkillBar/>`, `<Reveal/>`, `<ContactForm/>`
- ทุก section ห่อด้วย `<Section theme="light|dark" id=...>` ที่คุม padding + สี + orbit background ให้เอง

---

## 4. โครงสร้างหน้าย่อย

| หน้า | โครงสร้าง |
|---|---|
| `/about` | PageHero (dark) → bio ยาว 2 คอลัมน์ + ภาพ → stat row → "How I work" 4 ข้อ → timeline ย่อ → CTA band |
| `/services` | PageHero → service ทีละตัวสลับซ้าย-ขวา (light/dark สลับ) → process 4 ขั้นแบบเต็ม → FAQ accordion → CTA band |
| `/work` | PageHero → filter chip (All / แต่ละ category) → grid 3 คอลัมน์ (masonry-ish: ใบ featured กว้าง 2 ช่อง) → CTA band |
| `/work/[slug]` | cover เต็มจอ + ชื่อ → meta bar (Client / Role / Year / Tools) → เนื้อหา case study (markdown) → gallery → prev/next project → CTA band |
| `/experience` | PageHero → timeline แนวตั้งเส้นเดียว จุดสีส้มต่อ item → skill matrix แบ่งกลุ่ม → เครื่องมือ/ซอฟต์แวร์ → CTA band |
| `/contact` | 2 คอลัมน์ — ซ้าย: ฟอร์ม (name / email / subject / message + ปุ่ม) / ขวา: อีเมล เบอร์ ที่อยู่ social + orbit graphic → สถานะ success/error inline |

**PageHero** = แถบ dark สูง ~40vh: breadcrumb + display heading + คำโปรย 1 บรรทัด — ใช้ซ้ำทุกหน้าย่อยเพื่อความต่อเนื่อง

---

## 5. Component Inventory

```
components/
  layout/     Header  MobileNav  Footer  Section  Container  PageHero  GrainOverlay  OrbitBg
  ui/         (shadcn) button  badge  accordion  input  textarea  label  sonner  skeleton
  common/     Eyebrow  DisplayHeading  ArrowLink  PlayButton  Divider  StatBlock  Squiggle  DotGrid  MediaPlaceholder
  home/       Hero  AboutIntro  ServicesGrid  SkillsExperience  FeaturedWork  Testimonials  CtaBand
  work/       ProjectCard  ProjectGrid  ProjectFilter  CaseStudyMeta  ProjectNav
  motion/     Reveal  CountUp  SkillBar
  contact/    ContactForm
```

shadcn ที่ต้อง `add` จริงๆ มีแค่: `button badge accordion input textarea label sonner skeleton`
ที่เหลือเขียนเองเพราะเป็นรูปทรงเฉพาะของธีมนี้

---

## 6. Backend / Data Contract

### 6.1 Endpoints (Go + chi)

| Method | Path | ใช้ที่ | Cache |
|---|---|---|---|
| GET | `/api/v1/home` | หน้าแรก (payload รวม about/services/skills/featured/testimonials) | ISR 60s |
| GET | `/api/v1/projects?category=&limit=` | `/work` | ISR 60s |
| GET | `/api/v1/projects/{slug}` | `/work/[slug]` + `generateStaticParams` | ISR 300s |
| GET | `/api/v1/experience` | `/experience`, `/about` | ISR 300s |
| POST | `/api/v1/contact` | proxy จาก Next Route Handler `/api/contact` | no-store |
| GET | `/healthz` | monitoring | – |

`/home` เป็น aggregate endpoint ตั้งใจให้ยิงครั้งเดียวจบ — ตรงกับที่วางไว้ว่าใช้ `database/sql` ดิบไม่กี่ query

### 6.2 SQLite schema

```sql
projects(id, slug UNIQUE, title, category, summary, body_md, cover_url, video_url,
         client, role, year, tools_json, featured INT, sort_order INT, published INT, created_at)
services(id, icon, title, description, body_md, sort_order)
skills(id, name, level INT, group_name, sort_order)
experiences(id, company, role, start_date, end_date, description, sort_order)
testimonials(id, name, role, company, quote, avatar_url, sort_order)
settings(key PRIMARY KEY, value)          -- stat ต่างๆ, ข้อความ hero, ข้อมูลติดต่อ
contact_messages(id, name, email, subject, message, created_at, ip)
```

- migration = ไฟล์ `.sql` เรียงเลข รันตอน start (ไม่ต้องมี tool เพิ่ม)
- `tools_json` เก็บ array เป็น JSON string — SQLite ไม่ต้องมีตาราง join สำหรับ 1 ฟิลด์
- `POST /contact`: validate + rate-limit ต่อ IP (in-memory token bucket) + honeypot field

### 6.3 โครงไฟล์

```
backend/
  cmd/server/main.go
  internal/
    http/     router.go  home.go  projects.go  experience.go  contact.go  middleware.go  respond.go
    store/    store.go  queries.go  migrate.go
    model/    model.go
  migrations/  0001_init.sql  0002_seed.sql
  data/        portfolio.db          # gitignore
frontend/
  src/
    app/
      layout.tsx  page.tsx  globals.css
      about/  services/  work/  work/[slug]/  experience/  contact/
      api/contact/route.ts            # proxy → Go
    components/  (ตามข้อ 5)
    lib/        api.ts  types.ts  utils.ts
  public/       images/  noise.png
```

`lib/api.ts` เก็บ `API_BASE` จาก env ฝั่ง server เท่านั้น (`API_URL` ไม่ใช่ `NEXT_PUBLIC_*`) → URL จริงไม่หลุดไป client

---

## 7. Responsive / A11y checklist

- Breakpoint: `sm 640 / md 768 / lg 1024 / xl 1280`
- Hero มือถือ: ภาพขึ้นก่อนหรือหลังข้อความ? → **ข้อความก่อน** ภาพย่อเหลือ ~70vw จัดกลาง
- Services 4→2→1 คอลัมน์, Featured Work บนมือถือเป็น horizontal scroll snap
- Skill bar ใช้ `role="progressbar"` + `aria-valuenow`
- คอนทราสต์: ตรวจ `rust` บน `paper` (ผ่าน AA เฉพาะข้อความ ≥ 18px bold → ห้ามใช้กับ body text บนพื้นสว่าง ให้ใช้ `rust-deep` แทน)
- ทุกภาพมี `alt`, ปุ่ม play มี `aria-label`
- Focus ring: outline 2px สี `rust` offset 2px (ห้าม `outline:none` เปล่าๆ)

---

## 8. ลำดับการลงมือ

1. Scaffold 2 repo + Tailwind v4 `@theme` tokens + font + `Section/Container/GrainOverlay`
2. Header + Footer + CTA band (ใช้ซ้ำทุกหน้า)
3. Backend: migration + seed + `/healthz` + `/api/v1/home`
4. Homepage section 1→8 ต่อ API จริง
5. `/work` + `/work/[slug]` + `generateStaticParams`
6. `/about` `/services` `/experience`
7. `/contact` + route handler proxy + rate limit
8. Motion (`Reveal`, `CountUp`, `SkillBar`) + reduced-motion
9. SEO: metadata ต่อหน้า, OG image, sitemap.ts, robots.ts
10. ตรวจ responsive + a11y + Lighthouse
