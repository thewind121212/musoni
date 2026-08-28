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
