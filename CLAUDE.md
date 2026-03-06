# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LifeOS is a single-file React application (`life-os.jsx`) — a personal life management dashboard built around the concept of a "Glory Frame." It helps users organize their life into **Spheres** (domains like Personal, Marriage, Career, etc.), track tasks, projects, rhythms, goals, and perform regular review cycles.

The app is designed to run in an environment that provides `window.storage` for persistence (get/set with JSON serialization). It uses no build tools, bundler config, or package.json in this repo — the JSX file is the entire application.

## Architecture

Everything lives in a single ~1300-line JSX file with this structure:

### Data Layer (lines 1–200)
- **Constants at the top**: `INIT_SPHERES`, `INIT_PROFILE`, `PROJECTS`, `INIT_GOALS`, `INIT_TASKS`, `INBOX_ITEMS`, `PROJECT_TASKS`, `RHYTHM_DETAILS`, `INIT_LIBRARY` — all hardcoded initial/demo data
- **Design system tokens**: `P` (palette colors), `T` (tint colors), `h`/`b`/`s` (font families: DM Sans for headings/body, Crimson Pro for serif/italic)
- **Mutable ID counters**: `nextSphereId`, `nextGoalId`, `nextNoteId`, `nextFolderId` — module-level vars for generating IDs

### Hooks (lines 201–240)
- `useIsMobile(bp)` — responsive breakpoint hook
- `useDragReorder(items, onReorder)` — generic drag-and-drop reordering

### Shared UI Components (lines 242–510)
- `Pill`, `Bar`, `Heading`, `Btn`, `Task`, `Person`, `SphereIcon`, `IconPicker` — reusable primitives
- `NoteCard`, `NoteEditor`, `TypeFilter`, `NewFolderForm`, `Library` — the Library subsystem (notes organized in folders with type filtering, pinning, CRUD)

### Screen Components (lines 512–1130)
Each screen is a standalone function component:
- `ScreenGloryMap` — the identity/vision dashboard with sphere grid, profile display, Name Bank, desires, strengths
- `ScreenSphere` — sphere detail with people, intentions, engagements (projects/rhythms/goals), and per-sphere library
- `ScreenToday` — daily task view with focus/normal priority, drag reordering, completion tracking
- `ScreenUpcoming` — future tasks grouped by date
- `ScreenProjects` — all projects/rhythms grouped by sphere
- `ScreenProjectDetail` — single project with task list, progress bar, archive/duplicate/template actions, per-project library
- `ScreenRhythmDetail` — rhythm with cadence, streak, checklist
- `ScreenDetail` — single task detail with recurrence options
- `ScreenInbox` — quick capture inbox
- `ScreenAttune` — review/reflection system with daily/weekly/monthly/annual cycles; annual reviews save to library
- `ScreenArchive` — archived projects
- `Onboarding` — 5-step setup wizard (Welcome, Identity, Traits, Spheres, Intentions)

### Main App Component (lines 1131–1293)
- `App` — root component managing all state, navigation, sidebar/mobile nav, persistence via `window.storage`
- Navigation uses a `screen` string state, not a router
- State is persisted to `window.storage` under key `"life-os-data"` on every change

## Key Patterns

- **All styling is inline** — no CSS files, no CSS-in-JS library. Styles use the `P`, `T`, and font constants.
- **Icons**: Lucide React icons mapped in `ICONS` object, plus support for external image URLs (Thiings.co)
- **Fonts**: Google Fonts loaded via `<link>` tag in component render (DM Sans + Crimson Pro)
- **Library system**: Reused across spheres (`sphere-{id}`), projects (`project-{id}`), and Attune — each gets its own folder/note namespace in the `library` state object
- **No external routing or state management** — everything is React useState/useEffect in the root App component
