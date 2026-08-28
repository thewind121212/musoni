---
name: impl-plan
description: Use when starting implementation of any feature or task, before writing code — and throughout the work to track step progress. Also use when resuming an unfinished implementation.
---

# Impl-Plan — Implementation Working Folder

## Overview

Every implementation gets its own working folder under `tmp/` (gitignored):

```
tmp/DD-MM-YYYY-<feature-slug>/
├── plan.md       # the implementation plan: goal, doc-impact, steps as checkboxes
└── notes.md      # running log: decisions, findings, blockers (append as you go)
```

`tmp/` is never committed — it's the local working memory of an implementation.
Permanent knowledge goes to `docs/` via doc-sync when the work completes.

## Procedure

1. **Create the folder** `tmp/DD-MM-YYYY-<feature-slug>/` (today's date, e.g.
   `tmp/28-08-2026-note-id-drill/`).
2. **Write `plan.md` BEFORE any code:**
   - **Goal** — one paragraph, link the relevant `docs/` design files
   - **Doc-impact list** — the doc-sync pre-plan (which docs this work will update)
   - **Steps** — checkbox list; each step small, ordered, with how to verify it
3. **Work the steps in order.** Check off each step (`- [x]`) the moment it's
   done and verified — not in batches at the end. Append decisions, findings,
   and blockers to `notes.md` as they happen.
4. **Resuming?** Read `plan.md` + `notes.md` first — the first unchecked step is
   where work continues.
5. **On completion:** all steps checked → run doc-sync (update `docs/` +
   `STATUS.md`) → the tmp folder stays as local history.

For FE tasks, `plan.md` steps must respect the fe-design skill checklist.

## Red Flags

- Writing code with no `tmp/` folder for the work → stop, create it, write plan.md
- Checking off steps in a batch at the end → check off as you go; progress must be readable mid-work
- Putting permanent design decisions only in `notes.md` → they belong in `docs/` (doc-sync)
- Committing `tmp/` → it's gitignored for a reason
