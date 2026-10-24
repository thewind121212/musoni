# Chapter 6 — Quãng / Intervals

Folder: `web/src/theory/content/ch06-intervals/` (chapter id `intervals`).
Book: Hutchinson, *Music Theory for the 21st-Century Classroom*, chapter 5,
sections 5.1-5.5, with the review modelled on the practice exercises (5.6).
Every lesson practises on the Quãng drill (`intervals`), one level per idea
(`docs/fe/drill-intervals.md`).

## Lessons

| # | Lesson (id) | Book | Steps (checks) | Practice link |
|---|---|---|---|---|
| 6.1 | Quãng và cỡ quãng / Intervals and their size (`interval-size`) | 5.1 | 6 (3) | Quãng, level 1 (Cỡ quãng), 1 min |
| 6.2 | Quãng đúng, trưởng và thứ / Perfect, major and minor (`interval-quality`) | 5.1 | 6 (3) | Quãng, level 2 (Trưởng, thứ, đúng), 1 min |
| 6.3 | Nhận ra quãng / Identifying intervals (`identify-intervals`) | 5.2 | 6 (3) | Quãng, level 3 (Có dấu hóa), 1 min |
| 6.4 | Viết quãng và đảo quãng / Writing and inverting intervals (`write-invert`) | 5.3, 5.4 | 6 (3) | Quãng, level 3 (Có dấu hóa), 2 min |
| 6.5 | Quãng tăng và quãng giảm / Augmented and diminished intervals (`augmented-diminished`) | 5.5, 5.2 | 7 (3) | Quãng, level 4 (Tăng và giảm), 1 min |
| 6 | Ôn chương 6 / Chapter 6 review (`review`) | 5.6 | 8 checks | Quãng, level 4 (Tăng và giảm), 2 min |

What each teaches:

1. **Intervals and their size**: an interval is the distance between two
   pitches; harmonic (together, stacked) and melodic (in turn); the name has a
   quality and a number; the numeric size counts letter names, both ends
   included (unison 1, octave 8); odd sizes go line to line or space to space,
   even sizes line to space. Checks: the size of a melodic 5th, a harmonic 6th
   and a melodic 7th.
2. **Perfect, major and minor**: from the tonic up, the major scale gives only
   perfect and major intervals; unison, 4th, 5th and octave are perfect, never
   major or minor; 2nd, 3rd, 6th and 7th are major or minor, never perfect;
   perfect intervals pair naturals, sharps or flats, except B and F; minor is a
   half step smaller than major; the drill's short forms (3T, 3t, 5Đ / M3, m3,
   P5). Checks: which size can be perfect; C-A♭ (m6); the m7 above C4 (pad, B♭).
3. **Identifying intervals** (the book's two methods): the lower note as the
   tonic of a major scale; an accidental on the lower note (cover it, find the
   interval, put it back); counting half steps (the 1-12 table, 6 = the
   tritone). Checks: A-F (m6); F♯-D (m6); D-C counted on the keys (m7).
4. **Writing and inverting intervals**: the note above from the major scale or
   by half steps (the book's m6 above A); inversion (the lower note moves up an
   octave, numbers add to 9, major and minor swap, perfect stays); the note
   below by whole and half steps for small intervals, or by inverting for larger
   ones. Checks: the M3 above E4 (pad, G♯); M2 inverts to m7; the M6 below F4
   (pad, A♭).
5. **Augmented and diminished**: a half step larger than perfect or major, a
   half step smaller than perfect or minor; any size can be either; the
   narrow-to-wide continuum (d m M A; d P A), heard on C-6ths; the + and °
   symbols; the tritone (F-B an A4, B-F a d5, 6 half steps, enharmonic);
   augmented and diminished swap when inverted. Checks: C-F♯ (A4, not d5);
   D-A♭ (d5, not A4); A6 inverts to d3.
6. **Review**: melodic or harmonic by ear; a 6th's size; D-B (M6); E♭-B♭ in
   bass (P5); F-B (A4); the m3 above G4 (pad, B♭); the m6 below D5 (pad, F♯);
   m7 inverts to M2. Two answered on the pad (the "write" exercises), six
   by choices.

The book's "write the interval" exercises (5.3, 5.6 nos. 3-4) cannot be
written in the app, so they became "which note is a … above/below …" checks
answered on the 12-key pad (with a keys block showing the given note, not a
staff: a lone staff note would turn green on the answer and draw the pick
beside it, which reads as if the given note were the answer).

All examples are our own (single intervals on C, D, E, F, A); the book's
sections 5.1-5.5 quote no music. No figures from the book.

## Left out, and why

- **Compound intervals** (larger than an octave) and descending melodic
  intervals: the book does not cover them in 5.1-5.5, and the drill asks
  neither.
- **The unison on the staff**: two whole notes on one line draw as one; the
  unison is named in text only.
- **The book's inversion chart and the full "continuum" figure**: images; the
  rules are in the text (numbers add to 9, M↔m, P↔P, A↔d) and the continuum is
  shown on one size (6ths) and heard.
- **Doubly augmented and diminished intervals**: not in the book's sections.
- **"Write" answers spelled E♯, B♯, C♭, F♭ or with double accidentals** (the
  book's exercise 3 has an F♭): the pad has no such key, so the checks use
  answers the pad can hold.

## Framework gaps met

- **Staff labels are not localized**: one string per note for both languages,
  so interval names (M6 / 6T) cannot label notes. Lessons label sizes only
  (`'3'`, `'6'`) and name the quality in text.
- **A key check for "the note above/below"** has no way to show the answer on
  a staff next to the given note after answering (the lone-note overlay assumes
  the staff note is the answer). The checks use a keys block instead.
- **A natural key answer gets a white-keys-only pad** (`padFor`), which gives
  away "no accidental". Write checks whose answer is natural (such as the m6
  below G or the P5 above B♭) were avoided; all five pad answers are black
  keys.

## Source notes

The pages were fetched and their text read (5.1 `IntervalsIntroduction.html`,
5.2 `HowToIdentifyIntervals.html`, 5.3 `HowToWriteIntervals.html`, 5.4
`InversionOfIntervals.html`, 5.5 `AugmentedAndDiminishedIntervals.html`, 5.6
`IntervalsPracticeExercises.html`). Most of each section is in figures; the
lessons follow the text's definitions, order and examples (the m6 above A, the
m6 that inverts to a M3, "cover up the accidental", the half-step table, the
tritone as A4 or d5, the + and ° symbols) and fill the figures' content (the
interval of each scale degree, the inversion chart) from standard theory.

- 5.1's "intervals in the major scale" and "perfect intervals are natural to
  natural ... except B and F" are in lesson 2; numeric size and the line/space
  rule in lesson 1.
- The tritone is defined in 5.2 (in the half-step table's note) and taught in
  lesson 5 with 5.5, so lesson 5 lists 5.2 as a second source.
- 5.4 introduces + and ° before 5.5; the app teaches them in lesson 5, where
  augmented and diminished are defined.

## Terms

Glossary terms used: quãng, quãng 2 … quãng 8, quãng đồng âm, tính chất quãng,
đúng / trưởng / thứ / tăng / giảm, quãng giai điệu / quãng hòa âm, đảo quãng,
nửa cung, nguyên cung, chủ âm, dấu hóa. Added by this chapter (rows for
`glossary.md`): **cỡ quãng** (numeric size, as in the drill's level 1),
**quãng ba cung** (tritone), **trùng âm** for intervals (enharmonic, as in
"nốt trùng âm").
