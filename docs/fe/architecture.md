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

- `core/components/` — UI primitives (Button, Panel, OptionCards) and
  **Staff**, the only component allowed to touch VexFlow. Staff repaints itself
  from the `--staff` token so notation stays legible in dark mode, and exports
  `ClefGlyph` (a clef on a short stave) so level choices can show real notation
  instead of an icon-library stand-in.
- `core/music/` — shared pitch/note domain types and helpers (parsing,
  diatonic indexing, labeling) used by both the note-id generator and Staff.
- `core/scoring.ts` — difficulty-weighted scoring, shared by any drill.
- `core/audio/` — pitch playback (Web Audio).
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

## Persistence

One door: `progress/progressStore` (see `data-model.md`). Stores call it;
components never do. No direct localStorage anywhere else.

## Config

`config/` holds all tunable constants: level weights, session durations, level
note-ranges. Nothing tunable is inlined.

## Directory layout

```
web/src/
├── app/            # global module: app store (settings + level), HomeScreen, WeekStrip
├── core/           # components (Button, Panel, SegmentedControl, Staff) / music /
│                   #   scoring / audio / engine (placeholder)
├── drills/note-id/ # drill module: store (phases), generator, keyboard,
│                   #   NoteIdDrill + phases/ (Setup, Run, Result)
├── progress/       # progressStore (localStorage door, cloud plug)
├── config/         # tunable constants (levels, durations, tick, audio)
└── index.css       # Tailwind v4 entry + design tokens
```

## Styling

**Tailwind v4** via `@tailwindcss/vite`, with semantic design tokens declared in
`src/index.css` (`--surface`, `--raised`, `--line`, `--ink*`, `--accent`,
`--correct`, `--wrong`, `--staff`) and re-exported to Tailwind through `@theme`.
Components use token utilities (`bg-raised`, `text-ink-soft`) rather than raw
palette values, so light and dark are one definition.

Motion lives in three places, each behind `prefers-reduced-motion`: route
changes (`app/PageTransition`), drill phase changes (`NoteIdDrill`), and answer
feedback plus note entry inside the run phase.

Locked conventions: one accent (cobalt); `rounded-2xl` for every surface and
answer key, full-round for segmented chips; correct and wrong are carried by
colour **and** an icon, never colour alone; all motion sits behind
`prefers-reduced-motion`.
