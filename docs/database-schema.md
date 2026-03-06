# LifeOS Database Schema — Brainstorming

This document captures ideas for the PostgreSQL schema. Nothing here is final — it's a working space to think through tables, relationships, and edge cases before writing migrations.

---

## Conventions

- All tables use `uuid` primary keys (generated via `gen_random_uuid()`)
- All tables include `created_at` and `updated_at` timestamps
- All user-owned tables include a `user_id` FK with cascading deletes
- Soft deletes via `deleted_at` where archival matters (projects, notes)
- Ordering via `display_order` integer columns where users can reorder

---

## Tables

### users

The auth source of truth lives in Cognito. This table stores the local reference.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| cognito_sub | text UNIQUE | Maps to Cognito user pool subject |
| email | text UNIQUE | |
| onboarded | boolean | Whether the user has completed onboarding |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### profiles

One-to-one with users. Contains the Glory Frame identity data.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK → users UNIQUE | |
| name | text | Display name |
| description | text | e.g. "Nurturing Visionary Protector" |
| motto | text | e.g. "You Have My Bow" |
| vision | text | Life vision statement |
| purpose | text | Core purpose statement |

### names

The Name Bank — names/titles the user identifies with.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK → users | |
| name | text | The name/title |
| meaning | text | What it means to the user |
| display_order | int | |

### desires

Core desires, values, and truths.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK → users | |
| name | text | e.g. "Relational Depth" |
| description | text | |
| display_order | int | |

### strengths

Top-level strength categories.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK → users | |
| name | text | e.g. "Heightened Sensitivity" |
| display_order | int | |

### strength_subs

Sub-skills under a strength. Some strengths have named subs, others just have a description.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| strength_id | uuid FK → strengths | |
| name | text | Nullable — not all subs have names |
| description | text | |
| display_order | int | |

**Open question:** Is a separate table overkill? The POC has 1-3 subs per strength. Could embed as JSONB on the strengths table instead. Separate table is more flexible for future editing UX.

---

### spheres

The core life domains.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK → users | |
| name | text | e.g. "Personal", "Marriage" |
| letter | char(1) | Fallback icon letter |
| icon | text | Lucide icon name OR image URL |
| purpose | text | Sphere's purpose statement |
| display_order | int | User-controlled ordering |

### sphere_people

People associated with a sphere.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| sphere_id | uuid FK → spheres | |
| name | text | Person's name |
| photo_url | text | Nullable — S3 URL or external |
| display_order | int | |

**Open question:** Should people be a global table with a join to spheres? A person could appear in multiple spheres (e.g. a spouse in both "Marriage" and "Extended Family"). For v1, keeping it simple with per-sphere entries and allowing duplicates by name seems fine. Could add deduplication later.

### intentions

Focus intentions tied to a sphere.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| sphere_id | uuid FK → spheres | |
| text | text | The intention statement |
| display_order | int | |
| active | boolean | Could archive old intentions without deleting |

---

### projects

Finite efforts within a sphere.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| sphere_id | uuid FK → spheres | |
| name | text | |
| intention | text | What this project serves |
| status | text | 'active', 'planning', 'complete', 'archived' |
| archived_at | timestamptz | Nullable |
| display_order | int | |

**Idea — project templates:** The POC has "Save as Template" and "Duplicate". Could add a `project_templates` table or a `is_template` flag. Templates would store task blueprints without dates. Keeping this out of v1 — can add when needed.

### rhythms

Recurring practices within a sphere.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| sphere_id | uuid FK → spheres | |
| name | text | e.g. "Daily Prayer" |
| intention | text | What this rhythm serves |
| cadence | text | 'daily', 'weekly', 'monthly' |
| day_of_week | text | Nullable — e.g. "Sunday", "Saturday" |
| time_of_day | time | Nullable — e.g. "07:00" |
| status | text | 'active', 'paused' |

### rhythm_steps

Checklist steps for a rhythm.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| rhythm_id | uuid FK → rhythms | |
| text | text | Step description |
| display_order | int | |

