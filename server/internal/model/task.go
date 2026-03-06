package model

import "time"

type Task struct {
	ID           string     `json:"id" db:"id"`
	UserID       string     `json:"user_id" db:"user_id"`
	SphereID     *string    `json:"sphere_id" db:"sphere_id"`
	ProjectID    *string    `json:"project_id" db:"project_id"`
	GoalID       *string    `json:"goal_id" db:"goal_id"`
	Text         string     `json:"text" db:"text"`
	Done         bool       `json:"done" db:"done"`
	DoneAt       *time.Time `json:"done_at" db:"done_at"`
	Priority     string     `json:"priority" db:"priority"`
	DoingDate    *string    `json:"doing_date" db:"doing_date"`
	DueDate      *string    `json:"due_date" db:"due_date"`
	Recurrence   string     `json:"recurrence" db:"recurrence"`
	DisplayOrder int        `json:"display_order" db:"display_order"`
	CreatedAt    time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at" db:"updated_at"`
}

type InboxItem struct {
	ID          string     `json:"id" db:"id"`
	UserID      string     `json:"user_id" db:"user_id"`
	Text        string     `json:"text" db:"text"`
	CreatedAt   time.Time  `json:"created_at" db:"created_at"`
	ProcessedAt *time.Time `json:"processed_at" db:"processed_at"`
}
