# Musoni

A web app for sight-reading practice: name notes on the staff against the clock,
a few minutes a day, with progress tracked per day. Music theory and rhythm drills
come later.

- `web/` — the app: Vite, React, TypeScript, VexFlow, Zustand, Tailwind v4
- `server/` — Go `net/http` backend (a `/health` stub for now)
- `docs/` — design and decisions; start with [`docs/STATUS.md`](docs/STATUS.md)

## Run it

```sh
cd web && npm install && npm run dev     # http://localhost:5173 (+ LAN "Network:" URL for other devices)
cd server && go run .                    # GET /health on :8080
```

## Check it

```sh
cd web && npm test && npm run lint && npm run build
cd server && go test ./...
```

Stack choices and repo layout: [`docs/infra/stack.md`](docs/infra/stack.md).
