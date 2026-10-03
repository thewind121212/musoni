# Drill 2 — Nghe & Đàn (Hear & Play)

Train playing by ear: hear a note in a key and find it on the keyboard. This is
the app's second aim (react to a sound, place it in your head, play it on the
instrument), and the drill trains **relative pitch**: hearing a note by where it
sits in a key, not by its absolute pitch.

Route `/train/hear-play`, module `drills/hear-play`, store `useEarStore`.
Proposal and mockups: the Drill 2 artifact (2026-10-02). The user picked this
drill over "read the shape" (proposed as Drill 3) and Complete-the-Measure.

## One question

1. **Cadence**: I–IV–V–I in the key, which tells the ear where home is
   (`core/music/keys.cadence`).
2. **The note**: one note of the key, about half a second after the cadence.
3. The reader plays it on the **same 12-key piano pad** as note reading (same
   keyboard shortcuts, same Piano / Ô layouts, same names-on-keys setting). The
   key's home note (tonic) carries a small dot as a landmark.
4. **Reveal**: the note appears on a treble staff (it was hidden under a
   listening ear until then), and the sound teaches the answer:
   - right: the note **walks home** to the tonic (Mi Re Do; Sol La Si Do from
     the upper half), so the ear hears where it sits (`walkHome`);
   - wrong: **your note, then the right one**, both drawn on the staff, so the
     gap is heard and seen, not just shown in red.
5. After a hold (1.2 s right, 2.4 s wrong, long enough for the sound) the next
   question plays.

**Space** or **Nghe lại** replays the cadence and the note, free and as often
as wanted, until the answer.

The answer is the real key on the piano (fixed names): in G major the note a
third above the tonic is answered on Si, not on "Mi". That matches the goal of
playing what you hear on an instrument, and keeps the pad identical to note
reading. The tonic dot and the "Giọng Sol trưởng" line carry the key.

## When the cadence plays

At the start of each key, not before every note. A key lasts
`EAR_KEY_BLOCK` (6) questions, then moves to a different key of the level, and
the "Đổi giọng" badge shows. The cadence also plays on replay, when the run
screen opens (coming back to a session) and after every pause, because by then
the ear has lost the key. Playing it before every note is the steadier method
(Functional Ear Trainer does), but it doubles the time per question; replay
covers the moment a reader loses the key.

## Levels

| Level | Notes (semitones above the tonic) | Keys | Black keys answer | Weight |
|---|---|---|---|---|
| L1 Hợp âm chủ | Do Mi Sol (0, 4, 7) | C | no (landmarks) | ×1.0 |
| L2 Năm nốt | Do to Sol (0, 2, 4, 5, 7) | C, G, F | yes | ×1.3 |
| L3 Cả gam | the full major scale | C, G, F, D, B♭ | yes | ×1.6 |
| L4 Nửa cung | all 12 notes | C, G, F, D, B♭, A, E♭ | yes | ×2.0 |

The key moves from **L2 on**, not only at the top level: a key that never moves
drifts toward memorising pitches (absolute pitch), which is not the skill. Flat
keys spell their black keys as flats (Sib, Mib) and the rest as sharps
(`keySpelling`). Notes sit between the tonic and the octave above it, with
C/D/E♭/F tonics at octave 4 and G/A/B♭ at octave 3, so nothing climbs past E5.

Setup shows each level as a small keyboard with its notes lit (`MiniKeyboard`).

Within a key the same note never comes twice in a row (answered from memory of
the last sound, not by hearing it in the key).

Echo phrases (2–3 notes played back in order, the old "L5") are the planned
next step, after this drill has been tried.

## Listening aids

Two switches in setup's **Nghe** group, both off by default (`earCadenceEach`,
`earOneKey` in settings):

- **Nghe giọng trước mỗi nốt** (key before every note): the cadence plays before
  every question, not only when a key block starts. For a reader who keeps
  losing where home is; replay covers the occasional slip.
- **Giữ một giọng (Do)** (stay in one key): L2–L4 stay in C instead of moving
  every `EAR_KEY_BLOCK` questions, to learn the steps in one key first. Off by
  default because a key that never moves drifts toward memorising pitches. At
  L1 (already C only) the switch is disabled and says so.

A question carries two flags: `newKey`, a key block starts (the cadence plays;
in one key it is a refresher every 6 questions), and `keyChanged`, the key
really moved (the **Đổi giọng** badge). Before, L1 showed "Đổi giọng" every 6
questions without changing key.

Setup's summary line adds "Mỗi câu nghe giọng" / "Một giọng" when an aid is on.

## Session, score, pause

Same as note reading (see `drill-note-identification.md`):

- A timed session of its own length (`earDurationSec`, default **2 min**: a
  cadence takes about 2.5 s, so hearing takes longer than reading). Same length
  choices and Other stepper.
- `practiceScore` = pace × 10 × level weight × accuracy × endurance. The answer
  time runs from the moment the note sounds (`heard`), not from the cadence; an
  answer during the cadence counts as instant (a guess, which accuracy prices).
- Bests and week averages are per drill and level (`getBest('hear-play', level)`).
- ✕ / Esc pause, leaving the app or the route pauses, back during a session
  goes home or to setup (wherever it was started), ending early records a `partial` session: all shared
  with drill 1 through `useRunGuards`, `useDrillRoute` and the core
  `PausePanel`. Pausing also silences the sound.
- The result screen is drill 1's: score with difficulty and endurance chips,
  week-average bar, and the missed notes on small staves with what was played.

- A session played with an aid on (`earCadenceEach`, or `earOneKey` above L1)
  is saved with `aids: true`: it counts toward minutes, the streak and averages,
  but never sets a best (the aids make the drill easier, and the answer clock
  starts when the note sounds, so the extra cadence costs nothing). Its result
  says "Có trợ giúp nghe — không tính kỷ lục", shows no personal-best badge, and
  draws no best bar when there is no aid-free best yet.

Sound is always on in this drill; the note-id Sound switch does not apply.

Drill 2's action colour is **violet** instead of the app's amber (Start,
Practice on its home card, Again, the pause sheet's Continue, the paused bar
when the paused session is this drill's); see `architecture.md` Styling.

## Code

| Piece | Where |
|---|---|
| Keys, cadence, walk home | `core/music/keys.ts` (`KeyName`, `MAJOR_SCALE`, `tonicOf`, `noteInKey`, `cadence`, `walkHome`) |
| MIDI to a spelled note | `core/music/pitch.pitchFromMidi` |
| Scheduled notes and chords | `core/audio/playPitch.playSequence`, `stopSounds` |
| Question, sounds | `drills/hear-play/generator.ts` (`generateEarQuestion`, `questionSound`, `answerSound`, `chosenPitch`) |
| Session state | `drills/hear-play/store.ts` |
| Listening stage | `drills/hear-play/components/organisms/ListenStage` |
| Tunables | `config/constants.ts` `EAR_*` |
