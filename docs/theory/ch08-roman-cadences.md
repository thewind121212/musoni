# Chapter 8 — Bậc La Mã và kết / Roman numerals and cadences

Folder: `web/src/theory/content/ch08-roman-cadences/` (chapter id `roman-cadences`).
Book: Hutchinson, *Music Theory for the 21st-Century Classroom*, sections 7.1-7.4,
with the review modelled on the practice exercises (7.5).

## Lessons

| # | Lesson (id) | Book | Steps (checks) | Practice link |
|---|---|---|---|---|
| 8.1 | Bậc La Mã / Roman numerals (`roman-numerals`) | 7.1 | 6 (3) | Hợp âm, level 5 (La Mã · 2 dấu), `mode: 'roman'`, 1 min |
| 8.2 | Hợp âm thuận giọng trưởng / Diatonic chords in major (`diatonic-major`) | 7.2 | 6 (3) | Hợp âm, level 6 (La Mã · 4 dấu), `mode: 'roman'`, 2 min |
| 8.3 | Hợp âm thuận giọng thứ / Diatonic chords in minor (`diatonic-minor`) | 7.3 | 6 (3) | Hợp âm, level 7 (La Mã · giọng thứ), `mode: 'roman'`, 2 min |
| 8.4 | Kết chính và kết phụ / Authentic and plagal cadences (`authentic-plagal`) | 7.4 | 6 (3) | none: no drill trains cadences |
| 8.5 | Kết lửng và kết đánh lừa / Half and deceptive cadences (`half-deceptive`) | 7.4 | 6 (3) | none: no drill trains cadences |
| 8 | Ôn chương 8 / Chapter 8 review (`review`) | 7.5 | 7 checks | Hợp âm, level 7, `mode: 'roman'`, 2 min |

What each teaches:

1. **Roman numerals**: a numeral names a chord by its root's scale degree in
   the key (I on 1, V on 5); numbers show the same pattern in every key and
   help transposition; uppercase major, lowercase minor, ° diminished, +
   augmented; inversions in the book's interim slash notation (V/3rd, V/5th;
   vi: V/3, V/5) until figured bass. Checks: the degree of F A C in C major;
   B D F♯ in G major (iii); A C F in C major (IV/3rd, with vi as the trap).
2. **Diatonic chords in major**: one triad on each degree of C major, the
   pattern M m m M M m ° (I ii iii IV V vi vii°), the same numerals in G major.
   Checks: the quality on degree 6; E G B in D major (ii); the root of V in F
   major (on the pad).
3. **Diatonic chords in minor**: A natural minor gives i ii° III iv v VI VII;
   degrees 6 and 7 change with the form of minor (13 possible triads); the
   raised 7 of harmonic minor makes V major and gives vii°; the most used set
   is i ii° III iv V VI with both VII (subtonic triad) and vii° (leading-tone
   triad). Checks: E G♯ B in A minor (V); E♭ G B♭ in C minor (III, the book's
   example); the raised note of V in D minor (C♯, on the pad).
4. **Authentic and plagal cadences**: a cadence as a harmonic arrival point at
   the end of a phrase, like a comma or a period; four basic cadences named by
   their last chords; authentic V–I, plagal IV–I. Checks: a G major phrase
   (read and heard) ending V–I; an F major phrase ending IV–I; an ear-only
   C major phrase ending V–I.
5. **Half and deceptive cadences**: half cadence stops on V; deceptive V–vi,
   strictly "V to not-I"; V–I and V–vi side by side with two play buttons.
   Checks: a G major phrase I–V–I–IV–I–V (the chord plan of the book's
   exercise 3a, our own voicing); a D major phrase ending V–vi; an ear-only
   F major phrase ending on V.
6. **Review**: after exercises 7.5: F♯ A C♯ in E major (ii), F♯ A D♯ in E major
   (vii°/3rd), A C♯ E in B minor (VII), the third of V in E minor (D♯, on the
   pad), a phrase ending on V (half), I–vi–IV–I (plagal, the chord plan of
   exercise 3b), and an ear-only I–ii–V–vi (deceptive).

Every chord is a root-position close triad on a treble staff (except the
inversions in 8.1 and the review), with the key signature drawn, and every
progression has a "Nghe" button in half notes. All progressions are our own
(I–IV–V–I and the like, which belong to no piece); no music, titles or
figures from the book's examples.

## Left out, and why

- **Every quoted example in 7.4** (an anthem, pop songs, and excerpts by
  Mozart and Wagner): most are copyrighted; the public-domain ones need long
  score excerpts. Our own short progressions carry each cadence instead.
- **Exercise 3's two song excerpts**: only their answer keys' chord plans
  (I–V–I–IV–I–V, I–vi–IV–I), which are stock progressions, are used, voiced
  by us, with no melody and no title.
- **The deceptive cadence V–IV/3rd** (the book's Ave Verum example): the tip
  says "V to anything but I" in words; a second example would need a slash
  label on the staff in two languages (see framework gaps).
- **Power chords (B5) and incomplete chords** at the end of 7.4: they belong to
  the book's pop examples, not to the four cadences; worth a line in a later
  pop-harmony chapter.
- **The Nashville Number System** aside in 7.1, and the table of 13 possible
  minor triads (7.3 figure): one sentence names the 13; the lesson keeps to
  the ones most used.
- **Augmented III+ example**: named in 8.1's text as notation only; it is not
  among the most common chords in minor, so it is not drawn or drilled.
- **Lead-sheet symbols beside numerals** (the book's tables and exercise 1):
  chords are written as their notes (`{B}–{D}–{F#}`), since a pitch token
  cannot carry a chord suffix ("Bm") in both namings.

## Framework gaps hit

- **A grand staff cannot split one chord across its two staves**
  (`NoteStaff.onTop` puts each event wholly on one staff, and the other staff
  gets a ghost note). Bass-plus-right-hand cadences were not expressible, so
  every progression is written as close triads on one treble staff.
- **Staff labels are one string for both languages**, so the slash numerals
  (vi `V/3`, en `V/3rd`) appear only in text and choices, not under notes.

## Source notes

Read from the pages themselves (fetched and stripped of tags), not a summary:
7.1 `RomanNumeralChordSymbols.html`, 7.2 `DiatonicChordsInMajor.html`,
7.3 `DiatonicChordsInMinor.html` (its figures are images; their alt text lists
the common minor triads), 7.4 `cadences.html`, 7.5
`RomanNumeralPracticeExercises.html`. Order and definitions follow the book:
numerals and case before the major pattern, minor after, then the four
cadences in the book's order (AC, PC, DC, HC; the lessons pair AC with PC and
HC with DC so each lesson ends on a contrast). The book only defines the
authentic cadence as V–I here (perfect and imperfect come later), so the
lessons use "kết chính" without the glossary's hoàn toàn / không hoàn toàn.
The hymn "Amen" for the plagal cadence is a standard fact, not taken from the
book's figure.

## For later chapters

- The Hợp âm drill's Roman mode asks root-position numerals only; inversion
  numerals (V/3rd, later figured bass) and cadence identification have no
  drill, so 8.4 and 8.5 have no practice link.
