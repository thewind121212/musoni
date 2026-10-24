# Chapter 35 — Kỹ thuật mười hai âm và chủ nghĩa chuỗi / Serialism

Folder: `web/src/theory/content/ch35-serialism/` (chapter id `serialism`).
Book: Hutchinson, *Music Theory for the 21st-Century Classroom*, sections 34.1-34.6,
with the review modelled on the practice exercises (34.7).

## Lessons

| # | Lesson (id) | Book | Steps (checks) | Practice link |
|---|---|---|---|---|
| 35.1 | Chuỗi mười hai âm / Twelve-tone rows (`twelve-tone-rows`) | 34.1 | 7 (4) | none |
| 35.2 | Số chuyển vị / Transposition numbers (`transposition-numbers`) | 34.1 | 6 (3) | none |
| 35.3 | Nhận ra dạng chuỗi / Determining row forms (`determining-row-forms`) | 34.2 | 5 (3) | none |
| 35.4 | Viết dạng chuỗi và ma trận / Writing row forms and the matrix (`writing-row-forms`) | 34.3, 34.4 | 6 (3) | none |
| 35.5 | Chuỗi trong tác phẩm / Row forms in music (`row-forms-in-music`) | 34.5, 34.6 | 7 (3) | none |
| 35 | Ôn chương 35 / Chapter 35 review (`review`) | 34.7 | 7 checks | none |

No drill trains row forms, transposition numbers or integer notation, so no
lesson has a practice link.

