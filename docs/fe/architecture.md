# FE Architecture — Modules, Core Components, State

> Rule source of truth: `.claude/skills/fe-design/SKILL.md` (enforced on every FE task).
> This doc captures the architecture itself.

## Modules & state (Zustand)

The FE is composed of **modules**, each owning one **Zustand store**:

| Module | Store | Holds |
|---|---|---|
| `app` (global) | `app/store.ts` | app-wide state: user settings (each drill's own workout under `settings.drills[id]`, naming, keys, sound, language, activity-panel mode, the first-open answer `startPoint`); keeps `<html lang>` in step with the language; `pausedSession`, which a drill publishes when the reader leaves mid-session so the tabs can offer the way back |
| `drills/note-id` | `drills/note-id/store.ts` | live drill session: current question, options, score, streak, timer, pause state |
| `drills/hear-play` | `drills/hear-play/store.ts` (`useEarStore`) | Nghe & Đàn session: current key and note, questions in this key, when the note sounded, score, streak, timer, pause state (see `drill-hear-play.md`) |
| `drills/review` | `drills/review/store.ts` (`useReviewStore`) | Ôn tập session: the check on screen (by id), its answer, the last few asked, score, streak, timer, pause state (see `drill-review.md`) |
| `theory` | `theory/store.ts` (`useTheoryStore`) | the lesson player's place: open lesson, step, answers to its checks; time read not yet saved; the chapter open on the list (see `docs/theory/framework.md`) |
| *(later)* `drills/complete-measure` | its own store | its session state |

Modules never import each other's stores; sharing goes through `app` or props.

## Routing vs drill phases

React Router covers **app-level** navigation only: the two tabs, **Luyện**
(`/`, the default) and **Học** (`/learn`); the first-open question
(`/welcome`); one route per registered drill (`/train/<id>`, made from the
drill registry, below); and the theory lessons (`/theory`,
`/theory/:chapter/:lesson`, `/theory/about`). Every page but Luyện and the
first-open question is a lazy chunk (`app/routes.ts`; a drill's chunk comes
from its registry entry's `page`). Account and settings pages join that table
later. A lesson's steps are not routed either: the step lives in the theory
store, like a drill's phase.

**Tabs** (`app/useTabs.ts`, rules in `screens.md`): the tab bar (`TabBar`,
drawn by the `TabChrome` page outside the route transition, with the paused
bar) shows on `/` and `/learn` only. Switching tabs is instant (route state
`FROM_TAB`). Học opened from Luyện's tab bar is pushed above it, so back and
the Luyện tab both step back to it; Luyện tapped from a Học opened any other
way replaces it. A brand-new reader (no `startPoint`, no history) is sent from
either tab to `/welcome` first (`app/firstOpen.ts`).

Inside a drill route the flow is **not** routed. Each drill is a self-contained
SPA with phases held in its own store:

`setup` (level, session length, drill settings) -> `running` (the sprint) ->
`finished` (result), plus `backToSetup()`.

Training never changes the URL: no route change when a session starts, ends, or
is retried. Back goes where the reader came from. A session started from setup's
Start holds **one history entry** (same URL, state marked by `app/drillStep`)
above setup's; `app/useDrillRoute` pushes it on that setup → session step and
reads a step back off it as "back to setup" (`backToSetup`: played time still
counts). A session started from a tab or a lesson (`autostart`, `resume`) gets no entry, so
back leaves the drill for where it came from, and `useRunGuards` pauses it and publishes the
paused-session bar; ending one with nothing to keep (✕ before any answer) also
steps back to the tab it came from. It also
applies the route state of the tabs and lessons (`autostart`, `setup`, `resume`) before the phase is
first read. `autostart` may carry a **drill preset** (`app/drillPreset.ts`,
`{ drill, level, durationSec, ...options }`, options limited to the drill's
`presetOptions`): a theory lesson's "Luyện ngay" and Luyện's Hôm nay card
start the drill with those settings for that one session (`withPreset` lays
them over the reader's settings in the drill store; nothing is saved, and the
result screen's Again replays the session's settings). A drill ignores another
drill's preset. `useBackLink` knows about the entry, so the result screen's Home (Học for Ôn tập)
link steps back past setup in one go.

Every drill route uses the same two app hooks, given its own store:
`useDrillRoute(controls)` in the drill page (a module-level `controls` object
built on the store's `getState()`), and `useRunGuards(store.getState)` in the
run phase, which pauses when the page is hidden or the route is left
(publishing `pausedSession` for the tabs) and locks overscroll while the run
screen is open.

A running session also survives a **page load** (refresh, a typed URL, a
crash). Each drill store calls `keepLiveSession(store, drill, route)`
(`app/liveSession`) once after it is created: it saves the session through
`progressStore` on every change while it runs, clears it when it ends, and on
load brings it back paused (`pauseReason: 'away'`, so the run screen greets the
reader back), moving past a question already answered. Older than
`LIVE_SESSION_MAX_AGE_MS` (30 min) it is ended as at the moment it stopped and
forgotten. The app store starts `pausedSession` from the freshest saved session
(`livePausedSession`), so Luyện shows the paused bar after a reload too.

## Drill registry

Every drill is one folder, `drills/<id>/`, whose `drill.ts` default-exports
`defineDrill({...})` (`app/drill.ts`). `app/drills.ts` finds them all with
`import.meta.glob('../drills/*/drill.ts', { eager: true })`, so **adding a
drill touches no shared file**. An entry declares:

| Field | What it drives |
|---|---|
| `id` | the route `/train/<id>`, `settings.drills[id]`, sessions and bests (`SessionResult.drill`), live session key, `data-drill` |
| `page` | the lazy page (`() => import('./pages/XDrill').then(m => m.XDrill)`) wrapped by `DrillRoute` (loading screen, colour scope) and prefetched from Luyện |
| `icon`, `title`, `description`, `short?`, `starter?` | Luyện's card, a lesson's practice tag and offer, Hôm nay's title and its "Bắt đầu nhẹ: {starter}" line |
| `group` (`read` / `ear`), `order` | the drill's place on Luyện |
| `levels` (`{ name, detail? }[]`) | level names on the stat strip, setup summaries and preset summaries; preset and validator range checks. One level = no level stat |
| `defaults` (`{ level, durationSec, ...options }`) | the workout a reader starts with; `entry.of(settings)` = saved values over these |
| `presetOptions?` | which options a lesson preset or Hôm nay may set (others stay the reader's own) |
| `tags?(s, t)` | extra words in one-line summaries ("♯ ♭") |
| `colour?` | its own CTA colour, light and dark (CSS generated by `drillColourCss`) |
| `unlockedBy?` | the lesson key (`<chapter id>/<lesson id>`) that opens it on Luyện; absent = open from the start |
| `listed?` | `false` keeps it off Luyện, Hôm nay and the to-open count (Ôn tập) |

Keep `drill.ts` light (strings, icon, config constants): it loads with the
app. The registry's helpers: `allDrills()`, `listedDrills()`, `findDrill(id)`,
`drillAtRoute(path)`, `drillColourCss()`, and `addDrills(...)` (tests add a
fake drill with it, `src/test/fakeDrill.ts`). Unlocks and the Hôm nay pick are
pure functions over the registry in `app/practicePlan.ts`.

### How to add a drill

1. `drills/<id>/strings.ts`: `export const S = defineStrings('<id>', en, vi)`
   with at least `title`, `what` (one line for Luyện), `short`, `starter`
   (what a first level-1 session asks, lower case, no full stop) and
   `level.N` / `level.N.detail`. Shared words (Start, Length, Best...) stay in
   `core/i18n`; never edit `translations.ts` for a drill.
2. `drills/<id>/drill.ts`: `export type XOptions = { ... }` (a **type**, not an
   interface) and `export default defineDrill<XOptions>({ id, page, icon,
   title: S.title, description: S.what, short, starter, group, order, levels,
   defaults, presetOptions?, tags?, colour?, unlockedBy? })`. Pick an `order`
   that leaves gaps (10, 20...). Declare the unlock lesson as its key, e.g.
   `unlockedBy: 'keys/key-signatures'`; a lesson not written yet simply keeps
   the drill unopened (still playable from "Xem tất cả").
3. `drills/<id>/store.ts`: one Zustand store with `phase`, `settings`
   (the session's), `start(settings)`, `answer`, `nextQuestion`, `tick`,
   `backToSetup`, `pause`, `resume`, `endEarly`, reading its own workout with
   `entry.of(settings)`. Record sessions with `drill: entry.id`; call
   `keepLiveSession(store, entry.id, entry.route)` after creating it.
   Tunables go in `config/constants.ts` (new names, no edits to others').
4. `drills/<id>/pages/`: `XDrill` (`useDrillRoute(controls)`; `autostart`
   applies `withPreset(saved, preset)` when `preset?.drill === entry.id`),
   `SetupPhase` (writes with `updateDrill(entry.id, patch)`, summary from
   `sessionSummary(entry, own, t)`), `RunPhase` (`useRunGuards`, `RunHeader`,
   `PausePanel`), `ResultPhase` (`getBest(entry.id, level)`). Reuse core
   components; promote rather than copy.
5. Tests beside each file, plus the store's logic. The registry wiring itself
   (route, Luyện card, presets, defaults, unlock) is already covered with the
   fake drill.
6. Docs: `docs/fe/drill-<id>.md`, a row in the modules table above, and
   `docs/STATUS.md`. Lessons link to it with `practice: { drill: '<id>',
   level, durationSec, ...presetOptions }`; the content validator checks it
   against the entry.

## Core components (`core/`)

Shared, module-agnostic, reuse-first building blocks:

- `core/components/` — the shared UI library, split by atomic level (see
  **Component levels** below). Its one organism is **Staff**, the only component
  allowed to touch VexFlow. Staff repaints itself from the `--staff` token so
  notation stays legible in dark mode, and exports `ClefGlyph` (a clef on a
  short stave) so level choices can show real notation instead of an
  icon-library stand-in. Staff also takes a feedback `tone` (the printed note
  turns green once answered) and an optional `chosen` pitch, drawn beside the
  answer in red on a miss.

  Two sizing rules live there, both learned from a bug that rendered the clef
  badges blank: VexFlow reserves blank space above a stave (lines land at
  y=40..80 inside the render box), so a viewBox taken from the nominal box cuts
  the notation off. `ClefGlyph` crops to the drawn ink; `Staff` instead pins its
  viewBox to the stave lines plus `LEDGER_ROOM`, because cropping per note would
  resize the box and make the staff jump between questions. `Staff.test.ts`
  guards both. Staff draws in two layers sharing that viewBox: the stave and
  clef underneath (redrawn only when the clef or size changes) and the notes on
  top (keyed on the question, so only the note is replaced and fades in).
  The tests also pin that a new question keeps the stave's SVG node.
  The same folder holds **NoteStaff**, the general notation renderer for
  lessons: several notes, chords, rests, durations, ties, tuplets, bar lines,
  key and time signatures, any clef (treble, bass, alto, tenor), a grand staff
  (brace, notes from middle C up on top unless `@t`/`@b` says otherwise) or
  bare lines (`none`). It crops its viewBox to the drawn ink, puts labels under
  the notes as HTML (so they wrap the reader's naming and font), draws chosen
  notes blue and takes the same `tone`/`chosen` feedback as Staff. Its input
  is the parsed notation from `core/music/notation`. `theme.ts` holds the
  shared ink colour and the redraw-on-theme hook.
- `core/music/` — shared pitch/note domain types and helpers (parsing,
  diatonic indexing, labeling, `pitchFromMidi`) used by the generators and
  Staff; `pianoKeys.ts` builds the 12-key answer pad (`buildOptions`,
  `NoteOption`); `keyboard.ts` maps the computer keyboard onto it; `keys.ts`
  holds major keys, their spelling, the I-IV-V-I cadence and the walk home to
  the tonic (Nghe & Đàn).
- `core/music/notation.ts` — a small strict text notation for music in data
  (`C4 E4 G4`, `C4+E4+G4:h`, `R:q`, `|`, ties, tuplets, `@t`/`@b`): parser,
  error messages naming the bad token, MIDI and sounding pitch, and
  `toSounds` for playback. Grammar in its header and in
  `docs/theory/port-guide.md` section 7. `Clef` includes `alto` and `tenor`.
- `core/music/pitch.nearestOctave` places an answer key (a name with no octave)
  at the octave nearest the printed note, so a wrong pick can be drawn on the
  staff.
- `core/lesson/` — the lesson format (`types.ts`), its text tokens
  (`text.ts`), block helpers (`blocks.ts`: pad for a key check,
  `answerFromKey` for the computer keyboard, play sounds) and `usePlayBlock`.
  Shared by the theory lessons and Ôn tập.
- `core/scoring.ts` — pace-based scoring with difficulty and endurance
  multipliers, shared by any drill.
- `core/i18n/` — the translator (see i18n below), `formatDuration` and
  `formatElapsed` (time played: "12 giây", "2 phút 5 giây") and `formatClock`
  (time left: "9:40").
- `core/audio/` — pitch playback (Web Audio): sampled piano with a sine fallback;
  `playSequence` schedules notes and chords on the audio clock (a cadence, a
  walk home) and `stopSounds` cuts off everything playing or scheduled;
  `piano.ts` holds the pure nearest-sample math.
- `core/engine/` — reserved for a shared drill lifecycle
  (`generate → render → answer → feedback → next`) if a second drill needs
  one. **As built for Phase 1 it is an empty placeholder**: the note-id
  drill's own Zustand store (`drills/note-id/store.ts`) implements the
  lifecycle directly (`start` / `answer` / `tick` / `nextQuestion`), calling
  the generator, scoring, and progress store itself. Extract a real engine
  out of it if/when Complete-the-Measure (Phase 2) needs to share the
  lifecycle — don't build it speculatively for one drill.

Core components are pure (props in, events out): no store imports, no
persistence, no drill knowledge. A drill-local component needed by a second
module is promoted to core, not copied. Nghe & Đàn promoted the answer pad
(`PianoKey`, `AnswerPad`, `KeyHint`), the run header, pause sheet, staff,
missed-notes and result summaries (`ResultSummary` now takes the level's name
as a prop), the duration picker and `MissLine` out of `drills/note-id`, so both
drills draw the same screens. Ôn tập promoted the lesson's check components
(`RichText`, `TipBox`, `PlayButton`, `CheckVerdict`, `ChoiceList`,
`LessonBlocks`, `StepView`) and the lesson format out of `theory`; the tabs
promoted `LanguageToggle` and added `DrillCard`.

## i18n

Vietnamese first (`DEFAULT_LANG = 'vi'`), English second. No i18n dependency:

- `core/i18n/translations.ts` holds both dictionaries. **English is the source
  of truth for the key set** and `vi` is typed against it, so adding a string
  without translating it fails the build.
- `core/i18n/translate.ts` is a pure lookup (`translate(lang, key, params)`):
  `{name}` interpolation, plurals via `Intl.PluralRules` (write the base key
  plus a `_one` variant; Vietnamese needs none), fallback to English, and a
  development warning when a key resolves to nothing rather than silently
  rendering the key.
- A drill ships its own strings from its folder: `defineStrings(id, en, vi)`
  (Vietnamese typed against English) registers `drill.<id>.<name>` keys with
  the translator and returns them (`S.title`), so a drill PR never edits
  `translations.ts`. `Translate` takes core keys or drill keys (`AnyKey`).
- `app/useT.ts` binds the translator to the chosen language. Core stays free of
  app state; components call `useT()`.
- `formatDuration` labels any session length: offered lengths use their own
  phrasing, custom lengths render in minutes. Never build a key by
  interpolating a value (`duration.${seconds}`): custom values have no key,
  which is how `duration.480` once reached the UI.

## Component levels (atomic design)

Every component sits at one level, in its own folder, inside the module that
owns it (`core/components/`, `app/components/`, `drills/<name>/components/`):

| Level | What it is | Examples |
|---|---|---|
| atom | one element, no children components of ours | `Button`, `Panel`, `CountPill`, `ProgressBar`, `Chip`, `StatTile`, `IconStat`, `FieldLegend`, `GoalRing`, `Switch`, `KeyHint`, `MissLine`, `MiniKeyboard` (1-4 octaves, dot or fill marks, names under keys), `RichText`, `TipBox`; theory: `StepBar`, `LessonDot` |
| molecule | a few atoms doing one job | `OptionCards`, `StatStrip`, `SegmentedControl`, `SettingRow`, `ScoreCompare`, `LanguageToggle`, `PianoKey`, `DurationPicker`, `SessionStats`, `PlayButton`, `ChoiceList`, `CheckVerdict`; app: `PausedNotice`, `MoreDrills`, `StartOption`; theory: `LessonRow`, `PracticeOffer`, `SourceLine` |
| organism | a self-contained section of a screen | `Staff`, `AnswerPad`, `RunHeader`, `QuestionStaff`, `ResultSummary`, `EarlyEndSummary`, `MissedNotes`, `PausePanel` (a `vaul` bottom sheet), `DrillCard`, `LessonBlocks`, `StepView`; app: `ActivityPanel`, `ActivityCalendar` (`ActivityWeek` + `ActivityGrid`), `TabBar`, `TodayCard`; hear-play: `ListenStage`; review: `MissedChecks`; theory: `LessonEnd`, `ChapterCard`, `NextLessonCard` |
| template | layout shell with no content of its own | `PageTransition`, `LessonFrame` (theory) |
| page | one screen or drill phase; the **only** level that reads stores | app: `PracticeTab` (Luyện), `FirstOpen`, `TabChrome`, `DrillRoute`, `DrillLoading`; `NoteIdDrill`, `HearPlayDrill`, `ReviewDrill`, and each drill's `SetupPhase`, `RunPhase`, `ResultPhase`; theory: `LearnTab` (Học), `ChapterList`, `LessonPlayer`, `TheoryAbout` |

Rules:

- **Only pages touch state.** Pages read the Zustand stores, `useT()` and
  `progressStore` getters, and pass plain values and callbacks down. Atoms,
  molecules, organisms and templates are pure in every module, not just in
  `core`; text arrives as strings or as a `t: Translate` prop. Pure date
  helpers such as `localDayKey` are fine to import; reads and writes are not.
- **One folder per component**: `X/X.tsx`, `X/index.ts`, and `X/X.test.tsx`
  next to it. A folder may group components that only make sense together
  (`ActivityCalendar` holds the week row, the heatmap and their shared shade
  scale).
- **Barrels per level** (`atoms/index.ts`, ...). Import across folders through
  the `@/` alias and the level barrel: `import { Button } from
  '@/core/components/atoms'`. Inside one folder, import relatively.
- `package.json` declares `"sideEffects": ["**/*.css"]` so the bundler can drop
  barrel re-exports a chunk never uses. Without it, importing one atom on the
  home screen pulled every drill-only atom into the home chunk.

## Testing components

Every component has a `X.test.tsx` beside it, written with Testing Library
(`render`, `screen`, `userEvent`; jest-dom matchers). What goes in it:

- **One render test with default or minimal props**, so a component that
  crashes on mount is caught.
- **Tests for logic that can change and break**: branches (marked keys, the
  streak pill, the best badge), mappings (pad key to option index, black-key
  columns, month labels), clamps (custom length bounds), formatting (percent,
  seconds, multipliers), callbacks with the right arguments, and a11y state
  (`aria-checked`, `aria-expanded`, screen-reader text).
- **Never constants**: no assertions on static copy, fixed class lists or a
  constant's value. Copy is used to *find* elements, not as the thing under test.

Pages are tested against the real stores, reset per test with
`resetStores()`; sessions come from `session()` and per-drill settings from
`withDrill()` (`src/test/fixtures.ts`). Registry wiring is tested with
`fakeDrill()` (`src/test/fakeDrill.ts`) added through `addDrills`.
Pure components get `t` from `src/test/i18n.ts` (English). Audio and VexFlow
are mocked in page and organism tests, and covered by their own tests.
There is no coverage-percentage gate: it rewards testing constants.

## Persistence

One door: `progress/progressStore` (see `data-model.md`). Stores write through
it, pages may read its getters (best score, practice minutes, streaks), and no
other component touches it. No direct localStorage anywhere else.

## Config

`config/constants.ts` holds all tunable constants: level weights and note
ranges, accidentals weight and chance, endurance curve, offered session lengths
and custom-stepper bounds, feedback timings, tick interval, audio gain, and the
theory rules (`THEORY_RULES`: steps, checks, sentences, recap counts the
validator enforces; `THEORY_PLAY`, `THEORY_STAFF_WIDTH`, idle cap, minimum
time recorded; `PRESET_SECONDS`), Luyện's Hôm nay lengths
(`TODAY_SHORT_SECONDS`, `TODAY_LONG_SECONDS`) and first-open drill
(`READER_START_DRILL`), and Ôn tập's weighting (`REVIEW_WEIGHT`,
`REVIEW_NO_REPEAT`, feedback time, default length, difficulty). Nothing
tunable is inlined. Pure helpers that depend only on these constants
(`isPresetDuration`, `customOpeningSeconds`) live beside them and are tested in
`config/duration.test.ts`.

## Directory layout

```
web/src/
├── app/                    # global module: app store (settings), useT, drill route hooks
│   ├── drill.ts, drills.ts #   drill entry type + defineDrill; the registry (glob of drills/*/drill.ts)
│   ├── practicePlan.ts     #   unlocks, Luyện's cards, the Hôm nay pick (pure)
│   ├── drillPreset.ts      #   a drill session set up from a lesson or Hôm nay
│   ├── useTabs.ts, firstOpen.ts, routes.ts, useChapters.ts
│   ├── components/         #   app molecules / organisms (TabBar, TodayCard, ActivityPanel, PausedNotice)
│   └── pages/              #   PracticeTab (Luyện), FirstOpen, TabChrome, DrillRoute, DrillLoading
├── core/
│   ├── components/         # shared library: atoms / molecules / organisms (Staff, NoteStaff, StepView, DrillCard)
│   ├── lesson/             # the lesson format, text tokens, block helpers, usePlayBlock
│   └── music/ (pitch, notation, piano keys, keyboard, keys) scoring / audio / i18n / engine (placeholder)
├── drills/<id>/            # one folder per drill: drill.ts (registry entry), strings.ts, store, pages
│   ├── note-id/            #   Đọc nốt: generator; NoteIdDrill, SetupPhase, RunPhase, ResultPhase
│   ├── hear-play/          #   Nghe & Đàn: generator (key, note, sounds); ListenStage
│   └── review/             #   Ôn tập: select (pool, weighting), MissedChecks
├── theory/                 # theory module: registry, outline, validate, store
│   ├── components/         #   atoms / molecules / organisms / templates for lessons
│   ├── pages/              #   LearnTab (Học), ChapterList, LessonPlayer, TheoryAbout
│   └── content/            #   GFDL lesson data: LICENSE, NOTICE.md, chNN-<slug>/ (index.ts + one file per lesson)
├── progress/               # progressStore (localStorage door, cloud plug)
├── config/                 # tunable constants (levels, durations, feedback, tick, audio, Hôm nay, Ôn tập)
├── test/                   # test helpers (fixtures, fakeDrill, i18n)
└── index.css               # Tailwind v4 entry + design tokens
```

## Styling

**Tailwind v4** via `@tailwindcss/vite`, with semantic design tokens declared in
`src/index.css` (`--surface`, `--raised`, `--line`, `--ink*`, `--accent`,
`--cta`, `--correct`, `--wrong`, `--staff`) and re-exported to Tailwind through `@theme`.
Components use token utilities (`bg-raised`, `text-ink-soft`) rather than raw
palette values, so light and dark are one definition.

**Per-drill action colour.** A drill may replace the amber action colour by
declaring `colour` in its registry entry (Nghe & Đàn: violet). `App` renders
`drillColourCss()`: one rule per such drill on `[data-drill="<id>"]` (and its
dark variant) setting the Tailwind theme variables `--color-cta` /
`--color-cta-ink`, never `--cta`: `@theme` resolves `--color-cta: var(--cta)`
once at `:root`, so overriding `--cta` lower down changes nothing. `DrillRoute`
sets the attribute on `<html>` while a drill's route is mounted (a layout
effect), because the pause sheet portals to `<body>`; Luyện and Học wrap each
drill's card, and `TabChrome` the paused bar, in the same attribute. Hôm nay's
Bắt đầu stays amber.
Selection blue, right green and wrong red stay shared.

The theme is **white paper by default and does not follow the OS**: musicians
read notation on white, so the reading surface never flips under a session.
The dark palette is kept but opt-in via an explicit `data-theme="dark"`
attribute (nothing in the UI sets it yet).

Motion lives in five places, each behind `prefers-reduced-motion`: route
changes (`PageTransition`, forward only: back and forward navigation swap
routes instantly; forward also opens the page at the top), drill phase changes (`NoteIdDrill`), answer
feedback plus note entry inside the run phase, Luyện's activity panel
week/calendar resize and cross-fade (tab switches are instant), and the lesson player's step slide.

Layout is mobile-first with a single hinge at `md` (768px): base utilities
describe the phone, `md:` utilities describe desktop. Both are first-class
targets (see `screens.md`).

Locked conventions: one accent (cobalt); one call-to-action colour (amber
`--cta`, used only for "start practising" buttons so they read as tappable at a
glance); `rounded-2xl` for every surface and
answer key, full-round for segmented chips; correct and wrong are carried by
colour **and** an icon, never colour alone; all motion sits behind
`prefers-reduced-motion`.
