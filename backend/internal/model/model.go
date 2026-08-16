// Package model เก็บ struct ที่ถูก serialize เป็น JSON ส่งให้ frontend
// ชื่อฟิลด์ JSON เป็น camelCase เพื่อให้ตรงกับฝั่ง TypeScript
package model

type Project struct {
	Slug     string   `json:"slug"`
	Title    string   `json:"title"`
	Category string   `json:"category"`
	Summary  string   `json:"summary"`
	BodyMD   string   `json:"bodyMd,omitempty"`
	CoverURL string   `json:"coverUrl"`
	VideoURL string   `json:"videoUrl"`
	Client   string   `json:"client,omitempty"`
	Role     string   `json:"role,omitempty"`
	Year     int      `json:"year"`
	Tools    []string `json:"tools"`
	Featured bool     `json:"featured"`
}

type Service struct {
	Icon        string `json:"icon"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

type Skill struct {
	Name  string `json:"name"`
	Level int    `json:"level"`
	Group string `json:"group"`
}

type Experience struct {
	Company     string `json:"company"`
	Role        string `json:"role"`
	StartDate   string `json:"startDate"`
	EndDate     string `json:"endDate"`
	Description string `json:"description"`
}

type Testimonial struct {
	Name      string `json:"name"`
	Role      string `json:"role"`
	Company   string `json:"company"`
	Quote     string `json:"quote"`
	AvatarURL string `json:"avatarUrl"`
}

// Home คือ payload ก้อนเดียวที่หน้าแรกใช้ทั้งหน้า — ยิงครั้งเดียวจบ
type Home struct {
	Settings     map[string]string `json:"settings"`
	Services     []Service         `json:"services"`
	Skills       []Skill           `json:"skills"`
	Projects     []Project         `json:"projects"`
	Testimonials []Testimonial     `json:"testimonials"`
}

// ContactInput คือข้อมูลจากฟอร์มติดต่อ (validate ที่ handler)
type ContactInput struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Subject string `json:"subject"`
	Message string `json:"message"`
	Website string `json:"website"` // honeypot: bot เท่านั้นที่จะกรอก
}
