# Drill — Hóa biểu (Key signatures)

Read a key signature and name its key. A signature with no notes is shown on
the staff, the question names the mode ("Giọng trưởng nào?", at level 4
sometimes "Giọng thứ nào?"), and the reader taps the key's home note (tonic)
on the 12-key piano pad. Trains chapters 3 and 4 of the theory lessons.

Route `/train/key-sig`, module `drills/key-sig`, store `useKeySigStore`,
registry entry `drills/key-sig/drill.ts` (group `read`, order 20, icon `#`,
amber action colour). Opens on Luyện when the lesson
`major-scales-keys/key-signatures` is finished (`unlockedBy`); until that lesson
is written it is reached from "Xem tất cả" and stays open once played.
Proposal: project files `theory/drills-proposal.md`; approved mockup
`screenshots/theory-drills/2-key-signatures.png`.

## One question

1. **Ask**: "Giọng **trưởng** nào?" / "Which **major** key?", the mode word in
   the accent colour (the one word that changes at level 4).
2. **Staff**: the clef and the key signature, nothing else
   (`SignatureStaff`, drawn by the core `NoteStaff` with no notes, so VexFlow
   places each sharp and flat for the clef).
3. **Answer**: tap the tonic on the pad (or its computer key, `A S D F G H J`
   / `W E T Y U`). One answer per question.
4. **Verdict** under the staff, green with a check or red with a cross, naming
   the key and the rule that finds it (`rule.ts`):

   | Signature | Line (vi / en) |
   |---|---|
   | none | "Do trưởng: không dấu" / "C major: no sharps or flats" |
   | one flat | "Fa trưởng: một giáng" / "F major: one flat" |
   | sharps | "La trưởng: 3 thăng, thăng cuối Sol# + nửa cung" / "A major: 3 sharps, last sharp G# + half step" |
   | two flats or more | "Mib trưởng: 3 giáng, giáng áp chót Mib" / "Eb major: 3 flats, second-to-last flat Eb" |
   | a minor key | "Fa# thứ: 3 thăng như La trưởng, xuống quãng 3 thứ" / "F# minor: 3 sharps like A major, down a minor third" |

   The pad marks the right key green and a wrong pick red.
5. **Sound** (with the Sound setting on): a right answer plays the key's home
   chord (major or minor triad from the tonic at octave 4); a miss plays the
   picked note where its key sits on the pad (C4 to B4, so a renamed Si# sounds
   C4 and Dob B4), then the chord 0.6 s later.
6. Next question after **0.9 s** (right) or **2.6 s** (wrong): longer than
   note reading's, since the rule is worth a glance when right and a read
   when wrong.

## The pad, spelled the key's way

