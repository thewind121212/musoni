# Chapter 2 — Dấu hóa, nửa cung, nguyên cung / Accidentals and steps

Folder: `web/src/theory/content/ch02-accidentals-steps/` (chapter id `accidentals-steps`).
Book: Hutchinson, *Music Theory for the 21st-Century Classroom*, sections 1.4,
1.5 and 2.1, with the review modelled on the practice exercises 1.6 (the
enharmonic part) and 2.4 (the half and whole step part only; its scales and key
signatures belong to chapter 3).

## Lessons

| # | Lesson (id) | Book | Steps (checks) | Practice link |
|---|---|---|---|---|
| 2.1 | Dấu thăng và dấu giáng / Sharps and flats (`sharps-flats`) | 1.4 | 5 (3) | Đọc nốt, level 1 (Khóa Sol) with sharps and flats, 1 min |
| 2.2 | Thăng kép, giáng kép, dấu bình / Double sharps, double flats, naturals (`doubles-naturals`) | 1.4 | 6 (3) | none: Đọc nốt never shows a double sharp, double flat or natural |
| 2.3 | Nốt trùng âm / Enharmonic notes (`enharmonic`) | 1.5 | 6 (3) | none: Đọc nốt spells its pad like the printed note, so it never asks the other name |
| 2.4 | Nửa cung và nguyên cung / Half steps and whole steps (`half-whole-steps`) | 2.1 | 6 (3) | none: Quãng level 1 asks sizes 2 to 8 (chapter 5); no drill asks half or whole step alone |
| 2 | Ôn chương 2 / Chapter 2 review (`review`) | 1.6, 2.4 | 8 checks | Đọc nốt, level 4 (Cả hai) with sharps and flats, 1 min |

What each teaches:

1. **Sharps and flats**: an accidental is a sign before a note that raises or
   lowers it; the sharp raises a half step (the very next key right), the flat
   lowers one (the very next key left); the sign sits before the note, on its
   line or space. Checks: name a treble F♯ and B♭; tap A♭ on a pad without names.
2. **Double sharps, double flats, naturals**: two half steps up or down (F𝄪 on
   G's key, B𝄫 on A's); an accidental lasts to the end of the measure and a
   natural cancels it (and a key signature's, in a later chapter). Checks: the
   key of C𝄪; the last note of C♯ D C♮; which sign lowers two half steps.
3. **Enharmonic notes**: C♯4 and D♭4 are one key written two ways; every black
   key's two names; white keys too (B♯ = C, F♭ = E, C𝄪 = D). Checks: the other
   name of E♭; the key of F♭; which note is enharmonic with F.
4. **Half steps and whole steps**: a half step is from one note to the next
   nearest note; E–F and B–C are half steps between white keys; a whole step is
   two half steps, skipping one key (a sharp is a half step, a double sharp a
   whole step). Checks: a half step above E; B♭–C; tap a half step below C.
5. **Review**: E♭4 in treble, F♯3 in bass, the other name of G♯, the key of B♯,
   a natural after a flat, B–C, a whole step above D, the enharmonic C𝄪 for D:
   five on the pad, three by choices.

All examples are our own (single notes, pairs, one short measure); no music or
figures from the book.

## Left out, and why

- The book's figures (G♭ G G♯, C♯ / D♭, the half and whole step keyboard): drawn
  again with our own staff and keys blocks, not copied.
- "An accidental lasts to the end of the measure" is not in 1.4's text, which
  only says the natural cancels earlier accidentals in a measure; one sentence
  of it is needed to make that make sense.
- Finding two enharmonic names per note (exercise 1.6.3, like G𝄫 and E♯ for F):
  asked one name at a time, by choices, since the pad has no double sharps or
  flats and no E♯, B♯, C♭ or F♭ keys.
- Writing scales from the W W H W W W H pattern (exercise 2.4.1) and the key
  signature exercises: chapter 3 (scales and keys).
- Half steps "chromatic vs diatonic" (C–C♯ vs C–D♭): not in 2.1; it comes with
  intervals (chapter 5, minor 2nd vs augmented unison).

## Source notes

The pages were fetched and their text read in full (1.4 `Accidentals.html`, 1.5
`EnharmonicNotes.html`, 2.1 `HalfStepsAndWholeSteps.html`, 1.6
`BasicConceptsPracticeExercises.html`, 2.4 `MajorKeysPracticeExercises.html`).
All three sections are short (a definition list and one figure each), so the
lessons follow them closely and add only the examples and checks. Book order is
kept: the sharp is defined by the half step (as in 1.4) before 2.1 defines the
half step itself, so lesson 1 gives the plain meaning (the very next key) and
lesson 4 returns to it.

## For later chapters

- Lesson text prints a double sharp or flat as `##` / `bb` (`pitchLabel` in
  `core/lesson/text.ts`), while the staff draws 𝄪 / 𝄫.
- A practice link for half and whole steps would need a drill or level that
  asks them (Quãng's level 1 asks all sizes); a framework/drill change, out of
  scope for a chapter PR.
