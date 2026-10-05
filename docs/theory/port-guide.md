# Theory port guide

Every agent porting a chapter of Hutchinson's *Music Theory for the 21st-Century
Classroom* into Musoni follows this guide. The main agent owns it; propose changes
in your PR description rather than drifting from it. Vocabulary is in
`docs/theory/glossary.md`. Approved mockups: project files
`screenshots/theory-lessons/` (the old home card, chapter list, explain step, check step,
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
- The `NOTICE.md` History entry is already written. A chapter PR only adds a
  row to its "Contents adapted" table; the About page picks the chapter up from
  its lessons' sources on its own.

## 3. Lesson shape

- A **chapter** = one coherent topic, 3 to 5 lessons. A **lesson** = 3 to 5
  minutes, 4 to 7 steps.
- A **step** carries one idea. Explain steps hold at most two text blocks, each
  at most three sentences and 55 Vietnamese words. Staff labels are short tags of
  up to 6 characters (a line number, a Roman numeral), not prose. Pitch names on
  keys only on a one-octave keyboard; keyboards span at most 4 octaves. The
  validator (`THEORY_RULES` in `config/constants.ts`) enforces these limits.
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

Each lesson ends with the drill that trains what it taught, with a preset: the
drill's level, a length of 60 or 120 s, and (Đọc nốt) sharps/flats. The clef is
part of the Đọc nốt level; there is no separate clef setting. Use an existing
drill setting only; never add drill features in a chapter PR.

Leaving out `practice` is fine when no drill fits: the end screen then makes
"Bài tiếp" the main button and adds an "Ôn lại cả chương" link. Known gaps today:
Đọc nốt has no C clef level, and nothing trains key-finding without a staff,
rhythm, intervals or chords yet (drills for them are being built; a preset may
name any registered drill). Current drills: Đọc nốt (`note-id`: clef levels, sharps
and flats) and Nghe & Đàn (`hear-play`: L1 Do Mi Sol in C, L2 Do–Sol in 3 keys,
L3 full scale in 5 keys, L4 all 12 notes in 7 keys). Read their stores and docs
(`docs/fe/drill-note-identification.md`, `docs/fe/drill-hear-play.md`) for the
exact preset values.

## 5. Writing notes and terms

- Never write a note name as a word in lesson text. Use a pitch token (`{G4}`
  for a specific note, `{G}` for a pitch class, `{F#}` / `{Bb}` with accidentals)
  so the app prints it in the reader's naming (Sol / G).
- Exception: "Do Re Mi" / "C D E" may be plain words when the text is about the
  naming systems themselves.
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
- Also screenshot **every step** of every lesson at 375 px (vi light and en dark)
  into `screenshots/theory-chNN/steps/` and look at each one: crowded labels and
  keyboards only show up there. PR 0's chapter 1 set in
  `screenshots/theory-ch01/steps/` is the reference.
- `npm run build`, `npm run lint` (zero warnings) and `npm test` pass before push.

## 7. Content format

The types are in `web/src/theory/types.ts`; the framework is described in
`docs/theory/framework.md`. Chapter 1 (`content/ch01-pitch-staff/`) is the
reference: copy its shape.

### Files

```
web/src/theory/content/chNN-<id>/
├── index.ts            the Chapter: id, number, title, lessons in order
├── 01-<lesson-id>.ts   one lesson per file, default export `satisfies Lesson`
├── …
└── 05-review.ts        the chapter review (kind: 'review'), last
```

The folder name must be `ch` + the two-digit chapter number + `-` + the
chapter `id` (`ch02-accidentals` for `{ id: 'accidentals', number: 2 }`).
Chapter and lesson ids are slugs (`a-z`, `0-9`, `-`) and **never change once
merged**: they are the URL (`/theory/<chapter>/<lesson>`) and the key progress
is saved under. Nothing else needs registering: the registry finds
`content/ch*/index.ts`.

```ts
// index.ts
import type { Chapter } from '@/theory/types'
import firstLesson from './01-first-lesson'
// …
export default {
  id: 'accidentals',
  number: 2,
  title: { vi: 'Dấu hóa, nửa cung, nguyên cung', en: 'Accidentals and steps' },
  lessons: [firstLesson, /* …, */ review],
} satisfies Chapter
```

### Types in short

- `Localized = { vi: string; en: string }`: every piece of text, both languages.
- `Lesson`: `id`, `kind?` (`'review'` for the chapter review), `title`,
  `minutes` (2-6), `sources` (`[{ section: '1.2', url: 'https://musictheory.pugetsound.edu/mt21c/….html' }]`),
  `practice?` (a preset, below), `recap` (3-4 `Localized` bullets; a review may
  have 0-4), `steps`.
- `Step` is one of:
  - `{ kind: 'explain', title, blocks }`: one idea. At most two `text` blocks.
  - `{ kind: 'check', prompt, blocks?, answer, reason }`: a question.
    `answer` is `{ type: 'key', note: 'E' }` (answered on the 12-key pad; a pitch
    class: `E`, `F#`, `Bb`; add `labels: false` to hide the names on the pad when
    the question is where a key is) or `{ type: 'choice', choices: [{ text }, { text, correct: true }, …] }`
    (2-4 choices, exactly one `correct: true`, shown in the order written).
    `reason` is one sentence, shown after the answer, right or wrong.
- `Block` is one of:
  - `{ type: 'text', text }`: at most 3 sentences, about 50 Vietnamese words.
  - `{ type: 'tip', text }`: a blue hint box, same limits.
  - `{ type: 'staff', clef, notes, key?, time?, labels?, highlight? }`:
    `clef` is `treble`, `bass`, `alto`, `tenor`, `grand` or `none` (bare lines);
    `notes` in the notation below; `key` like `G`, `Bb`, `F#m`; `time` like
    `4/4`, `6/8`, `C`; `labels` is `'names'` (Sol), `'pitches'` (Sol4) or one
    string per note or rest (bars skipped), up to 6 characters, pitch tokens
    allowed, `''` for none; `highlight` lists notes (from 0, bars skipped) drawn blue.
  - `{ type: 'play', notes, label?, bpm? }`: a "Nghe" button. Untimed notes
    play one after another; written durations play at `bpm` (default 90).
    A `play` right after a `keys` with a `caption` shares its row.
  - `{ type: 'keys', notes, from?, octaves?, labels?, caption? }`: a small
    keyboard with the keys of `notes` filled blue (pitches with octaves only).
    `from` is the C it starts on, `octaves` 1-4 (defaults fit the notes);
    `labels: 'names' | 'pitches'` names the filled keys (`pitches` only on a
    one-octave keyboard, where they fit).
- A check's `blocks` usually hold one staff (a lone staff note turns green on
  the answer, and a wrong pad pick is drawn beside it in red), a keys block, or
  a play block for an ear question.