The same fixed 12-key pad as the other drills (Piano or Ô layout, names on
keys on or off, the reader's naming). Its spelling follows the signature
(`signatures.keyPad`):

- **Black keys** are flats for a flat signature (Reb Mib Solb Lab Sib) and
  sharps otherwise (C major and A minor included).
- **A signature note that lands on a white key renames it**: Cb (on B) in six
  and seven flats, Fb (on E) in seven flats, E# (on F) in six and seven
  sharps, B# (on C) in seven sharps. So every tonic is on the pad under its
  own name: Cb major is answered on "Dob" where Si sits, Gb major on "Solb",
  F# major on "Fa#", C# major on "Do#".
- E#, B#, Fb are never tonics of the 15 standard keys (nor of their relative
  minors, whose tonics are A E B F# C# G# D# A# and D G C F Bb Eb Ab): they
  appear only as renamed white keys, because the signature shows them. The
  renaming depends on the signature alone, not on the mode asked, so it gives
  nothing away (Gb major, Eb minor, Cb major and Ab minor all show Dob).

Every name is derived from the order of sharps (F C G D A E B) and flats (its
reverse): the major tonic moves four letters per sharp (a fifth up) and back
four per flat from C, the relative minor sits five letters up (a minor third
down), and the tonic takes whatever accidental the signature gives its letter.
`signatures.test.ts` checks this against the standard table of all 15 keys,
and that every pad holds both tonics exactly once, twelve distinct pitches and
twelve distinct names, and all seven notes of the key under their own names.

## Levels

| Level | Signatures | Clef | Asks | Weight |
|---|---|---|---|---|
| L1 Tới 2 dấu / Up to 2 | up to 2 sharps or flats (C G D F Bb) | treble | major | ×1.0 |
| L2 Tới 4 dấu / Up to 4 | up to 4 (adds A E Eb Ab) | treble | major | ×1.3 |
| L3 15 giọng / 15 keys | all 15 (up to 7 sharps or flats) | treble or bass | major | ×1.6 |
| L4 Trưởng & thứ / Major & minor | all 15 | treble or bass | major or relative minor, 50/50 | ×2.0 |

Signatures, clefs and modes are drawn uniformly. **The same signature never
comes twice in a row** (in either mode or clef): the generator removes the
last one from the pool, so even a stuck random source cannot repeat it.
Tunables: `KEY_SIG_LEVELS`, `KEY_SIG_MINOR_CHANCE` in `config/constants.ts`.

Setup shows each level as a small staff with one of its signatures (two
sharps; four flats; seven sharps in the bass clef; three flats).

## Session, score, pause

As in the other drills (`drill-note-identification.md`):

- A timed session of its own length (`settings.drills["key-sig"].durationSec`,
  default **1 min**), same length choices and Other stepper. No options beyond
  level and length; a lesson preset sets those two (`presetOptions` none).
- `practiceScore` = correct per minute × 10 × level weight × accuracy ×
  endurance. Answer time runs from when the question appears.
- Bests and week averages per drill and level (`getBest('key-sig', level)`);
  sessions record `drill: 'key-sig'`, `accidentals: true` (black keys are
  answers at every level) and the level's weight.
- ✕ / Esc pause (or leave, before any answer), leaving the app or route
  pauses, back goes where the session started, ending early records a
  `partial` session, and a running session survives a page load
  (`keepLiveSession`).
- Result: the shared summary (score, difficulty and endurance chips, the four
  figures, week-average bar), then **Giọng cần ôn** / **Keys to review**: each
  missed signature on a small staff with its key ("Fa# thứ") and the pick
  ("bạn chọn La"), the same miss counted once (×2), up to six
  (`MissedKeys`).

The run screen fits 320×568, 375×812, 390×844 and 1280×800 without scrolling;
the verdict takes two lines on phones and has a fixed-height slot so nothing
moves when it appears.

## Code

| Piece | Where |
|---|---|
| Signatures, tonics, pad spelling, rules | `drills/key-sig/signatures.ts` |
| Question, home chord, answer sound | `drills/key-sig/generator.ts` |
| Key names and the verdict line | `drills/key-sig/rule.ts` |
| Registry entry, strings | `drills/key-sig/drill.ts`, `drills/key-sig/strings.ts` |
| Session state | `drills/key-sig/store.ts` (`useKeySigStore`) |
| Staff with a signature only | `components/organisms/SignatureStaff` (core `NoteStaff`, which draws a staff with no notes since this drill) |
| Missed keys on the result | `components/organisms/MissedKeys` |
| Verdict | `components/molecules/RuleLine` |
| Pages | `pages/KeySigDrill`, `SetupPhase`, `RunPhase`, `ResultPhase` |
| Tunables | `config/constants.ts` `KEY_SIG_*` |

## Not yet

- Sound and timing want a human ear: the chord after a miss and the 0.9 / 2.6 s
  holds (`KEY_SIG_*` in config).
- The shared result figure "Mỗi nốt" / "Per note" reads oddly for keys; it is
  the core `SessionStats` label, left as is.
- A "write the signature" mode (tap the sharps or flats for a named key) could
  follow once this one is used.
