package model

type Sphere struct {
	ID           string `json:"id" db:"id"`
	UserID       string `json:"user_id" db:"user_id"`
	Name         string `json:"name" db:"name"`
	Letter       string `json:"letter" db:"letter"`
	Icon         string `json:"icon" db:"icon"`
	Purpose      string `json:"purpose" db:"purpose"`
	DisplayOrder int    `json:"display_order" db:"display_order"`
}

type SpherePerson struct {
	ID           string  `json:"id" db:"id"`
	SphereID     string  `json:"sphere_id" db:"sphere_id"`
	Name         string  `json:"name" db:"name"`
	PhotoURL     *string `json:"photo_url" db:"photo_url"`
	DisplayOrder int     `json:"display_order" db:"display_order"`
}

type Intention struct {
	ID           string `json:"id" db:"id"`
	SphereID     string `json:"sphere_id" db:"sphere_id"`
	Text         string `json:"text" db:"text"`
	Active       bool   `json:"active" db:"active"`
	DisplayOrder int    `json:"display_order" db:"display_order"`
}
