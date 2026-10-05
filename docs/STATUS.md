# Musoni — Project Status

> Last updated: 2026-10-05
> Read this first. One-minute overview of where the project stands.
> Maintained by the doc-sync rule (see CLAUDE.md) — must be updated in the same session as any change.

## What is Musoni

A web app for pure sheet-music reading training combined with music theory.
Phase 1: train note-identification speed on the staff. Phase 2 has begun with a second
drill, Nghe & Đàn (hear a note in a key, play it on the keys), and short theory lessons
(adapted from an open textbook, GNU FDL) that end on the drill that trains them, an Ôn tập
review of finished lessons, and two tabs (Luyện, Học). Later: more drills, login, subscriptions.

## Current Phase

**Phase 1 done; Phase 2 started with the Nghe & Đàn ear drill, theory lessons (chapter 1 of 9), the drill platform and Ôn tập** (web only, no login, localStorage progress; pending human browser verification)

## State

Phase 1 is complete on `main` and has grown well past the first cut: the note-id
drill runs as a self-contained SPA (setup / run / result) at `/train/note-id`,
answered on a fixed 12-key piano pad, scored as a pace with difficulty and
endurance multipliers, with any session length allowed. The app has two tabs:
**Luyện** (`/`: today's goal ring, streak and one picked drill with its reason, the
drills the reader has opened, the activity calendar) and **Học** (`/learn`: the next
lesson, the current chapter, Ôn tập); a first-open question sends a beginner to
lesson 1 and a reader to a one-minute Đọc nốt. The UI is Vietnamese-first with an
English switch, and answers play on a sampled piano. Leaving mid-session pauses the clock instead of
losing or miscounting the session. A second drill, **Nghe & Đàn** (`/train/hear-play`),
plays a cadence and one note and has the reader find it on the same piano pad, then
reveals it on the staff (relative pitch, four levels, the key moves from L2).
**Theory lessons** (`/theory`) teach in 3-5 minute bilingual steps (read, see on the staff, hear,
check on the piano pad) and end on a practice link that starts the matching drill with a
preset; lesson time counts toward the day's minutes and the streak. Chapter 1 is in; chapters
2-9 are ported one PR each against `docs/theory/port-guide.md`. Every drill is one
entry in a glob-discovered **drill registry** (`drills/<id>/drill.ts`) with its own
settings, strings, colour and the lesson that opens it; **Ôn tập** (`/train/review`)
asks the checks of finished lessons, weighted toward the ones missed.
Components follow atomic-design levels. Go `/health` stub behind it. 570 web tests (Vitest) + 1 Go test
green, `tsc` + `npm run build` clean, oxlint zero warnings, all enforced by CI on every PR. Not yet spot-checked in
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
      printed note. Replaces the old 8 sampled options
- [x] **Vietnamese-first i18n**: typed translator in `core/i18n/` (no dependency),
      `vi` default + `en`, compact cycle switch in the home header, `<html lang>`
      follows the setting; solfège (Do Re Mi) is now the default naming
- [x] Home leads with where the user stands: today's minutes, streak pill, and
      labelled Level / Length / Best on the drill card (now one `StatStrip`)
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
- [x] Note-id plays a sampled piano (Salamander Grand, CC BY 3.0, ~260 kB, lazy-loaded,
      sine fallback) and answers from a piano-shaped keyboard: `A S D F G H J` = C..B,
      `W E T Y U` = black keys; held-key repeats are ignored. Kawai samples requested;
      swap pending network access
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
- [x] CI: GitHub Actions runs web typecheck, oxlint (zero warnings), Vitest and Go vet/test
      on every PR and push to `main` — `.github/workflows/ci.yml`, `docs/infra/stack.md`
- [x] Lint clean: the run timer no longer calls `Date.now()` during render
- [x] Docs caught up with everything above (2026-10-02)
- [x] Swipe-back fix: going back (phone edge-swipe, browser back, the in-app back links)
      lands on home as it was, with no fade-out and no slide-in; back links step back through
      history instead of pushing `/`. 234 web tests green
- [x] **UI/UX refresh** (from the approved mockups, 2026-10-02): the staff holds still
      between answers and only the note fades in (two-layer `Staff`); a bigger staff with
      no card and the miss named under it; setup fits one phone screen (row clef cards,
      switches, compact naming toggle) with a sticky amber Start bar; home has a daily
      goal ring (5 min) and one-tap "Luyện ngay" that starts on the saved setup; result
      compares the score with the week average and best, and lists the notes to review.
      All start actions are amber. 263 web tests green — `docs/fe/screens.md`
