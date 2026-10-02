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

Phase 1 is complete on `main` and has grown well past the first cut: the note-id
drill runs as a self-contained SPA (setup / run / result) at `/train/note-id`,
answered on a fixed 12-key piano pad, scored as a pace with difficulty and
endurance multipliers, with any session length allowed. Home leads with today,
a streak and a 20-week activity calendar. The UI is Vietnamese-first with an
English switch. Go `/health` stub behind it. 98 web tests (Vitest) + 1 Go test
green, `tsc` + `npm run build` clean, oxlint 1 warning. Not yet spot-checked in
a real browser.

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
- [x] UI redesign: Tailwind v4 + semantic tokens, Geist type, Phosphor icons,
      Motion feedback; the hand-rolled `index.css` classes are gone
- [x] Drill restructured as a self-contained SPA: React Router is app-level only
      (`/`, `/train/note-id`), phases (setup / run / result) live in the drill store
- [x] Drill route lazy-loaded (VexFlow ships only with the drill chunk)
- [x] Setup screen rebuilt as visual option cards: real VexFlow clef badges per level,
      note names shown as themselves, natural/sharp/flat signs, Phosphor icons;
      each group has a marked header saying what it controls
- [x] Motion added where it was missing: route slide, drill phase cross-fade, card press
- [x] Fixed blank clef badges: notation boxes now sized from real stave geometry
      (VexFlow reserves space above the stave), covered by `Staff.test.ts`
- [x] Hybrid layout: desktop is a first-class target, not a narrow phone column.
      Theme locked to white paper; dark palette kept as opt-in `data-theme="dark"`
- [x] Quit is an icon; drill header center-aligned
- [x] **Fixed 12-key piano answer pad**: 7 naturals along the bottom, 5 black keys
      above the real gaps (hidden in naturals-only mode), spelled to match the
      printed note. Keyboard 1-7 + q w e r t. Replaces the old 8 sampled options
- [x] **Vietnamese-first i18n**: typed translator in `core/i18n/` (no dependency),
      `vi` default + `en`, compact cycle switch in the home header, `<html lang>`
      follows the setting; solfège (Do Re Mi) is now the default naming
- [x] Home leads with where the user stands: today's minutes, streak pill, and
      labelled Level / Length / Best chips on the drill card
- [x] **Pace-based scoring + any session length**: score = correct per minute ×
      10 × difficulty × accuracy; lengths 30s / 1 / 2 / 5 min plus an Other stepper
      (1-30 min). Bests keyed on **level only**, across lengths
- [x] Session lengths grounded in note-naming pedagogy (One-Minute Club, 2 min ×2/day,
      30s as a streak-keeper)
- [x] **Endurance multiplier**: +0.3 per doubling of length from a 1-minute baseline
      (floor 0.6); shown with the difficulty multiplier as chips on the result screen
- [x] Generator never repeats a note back to back; correct answers flash for 260 ms,
      misses hold 1.1 s; the staff colours the note and draws a wrong pick beside it
- [x] **Activity calendar**: minutes per day (not score), short week view by default,
      expandable to a 20-week heatmap with longest streak and active days; mode is
      persisted; fixed today missing from its own calendar and the clipped today ring
- [x] 98 web tests (Vitest) + 1 Go test green; `tsc -b && vite build` clean
- [x] Docs caught up with everything above (2026-10-02)

## In Progress

- Human browser spot-check: visual staff rendering across levels, the piano pad
  in both spellings, the wrong-note overlay on the staff, audio pitch playback,
  the activity panel expand/collapse, both languages, full play-through at 375px
  viewport — not runnable headlessly, remains for a human pass

## Next

- Phase 2 planning: Complete-the-Measure drill, login + cloud progress sync, subscriptions (Stripe)
- Phase 2 hygiene:
  - Make the UTC-vs-local day-key regression test timezone-independent (the fix
    itself is verified, the test only discriminates in some UTC offsets).
  - README and favicon are still the stock ones (the `<title>` is fixed).
  - `config/presets.ts` (warm-up / daily / challenge) is dead code: wire it into
    setup or delete it.
  - Result copy still says "your best at this level **and length**"
    (`result.yourBest`, English only); bests are level-only now.
  - oxlint warning: `Date.now()` during render in `RunPhase.tsx:51`.
  - Drill chunk is ~700 kB gzip (VexFlow + fonts); home is ~128 kB gzip.
    Worth a look before launch.
  - No CI: tests, typecheck and lint only run locally.
  Closed since the Phase 1 review: WeekStrip removed (the activity panel charts
  minutes, not score), best-score keying settled (level only, since score is a
  pace), VexFlow lazy-loaded, tick interval and audio gain moved into `config/`.

## Parked (Phase 2+)

- Complete-the-Measure drill (design already written)
- Login, subscriptions (Stripe), cloud sync of progress
- Ear training
