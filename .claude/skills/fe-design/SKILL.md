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
├── app/                      # MODULE: global app
│   ├── store.ts              #   Zustand: app-wide state (settings, level)
│   ├── components/           #   app-only molecules / organisms / templates
│   └── pages/HomeScreen/     #   pages: the only components that read stores
├── core/                     # shared, module-agnostic
│   ├── components/           #   atoms/ molecules/ organisms/ (Staff = only VexFlow user)
│   ├── engine/               #   drill engine core (placeholder)
│   └── audio/                #   pitch playback
├── drills/
│   └── note-id/              # MODULE: drill 1
│       ├── store.ts          #   Zustand: session state for this drill
│       ├── generator.ts      #   question + answer-options generation
│       ├── components/       #   atoms/ molecules/ organisms/ used ONLY by this drill
│       └── pages/            #   NoteIdDrill, SetupPhase, RunPhase, ResultPhase
├── progress/                 # progressStore — the ONLY door to persistence
└── config/                   # tunable constants (level weights, timings)
```

Every component lives at one atomic level, in its own folder:
`<level>/X/X.tsx` + `X/index.ts` + `X/X.test.tsx`, with a barrel per level.
A folder may group components that only make sense together.

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
   calls anywhere else. Stores write through progressStore; pages may read its getters; no other component touches it.
5. **Atomic levels; only pages touch state.** atom → molecule → organism →
   template → page. Pages read stores, `useT()` and `progressStore` getters and
   pass plain props down; every other level is pure in every module (text comes
   in as strings or a `t: Translate` prop). Import across folders with `@/` and
   the level barrel (`@/core/components/atoms`), relatively within a folder.
6. **VexFlow only inside the core `Staff` renderer component.** No VexFlow
   imports anywhere else.
7. **Tunable numbers live in `config/`** (weights, durations, level ranges) —
   never inline in components or stores.
8. **Mobile-first, always** — see `docs/fe/screens.md` design principle.

## Checklist — run for EVERY FE task

- [ ] Read the relevant `docs/fe/*.md` design before coding
- [ ] Which module does this belong to? (`app` / `drills/<name>` / `core`)
- [ ] Reuse check done in `core/components/` and module `components/`
- [ ] Component placed at the right atomic level, in its own folder with `index.ts` and level barrel export
- [ ] Only pages read stores / `useT()` / progress; lower levels take props
- [ ] `X.test.tsx` beside the component: one render with default props + tests for its logic; no assertions on constants (see `docs/fe/architecture.md` "Testing components")
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
- "Just call `useAppStore` in this organism" → lift the read into the page, pass props
- "Hardcode 60 seconds for now" → config/
- Styling checked on desktop first → mobile-first violated
