# Prompt: เพิ่มแท็บนำทางริมขวาให้หน้า case study ที่เหลือ

คัดลอกทั้งบล็อกด้านล่างไปวางในเซสชันใหม่ แล้วแก้ค่าใน "ข้อมูลของงานนี้" ให้ตรงกับหน้าที่จะทำ

---

## ข้อมูลของงานนี้ (แก้ตรงนี้)

- layout ที่จะเพิ่มแท็บนำทาง: `<1 | 2 | 3>` (ทำทีละ layout)
- ทำกับทุกโปรเจกต์ที่ใช้ layout นั้น หรือเฉพาะบาง slug: `<ทั้งหมด | ระบุ slug>`

---

## งานที่ต้องทำ

เพิ่มแท็บนำทางริมขวาให้หน้า case study ของ layout ข้างบน โดยใช้คอมโพเนนต์ที่มีอยู่แล้ว
`frontend/src/components/work/layout-4/CaseStudySectionNav.tsx`
**ห้ามเขียนคอมโพเนนต์ใหม่ ห้าม copy โค้ดไปแปะซ้ำ** ให้ import ตัวเดิมไปใช้

ตัวอย่างที่ต่อไว้เสร็จแล้วและใช้อ้างอิงได้: `frontend/src/components/work/layout-4/CaseStudyLayoutFour.tsx`

### คอมโพเนนต์นี้ทำอะไร

- `CaseStudySectionNav` แผงลอยริมขวา แสดงหัวข้อในหน้าพร้อมเลขลำดับ ไฮไลต์หัวข้อที่กำลังอ่านด้วย
  `IntersectionObserver` ย่อ/ขยายได้ ตอนย่อเหลือแค่ปุ่มติดขอบขวา จำสถานะไว้ใน `localStorage`
  (key `case-study-nav-collapsed` ใช้ร่วมกันทุกหน้าโดยตั้งใจ ผู้ใช้เลือกครั้งเดียวแล้วใช้ทั้งเว็บ)
  แสดงเฉพาะจอ `xl` ขึ้นไป
- `CaseStudySectionChips` แถวชิปเลื่อนแนวนอนสำหรับจอที่แคบกว่า `xl` วางไว้ใต้ hero

รับ props แค่ `items: { id: string; label: string }[]` กับ `lang?: "th"`

### ขั้นตอน

1. อ่าน `CaseStudySectionNav.tsx` และ `CaseStudyLayoutFour.tsx` ให้ครบก่อนลงมือ
2. เปิดไฟล์ประกอบหน้าของ layout ที่จะทำ
   - Layout 1: `frontend/src/components/work/layout-1/CaseStudyLayoutOne.tsx`
     (หัวข้อที่มี: timeline, overview, architecture, challenges, tech stack, gallery — บางอันมีเงื่อนไข)
   - Layout 2: `frontend/src/components/work/layout-2/CaseStudyLayoutTwo.tsx`
     (takeaways, การ์ดสรุป, concept overview, feature deep dive, gallery/architecture dashboard, tech stack)
   - Layout 3: `frontend/src/components/work/layout-3/CaseStudyLayoutThree.tsx`
     (การ์ดสรุป, work areas, photo gallery, tech stack, related projects)
3. ครอบแต่ละหัวข้อด้วย `<div id="...">` ใช้ id สั้น ๆ เป็น kebab-case
   ระวังอย่าให้ wrapper ไปทำลาย grid เดิม (Layout 1 ใช้ `grid-rows`/`col-span` อยู่ ถ้าครอบแล้วเลย์เอาต์เพี้ยน
   ให้ใส่ id ลงบนคอมโพเนนต์เดิมผ่าน prop หรือครอบเฉพาะบล็อกที่อยู่นอก grid แทน แล้วบอกผู้ใช้ว่าเลือกวิธีไหน)
