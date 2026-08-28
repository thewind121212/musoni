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

- `core/components/` — UI primitives (Button, Card, StatTile, …) and **Staff**,
  the only component allowed to touch VexFlow.
- `core/engine/` — drill engine lifecycle (`generate → render → answer → feedback → next`);
  drills plug in a generator + checker.
- `core/audio/` — pitch playback (Web Audio).

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
├── app/            # global module: routing, shell, app store
├── core/           # components / engine / audio (shared, pure)
├── drills/note-id/ # drill 1 module: store, generator, components
├── progress/       # progressStore (localStorage door, cloud plug)
└── config/         # tunable constants
```
