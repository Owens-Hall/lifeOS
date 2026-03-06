package model

import "time"

type Folder struct {
	ID           string  `json:"id" db:"id"`
	UserID       string  `json:"user_id" db:"user_id"`
	ContextType  string  `json:"context_type" db:"context_type"`
	SphereID     *string `json:"sphere_id" db:"sphere_id"`
	ProjectID    *string `json:"project_id" db:"project_id"`
	Name         string  `json:"name" db:"name"`
	DisplayOrder int     `json:"display_order" db:"display_order"`
}

type Note struct {
	ID          string     `json:"id" db:"id"`
	UserID      string     `json:"user_id" db:"user_id"`
	FolderID    *string    `json:"folder_id" db:"folder_id"`
	ContextType string     `json:"context_type" db:"context_type"`
	SphereID    *string    `json:"sphere_id" db:"sphere_id"`
	ProjectID   *string    `json:"project_id" db:"project_id"`
	Title       string     `json:"title" db:"title"`
	Body        string     `json:"body" db:"body"`
	NoteType    string     `json:"note_type" db:"note_type"`
	Pinned      bool       `json:"pinned" db:"pinned"`
	CreatedAt   time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at" db:"updated_at"`
	DeletedAt   *time.Time `json:"deleted_at" db:"deleted_at"`
}
