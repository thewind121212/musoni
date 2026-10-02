# FE Architecture — Modules, Core Components, State

> Rule source of truth: `.claude/skills/fe-design/SKILL.md` (enforced on every FE task).
> This doc captures the architecture itself.

## Modules & state (Zustand)

The FE is composed of **modules**, each owning one **Zustand store**:

| Module | Store | Holds |
|---|---|---|
| `app` (global) | `app/store.ts` | app-wide state: user settings, selected level |
| `drills/note-id` | `drills/note-id/store.ts` | live drill session: current question, options, score, streak, timer |
| *(Phase 2)* `drills/complete-measure` | its own store | its session state |

Modules never import each other's stores; sharing goes through `app` or props.

## Routing vs drill phases

React Router covers **app-level** navigation only: `/` (home) and one route per
drill (`/train/note-id`). Account, library and settings pages join that table
later.

Inside a drill route the flow is **not** routed. Each drill is a self-contained
SPA with phases held in its own store:

`setup` (level, session length, drill settings) -> `running` (the sprint) ->
`finished` (result), plus `backToSetup()`.

Training therefore never pushes history entries: no route change when a session
starts, ends, or is retried, so the browser back button always means "leave the
drill", never "rewind mid-sprint".

## Core components (`core/`)

Shared, module-agnostic, reuse-first building blocks:

- `core/components/` — the shared UI library, split by atomic level (see
  **Component levels** below). Its one organism is **Staff**, the only component
  allowed to touch VexFlow. Staff repaints itself from the `--staff` token so
  notation stays legible in dark mode, and exports `ClefGlyph` (a clef on a
  short stave) so level choices can show real notation instead of an
  icon-library stand-in.

  Two sizing rules live there, both learned from a bug that rendered the clef
  badges blank: VexFlow reserves blank space above a stave (lines land at
  y=40..80 inside the render box), so a viewBox taken from the nominal box cuts
  the notation off. `ClefGlyph` crops to the drawn ink; `Staff` instead pins its
  viewBox to the stave lines plus `LEDGER_ROOM`, because cropping per note would
  resize the box and make the staff jump between questions. `Staff.test.ts`
  guards both.
- `core/music/` — shared pitch/note domain types and helpers (parsing,
  diatonic indexing, labeling) used by both the note-id generator and Staff.
- `core/scoring.ts` — difficulty-weighted scoring, shared by any drill.
- `core/audio/` — pitch playback (Web Audio): sampled piano with a sine fallback;
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
module is promoted to core, not copied.

## Component levels (atomic design)

Every component sits at one level, in its own folder, inside the module that
owns it (`core/components/`, `app/components/`, `drills/<name>/components/`):

| Level | What it is | Examples |
|---|---|---|
| atom | one element, no children components of ours | `Button`, `Panel`, `CountPill`, `ProgressBar`, `Chip`, `StatTile`, `IconStat`, `FieldLegend`, `KeyHint` |
| molecule | a few atoms doing one job | `OptionCards`, `StatStrip`, `SegmentedControl`, `LanguageToggle`, `ComingSoonCard`, `PianoKey`, `DurationPicker` |
| organism | a self-contained section of a screen | `Staff`, `ActivityPanel`, `ActivityCalendar` (`ActivityWeek` + `ActivityGrid`), `PracticeCard`, `AnswerPad`, `RunHeader`, `QuestionStaff`, `ResultSummary` |
| template | layout shell with no content of its own | `PageTransition` |
| page | one screen or drill phase; the **only** level that reads stores | `HomeScreen`, `NoteIdDrill`, `SetupPhase`, `RunPhase`, `ResultPhase` |

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

## Persistence

One door: `progress/progressStore` (see `data-model.md`). Stores write through
it, pages may read its getters (best score, practice minutes, streaks), and no
other component touches it. No direct localStorage anywhere else.

## Config

`config/` holds all tunable constants: level weights, session durations, level
note-ranges. Nothing tunable is inlined.

## Directory layout

```
web/src/
├── app/                    # global module: app store (settings + level), useT
│   ├── components/         #   molecules / organisms / templates used by app pages
│   └── pages/HomeScreen/
├── core/
│   ├── components/         # shared library: atoms / molecules / organisms (Staff)
│   └── music/ scoring / audio / i18n / engine (placeholder)
├── drills/note-id/         # drill module: store (phases), generator, keyboard
│   ├── components/         #   atoms / molecules / organisms only this drill uses
│   └── pages/              #   NoteIdDrill (phase switch), SetupPhase, RunPhase, ResultPhase
├── progress/               # progressStore (localStorage door, cloud plug)
├── config/                 # tunable constants (levels, durations, tick, audio)
├── test/                   # test helpers
└── index.css               # Tailwind v4 entry + design tokens
```

## Styling

**Tailwind v4** via `@tailwindcss/vite`, with semantic design tokens declared in
`src/index.css` (`--surface`, `--raised`, `--line`, `--ink*`, `--accent`,
`--correct`, `--wrong`, `--staff`) and re-exported to Tailwind through `@theme`.
Components use token utilities (`bg-raised`, `text-ink-soft`) rather than raw
palette values, so light and dark are one definition.

Motion lives in three places, each behind `prefers-reduced-motion`: route
changes (`PageTransition`), drill phase changes (`NoteIdDrill`), and answer
feedback plus note entry inside the run phase.

Layout is mobile-first with a single hinge at `md` (768px): base utilities
describe the phone, `md:` utilities describe desktop. Both are first-class
targets (see `screens.md`).

Locked conventions: one accent (cobalt); `rounded-2xl` for every surface and
answer key, full-round for segmented chips; correct and wrong are carried by
colour **and** an icon, never colour alone; all motion sits behind
`prefers-reduced-motion`.
