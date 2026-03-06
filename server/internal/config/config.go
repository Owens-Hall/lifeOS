package config

import "os"

type Config struct {
	Port        string
	DatabaseURL string
	CognitoURL  string
}

func Load() *Config {
	return &Config{
		Port:        getEnv("PORT", "8080"),
		DatabaseURL: getEnv("DATABASE_URL", "postgres://localhost:5432/lifeos?sslmode=disable"),
		CognitoURL:  getEnv("COGNITO_JWKS_URL", ""),
	}
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
