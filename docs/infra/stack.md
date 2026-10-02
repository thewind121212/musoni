# Infra — Stack Decisions & Repo Layout

## Decisions (2026-08-28)

| Choice | Picked | Why | Rejected |
|---|---|---|---|
| Platform | Web app | Fastest to build/iterate, works on phones, best notation libs are JS, no app-store fees; wrappable as mobile later | Mobile-first, both-at-once |
| FE framework | Vite + React + TypeScript | Client-side interactive trainer — SSR buys nothing; user knows React | Next.js (second backend once Go arrives) |
| Notation | VexFlow | Low-level = right for *generated* drill snippets (one note, one measure) | OSMD (great for full MusicXML scores — add later if "read real pieces" feature comes; it's built on VexFlow, no conflict) |
| BE language | Go, stdlib `net/http` | User knows Go; no framework needed for a health endpoint | — |
| FE state | Zustand, one store per module (`app` global + one per drill) | Tiny API, no boilerplate; per-module stores keep drills independent (see `docs/fe/architecture.md`) | Redux (boilerplate), Context-only (rerender sprawl) |
| FE routing | React Router, **app level only** (`/`, `/train/note-id`) | Drills are self-contained SPAs: phases live in the drill store, so training never pushes history and Back always means "leave the drill" | A route per screen (settings/results as URLs), which turned mid-session navigation into a browser-history problem |
| Styling | Tailwind v4 via `@tailwindcss/vite`, semantic tokens in `src/index.css` | Utility-first over one token layer means light and dark are defined once; replaced the hand-rolled CSS classes | Hand-written CSS (what Phase 1 shipped, and it looked it), CSS modules |
| Fonts | Geist + Geist Mono, self-hosted via `@fontsource-variable` | No render-blocking third-party request; mono carries the timer and score figures | Inter (generic default), Google Fonts `<link>` |
| Motion | `motion` (motion/react) | Answer feedback and phase transitions only, all behind `prefers-reduced-motion` | CSS-only (no exit animations), GSAP (overkill here) |
| Icons | `@phosphor-icons/react` | One icon family; replaced the emoji in the UI | Emoji, hand-rolled SVG paths |
| Persistence (Phase 1) | localStorage via `progressStore` module | No login yet; versioned JSON doc is the cloud plug | — |
| i18n | Hand-rolled typed translator in `core/i18n/` (Vietnamese default, English second) | Two languages and ~180 keys need no library; typing `vi` against the English key set makes a missing translation a build error; plurals come free from `Intl.PluralRules` | i18next / react-intl (dependency and runtime weight for a lookup table) |
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

## Setup

- `web/`: `cd web && npm install && npm run dev` — Vite dev server (default `http://localhost:5173`)
- `server/`: `cd server && go run .` — serves `GET /health` on `:8080`
- Tests: `cd web && npm test` (Vitest), `cd server && go test ./...`
- Build: `cd web && npm run build` (`tsc -b && vite build`, output in `web/dist/`)

## Deployment

Not decided yet — Phase 1 runs locally. Capture the decision here when made.
