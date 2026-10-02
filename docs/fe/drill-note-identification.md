# Drill 1 — Note Identification (Phase 1)

Train reading speed: a note appears on the staff, name it as fast as possible.

## Question lifecycle (drill store)

`generate → render → answer → feedback → next`

As built, this lifecycle lives in the note-id drill's own Zustand store
(`drills/note-id/store.ts`) — there is no separate drill-agnostic engine yet.
The store's `start` / `answer` / `tick` / `nextQuestion` actions call the
generator, scoring (`core/scoring.ts`), and `progress/progressStore` directly.
`core/engine/` is a reserved, currently-empty placeholder: extracting a shared
engine out of this store is the natural refactor if/when a second drill
(Complete-the-Measure, Phase 2) needs to reuse the same lifecycle — it isn't
built speculatively ahead of that need. See `docs/fe/architecture.md` for the
full rationale.

## Question generation

- Pick a random note within the current difficulty's range (clef + staff position).
- If the accidentals setting is ON and level allows: the note carries # or ♭
  with probability `ACCIDENTAL_CHANCE` (0.4).
- **Never the same note twice in a row**: the generator takes the previous pitch
  and redraws on a repeat (same letter, accidental and octave). A back-to-back
  repeat reads as a glitch and gets answered from memory rather than from
  reading.

## Answer pad: a fixed 12-key piano

The answer options are not sampled per question. They are a piano, and the keys
never move:

- It is drawn like a real keyboard: seven long white keys side by side, names at
  their foot, and the five black keys laid over the top of the gaps between them
  (two, none where E meets F, then three), each 0.6 of a white key wide.
- **Naturals** (always): the white keys, C D E F G A B (or Do Re Mi Fa Sol La Si).
- **Accidentals** (only when the setting is ON): the black keys are answers too,
  with a smaller name. With the setting OFF the black keys are still drawn, as
  landmarks a pianist finds notes by, but they cannot be pressed and are hidden
  from screen readers.
