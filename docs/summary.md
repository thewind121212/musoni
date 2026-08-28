# Musoni — System Summary

> The whole system from user level down to component level — general, not detailed.
> Diagrams are Mermaid (text) so they can be updated with every change (doc-sync rule):
> any change that adds, removes, or rewires a container or component MUST update the
> matching diagram here in the same session.

## What is Musoni

A web app for pure sheet-music reading training combined with music theory.
Train reading speed with short drills, track improvement day by day.
Ear training joins in a future phase (see phase plan below).

## Phase plan

| Phase | Scope | Monetization |
|---|---|---|
| **1 (now)** | Note Identification drill, web only, no login, localStorage progress, day-by-day tracker | Free |
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
    HOME["Home / Drill Picker screen"]
    DRILL["Drill screen"]
    RESULTS["Results screen"]
    SET["Settings screen"]

    ENGINE["Drill Engine (core)<br/>generate → render → answer → feedback → next"]
    GEN["Question Generator<br/>(note-id)"]
    REND["Notation Renderer<br/>(VexFlow)"]
    SCORE["Scoring<br/>(difficulty-weighted)"]
    STORE["Progress Store<br/>(localStorage, cloud-plug)"]
    AUDIO["Audio Feedback<br/>(Web Audio, optional)"]

    HOME --> DRILL --> RESULTS
    HOME --> SET
    DRILL --> ENGINE
    ENGINE --> GEN
    ENGINE --> REND
    ENGINE --> SCORE
    ENGINE --> AUDIO
    SCORE --> STORE
    RESULTS --> STORE
    SET --> STORE
  end
```

### API Server (`server/`) — details in `docs/be/`

```mermaid
graph TB
  subgraph "BE container (Phase 1: placeholder)"
    HEALTH["GET /health → {status: ok}"]
  end
```

Grows real components (auth, progress sync, billing) in Phase 2.