### rhythm_completions

Track when a rhythm is completed to calculate streaks.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| rhythm_id | uuid FK → rhythms | |
| completed_at | timestamptz | |
| steps_completed | jsonb | Which steps were checked off |

**Open question:** How to calculate streaks efficiently? Options:
1. Compute on read from completions (accurate but slow for long histories)
2. Store `current_streak` on the rhythm row and update on each completion (fast reads, must handle reset logic)
3. Hybrid — cache on rhythm row, recompute nightly

Option 2 is probably fine for v1. Add a `current_streak int` and `last_completed_at timestamptz` to the rhythms table.

### goals

Measurable targets within a sphere.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| sphere_id | uuid FK → spheres | |
| name | text | e.g. "Run a half marathon" |
| target | text | What success looks like |
| target_date | date | Nullable |
| progress | int | 0–100 percentage |
| status | text | 'active', 'complete', 'abandoned' |

**Open question:** Should progress be manually set (like the POC) or computed from linked tasks/milestones? Manual is simpler for v1. Could add computed progress later as an option.

---

### tasks

The core actionable item.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK → users | |
| sphere_id | uuid FK → spheres | Nullable for inbox-promoted tasks not yet assigned |
| project_id | uuid FK → projects | Nullable — standalone tasks exist |
| goal_id | uuid FK → goals | Nullable — optionally linked |
| text | text | Task description |
| done | boolean | |
| done_at | timestamptz | Nullable — when completed |
| priority | text | 'focus', 'normal' |
| doing_date | date | Nullable — when the user plans to do it |
| due_date | date | Nullable — hard deadline |
| recurrence | text | 'none', 'daily', 'weekdays', 'weekly', 'biweekly', 'monthly', 'quarterly', 'yearly' |
| display_order | int | Within its doing_date group |

**Recurrence handling:** When a recurring task is completed, the server should auto-create the next instance with the appropriate `doing_date`. This is server-side logic, not schema, but worth noting. Need a `recurrence_source_id` to link generated instances back to the original? Or just copy the recurrence pattern to the new task.

**Views the schema needs to support efficiently:**
- "Today" — all tasks where `doing_date = today`, ordered by priority then display_order
- "Tomorrow" — `doing_date = tomorrow`
- "Upcoming" — `doing_date > today`, grouped by date
- "By project" — all tasks for a given project_id
- "By sphere" — all tasks for a given sphere_id

**Indexes to consider:**
- `(user_id, doing_date, done)` — today/upcoming queries
- `(project_id, done)` — project detail view
- `(sphere_id, done)` — sphere detail view
- `(user_id, done, recurrence)` — finding tasks that need recurrence generation

### inbox_items

Quick capture before organizing into tasks.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK → users | |
| text | text | The captured thought |
| created_at | timestamptz | |
| processed_at | timestamptz | Nullable — when organized into a task or dismissed |

**Idea:** When an inbox item is "organized," it could be converted into a task (store `promoted_to_task_id`?) or just deleted. The POC has an "Organize" button but doesn't show the flow. For v1, promoting creates a task and soft-deletes the inbox item.

---

### folders

Groups notes within a library context.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK → users | |
| context_type | text | 'sphere', 'project', 'attune' |
| context_id | uuid | Nullable — FK to spheres or projects. Null when context_type = 'attune' |
| name | text | Folder name |
| display_order | int | |

**Note on context_id:** This is a polymorphic FK. Alternatives:
1. Separate `sphere_id` and `project_id` nullable columns with a check constraint (cleaner FK integrity)
2. Single `context_id` with no FK constraint (simpler, validated in app logic)

Option 1 is safer:

| Column | Type | Notes |
|--------|------|-------|
| sphere_id | uuid FK → spheres | Nullable |
| project_id | uuid FK → projects | Nullable |
| context_type | text | 'sphere', 'project', 'attune' |

Check constraint: exactly one of `sphere_id`, `project_id` is set, OR `context_type = 'attune'` and both are null.