4. สร้างรายการแท็บในไฟล์ประกอบหน้า
   - หัวข้อที่มีเงื่อนไข (`study.architecture` ฯลฯ) ต้องหลุดออกจากรายการเมื่อไม่มีข้อมูล ใช้ spread แบบใน Layout 4
   - ป้ายของแท็บให้ดึงจาก eyebrow ของหัวข้อนั้นเป็นหลัก คำบนแท็บจะได้ตรงกับคำที่เห็นตอนเลื่อนไปถึงจริง
   - ถ้าหัวข้อไหนไม่มี eyebrow ให้ใช้ค่าจาก `TH_CASE_STUDY_UI` (ไทย) คู่กับข้อความอังกฤษที่คอมโพเนนต์นั้นใช้อยู่
     ป้ายใหม่ที่ยังไม่มีใน `frontend/src/lib/i18n/th.ts` ให้เพิ่มเข้าไป อย่า hardcode ภาษาไทยในคอมโพเนนต์
5. render `<CaseStudySectionNav items={navItems} lang={lang} />` ที่ระดับ `<main>` **นอก `<Section>`**
   และ `<CaseStudySectionChips items={navItems} />` ไว้ใต้ hero ภายใน `<Container>` ของ section แรก
6. ตรวจงานด้วยคำสั่งจริง ห้ามเดา

```bash
cd frontend && npx tsc --noEmit -p tsconfig.json && npm run lint && npm run build
```

จากนั้นตรวจ HTML ที่ build ออกมาว่ามี `id=` ครบทุกหัวข้อและป้ายไทยขึ้นถูก

```bash
grep -o 'id="[a-z-]*"' .next/server/app/work/<slug>.html | sort | uniq -c
```

### สิ่งที่เคยพลาดในโปรเจกต์นี้ (อ่านก่อนเขียนโค้ด)

- `<Section>` ตั้ง `isolate` ไว้ = สร้าง stacking context ของตัวเอง ถ้า render แท็บไว้ข้างใน section
  จะโดน section ถัดไปวาดทับทันทีที่เลื่อนพ้น ต้องอยู่ระดับ `<main>` เท่านั้น
- เพราะอยู่นอก Section โทเคน `--fg` `--muted` `--line` จึงไม่มีค่า คอมโพเนนต์เลยพก `theme-dark` มาเอง
  พร้อม `bg-transparent` ทับพื้นทึบที่คลาสธีมใส่มาให้ อย่าไปลบสองคลาสนี้ออก ไม่งั้นตัวหนังสือจะหาย
- z-index มีตารางกำหนดไว้ใน `frontend/src/app/globals.css` แท็บใช้ระดับ 40 ห้ามตั้งเลขมั่ว
- `html` ตั้ง `scroll-behavior: smooth` กับ `scroll-padding-top: 96px` ไว้แล้ว การกระโดดหัวข้อจึงไม่ต้องเขียน JS เพิ่ม
- eslint ของโปรเจกต์ถือว่า `setState` ตรง ๆ ใน `useEffect` เป็น error ถ้าต้องแตะ state ตอน mount
  ให้ใช้ `useSyncExternalStore` แบบที่คอมโพเนนต์นี้ทำอยู่
- ตอนนี้มี lint error ค้างอยู่ 3 จุดในไฟล์เดิมของโปรเจกต์ ไม่ต้องไปแก้ แต่ห้ามเพิ่มอันใหม่

### กติกา

- คอมเมนต์ในโค้ดเขียนภาษาไทย โทนเดียวกับไฟล์ข้างเคียง อธิบาย "ทำไม" ไม่ใช่ "ทำอะไร"
- ห้ามใช้ em dash (—) ในข้อความที่แสดงผล
- ห้ามเปิด browser preview เพื่อตรวจงานเอง ให้ตรวจด้วย `tsc` / `lint` / `build` และดู HTML ที่ build ออกมา
- ห้ามแก้ Layout 4 หรือแตะโครงสร้างเดิมของ layout ที่ทำอยู่เกินกว่าการเพิ่ม id กับแท็บ
  ถ้าจำเป็นต้องแก้อย่างอื่น ให้บอกเหตุผลก่อน
