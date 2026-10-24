# Chapter 7 — Hợp âm ba / Triads

Folder: `web/src/theory/content/ch07-triads/` (chapter id `triads`).
Book: Hutchinson, *Music Theory for the 21st-Century Classroom*, chapter 6
(sections 6.1-6.6), with the review modelled on the practice exercises (6.7).
App chapters 1-6 (pitch and staff, accidentals and steps, major and minor keys,
rhythm, intervals) come first; Roman numerals are app chapter 8.

## Lessons

| # | Lesson (id) | Book | Steps (checks) | Practice link |
|---|---|---|---|---|
| 7.1 | Hợp âm ba / Triads (`triads-intro`) | 6.1, 6.6 | 7 (3) | Hợp âm, level 1 (Giọng Do), 2 min |
| 7.2 | Ký hiệu hợp âm / Lead-sheet symbols (`lead-sheet-symbols`) | 6.2 | 6 (3) | Hợp âm, level 3 (Giảm, tăng), 2 min |
| 7.3 | Thế đảo và hợp âm gạch chéo / Inversions and slash chords (`inversions`) | 6.3 | 6 (3) | Hợp âm, level 4 (Thế đảo), 1 min |
| 7.4 | Phân tích hợp âm / Analyzing chords (`analyzing-chords`) | 6.4 | 7 (4) | Hợp âm, level 4 (Thế đảo), 2 min |
| 7.5 | Hợp âm sus / Sus chords (`sus-chords`) | 6.5, 6.6 | 7 (3) | none: the chords drill asks only the four triad qualities |
| 7 | Ôn chương 7 / Chapter 7 review (`review`) | 6.7 | 8 checks | Hợp âm, level 4 (Thế đảo), 2 min |

All presets are the drill's naming levels (1-4), so none sets `mode`: a
preset that leaves it out runs on the drill's default, `name`, whatever the
reader's own setting. The Roman numeral levels (5-7) are left for chapter 8.
`docs/fe/drill-chords.md` names `triads/triads-intro` as the lesson that links
to the drill; that is lesson 7.1.

What each teaches:

1. **Triads**: a chord; a triad as three notes stacked in consecutive thirds
   (three lines or three spaces in a row); root, third and fifth; the quality
   from the two thirds (major M3 + m3, minor m3 + M3, diminished m3 + m3 and its
   diminished fifth, augmented M3 + M3 and its augmented fifth); major and minor
   common, diminished less so, augmented rare. Checks: the root of A C E on the
   pad; D F A major or minor; the quality of F♯ A C.
2. **Lead-sheet symbols**: a shorthand from popular music and jazz giving root
   and quality, voicing left to the player; always letters, whatever the
   reader's naming; F, Gm, D°, C+; the root's accidental after the letter (F♯m,
   B♭), the third's and fifth's never shown. Checks: the symbol of A C E; the
   notes of Gm; the symbol of E♭ G B.
3. **Inversions and slash chords**: bass note against root; root position,
   first and second inversion; slash chords (triad before the slash, bass after),
   with a bass outside the chord (C/F♯) mentioned. Checks: the position of
   A D F; the symbol of G C E; the root of Am/C on the pad.
4. **Analyzing chords**: the book's three questions (root, quality, bass) on a
   four-note spread chord; restack on three lines in a row (ledger lines if
   needed) or three spaces; measure the thirds; check the bass. Worked: D A D F
   is Dm. Checks, on G B♭ E G: the root (pad), the quality, the full symbol
   (E°/G); then C A C F as F/C.
5. **Sus chords**: the third replaced; sus4 (a perfect 4th, also written just
   "sus") and sus2 (a major 2nd), both keeping the perfect 5th; then the
   summary table of 6.6 as half-step pairs. Checks: the notes of Gsus4; the
   symbol of D E A; which chord is 5 + 2 half steps.
6. **Review**: C♯°, Asus4, A♭+, the root of F♯ A D (pad), A/E, the notes of Em,
   the right spelling of F♯ major (A♯ not B♭, after the book's exercise 5), and
   a triad heard as major or minor: one on the pad, seven by choices.

All examples are our own chords; no music or figures from the book.

## Conventions this chapter sets

- **Lead-sheet symbols are written in letters** (`Gm`, `F♯m`, `E°/G`,
  `Csus4`) in text, choices and staff labels, as plain text with ♯ ♭ ° +, the
  way the chords drill prints them. Note names around them stay pitch tokens
  (`{G}` thứ), so "Gm là {G} thứ" reads "Gm là Sol thứ" in solfège. Lesson 7.2
  says so in a tip ("even if you name notes Do Re Mi"), the naming-system
  exception of port guide §5. Later chord chapters should do the same.
- Staff labels `1`, `3`, `5` mark root, third and fifth (and, in 7.3, which
  chord tone is at the bottom), since labels are one string for both languages.

## Left out, and why

- The book's pop-song examples (6.2 with guitar tablature, 6.5's two songs):
  copyrighted; replaced by our own chords.
- "Harmony" as another word for chord (6.1): one more term with a second
  meaning (chord progressions) that the lesson does not need.
- Grand-staff chord examples (6.4): a lesson staff draws a chord on one staff
  only (`NoteStaff` puts the whole chord on the staff of its lowest note), so
  the spread chords sit within the treble staff instead.
- Writing triads (exercises 2 and 4): there is no way to answer by writing
  notes; checks ask for spellings by choice instead.
- Inverting sus chords and the larger sus chords (C9sus and the like): the book
  defers them too.
- Diminished and augmented roots that need double accidentals: the app's
  pitches carry one accidental at most.

## Source notes

The pages were fetched and their text read in full: 6.1
`TriadsIntroduction.html`, 6.2 `LeadSheetSymbols.html`, 6.3
`InvertedTriads.html`, 6.4 `AnalyzingChords.html`, 6.5 `SimpleSusChords.html`,
6.6 `SummaryOfTriadConstruction.html`, 6.7 `TriadsPracticeExercises.html`.
Definitions, order and terms follow the text; the figures are images and were
not used. The book's own exercise answers were not copied; the review uses
other chords of the same kinds.
