# LifeOS Architecture

## Overview

LifeOS is a mobile-first personal life management platform. The system consists of a React Native (Expo) mobile app communicating with a Go API server backed by PostgreSQL, all hosted on AWS.

```
┌─────────────────┐       HTTPS/JSON        ┌─────────────────┐       ┌──────────────┐
│  React Native   │  (Expo)  ◄──────────────────►    │   Go API (Gin)  │  ◄──► │  PostgreSQL  │
│  Mobile App     │                          │                 │       │              │
└─────────────────┘                          └─────────────────┘       └──────────────┘
                                                     │
                                                     ▼
                                              ┌──────────────┐
                                              │  AWS Services │
                                              │  (S3, SES,    │
                                              │   Cognito...) │
                                              └──────────────┘
```

## Domain Model

These are the core entities derived from the POC. All entities are scoped to a user.

### Core Identity

| Entity | Description |
|--------|-------------|
| **User** | Account with auth credentials |
| **Profile** | Name, description, motto, vision, purpose |
| **Name** | Entry in the user's Name Bank (name + meaning) |
| **Desire** | Core desire/value/truth (name + description) |
| **Strength** | Strength category with sub-skills |

### Life Structure

| Entity | Description |
|--------|-------------|
| **Sphere** | A domain of life (e.g., Personal, Marriage, Career). Has a name, icon, purpose, display order. |
| **Person** | Someone associated with a sphere (name, optional photo URL) |
| **Intention** | A focus intention tied to a sphere |

### Engagements

| Entity | Description |
|--------|-------------|
| **Project** | A finite effort within a sphere, with status (active/planning/complete/archived) |
| **Rhythm** | A recurring practice within a sphere (cadence, day, time, checklist steps, streak) |
| **Goal** | A measurable target within a sphere (target description, target date, progress %) |

### Tasks & Capture

| Entity | Description |
|--------|-------------|
| **Task** | An actionable item with sphere, project, doing date, due date, priority (focus/normal), recurrence, completion state |
| **InboxItem** | A quick-capture thought to be organized later |

### Library

| Entity | Description |
|--------|-------------|
| **Folder** | Groups notes within a library context (sphere, project, or attune) |
| **Note** | A piece of writing with title, body, type (reference/running/meeting/inspiration/best-practice/review), pinned state |

## Database Design

### Key Relationships

```
User 1──* Sphere
User 1──1 Profile
Profile 1──* Name, Desire, Strength

Sphere 1──* Person
Sphere 1──* Intention
Sphere 1──* Project
Sphere 1──* Rhythm
Sphere 1──* Goal

Project 1──* Task
Sphere 1──* Task

Sphere|Project|Attune 1──* Folder
Sphere|Project|Attune 1──* Note (loose, not in a folder)
Folder 1──* Note

User 1──* InboxItem
```

### Library Scoping

Notes and folders belong to a **library context**, which is one of:
- A sphere (`sphere_id`)
- A project (`project_id`)
- The Attune system (`context = 'attune'`)

This is modeled with nullable foreign keys and a context type column on the Folder and Note tables.

### Multi-tenancy

All tables include a `user_id` foreign key. Every query is scoped to the authenticated user. There are no shared/collaborative features in v1.

## API Design

RESTful JSON API. All endpoints require authentication.

### Resource Groups

| Prefix | Resources |
|--------|-----------|
| `/api/v1/profile` | Profile, names, desires, strengths |
| `/api/v1/spheres` | Spheres, people, intentions |
| `/api/v1/projects` | Projects and their tasks |
| `/api/v1/rhythms` | Rhythms with checklist steps |
| `/api/v1/goals` | Goals |
| `/api/v1/tasks` | Tasks (cross-project queries, today/upcoming views) |
| `/api/v1/inbox` | Inbox items |
| `/api/v1/library` | Folders and notes (filtered by context) |
| `/api/v1/attune` | Review session state |

### Example Endpoints