- The black keys are **spelled to match the printed note**: a question printed
  with a flat is answered on a row of flats (Db Eb Gb Ab Bb); a sharp or natural
  question shows sharps (C# D# F# G# A#). The correct answer is therefore always
  present in exactly one spelling, and only that spelling counts.
- Guessing odds are 1 in 12 with accidentals (1 in 7 without); the difficulty
  weighting already accounts for that.

Because the layout is fixed, the pad becomes a shape to learn, like the
instrument, instead of a list to re-read every question.

## Rendering

VexFlow draws a single note on a staff (clef per level), large and centered.
On feedback the staff itself answers too: the printed note turns green, and on
a miss the note the reader picked is drawn beside it in red (and named in words
under the staff), at the octave
nearest the printed note (`core/music/pitch.nearestOctave`), so the mistake
shows as a distance on the staff rather than only as a red key.

## Answering

- Big tappable keys (mobile-first) + keyboard shortcuts on desktop.
- Keyboard shortcuts follow a piano ("musical typing", as in DAWs), matched on
  the physical key (`KeyboardEvent.code`) so Caps Lock and IME input still work:
  - home row `A S D F G H J` = white keys C D E F G A B
  - row above `W E T Y U` = black keys C#/Db, D#/Eb, F#/Gb, G#/Ab, A#/Bb
    (`R` sits over the E-F gap and does nothing, like the piano)
  - chords with Ctrl / Cmd / Alt are left to the browser, and auto-repeat
    keydowns from a held key are ignored so it cannot answer the next note.
  Shortcuts resolve by matching the key each option advertises (`core/music/keyboard.ts`),
  not by parsing a digit.
- Instant feedback: the correct key fills green with a check, a wrong pick red
  with a cross, and the staff mirrors it (see Rendering), then auto-advance. A
  correct answer flashes for **260 ms** and moves on; a miss holds for **1.1 s**,
  long enough to look at the staff (`FEEDBACK_CORRECT_MS` / `FEEDBACK_WRONG_MS`
  in `config/`).
- Optional sound: the actual pitch plays on answer on a sampled piano
  (Salamander Grand, see `docs/infra/stack.md`), lazy-loaded when the sprint
  opens, with a sine tone as the fallback until the samples arrive.

## Session format

A timed sprint of the chosen **session length**. Offered lengths are 30s, 1 min,
2 min and 5 min (1 min is the default), plus **Other** (*Khác*): a custom stepper
from 1 to 30 minutes. Tracks correct, wrong, accuracy, average response time, and best streak.

Why these lengths: one minute is an established convention for timed
note-naming (the "One-Minute Club"), and two minutes twice a day is a commonly
taught drill pattern. Thirty seconds is not from the literature; it exists so a
day is never skipped for lack of time, because the research is consistent that
frequency beats session length.

Other opens on 10 minutes (`DEFAULT_CUSTOM_MINUTES`), or keeps an existing
custom value; it must never open on a preset, or the stepper (shown only for a
non-preset length) would stay hidden.

Any length is safe because the score is a **pace**, not a total (see below), so
personal bests are keyed on **level only**, across every length. Keying by length
would fragment bests into a bucket per custom duration, where nearly every
session is trivially a record.

## Settings (user-chosen, saved in localStorage)

| Setting | Options | Effect |
|---|---|---|
| Note naming | **Solfège** (Do Re Mi Fa Sol La Si, default) / **Letters** (C D E F G A B) | Keys and answers display in the chosen system. Solfège is the default because Vietnamese teaching leads with it |
| Accidentals | ON / OFF | OFF = naturals only ever appear, and the black keys are landmarks only |
| Answer keys | **Piano** (default) / Boxes | Piano draws a keyboard (black keys over the white ones, always shown). Boxes is the older look: two rows of buttons, the black row hidden without accidentals |
| Names on keys | ON (default) / OFF | Note names printed on the answer keys. OFF trains finding the note on a bare keyboard rather than matching a name; the right key and a wrong pick show their names once answered, and every key keeps its name for screen readers. Scoring is unchanged |
| Sound | ON / OFF | Pitch playback on answer |
| Session length | 30s / 1 min / 2 min / 5 min / Other (1-30 min stepper) | How long the sprint runs |

Levels control *where* notes live; settings control *how you answer* and *what
note pool is allowed*.

## Difficulty levels

| Level | Range | Weight |
|---|---|---|
| L1 | Treble clef, notes on the staff only (E4-F5) | ×1.0 |
| L2 | Treble + ledger lines (A3-C6) | ×1.3 |
| L3 | Bass clef (G2-A3) | ×1.5 |
| L4 | Both clefs mixed (treble A3-C6, bass E2-E4) | ×1.8 |

Accidentals ON multiplies the level weight by **×1.4** (e.g., L4 + accidentals = ×2.52).

## Weighted scoring (comparable across all settings and lengths)

```
pace          = correct / minutes
endurance     = max(0.6, 1 + 0.3 × log2(minutes))
practiceScore = round(pace × 10 × difficultyWeight × accuracy × endurance)
```

- **Pace, not total**: correct answers per minute, so length alone cannot buy a
  score and a 30-second sprint and a 10-minute session land on one scale.
- **Accuracy** multiplies in, which stops button-mashing (50 answers at 60% < 35
  at 95%).
- **Difficulty weight**: harder settings earn more, so attempting difficulty is
  rewarded.
- **Endurance multiplier**: pure pace punishes concentration, because fatigue
  drags the average down over a long session (a 30-second burst out-scored a
  10-minute session, 420 vs 300). The multiplier grows **logarithmically, +0.3
  per doubling** from a 1-minute baseline, floored at 0.6:

  | Length | 30s | 1m | 2m | 5m | 10m | 30m |
  |---|---|---|---|---|---|---|
  | Endurance | 0.70 | 1.00 | 1.30 | 1.70 | 2.00 | 2.47 |

  At the same pace 10 minutes is worth twice 1 minute, the burst no longer wins,
  and 10 minutes at half pace ties 1 minute at full pace. Tests in
  `core/scoring.test.ts` pin these properties.
- The result screen shows the difficulty and endurance multipliers as chips, so
  the reward is visible rather than buried in the arithmetic.
- All weights are tunable constants in `config/constants.ts`
  (`LEVELS`, `ACCIDENTALS_WEIGHT`, `ENDURANCE_PER_DOUBLING`, `MIN_ENDURANCE_BONUS`).
- Average response time stays a separate stat; pace already rewards speed.

Each session record snapshots its settings, level and length (see
`data-model.md`), which enables both one honest overall trend chart and
per-setting breakdown charts.

## Misses and the result screen

Every wrong answer is kept in the drill store as `misses` (clef, pitch, and the
answer and picked key labels in the reader's naming). They reset when a session
starts and stay after it finishes, for the result screen's **notes to review**.
They are not persisted: `SessionResult` and the saved document are unchanged.

The result also sets the score against `getRecentAverage` (progress store): the
mean practice score at the same level over the last 7 local days, leaving out
the session being shown.

## Pausing and ending early

The store holds `pausedAt` and `pauseReason` (`menu`: the reader asked, via ✕
or Esc; `away`: the page was hidden or the route left). While paused, `tick`
and `answer` do nothing. `resume` shifts `endsAt` and `askedAt` forward by the
paused time, so the clock and the per-note time only ever count practice. A
question that appears during a pause (the feedback timer still advances) starts
its clock at the pause.

A session that stops before its clock runs out is recorded as **partial**
(`recordPartial`): `durationSec` is the time actually played (`playedMs`),
`practiceScore` is 0 and `partial` is true. That happens on `endEarly` (the
pause panel's end action), and on `start` or `backToSetup` while a session is
still running, which is how a session left paused ends when the reader starts
another. A session with no answers is not recorded.

Before this, leaving by back and returning after the clock ran out let `tick`
finish the abandoned session as a full one: full length, a real score, and a
possible personal best. The run phase now pauses on unmount (deferred one task,
so StrictMode's development remount does not count as leaving) and publishes a
`pausedSession` to the app store for home. That logic lives in
`app/useRunGuards`, shared with Nghe & Đàn.

