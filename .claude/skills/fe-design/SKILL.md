---
name: fe-design
description: Use when doing ANY frontend task in web/ — creating or changing components, screens, state, styling, or FE structure — before writing the code.
---

# FE Design Rules — Structure, Core Components, State

## Overview

The FE is built from **modules**, each with its own Zustand store, sharing a
library of **core components** designed for reuse. Structure is decided by these
rules, not per-task taste.

## Module structure

```
web/src/
├── app/                 # MODULE: global app (routing, screens shell)
│   └── store.ts         #   Zustand: app-wide state (settings, active screen)
├── core/                # shared, module-agnostic
│   ├── components/      #   core components (reuse-first: Button, Card, StatTile, Staff…)
│   ├── engine/          #   drill engine core (generate → render → answer → feedback → next)
│   └── audio/           #   pitch playback
├── drills/
│   └── note-id/         # MODULE: drill 1
│       ├── store.ts     #   Zustand: session state for this drill
│       ├── generator.ts #   question + answer-options generation
│       └── components/  #   components used ONLY by this drill
├── progress/            # progressStore — the ONLY door to persistence
└── config/              # tunable constants (level weights, timings)
```

## Rules

1. **One Zustand store per module.** `app` is a module; each drill is a module.
   New state goes in its module's store — global (`app`) only if truly app-wide.
   No cross-module store imports; modules share state only through `app` or props.
2. **Core components are reuse-first.** Anything generic or used by 2+ modules
   lives in `core/components/`. Core components are pure: props in, events out —
   they never import a module store, never touch persistence, never know which
   drill uses them.
3. **Reuse check before creating.** Before any new component, look in
   `core/components/` and the module's `components/`. Extend, don't duplicate.
   A drill-local component needed by a second module moves UP to core (and loses
   its store/persistence ties) — never copy-paste it.
4. **Persistence only via `progress/progressStore`.** No direct localStorage
   calls anywhere else. Stores call progressStore; components never do.
5. **VexFlow only inside the core `Staff` renderer component.** No VexFlow
   imports anywhere else.
6. **Tunable numbers live in `config/`** (weights, durations, level ranges) —
   never inline in components or stores.
7. **Mobile-first, always** — see `docs/fe/screens.md` design principle.

## Checklist — run for EVERY FE task

- [ ] Read the relevant `docs/fe/*.md` design before coding
- [ ] Which module does this belong to? (`app` / `drills/<name>` / `core`)
- [ ] Reuse check done in `core/components/` and module `components/`
- [ ] New state placed in the right Zustand store (module first, global only if app-wide)
- [ ] Core components kept pure (no stores, no persistence, no drill knowledge)
- [ ] Persistence only through `progressStore`
- [ ] VexFlow only in `core` Staff renderer
- [ ] Tunables in `config/`, not inline
- [ ] Verified at mobile viewport (~375px) before desktop
- [ ] doc-sync applied (pre-plan + docs updated — see doc-sync skill)

## Red Flags

- "I'll just put this state in the component / a new context" → module store
- "Quick localStorage call here" → progressStore only
- "Copy this component and tweak it" → extend or promote to core
- "Hardcode 60 seconds for now" → config/
- Styling checked on desktop first → mobile-first violated
