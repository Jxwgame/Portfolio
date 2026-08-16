// Package migrations ฝังไฟล์ .sql ทั้งหมดไว้ในไบนารี
package migrations

import "embed"

//go:embed *.sql
var FS embed.FS
