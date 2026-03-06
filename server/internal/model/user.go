package model

import "time"

type User struct {
	ID         string    `json:"id" db:"id"`
	CognitoSub string    `json:"cognito_sub" db:"cognito_sub"`
	Email      string    `json:"email" db:"email"`
	Onboarded  bool      `json:"onboarded" db:"onboarded"`
	CreatedAt  time.Time `json:"created_at" db:"created_at"`
	UpdatedAt  time.Time `json:"updated_at" db:"updated_at"`
}

type Profile struct {
	ID          string `json:"id" db:"id"`
	UserID      string `json:"user_id" db:"user_id"`
	Name        string `json:"name" db:"name"`
	Description string `json:"description" db:"description"`
	Motto       string `json:"motto" db:"motto"`
	Vision      string `json:"vision" db:"vision"`
	Purpose     string `json:"purpose" db:"purpose"`
}

type Name struct {
	ID           string `json:"id" db:"id"`
	UserID       string `json:"user_id" db:"user_id"`
	Name         string `json:"name" db:"name"`
	Meaning      string `json:"meaning" db:"meaning"`
	DisplayOrder int    `json:"display_order" db:"display_order"`
}

type Desire struct {
	ID           string `json:"id" db:"id"`
	UserID       string `json:"user_id" db:"user_id"`
	Name         string `json:"name" db:"name"`
	Description  string `json:"description" db:"description"`
	DisplayOrder int    `json:"display_order" db:"display_order"`
}

type Strength struct {
	ID           string        `json:"id" db:"id"`
	UserID       string        `json:"user_id" db:"user_id"`
	Name         string        `json:"name" db:"name"`
	DisplayOrder int           `json:"display_order" db:"display_order"`
	Subs         []StrengthSub `json:"subs" db:"-"`
}

type StrengthSub struct {
	ID           string `json:"id" db:"id"`
	StrengthID   string `json:"strength_id" db:"strength_id"`
	Name         string `json:"name" db:"name"`
	Description  string `json:"description" db:"description"`
	DisplayOrder int    `json:"display_order" db:"display_order"`
}