### Text: pitch tokens and bold

- `{G4}`: a note with its octave → "Sol4" / "G4". `{G}`: a pitch class →
  "Sol" / "G". Accidentals: `{F#}`, `{Bb3}`, `{C##4}`, `{Ebb}`, `{Fn}` (a
  natural, printed ♮). Never write a note name as a plain word (not even in a
  choice: write `{ text: { vi: '{C5}', en: '{C5}' } }`).
- `**term**`: bold, for a glossary term's first use, Vietnamese first with the
  English in brackets: `**Khuông nhạc** (staff)`.
- A stray `{`, `}` or unmatched `**` is an error.

### Notation (`notes` in staff, play and keys blocks)

Tokens separated by spaces (`core/music/notation.ts`):

| Write | Means |
|---|---|
| `C4`, `F#4`, `Bb3`, `Fn4`, `C##4`, `Ebb4` | a note; `n` prints a natural |
| `C4+E4+G4` | a chord |
| `C4:q`, `D4:8.`, `E4:h..` | durations `w h q 8 16 32`, each `.` a dot; no duration = whole note, drawn plain (use for pitches) |
| `R:q`, `R` | a rest (no duration: a whole rest) |
| `C4:h~ C4:q` | `~` ties to the next note |
| `\|`, `\|\|` | bar line, double bar line |
| `3( C4:8 D4:8 E4:8 )` | a tuplet: 3 notes in the time of 2 |
| `C4@t`, `C4@b` | grand staff only: put the note on the top or bottom staff (default: C4 and up on top) |

