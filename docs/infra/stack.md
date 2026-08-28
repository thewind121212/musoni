# Infra — Stack Decisions & Repo Layout

## Decisions (2026-08-28)

| Choice | Picked | Why | Rejected |
|---|---|---|---|
| Platform | Web app | Fastest to build/iterate, works on phones, best notation libs are JS, no app-store fees; wrappable as mobile later | Mobile-first, both-at-once |
| FE framework | Vite + React + TypeScript | Client-side interactive trainer — SSR buys nothing; user knows React | Next.js (second backend once Go arrives) |
| Notation | VexFlow | Low-level = right for *generated* drill snippets (one note, one measure) | OSMD (great for full MusicXML scores — add later if "read real pieces" feature comes; it's built on VexFlow, no conflict) |
| BE language | Go, stdlib `net/http` | User knows Go; no framework needed for a health endpoint | — |
| FE state | Zustand, one store per module (`app` global + one per drill) | Tiny API, no boilerplate; per-module stores keep drills independent (see `docs/fe/architecture.md`) | Redux (boilerplate), Context-only (rerender sprawl) |
| Persistence (Phase 1) | localStorage via `progressStore` module | No login yet; versioned JSON doc is the cloud plug | — |
| Audio | Web Audio API | Cheap pitch playback, no library needed at first | Tone.js (adopt if audio needs grow) |
| Diagrams | Mermaid in markdown | Text-based → maintainable by doc-sync; renders on GitHub | Drawing tools (not auto-maintainable) |

## Repo layout

```
musoni/
├── CLAUDE.md                  # project instructions: mandatory doc-sync, impl-plan, fe-design rules
├── .claude/skills/            # doc-sync, impl-plan, fe-design skills
├── tmp/                       # gitignored: per-implementation working folders
│   └── DD-MM-YYYY-<feature>/  #   plan.md (checkbox steps) + notes.md (impl-plan skill)
├── docs/
│   ├── STATUS.md              # living project dashboard — read first
│   ├── summary.md             # system summary: phases + C4 diagrams
│   ├── infra/                 # this folder: stack, setup, deployment
│   ├── fe/                    # frontend designs: drills, screens, data model
│   └── be/                    # backend designs
├── web/                       # Vite + React + TS + VexFlow
└── server/                    # Go, net/http
```

## Setup (to be filled when scaffolded)

- `web/`: `npm install && npm run dev`
- `server/`: `go run .`

## Deployment

Not decided yet — Phase 1 runs locally. Capture the decision here when made.
