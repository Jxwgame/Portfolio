package store

import (
	"context"
	"database/sql"
	"encoding/json"

	"myportfolio/backend/internal/model"
)

func (s *Store) Settings(ctx context.Context) (map[string]string, error) {
	rows, err := s.DB.QueryContext(ctx, `SELECT key, value FROM settings`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	out := map[string]string{}
	for rows.Next() {
		var k, v string
		if err := rows.Scan(&k, &v); err != nil {
			return nil, err
		}
		out[k] = v
	}
	return out, rows.Err()
}

func (s *Store) Services(ctx context.Context) ([]model.Service, error) {
	rows, err := s.DB.QueryContext(ctx,
		`SELECT icon, title, description FROM services ORDER BY sort_order`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	out := []model.Service{}
	for rows.Next() {
		var v model.Service
		if err := rows.Scan(&v.Icon, &v.Title, &v.Description); err != nil {
			return nil, err
		}
		out = append(out, v)
	}
	return out, rows.Err()
}

func (s *Store) Skills(ctx context.Context) ([]model.Skill, error) {
	rows, err := s.DB.QueryContext(ctx,
		`SELECT name, level, group_name FROM skills ORDER BY sort_order`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	out := []model.Skill{}
	for rows.Next() {
		var v model.Skill
		if err := rows.Scan(&v.Name, &v.Level, &v.Group); err != nil {
			return nil, err
		}
		out = append(out, v)
	}
	return out, rows.Err()
}

func (s *Store) Testimonials(ctx context.Context) ([]model.Testimonial, error) {
	rows, err := s.DB.QueryContext(ctx,
		`SELECT name, role, company, quote, avatar_url FROM testimonials ORDER BY sort_order`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	out := []model.Testimonial{}
	for rows.Next() {
		var v model.Testimonial
		if err := rows.Scan(&v.Name, &v.Role, &v.Company, &v.Quote, &v.AvatarURL); err != nil {
			return nil, err
		}
		out = append(out, v)
	}
	return out, rows.Err()
}

func (s *Store) Experiences(ctx context.Context) ([]model.Experience, error) {
	rows, err := s.DB.QueryContext(ctx,
		`SELECT company, role, start_date, end_date, description FROM experiences ORDER BY sort_order`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	out := []model.Experience{}
	for rows.Next() {
		var v model.Experience
		if err := rows.Scan(&v.Company, &v.Role, &v.StartDate, &v.EndDate, &v.Description); err != nil {
			return nil, err
		}
		out = append(out, v)
	}
	return out, rows.Err()
}

const projectCols = `slug, title, category, summary, cover_url, video_url, client, role, year, tools_json, featured`

// Projects คืนผลงานที่ published แล้ว — featuredOnly ใช้กับหน้าแรก, limit<=0 คือไม่จำกัด
func (s *Store) Projects(ctx context.Context, category string, featuredOnly bool, limit int) ([]model.Project, error) {
	q := `SELECT ` + projectCols + ` FROM projects WHERE published = 1`
	args := []any{}
	if featuredOnly {
		q += ` AND featured = 1`
	}
	if category != "" {
		q += ` AND category = ?`
		args = append(args, category)
	}
	q += ` ORDER BY sort_order, id`
	if limit > 0 {
		q += ` LIMIT ?`
		args = append(args, limit)
	}

	rows, err := s.DB.QueryContext(ctx, q, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	out := []model.Project{}
	for rows.Next() {
		p, err := scanProject(rows)
		if err != nil {
			return nil, err
		}
		out = append(out, p)
	}
	return out, rows.Err()
}

// ProjectBySlug คืน (project, false) เมื่อไม่พบ — ให้ handler ตัดสินใจว่าจะตอบ 404 ยังไง
func (s *Store) ProjectBySlug(ctx context.Context, slug string) (model.Project, bool, error) {
	row := s.DB.QueryRowContext(ctx,
		`SELECT `+projectCols+`, body_md FROM projects WHERE slug = ? AND published = 1`, slug)

	var p model.Project
	var tools string
	var featured int
	err := row.Scan(&p.Slug, &p.Title, &p.Category, &p.Summary, &p.CoverURL, &p.VideoURL,
		&p.Client, &p.Role, &p.Year, &tools, &featured, &p.BodyMD)
	if err == sql.ErrNoRows {
		return model.Project{}, false, nil
	}
	if err != nil {
		return model.Project{}, false, err
	}
	p.Featured = featured == 1
	p.Tools = parseTools(tools)
	return p, true, nil
}

func (s *Store) InsertContact(ctx context.Context, in model.ContactInput, ip string) error {
	_, err := s.DB.ExecContext(ctx,
		`INSERT INTO contact_messages (name, email, subject, message, ip) VALUES (?, ?, ?, ?, ?)`,
		in.Name, in.Email, in.Subject, in.Message, ip)
	return err
}

func scanProject(rows *sql.Rows) (model.Project, error) {
	var p model.Project
	var tools string
	var featured int
	if err := rows.Scan(&p.Slug, &p.Title, &p.Category, &p.Summary, &p.CoverURL, &p.VideoURL,
		&p.Client, &p.Role, &p.Year, &tools, &featured); err != nil {
		return p, err
	}
	p.Featured = featured == 1
	p.Tools = parseTools(tools)
	return p, nil
}

// tools_json เก็บเป็น JSON array string — ถ้าพังก็คืน slice ว่างแทนที่จะทำให้ทั้ง request ล้ม
func parseTools(raw string) []string {
	out := []string{}
	if raw == "" {
		return out
	}
	if err := json.Unmarshal([]byte(raw), &out); err != nil {
		return []string{}
	}
	return out
}
