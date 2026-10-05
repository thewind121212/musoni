# Drill — Hợp âm (Chords)

Read a triad on the staff and name it: by its root and quality, or by its
Roman numeral in a key. Trains the reading half of chapters 8 and 9 (triads,
inversions, diatonic chords).

Route `/train/chords`, module `drills/chords`, store `useChordStore`, group
**Đọc** (`read`), order 40. Opens on Luyện once the lesson
`triads/triads-intro` is finished (`unlockedBy`); until that lesson exists it
stays under "Xem tất cả". Proposal: project files `theory/drills-proposal.md`;
approved mockup: `screenshots/theory-drills/4-chords.png`.

## One question, by name (levels 1-4)

1. A **block chord** in close position on a treble staff, as whole notes.
2. The reader answers in **two taps**, either order:
   - **1 · Nốt gốc** (root) on the same 12-key piano pad as Đọc nốt (same
     keyboard shortcuts, Piano / Ô layouts, names-on-keys setting). The black
     keys are spelled to the chord: the root's own accidental, else flats when
     the chord has a flat (F minor: A♭), else sharps. The picked key fills
     blue (`AnswerPad` `selected`) and can be changed until the second tap.
   - **2 · Tính chất** (quality) on four chips: Trưởng, Thứ, Giảm, Tăng
     (major, minor, diminished, augmented). Chips a level does not ask are
     drawn dashed and cannot be pressed.
3. The answer shows as its **lead-sheet symbol and name**:
   "Am/C · La thứ, thế đảo 1". Green when right; red when missed, with
   "bạn chọn Do trưởng" under it. The staff turns green (it is always the
   right answer), the pad and chips mark the right key and quality, and a
   wrong pick in red, so the reader sees which half was wrong.
4. After a hold (1.1 s right, 2.6 s wrong) the next chord comes.

A question counts as right only when both the root and the quality are.
In an inversion the root is not the bass: Am/C is answered on La, not Do.

## Levels

| Level | Asks | Chips | Black keys answer | Weight |
|---|---|---|---|---|
| L1 Giọng Do | the seven triads of C major: C Dm Em F G Am B° | Trưởng Thứ Giảm | no (landmarks) | ×1.0 |
| L2 Trưởng, thứ | every major and minor triad, root position | Trưởng Thứ | yes | ×1.3 |
| L3 Giảm, tăng | all four qualities, root position | all four | yes | ×1.6 |
| L4 Thế đảo | L3 plus first and second inversions, as slash chords | all four | yes | ×2.0 |

From L2, each quality the level asks comes equally often, spread evenly over
every root that spells it (and at L4 over root position and both
inversions). **Augmented triads are never inverted**: the triad is
symmetric, so an inverted one (E G♯ C) reads as another augmented triad
respelled, and a reader cannot tell the root from the notes.

### Spelling

Triads are spelled by letter from the root (a third two letters up, a fifth
four), so A minor is A C E and A♭ minor is A♭ C♭ E♭. The app's pitches carry
one accidental at most, and the drill never asks a triad that would need a
double sharp or flat: no D♯ or A♯ major, no G♭ minor, no D♭, E♭, G♭ or A♭
diminished, no augmented triad on C♯, D♯, F♯, G♯, A♯ or B. Roots are the
pad's keys in either spelling (17 names: no E♯, B♯, C♭ or F♭ root, which the
pad cannot show). That leaves 15 major, 16 minor, 13 diminished and 11
augmented triads; tones like E♯ (C♯ major) and C♭ (A♭ minor) appear as
written. `drills/chords/theory.ts`, tested over every root and quality.

### Voicing

The bass sits between C4 and B4; when the chord would climb above the staff's
top line (an inversion on a B: G/B), it drops an octave (B3 D4 G4). So no
chord is drawn above the staff, and since the notation is cropped to its ink
and pinned to the top of a fixed frame, the staff lines never move between
questions.

### Generator rules

- Never the same chord (root, quality, inversion) twice in a row.
- The root is always a key of the pad in its spelling, exactly once; its
  quality is always a live chip. Tested exhaustively over every chord of
  every level, plus 1 500-question runs per level.

## Bậc La Mã (Roman numeral mode, levels 5-7)

Setup's **Cách hỏi** switches between **Gọi tên** (default) and **Bậc La Mã**.
In Roman numeral mode the key is named over the staff ("Giọng Sol trưởng"),
its key signature is drawn, and one of its diatonic triads sits on the staff
in root position. The reader taps its numeral on seven chips, in scale order:

