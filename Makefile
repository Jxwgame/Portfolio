# เปิด/ปิดโปรเจกต์แบบ dev (backend + frontend)
# ก่อนเปิดหรือปิด จะเช็ก port ที่ใช้อยู่ก่อนเสมอ ถ้ามีอะไรถือ port ไว้ (ชนกัน) จะ kill ทิ้งให้ก่อน
#
#   make up      เช็ก port -> kill ตัวที่ชน -> เปิด backend + frontend
#   make down    เช็ก port -> kill service ที่ยังทำงานอยู่ให้หมด
#   make restart make down แล้วตามด้วย make up
#   make status  ดูว่า backend/frontend ตอนนี้ฟัง port อยู่ไหม
#
#   make update-note TITLE_EN=".." TITLE_TH=".." [BODY_EN=".." BODY_TH=".." VERSION=v0.6.0 KIND=feature]
#                สร้าง migration บันทึกการอัปเดตเว็บ 1 รายการ ให้ขึ้นหน้า /help และ /th/help

# จงใจเลือก port ให้ห่างจาก ERP-Hotel (Makefile ของมันใช้ DEV_PORTS 8080/3000 และ
# DOCKER_PORTS 8000/5433 แล้ว auto-kill ของหรือ port เดิมอยู่แล้ว — ถ้าใช้เลขเดียวกัน
# เปิดโปรเจกต์นี้จะไปฆ่า dev server ของ ERP-Hotel โดยไม่ตั้งใจ และกลับกัน)
BACKEND_PORT ?= 9080
FRONTEND_PORT ?= 9000

SHELL := cmd.exe
.SHELLFLAGS := /C

PS := powershell -NoProfile -ExecutionPolicy Bypass

.PHONY: up down restart status update-note

up:
	$(PS) -File scripts\dev-up.ps1 -BackendPort $(BACKEND_PORT) -FrontendPort $(FRONTEND_PORT)

down:
	$(PS) -File scripts\dev-down.ps1 -BackendPort $(BACKEND_PORT) -FrontendPort $(FRONTEND_PORT)

restart: down up

status:
	$(PS) -File scripts\dev-status.ps1 -BackendPort $(BACKEND_PORT) -FrontendPort $(FRONTEND_PORT)

# KIND: feature | improvement | fix | content (ไม่ใส่ = feature)
update-note:
	$(PS) -File scripts\new-site-update.ps1 -TitleEn "$(TITLE_EN)" -TitleTh "$(TITLE_TH)" -BodyEn "$(BODY_EN)" -BodyTh "$(BODY_TH)" -Version "$(VERSION)" -Kind "$(if $(KIND),$(KIND),feature)"