**The row.** Every lesson uses one row of our own, P₀ = 0 4 2 6 3 8 9 11 5 7 10 1
({C} {E} {D} {F#} {Eb} {Ab} {A} {B} {F} {G} {Bb} {C#}). All 48 of its forms are
different, and its four forms open with four different interval pairs
(P +4 −2, I −4 +2, R −3 −3, RI +3 +3), so two intervals tell the form. Intervals
in this chapter are counted in half steps, which needs no spelling. Rows are
drawn as twelve whole notes with nearest-motion register; a natural is printed
where a letter comes back after an altered one (no key signature, no bar).
The forms were computed and checked by a script, not by hand.

What each teaches:

1. **Twelve-tone rows**: the row (series) of all twelve notes in a fixed
   order; the book's premises (all twelve, no repeat before the other eleven
   except direct repetition, trills, tremolos; order fixed; the row can be
   inverted, retrograded, and the inversion retrograded); the four row forms
   P, R, I, RI, with the book's remark that RI is the inversion backward.
   Checks: a twelve-note line with {E} twice and no {A} (not a row); the last
   note of R from P (on the pad); the second note of I from {C5} (on the pad);
   the first note of RI from I (on the pad).
2. **Transposition numbers**: the row in integers ({C} = 0, taught in
   chapter 34); P and I numbered by their first note (P₀ on {C}, P₃ on {Eb}),
   R and RI by their last (R₁ ends on {C#}, RI₇ on {G}, the book's own
   examples). Checks: the first note of I₅ (pad), R₇ from a staff (R₈ is the
   first-note trap), the last note of RI₃ (pad).
3. **Determining row forms**: compare the first intervals with the four forms,
   then read the number from the first or last note (the book's method, with
   R₈ as the worked example). Checks: an RI₄ staff (form only), I₇ and R₁₀
   staves (form and number).
4. **Writing row forms and the matrix**: write the four forms on 0, then
   transpose (the book's examples I₉, up a major 6th, and RI₅, up a perfect
   4th, applied to our row); the 12 × 12 matrix with P₀ across, I₀ down, R
   right to left, RI bottom to top. Checks: P₂ among integer lists (I₂ and R₂
   as traps); the first note of R₄ (pad); the matrix's second row read
   backward (R₈).
5. **Row forms in music**: overlap (end of P₀ into P₁); a row split into
   tetrachords, in counterpoint or as chords; melody and accompaniment (P₀ as
   the melody over R₀'s tetrachords as chords, the book's plan); non-twelve-tone
   serialism, with an eight-note series of our own (six notes, {A} and {G}
   repeated, centring on {A} or {E}). Checks: the inversion that overlaps P₀
   (I₁); the last tetrachord of P₀; why the eight-note series is still serial.
6. **Review**, after 34.7: I₈ among integer lists (exercise 1), the first note
   of RI₁₀ (pad), I₁ and RI₁₀ from staves and R₅ from integers (exercise 2),
   a matrix column (exercise 3), the P form overlapping R₀ (exercise 4).

## Left out, and why

- **Every quoted work**: Schoenberg's Suite Op. 25 (34.1) and Stravinsky's
  Septet (34.6) are copyrighted; neither excerpt, nor its row, nor its series
  is used. The book's own example row (34.1-34.5) and the exercise rows (34.7)
  are replaced by our row, so every figure and answer here is our own.
- **The full 12 × 12 matrix** (34.4, exercise 3): it does not fit a phone.
  The lesson shows the first column with the P label each note starts, and
  the checks ask about rows and columns in words.
- **Counterpoint shown in score** (34.5, the tetrachords in separate voices)
  and a true melody-over-held-chords texture: a staff or play block holds one
  line of events (see gaps), so the tetrachords are shown as chords, and the
  melody-and-accompaniment play block strikes R₀'s chord on every beat under
  P₀'s melody.
- **Exercise 4** (find P₅ in an excerpt with overlap): needs a long score;
  its idea (which form overlaps a given one) is a review check.
- **Exercise 5** (normal form, prime form and interval vector of the row's
  trichords): it reviews chapter 34's set theory rather than this chapter,
  and its "prime form" would clash with the row's prime in one short check.
- **The normal form of Stravinsky's series** (34.6): needs the copyrighted
  series; the tip keeps the point (a series with repeats can imply a tonal
  centre).
- The two downloadable homework assignments.

## Framework gaps hit

- **No two simultaneous lines with different rhythms.** Staff and play blocks
  are one sequence of events, and a grand staff puts each event wholly on one
  staff, so a melody over a held chord (34.5) and contrapuntal voices cannot be
  written. The melody-and-accompaniment step uses two separate staves and a
  play block that repeats the chord on each melody note.
- **Staff labels are one string for both languages**; integers and P/I/R/RI
  labels are the same in both, so they work. Subscript numbers (P₀, RI₁₀) are
  plain Unicode in text, choices and labels.

## Source notes

Read from the pages themselves (fetched and stripped of tags), not a summary:
34.1 `TwelveToneTechnique.html`, 34.2 `DeterminingRowForms.html`, 34.3
`WritingRowForms.html`, 34.4 `Serialism-6.html`, 34.5 `RowFormsInMusic.html`,
34.6 `NonTwelveToneSerialism.html`, 34.7 `SerialismExercises.html`. The
figures are images without alt text; their content was taken from the
surrounding text and standard twelve-tone practice. Order and definitions
follow the book: the premises, the four forms, transposition numbers with
P/I named by the first note and R/RI by the last (the book's convention, so
R₅ is P₅ backward), determining, writing, the matrix, presentation, then
non-twelve-tone serialism. The book counts transpositions in semitones with
the interval name beside them ("up 9 semitones (a major 6th)"); the lessons do
the same in half steps.

New terms (vi | en): kỹ thuật mười hai âm | twelve-tone technique; chuỗi |
row (series); dạng chuỗi | row form; dạng gốc | prime (P); dạng nghịch hành |
retrograde (R); dạng đảo | inversion (I); dạng đảo nghịch hành | retrograde
inversion (RI); chuyển vị | transpose; số chuyển vị | transposition number;
ma trận mười hai âm | twelve-tone matrix; gối đầu | overlap; đối âm |
counterpoint; giai điệu và đệm | melody and accompaniment; chủ nghĩa chuỗi |
serialism. "Tứ âm" (tetrachord) is the glossary's term, here for four adjacent
notes of a row.
