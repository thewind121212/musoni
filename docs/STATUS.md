# Musoni — Project Status

> Last updated: 2026-10-02
> Read this first. One-minute overview of where the project stands.
> Maintained by the doc-sync rule (see CLAUDE.md) — must be updated in the same session as any change.

## What is Musoni

A web app for pure sheet-music reading training combined with music theory.
Phase 1: train note-identification speed on the staff. Later: rhythm drills, ear training, subscriptions.

## Current Phase

**Phase 1 — implemented and redesigned, pending human browser verification** (web only, no login, localStorage progress)

## State

Phase 1 is complete on `main` and has since been redesigned: the note-id drill runs as a self-contained SPA (setup / run / result phases) at `/train/note-id`, styled with Tailwind v4 over semantic light and dark tokens, with a Go `/health` stub behind it. 43 web tests (Vitest) + 1 Go test green, `npm run build` clean. Not yet spot-checked in a real browser.

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
- [x] Drill 1 (Note Identification) implemented: question generator, weighted scoring, Zustand `app` + `drills/note-id` stores, VexFlow `Staff` component, Web Audio pitch playback
- [x] `progressStore` (localStorage, versioned doc, cloud-sync plug) implemented and covered by tests
- [x] 37 web tests (Vitest) + 1 Go test green; `npm run build` clean
- [x] UI redesign: Tailwind v4 + semantic light/dark tokens, Geist type, Phosphor icons,
      Motion feedback; the hand-rolled `index.css` classes are gone
- [x] Drill restructured as a self-contained SPA: React Router is app-level only
      (`/`, `/train/note-id`), phases (setup / run / result) live in the drill store
- [x] Session length setting (30s / 1 min / 2 min / 5 min); personal bests keyed on
      level **and** length
- [x] Drill route lazy-loaded: home ships 77 kB gzip instead of 815 kB
- [x] 43 web tests green after the redesign
- [x] Setup screen rebuilt as visual option cards: real VexFlow clef badges per level,
      note names shown as themselves, natural/sharp/flat signs, Phosphor icons
- [x] Motion added where it was missing: route slide, drill phase cross-fade, card press
- [x] Answer options locked to 8 with accidentals on; answer pad lays rows out
      full-width so 7 naturals still fill the block
- [x] Fixed blank clef badges: notation boxes now sized from real stave geometry
      (VexFlow reserves space above the stave), covered by `Staff.test.ts`
- [x] Hybrid layout: desktop is a first-class target, not a narrow phone column.
      Home goes two-column, setup lays options in a grid, the drill widens with a
      larger staff and timer, and keyboard hints show on `md:` and up
- [x] Note-id plays a sampled piano (Salamander Grand, CC BY 3.0, ~260 kB, lazy-loaded,
      sine fallback) and answers from a piano-shaped keyboard: `A S D F G H J` = C..B,
      `W E T Y U` = black keys. Kawai samples requested; swap pending network access
- [x] Phone fixes: the home card's level / length / best no longer overflow at 375px
      (one three-column `StatStrip`), and the drill header counts wrong answers next to
      right ones (green check / red cross pills)
- [x] Guard tests for the piano / keyboard / phone-fix work: `RunPhase` (right and wrong
      counts, streak from 3, held-key repeat, Cmd/Ctrl chords, one answer per note,
      sound on/off), `playPitch` (sine fallback, sample rate and pitch shift, fetch-once,
      failed loads, no Web Audio) and `StatStrip` (shrinkable columns, no truncation).
      125 web tests green
- [x] Atomic component structure (Phase 1 of the test plan): every component sits at one
      level (atoms / molecules / organisms / templates / pages) in its own folder, per module;
      only pages read stores and progress. New shared atoms `CountPill`, `ProgressBar`, `Chip`,
      `StatTile`, `IconStat`, `FieldLegend`; drill pieces `PianoKey`, `AnswerPad`, `RunHeader`,
      `QuestionStaff`, `ResultSummary`. `@/` import alias, Testing Library added. No visible
      change (screenshots match `main`), 125 tests green — `docs/fe/architecture.md`
- [x] Component tests (test plan Phase 2): a `.test.tsx` beside every component and page,
      Testing Library + jest-dom. Each renders with default props and tests only logic that
      can break (no assertions on constants); deliberately breaking 13 pieces of logic
      fails a test every time. `src/test/render.tsx` removed. 228 web tests green
- [x] Home fixes: coming back from a drill no longer blanks and re-slides every block (the
      entrance plays once per visit), and the practice card's `>` arrow is now
      "Luyện tập →" as a filled amber button (new `--cta` token; compact on the title row on phones, larger on desktop). 229 web tests green

## In Progress

- Human browser spot-check: visual staff rendering across levels, audio pitch playback, full play-through at 375px viewport (one letters/naturals L1 session, one solfège/accidentals L2 session) — not runnable headlessly, remains for a human pass

## Next

- Phase 2 planning: Complete-the-Measure drill, login + cloud progress sync, subscriptions (Stripe)
- Phase 2 hygiene from the Phase 1 review: all closed (2026-10-02). The local-day-key
  regression test now pins its timezone per case (UTC+7 and UTC−7), so it fails on any
  runner if bucketing regresses to UTC; real `<title>`, description and favicon; project
  README and a real `web/README.md`. The WeekStrip item is moot: WeekStrip was replaced by
  the activity panel, which charts practice minutes by design.
  Closed during the redesign: best-score now keyed on level and length, VexFlow lazy-loaded,
  tick interval and audio gain moved into `config/`.

## Parked (Phase 2+)

- Complete-the-Measure drill (design already written)
- Login, subscriptions (Stripe), cloud sync of progress
- Ear training
