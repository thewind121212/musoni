# Theory lessons — framework

The `theory` module (`web/src/theory/`) turns typed lesson data into short
bilingual lessons: read an idea, see it on a staff, hear it, check it on the
piano pad, then practise it in a drill. Content comes from Hutchinson's *Music
Theory for the 21st-Century Classroom* under the GNU FDL (see **Licence**).
Writing lessons: `port-guide.md` (section 7 is the content format) and
`glossary.md`. Screens: `docs/fe/screens.md` → Theory. Chapters ported so far:
`docs/STATUS.md` → Theory chapters.

## Layout

```
web/src/theory/
├── types.ts        content format: Chapter → Lesson → Step (explain | check) → Block
├── text.ts         lesson text: `{G4}` pitch tokens and `**bold**`; strict parser, plainText, pitchLabel
├── registry.ts     import.meta.glob('./content/ch*/index.ts') → CHAPTERS, sorted by number
├── outline.ts      course order: lessonKey, findLesson, lessonAfter, nextLesson, doneInChapter, reviewOf, lessonNumber, FROM_LIST
├── validate.ts     validateChapter(folder, chapter): every rule a chapter must meet, as messages
├── blocks.ts       pure layout helpers: staff labels and width, keyboard range, key labels, play sounds, answer pad
├── store.ts        useTheoryStore: the open lesson's step and answers, reading time, open chapter
├── content.test.ts runs validateChapter on every chapter the registry finds
├── components/     atoms / molecules / organisms / templates (pure)
├── pages/          ChapterList, LessonPlayer, TheoryAbout (the only readers of stores)
└── content/        LICENSE (GFDL 1.3), NOTICE.md, chNN-<slug>/index.ts + one file per lesson
```

A chapter is a folder `chNN-<id>` whose `index.ts` default-exports a `Chapter`
(`satisfies Chapter`), importing one file per lesson. Dropping the folder in is
all it takes: the registry finds it, the content test checks it, the list, home
card and About page show it. No framework code changes per chapter.

## Content and text

Lessons are data, Vietnamese and English side by side (`Localized`). Text runs
through `text.ts`: `{C4}` is a note, `{C}` a pitch class, `{F#}` / `{Bb3}` with
accidentals (`n` for a printed natural), printed in the reader's naming (Do4 /
C4, ♯ ♭ ♮); `**term**` is bold. The parser is strict: an unknown token, a stray
brace or an odd `**` is an error, so the content test catches it instead of a
reader seeing braces. Notes on a staff, played or filled on keys are written in
the notation of `core/music/notation.ts` (grammar in the port guide §7).

## Validator

`validateChapter` checks the folder name against `number` and `id`, slugs, both
languages present and parseable, minutes, sources (section number and a page
of the book), the practice preset (against the drills' real levels and the
offered lengths), recap counts, step and check counts (a review: checks only,
last in the chapter), at most two text blocks per explain step, at most three
sentences and about 55 Vietnamese words per text or tip, staff notation, key
and time signatures, labels (count, length), highlights, play and keys blocks
(pitches only, inside the keyboard, pitch labels only on one octave), key
answers that exist on the pad, and 2-4 distinct choices with exactly one right.
The limits are `THEORY_RULES` in `config/constants.ts`. Messages name the
chapter, lesson, step and block.

## Player

`LessonPlayer` opens the lesson in the theory store before its first render
(`open(key, steps, fresh)`): the same lesson keeps its place (so stepping back
from its practice drill shows the end screen again, and a lesson left mid-way
resumes); a fresh visit (a push, not a back) to a finished lesson starts it
over. Steps are store state, not routes. `next()` past the last step marks the
lesson done. ✕ calls `close()` (forget the place) and goes back to the list;
unmounting calls `leave()` (keep it). Sounds stop on every step change and on
leaving. `StepView` renders a step; `LessonBlocks` its blocks; `LessonEnd` the
end screen; `LessonFrame` the shell.

A key check uses the drills' `AnswerPad`, spelled like the answer (`padFor`); a
lone staff note in the check turns green, a wrong pick is drawn beside it in red
(`nearestOctave`), and with sound on the note plays. A choice check uses
`ChoiceList`. Either way one answer per check, then `CheckVerdict` and the reason.

## Progress and time

Through `progressStore` only (see `docs/fe/data-model.md`): `markLessonDone`
saves the latest score per lesson in `theory.done`, `recordLessonTime` adds
reading time under the local day in `days[date].lessons`. Both are additive
fields, so the document stays version 1 and an older document reads as no
lessons. The store counts time while the page is visible, capping each stretch
between taps at `THEORY_IDLE_CAP_MS` (3 min), and saves it on finish, close,
leave and hide once it reaches `THEORY_MIN_RECORD_SEC` (15 s). Lesson time
counts toward the day's minutes, streaks and active days; never toward bests.

`outline.nextLesson` is the first unfinished lesson in course order (chapter
number, then lesson order); it drives the home card, the open chapter and the
"next" ring on the list. Nothing is locked.

## Practice link

A lesson's `practice` is a `DrillPreset` (`app/drillPreset.ts`):
`{ drill: 'note-id', level, durationSec, accidentals? }` or
`{ drill: 'hear-play', level, durationSec }`, lengths 60 or 120 s. The end
screen's "Luyện ngay" links to the drill with route state
`{ autostart: true, preset }`. `useDrillRoute` hands the preset to the drill's
`autostart`, which starts a session on `withPreset(settings, preset)`: the
reader's settings with the preset's level, length and accidentals laid over
them, **for that session only**. Nothing is saved; the drill's setup still shows
the reader's own choices afterwards, and the result's Again replays the
session's settings. A preset for another drill is ignored. Stepping back from
the drill (swipe, or its result's Home link, which steps back) returns to the
lesson's end screen.

A lesson with no fitting drill has no `practice`; its end screen makes "Bài
tiếp" the main button and adds "Ôn lại cả chương" (unless the next lesson is
the review).

## Routes and loading

`/theory` (ChapterList), `/theory/:chapter/:lesson` (LessonPlayer; an unknown
lesson redirects to `/theory`), `/theory/about` (TheoryAbout), each a
`splitPage` chunk in `app/routes.ts`. All lesson content sits in the registry
chunk; home loads it on mount (`loadTheory`) for its card and prefetches the
list and player chunks when idle.

## Licence

`web/src/theory/content/` holds all lesson text, its `LICENSE` (the GFDL 1.3,
verbatim) and `NOTICE.md` (the original's title, author, copyright, link and
licence notice; our Modified Version under GFDL 1.3 with no Invariant Sections
added; the History; the contents adapted). The same licence text is served at
`/licenses/gfdl-1.3.txt` (`web/public/licenses/`). The About page shows the
notice in the reader's language, every end screen credits its book sections and
links to it. The app calls the lessons "Lý thuyết âm nhạc" / "Music theory",
never by the book's title. App code is not lesson content and is not under the
GFDL. Chapter PRs add their row to `NOTICE.md`'s contents; the About page lists
chapters from their `sources` on its own.
