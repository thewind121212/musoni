# Nghe & Đàn: listening aids and its own colour — design

Date: 2026-10-03 · Drill: `drills/hear-play` (design: `docs/fe/drill-hear-play.md`)

## Intent

The user asked for an audit of drill 2's settings ("anything missing?") and for drill 2
to stop using the app's orange. Settings must be simple for a beginner to understand and
practical for day-to-day practice.

Audit result (agreed): Level, Length, note names, piano/boxes and names-on-keys stay as
they are; sound stays always on. Two settings are missing; everything else considered
(hide the tonic dot, custom note sets, cadence speed, instrument, replay limit) is out of
scope. Echo phrases stay the planned next level, not a setting.

## 1. Two listening aids

A new **Nghe** group on drill 2's setup, above the answer-key group, with two switches:

| Setting | vi label / hint | en label / hint | Default |
|---|---|---|---|
| `earCadenceEach` | **Nghe giọng trước mỗi nốt** / "Hợp âm báo giọng vang trước từng câu" | **Key before every note** / "The key's chords play before each question" | `false` |
| `earOneKey` | **Giữ một giọng (Do)** / "Luyện các bậc trong một giọng trước khi đổi" | **Stay in one key (C)** / "Learn the steps in one key before keys move" | `false` |

Behaviour:

- `earCadenceEach` on: the I–IV–V–I cadence plays before **every** question, not only on a
  key change. The "Đổi giọng" badge still shows only on a real key change.
- `EarQuestion` gains `keyChanged` (first question, or a different key from the last
  one). The badge reads `keyChanged`; `newKey` keeps meaning "a key block starts, play the
  cadence". This also fixes level 1 (C only), which today shows "Đổi giọng" every 6
  questions without changing key; it keeps the cadence refresher every 6.
  Replay (Space / Nghe lại) is unchanged.
- `earOneKey` on: the level's key list is replaced by `['C']`, so L2–L4 never change key.
  Notes, black-key answers and level weight are unchanged. At L1 (already C only) the
  switch is shown disabled, with the hint "Cấp này đã ở giọng Do" / "This level is already
  in C".
- Both are **workout parameters** in `Settings` (persisted via `progressStore`), drill 2
  only, shared nowhere else. Existing saved settings get the defaults through the
  existing `{ ...DEFAULTS, ...saved }` merge; no migration.
- Setup's summary line gains short tags when on, after level and length, as drill 1 adds
  "♯ ♭": "Mỗi câu nghe giọng" / "Key every note" and "Một giọng" / "One key".

Code:

- `config` has no new tunables (the aids are on/off).
- `generateEarQuestion(level, naming, previous, rng, opts?: { oneKey?: boolean })`:
  `keys = opts?.oneKey ? ['C'] : EAR_LEVELS[level].keys`. The existing
  "previous key not in this level's keys → new key" rule also handles a key list change.
- The store passes `{ oneKey: settings.earOneKey }` from the session's settings (captured
  at `start`, so changing setup mid-session is impossible anyway).
- The run screen plays `questionSound(q, q.newKey || settings.earCadenceEach)` where it
  currently passes `q.newKey`.

## 2. Aids don't set a best

Both aids make the drill easier (the answer clock starts when the note sounds, so the
extra cadence costs nothing on the score). A session played with either aid on:

- is saved with `aids: true` on its `SessionResult` (absent otherwise, like `partial`).
  "An aid on" is `earCadenceEach || (earOneKey && level > 1)`: at L1 one key changes
  nothing, so it is not an aid there (and its switch is disabled);
- counts toward today's minutes, the streak and the activity calendar exactly as now,
  but is left out of week averages (`getRecentAverage` skips it, as it skips `partial`;
  changed after final review: mixing easier sessions in made every plain session read
  as below average after a week with aids);
- is skipped by `getBest` (as `partial` sessions are), so it never sets or shows as a
  best;
- shows one line on the result screen, under the score: "Có trợ giúp nghe — không tính
  kỷ lục" / "Listening aids on — doesn't count toward your best". The "new best" badge
  and the best bar compare against aid-free bests only.

## 3. Violet for drill 2

The app's orange is the action colour token `--cta` / `--cta-ink`, used by every primary
button (`bg-cta`). Drill 2 overrides the token on a scope; no component changes.

- `index.css`: `[data-drill="hear-play"] { --color-cta: oklch(0.55 0.2 300);
  --color-cta-ink: oklch(0.99 0 0); }`, and under
  `[data-theme="dark"][data-drill="hear-play"], [data-theme="dark"] [data-drill="hear-play"]`
  (the attribute sits on `<html>` itself on the drill route, on a descendant on home)
  `--color-cta: oklch(0.72 0.15 300);
  --color-cta-ink: oklch(0.17 0.012 258);`. It must set the Tailwind theme variables
  (`--color-cta*`), not `--cta`: `@theme` resolves `--color-cta: var(--cta)` once at
  `:root`, so overriding `--cta` lower down changes nothing. Text on the button must
  reach WCAG AA (≥ 4.5:1); verify both themes.
- Scope it on: `<html>` while drill 2's route is mounted (`HearPlayDrill` sets
  `data-drill="hear-play"` in a layout effect and removes it on unmount, as `useRunGuards`
  sets `overscroll-behavior` on `<html>`). A container scope would miss the pause sheet,
  which vaul portals to `<body>`. Also on drill 2's
  `PracticeCard` on home (a wrapping element in `HomeScreen`, so the organism stays
  unaware of drills), and home's `PausedNotice` when `pausedSession.to` is drill 2's
  route.
- Unchanged: `--accent` (blue selections), `--correct`, `--wrong`; drill 1 keeps orange.
- The drill-id → attribute mapping is the route's own id (`hear-play`), so a later drill
  can get its own colour with one CSS rule.

## Testing

- Generator: `oneKey` keeps every question in C at L2–L4 across many draws; without it
  keys still move after `EAR_KEY_BLOCK`.
- Store/run: with `earCadenceEach`, every question's sound starts with the cadence;
  without it only key changes do.
- Progress: `getBest` skips `aids: true` sessions; daily minutes still include them.
- Setup page: both switches render, write settings, L1 disables "stay in one key",
  summary tags appear.
- Result page: the aids line shows only for an aided session.
- Generator: `keyChanged` is true only on the first question and on a real key change;
  at L1 and with `oneKey` it is false after the first question.
- Colour: unit tests assert the `data-drill="hear-play"` scope is on `<html>` during the
  drill (and gone after), the
  home card and drill 2's paused bar (jsdom doesn't compute Tailwind colours). Then a
  real-browser check at 375px, light and dark: drill 2's Start/Practice computes violet,
  drill 1's stays orange, contrast ≥ 4.5:1.

## Docs to update with the change

`docs/fe/drill-hear-play.md` (aids, scoring rule, colour), `docs/fe/screens.md` (setup
group, result line, home card colour), `docs/fe/data-model.md` (`earCadenceEach`,
`earOneKey`, `aids`), `docs/fe/architecture.md` (per-drill colour scope), `docs/STATUS.md`.
