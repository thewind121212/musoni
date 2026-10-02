# Musoni — System Summary

> The whole system from user level down to component level — general, not detailed.
> Diagrams are Mermaid (text) so they can be updated with every change (doc-sync rule):
> any change that adds, removes, or rewires a container or component MUST update the
> matching diagram here in the same session.

## What is Musoni

A web app for pure sheet-music reading training combined with music theory.
Train reading speed with short drills, track improvement day by day.
Ear training joins in a future phase (see phase plan below).

**Design principle: mobile-first technique, hybrid target** - training must be
super comfortable on a phone, and desktop is a first-class layout rather than a
narrow phone column on a wide screen. Base styles are the phone; `md:` adds the
desktop layout, never the reverse (details: `fe/screens.md`).

## Phase plan

| Phase | Scope | Monetization |
|---|---|---|
| **1 (now)** | Note Identification drill, web only, no login, localStorage progress, activity calendar; Vietnamese-first UI (English second) | Free |
| **2** | Complete-the-Measure drill (design done: `fe/drill-complete-measure.md`), login, cloud progress sync, subscriptions (Stripe) | Freemium: basics free, premium = advanced levels + full stats |
| **3** | Ear training, more theory drills | Premium |

## Level 1 — Context: who uses it, what it does

```mermaid
graph LR
  U["Musician / Learner"] -->|trains sheet-music reading & theory| APP["Musoni App"]
```

## Level 2 — Containers: deployable pieces and their links

```mermaid
graph TB
  U["User (browser)"] --> FE["Web Frontend<br/>(React + Vite + TS + VexFlow)"]
  FE --> LS[("localStorage<br/>(progress, settings)")]
  FE -.->|"Phase 2: auth + progress sync (HTTP/JSON)"| BE["API Server<br/>(Go, net/http)"]
  BE -.->|Phase 2| DB[("Database")]
  BE -.->|Phase 2| ST["Stripe"]
```

Solid lines = Phase 1 (live). Dotted lines = Phase 2 (planned).

## Level 3 — Components per container

### Web Frontend (`web/`) — details in `docs/fe/`

```mermaid
graph TB
  subgraph "FE container"
    HOME["Home route /<br/>drill list + activity calendar"]
    DRILLROUTE["Drill route /train/note-id<br/>self-contained SPA"]
    SETUP["Setup phase<br/>level, length, settings"]
    RUN["Run phase<br/>the sprint"]
    RESULT["Result phase<br/>score + best"]

    APPSTORE["App Store (Zustand)<br/>settings, level, language"]
    I18N["i18n<br/>(typed translator, core; vi default, en)"]
    DRILLSTORE["Drill Store (Zustand)<br/>note-id session lifecycle:<br/>start → answer → next → finish"]
    GEN["Question Generator<br/>(note-id)"]
    REND["Staff<br/>(VexFlow, core/components)"]
    SCORE["Scoring<br/>(pace × difficulty × accuracy × endurance, core)"]
    STORE["Progress Store<br/>(localStorage, cloud-plug)"]
    AUDIO["Audio Feedback<br/>(Web Audio, core, optional)"]

    HOME -->|router| DRILLROUTE
    DRILLROUTE --> SETUP
    SETUP -->|start| RUN
    RUN -->|time up| RESULT
    RESULT -->|again / change setup| SETUP
    SETUP --> APPSTORE
    RUN --> DRILLSTORE
    RUN --> REND
    RUN --> AUDIO
    RESULT --> DRILLSTORE
    HOME --> STORE
    APPSTORE --> STORE
    DRILLSTORE --> GEN
    DRILLSTORE --> SCORE
    DRILLSTORE --> STORE
    APPSTORE -->|language| I18N
  end
```

Routing is app-level only: the router owns `/` and `/train/note-id`, while the
three drill phases (setup, run, result) are store state inside that single
route, so training never changes the URL.

As built, there is no separate "Drill Engine" component: the note-id
Drill Store itself holds the session lifecycle (`start` → `answer` →
`tick`/`next` → `finish`) and calls the Question Generator, Scoring, and
Progress Store directly. The Run phase calls Staff (VexFlow rendering) and
Audio Feedback directly using state read from the Drill Store.
`core/engine/` exists in the repo only as an empty placeholder folder —
no code has been written against it. If a second drill (Phase 2:
Complete-the-Measure) needs to share lifecycle code, extracting a real
`core/engine` at that point is the natural refactor; for one drill,
inlining it in the store was the honest simpler choice.

### API Server (`server/`) — details in `docs/be/`

```mermaid
graph TB
  subgraph "BE container (Phase 1: placeholder)"
    HEALTH["GET /health → {status: ok}"]
  end
```

Grows real components (auth, progress sync, billing) in Phase 2.
