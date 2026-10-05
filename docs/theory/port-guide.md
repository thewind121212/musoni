# Theory port guide

Every agent porting a chapter of Hutchinson's *Music Theory for the 21st-Century
Classroom* into Musoni follows this guide. The main agent owns it; propose changes
in your PR description rather than drifting from it. Vocabulary is in
`docs/theory/glossary.md`. Approved mockups: project files
`screenshots/theory-lessons/` (home card, chapter list, explain step, check step,
end screen).

Source: https://musictheory.pugetsound.edu/mt21c/MusicTheory.html
(GNU Free Documentation License 1.3).

## 1. What "port" means

- **Adapt, don't transcribe.** Keep the book's concepts, their order, its
  definitions and its terms. Rewrite them short and plain for a phone screen.
  Drop asides, history and anything that needs a long score excerpt.
- **Two languages in one file.** Vietnamese is primary and must read as natural
  Vietnamese, not a word-for-word translation. English stays close to the book's
  wording and uses its American terms (half step, quarter note, measure).
- **Same facts in both languages.** A check, example or tip exists in both or in
  neither.
- **Exercises become checks.** The book's "Practice Exercises" sections become
  in-lesson checks and the chapter's review questions, not worksheets.

## 2. Licence rules (GFDL 1.3), non-negotiable

- Lesson content lives only under `web/src/theory/content/`, which carries the
  GFDL `LICENSE` and `NOTICE.md`. Never put lesson text anywhere else (no copy in
  `core/i18n/translations.ts`; UI chrome strings like "Tiếp" do go there).
- Every lesson records its source: book section number and URL. The app prints it
  on the lesson's end screen.
- **No copyrighted music.** The book quotes pop songs and recordings; never copy
  them, not even a few notes, not even as a link. Examples are written by us,
  folk tunes, or public-domain classics (composer died before 1955 and the piece
  published before 1929 is safe).
- **No images copied from the book.** All notation is drawn with VexFlow through
  the core `Staff`, so it works in dark mode and in both namings.
- Add yourself to nothing: the `NOTICE.md` history entry is maintained in PR 0;
  chapter PRs add their chapter to its "Contents adapted" list.

## 3. Lesson shape

- A **chapter** = one coherent topic, 3 to 5 lessons. A **lesson** = 3 to 5
  minutes, 4 to 7 steps.
- A **step** carries one idea. Explain steps hold at most three short sentences
  (about 50 words in Vietnamese) per text block, at most two text blocks.
- **Show and play every idea.** If a step talks about notes, they are on a staff
  and a "Nghe" button plays them. Use the piano keys block whenever position on
  the keyboard helps (steps, accidentals, scales, intervals, chords).
- **At least two checks per lesson**, spread through it, not all at the end. A
  check is answered on the piano pad when the answer is a key, otherwise with 2 to
  4 choices. Every check carries a one-sentence reason shown after the answer,
  right or wrong. No lives, no lock-outs, no timers.
- **End screen**: 3 to 4 recap bullets, then the practice link (section 4).
- **Chapter review**: the last lesson of each chapter, or a separate "Ôn chương"
  item, of 5 to 8 checks mixing the chapter's lessons.
- Tone: second person ("bạn"), friendly, direct, no exclamation marks except on
  a right answer, no emoji in text.

## 4. Practice links

Each lesson ends with the drill that trains what it taught, with a preset (level,
length 1 or 2 min, sharps/flats, clef). Use an existing drill setting only; never
add drill features in a chapter PR. If no drill fits, the end screen offers the
chapter review instead. Current drills: Đọc nốt (`note-id`: clef levels, sharps
and flats) and Nghe & Đàn (`hear-play`: L1 Do Mi Sol in C, L2 Do–Sol in 3 keys,
L3 full scale in 5 keys, L4 all 12 notes in 7 keys). Read their stores and docs
(`docs/fe/drill-note-identification.md`, `docs/fe/drill-hear-play.md`) for the
exact preset values.

## 5. Writing notes and terms

- Never write a note name as a word in lesson text. Use a pitch token (`{G4}`
  for a specific note, `{G}` for a pitch class, `{F#}` / `{Bb}` with accidentals)
  so the app prints it in the reader's naming (Sol / G).
- Use only glossary terms. New term → add it to `docs/theory/glossary.md` in your
  PR and say so in the description.
- First use of a term in a lesson: bold, Vietnamese with the English in brackets.

## 6. Code and repo rules

- Start from the latest `origin/main`; one branch and one PR per chapter; never
  push to `main`. Follow `CLAUDE.md`: impl-plan folder, fe-design checklist,
  doc-sync.
- A chapter PR adds a new folder `web/src/theory/content/chNN-<slug>/` and the
  doc `docs/theory/chNN-<slug>.md` (lesson list, source sections, practice links,
  what was left out and why), plus its line in `docs/STATUS.md` and the
  `NOTICE.md` contents list. It must not edit framework code; if the framework is
  missing something, stop and describe what you need in the PR.
- Tests: the generic content validator from PR 0 must pass for your chapter. Add
  no per-chapter boilerplate tests.
- Look at your lessons in a real browser at 320, 375, 390 and 1280 px, light and
  dark, Vietnamese and English, both note namings; attach screenshots to the PR
  (and copy them to project files `screenshots/theory-chNN/`). Check the longest
  Vietnamese strings for overflow.
- `npm run build`, `npm run lint` (zero warnings) and `npm test` pass before push.

## 7. Content format

Defined by PR 0 and documented here when it merges (section added by PR 0):
the TypeScript types for chapters, lessons, steps and blocks, the pitch-token
syntax, how a practice preset is written, and a complete example lesson.
