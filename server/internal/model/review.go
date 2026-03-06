package model

import "time"

type Review struct {
	ID             string    `json:"id" db:"id"`
	UserID         string    `json:"user_id" db:"user_id"`
	Cycle          string    `json:"cycle" db:"cycle"`
	CompletedAt    time.Time `json:"completed_at" db:"completed_at"`
	Responses      any       `json:"responses" db:"responses"`
	ChecklistState any       `json:"checklist_state" db:"checklist_state"`
}
