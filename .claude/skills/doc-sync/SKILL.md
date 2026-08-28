---
name: doc-sync
description: Use when implementing any change in this repo — code, design, infra, or business decision — or before claiming any work complete. Also use when a new decision is made mid-conversation that isn't captured in docs yet.
---

# Doc-Sync — Documentation Maintenance

## Overview

Every change ships with its documentation updates in the same session.
The docs in `docs/` are the project's memory: `STATUS.md` says where the project
stands; `summary.md` holds the system picture (phases + C4 diagrams); `fe/`,
`be/`, `infra/` hold the detail per layer.

**A change without its doc updates is incomplete work.**

## Procedure

1. **Pre-plan (before touching anything):** write out the doc-impact list —
   which docs this change touches and what will change in each. Use the mapping
   table below. Every change touches at least `STATUS.md`.
2. **Implement the change.**
3. **Update every doc on the list, in the same session.**
4. **`STATUS.md` always:** refresh the `Last updated` date and move items
   between Done / In Progress / Next as needed.
5. **Diagram check:** does the change add, remove, or rewire a container or
   component? Then update the matching Mermaid diagram level in
   `docs/summary.md`. New decisions with no diagram impact skip this step.
6. **New decision made mid-work** (stack pick, pricing idea, UX choice):
   capture it in the right doc the moment it's made.

## Mapping: change → docs

| Change touches | Update |
|---|---|
| Anything at all | `docs/STATUS.md` (date + state) |
| FE feature/behavior (`web/`) | the relevant `docs/fe/*.md` (drill design, screens, data model) |
| BE (`server/`) | `docs/be/server.md` |
| Stack, dependencies, repo layout, setup, deployment | `docs/infra/stack.md` |
| Phases, pricing, monetization | `docs/summary.md` (phase table) |
| System structure (containers/components added, removed, rewired) | `docs/summary.md` (Mermaid diagrams, right zoom level) |
| Progress/settings storage shape | `docs/fe/data-model.md` (and bump `version` if the stored shape changes) |

## Red Flags — STOP, you're about to violate the rule

- "I'll update the docs later / in a follow-up"
- "Too small a change to document"
- "It's just a refactor, behavior didn't change" (structure changed? diagrams!)
- "The commit message explains it" (commits are history, docs are current state)
- Claiming work complete without having updated `STATUS.md`

All of these mean: stop, run the procedure above before claiming completion.
