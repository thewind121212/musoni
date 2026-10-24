# Chapter 5 — Trường độ và nhịp / Basics of rhythm

Folder: `web/src/theory/content/ch05-durations-time/` (chapter id `durations-time`).
Book: Hutchinson, *Music Theory for the 21st-Century Classroom*, chapter 4 "Basics
of Rhythm", sections 4.1-4.6, with the review modelled on the practice exercises (4.7).
Every lesson ends on Tiết tấu (`rhythm`), the drill that trains reading and tapping
these values (`docs/fe/drill-rhythm.md`); its levels follow the lessons one to one.

## Lessons

| # | Lesson (id) | Book | Steps (checks) | Practice link |
|---|---|---|---|---|
| 5.1 | Trường độ nốt / Note values (`note-values`) | 4.2 | 6 (3) | Tiết tấu, level 1 (whole, half, quarter), 1 min, ♩ = 60 |
| 5.2 | Ô nhịp và số chỉ nhịp / Measures and time signatures (`time-signature`) | 4.1, 4.4 | 7 (3) | Tiết tấu, level 2 (eighths and rests), 1 min, ♩ = 60 |
| 5.3 | Chấm dôi và dấu nối / Dots and ties (`dots-ties`) | 4.3 | 6 (3) | Tiết tấu, level 3 (dots and ties), 1 min, ♩ = 60 |
| 5.4 | Nhịp đơn và nhịp phức / Simple and compound meter (`meter`) | 4.4, 4.6 | 7 (3) | Tiết tấu, level 4 (6/8 and triplets), 1 min, ♩ = 80 |
| 5.5 | Liên ba và nghịch phách / Tuplets and syncopation (`tuplets-syncopation`) | 4.5, 4.6 | 7 (3) | Tiết tấu, level 4, 1 min, ♩ = 80 |
| 5 | Ôn chương 5 / Chapter 5 review (`review`) | 4.7 | 7 checks | Tiết tấu, level 4, 2 min, ♩ = 80 |

What each teaches:

1. **Note values**: duration counted in beats; the quarter (1 beat), half (2) and
   whole note (4); halving into eighths and sixteenths, flags and beams; a rest
   for every value (whole rest hangs below line 4, half rest sits on line 3).
   Checks: quarters in a whole note; name four beamed sixteenths; how long a half
   rest lasts.
2. **Measures and time signatures**: measures and bar lines, beat 1; the time
   signature's top number ("how many") and bottom number ("of what"); 3/4; 4/4
   as common time (C) and 2/2 as cut time; tempo in bpm (60 bpm = one beat a
   second) and the Italian tempo words. Checks: what 2/4 means; the note that
   completes a 4/4 measure; how long a beat is at 120 bpm.
3. **Dots and ties**: no single note lasts three beats, so a tie joins two notes
   of the same pitch (also across a bar line); a slur looks the same but joins
   different pitches; a dot adds half; a double dot adds half of that again.
   Checks: a tied half and quarter; eighths in a dotted quarter; a quarter tied
   to an eighth as one note (book exercise 3).
4. **Simple and compound meter**: duple, triple, quadruple; strong and weak
   beats; beats divided in two (simple) or three (compound); in compound
   meter the beat is a dotted note and the bottom number shows the division;
   top numbers 2-3-4 against 6-9-12, divided by 3 for the beats; beaming by the
   beat (the same six eighths in 3/4 and 6/8). Checks: hear a waltz pattern as
   triple; name 9/8; eighths per beam group in 6/8.
5. **Tuplets and syncopation**: the triplet and the word tuplet; write 6/8 rather
   than triplets throughout (two measures that sound the same); duplets and
   quadruplets in compound meter; syncopation, and the eighth-quarter-eighth
   figure that may hide the beat because it is common. Checks: a triplet's length;
   the note a duplet fills in 6/8; the strong beat a half note on beat 2 hides.
6. **Review**: the whole rest, a dotted half plus a quarter fills 4/4, an eighth
   tied to a sixteenth as a dotted eighth, 4/2 and 12/8 named, a 6/8 tune heard
   as compound, what a triplet's 3 means: seven choice checks.

### Order

The book opens the chapter with the time signature (4.1), whose bottom number
names a note value, before it has shown any note values (4.2). The lessons start
with note values instead, so that "the bottom number tells you of what" lands on
values the reader already knows; lesson 1 counts them in 4/4 as the book's 4.2
does, with a tip that the next lesson explains the bar lines. Measures, bar lines
and tempo are defined in 4.4 but are needed with the time signature, so they come
in lesson 2; the rest of 4.4 (meter) is lesson 4. Section 4.6 is split: beaming by
the beat goes with meter (lesson 4), syncopation with tuplets (lesson 5).

### Examples

All notation is our own: rhythms on one pitch (B4 on a bare staff), a
C-G pattern for strong beats and divisions, and a waltz-style accompaniment in C.
Lesson 4 plays the first phrase of "Row, Row, Row Your Boat" in 6/8, a
traditional tune published in 1852 (public domain); its title is not named in the
lesson. The book's song excerpts (in 4.6 and the 4.7 listening exercises) are
not used: the review's meter-by-ear check is our own 6/8 arpeggio tune.

## Left out, and why

- The double whole note (breve) and the 64th note: the book names them as rare,
  and the notation grammar has no `breve` or `64` duration.
- Quintuplets, sextuplets and septuplets: one mention would need a figure the
  phone width can't carry well; triplets, duplets and quadruplets cover the
  idea.
- Compound meters with other bottom numbers (6/16, 12/4) and the exercise's
  12/16 and 9/16: 6/8, 9/8 and 12/8 carry the rule (top number divided by 3).
- "M.M." (Maelzel's metronome) and the Grove quotation defining the beat: asides.
- The book's wrongly beamed example in 4.6: the staff renderer always beams by
  the time signature, so beams that cross a beat can't be drawn. The lesson shows
  the right grouping (3/4 against 6/8) instead.
- The slur has no figure: the notation grammar has ties but no slurs, so it is a
  tip without a staff.
- 4.7 exercise 5 (rewrite a badly notated rhythm): needs writing notation, which
  a check can't take.
- No keys blocks: position on the keyboard doesn't help with durations.

## Source notes

The pages were fetched and their text read in full (4.1-4.7). Most of the
chapter's content is in the book's figures (images), so the examples were written
from the text's definitions; two figures (4.6's badly beamed rhythm and its
acceptable syncopation patterns) were viewed to see what the text refers to,
then rewritten as our own rhythms. 4.1's text is a single sentence ("how many"
and "of what"); its figure of time signatures is covered by lesson 2's own
staffs.

## Terms

Glossary terms are used as listed. Terms this chapter adds (not in the glossary
yet): **nhịp** (meter), **nhịp độ** (tempo), **móc** (flag), **gạch nối**
(beam), **chấm dôi kép** (double-dotted), **dấu luyến** (slur), **liên bốn**
(quadruplet), **nghịch phách** (syncopation), **tiết tấu** (rhythm), and the
combined meter names **nhịp hai/ba/bốn đơn** and **nhịp hai/ba/bốn phức**
(simple/compound duple, triple, quadruple).

Trap: in older Vietnamese theory books "nhịp đơn / nhịp phức" means a meter with
one strong beat (2/4, 3/4) against one built from several (4/4, 6/8). The
glossary maps them to the American simple / compound (beat divided in two or
three), and lesson 4 defines them that way.
