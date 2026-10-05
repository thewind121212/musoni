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
`architecture.md`, i18n). The switch is a small cycle button in the Luyện and Học headers
corner: a translate icon plus the current code (`VI` / `EN`), cycling to the
next language on tap. Its accessible label and tooltip name the target language
written in that language, so it stays findable to someone who cannot read the
current one. The document `lang` attribute follows the setting.

Two tabs (Luyện and Học), a first-open question, one route per drill and the
lesson routes; inside each drill route three phases. The sheet music is the
interface: no clutter around the staff.

## App routes

### Loading a drill

Each drill's code (VexFlow and its music font, about 425 kB gzipped) loads on its
own route chunk. Luyện starts fetching every registered drill's chunk when the
browser goes idle, so a tap on Bắt đầu or Luyện usually opens the drill at once. When it is not cached yet (a cold first
visit, or a direct link), a loading screen shows a small keyboard whose keys
press one after another and "Đang mở bài luyện…". It stays invisible for the
first 150 ms, so a quick load never flashes it.

Once the code is in, the drill route renders it directly (`app/routes`
`splitPage`) rather than through `React.lazy`: lazy suspends for a tick even on
cached code, and React then holds the Suspense fallback for ~300 ms, so every
open showed a blank page and the drill snapped in after the slide. Now the drill
slides in itself.

Moving forward to a page opens it at the top (`PageTransition` scrolls on
arrival; back and forward leave scroll to the browser). The slide-in's sideways
offset is clipped (`#root { overflow-x: clip }`), so it never makes the page
scroll sideways, and `<html>` keeps a stable scrollbar gutter, so pages of
different heights don't shift sideways as the scrollbar comes and goes.

### Tabs

Mockups: project files `screenshots/beginner-tabs/` (s1-s4). Principles: one
obvious next step per tab (one card, one amber button), progressive disclosure
(a beginner sees two drills; the rest open as lessons are finished), no empty
stats, a short Học list.

- **Luyện** (`/`, default) and **Học** (`/learn`). On a phone a bar pinned to
  the bottom (music note, open book; filled on the current tab), within thumb
  reach; from `md` a bar at the top with "musoni" on the left and the two tabs
  as a segmented control. Hidden inside drills, lessons, the chapter list and
  the first-open question.
- Switching tabs is **instant** (no slide). Học opened from Luyện's tab bar sits
  one history entry above it: back, a phone's edge-swipe and the Luyện tab all
  step back to Luyện. Luyện tapped on a Học opened any other way (a reload, a
  lesson's ✕ with no history) replaces it, so switching never piles up history.
  Tapping the current tab scrolls it to the top.
- The **paused-session bar** floats above the tab bar on both tabs (at the
  bottom on desktop): "Lượt tập đang tạm dừng · Còn 9:40 · 12 đúng, 2 sai" and
  a "Tập tiếp" / "Resume" in the paused drill's colour that goes back in and
  resumes straight away (route state `resume`). Starting that drill another
  way ends the paused session as an early end (see below).

### First open (`/welcome`)

A brand-new reader (no `startPoint`, no history at all) opening either tab
lands here first (replace). "Chào bạn. Bạn đã đọc được nốt nhạc chưa?", one line
("Để Musoni chọn điểm bắt đầu hợp với bạn. Đổi lại lúc nào cũng được."), two
large cards:
- **"Chưa, tôi mới bắt đầu"** ("Học bài đầu tiên: 3 phút"): saves
  `startPoint: beginner`, puts Học under it and opens lesson 1.1 (its ✕ steps
  back to Học).
- **"Rồi, tôi đọc được một ít"** ("Luyện đọc nốt: 1 phút"): saves `reader`,
  puts Luyện under it and starts Đọc nốt at level 1 for one minute
  (`READER_START_DRILL`, the drill's starter preset); back lands on Luyện.

Asked once. A reader with any history (sessions, lesson time or a finished
lesson, e.g. from before this question existed) never sees it. Học's
"Đổi điểm bắt đầu" opens it again with a back arrow; the choice then starts in
its place.

### Luyện (`/`)

- "Luyện" and the language switch in the header corner.
- **Hôm nay** card: today's **goal ring** (`GoalRing`, minutes against
  `DAILY_GOAL_MINUTES` = 5; green once met), the eyebrow "Hôm nay" / "Hôm nay ·
  còn 2 phút" / "Hôm nay · đã đạt mục tiêu", a **streak pill** (flame + days,
  shown while a streak runs; an unpractised today counts back from yesterday),
  the pick as "Đọc nốt nhạc · 1 phút", one line saying why, and one amber
  **Bắt đầu** that opens the drill with the pick as a preset (`autostart`).
  The pick (`app/practicePlan.pickToday`, pure and tested):
  1. the drill the **last finished lesson** links to (its practice preset), if
     not played since that lesson: "Vì bạn vừa học bài “Khuông nhạc và khóa”.";
  2. else the open drill **practised least recently**, a never-played one
     first: a never-played drill gets a gentle start at level 1 for one minute
     ("Bắt đầu nhẹ: gọi tên nốt khóa Sol, chỉ phím trắng." from the drill's
     `starter`); a played one the reader's own level and options ("Bạn chưa
     luyện bài này 3 ngày."); with every open drill played today, "Hôm nay bạn
     đã luyện mọi bài. Thêm một lượt bài này nhé?".
  The length fills what is left of the goal: 2 minutes while 2 or more are
  left, else 1 (`TODAY_LONG_SECONDS` / `TODAY_SHORT_SECONDS`). With lessons
  finished the pick waits for the lesson text chunk; the card keeps its place
  (ring shown, grey bars) meanwhile.
