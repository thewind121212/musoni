# Ôn tập (Review)

A timed session over the questions of the lessons the reader has finished. It
keeps what a lesson taught from fading: each question comes back exactly as the
lesson asked it, with its reason, and the ones answered wrong come back more
often.

Route `/train/review`, module `drills/review`, store `useReviewStore`. Screens:
`screens.md`, "Ôn tập". Mockup: project files
`screenshots/theory-drills/6-theory-review.png`.

## Where it lives

- A registered drill (`drills/review/drill.ts`), so routes, the loading screen,
  prefetch, the live session, the paused bar and bests all work as for any
  drill. It is **not listed** (`listed: false`): it is not on Luyện, Hôm nay
  never picks it, and it is not counted among the drills still to open.
- Reached from **Học** only: its card appears there once a lesson is finished.
  Its back caret and the result's "Học" go back to Học.
- Its time counts toward the day like any session (`drill: "review"`).

## The pool

Every `check` step of every finished lesson (`theory.done`) in the chosen
chapters, in course order (`select.reviewPool`). A question's id is
`<chapter id>/<lesson id>/<step index>`; `findCheck` turns an id back into the
question, or null when the lesson has changed since.

Setup offers one switch per chapter with at least one finished lesson
(`chaptersWithDone`). The choice is saved as `settings.drills.review.chapters`:
null means every chapter with a finished lesson (the default, so a chapter
finished later joins without being turned on); otherwise a list of chapter ids.
The last chapter on cannot be turned off (`toggleChapter`), and a saved choice
that no longer matches any offered chapter falls back to all
(`chosenChapters`). With no lesson finished, setup says so and links to Học;
Bắt đầu is off.

## Weighting

The next question is a weighted random pick (`pickCheck`) from the pool,
leaving out the last `REVIEW_NO_REPEAT` (3) asked, or fewer when the pool is
small, so nothing comes straight back. A question's weight comes from its last
answer (`checkWeight`, tunables `REVIEW_WEIGHT` in `config/constants.ts`):

| Last answer | Weight |
|---|---|
| never answered | 3 (`unseen`) |
| answered | 1 (`base`) + 0.25 per day since, counting at most 14 days |
| answered wrong | the above + 6 (`missed`) |

So a question just missed is about seven times as likely as one just answered
right, and one left alone for two weeks climbs back to 4.5.

**History** lives in progressStore (`review`, see `data-model.md`): one entry
per question ever answered, with when and whether it was missed. Only the latest
answer counts, so one right answer clears a miss. `recordReviewAnswer` writes it
on every answer, also for a session that is later quit.

## Session

- **Run**: the drills' header (✕, clock, ✓/✕ counts), the time bar, then the
  question as the lesson's `StepView` shows it, under its lesson's eyebrow
  ("Bài 1.1 · Cao độ và tên nốt"). After an answer the verdict and the
  question's reason show. A right answer moves on by itself after
  `REVIEW_FEEDBACK_CORRECT_MS` (1.4 s); a wrong one waits for **Tiếp** (sticky,
  off until answered) or Enter, so the reason can be read. Keys: 1-4 for
  choices, the piano keys for key questions (`answerFromKey`), Enter for Tiếp,
  Esc to pause.
- **Pause**: the drills' pause sheet and pause on leaving the tab or the app.
  The live session is kept (`keepLiveSession`) with question ids only; the tabs'
  paused bar resumes it.
- **Result**: the drills' summary (pace score, week average, best), then
  **Nên xem lại**: each missed question once (×2 when missed twice), with its
  lesson, each a link into that lesson (its ✕ comes back to the result). Then
  Tập lại, Đổi thiết lập, Học.

## Levels and bests

No levels: the entry declares one level (named "Ôn tập"), so every session is
`level: 1` with the difficulty `REVIEW_DIFFICULTY`, and the best and averages
are per length as for other drills. Setup shows no level picker.

## Reuse

The lesson's own components, promoted to `core/lesson` and `core/components`:
`StepView`, `usePlayBlock`, `answerFromKey`. The drills' `RunHeader`,
`ProgressBar`, `PausePanel`, `DurationPicker`, `ResultSummary` and
`ScoreCompare`. Its own: `MissedChecks` (result list).

## Code

| Part | File |
|---|---|
| Registry entry (one level, defaults, `listed: false`), strings | `drills/review/drill.ts`, `drills/review/strings.ts` |
| Pool, weighting, chapter choice (pure, tested) | `drills/review/select.ts` |
| Session state | `drills/review/store.ts` |
| Pages | `drills/review/pages/{ReviewDrill,SetupPhase,RunPhase,ResultPhase}` |
| Missed list | `drills/review/components/organisms/MissedChecks` |
| History | `progress/progressStore.ts` (`getReviewMarks`, `recordReviewAnswer`) |
