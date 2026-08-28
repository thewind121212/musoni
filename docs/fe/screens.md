# FE Screens (Phase 1)

## Design principle: MOBILE-FIRST, ALWAYS

Training must be super comfortable on a phone — that's where quick daily practice
happens. Every screen is designed for a phone screen first, then adapted up to
desktop, never the other way around. Concretely:

- All tap targets (answer buttons especially) big and thumb-reachable, bottom half of the screen.
- Staff sized to be instantly readable on a small screen.
- One-hand portrait use is the default posture; no hover-dependent UI.
- Test every screen at mobile viewport first (~375px wide) before desktop.

Four screens, minimal. The sheet music is the interface — no clutter around the staff.

## 1. Home / Drill Picker

- Card for Note Identification (Phase 1: the only active card; Complete-the-Measure
  card appears in Phase 2): shows current level, best score, accuracy at a glance.
- "Your week" strip: practiceScore + accuracy trend over last 7 days.
- Settings gear in the corner.

## 2. Drill Screen

- Staff rendered big and centered (VexFlow).
- 7–8 answer buttons below, thumb-reachable.
- Timer + progress at top, streak indicator.
- Instant green/red feedback, correct answer shown on miss, auto-advance.

## 3. Results Screen

- Session: practiceScore, correct count, accuracy, average response time, best streak.
- Comparison with previous best (same level + settings combo).
- Buttons: Again / Next level / Home.

## 4. Settings

- Note naming: Letters / Solfège
- Accidentals: on / off
- Sound: on / off

Flow: Home → Drill → Results → (Again | Home). Settings reachable from Home.
