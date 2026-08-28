# FE Screens (Phase 1)

## Design principle: MOBILE-FIRST, ALWAYS

Training must be super comfortable on a phone — that's where quick daily practice
happens. Every screen is designed for a phone screen first, then adapted up to
desktop, never the other way around. Concretely:

- All tap targets (answer buttons especially) big and thumb-reachable, bottom half of the screen.
- Staff sized to be instantly readable on a small screen.
- One-hand portrait use is the default posture; no hover-dependent UI.
- Test every screen at mobile viewport first (~375px wide) before desktop.

Two app routes, and inside the drill route three phases. The sheet music is the
interface: no clutter around the staff.

## App routes

### Home (`/`)

- Title and one-line purpose.
- **Last 7 days** chart: daily practice score, today highlighted, plus the week
  total and how many days were active.
- Training list: the note-id card (current level and best score), and a disabled
  placeholder card for the Phase 2 rhythm drill.

### Note reading (`/train/note-id`)

One route, three phases held in the drill store. No URL change while training.

**Setup phase** carries everything that used to be a separate settings screen:

| Control | Options |
|---|---|
| Level | Treble / Treble+ / Bass / Both (L1-L4), with a one-line description |
| Session length | 30s / 1 min / 2 min / 5 min |
| Note names | C D E (letters) / Do Re Mi (solfege) |
| Sharps and flats | Naturals only / Include # and b |
| Sound | Play the note / Silent |

It also shows the personal best for the chosen level **and** length, then a
full-width Start button.

**Run phase** is the drill itself: Quit, a large tabular countdown that turns red
for the last ten seconds, the running correct count and streak, a thin time bar,
the staff on a raised surface, and the answer grid in the bottom thumb zone.
Feedback fills the correct key green with a check and a wrong pick red with a
cross, then auto-advances.

**Result phase**: practice score with the difficulty multiplier, a four-tile grid
(correct, accuracy, average answer, best streak), a personal-best badge or the
score to beat, then Again / Change setup / Home.