- **Bài luyện của bạn**: the open drills, in registry order (reading first,
  then ear), one `DrillCard` each (one column on a phone, two from `md`):
  - played at least once: icon, title and an amber **Luyện** pill (in the
    drill's colour; one tap into a session on the saved setup), then its
    Cấp độ / Thời lượng / Cao nhất strip (no level column for a drill with one
    level);
  - never played: icon, title, what it asks, and a **"Chưa tập"** chip, or a
    blue **"Mới mở"** chip when a lesson opened it since Luyện was last seen
    (`unlocksSeen`, marked on the visit it shows).
  Tapping a card anywhere else opens its setup (`setup` route state).
- **Unlocks**: a drill with `unlockedBy` (a lesson key) opens when that lesson
  is finished **or** the reader has played it (from Xem tất cả or a lesson's
  practice link). A lesson not written yet keeps it closed. Đọc nốt and Nghe &
  Đàn are open from the start; Ôn tập is never listed here.
- A dashed line counts the drills still to open: "✦ 3 bài luyện nữa mở dần khi
  bạn học. **Xem tất cả**". Xem tất cả shows them below as cards with a "Mở
  sau" chip (nothing is hard-locked: each opens its setup); "Thu gọn" hides
  them. Hidden when nothing is left to open.
- **Những ngày bạn luyện** (only once the reader has any history): the activity
  panel without its old today header:
  - **Short mode (default)**: this week as a row of seven squares, today ringed,
    weekday under each.
  - **Full mode**: a 20-week contribution calendar (one square per day, weeks
    left to right, weekdays top to bottom, month labels, Less/More legend),
    plus **longest streak** and **total active days**.
  - Shades are **absolute minutes** (0 / ≤2 / ≤5 / ≤10 / more), not quantiles
    of the user's own history, so a shade means the same thing forever.
  - The calendar is anchored on the current week, so today is always in the
    last column (`app/components/organisms/ActivityCalendar/activityWeeks.ts`, tested over 14 start days).
  - The mode is a persisted setting (`activityExpanded`). Switching is one box
    that resizes while the two views cross-fade, behind `prefers-reduced-motion`.

Luyện's blocks stagger in on the **first visit of a session only**
(`homeIntroPlayed` in the app store, never saved): coming back from a drill
shows it as it was.

### Học (`/learn`)

A lazy chunk (it carries the lesson text); Luyện prefetches it when idle.

- "Học" and the language switch.
- **Học tiếp** card (`NextLessonCard`): "Bài đầu tiên" for a new reader, else
  "Bài tiếp" (the first unfinished lesson in course order,
  `theory/outline.nextLesson`), the lesson's title, its first recap line, and
  one amber "Học · 3 phút" into it. With every lesson done: "Bạn đã học hết N
  bài", no button.
- **Ôn tập** (once a lesson is finished): Ôn tập's `DrillCard`, "Chưa tập" until
  played, then its Thời lượng / Cao nhất and a **Luyện** pill. Tapping it opens
  its setup.
- **The current chapter only**: "Chương 1 · Cao độ & khuông nhạc" with "2/5 bài"
  on the right, then its lessons (tick when done, blue ring and minutes on the
  next one). From `md`, Học tiếp and Ôn tập sit in the left column and the
  chapter in the right.
- One link to the other chapters ("8 chương khác", "Tất cả các chương" while
  there is one) to the full list at `/theory`, and "Đổi điểm bắt đầu".

### Back and motion

Moving forward to a route slides it in from the right, and the drill's own
phase changes cross-fade, so entering a drill and starting a session both read
as motion rather than as a swap.

Going **back** never animates. A phone's edge-swipe (and the browser's back and
forward buttons) has already shown the previous page, so a back or forward
navigation (`POP`) swaps routes with no exit fade and no slide-in: the tab is
simply there, as it was. The in-app back links (the setup caret, the result
screen's Home) step back through history too (`useBackLink`), so they look the
same and do not stack a new entry that a later swipe-back would land on.
Opened directly on a drill, with no in-app history, the back link goes to
Luyện (`/`; Ôn tập's to Học).

### Theory (`/theory`, `/theory/:chapter/:lesson`, `/theory/about`)

Mockups: project files `screenshots/theory-lessons/`; as built:
`screenshots/theory-ch01/`. Module design: `docs/theory/framework.md`. The three
pages are lazy chunks; Luyện prefetches the player when idle, and a
cold open shows the loading keyboard with "Đang mở bài học…".

**Chapter list** (`/theory`, reached from Học's other-chapters link; its back
arrow returns to Học): back arrow and "Lý thuyết âm nhạc", one line
("1 chương. Mỗi bài 3 đến 5 phút, học xong luyện ngay."), the note-naming
switch (Do Re Mi / C D E, the same setting the drills use), then one card per
chapter: number tile (filled blue for the chapter holding the next lesson),
title, "1/5 bài". The chapter with the next lesson opens by default; tapping a
header folds it (the choice is kept in the theory store while the app is
open). Each lesson row: a tick when done, a blue ring on the next one ("Bài tiếp
theo" for screen readers), its number otherwise; the title (bold on the next
one); and a tag: "♪ Đọc nốt" / "♪ Nghe & Đàn" when it ends with a practice
link, otherwise its minutes. Nothing is locked. "Về nội dung" at the bottom.

**Lesson player** (`/theory/:chapter/:lesson`): ✕ and a step bar on top, the
step in the middle, a sticky "Tiếp" (last step: "Xong") at the bottom in the
thumb zone. Steps slide in from the right (fade only with reduced motion).
- *Explain step*: eyebrow "Bài 1.2 · Khuông nhạc và khóa", title, then its
  blocks in order: text (bold glossary terms, note names in the reader's
  naming), staff (NoteStaff, names under the notes, chosen notes blue), a
  "Nghe …" pill and a caption with a small keyboard on one row, a keyboard, a
  blue tip box.
- *Check step*: eyebrow "Thử nhé", the prompt, what to look at, and either the
  answer pad at the bottom (the drills' piano or boxes, the reader's labels
  setting; a "where is the key" check hides the names) or a list of 2-4
  choices. "Tiếp" is off until it is answered; one answer only. Then a verdict
  pill ("Đúng: Mi" / "Chưa đúng: đây là Mi", or "Đúng" / "Chưa đúng" for
  choices, which mark the right one green and a wrong pick red) and the
  one-sentence reason. On a staff note check the printed note turns green and
  a wrong pick is drawn beside it in red, like the drills; with sound on, the
  note sounds. Desktop: Enter goes on, the drill's piano keys answer, 1-4 pick
  a choice.
- *End screen*: a green tick, "Xong bài 1.2" and the title, a card with "Bạn
  vừa học" (3-4 bullets) and "Kiểm tra: 3/4 đúng", then the amber-bordered
  "Luyện ngay điều vừa học" card (drill icon, name, "Khóa Sol · 1 phút", amber
  "Luyện ngay") and a quiet "Bài tiếp: Khóa Do →" link. A lesson with no fitting
  drill makes "Bài tiếp" the blue main button and adds "Ôn lại cả chương" under
  it. The source line closes the screen: "Phỏng theo *Music Theory for the
  21st-Century Classroom*, R. Hutchinson, mục 1.2 · GNU FDL 1.3", each section
  linking to the book page and the licence to `/theory/about`.

Back behaviour: ✕ forgets the place and goes back to where the lesson was
opened (a step back when it was opened from Học, the chapter list, the
first-open question or an Ôn tập result; otherwise it replaces the lesson with
Học, `/learn`). "Bài tiếp" *replaces* the lesson in history, so ✕ or a swipe back
from lesson 1.3 still lands on Học or the list, not on 1.2. Leaving any other way
(swipe back, a link) keeps the place: opening the same lesson again resumes it.
"Luyện ngay" pushes the drill with `{ autostart: true, preset }`; stepping back
from the drill (swipe, or its result's Home link, which steps back) shows the
lesson's end screen again, as it was. A fresh visit to a finished lesson starts
it over.

**About** (`/theory/about`, "Về nội dung"): the GFDL notice in the reader's
language: the original's title, author, copyright and link; its licence notice
(GFDL 1.2 or later, no Invariant Sections or cover texts); that the lessons are
a Modified Version under GFDL 1.3 with no Invariant Sections added; that every
example is ours; the History (2017 original, 2026 Musoni lessons); the chapters
adapted and their book sections (from the lessons' `sources`); and a link to the
full licence text (`/licenses/gfdl-1.3.txt`). Mirrors
`web/src/theory/content/NOTICE.md`.

### Note reading (`/train/note-id`)

One route, three phases held in the drill store. No URL change while training.

**Setup phase** carries everything that used to be a separate settings screen,
and fits one phone screen. Each group has a marked header (a small bordered
icon and the name). What a session practises keeps large controls: the clef
options are **row cards** (a real VexFlow clef on the left, name and range
beside it) and session length a pill row. The preferences that need no picture
share one list of rows: sharps and flats, names on keys and sound are **switches**, note
names a compact two-way segmented control. Groups stagger in on entry.

| Control | Options |
|---|---|
| Clef and range | Treble / Treble+ / Bass / Both (L1-L4), with a one-line description |
| Session length | 30s / 1 min / 2 min / 5 min / Other; Other reveals a 1-30 minute stepper |
| Sharps and flats | switch (adds # and b) |
| Note names | Do Re Mi (solfège, default) / C D E (letters) |
| Answer keys | Piano (default) / Ô (boxes), compact segmented control |
| Names on keys | switch, on by default. Off leaves the answer keys bare so the reader finds the note on the keyboard; after an answer the marked keys show their names |
| Sound | switch (hear each answer) |

A **sticky bar** at the bottom holds the start action, so it is on screen however
far the settings run: a one-line summary of the session ("Khóa Sol · 30 giây ·
♯ ♭"), the personal best for the chosen level (across all lengths), and an
amber **Start** button. It is `sticky`, not `fixed`, because the phase wrapper
animates a transform.

Opened with `autostart` (Luyện's Bắt đầu or a card's Luyện, a lesson's Luyện ngay), the drill skips setup and starts
before its first render, so setup never flashes. Opened with `setup` (a Luyện card's
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
page only from `<html>`, not `<body>`. The tabs, setup and result scroll as usual. The
browser's edge-swipe back can't be blocked by a page; it goes back to where the
reader came from (below).

The staff **holds still between questions**: the stave and clef are one layer
drawn once per clef, and the notes a second layer on top. A new question only
replaces the note layer, which fades in (`animate-note-in`); feedback recolours
the same note in place without replaying it. Before, the whole staff faded out
and back in on every answer.

The answer pad is a **fixed piano drawn like a real keyboard**: seven long white
keys side by side with their names at the foot, and the five black keys over the
top of the gaps (always drawn; pressable only with accidentals on), in the same
positions on every question. An **Answer keys** setting swaps it for the older
box layout (two rows of buttons). The piano pad's height follows the screen (about a
quarter of it, 136-160 px on phones, up to 176 px on desktop), and on short
screens the staff and its padding shrink, so the whole run screen fits without
scrolling at 320×568 and 1280×800 (see `drill-note-identification.md`). Feedback
fills the correct key green with a check and a wrong pick red with a cross; the
staff turns the printed note green and, on a miss, draws the picked note beside
it in red, and the line under the staff names it in words: "Đây là Sol, bạn
chọn La" / "That was G, you picked A". A correct answer advances after 260 ms,
a miss after 1.1 s.

**Leaving mid-session never runs the clock down unseen.** The clock pauses and
the session waits:

| How the reader leaves | What happens |
|---|---|
| ✕ or Esc, before any answer | nothing to keep: straight back to where the session started (the tab or lesson for "Bắt đầu" / "Luyện", setup for Start) |
| ✕ or Esc, after answering | **pause sheet**: "Đã tạm dừng", time left / right / wrong, a note that ending now is not scored but the time played still counts toward today's goal, amber "Tiếp tục tập" and a red-text "Kết thúc lượt" |
| switches app or locks the phone (page hidden) | pauses; on return the same sheet greets them: "Chào mừng quay lại", the time left large, the same two actions |
| back or edge-swipe during a session started from a tab ("Bắt đầu", "Luyện", or "Tập tiếp" on the paused bar) | **that tab**; the session pauses and the tab shows the paused-session bar (with no answers it is dropped) |
| back or edge-swipe during a session started from setup's Start | **setup**; the session ends, its played time still counts toward today's goal |
| back from the result | where the session started: the tab, or setup (and back from setup goes to the tab) |
| leaves the drill another way (home link from a deep link, closing the tab mid-way) | pauses and the tabs show the paused-session bar; with no answers the session is simply dropped |
| a page load mid-session (refresh, typing the drill's URL or `/`, a crash) | the session comes back paused: on the drill route the "Chào mừng quay lại" sheet with time left and answers so far; on the tabs the paused-session bar. Older than 30 min (`LIVE_SESSION_MAX_AGE_MS`), it is kept as ended early (its minutes count) and the drill starts fresh. Before, a page load dropped it: setup, nothing saved |

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

### Nghe & Đàn (`/train/hear-play`)

Same shape as note reading: one route, setup / run / result in the drill's own
store, the same back behaviour, pause sheet, early end and result screen. Design
and rules: `drill-hear-play.md`.

**Setup**: a one-line explanation under the title ("Một chuỗi hợp âm ngắn báo
giọng, rồi một nốt vang lên…"), then **Nốt và giọng**, four row cards, each with
a small keyboard with a violet dot on each of the level's notes (`MiniKeyboard`): Hợp âm chủ / Năm
nốt / Cả gam / Nửa cung. Then the same length picker (its own value, 2 min by
default), **Nghe** (two switches: "Nghe giọng trước mỗi nốt", "Giữ một giọng
(Do)", the second greyed at Hợp âm chủ with "Cấp này đã ở giọng Do") and
**Phím trả lời**: note names, Piano / Ô and names on keys, shared with note
reading. No sound switch: this drill is sound. The same sticky bar with summary
(plus "Mỗi câu nghe giọng" / "Một giọng" when on), best at the level, and a
**violet** Start: drill 2's action colour, also on its Luyện card's Luyện, the
pause sheet and its paused bar.

**Run**: the same header, time bar and pad. Under the bar, the key ("Giọng Fa
trưởng", in the reader's naming) with a blue **Đổi giọng** badge while a new
key's first note is being asked (only when the key really changed), and the
streak on the right. The middle is the
`ListenStage`: before the answer, a large ear in a soft blue circle that pulses
while sound plays, and "Đàn lại nốt vừa nghe"; the treble staff is laid out
underneath but hidden, so nothing jumps when it appears. Under it, a **Nghe
lại** button (with a `Space` hint on desktop). On answer the staff fades in with
the note (green, plus the pick in red on a miss), and the button's line becomes
the verdict: a green "Đúng là Mi" or the red "Nốt đúng là Sib, bạn đàn Re". The
key's home note on the pad carries a small blue dot (named "nốt chủ" for screen
readers). Checked to fit without scrolling at 320×568, 375×812 and 1280×800.

**Result**: drill 1's result screen. A session played with a listening aid adds
one line under the score, "Có trợ giúp nghe — không tính kỷ lục", and claims no
personal best.

### Ôn tập (`/train/review`)

Design: `drill-review.md`. Mockup: project files
`screenshots/theory-drills/6-theory-review.png`. Reached from Học only. Setup:
back caret (to Học), "Ôn tập", one line on what it asks, a switch per chapter
with finished lessons ("Chương 1 · Cao độ & khuông nhạc", "6 câu hỏi"; all on by
default, the last one on cannot be turned off), the length pills, naming and
sound, and the sticky bar ("2 phút · 6 câu hỏi", best, amber Bắt đầu). With no
lesson finished it says to finish one first and links to Học. Run: the drills'
header (✕, clock, ✓/✕ counts) and time bar, then the check exactly as in its
lesson, under "Bài 1.1 · Cao độ và tên nốt"; the verdict and the reason after
the answer; a sticky "Tiếp" (off until answered). A right answer moves on by
itself after 1.4 s; a wrong one waits for Tiếp (or Enter) so the reason can be
read. Result: the drills' summary ("Lượt Ôn tập", pace score, week average,
best), "Nên xem lại" listing each missed question once (×2 when missed twice)
with its lesson, each a link into that lesson (✕ there comes back to the
result), then Tập lại, Đổi thiết lập and "Học" (back to Học).

### Tiết tấu (`/train/rhythm`)

Design and rules: `drill-rhythm.md`. Mockup: project files
`screenshots/theory-drills/5-rhythm.png`. Same shape as the other drills: one
route, setup / run / result in its own store, the same back behaviour, pause
sheet, early end and result screen.

**Setup**: back caret, "Tiết tấu", one line ("Bốn tiếng click đếm vào, rồi gõ
từng nốt của ô nhịp cho đúng nhịp."), then **Trường độ**: four cards, each
with a small figure of its level on a bare staff (Tròn, trắng, đen / Móc đơn,
dấu lặng / Chấm dôi, dấu nối / 6/8 và liên ba). **Nhịp**: tempo pills
(60/80/100/120, hint "♩ = 80"), the **Click trong ô nhịp** switch, and **Độ trễ
khi gõ** ("Chưa hiệu chỉnh" or "Trừ 45 ms mỗi lần gõ") with a **Hiệu chỉnh**
button that opens the calibration panel in place: "Gõ theo 8 tiếng click",
eight dots that light with the clicks, a compact Gõ pad (Space works too),
"Phát tiếng click", and the outcome ("Đã lưu: 45 ms", or why to try again).
Then the length pills (2 min by default) and the sticky bar (summary with
"♩ = 80", best at the level, amber Bắt đầu, which also wakes the sound).

**Run**: the drills' header and time bar; under it the tempo ("♩ = 80", in
6/8 "♩. = 60") with "· đếm vào" or "· gõ", four count-in dots, and the streak
on the right. The measure on a percussion staff with its time signature; once
judged, a row of marks above the notes (green check, amber arrow, red cross;
extra taps as red crosses on a lower row) and the measure green when right. A
legend (Đúng nhịp · Sớm / trễ · Thiếu / thừa), the verdict line ("Đúng nhịp",
"Nốt thứ 2 trễ 157 ms"), and the big blue **Gõ** pad ("chạm, phím cách hoặc
phím chữ") at the bottom, in thumb reach. Busy measures on a phone draw their
marks smaller so they never touch. Checked to fit without scrolling at
320×568, 375×812, 390×844 and 1280×800.

**Result**: the drills' summary, with **Lệch TB** (mean tap offset, "34 ms")
as the third figure in place of time per answer; **Ô nhịp cần ôn** shows up
to four missed measures with their marks; then Tập lại / Đổi thiết lập / Trang
chủ.
