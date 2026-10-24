# Chapter 34 — Lý thuyết tập hợp / Set theory

Folder: `web/src/theory/content/ch34-set-theory/` (chapter id `set-theory`).
Book: Hutchinson, *Music Theory for the 21st-Century Classroom*, chapter 33
(sections 33.1-33.8), with the review modelled on the practice exercises (33.9).
App chapters 1-33 come first; this chapter leans on half steps (ch 2), intervals
and their inversion, and triads (C major as 0 4 7, B diminished, Eb major in
second inversion).

## Lessons

| # | Lesson (id) | Book | Steps (checks) | Practice link |
|---|---|---|---|---|
| 34.1 | Ký hiệu số nguyên / Integer notation (`integer-notation`) | 33.1 | 7 (3) | none |
| 34.2 | Dạng chuẩn / Normal form (`normal-form`) | 33.2 | 6 (3) | none |
| 34.3 | Dạng nguyên mẫu / Prime form (`prime-form`) | 33.3 | 7 (3) | none |
| 34.4 | Vectơ quãng và số Forte / Interval vectors and Forte numbers (`interval-vector`) | 33.4, 33.5, 33.6 | 7 (3) | none |
| 34.5 | Chuyển vị và phép đảo / Transposition and inversion (`transposition-inversion`) | 33.7, 33.8 | 6 (3) | none |
| 34 | Ôn chương 34 / Chapter 34 review (`review`) | 33.9 | 8 checks | none |

No drill trains pitch-class integers, normal or prime form, interval vectors
or Tn/TnI, so no lesson has `practice`; each end screen leads with "Bài tiếp".

What each teaches:

1. **Integer notation**: atonal music avoids traditional chords and scales, so
   intervals are its building blocks; set theory is the tool for it. Pitches as
   integers ({C} = 0 … {B} = 11, {C} {E} {G} = 0 4 7); enharmonic and octave
   equivalence, so each integer is a pitch class; pitch-class sets. Intervals as
   half-step counts (an augmented 5th and a minor 6th are both 8), modulo 12 like
   a clock (11 up to 2 is 3). Checks: the integer of {A}; pitch class 6 on the
   pad; 10 up to 1.
2. **Normal form**: the most compact ordering; ascending order without repeats;
   try each starting note and take the smallest first-to-last span; ties broken
   first-to-second-to-last (Rahn, as the book), then by the smaller first number;
   square brackets with commas. Worked: 11 2 9 2 3 → [9, 11, 2, 3]; ties on
   0 4 7 11 → [11, 0, 4, 7] and 0 1 6 7 → [0, 1, 6, 7]. Checks: [10, 0, 3];
   [11, 1, 6] (first tie rule); [1, 2, 7, 8] (complete tie).
3. **Prime form**: the essential form (like "major triad" for any inversion of
   E♭ major); always from 0; parentheses without commas, T and E for 10 and 11.
   Transpose the normal form to 0, invert (n → 12 − n), take its most compact
   ordering at 0, keep the one with the smaller second-to-last number. Worked:
   [7, 10, 11] → (034) vs (014) → (014). Then two different chords with prime
   form (014), and segmentation. Checks: [10, 0, 3] at 0; the prime form of
   [9, 10, 2]; writing 0 2 4 6 8 10 as (02468T).
4. **Interval vectors and Forte numbers**: interval class (shortest distance,
   largest ic6; a perfect 5th is ic5); the interval vector by measuring each note
   to the notes after it, six digits; Forte numbers (number of notes, place in
   the list) and the lists of set classes, with (037) = 3–11, 001110; Z-relations
   with 4–Z15 (0146) and 4–Z29 (0137), both 111111. Checks: the ic of 10; the
   vector of {B} {D} {F}; what Z-related sets share.
5. **Transposition and inversion**: Tn adds n modulo 12; TnI flips around {C}
   (T0I: n → 12 − n) then adds n, so [0, 4, 7] at T7I is [0, 3, 7] ({C} major to
   {C} minor); finding n by adding the first set to the second written backward.
   Checks: [2, 5, 9] at T4; [1, 2, 5] at T0I; [1, 3, 4] → [5, 6, 8] is T9I.
6. **Review**: pitch class 10 on the pad, the ic of {E}–{C}, a normal form with
   wrap-around, the prime form (027), the vector 111000, a Tn, finding n of a
   TnI, and what the Z means: one on the pad, seven by choices.

All sets are our own, chosen to cover the book's cases; every normal form,
prime form and vector was computed with a script implementing the Rahn method.

## Conventions this chapter sets

- **Sets are plain text**: normal form `[9, 11, 2, 3]`, prime form `(014)`,
  vectors `001110`, `Tn`, `TnI`, `ic3`, Forte numbers `4–Z15`. They are not note
  names, so they are never pitch tokens, also the `T` and `E` of prime forms.
- Staff labels are the pitch-class integers (`'0'`, `'4'`, `'11'`), so a set's
  numbers sit under its notes.
- Inversion is taught as n → 12 − n (0 stays 0) alongside the book's "flip
  around {C}" wording.

## Left out, and why

- The Webern example (Five Movements for String Quartet, op. 5 no. 3), and the
  book's analysis of it: 20th-century repertoire, and a score excerpt.
  Replaced by our own chords: two chords built from 8 + 3 half steps (34.1),
  and two chords with prime form (014) (34.3) in place of the book's finding
  that the opening chords share (014).
- History (Forte 1973, Rahn 1980, Straus) beyond naming Forte for his numbers,
  and the Forte-versus-Rahn footnotes: asides.
- The book's segmentation example with the cello note (prime forms (0124) and
  (0236)): it depends on the excerpt; segmentation is kept as a definition.
- The book's reordering of the inverted form only when the normal form had a
  tie: the lesson always takes the inverted set's most compact ordering, which
  gives the same result and is one rule fewer.
- The full lists of set classes (33.6): reference tables, not lesson content;
  the lesson cites a few rows (3–11, 4–Z15, 4–Z29). Complements are left out.
- The book's half-diminished worked example for interval vectors: replaced by
  {C} {E} {G} and {B} {D} {F}. (The book's prose gives that vector as 012011,
  its table as 012111; the table is right.)
- Writing sets on the staff and the larger exercise sets (five- and six-note
  sets, Forte lookups): no way to answer by writing, and the lists are not in
  the app; checks ask by choice instead.
- Straus's I_n name for TnI: one more name for the same operation.

## Source notes

The pages were fetched and their text read in full: 33.1
`SetTheorySection.html`, 33.2 `NormalForm.html`, 33.3 `PrimeForm.html`, 33.4
`IntervalVector.html`, 33.5 `ForteNumbers.html`, 33.6 `ListsOfSetClasses.html`,
33.7 `TranspositionTn.html`, 33.8 `InversionTnI.html`, 33.9
`Set-Theory-Practice-Exercises.html`. Definitions, order and terms follow the
text; the figures are images without alt text and were not used. The book's
own exercise sets and answers were not copied; the review uses other sets of the
same kinds.
