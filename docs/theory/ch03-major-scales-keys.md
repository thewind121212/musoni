# Chapter 3 — Gam trưởng và hóa biểu / Major scales and key signatures

Folder: `web/src/theory/content/ch03-major-scales-keys/` (chapter id `major-scales-keys`).
Book: Hutchinson, *Music Theory for the 21st-Century Classroom*, sections 2.2 and
2.3 (with 2.3.1), the review modelled on the practice exercises (2.4). Half and
whole steps (2.1) are taught in chapter 2; this chapter builds on them.

## Lessons

| # | Lesson (id) | Book | Steps (checks) | Practice link |
|---|---|---|---|---|
| 3.1 | Gam trưởng / The major scale (`major-scale`) | 2.2 | 7 (3) | Nghe & Đàn, level 3 (full scale in 5 keys), 1 min |
| 3.2 | Hóa biểu giọng trưởng / Major key signatures (`key-signatures`) | 2.3 | 7 (3) | Hóa biểu, level 1 (up to 2 sharps or flats), 1 min |
| 3.3 | Vòng quãng năm / The circle of fifths (`circle-of-fifths`) | 2.3 | 7 (3) | Hóa biểu, level 2 (up to 4), 1 min |
| 3.4 | Nhận ra giọng từ hóa biểu / Identifying key signatures (`identifying-keys`) | 2.3.1 | 6 (4) | Hóa biểu, level 3 (15 keys, treble and bass), 1 min |
| 3 | Ôn chương 3 / Chapter 3 review (`review`) | 2.4 | 8 checks | Hóa biểu, level 3, 2 min |

`key-signatures` is the lesson `docs/fe/drill-key-sig.md` names
(`major-scales-keys/key-signatures`).

What each teaches:

1. **The major scale**: a scale runs in letter order from the tonic up an
   octave; the pattern W–W–H–W–W–W–H (labels 1 and ½ under the notes); two
   matching W–W–H tetrachords joined by a whole step; D major needs F♯ and C♯,
   and each letter appears once (D E F♯ G, not D E G♭ G). Checks: where the half
   steps fall; note 7 of G major (F♯ on the pad); why D E G♭ G is wrong.
2. **Major key signatures**: a key signature after the clef on every line saves
   writing the key's sharps or flats each time (the same tune with and without
   one); G and D major (sharps), F and B♭ major (flats); 15 signatures; the order
   of sharps F C G D A E B and of flats, its reverse. Checks: the key with one
   sharp; the third sharp; the fourth flat. G, D, F, B♭ and C are exactly the
   keys of Hóa biểu level 1.
3. **The circle of fifths**: a fifth by counting five letters; clockwise (up a
   fifth) one more sharp, counterclockwise (down a fifth) one more flat, tonics
   on a staff labelled with their sharp or flat count; the enharmonic keys B/C♭,
   F♯/G♭, C♯/D♭. Checks: the key with three sharps; with three flats; G♭ major's
   enharmonic twin.
4. **Identifying key signatures**: sharps, a half step up from the last sharp;
   flats, the second-to-last flat; one flat is F major, none is C. Checks: E,
   E♭, F (bass clef) and B major signatures, answered on the pad.
5. **Review**: the scale pattern, note 3 of A major and note 4 of D♭ major (the
   book's exercise 1 scales), signatures of B♭ (bass), A and C♭ (choices, with B
   and G♭ as traps), how many major signatures, the key with four sharps.

All examples are our own (scales, a short tune of our own in D major, single
signatures); no music or figures from the book. The book's "Twinkle, Twinkle"
example was not used.

## Left out, and why

- The book's English mnemonics for the order of sharps and flats ("Fast Cars Go
  Dangerously…", "BEAD + GCF", "Father Charles…"): acrostics that do not carry
  into Vietnamese or solfège; the lessons give the order itself and its reverse.
- A drawn circle of fifths: the framework has no diagram block, so the circle is
  shown as two rows of tonics labelled with their sharp or flat counts.
- Writing scales and key signatures (exercises 2.4.1 and 2.4.3): the app has no
  way to write notes or place accidentals on a staff; the review asks single
  scale notes and key names instead.
- Minor keys and relative keys: chapter 4 (book 2.5 onward).

## Framework notes

- A source section must look like `2.3`, so lesson 3.4 cites `2.3` with the
  URL anchor of the subsection (`MajorKeySignatures.html#MajorKeySignatures-3`).
- A C♭ major answer is not on the 12-key pad (C♭ is not a pad name), so that
  check uses choices.

## Source notes

Read from the book pages themselves (2.2 `TheMajorScale.html`, 2.3
`MajorKeySignatures.html` with 2.3.1, 2.4 `MajorKeysPracticeExercises.html`) and
compared step by step: concepts, order and terms follow the book; the circle of
fifths (book 2.3, before 2.3.1) comes before the identifying rules, as in the
book. The book defines the fifth only by counting letters (C=1 … G=5); lesson
3.3 does the same and leaves interval quality to chapter 5.
