# Musoni — Project Status

> Last updated: 2026-08-28
> Read this first. One-minute overview of where the project stands.
> Maintained by the doc-sync rule (see CLAUDE.md) — must be updated in the same session as any change.

## What is Musoni

A web app for pure sheet-music reading training combined with music theory.
Phase 1: train note-identification speed on the staff. Later: rhythm drills, ear training, subscriptions.

## Current Phase

**Phase 1 — implemented, pending human browser verification** (web only, no login, localStorage progress)

## State

All 14 implementation-plan tasks are complete and merged to `main`: web app (note-id drill, 4 screens, React Router, Zustand stores, VexFlow staff rendering, weighted scoring, localStorage progress) and Go `/health` stub. 31 web tests (Vitest) + 1 Go test green, `npm run build` clean. Not yet spot-checked in a real browser.

## Done

- [x] Stack chosen: Vite + React + TypeScript + VexFlow (`web/`), Go `net/http` stub (`server/`) — see `docs/infra/stack.md`
- [x] System summary: phase/business plan + C4 diagrams (context / containers / components) — `docs/summary.md`
- [x] Drill 1 full design (generator, settings, difficulty, weighted scoring) — `docs/fe/drill-note-identification.md`
- [x] Drill 2 design, parked for Phase 2 — `docs/fe/drill-complete-measure.md`
- [x] Data model with cloud-sync plug — `docs/fe/data-model.md`
- [x] UI screens — `docs/fe/screens.md`
- [x] Backend placeholder plan — `docs/be/server.md`
- [x] Doc-sync rule + skill — `CLAUDE.md`, `.claude/skills/doc-sync/`
- [x] FE architecture: modules + Zustand store per module + core components — `docs/fe/architecture.md`, enforced by `.claude/skills/fe-design/`
- [x] Implementation workflow: gitignored `tmp/DD-MM-YYYY-<feature>/` plan + progress folders — `.claude/skills/impl-plan/`
- [x] `web/` scaffolded (Vite + React + TS); `server/` scaffolded (Go, `net/http`, `/health` on `:8080`)
- [x] Drill 1 (Note Identification) implemented: question generator, weighted scoring, 4 screens (Home, Drill, Results, Settings), React Router, Zustand `app` + `drills/note-id` stores, VexFlow `Staff` component, Web Audio pitch playback
- [x] `progressStore` (localStorage, versioned doc, cloud-sync plug) implemented and covered by tests
- [x] 37 web tests (Vitest) + 1 Go test green; `npm run build` clean

## In Progress

- Human browser spot-check: visual staff rendering across levels, audio pitch playback, full play-through at 375px viewport (one letters/naturals L1 session, one solfège/accidentals L2 session) — not runnable headlessly, remains for a human pass

## Next

- Phase 2 planning: Complete-the-Measure drill, login + cloud progress sync, subscriptions (Stripe)
- Phase 2 hygiene (deferred from Phase 1 review): best-score comparison ignores the settings combo
  (`screens.md` says same level + settings); WeekStrip charts practiceScore only, not accuracy;
  make the UTC-vs-local day-key regression test timezone-independent (the fix itself is verified,
  the test is only meaningful in negative-UTC-offset zones); stock `<title>`/README/favicon;
  1.36MB JS chunk (lazy-load VexFlow on the `/drill` route); move the 250ms tick interval and
  audio gain into `config/`

## Parked (Phase 2+)

- Complete-the-Measure drill (design already written)
- Login, subscriptions (Stripe), cloud sync of progress
- Ear training
