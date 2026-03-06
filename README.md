# LifeOS

A personal life management platform built around the **Glory Frame** — helping you steward every sphere of your life with intentionality, presence, and purpose.

LifeOS organizes life into **Spheres** (Personal, Marriage, Family, Career, etc.), each with people, intentions, projects, rhythms, and goals. It includes a Library for notes and reference material, an Inbox for quick capture, and **Attune** — a structured review system with daily, weekly, monthly, and annual reflection cycles.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile App | React Native (Expo) |
| API Server | Go with [Gin](https://github.com/gin-gonic/gin) |
| Database | PostgreSQL |
| Infrastructure | AWS |

## Repository Structure

```
lifeOS/
├── mobile/          # React Native app
├── server/          # Go API server (Gin)
├── docs/            # Architecture and design documents
├── infra/           # AWS infrastructure (IaC)
└── life-os.jsx      # Original POC (single-file React prototype)
```

## Getting Started

### Prerequisites

- **Go** 1.22+
- **Node.js** 20+ and npm
- **PostgreSQL** 16+
- **Expo CLI** (`npm install -g expo-cli`)

### Server

```bash
cd server
cp .env.example .env       # Configure database credentials and secrets
go mod download
go run cmd/api/main.go
```

### Mobile App

```bash
cd mobile
npm install
npx expo start              # Opens Expo dev tools
```

### Database

```bash
# Create the database
createdb lifeos

# Run migrations
cd server
go run cmd/migrate/main.go up
```

## Project Origin

The `life-os.jsx` file in the repo root is the original single-file React prototype that serves as the product specification and design reference for this app.