A typo fails the content test with the bad token named. `keys` blocks take
plain pitches only (no durations, rests or bars).

### Practice presets

`practice` uses only settings the drills already have (`app/drillPreset.ts`):
any registered drill's id (its `drills/<id>/drill.ts`), one of its levels, a
length, and only the options its entry lists as `presetOptions`:

```ts
practice: { drill: 'note-id', level: 2, durationSec: 60 }                     // Đọc nốt, level 1-4
practice: { drill: 'note-id', level: 1, durationSec: 120, accidentals: true }  // with sharps and flats
practice: { drill: 'hear-play', level: 3, durationSec: 120 }                   // Nghe & Đàn, level 1-4
```

Đọc nốt levels: 1 Khóa Sol (E4-F5), 2 Khóa Sol + (A3-C6), 3 Khóa Fa (G2-A3),
4 Cả hai (treble A3-C6 and bass E2-E4); there is no C clef level. Nghe & Đàn levels: 1 home chord in C, 2 Do-Sol in 3 keys, 3 full
scale in 5 keys, 4 all 12 notes in 7 keys. `durationSec` is 60 or 120. The
preset applies to that one session; the reader's own settings are untouched.
No fitting drill → leave `practice` out: the end screen then leads with "Bài
tiếp" and offers the chapter review.

### The content test

`npm test` runs `theory/content.test.ts`, which checks every chapter against
`theory/validate.ts`: folder name, slugs, both languages, tokens, notation,
minutes, sources, preset, recap 3-4, 4-7 steps with at least 2 checks (review:
5-8 checks only, last), text limits, label counts, keyboard ranges, pad answers,
2-4 choices with one right. Its message names the lesson, step and block. The
limits live in `THEORY_RULES` (`config/constants.ts`); a chapter PR never
changes them.

### A complete lesson

Chapter 1, lesson 2 (`content/ch01-pitch-staff/02-staff-clefs.ts`):

