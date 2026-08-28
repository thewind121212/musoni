# FE Data Model — Progress & Settings (localStorage, cloud-ready)

All persistence goes through one small module: **`progressStore`**. Nothing else
touches localStorage. Phase 2 cloud sync swaps this module's internals for
API-backed storage — exactly one file changes.

## Stored document

One JSON document, versioned, keyed by day for the day-by-day tracker:

```json
{
  "version": 1,
  "settings": { "naming": "solfege", "accidentals": false, "sound": true },
  "days": {
    "2026-08-28": {
      "sessions": [
        {
          "drill": "note-id",
          "level": 3,
          "accidentals": true,
          "naming": "solfege",
          "correct": 38,
          "wrong": 4,
          "accuracy": 0.90,
          "avgMs": 1180,
          "bestStreak": 17,
          "weight": 2.1,
          "practiceScore": 718,
          "at": "2026-08-28T14:32:00Z"
        }
      ]
    }
  }
}
```

## Why this shape is the cloud plug

- Single versioned document → Phase 2 sync = `POST` it to the Go API and merge
  by date. No migration, no redesign.
- Each session snapshots the settings/level it was played with → charts can
  filter per setting-combo and stay honest when the user changes difficulty.

## What it enables in Phase 1

- **Day-by-day tracker**: daily practiceScore trend (main chart) — one line,
  comparable across setting changes thanks to weighted scoring.
- **"Your week" view**: accuracy and speed trend over the last 7 days.
- **Per-setting breakdown**: e.g., "my accuracy on bass clef", "my speed with
  accidentals on".

## `progressStore` contract

- `getSettings() / saveSettings(settings)`
- `recordSession(sessionResult)` — appends under today's date key
- `getDay(date)` / `getRange(from, to)` — for charts
- `getBest(drill, level)` — for drill-picker cards and results comparison
