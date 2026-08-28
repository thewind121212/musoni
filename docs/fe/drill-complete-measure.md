# Drill 2 — Complete the Measure (PARKED — Phase 2)

> Design approved 2026-08-28, implementation deferred. Phase 1 ships Drill 1 only.

Rhythm-sum training: a measure is shown with one gap; pick the note/rest value
that makes the beats sum exactly to the time signature.

## Question generation

- Pick a time signature (per level).
- Build a measure of random note/rest values summing to *less* than the full
  measure, leaving exactly one gap.
- Answer options: note-value symbols (whole, half, quarter, eighth — pictured,
  not worded). Correct = the value completing the sum.

## Rendering

VexFlow draws the incomplete measure with a marked blank spot.

## Session format

10-question set, untimed at first (thinking drill); timed mode unlockable.

## Difficulty levels

| Level | Content |
|---|---|
| L1 | 4/4, plain notes only |
| L2 | adds rests |
| L3 | 3/4 and 2/4 |
| L4 | dotted notes, 6/8 |

Weighted scoring reuses the same model as Drill 1 (weights TBD when implemented).

Plugs into the shared Drill Engine core — new generator + checker, same lifecycle.