```ts
import type { Lesson } from '@/theory/types'

/** Book 1.2: the staff, treble and bass clef, ledger lines, the grand staff. */
export default {
  id: 'staff-clefs',
  title: { vi: 'Khuông nhạc và khóa', en: 'The staff and clefs' },
  minutes: 4,
  sources: [{ section: '1.2', url: 'https://musictheory.pugetsound.edu/mt21c/Notation.html' }],
  practice: { drill: 'note-id', level: 1, durationSec: 60 },
  recap: [
    { vi: 'Khuông nhạc có 5 dòng và 4 khe', en: 'The staff has 5 lines and 4 spaces' },
    { vi: 'Khóa Sol đánh dấu {G4} ở dòng 2', en: 'The treble clef marks {G4} on line 2' },
    { vi: 'Khóa Fa đánh dấu {F3} ở dòng 4', en: 'The bass clef marks {F3} on line 4' },
    { vi: 'Dòng kẻ phụ cho nốt ngoài khuông', en: 'Ledger lines hold notes beyond the staff' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Khuông nhạc', en: 'The staff' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Khuông nhạc** (staff) gồm năm **dòng kẻ** (lines) và bốn **khe** (spaces) xen giữa. Dòng 1 là dòng dưới cùng. Nốt càng nằm cao trên khuông, âm càng cao.',
            en: 'The **staff** has five **lines** with four **spaces** between them. Line 1 is the bottom line. The higher a note sits on the staff, the higher it sounds.',
          },
        },
        { type: 'staff', clef: 'none', notes: 'E4 G4 B4 D5 F5', labels: ['1', '2', '3', '4', '5'] },
        { type: 'play', notes: 'E4 G4 B4 D5 F5', label: { vi: 'Nghe dòng 1 đến dòng 5', en: 'Hear lines 1 to 5' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này nằm ở đâu?', en: 'Where is this note?' },
      blocks: [{ type: 'staff', clef: 'none', notes: 'A4' }],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Khe 2', en: 'Space 2' }, correct: true },
          { text: { vi: 'Dòng 2', en: 'Line 2' } },
          { text: { vi: 'Khe 3', en: 'Space 3' } },
        ],
      },
      reason: {
        vi: 'Nốt nằm giữa dòng 2 và dòng 3, tức là ở khe 2.',
        en: 'It sits between lines 2 and 3, which is space 2.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Khóa Sol', en: 'The treble clef' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Khóa** (clef) cho biết các dòng và khe mang tên gì. **Khóa Sol** (treble clef) cuộn quanh dòng 2, nên nốt trên dòng 2 là {G4}.',
            en: 'A **clef** tells you the names of the lines and spaces. The **treble clef** curls around line 2, so a note on line 2 is {G4}.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'G4', labels: 'names', highlight: [0] },
        { type: 'play', notes: 'G4', label: { vi: 'Nghe {G}', en: 'Hear {G}' } },
        { type: 'keys', notes: 'G4', caption: { vi: '{G} trên phím đàn:', en: '{G} on the keys:' } },
        {
          type: 'tip',
          text: {
            vi: 'Từ {G}, đếm lên hoặc xuống từng dòng, từng khe để tìm các nốt khác.',
            en: 'From {G}, count up or down line by line and space by space to find the other notes.',
          },
        },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này là nốt gì?', en: 'What is this note?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'E4' }],
      answer: { type: 'key', note: 'E' },
      reason: {
        vi: 'Đếm xuống từ {G4}: dòng 2 là {G}, khe 1 là {F}, dòng 1 là {E}.',
        en: 'Count down from {G4}: line 2 is {G}, space 1 is {F}, line 1 is {E}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Khóa Fa', en: 'The bass clef' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: '**Khóa Fa** (bass clef) có hai chấm kẹp dòng 4, nên nốt trên dòng 4 là {F3}. Khóa Fa dùng cho các nốt thấp.',
            en: 'The **bass clef** has two dots either side of line 4, so a note on line 4 is {F3}. The bass clef is for low notes.',
          },
        },
        { type: 'staff', clef: 'bass', notes: 'F3', labels: 'names', highlight: [0] },
        { type: 'play', notes: 'F3', label: { vi: 'Nghe {F}', en: 'Hear {F}' } },
        { type: 'keys', notes: 'F3', from: 'C3', caption: { vi: '{F} trên phím đàn:', en: '{F} on the keys:' } },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Dòng kẻ phụ và khuông đôi', en: 'Ledger lines and the grand staff' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Nốt nằm ngoài khuông được viết trên **dòng kẻ phụ** (ledger lines), những đoạn dòng ngắn thêm vào.',
            en: 'Notes beyond the staff are written on **ledger lines**, short lines added above or below.',
          },
        },
        {
          type: 'text',
          text: {
            vi: '**Khuông đôi** (grand staff) ghép khuông khóa Sol ở trên với khuông khóa Fa ở dưới, như trong nhạc piano.',
            en: 'The **grand staff** joins a treble staff above a bass staff, as in piano music.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'F3 C4 G4 A5', labels: 'names', highlight: [1, 3] },
        { type: 'play', notes: 'F3 C4 G4 A5' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Nốt này là nốt gì?', en: 'What is this note?' },
      blocks: [{ type: 'staff', clef: 'bass', notes: 'D3' }],
      answer: { type: 'key', note: 'D' },
      reason: {
        vi: 'Đếm xuống từ {F3}: dòng 4 là {F}, khe 3 là {E}, dòng 3 là {D}.',
        en: 'Count down from {F3}: line 4 is {F}, space 3 is {E}, line 3 is {D}.',
      },
    },
  ],
} satisfies Lesson
```
