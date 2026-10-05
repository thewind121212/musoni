# FE Data Model — Progress & Settings (localStorage, cloud-ready)

All persistence goes through one small module: **`progressStore`**. Nothing else
touches localStorage. Phase 2 cloud sync swaps this module's internals for
API-backed storage — exactly one file changes.

## Stored document

One JSON document under the localStorage key `musoni-progress-v1`, versioned,
keyed by local day for the day-by-day tracker:

```json
{
  "version": 2,
  "settings": {
    "naming": "solfege",
    "sound": true,
    "keyLabels": true,
    "padStyle": "piano",
    "lang": "vi",
    "activityExpanded": false,
    "startPoint": "beginner",
    "drills": {
      "note-id": { "level": 3, "durationSec": 60, "accidentals": true },
      "hear-play": { "level": 2, "cadenceEach": false },
      "review": { "chapters": ["pitch-staff"] }
    }
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
      ],
      "lessons": [
        { "lesson": "pitch-staff/staff-clefs", "seconds": 214, "at": "2026-08-28T15:02:00Z" }
      ]
    }
  },
  "theory": {
    "done": {
      "pitch-staff/staff-clefs": { "at": "2026-08-28T15:02:00Z", "correct": 3, "total": 3 }
    }
  },
  "unlocksSeen": ["note-id", "hear-play"],
  "review": {
    "pitch-staff/staff-clefs/3": { "at": "2026-08-29T09:10:00Z", "missed": true },
    "pitch-staff/staff-clefs/5": { "at": "2026-08-29T09:10:20Z" }
  }
}
```

### Settings

| Field | Default | Kind |
|---|---|---|
| `naming` | `"solfege"` | preference (Vietnamese teaching leads with solfège) |
| `sound` | `true` | preference |
| `padStyle` | `"piano"` | preference: answer keys as a drawn piano or as boxes (`"boxes"`, the older look) |
| `keyLabels` | `true` | preference: note names on the answer keys |
| `lang` | `"vi"` | preference (`"vi"` / `"en"`) |
| `activityExpanded` | `false` | preference: Luyện's activity panel shows the full calendar |
| `startPoint` | `null` | the first-open answer: `"beginner"` (lesson 1) or `"reader"` (a short Đọc nốt). Null until asked; a reader with history is never asked. Học can change it |
| `drills` | `{}` | each drill's own workout, by drill id (below) |

**Per-drill settings** (`settings.drills[id]`, `StoredDrillSettings`): a
drill's level, length and own options, keyed by the drill's registry id. Only
what the reader changed is stored; the drill's registry entry holds the
defaults, and `entry.of(settings)` reads saved values over them
(`docs/fe/architecture.md`, "Drill registry"). A new drill adds no field here.

| Drill | Fields (default) |
|---|---|
| `note-id` | `level` (1), `durationSec` (60, any value; offered 30/60/120/300, custom 60-1800), `accidentals` (false) |
| `hear-play` | `level` (1), `durationSec` (120), `cadenceEach` (false, listening aid: the cadence before every question), `oneKey` (false, listening aid: C at every level) |
| `review` | `level` (1, the only one), `durationSec` (120), `chapters` (null = every chapter with a finished lesson; else chapter ids) |
| `key-sig` | `level` (1-4, see `drill-key-sig.md`), `durationSec` (60). Its sessions record `accidentals: true` and the level's weight |

`drill` is a registered drill's id (`DrillId`, a string: `"note-id"`,
`"hear-play"`, `"review"`, ...). For a `hear-play` session,
`level` is its own level (1-4, see `drill-hear-play.md`), `accidentals` says
whether black keys were answers (L2 up), and `weight` is the level's weight.
Bests and averages are keyed on drill and level.

A session may also carry `"partial": true`: it stopped before its clock ran out
(the reader ended it). Its `durationSec` is the time actually played and its
`practiceScore` is 0. Partial sessions count toward minutes, streaks and active
days, and are skipped by bests and averages. The field is optional and additive.

A `hear-play` session may carry `"aids": true`: it was played with a listening
aid on (`cadenceEach`, or `oneKey` above L1). It counts toward minutes,
streaks and active days, and is skipped by bests and averages. Optional and additive.

`getSettings()` merges the stored settings over these defaults, so fields added
since a document was written fill in without a migration.

### Version 2 and the migration from version 1

Version 1 (until 2026-10-05) kept the two drills' workouts as flat settings:
`level`, `durationSec`, `accidentals` (Đọc nốt) and `earLevel`,
`earDurationSec`, `earCadenceEach`, `earOneKey` (Nghe & Đàn). Version 2 moves
each into `settings.drills[id]` under the drill's own name (`earLevel` →
`drills["hear-play"].level`, `earCadenceEach` → `.cadenceEach`, ...). `migrate`
(`progressStore`, pure, tested) runs on every read of an older document: a
field the old document never had stays out, so the drill's default applies;
everything else (days, theory) is kept as it was. The storage key stays
`musoni-progress-v1`, and the next save writes the document back as version 2.
A document at version 2 or later is read as it is.

