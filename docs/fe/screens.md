# FE Screens (Phase 1)

## Design principle: MOBILE-FIRST TECHNIQUE, HYBRID TARGET

Training must be super comfortable on a phone, because that is where quick daily
practice happens. But desktop is a first-class target too, not a stretched phone
column: a 448px strip marooned in the middle of a wide screen is a bad desktop
app.

So the *technique* stays mobile-first (base styles are the phone layout, `md:`
adds the desktop one, never the reverse) while the *target* is both:

- All tap targets, answer keys especially, stay big and thumb-reachable in the
  bottom half of the phone screen.
- Staff is instantly readable on a small screen, and grows on a large one.
- One-hand portrait is the default phone posture; nothing depends on hover.
- Desktop widens the container, enlarges the staff, timer and answer keys, and
  moves multi-group layouts into columns rather than one long scroll.
- Keyboard shortcuts (piano layout: `A`-`J` white keys, `W E T Y U` black keys)
  are surfaced on `md:` and up,
  where a physical keyboard is likely, and hidden on phones where they are noise.
- Check every screen at ~375px first, then at a desktop width. Both must look
  deliberate.

Breakpoint: `md` (768px) is the single hinge between the two layouts.

## Language

Vietnamese is the default UI language, English the alternative (see
`architecture.md`, i18n). The switch is a small cycle button in the home header
corner: a translate icon plus the current code (`VI` / `EN`), cycling to the
next language on tap. Its accessible label and tooltip name the target language
written in that language, so it stays findable to someone who cannot read the
current one. The document `lang` attribute follows the setting.

Two app routes, and inside the drill route three phases. The sheet music is the
interface: no clutter around the staff.

## App routes

### Home (`/`)

- Title, one-line purpose, and the language switch in the header corner.
- **Activity panel**, leading with where the user stands now:
  - **Today** as a **goal ring** (`GoalRing`): minutes practised against a
    daily goal of `DAILY_GOAL_MINUTES` (5, in `config/`), with a line beside it
    saying how many minutes are left ("Còn 3 phút để đạt mục tiêu"), that the
    goal is reached, or "Not yet" with a nudge that one session keeps the streak
    going. The ring turns green once the goal is met.
  - A **streak pill** (flame + days) under that line. An unpractised today does not break the
    streak until the day is over, so it counts back from yesterday and shows
    what is still there to keep. The pill is filled once today is practised.
  - **Short mode (default)**: this week as a row of seven squares, today ringed,
    weekday under each.
  - **Full mode**: a 20-week contribution calendar (one square per day, weeks
    left to right, weekdays top to bottom, month labels, Less/More legend),
    plus **longest streak** and **total active days**.
  - Shades are **absolute minutes** (0 / ≤2 / ≤5 / ≤10 / more), not quantiles
    of the user's own history, so a shade means the same thing forever.
  - The calendar is anchored on the current week, so today is always in the
    last column (`app/components/organisms/ActivityCalendar/activityWeeks.ts`, tested over 14 start days).
  - The mode is a persisted setting (`activityExpanded`), so the panel opens the
    way it was left. Switching is one box that resizes while the two views
    cross-fade, behind `prefers-reduced-motion`.
- Training list: the note-id card with a line saying what the drill asks, its
  Level / Length / Best in one three-column `StatStrip` (equal columns, labels
  and values wrap, so it fits a 320px phone), then a disabled placeholder card
  for the Phase 2 rhythm drill. The card is **one tap to practise**: a
  full-width amber "Luyện ngay" / "Practice now" button (`--cta`, never the blue
  accent) opens the drill with `autostart` in the route state, so a session
  starts straight away on the setup the stats show. A quieter underlined
  "Đổi thiết lập" / "Change setup" link under it opens the setup phase instead.
  From `sm` up the button sits on the right with the link to its left.
- **Paused-session bar**: when the reader left a session mid-way (back,
  swipe), a dark bar floats at the bottom: "Lượt tập đang tạm dừng · Còn
  9:40 · 12 đúng, 2 sai" with an amber "Tập tiếp" / "Resume" that goes back in
  and resumes straight away (route state `resume`). "Luyện ngay" or "Đổi thiết
  lập" instead ends the paused session as an early end (see below).

Moving forward to a route slides it in from the right, and the drill's own phase changes
cross-fade, so entering a drill and starting a session both read as motion
rather than as a swap. Home's blocks stagger in on the **first visit of a
session only** (`homeIntroPlayed` in the app store, never saved): coming back
from a drill shows home as it was instead of blanking every block and building
it up again.

