# Quãng (Intervals)

Read the distance between two notes on the staff and name it. Interval reading
is what turns note-by-note reading into reading shapes: a 3rd is a line to the
next line, a 5th skips two, a 6th looks wider than it sounds. The drill trains
naming the size fast, then the quality.

Route `/train/intervals`, module `drills/intervals`, store `useIntervalsStore`,
group `read` (order 30, after Đọc nốt). Approved mockup: project files
`screenshots/theory-drills/3-intervals.png`; proposal:
`theory/drills-proposal.md`. Opens on Luyện once lesson
`accidentals-steps/half-whole-steps` (chapter 2, half and whole steps, which
are 2nds) is finished; until that lesson exists it is reached from "Xem tất
cả".

## One question

1. Two whole notes on one staff, the lower one first: **side by side**
   (melodic, `quãng giai điệu`) or **stacked** (harmonic, `quãng hòa âm`), half
   and half at random (`INTERVAL_HARMONIC_SHARE`). "Quãng gì?" above them
   ("Quãng mấy?" at level 1).
2. The reader answers with **one tap** on the grid below (or one key, on a
   computer).
3. The notes turn green, the right cell turns green with a check (the pick red
   with a cross on a miss), and the line under the staff names the interval in
   the reader's note names: **"Quãng 6 thứ (Mi → Do)"**, or on a miss
   **"Quãng 6 trưởng (Sib → Sol), bạn chọn quãng 6 thứ"**. The full name is shown
   at level 1 too, where only the size is asked: the quality is the next thing
   to learn.
4. With **Nghe** on, the interval sounds as written: the two notes one after the
   other (melodic, 0.55 s apart) or together (harmonic) (`intervalSound`,
   `INTERVAL_PLAY`), on the sampled piano through `playSequence`.
5. The next question comes by itself after 1.1 s (right) or 2.2 s (miss, to read
   the name) (`INTERVAL_FEEDBACK_*`).

Names follow `docs/theory/glossary.md`: quãng 2 … quãng 8; thứ, trưởng, đúng,
tăng, giảm. English: minor 6th, perfect octave, augmented 4th.

## The answer grid

Sizes 2 to 8 across, qualities down:

| Row | Vietnamese cell | English cell | Keys (desktop) |
|---|---|---|---|
| Thứ (minor) | 2t 3t · · 6t 7t · | m2 m3 · · m6 m7 · | `2`–`8` |
| Trưởng / Đúng (major or perfect) | 2T 3T 4Đ 5Đ 6T 7T 8Đ | M2 M3 P4 P5 M6 M7 P8 | `W`–`I` |
| Tăng (augmented) | 2+ … 8+ | A2 … A8 | `S`–`K` |
| Giảm (diminished) | 2° … 8° | d2 … d8 | `X`–`,` |

- One row holds major **and** perfect: no size has both (2, 3, 6, 7 are major or
  minor; 4, 5, 8 perfect), so the row reads "the plain one".
- A minor 4th, 5th or octave does not exist: those cells are **blank** (dashed,
  not buttons, hidden from screen readers).
- **Only the level's rows are drawn**: level 1 is one row of sizes (no heads),
  levels 2-3 the minor and major/perfect rows, level 4 all four. Hidden rather
  than greyed: fewer, larger cells fit 320×568.
- Every augmented and diminished cell can be tapped at level 4, including ones
  the level never asks (A3, d2...): they are real intervals and a fair wrong
  answer.
- Computer keys follow the grid's shape on the keyboard: each row sits on one
  keyboard row and each size on the key under its digit (2 W S X, 3 E D C …
  8 I K ,). The physical key counts (Shift, Caps Lock and a Vietnamese input
  mode do not matter); shown in each cell's corner from `md` up.
- Each cell's accessible name is the full name ("Quãng 6 thứ", "Minor 6th").

## Levels

| Level | Asks | Notes | Clefs | Weight |
|---|---|---|---|---|
| L1 Cỡ quãng | the size only, 2 to 8 (any quality right) | white keys | treble | ×1.0 |
| L2 Trưởng, thứ, đúng | m2 M2 m3 M3 P4 P5 m6 M6 m7 M7 P8 | white keys, without F–B and B–F | treble | ×1.3 |
| L3 Có dấu hóa | the same eleven | a sharp or flat on either note | treble and bass | ×1.6 |
| L4 Tăng và giảm | those eleven, plus A2 A4 A5 A6 d4 d5 d7 (40% of questions) | sharps and flats | treble and bass | ×2.0 |

- **L2 leaves out the tritone.** F–B (A4) and B–F (d5) are the only white-key
  intervals that are not major, minor or perfect; they come at L4 by name.
