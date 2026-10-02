# FE Data Model — Progress & Settings (localStorage, cloud-ready)

All persistence goes through one small module: **`progressStore`**. Nothing else
touches localStorage. Phase 2 cloud sync swaps this module's internals for
API-backed storage — exactly one file changes.

## Stored document

One JSON document under the localStorage key `musoni-progress-v1`, versioned,
keyed by local day for the day-by-day tracker:

```json
{
  "version": 1,
  "settings": {
    "level": 1,
    "durationSec": 60,
    "accidentals": false,
    "naming": "solfege",
    "sound": true,
    "keyLabels": true,
    "padStyle": "piano",
    "earLevel": 1,
    "earDurationSec": 120,
    "lang": "vi",
    "activityExpanded": false
  },
  "days": {
    "2026-08-28": {
      "sessions": [
        {
          "drill": "note-id",
          "level": 3,
          "accidentals": true,
          "naming": "solfege",
          "durationSec": 60,
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

### Settings

| Field | Default | Kind |
|---|---|---|
| `level` | `1` | workout parameter |
| `durationSec` | `60` | workout parameter (any value; presets are 30/60/120/300, custom is 60-1800) |
| `accidentals` | `false` | workout parameter |
| `naming` | `"solfege"` | preference (Vietnamese teaching leads with solfège) |
| `sound` | `true` | preference |
| `padStyle` | `"piano"` | preference: answer keys as a drawn piano or as boxes (`"boxes"`, the older look). Added 2026-10-02 via the defaults merge |
| `keyLabels` | `true` | preference: note names on the answer keys. Added 2026-10-02; older docs get it from the defaults merge, so no version bump |
| `earLevel` | `1` | workout parameter for Nghe & Đàn (its own level, 1-4). Added 2026-10-02 via the defaults merge |
| `earDurationSec` | `120` | workout parameter for Nghe & Đàn (its own length, same choices as `durationSec`). Added 2026-10-02 |
| `lang` | `"vi"` | preference (`"vi"` / `"en"`) |
| `activityExpanded` | `false` | preference: home activity panel shows the full calendar |

`drill` is `"note-id"` or `"hear-play"` (`DrillId`). For a `hear-play` session,
`level` is its own level (1-4, see `drill-hear-play.md`), `accidentals` says
whether black keys were answers (L2 up), and `weight` is the level's weight.
Bests and averages are keyed on drill and level.

A session may also carry `"partial": true`: it stopped before its clock ran out
(the reader ended it). Its `durationSec` is the time actually played and its
`practiceScore` is 0. Partial sessions count toward minutes, streaks and active
days, and are skipped by bests and averages. The field is optional and additive.

`getSettings()` merges the stored settings over these defaults, so fields added
since a document was written (`durationSec`, `lang`, `activityExpanded`) fill in
without a migration. That is why `version` is still `1`: every change so far has
been additive.

Day keys are the viewer's **local** calendar day (`localDayKey`), not UTC, so a
session at 1am in UTC+7 lands on today.

## Why this shape is the cloud plug

- Single versioned document → Phase 2 sync = `POST` it to the Go API and merge
  by date. No migration, no redesign.
- Each session snapshots the settings/level/length it was played with → charts
  can filter per setting-combo and stay honest when the user changes difficulty.

## What it enables

- **Activity calendar** (built): minutes practised per day
  (sum of `durationSec`), streaks and active-day count. Time answers "how much";
  the score answers "how well", and a pace is meaningless to sum per day.
- **Personal bests** (built): best `practiceScore` per drill and level, across
  all lengths, since the score is a per-minute pace.
- **Planned**: a practiceScore trend chart, an accuracy and speed trend, and
  per-setting breakdowns (e.g., "my accuracy on bass clef").

## `progressStore` contract

- `getSettings() / saveSettings(settings)`
- `recordSession(sessionResult)` — appends under today's local date key
- `getDay(date)` / `getRange(from, to)` — raw sessions for charts
- `getBest(drill, level)` — best session at a level, any length (partial sessions skipped)
- `getRecentAverage(drill, level, excludeAt, days?, now?)` — mean score at a level over recent days (partial sessions skipped)
- `getStreak(now?)` — consecutive practised days ending today (an unpractised
  today counts back from yesterday)
- `getLongestStreak()` — longest run of consecutive practised days on record
- `getActiveDayCount()` — number of days with at least one session
- `getDailyMinutes()` — minutes practised per local day
- `localDayKey(date)` — the local `YYYY-MM-DD` key used everywhere
