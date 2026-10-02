# Musoni web

The Musoni frontend: Vite, React 19, TypeScript, VexFlow, Zustand, Tailwind v4.
Progress lives in `localStorage` for now (no login yet).

```sh
npm install
npm run dev      # Vite dev server on http://localhost:5173
npm test         # Vitest
npm run lint     # oxlint
npm run build    # tsc -b && vite build, output in dist/
```

How the code is organised (core components, one store per module, drills as
self-contained SPAs): [`docs/fe/architecture.md`](../docs/fe/architecture.md).
Project status: [`docs/STATUS.md`](../docs/STATUS.md).
