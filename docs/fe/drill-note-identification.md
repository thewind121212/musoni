# Drill 1 — Note Identification (Phase 1)

Train reading speed: a note appears on the staff, name it as fast as possible.

## Question lifecycle (Drill Engine core)

`generate → render → answer → feedback → next`

The engine is drill-agnostic: each drill plugs in a generator, renderer config, and
answer checker. Future drills (Complete-the-Measure, ear training) are new plugins.

## Question generation

- Pick a random note within the current difficulty's range (clef + staff position).
- If the accidentals setting is ON and level allows: note may carry # or ♭.
- **Answer options: 7–8 generated choices per question, exactly one correct.**
  - Naturals-only mode: the 7 natural names (C–B / Do–Si).
  - Accidentals mode: a mix of naturals, sharps, and flats *near the target note*,
    deliberately including confusable neighbors and enharmonic pairs
    (e.g., target F# → options E, F, **F#**, Gb, G, G#, A, Bb).
    Only the option matching what is printed counts as correct.

## Rendering

VexFlow draws a single note on a staff (clef per level), large and centered.

## Answering

- Big tappable buttons (mobile-first) + keyboard shortcuts on desktop.
- Instant feedback: green/red, correct answer shown on a miss, auto-advance.
- Optional sound: the actual pitch plays on answer (Web Audio, toggleable).

## Session format

**60-second sprint** — answer as many as possible. Tracks correct, wrong,
accuracy, average response time, best streak.

## Settings (user-chosen, saved in localStorage)

| Setting | Options | Effect |
|---|---|---|
| Note naming | **Letters** (C D E F G A B) / **Solfège** (Do Re Mi Fa Sol La Si) | Buttons and answers display in the chosen system |
| Accidentals | ON / OFF | OFF = naturals only ever appear, regardless of level |
| Sound | ON / OFF | Pitch playback on answer |

Levels control *where* notes live; settings control *how you answer* and *what
note pool is allowed*.

## Difficulty levels

| Level | Range | Weight |
|---|---|---|
| L1 | Treble clef, notes on the staff only | ×1.0 |
| L2 | Treble + ledger lines | ×1.3 |
| L3 | Bass clef | ×1.5 |
| L4 | Both clefs mixed | ×1.8 |

Accidentals ON multiplies the level weight by **×1.4** (e.g., L4 + accidentals = ×2.52).

## Weighted scoring (comparable across all settings)

```
practiceScore = correct × 10 × difficultyWeight × accuracy
```

- Multiplying by accuracy stops button-mashing (50 answers at 60% < 35 at 95%).
- Harder settings earn more — attempting difficulty is rewarded.
- Weights are tunable constants in one config file; adjust when real practice
  data shows whether they feel fair.
- Average response time stays a separate stat in Phase 1 (the 60s format already
  rewards speed through answer count).

Each session record snapshots its settings + level (see `data-model.md`), which
enables both one honest overall trend chart and per-setting breakdown charts.
