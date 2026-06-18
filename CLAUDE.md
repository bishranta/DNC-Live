# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo layout

This repo holds a live conference dashboard ("DNC Live"). It contains both the React frontend and the Strapi backend.

- `frontend/` — the React + Vite + TS app (most frontend work happens here)
- `backend/` — the Strapi v5 backend (content types under `src/api/*`, REST + embedded Socket.IO). Run with `npm run develop` from `backend/`.
- `DNC Live/project-roadmap.md` — the build spec/contract for the whole system (frontend + Strapi backend). Treat this as the source of truth for expected content types, field names, API behavior, and Socket.IO events when assumptions are unclear. Note: the roadmap uses snake_case column names, but the actual content types were standardized to camelCase (see `backend/fix-field-names.sh`).
- `tools/` — local machine-only dev tooling (portable Node, a Playwright-based screenshot/verify script). Not part of the app; gitignored.

## Commands

All commands run from `frontend/`:

```bash
npm run dev       # start Vite dev server
npm run build     # tsc -b && vite build (type-check then build)
npm run lint      # eslint .
npm run preview   # preview a production build
```

There is no test runner configured in this project.

On this machine, `frontend/` is normally launched via `dev-frontend.cmd` at the repo root, which prepends a local portable Node 20 (`tools/node20/`) to PATH before running `npm run dev` — use this if the system Node isn't the right version. This script is machine-specific and not committed.

## Architecture

**Stack:** React 19 + TypeScript, Vite, TanStack Query, axios, react-router-dom, socket.io-client, Tailwind v4 (via `@tailwindcss/vite`, no separate config file — see `src/index.css`).

**Backend contract:** The app talks to a Strapi v5 instance (REST under `/api`, plus an embedded Socket.IO server). All Strapi-shaped types live in `src/types/api.ts` (`StrapiCollectionResponse<T>`, `StrapiSingleResponse<T>`, `Session`, `Notice`, `InvitationCode`, `SessionFeedback`, etc.) — **fields are camelCase** (`isPublished`, `displayOrder`, `liveYoutubeUrl`...). The roadmap doc describes the same content types using snake_case column names; if the live backend doesn't match the camelCase assumption, requests will silently return `undefined` for those fields rather than erroring.

**Session status field is `sessionStatus`, NOT `status`.** `status` is a reserved attribute name in Strapi v5 (used internally for the Draft & Publish `draft`/`published` dimension). A custom content-type field named `status` collides with that dimension: the content-manager validates your value against `z.enum(['draft','published'])` and rejects every entry with "Invalid status". The field is therefore named `sessionStatus` everywhere — backend schema/lifecycle, `src/types/api.ts` (`Session.sessionStatus: SessionStatus`), mock data, and all UI filtering. The enum values (`upcoming`/`ongoing`/`completed`) and the `SessionStatus` type are unchanged. Do not rename it back to `status`.

**Mock-data mode:** Every data hook checks `USE_MOCK_DATA` (from `VITE_USE_MOCK_DATA` in `.env`, read in `src/lib/api.ts`) and short-circuits to fixtures in `src/data/mock.ts` instead of calling the API. This lets the UI be built/run without a backend. When wiring up against a real Strapi instance, set `VITE_USE_MOCK_DATA=false` and point `VITE_API_BASE_URL` / `VITE_SOCKET_URL` at it.

**Data layer (`src/hooks/`):** Each hook pairs with one Strapi endpoint and follows the same pattern — branch on `USE_MOCK_DATA`, otherwise build a query string with `qs` (Strapi's `populate`/`filters`/`sort` syntax) and call `api` (the shared axios instance in `src/lib/api.ts`):
- `useSessions` / `useSession(id)` → `GET /sessions` / `/sessions/:id`, `populate=*`
- `useNotices` → `GET /notices`, filtered to `isPublished`
- `useValidateInvitationCode` → `GET /invitation-codes`, filtered by code + `isActive`
- `useSubmitFeedback` → `POST /session-feedbacks`

**Realtime sync:** `src/lib/socket.ts` creates a socket.io client (auto-connect disabled in mock mode). `useRealtimeSync` (wired once, in `App.tsx`) listens for `session:updated` / `notice:updated` and invalidates the corresponding TanStack Query cache — there's no manual refetch logic anywhere else, so any new realtime event needs a matching `invalidateQueries` call here and a corresponding emit on the backend.

**Routing (`src/App.tsx`):** three routes under a shared `Layout` — `/` (`Home`), `/session/:id` (`SessionDetail`), `/feedback` (`Feedback`).

**Pages:**
- `Home` — sessions grouped into Ongoing/Upcoming/Completed accordions (client-side filter/sort by `sessionStatus`/`displayOrder`), plus a live-now card and notices panel.
- `SessionDetail` — shows YouTube live embed when `ongoing`, recording grid (`session.media`) when `completed`, and participant cards sorted by `displayOrder`.
- `Feedback` — a 4-step local state machine (`code` → `select` → `rate` → `success`). The invitation code is persisted in `localStorage` via `src/lib/storage.ts` (`participantCodeStorage`) so returning visitors skip straight to session selection. Feedback is anonymous by design (per the roadmap) — never add name/email fields here.

**Business rules carried over from the roadmap** (relevant when changing frontend logic, since the backend enforces these too): only one session can be `ongoing` at a time (enforced in the session `beforeCreate`/`beforeUpdate` lifecycle hooks, which demote any other ongoing session to `completed`); feedback is one entry per `(invitationCode, session)` pair (upsert on the backend, not append); session `startTime`/`endTime` are informational only, `sessionStatus` is always authoritative.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
