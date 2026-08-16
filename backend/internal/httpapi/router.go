package httpapi

import (
	"net/http"
	"slices"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"myportfolio/backend/internal/config"
	"myportfolio/backend/internal/store"
)

type API struct {
	store *store.Store
	cfg   config.Config
	rl    *rateLimiter
}

func NewRouter(st *store.Store, cfg config.Config) http.Handler {
	api := &API{store: st, cfg: cfg, rl: newRateLimiter(5, time.Hour)}

	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(15 * time.Second))
	if len(cfg.Origins) > 0 {
		r.Use(corsFor(cfg.Origins))
	}

	r.Get("/healthz", api.health)

	r.Route("/api/v1", func(r chi.Router) {
		r.Get("/home", api.home)
		r.Get("/projects", api.projects)
		r.Get("/projects/{slug}", api.project)
		r.Get("/experience", api.experience)
		r.Post("/contact", api.contact)
	})

	return r
}

// corsFor ใช้เฉพาะตอนที่ต้องให้ browser เรียกตรง (เช่น dev tool)
// ปกติ frontend ยิงจาก Next server → ไม่ผ่าน CORS อยู่แล้ว
func corsFor(origins []string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			origin := r.Header.Get("Origin")
			if origin != "" && slices.Contains(origins, origin) {
				w.Header().Set("Access-Control-Allow-Origin", origin)
				w.Header().Set("Vary", "Origin")
				w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
				w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
				w.Header().Set("Access-Control-Max-Age", "300")
			}
			if r.Method == http.MethodOptions {
				w.WriteHeader(http.StatusNoContent)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}
