package httpapi

import (
	"encoding/json"
	"io"
	"net/http"
	"net/mail"
	"strconv"
	"strings"

	"github.com/go-chi/chi/v5"

	"myportfolio/backend/internal/model"
)

func (a *API) health(w http.ResponseWriter, r *http.Request) {
	if err := a.store.DB.PingContext(r.Context()); err != nil {
		writeError(w, http.StatusServiceUnavailable, "database unavailable")
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

// home รวมทุกอย่างที่หน้าแรกต้องใช้ไว้ใน response เดียว
func (a *API) home(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	settings, err := a.store.Settings(ctx)
	if err != nil {
		serverError(w, err)
		return
	}
	services, err := a.store.Services(ctx)
	if err != nil {
		serverError(w, err)
		return
	}
	skills, err := a.store.Skills(ctx)
	if err != nil {
		serverError(w, err)
		return
	}
	projects, err := a.store.Projects(ctx, "", true, 5)
	if err != nil {
		serverError(w, err)
		return
	}
	testimonials, err := a.store.Testimonials(ctx)
	if err != nil {
		serverError(w, err)
		return
	}

	w.Header().Set("Cache-Control", "public, max-age=60")
	writeJSON(w, http.StatusOK, model.Home{
		Settings:     settings,
		Services:     services,
		Skills:       skills,
		Projects:     projects,
		Testimonials: testimonials,
	})
}

func (a *API) projects(w http.ResponseWriter, r *http.Request) {
	limit := 0
	if raw := r.URL.Query().Get("limit"); raw != "" {
		if n, err := strconv.Atoi(raw); err == nil && n > 0 && n <= 100 {
			limit = n
		}
	}

	items, err := a.store.Projects(r.Context(), r.URL.Query().Get("category"), false, limit)
	if err != nil {
		serverError(w, err)
		return
	}

	w.Header().Set("Cache-Control", "public, max-age=60")
	writeJSON(w, http.StatusOK, map[string]any{"projects": items})
}

func (a *API) project(w http.ResponseWriter, r *http.Request) {
	p, found, err := a.store.ProjectBySlug(r.Context(), chi.URLParam(r, "slug"))
	if err != nil {
		serverError(w, err)
		return
	}
	if !found {
		writeError(w, http.StatusNotFound, "project not found")
		return
	}

	w.Header().Set("Cache-Control", "public, max-age=300")
	writeJSON(w, http.StatusOK, p)
}

func (a *API) experience(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	items, err := a.store.Experiences(ctx)
	if err != nil {
		serverError(w, err)
		return
	}
	skills, err := a.store.Skills(ctx)
	if err != nil {
		serverError(w, err)
		return
	}

	w.Header().Set("Cache-Control", "public, max-age=300")
	writeJSON(w, http.StatusOK, map[string]any{"experiences": items, "skills": skills})
}

func (a *API) contact(w http.ResponseWriter, r *http.Request) {
	// จำกัดขนาด body ก่อน decode กัน payload ใหญ่ผิดปกติ
	var in model.ContactInput
	if err := json.NewDecoder(io.LimitReader(r.Body, 32<<10)).Decode(&in); err != nil {
		writeError(w, http.StatusBadRequest, "invalid json")
		return
	}

	// honeypot: ฟิลด์นี้ถูกซ่อนจากคน ถ้ามีค่าแปลว่าเป็น bot — ตอบ 200 ไปเฉยๆ ไม่ให้รู้ว่าโดนจับได้
	if strings.TrimSpace(in.Website) != "" {
		writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
		return
	}

	if msg := validateContact(&in); msg != "" {
		writeError(w, http.StatusUnprocessableEntity, msg)
		return
	}

	ip := r.RemoteAddr // middleware.RealIP ตั้งค่านี้ให้แล้วเมื่ออยู่หลัง proxy
	if !a.rl.allow(ip) {
		writeError(w, http.StatusTooManyRequests, "Too many messages. Please try again later.")
		return
	}

	if err := a.store.InsertContact(r.Context(), in, ip); err != nil {
		serverError(w, err)
		return
	}
	writeJSON(w, http.StatusCreated, map[string]string{"status": "ok"})
}

// validateContact ตัดช่องว่างหัวท้ายให้ในตัว และคืนข้อความ error ตัวแรกที่เจอ ("" = ผ่าน)
func validateContact(in *model.ContactInput) string {
	in.Name = strings.TrimSpace(in.Name)
	in.Email = strings.TrimSpace(in.Email)
	in.Subject = strings.TrimSpace(in.Subject)
	in.Message = strings.TrimSpace(in.Message)

	switch {
	case in.Name == "" || len([]rune(in.Name)) > 100:
		return "Please enter a name of no more than 100 characters."
	case in.Email == "" || len(in.Email) > 254:
		return "Please enter an email address."
	case len([]rune(in.Subject)) > 150:
		return "The subject must be no more than 150 characters."
	case len([]rune(in.Message)) < 5 || len([]rune(in.Message)) > 5000:
		return "The message must be between 5 and 5,000 characters."
	}
	if _, err := mail.ParseAddress(in.Email); err != nil {
		return "Please enter a valid email address."
	}
	return ""
}