Going **back** never animates. A phone's edge-swipe (and the browser's back and
forward buttons) has already shown the previous page, so a back or forward
navigation (`POP`) swaps routes with no exit fade and no slide-in: home is
simply there, as it was. The in-app back links (the setup caret, the result
screen's Home) step back through history too (`useBackLink`), so they look the
same and do not stack a new entry that a later swipe-back would land on.
Opened directly on a drill, with no in-app history, the back link goes to `/`.

### Note reading (`/train/note-id`)

One route, three phases held in the drill store. No URL change while training.

**Setup phase** carries everything that used to be a separate settings screen,
and fits one phone screen. Each group has a marked header (a small bordered
icon and the name). What a session practises keeps large controls: the clef
options are **row cards** (a real VexFlow clef on the left, name and range
beside it) and session length a pill row. The preferences that need no picture
share one list of rows: sharps and flats and sound are **switches**, note
names a compact two-way segmented control. Groups stagger in on entry.

| Control | Options |
|---|---|
| Clef and range | Treble / Treble+ / Bass / Both (L1-L4), with a one-line description |
| Session length | 30s / 1 min / 2 min / 5 min / Other; Other reveals a 1-30 minute stepper |
| Sharps and flats | switch (adds # and b) |
| Note names | Do Re Mi (solfège, default) / C D E (letters) |
| Sound | switch (hear each answer) |

A **sticky bar** at the bottom holds the start action, so it is on screen however
far the settings run: a one-line summary of the session ("Khóa Sol · 30 giây ·
♯ ♭"), the personal best for the chosen level (across all lengths), and an
amber **Start** button. It is `sticky`, not `fixed`, because the phase wrapper
animates a transform.

Opened with `autostart` (home's start button), the drill skips setup and starts
before its first render, so setup never flashes. Opened with `setup` (home's
change-setup link), it goes to the setup phase even if the store still holds a
finished or abandoned session. Either flag is then dropped from history, so a
refresh does not apply it again.

**Run phase** is the drill itself. The header is three columns
(`1fr auto 1fr`, so long counts never push into the timer): a quit icon (X), a
large tabular countdown centred that turns red for the last ten seconds, and a
green check pill with the right-answer count beside a red cross pill with the
wrong-answer count (each with screen-reader text). Under the thin time bar sits
the streak (3+) on a fixed-height line, so the staff does not jump when it
appears. Then the staff, large and straight on the page (no card; a narrower
notation width, `QUESTION_STAFF_WIDTH`, scales the note up about 1.5x on a
phone), a fixed-height line under it, and the answer pad in the bottom thumb
zone.

The run screen is **locked in place** on phones. While it is open, `<html>` has
`overscroll-behavior: none` (set by `RunPhase`, removed when it unmounts), so a
vertical drag neither bounces the page nor pulls it down to refresh. The surface
itself has `touch-action: none`, so drags never pan, pinch or double-tap zoom,
while taps on the keys still answer. Browsers read the overscroll setting for the
page only from `<html>`, not `<body>`. Home, setup and result scroll as usual. The
browser's edge-swipe back can't be blocked by a page; it pauses the session (below).

The staff **holds still between questions**: the stave and clef are one layer
drawn once per clef, and the notes a second layer on top. A new question only
replaces the note layer, which fades in (`animate-note-in`); feedback recolours
the same note in place without replaying it. Before, the whole staff faded out
and back in on every answer.

The answer pad is a **fixed piano**: seven white keys along the bottom and, with
accidentals on, five black keys above the real gaps between them, in the same
positions on every question (see `drill-note-identification.md`). Feedback
fills the correct key green with a check and a wrong pick red with a cross; the
staff turns the printed note green and, on a miss, draws the picked note beside
it in red, and the line under the staff names it in words: "Đây là Sol, bạn
chọn La" / "That was G, you picked A". A correct answer advances after 260 ms,
a miss after 1.1 s.

**Leaving mid-session never runs the clock down unseen.** The clock pauses and
the session waits:

| How the reader leaves | What happens |
|---|---|
| ✕ or Esc, before any answer | straight back to setup; nothing to keep |
| ✕ or Esc, after answering | **pause sheet**: "Đã tạm dừng", time left / right / wrong, a note that ending now is not scored but the time played still counts toward today's goal, amber "Tiếp tục tập" and a red-text "Kết thúc lượt" |
| switches app or locks the phone (page hidden) | pauses; on return the same sheet greets them: "Chào mừng quay lại", the time left large, the same two actions |
| back or swipe to home | pauses and home shows the paused-session bar; with no answers the session is simply dropped |

Both are one bottom sheet (`PausePanel`, built on `vaul`) on every width,
centred and at most `max-w-md` on desktop. It slides up and back down, drags
down, and closes on Esc or a tap on the scrim; every way of closing it resumes.
Time left is a clock ("9:40", "0:18", `formatClock`), never words, so a
30-minute session fits its third of the sheet at 320px; the run timer uses the
same clock from a minute up and bare seconds below.

While paused the run screen is `inert` under a scrim and answer keys are
ignored; paused time is handed back on resume, so the per-note time stays
honest.

**Kết thúc lượt** ends the session as a *partial* one (`partial: true` in
progress): its minutes count toward today's goal and the streak, but it has no
score and never touches the best or the week average.

**Result phase**: practice score with **difficulty** and **endurance**
multiplier chips and a personal-best badge, plus a chip with the change against
this week's average at the level ("+14 so với tuần này"). Then one row of four
figures (correct, accuracy, time per note, best streak) and a **comparison bar**
(`ScoreCompare`): the score as a fill, the week average as a tick, the best as
the end of the track, captioned "Trung bình tuần 172 · Kỷ lục 219 · còn 33". A
first session at a level, with nothing to compare, skips the bar.

**Notes to review** lists the session's misses, each on a small staff with the
answer and what was picked ("bạn chọn La ×2"); the same note read the same wrong
way counts once, most repeated first, up to six. Misses live in the drill store
for the session only and are not saved.

Then **Again** (amber, since it starts practice) / Change setup / Home.

A session **ended early** gets its own result: a grey "Kết thúc sớm" pill, "Bạn
đã tập 12 giây" as the headline, a line saying it is not scored and does not
touch the best but the time counts, a goal ring with today's minutes, the same
four figures and notes to review, then amber "Tập lượt mới" / Change setup /
Home. No score, no comparison bar.
