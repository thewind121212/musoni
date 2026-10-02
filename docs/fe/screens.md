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
- Keyboard shortcuts (piano layout: `A`-`J` white keys, `W E T Y U` black keys) are surfaced on `md:` and up,
  where a physical keyboard is likely, and hidden on phones where they are noise.
- Check every screen at ~375px first, then at a desktop width. Both must look
  deliberate.

Breakpoint: `md` (768px) is the single hinge between the two layouts.

Two app routes, and inside the drill route three phases. The sheet music is the
interface: no clutter around the staff.

## App routes

### Home (`/`)

- Title and one-line purpose.
- **Last 7 days** chart: daily practice score, today highlighted, plus the week
  total and how many days were active.
- Training list: the note-id card, whose level / length / best sit in one
  three-column `StatStrip` (equal columns, labels and values wrap, so it fits a
  320px phone), and a disabled
  placeholder card for the Phase 2 rhythm drill. The card's call to action is a
  "Luyện tập" / "Practice" label (it replaced a bare `>` arrow): beside the
  title from `sm` up, on its own line under the title on phones so the title
  and description keep their width.

Route changes slide in from the right, and the drill's own phase changes
cross-fade, so entering a drill and starting a session both read as motion
rather than as a swap. Home's blocks stagger in on the **first visit of a
session only** (`homeIntroPlayed` in the app store, never saved): coming back
from a drill shows home as it was instead of blanking every block and building
it up again.

### Note reading (`/train/note-id`)

One route, three phases held in the drill store. No URL change while training.

**Setup phase** carries everything that used to be a separate settings screen.
Every choice is a card with a visual, not a text pill: the clef options render
real VexFlow clefs, note-naming shows the names themselves, accidentals show the
natural, sharp and flat signs, and session length and sound use Phosphor icons.
Groups stagger in on entry.

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
for the last ten seconds centred in a three-column header, a green check pill
with the right-answer count and a red cross pill with the wrong-answer count, a
thin time bar with the streak (3+) on a fixed-height line under it,
the staff on a raised surface, and the answer keys in the bottom thumb zone laid
out in full-width rows of at most four.
Feedback fills the correct key green with a check and a wrong pick red with a
cross, then auto-advances.

**Result phase**: practice score with the difficulty multiplier, a four-tile grid
(correct, accuracy, average answer, best streak), a personal-best badge or the
score to beat, then Again / Change setup / Home.