### Theory lessons

Two optional, additive fields (added 2026-10-05, so `version` stays `1`; a
document without them reads as no lessons, and `days[].sessions` is guarded the
same way for a day that holds only lesson time):

- `theory.done` maps a lesson key (`<chapter id>/<lesson id>`, the same slugs
  as its URL) to its latest finish: when, and how many of its checks were right
  out of how many. Finishing again overwrites it. Học, Luyện (unlocks, Hôm nay) and the chapter
  list read it through `getLessonsDone()`; `theory/outline` turns it into the
  next lesson and chapter progress. Lesson and chapter ids are never renamed,
  since they are these keys.
- `days[date].lessons` lists time spent reading lessons that day
  (`{ lesson, seconds, at }`). The theory store counts time while a lesson is
  in view, caps each stretch between taps at 3 min (`THEORY_IDLE_CAP_MS`, so a
  lesson left open is not study), and saves it when the lesson ends, is closed,
  left or hidden. Under 15 s (`THEORY_MIN_RECORD_SEC`) it waits to be added to.

Lesson time **counts toward today's minutes, the streak, the longest streak and
active days** (`getDailyMinutes`, `getStreak`, `getLongestStreak`,
`getActiveDayCount` sum sessions and lessons). It never touches bests or
averages, which stay drill sessions only.

A lesson's "Luyện ngay" (and Luyện's Hôm nay card) starts its drill with a
**preset** for that session only (`app/drillPreset.ts`); the preset is not
stored, settings are not changed, and the session is recorded like any other
with the level and length it was played at.

### Luyện and Ôn tập

Two more optional fields (version 2):

- `unlocksSeen`: drill ids Luyện has already shown as open. A drill opened by
  a lesson and not yet seen is marked "Mới mở" on that one visit.
- `review`: Ôn tập's history, one small entry per lesson check ever answered,
  keyed `<chapter id>/<lesson id>/<step index>`: when it was last answered,
  and `missed: true` when that answer was wrong. Only the latest answer is
  kept. The weighting reads it (`drills/review/select.ts`). Step indexes are
  positions in the lesson, so reordering a lesson's steps reshuffles its
  history (harmless: weights only).

Ôn tập sessions are ordinary sessions (`drill: "review"`, `level: 1`): their
time counts toward the day, and bests and averages work as for any drill.

Day keys are the viewer's **local** calendar day (`localDayKey`), not UTC, so a
session at 1am in UTC+7 lands on today.

## Live session (`musoni-live-v1`)

A second, separate key holds the session **being played**, per drill, so a page
load (refresh, a typed URL, a crash) does not lose it:

```json
{ "note-id": { "drill": "note-id", "savedAt": 1790000000000,
               "state": { "phase": "running", "correct": 3, "pausedAt": 1790000000000, "…": "…" },
               "summary": { "to": "/train/note-id", "secondsLeft": 40, "correct": 3, "wrong": 1 } } }
```

`state` is the drill store's data (JSON, no functions), which only that drill
reads back; `summary` is what the tabs' paused bar shows. Ôn tập keeps check ids
only here, not the questions. It is written on every
change while a session runs and removed when the session finishes, ends early
or returns to setup (`app/liveSession`). It is device-local working state, not
progress: it never syncs and is not part of the versioned document above.

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
- `getBest(drill, level)` — best session at a level, any length (partial and aided sessions skipped)
- `getRecentAverage(drill, level, excludeAt, days?, now?)` — mean score at a level over recent days (partial and aided sessions skipped)
- `getStreak(now?)` — consecutive practised days ending today (an unpractised
  today counts back from yesterday)
- `getLongestStreak()` — longest run of consecutive practised days on record
- `getActiveDayCount()` — number of days with at least one session or lesson time
- `getDailyMinutes()` — minutes practised per local day (drill sessions plus lesson time)
- `localDayKey(date)` — the local `YYYY-MM-DD` key used everywhere
- `recordLessonTime({ lesson, seconds, at })` — adds reading time under that local day
- `markLessonDone(lesson, { correct, total }, now?)` / `getLessonsDone()` — finished lessons
- `hasHistory()` — any session, lesson time or finished lesson (first open is skipped)
- `getLastPlayed()` — each drill's latest session time, by id (unlocks, Hôm nay)
- `getUnlocksSeen()` / `markUnlocksSeen(ids)` — drills Luyện has shown as open
- `getReviewMarks()` / `recordReviewAnswer(check, correct, now?)` — Ôn tập history
- `migrate(doc)` — any stored version to the current one (pure)
- `saveLiveSession(drill, state, summary, now?)` / `getLiveSession(drill)` /
  `getLiveSessions()` / `clearLiveSession(drill)` — the live session above
