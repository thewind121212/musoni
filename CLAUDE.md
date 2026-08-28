# Musoni

Web app for sheet-music reading training + music theory. React/Vite/VexFlow FE (`web/`), Go BE (`server/`).

**Start every session by reading `docs/STATUS.md`** — the living project dashboard.

## MANDATORY: doc-sync rule

Documentation is a deliverable of every change, not an afterthought. For ANY change
(code, design, infra, business decision), you MUST use the `doc-sync` skill
(`.claude/skills/doc-sync/`):

1. **Pre-plan** — before implementing, state which docs the change touches.
2. **Implement.**
3. **Update those docs + `docs/STATUS.md` in the same session.** A change without
   its doc updates is incomplete work — never "later", never a follow-up.

No exceptions for "small" changes, refactors, or fixes.

## MANDATORY: implementation workflow

Before implementing ANY feature or task, you MUST use the `impl-plan` skill
(`.claude/skills/impl-plan/`): create `tmp/DD-MM-YYYY-<feature>/` (gitignored),
write `plan.md` (goal, doc-impact, checkbox steps) before any code, check off
steps as you go, log decisions in `notes.md`. Resume work from the first
unchecked step.

## MANDATORY: FE design rules

For ANY frontend task in `web/` (components, screens, state, styling, structure),
you MUST use the `fe-design` skill (`.claude/skills/fe-design/`) and run its
checklist. Core rules: reuse-first core components (pure — no stores/persistence);
one Zustand store per module (`app` global + one per drill); persistence only via
`progressStore`; VexFlow only in the core Staff renderer; tunables in `config/`;
mobile-first always. Architecture doc: `docs/fe/architecture.md`.
