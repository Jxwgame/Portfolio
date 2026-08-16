package httpapi

import (
	"encoding/json"
	"log"
	"net/http"
)

// writeJSON เขียน response เป็น JSON พร้อม header ที่ถูกต้อง
// ถ้า encode ไม่ผ่านหลังส่ง header ไปแล้ว ทำได้แค่ log — เปลี่ยน status ไม่ได้อีก
func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	if v == nil {
		return
	}
	if err := json.NewEncoder(w).Encode(v); err != nil {
		log.Printf("encode response: %v", err)
	}
}

type errBody struct {
	Error string `json:"error"`
}

func writeError(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, errBody{Error: msg})
}

// serverError ซ่อนรายละเอียด error จริงจาก client แต่ยัง log ไว้ให้เราดู
func serverError(w http.ResponseWriter, err error) {
	log.Printf("server error: %v", err)
	writeError(w, http.StatusInternalServerError, "internal server error")
}