```
GET    /api/v1/spheres              # List all spheres (ordered)
POST   /api/v1/spheres              # Create sphere
PUT    /api/v1/spheres/:id          # Update sphere
DELETE /api/v1/spheres/:id          # Delete sphere
PUT    /api/v1/spheres/reorder      # Reorder spheres

GET    /api/v1/tasks?view=today     # Today's tasks
GET    /api/v1/tasks?view=upcoming  # Upcoming tasks
POST   /api/v1/tasks                # Create task
PUT    /api/v1/tasks/:id            # Update task (toggle done, reschedule, etc.)
```

## Server Structure

```
server/
├── cmd/
│   ├── api/
│   │   └── main.go              # API entrypoint
│   └── migrate/
│       └── main.go              # Migration runner
├── internal/
│   ├── config/                  # Environment and app config
│   ├── middleware/               # Auth, logging, CORS, error handling
│   ├── handler/                 # HTTP handlers (one file per resource group)
│   ├── service/                 # Business logic layer
│   ├── repository/              # Database access (queries)
│   ├── model/                   # Go structs for domain entities
│   └── dto/                     # Request/response types
├── migrations/                  # SQL migration files
├── go.mod
├── go.sum
└── .env.example
```

## Authentication

AWS Cognito for user authentication. The mobile app authenticates via Cognito and sends a JWT in the `Authorization: Bearer <token>` header. The Go API validates the JWT using Cognito's JWKS endpoint.

## AWS Infrastructure

| Service | Purpose |
|---------|---------|
| **ECS Fargate** or **App Runner** | Run the Go API server |
| **RDS PostgreSQL** | Managed database |
| **Cognito** | User authentication |
| **S3** | Profile photo and note attachment storage |
| **CloudFront** | CDN for static assets |
| **ECR** | Container registry for server images |
| **Parameter Store / Secrets Manager** | Configuration and secrets |

## Mobile App Structure (Expo)

```
mobile/
├── app/                         # Expo Router file-based routing
│   ├── (auth)/                  # Auth-guarded route group
│   │   ├── (tabs)/              # Bottom tab navigator
│   │   │   ├── today.tsx
│   │   │   ├── inbox.tsx
│   │   │   ├── upcoming.tsx
│   │   │   └── _layout.tsx
│   │   ├── glory-map.tsx
│   │   ├── sphere/[id].tsx
│   │   ├── project/[id].tsx
│   │   ├── rhythm/[id].tsx
│   │   ├── task/[id].tsx
│   │   ├── projects.tsx
│   │   ├── attune.tsx
│   │   ├── archive.tsx
│   │   └── _layout.tsx
│   ├── onboarding/
│   ├── _layout.tsx              # Root layout
│   └── index.tsx                # Entry redirect
├── src/
│   ├── api/                     # API client and request functions
│   ├── auth/                    # Cognito auth integration
│   ├── components/              # Shared UI components (Pill, Bar, Task, etc.)
│   ├── hooks/                   # Custom hooks
│   ├── theme/                   # Design tokens (colors, typography from POC)
│   └── store/                   # State management
├── assets/                      # Fonts, images, icons
├── app.json
├── expo-env.d.ts
└── package.json
```

## Design System

Carried over from the POC:

### Palette

| Token | Hex | Usage |
|-------|-----|-------|
| midnight | `#101456` | Primary dark / ink |
| blue | `#0048BA` | Primary accent |
| steel | `#3B5998` | Secondary accent |
| sky | `#6B88C4` | Tertiary accent |
| mist | `#A8B4D0` | Borders, subtle |
| fog | `#D0D4DF` | Dividers |
| cloud | `#E8EAF0` | Light surfaces |
| bg | `#EDEEE8` | App background |
| white | `#FFFFFF` | Card surfaces |

### Typography

| Role | Font |
|------|------|
| Headings / UI | DM Sans (weight 400–800) |
| Body | DM Sans |
| Serif / Italic accents | Crimson Pro |

## Open Questions

- **Offline support**: Should the mobile app work offline with local-first sync, or require connectivity?
- **Push notifications**: Rhythm reminders, task due dates — via AWS SNS or third-party?
- **Data export**: Should users be able to export their Glory Frame / review history?
- **Collaboration**: Any future multi-user features (shared spheres with a spouse, etc.)?
