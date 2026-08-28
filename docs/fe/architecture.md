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

Navigation is React Router's job (routes `/`, `/drill`, `/results`, `/settings`) —
stores never track the active screen.

## Core components (`core/`)

Shared, module-agnostic, reuse-first building blocks:

- `core/components/` — UI primitives and **Staff**, the only component
  allowed to touch VexFlow.
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
├── app/            # global module: app store, screens (Home, Results, Settings)
├── core/           # components (incl. Staff) / music / scoring / audio / engine (placeholder)
├── drills/note-id/ # drill 1 module: store, generator, DrillScreen
├── progress/       # progressStore (localStorage door, cloud plug)
└── config/         # tunable constants
```
