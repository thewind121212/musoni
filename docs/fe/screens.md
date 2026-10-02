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
- Keyboard shortcuts (1-7 on the white keys, q w e r t on the black keys) are
  surfaced on `md:` and up,
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
  - **Today** in minutes practised, or "Not yet" with a nudge that one session
    keeps the streak going.
  - A **streak pill** (flame + days). An unpractised today does not break the
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
    last column (`app/activityWeeks.ts`, tested over 14 start days).
  - The mode is a persisted setting (`activityExpanded`), so the panel opens the
    way it was left. Switching is one box that resizes while the two views
    cross-fade, behind `prefers-reduced-motion`.
- Training list: the note-id card with a line saying what the drill asks, and
  three labelled stat chips (Level, Length, Best), then a disabled placeholder
  card for the Phase 2 rhythm drill.

Route changes slide in from the right, and the drill's own phase changes
cross-fade, so entering a drill and starting a session both read as motion
rather than as a swap.

### Note reading (`/train/note-id`)

One route, three phases held in the drill store. No URL change while training.

**Setup phase** carries everything that used to be a separate settings screen.
Each group has a marked header: a small bordered icon, the name, and a line
saying what the setting controls. Choices are cards with a visual, not text
pills: the clef options render real VexFlow clefs, note-naming shows the names
themselves, accidentals show the natural, sharp and flat signs, and sound uses
Phosphor icons. Session length is the exception: a wrapping **pill row**, since
time has no picture worth showing and five choices do not fit the two-column
card grid. Groups stagger in on entry.

| Control | Options |
|---|---|
| Clef and range | Treble / Treble+ / Bass / Both (L1-L4), with a one-line description |
| Session length | 30s / 1 min / 2 min / 5 min / Other; Other reveals a 1-30 minute stepper |
| Note names | Do Re Mi (solfège, default) / C D E (letters) |
| Sharps and flats | Naturals only / Include # and b |
| Sound | Play the note / Silent |

It also shows the personal best for the chosen level (across all lengths), then
a full-width Start button.

**Run phase** is the drill itself: a quit icon (X), a large tabular countdown
that turns red for the last ten seconds, the running correct count and streak,
a thin time bar, the staff on a raised surface, and the answer pad in the bottom
thumb zone.

The answer pad is a **fixed piano**: seven white keys along the bottom and, with
accidentals on, five black keys above the real gaps between them, in the same
positions on every question (see `drill-note-identification.md`). Feedback
fills the correct key green with a check and a wrong pick red with a cross; the
staff turns the printed note green and, on a miss, draws the picked note beside
it in red. A correct answer advances after 260 ms, a miss after 1.1 s.

**Result phase**: practice score with **difficulty** and **endurance**
multiplier chips, a four-tile grid (correct, accuracy, average answer, best
streak), a personal-best badge or the score to beat, then Again / Change setup /
Home.
