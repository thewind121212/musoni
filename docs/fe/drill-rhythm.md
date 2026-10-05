# Tiết tấu (Rhythm)

Read one measure of rhythm and tap it in time. The reader sees a measure on a
percussion staff with its tempo, hears four clicks count in, and taps every
note on a big pad. The taps are judged on the audio clock and marked over the
notes.

Route `/train/rhythm`, module `drills/rhythm`, store `useRhythmStore`. Group
`ear`, opened by the lesson `durations-time/note-values`. Mockup: project
files `screenshots/theory-drills/5-rhythm.png`; proposal
`theory/drills-proposal.md`. This drill replaces the parked
Complete-the-Measure design (`drill-complete-measure.md`).

## One measure

1. **Read** (`RHYTHM_READ_MS`, 0.7 s): the measure shows; the tempo reads
   "♩ = 80" (in 6/8, "♩. = 60").
2. **Count-in**: four clicks, the first accented, shown as four dots that
   light with each click.
3. **Tap**: on the downbeat the status turns to "gõ". A touch on the pad
   (pointer down), Space, or any letter key taps. With **Click trong ô nhịp**
   on (the default), the metronome keeps clicking through the measure.
4. **Judge**: once the bar plus twice the tolerance has passed, the taps are
   judged. Each note to tap gets a mark above it: a green check (on time), an
   amber arrow back or forward (early or late, within twice the tolerance) or a
   red cross (missed). A tap that belongs to no note is a red cross on a lower
   row, placed where it landed. A right measure turns green.
5. **Verdict** under the staff: "Đúng nhịp", or the first problem ("Nốt thứ 2
   trễ 157 ms", "Thiếu nốt thứ 3", "Gõ thừa 1 lần"). It holds 1.3 s when right,
   2.8 s when wrong, then the next measure (never the same notation twice in a
   row).

A measure is **right** when every onset is on time and there is no extra tap.
Rests have no onset; a tied note has one onset (the tie's first note). Taps
during the count-in or on the next downbeat that no note claims are not
counted as extra.

## Levels

| Level | Name | Adds | Tolerance | Weight |
|---|---|---|---|---|
| 1 | Tròn, trắng, đen | whole, half, quarter in 4/4 | ±120 ms | 1.0 |
| 2 | Móc đơn, dấu lặng | eighth pairs, quarter and half rests | ±100 ms | 1.3 |
| 3 | Chấm dôi, dấu nối | dotted quarter + eighth, dotted half, ties across beat 3 | ±85 ms | 1.6 |
| 4 | 6/8 và liên ba | 6/8 (40% of measures), triplets and sixteenths in 4/4 | ±70 ms | 2.0 |

Tunables in `config/constants.ts` (`RHYTHM_*`): levels, tempos (60/80/100/120,
default 80), the compound tempo factor, count-in, read time, lead time, hold
times, click sound, calibration, staff width, mark room.

## The generator (`generator.ts`)

Measures are built from **figures** that each fill a beat, a half bar or the
whole bar, so the notation follows the book's rules on rhythmic notation
errors (Hutchinson, *Music Theory for the 21st-Century Classroom*, "Common
Rhythmic Notation Errors"):

- **Beams never cross a beat.** Eighths, sixteenths and triplets live inside
  one beat figure (`8 8`, `16 16 16 16`, `8 16 16`, `16 16 8`, `8. 16`,
  `3( 8 8 8 )`).
- **Beat 3 stays visible** in 4/4: figures fill one half bar or the other,
  except a whole note or a dotted half from beat 1. A note sounding across
  beat 3 is written as a tie (`q~ q`), and a tie never makes a value one note
  would write (no `h~h`, no `h~q` from beat 1).
- **No two quarter rests in one half bar** (that is a half rest).
- **6/8** groups in two dotted-quarter beats: `q.`, `q 8`, `8 q`, `8 8 8`
  (beamed in threes), `Rq.`, or a dotted half.
- Every measure has at least one onset, and from level 2 at least one figure
  new at that level (`RHYTHM_ODDS.fresh` sets how often a new figure is picked
  over an older one).

Notes are written `B4:<value>` on a percussion staff. `allMeasures(level)`
enumerates every measure a level can draw (L1 5, L2 95, L3 83, L4 6691, of
which 25 in 6/8); the tests check every one with an independent validator.

**Tempo.** The setup tempo is the quarter note. In 6/8 the beat is the dotted
quarter at `tempo × 0.75` (♩ = 80 → ♩. = 60), so eighths keep their speed.
The count-in is four beats in both meters (`pulseOf`).

## Timing and judging

- **Clock.** The drill has its own `AudioContext` (`metronome.ts`). Clicks are
  scheduled on its clock (`RHYTHM_LEAD_SEC` ahead), and a tap's
  `event.timeStamp` is turned into the audio-clock time the reader was hearing
  (`audioTimeAt`, via `getOutputTimestamp`, else `currentTime −
  outputLatency`). Taps and clicks compare on one clock, whatever the page is
  doing. Without Web Audio the page clock stands in and nothing sounds.
- **Wake.** Start (setup) wakes the audio clock; if a phone still holds it,
  the run screen says "Chạm vào ô Gõ để bật âm thanh" and waits.
- **Judge** (`judge.ts`). An ordered alignment pairs each onset with at most
  one tap (missed and extra cost most, then early/late, then distance), so one
  early tap never shifts every later note. A tap more than twice the
  tolerance from its note is not paired: the note is missed and the tap extra.
- **Latency calibration** (setup, "Gõ theo 8 tiếng click"): eight clicks at
  100 bpm; the median tap offset becomes `latencyMs` when at least five taps
  landed near clicks and their spread is under 60 ms, clamped to
  −150…400 ms (`calibrate.ts`). Saved in the drill's settings and taken off
  every tap before judging.

## Store flow

`start` → for each measure `beginTake` (the count-in starts) → `judge(taps)`
→ `nextQuestion`. A take only exists between those two calls:

- **Pause or leave** mid-measure drops the take uncounted (`pause` and
  `resume` clear it); on resume the same measure plays again, count-in and
  all. A reload restores the session paused, like the other drills.
- **Time up** mid-measure: the measure finishes and counts; the session ends
  between measures (`tick` waits while a take or its marks are on screen,
  `nextQuestion` and `beginTake` finish it).

## Scoring

The shared practice score (`practiceScore`): pace of right measures ×
accuracy × the level's weight × endurance. A slower tempo means fewer measures
a minute, so a faster tempo scores more. The result's third figure is
**Lệch TB**, the mean distance of paired taps from their notes in ms
(`SessionResult.avgMs` for this drill), in place of time per answer. The
result lists up to four missed measures with their marks.

## Code map

| File | Role |
|---|---|
| `drill.ts`, `strings.ts` | registry entry (`RhythmOptions`: `tempo`, `click`, `latencyMs`; preset may set `tempo`), strings |
| `generator.ts` | figures, measures, `allMeasures`, `generateMeasure`, `pulseOf` |
| `judge.ts` | `judgeTaps`, `firstProblem`, `meanOffset` |
| `calibrate.ts`, `useCalibration.ts` | latency from taps; setup's calibration run |
| `metronome.ts` | audio clock, clicks, `audioTimeAt` |
| `store.ts` | session, takes, `measureTiming` |
| `components/` | atoms `TapPad`, `BeatDots`, `MarkDot`; molecule `MarkLegend`; organisms `RhythmStaff` (NoteStaff + marks), `CalibrationPanel`, `MissedMeasures` |
| `pages/` | `RhythmDrill`, `SetupPhase`, `RunPhase`, `ResultPhase` |