### notes

A piece of writing in the library.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK → users | |
| folder_id | uuid FK → folders | Nullable — loose notes aren't in a folder |
| context_type | text | Same as folders — 'sphere', 'project', 'attune' |
| sphere_id | uuid FK → spheres | Nullable |
| project_id | uuid FK → projects | Nullable |
| title | text | |
| body | text | |
| note_type | text | 'reference', 'running', 'meeting', 'inspiration', 'best-practice', 'review' |
| pinned | boolean | |
| deleted_at | timestamptz | Soft delete |

**Open question:** Should `note_type` be an enum or a separate `note_types` table? The POC hardcodes 6 types with colors. An enum is fine unless users can create custom types — unlikely for v1.

**Open question:** Rich text? The POC uses plain text with line breaks. Could store as markdown for v1 and add a rich text editor later. Column type stays `text` either way.

---

## Attune / Reviews

The Attune system has daily/weekly/monthly/annual review cycles. The POC tracks:
- Checklist completion for daily/weekly/monthly (transient, not stored in POC)
- Annual review written responses (saved to library as notes)

### Do we need a reviews table?

**Option A — Notes only:** Annual reviews save to the library as notes (like the POC). Daily/weekly/monthly checklists are ephemeral. No extra table needed.

**Option B — Dedicated reviews table:**

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK → users | |
| cycle | text | 'daily', 'weekly', 'monthly', 'annual' |
| completed_at | timestamptz | |
| responses | jsonb | For annual reviews — question/answer pairs |
| checklist_state | jsonb | For daily/weekly/monthly — which items were checked |

This enables tracking review streaks, showing "last reviewed" per cycle, and analytics over time. Probably worth doing even for v1.

---

## Relationships Summary

```
users
├── profiles (1:1)
├── names (1:N)
├── desires (1:N)
├── strengths (1:N)
│   └── strength_subs (1:N)
├── spheres (1:N)
│   ├── sphere_people (1:N)
│   ├── intentions (1:N)
│   ├── projects (1:N)
│   │   └── tasks (1:N)
│   ├── rhythms (1:N)
│   │   ├── rhythm_steps (1:N)
│   │   └── rhythm_completions (1:N)
│   └── goals (1:N)
├── tasks (1:N) — also linked via sphere/project
├── inbox_items (1:N)
├── folders (1:N) — scoped by context
│   └── notes (1:N)
├── notes (1:N) — loose notes without folder
└── reviews (1:N)
```

---

## Ideas & Future Considerations

### Tags / Labels
Not in the POC, but could be useful for cross-sphere note searching. A `tags` table with a `note_tags` join table. Skip for v1.

### Activity Log
Track user actions (task completed, review finished, streak milestone) for an activity feed or stats dashboard. Could be a simple append-only `activity_log` table with `event_type`, `entity_type`, `entity_id`, `metadata jsonb`, `created_at`.

### Attachments
The POC doesn't support file attachments on notes, but it's a natural extension. An `attachments` table with S3 keys, linked to notes. Skip for v1.

### Shared Spheres
If "collaboration" is ever added (e.g. spouse sees the Marriage sphere), this would require a `sphere_members` join table and significant changes to the query scoping. Defer until post-launch.

### Data Export
Users should be able to export their entire Glory Frame. This is an API endpoint concern, not a schema concern, but the schema should make full-user-export queries straightforward. The cascading FK structure makes this clean — query all tables WHERE user_id = X.

---

## Estimated Table Count

| Group | Tables | Count |
|-------|--------|-------|
| Identity | users, profiles, names, desires, strengths, strength_subs | 6 |
| Structure | spheres, sphere_people, intentions | 3 |
| Engagements | projects, rhythms, rhythm_steps, rhythm_completions, goals | 5 |
| Tasks | tasks, inbox_items | 2 |
| Library | folders, notes | 2 |
| Reviews | reviews | 1 |
| **Total** | | **19** |