- [x] **Leaving mid-session** (approved mockups, 2026-10-02): ✕ / Esc pause with a sheet
      that says what ending costs; switching apps pauses and welcomes the reader back;
      back or swipe pauses and home shows a "Tập tiếp" bar; ending early records a
      `partial` session (minutes count, no score, never a best) with its own result.
      Fixes the bug where a session abandoned by back and reopened after its clock ran
      out was saved as a full session and could set a best. 293 web tests green —
      `docs/fe/screens.md`, `docs/fe/drill-note-identification.md`, `docs/fe/data-model.md`
- [x] Pause sheet fixes (user feedback on #12): the sheet is now a `vaul` drawer that slides
      in and out and drags down (it had no animation), and time left is a clock ("9:40")
      so long sessions no longer overflow its column; the run timer shows m:ss from a minute
      up. Tests now fail on both regressions and on Esc re-pausing. 297 web tests green
- [x] Practice screen locked on phones: no bounce, no pull-to-refresh, no double-tap zoom while
      running (`overscroll-behavior: none` on `<html>` while the run phase is open; the old rule
      sat on `<body>`, where browsers ignore it; `touch-action: none` on the run surface).
      298 web tests green — `docs/fe/screens.md`
- [x] **Names on keys** setting (setup switch, on by default): off leaves the answer
      keys bare, so the reader trains finding the note on a keyboard; the marked keys
      show their names after each answer. Stored as `keyLabels`. The answer pad is now
      drawn like a real piano (long white keys, black keys over the gaps, always shown
      as landmarks), and the run screen fits 320×568 and 1280×800 without scrolling
      (it overflowed before). An "Answer keys" setting (Piano default / Ô) keeps the old
      box layout as a choice. 307 web tests green —
      `docs/fe/drill-note-identification.md`, `docs/fe/screens.md`, `docs/fe/data-model.md`
- [x] **Faster drill opening**: VexFlow is imported as `vexflow/bravura`, which drops
      three unused music fonts (drill chunk 726 → 425 kB gzipped); home prefetches the
      drill chunk when idle; a loading screen (keys pressing in turn, "Đang mở bài
      luyện…") covers a cold load. 309 web tests green — `docs/fe/screens.md`,
      `docs/infra/stack.md`
- [x] **Back stays in the drill**: back or a phone's edge-swipe during a session opens the
      pause sheet instead of dropping the reader on home; back from the result returns to
      setup, and only back from setup leaves. The session holds one history entry of its
      own (`app/drillStep`); the result's Home link skips past setup. 313 web tests green —
      `docs/fe/architecture.md`, `docs/fe/screens.md`
- [x] **Drill 2: Nghe & Đàn** (hear & play, relative pitch): an I-IV-V-I cadence sets the
      key, one note plays, the reader plays it on the 12-key pad (home note dotted), and it
      is revealed on the staff; right answers walk home to the tonic, misses play the pick
      then the note. Levels: home chord in C / Do-Sol in 3 keys / full scale in 5 keys /
      all 12 notes in 7 keys; the key changes every 6 questions from L2, with the cadence
      again (and on replay, Space). Own level and length settings (`earLevel`,
      `earDurationSec`, 2 min default), own bests; shares the pad, header, pause sheet,
      result screens and route behaviour with drill 1 (promoted to `core/components`,
      `app/useDrillRoute`, `app/useRunGuards`). Scheduled audio (`playSequence`,
      `stopSounds`). Fits 320×568, 375×812, 1280×800. 362 web tests green —
      `docs/fe/drill-hear-play.md`, `docs/fe/architecture.md`, `docs/fe/screens.md`,
      `docs/fe/data-model.md`, `docs/summary.md`
- [x] Back navigation follows where the session started (`app/useDrillRoute`): from
      home's Practice/Resume, back → home with the paused bar; from setup's Start, back →
      setup; result and ✕-before-any-answer back out the same way. Back no longer gets stuck re-opening the pause
      sheet. Matrix test `app/useDrillRoute.test.tsx` — `docs/fe/screens.md`,
      `docs/fe/architecture.md`, `docs/fe/drill-hear-play.md`
- [x] Docker image for Coolify: `web/Dockerfile` (Node 24 build, nginx serve),
      `web/nginx.conf` (SPA fallback, year-long cache for `/assets/`, gzip),
      `web/.dockerignore` — `docs/infra/stack.md` Deployment
- [x] **A session survives a page load**: a refresh or typed URL mid-session used to drop
      it (setup, nothing saved, paused bar gone). Now each drill keeps its running session
      through `progressStore` (`musoni-live-v1`, `app/liveSession`) and brings it back
      paused with the welcome-back sheet; home shows the paused bar; after 30 min it is
      kept as ended early. Tests at store, helper, app-store and route level —
      `docs/fe/data-model.md`, `docs/fe/screens.md`, `docs/fe/architecture.md`
- [x] Nghe & Đàn level pictures: plain keyboard with a violet dot per note the level
      uses, instead of solid blue lit keys that merged into a block (`MiniKeyboard`) —
      `docs/fe/drill-hear-play.md`, `docs/fe/screens.md`
- [x] **Nghe & Đàn listening aids and violet colour**: setup's "Nghe" group with "Nghe
      giọng trước mỗi nốt" and "Giữ một giọng (Do)" (off by default; one key disabled at
      L1); aided sessions saved with `aids: true` never set a best and say so on the
      result; "Đổi giọng" now shows only on a real key change (`keyChanged`); drill 2's
      action colour is violet (`[data-drill="hear-play"]`, AA contrast 5.2 light / 7.3
      dark) — `docs/fe/drill-hear-play.md`, `docs/fe/screens.md`, `docs/fe/data-model.md`,
      `docs/fe/architecture.md`, spec + plan in `docs/superpowers/`
- [x] Home → drill no longer flashes a blank page and snaps: loaded drill code renders
      without suspending (`app/routes` `splitPage`), the slide-in can't overflow sideways
      (`#root` `overflow-x: clip`), a stable scrollbar gutter stops the sideways shift, and
      forward navigation opens at the top — `docs/fe/screens.md`, `docs/fe/architecture.md`
- [x] Dev/preview server exposed on the LAN (`server.host`/`preview.host: true` in
      `web/vite.config.ts`) for testing on phones/other machines — `docs/infra/stack.md`, `README.md`

- [x] **Theory lessons framework + chapter 1** (2026-10-05): `theory` module with typed
      bilingual content (chapter → lessons → steps → blocks: text, staff, play, keys, tip,
      checks answered on the piano pad or 2-4 choices, each with a reason), pitch tokens
      printed in the reader's naming, an `import.meta.glob` registry, a content validator
      run on every chapter, routes `/theory`, `/theory/:chapter/:lesson`, `/theory/about`
      (lazy), the lesson player (step bar, sticky Tiếp, end screen with recap, score,
      "Luyện ngay" card, next lesson, source line), lesson progress and reading time
      through `progressStore` (additive: `theory.done`, `days[].lessons`; time counts toward
      minutes and streaks), a home "Học lý thuyết" card, GFDL `LICENSE` + `NOTICE.md` +
      About page. Drill presets (`app/drillPreset.ts`) start a drill with a lesson's level
      and length for that session only. Core gained a notation parser
      (`core/music/notation`), `NoteStaff` (any clef incl. alto/tenor, grand staff, rhythms)
      and a multi-octave `MiniKeyboard`. Chapter 1 (book 1.1-1.3): pitch and note names,
      staff and clefs, C clefs, octaves and middle C, review. Screenshots:
      project files `screenshots/theory-ch01/`. 506 web tests green —
      `docs/theory/framework.md`, `docs/theory/ch01-pitch-staff.md`,
      `docs/theory/port-guide.md` §7, `docs/fe/architecture.md`, `docs/fe/screens.md`,
      `docs/fe/data-model.md`, `docs/summary.md`

- [x] **Drill platform, tabs and Ôn tập** (2026-10-05): a glob-discovered **drill
      registry** (`app/drill.ts` `defineDrill`, `app/drills.ts`): each drill declares id,
      route, icon, group, order, levels, defaults, preset options, starter line, colour,
      `unlockedBy` and `listed` in `drills/<id>/drill.ts` with its own strings
      (`defineStrings`); routes, loading screen, prefetch, presets and the lesson
      validator, live session, paused bar, colours and bests all read it ("How to add a
      drill" in `docs/fe/architecture.md`). Settings are per drill
      (`settings.drills[id]`, progress document **version 2**, tested v1 → v2 migration).
      **Tabs**: Luyện `/` and Học `/learn` (bottom bar on phones, top on desktop, hidden in
      drills and lessons; `/theory` routes kept), a **first-open** question
      (`/welcome`: beginner → lesson 1.1, reader → one-minute Đọc nốt; saved as
      `startPoint`, changeable from Học, skipped with any history). Luyện: **Hôm nay**
      card (ring, streak, one pick from the pure tested `app/practicePlan.pickToday`, its
      reason, amber Bắt đầu), "Bài luyện của bạn" with only unlocked drills (stats and
      Luyện once played, "Chưa tập" / "Mới mở" before), a dashed line counting drills
      still to open with Xem tất cả. Học: Học tiếp card, the current chapter, other
      chapters link, Ôn tập card. **Ôn tập** (`drills/review`, not listed on Luyện):
      timed session over finished lessons' checks with the reason, weighted by
      per-check history in progressStore (unseen 3, +0.25/day, missed +6, no repeat of
      the last 3), chapter choice in setup, one implicit level, result listing misses
      linked to their lessons; reuses the lesson's step components (promoted to
      `core/components`, `core/lesson`). Home, `PracticeCard`, `TheoryCard`,
      `ComingSoonCard` and the dead `config/presets.ts` removed. Note-id and Nghe & Đàn
      look the same (setup screenshots identical before/after). 570 web tests green.
      Screenshots: project files `screenshots/drill-platform/` — `docs/fe/architecture.md`,
      `docs/fe/data-model.md`, `docs/fe/screens.md`, `docs/fe/drill-review.md`,
      `docs/fe/drill-note-identification.md`, `docs/fe/drill-hear-play.md`,
      `docs/theory/framework.md`, `docs/theory/port-guide.md`, `docs/summary.md`

## Theory chapters

Port guide: `docs/theory/port-guide.md`; one PR per chapter.

| Chapter | Folder | Book | State |
|---|---|---|---|
| 1. Cao độ & khuông nhạc | `ch01-pitch-staff` | 1.1-1.3, 1.6 | Done (PR 0, reference chapter) — `docs/theory/ch01-pitch-staff.md` |
| 2-9 | | | To port |

## In Progress

- Human browser spot-check: visual staff rendering across levels, the piano pad
  in both spellings, the wrong-note overlay on the staff, audio pitch playback,
  the activity panel expand/collapse, both languages, full play-through at 375px
  viewport, and listening to Nghe & Đàn (cadence, walk home, miss playback) on a
  phone — not runnable headlessly, remains for a human pass
- Theory chapters 2-9 (one PR each, see the table above); a human pass over chapter 1's
  sound (the "Nghe" buttons) and the lesson-to-drill-and-back flow on a phone
- Four drills on the new registry, built in parallel: key signatures, intervals,
  chords, rhythm (each declares the lesson that opens it with `unlockedBy`). Until
  one does, Luyện's "more drills" line stays hidden (every listed drill is open)

## Next

- Nghe & Đàn follow-ups: echo phrases (2-3 notes played back in order) once the
  single-note drill has been tried; a human ear check of the cadence and the timings
  (`EAR_*` in `config/`).
- Drill 3 candidate: "read the shape" (2-4 note groups on the staff, played in order);
  chords as their own drill after it; Complete-the-Measure to be reshaped into
  tap-the-rhythm.
- Login + cloud progress sync, subscriptions (Stripe)
- Phase 2 hygiene: nothing open.
  Closed: the dead `config/presets.ts` (deleted with the drill platform); the stale `result.yourBest` copy (replaced by the comparison bar); the local-day-key regression test pins its timezone per case (UTC+7 and
  UTC−7), so it fails on any runner if bucketing regresses to UTC; real `<title>`,
  description and favicon; project README and a real `web/README.md`; CI and a
  zero-warning lint; WeekStrip removed (the activity panel charts minutes, not
  score); best-score keying settled (level only, since score is a pace); VexFlow
  lazy-loaded; tick interval and audio gain moved into `config/`.

## Parked (Phase 2+)

- Complete-the-Measure drill (design already written)
- Login, subscriptions (Stripe), cloud sync of progress
- More ear training (chords by ear, echo phrases)