- **L4's augmented and diminished intervals are the ones met in practice**: A4 /
  d5 (the tritone, V7 and vii°), A2 (harmonic minor, 6 to 7), d7 (vii°7), A5
  (the augmented triad), d4 (harmonic minor, 7 up to 3), A6 (the augmented
  sixth chord). Others (A3, d3, A7, d2, d6, A8, d8) are rare and never asked.
- **Range** (`INTERVAL_RANGE`): treble C4 to A5, bass E2 to C4, by letter: one
  ledger line at most either side, so the staff holds one size. No compound
  intervals and no unison.
- **Spelling**: the size comes from the letters and the quality from the
  semitones, so C–D♯ is an augmented 2nd and C–E♭ a minor 3rd. No note is ever
  written E♯, B♯, C♭ or F♭, and no note carries a double sharp or flat (the
  generator drops those spellings).

## Generator

`generator.ts`. Each level's **pool** is built once: every pair of notes in
range (with accidentals from L3) whose interval the level asks, grouped by
answer (the size at L1, the interval id such as `m6` above). A question picks
the **answer first**, evenly (at L4 an augmented or diminished one 40% of the
time), then one of its spellings, the clef with it, and the layout. So an
interval with many spellings (M2) is not asked more often than one with few
(M7). **Never the same answer twice in a row** (which also means never the same
two notes): a repeat would be answered from the last tap, not by reading.

Tests walk every spelling of every level (`generator.test.ts`): two real notes,
in range, in the level's clefs, no excluded spelling, the name matches the
semitones, the answer's own cell exists on the level's rows and is marked
right; every answer of a level is reachable, with both clefs from L3; no answer
repeats in 3,000 questions per level; L4's share of augmented and diminished is
near 40%.

## Session, score, pause

Same shell as the other drills:

- Own length (`settings.drills.intervals.durationSec`, default 1 min, the same
  choices and Other stepper) and level; `hear` (default on) is the reader's own:
  a lesson preset sets level and length only.
- `practiceScore` = pace × 10 × level weight × accuracy × endurance
  (`core/scoring`). Answer time runs from when the question appears; the
  feedback hold is not counted against it. Bests and week averages per drill
  and level (`getBest('intervals', level)`). `SessionResult.accidentals` is true
  from L3.
- ✕ / Esc pause, leaving pauses, back goes where the session started, ending
  early records a `partial` session, a refresh brings the session back paused
  (`useRunGuards`, `useDrillRoute`, `keepLiveSession`). A pause cuts the sound.
- Result: the shared summary, comparison bar and buttons, then **"Quãng cần xem
  lại"**: each missed interval once (×2 when repeated), on a small staff as it
  was asked, with its grid label and the pick ("6t", "bạn chọn 6T").

## Setup

Back caret and "Quãng"; one line on what it asks; **Gọi tên gì**: four row
cards, each with what it asks in the grid's own labels as its picture ("2–8",
"3T 5Đ", "♯ ♭", "4+ 5°"); the length pills; **Nốt và âm thanh**: "Nghe quãng
sau mỗi câu" (on) and the note-name toggle (Do Re Mi / C D E, shared with the
other drills). The sticky bar: summary, best at the level, amber Bắt đầu.

## Staff

`IntervalStaff` draws the notes with the core `NoteStaff` (notation `"E4 C5"`
or `"E4+C5"`, `intervalNotation`), parsed once per question. `NoteStaff` gained
an optional `room` prop for it: the box is pinned to the staff lines plus
`INTERVAL_STAFF_ROOM` instead of being cropped to the ink, which otherwise
changes with ledger lines and accidentals and made the staff jump between
questions. Harmonic notes sit just after the clef, as engraved.

## Code

| Piece | Where |
|---|---|
| Interval maths (size, quality, semitones, spelling) | `drills/intervals/interval.ts` |
| Grid cells, answer check, computer keys | `drills/intervals/grid.ts` |
| Pools, question, sound, notation | `drills/intervals/generator.ts` |
| Names, labels, the verdict line | `drills/intervals/names.ts` |
| Registry entry, strings | `drills/intervals/drill.ts`, `strings.ts` |
| Session state | `drills/intervals/store.ts` |
| Grid, staff, missed intervals | `drills/intervals/components/organisms/` (`IntervalGrid`, `IntervalStaff`, `MissedIntervals`) |
| Pages | `drills/intervals/pages/` (`IntervalsDrill`, `SetupPhase`, `RunPhase`, `ResultPhase`) |
| Tunables | `config/constants.ts` `INTERVAL_*` |

## Later

- An ear-only level (hear the interval, name it) once the reading levels are used.
- Descending melodic intervals (upper note first), and compound intervals.
