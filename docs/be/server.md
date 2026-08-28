# Backend — Go API Server

## Phase 1 (current): placeholder

- `server/main.go` — Go standard library `net/http`, no framework.
- One endpoint: `GET /health` → `{"status":"ok"}`.
- Purpose: keep the BE layer and infra on track; give Phase 2 a home.

## Phase 2 (planned)

- Auth (accounts, sessions)
- Progress sync: accept the FE's versioned progress document (see
  `../fe/data-model.md`), merge by date key per user.
- Subscriptions: Stripe (checkout, webhooks, tier gating).
- Database for users + progress.

Component diagram lives in `../summary.md` (Level 3, BE container) and must be
updated when the server gains real components.
