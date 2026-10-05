# Chapter 1 — Cao độ & khuông nhạc / Pitch and the staff

Folder: `web/src/theory/content/ch01-pitch-staff/` (chapter id `pitch-staff`).
The reference chapter: built with the framework in PR 0, for chapter PRs to copy.
Book: Hutchinson, *Music Theory for the 21st-Century Classroom*, sections 1.1-1.3,
with the review modelled on the practice exercises (1.6). Screenshots of every
step: project files `screenshots/theory-ch01/steps/`.

## Lessons

| # | Lesson (id) | Book | Steps (checks) | Practice link |
|---|---|---|---|---|
| 1.1 | Cao độ và tên nốt / Pitch and note names (`pitch-names`) | 1.1, 1.3 | 6 (3) | none: the end screen leads with "Bài tiếp" and offers the review |
| 1.2 | Khuông nhạc và khóa / The staff and clefs (`staff-clefs`) | 1.2 | 7 (3) | Đọc nốt, level 1 (Khóa Sol), 1 min |
| 1.3 | Khóa Do / C clefs (`c-clefs`) | 1.3 | 6 (3) | none: Đọc nốt has no C clef level |
| 1.4 | Quãng tám và Do giữa / Octaves and middle C (`octaves`) | 1.3 | 6 (3) | Đọc nốt, level 2 (Khóa Sol +, A3-C6), 1 min |
| 1 | Ôn chương 1 / Chapter 1 review (`review`) | 1.6 | 7 checks | Đọc nốt, level 4 (Cả hai: both clefs), 1 min |

What each teaches:

1. **Pitch and note names**: high and low (88 keys, right is higher; a grand
   staff low to high), the seven names repeating after B, finding C and F by the
   groups of two and three black keys. Checks: name a filled key; tap the key left
   of the three black keys (pad without names); which way is higher.
2. **The staff and clefs**: five lines and four spaces, counted from the bottom;
   the treble clef marks G4 on line 2; the bass clef marks F3 on line 4; ledger
   lines; the grand staff. Checks: line or space; name a treble note; name a bass
   note.
3. **C clefs**: a C clef points to C4's line; alto (line 3, viola) and tenor
   (line 4, cello, bassoon, trombone). Checks: name an alto note; where C4 is in
   tenor; name a tenor note.
4. **Octaves and middle C**: the octave, octave registers changing at C (B3 then
   C4), middle C as C4 on a ledger line in both clefs. Checks: the note above B4;
   C5 in treble; C3 in bass.
5. **Review**: treble F5 and A5, bass A2 and C4, alto E4, a filled key, and how
   many lines a staff has: four answered on the pad, three by choices.

All examples are our own (single notes, scales, octaves); no music or figures
from the book.

## Left out, and why

- The book's mnemonics for line and space names: they are English acrostics
  that do not carry into Vietnamese or solfège; lessons count from the clef's
  note instead.
- Octave registers below C1 and the full 88-key register map: one sentence and
  the C3-C4-C5 picture carry the idea on a phone.
- Soprano, mezzo-soprano and baritone C clefs: rare; alto and tenor are the ones
  in use.
- Notation history and handwriting advice: asides, not needed for reading.

## Not checked against the source

The book pages could only be read through a summarising fetch (it would not
return the text itself), so the wording and order were not compared line by line
with the original:

- 1.1 Pitch (`Pitch.html`), 1.2 Notation (`Notation.html`), 1.3 Octave registers
  (`OctaveRegisters.html`) and 1.6 Practice exercises
  (`BasicConceptsPracticeExercises.html`): concepts and terms were taken from the
  summaries and checked against standard theory (two summary errors were caught
  that way: the piano's lowest note is A0, and the treble clef's G is on the
  second line from the bottom). Worth a read-through against the pages by a human.
- The colophon (`frontmatter-3.html`) was read for the licence notice
  (©2017 Robert Hutchinson, GFDL 1.2 or any later version, no Invariant Sections,
  no cover texts), which `NOTICE.md` and the About page quote.
- 1.4 and 1.5 (accidentals, steps) belong to chapter 2 and were not used here.

## For later chapters

- A C clef level in Đọc nốt would give lesson 1.3 a practice link; that is a
  drill feature, out of scope for a chapter PR.
- Lesson 1.1 has no practice link: nothing in the drills trains finding a
  named key without the staff yet.