- major: I ii iii IV V vi vii°
- minor: i ii° III iv V VI vii°, with V and vii° from the **harmonic minor**
  (the raised seventh is drawn as an accidental; III keeps the natural
  seventh).

The key is named because a signature alone does not say major or minor.
The answer shows as "V · D · Re trưởng".

| Level | Keys | Weight |
|---|---|---|
| L5 La Mã · 2 dấu | C G D F B♭ (major, up to 2 sharps or flats) | ×1.2 |
| L6 La Mã · 4 dấu | adds A E E♭ A♭ (up to 4) | ×1.5 |
| L7 La Mã · giọng thứ | adds the minor keys up to 4: a e b f♯ c♯ d g c f | ×1.8 |

In setup, under **Giọng**, the three cards read **Đến 2 dấu**, **Đến 4 dấu** and
**Giọng thứ** (`card.N` strings): the mode is picked just above, so "La Mã"
is not repeated where a 320 px card has no room for it. The level names
above stay for the result screen and Luyện, where the mode is not shown.

A key holds for `CHORD_ROMAN_KEY_BLOCK` (4) questions, then moves to another
of the level's keys; within a key the same degree never comes twice running.

**Why levels 5-7 and not the same 1-3 with a mode switch:** bests, week
averages and Luyện's level stat are keyed on drill and level only
(`getBest(drill, level)`), so Roman numeral levels must be distinct numbers
or a Roman session would compare against a naming best. The `mode` option is
still saved (it drives setup's toggle) and is a preset option, so a lesson
can write `{ drill: 'chords', level: 5, durationSec: 60, mode: 'roman' }`.
`sessionLevel` resolves the two: a level of 5-7 is always Roman; `mode:
'roman'` with a level of 1-4 runs the Roman level in the same place
(2 → 6). Switching mode in setup keeps the place the same way. Lessons
should write levels 5-7 for Roman numerals so the practice tag names the
right level.

## Nghe (listening)

Setup's **Nghe** group has one switch, **Nghe hợp âm sau khi trả lời**, on by
default (`listen` in `settings.drills.chords`). After a right answer the
chord plays (1.1 s); after a miss the chord the reader named plays first
(root position, its root as close as possible to the question's), then the
right one 0.9 s later, so the difference is heard. Pausing silences it. It is
the reader's own setting: presets never change it. Tunables `CHORD_HOLD_SEC`,
`CHORD_MISS_GAP_SEC`.

## Computer keys

A S D F G H J and W E T Y U for the root (as Đọc nốt), 1-4 for the quality,
1-7 for a numeral. Esc pauses.

## Session, score, pause

Shared with the other drills: a timed session of its own length (default
**2 min**: reading a chord and tapping twice takes longer than naming a
note), `practiceScore` = pace × 10 × level weight × accuracy × endurance,
the answer clock from the moment the chord appears to the second tap, bests
and week averages per level (`getBest('chords', level)`), ✕ / Esc / leaving
pauses, ending early records a `partial` session, a running session
survives a page load (`keepLiveSession`; a root picked and waiting for its
quality is kept). The result screen lists the chords missed on small staves
(`MissedChords`), with the symbol (or numeral and symbol) and the pick.

## Code

| Piece | Where |
|---|---|
| Spelling, voicing, symbols, keys and numerals | `drills/chords/theory.ts` |
| Level pools, questions, answer check, sounds | `drills/chords/generator.ts` |
| Words for chords, picks and keys | `drills/chords/wording.ts` |
| Registry entry (levels, defaults, `sessionLevel`), strings | `drills/chords/drill.ts`, `drills/chords/strings.ts` |
| Session state | `drills/chords/store.ts` |
| Quality and numeral chips, verdict line | `components/molecules/AnswerChips`, `ChordVerdict` |
| Question staff, missed chords | `components/organisms/ChordStage`, `MissedChords` (both draw through the core `NoteStaff`) |
| Tunables | `config/constants.ts` `CHORD_*` |

Shared code touched: `AnswerPad` gained an optional `selected` key and
`PianoKey` a `selected` mark (blue, `aria-pressed`, label still hidden on a
bare keyboard), for the root tap that waits for its quality.

## Later

- An ear mode ("Nghe" before answering: name the chord by sound), once the
  reading version has been used.
- Bass clef and grand-staff voicings; seventh chords; figured-bass
  inversions in Roman numeral mode (I6, V6/4).
