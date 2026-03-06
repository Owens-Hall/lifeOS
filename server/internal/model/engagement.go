package model

import "time"

type Project struct {
	ID           string     `json:"id" db:"id"`
	SphereID     string     `json:"sphere_id" db:"sphere_id"`
	Name         string     `json:"name" db:"name"`
	Intention    string     `json:"intention" db:"intention"`
	Status       string     `json:"status" db:"status"`
	ArchivedAt   *time.Time `json:"archived_at" db:"archived_at"`
	DisplayOrder int        `json:"display_order" db:"display_order"`
}

type Rhythm struct {
	ID              string     `json:"id" db:"id"`
	SphereID        string     `json:"sphere_id" db:"sphere_id"`
	Name            string     `json:"name" db:"name"`
	Intention       string     `json:"intention" db:"intention"`
	Cadence         string     `json:"cadence" db:"cadence"`
	DayOfWeek       *string    `json:"day_of_week" db:"day_of_week"`
	TimeOfDay       *string    `json:"time_of_day" db:"time_of_day"`
	Status          string     `json:"status" db:"status"`
	CurrentStreak   int        `json:"current_streak" db:"current_streak"`
	LastCompletedAt *time.Time `json:"last_completed_at" db:"last_completed_at"`
}

type RhythmStep struct {
	ID           string `json:"id" db:"id"`
	RhythmID     string `json:"rhythm_id" db:"rhythm_id"`
	Text         string `json:"text" db:"text"`
	DisplayOrder int    `json:"display_order" db:"display_order"`
}

type RhythmCompletion struct {
	ID             string    `json:"id" db:"id"`
	RhythmID       string    `json:"rhythm_id" db:"rhythm_id"`
	CompletedAt    time.Time `json:"completed_at" db:"completed_at"`
	StepsCompleted []bool    `json:"steps_completed" db:"steps_completed"`
}

type Goal struct {
	ID         string  `json:"id" db:"id"`
	SphereID   string  `json:"sphere_id" db:"sphere_id"`
	Name       string  `json:"name" db:"name"`
	Target     string  `json:"target" db:"target"`
	TargetDate *string `json:"target_date" db:"target_date"`
	Progress   int     `json:"progress" db:"progress"`
	Status     string  `json:"status" db:"status"`
}
