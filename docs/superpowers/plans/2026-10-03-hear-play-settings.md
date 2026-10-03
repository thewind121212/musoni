# Nghe & Đàn listening aids + violet colour — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give drill 2 (Nghe & Đàn) two listening-aid switches, keep aided sessions out of bests, and give the drill a violet action colour instead of the app's amber.

**Architecture:** Two new persisted settings flow `progressStore` → app store → drill store (captured at `start`) → generator (`oneKey`) and run screen (`earCadenceEach`). `SessionResult.aids` marks aided sessions and `getBest` skips them. Colour is one CSS rule overriding Tailwind's `--color-cta*` on `[data-drill="hear-play"]`, set on `<html>` while the drill is open and on its home card / paused bar.

**Tech Stack:** React 19, Zustand, Tailwind v4 (`@theme` tokens), Vitest + Testing Library, react-router 7, motion, vaul.

**Spec:** `docs/superpowers/specs/2026-10-03-hear-play-settings-design.md`

## Global Constraints

- Project rules apply (`CLAUDE.md`): `impl-plan` working folder `tmp/03-10-2026-hear-play-settings/` before code; `fe-design` checklist (only pages read stores / `useT()` / progress; core components pure; persistence only via `progressStore`; tunables in `config/`); `doc-sync` (docs updated in the same change).
- Run tests from `web/`: `NODE_OPTIONS=--no-experimental-webstorage npx vitest run <path>` (local Node 25's built-in `localStorage` shadows jsdom's; CI on Node 22 doesn't need the flag).
- 6 tests in `src/drills/rhythm-tap/` fail before this work (unfinished, untracked drill). They are not this plan's concern; never `git add` rhythm-tap files or `web/package-lock.json`.
- Defaults: `earCadenceEach: false`, `earOneKey: false`.
- "An aid is on" = `earCadenceEach || (earOneKey && level > 1)`.
- Copy, exact: en "Listening" / "Key before every note" / "The key's chords play before each question" / "Stay in one key (C)" / "Learn the steps in one key before keys move" / "This level is already in C" / "Key every note" / "One key" / "Listening aids on — doesn't count toward your best". vi "Nghe" / "Nghe giọng trước mỗi nốt" / "Hợp âm báo giọng vang trước từng câu" / "Giữ một giọng (Do)" / "Luyện các bậc trong một giọng trước khi đổi" / "Cấp này đã ở giọng Do" / "Mỗi câu nghe giọng" / "Một giọng" / "Có trợ giúp nghe — không tính kỷ lục".
- Violet: light `--color-cta: oklch(0.55 0.2 300)`, `--color-cta-ink: oklch(0.99 0 0)`; dark `--color-cta: oklch(0.72 0.15 300)`, `--color-cta-ink: oklch(0.17 0.012 258)`. Override `--color-cta*`, never `--cta`.
- Unchanged: `--accent` (blue), `--correct`, `--wrong`; drill 1 stays amber.

## Review Focus

1. **Stored `earOneKey: true` + level 1** — the switch shows off and disabled, and the session is not marked aided (L1 is already C only). Pinned in Task 3 (store) and Task 5 (setup).
2. **Aided session with no aid-free best yet** — the result must not draw a "Best N" bar using the aided score. Pinned in Task 6.
3. **Saved progress from before this change** (no `earCadenceEach` / `earOneKey` keys) — loads with both off. Pinned in Task 1.
4. **Pause sheet inside drill 2** — it portals to `<body>`, so it must still be violet; `data-drill` is on `<html>` and removed when leaving. Pinned in Task 7 (unit) and the browser check.
5. **One key + the "Đổi giọng" badge** — no "new key" badge without a real key change, while the cadence still refreshes every `EAR_KEY_BLOCK` questions. Pinned in Task 2 and Task 4.

---

### Task 0: Working folder and branch

- [ ] **Step 1: Branch from up-to-date main**

```bash
cd /Users/kotomiichinose/Projects/musoni && git switch main && git pull --ff-only && git switch -c feat/hear-play-aids
```

- [ ] **Step 2: Create the impl-plan folder** `tmp/03-10-2026-hear-play-settings/` with `plan.md` (goal: link the spec; doc impact: `docs/fe/drill-hear-play.md`, `docs/fe/screens.md`, `docs/fe/data-model.md`, `docs/fe/architecture.md`, `docs/STATUS.md`; steps: Tasks 1–8 as checkboxes) and an empty `notes.md`. `tmp/` is gitignored.

---

### Task 1: Settings fields, `aids` flag, `getBest` skips aided sessions

**Files:**
- Modify: `web/src/progress/progressStore.ts` (`Settings`, `SessionResult`, `DEFAULTS`, `getBest`)
- Test: `web/src/progress/progressStore.test.ts`

**Interfaces:**
- Produces: `Settings.earCadenceEach: boolean`, `Settings.earOneKey: boolean`, `SessionResult.aids?: true`; `getBest(drill, level)` ignores `aids` sessions.

- [ ] **Step 1: Update the defaults fixture and add failing tests**

In `progressStore.test.ts`, change the `DEFAULT_SETTINGS` line
`keyLabels: true, padStyle: 'piano' as const, earLevel: 1 as const, earDurationSec: 120,` to:

```ts
  keyLabels: true, padStyle: 'piano' as const, earLevel: 1 as const, earDurationSec: 120,
  earCadenceEach: false, earOneKey: false,
```

Add inside `describe('progressStore', …)` after the existing `getBest picks highest…` test:

```ts
  it('getBest skips sessions played with listening aids', () => {
    recordSession(session({ drill: 'hear-play', practiceScore: 40 }))
    recordSession(session({ drill: 'hear-play', practiceScore: 90, aids: true }))
    expect(getBest('hear-play', 1)!.practiceScore).toBe(40)
  })
  it('counts aided sessions toward daily minutes', () => {
    recordSession(session({ drill: 'hear-play', durationSec: 120, aids: true }))
    expect(getDailyMinutes()[localDayKey(new Date('2026-08-28T10:00:00Z'))]).toBe(2)
  })
  it('loads progress saved before the listening aids with both off', () => {
    const old: Record<string, unknown> = { ...DEFAULT_SETTINGS }
    delete old.earCadenceEach
    delete old.earOneKey
    localStorage.setItem('musoni-progress-v1', JSON.stringify({ version: 1, settings: old, days: {} }))
    expect(getSettings()).toMatchObject({ earCadenceEach: false, earOneKey: false })
  })
```

- [ ] **Step 2: Run, expect failures** (defaults mismatch; aided 90 returned as best)

Run: `cd web && NODE_OPTIONS=--no-experimental-webstorage npx vitest run src/progress/progressStore.test.ts`
Expected: FAIL in `default settings` and `getBest skips sessions played with listening aids`.

- [ ] **Step 3: Implement**

In `Settings`, after `earDurationSec: number`:

```ts
  /**
   * Nghe & Đàn listening aids. `earCadenceEach`: the key's cadence before every
   * question, not only when the key changes. `earOneKey`: C at every level.
   * Both make the drill easier, so a session with one on never sets a best.
   */
  earCadenceEach: boolean
  earOneKey: boolean
```

In `SessionResult`, after `partial?: true`:

```ts
  /**
   * Played with a Nghe & Đàn listening aid on. Counts toward daily minutes,
   * the streak and averages, but `getBest` skips it. Absent otherwise.
   */
  aids?: true
```

In `DEFAULTS`, after `earDurationSec: EAR_DEFAULT_DURATION_SECONDS,`:

```ts
  earCadenceEach: false,
  earOneKey: false,
```

In `getBest`, change `&& !s.partial` to `&& !s.partial && !s.aids`.

- [ ] **Step 4: Run, expect pass**

Run: `cd web && NODE_OPTIONS=--no-experimental-webstorage npx vitest run src/progress/progressStore.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/progress/progressStore.ts web/src/progress/progressStore.test.ts
git commit -m "Add Nghe & Đàn listening-aid settings; aided sessions never set a best"
```

---

### Task 2: Generator — `keyChanged` and the `oneKey` option

**Files:**
- Modify: `web/src/drills/hear-play/generator.ts` (`EarQuestion`, `generateEarQuestion`)
- Test: `web/src/drills/hear-play/generator.test.ts`

**Interfaces:**
- Produces: `EarQuestion.keyChanged: boolean`; `generateEarQuestion(level, naming, previous, rng = Math.random, opts: { oneKey?: boolean } = {})`. `newKey` is unchanged in meaning: a key block starts, play the cadence.

- [ ] **Step 1: Write failing tests**

Change the `run` helper to take options:

```ts
/** Plays through `count` questions at a level, each fed the one before. */
function run(level: EarLevel, count: number, opts: { oneKey?: boolean } = {}) {
  const out: EarQuestion[] = []
  let prev: Parameters<typeof generateEarQuestion>[2] = null
  for (let i = 0; i < count; i++) {
    const q = generateEarQuestion(level, 'letters', prev, Math.random, opts)
    out.push(q)
    prev = { key: q.key, semitones: q.semitones, inKey: q.newKey ? 1 : prev!.inKey + 1 }
  }
  return out
}
```

Add to `describe('generateEarQuestion', …)`:

```ts
  it('stays in C at every level with oneKey, still refreshing the cadence each block', () => {
    for (const level of [2, 3, 4] as const) {
      const qs = run(level, EAR_KEY_BLOCK * 3, { oneKey: true })
      expect(qs.every(q => q.key === 'C')).toBe(true)
      expect(qs.map(q => q.newKey)).toEqual(qs.map((_, i) => i % EAR_KEY_BLOCK === 0))
      expect(qs.map(q => q.keyChanged)).toEqual(qs.map((_, i) => i === 0))
    }
  })

  it('flags keyChanged only on the first question and real key changes', () => {
    const qs = run(2, EAR_KEY_BLOCK * 4)
    qs.forEach((q, i) => expect(q.keyChanged).toBe(i === 0 || q.key !== qs[i - 1].key))
    const l1 = run(1, EAR_KEY_BLOCK * 3)
    expect(l1.map(q => q.keyChanged)).toEqual(l1.map((_, i) => i === 0))
  })
```

- [ ] **Step 2: Run, expect failures**

Run: `cd web && NODE_OPTIONS=--no-experimental-webstorage npx vitest run src/drills/hear-play/generator.test.ts`
Expected: FAIL (keys not all C; `keyChanged` undefined).

- [ ] **Step 3: Implement**

In `EarQuestion`, after `newKey: boolean`:

```ts
  /** First question, or a different key from the last one: the "new key" badge. */
  keyChanged: boolean
```

Change the signature and the key list in `generateEarQuestion`:

```ts
export function generateEarQuestion(
  level: EarLevel,
  naming: Naming,
  previous: (Pick<EarQuestion, 'key' | 'semitones'> & { inKey: number }) | null,
  rng: () => number = Math.random,
  opts: { oneKey?: boolean } = {},
): EarQuestion {
  const { notes, blackKeys } = EAR_LEVELS[level]
  // The "stay in one key" aid: C at every level. Off by default, since a key
  // that never moves drifts toward memorising pitches.
  const keys: readonly KeyName[] = opts.oneKey ? ['C'] : EAR_LEVELS[level].keys
```

(the rest of the body is unchanged). In the returned object, after `newKey,` (or wherever `newKey` is set), add:

```ts
    keyChanged: !previous || previous.key !== key,
```

Update the doc comment above `generateEarQuestion` with one line: "`keyChanged` says the key really moved (the badge); `newKey` says a block starts (the cadence), which in one key is a refresher."

- [ ] **Step 4: Run, expect pass**

Run: `cd web && NODE_OPTIONS=--no-experimental-webstorage npx vitest run src/drills/hear-play/generator.test.ts`
Expected: PASS (all generator tests, old and new).

- [ ] **Step 5: Commit**

```bash
git add web/src/drills/hear-play/generator.ts web/src/drills/hear-play/generator.test.ts
git commit -m "Nghe & Đàn generator: one-key option and a real key-change flag"
```

---

### Task 3: Store — pass `oneKey`, mark aided results

**Files:**
- Modify: `web/src/drills/hear-play/store.ts` (`start`, `nextQuestion`, `result`; new export `aidsOn`)
- Test: `web/src/drills/hear-play/store.test.ts`

**Interfaces:**
- Consumes: `generateEarQuestion(level, naming, previous, rng, { oneKey })` (Task 2); `Settings.earCadenceEach/earOneKey`, `SessionResult.aids` (Task 1).
- Produces: `export function aidsOn(settings: Pick<Settings, 'earCadenceEach' | 'earOneKey'>, level: EarLevel): boolean` — used by `result()` here; exported so the rule lives in one place.

- [ ] **Step 1: Write failing tests** (add to `describe('hear-play store', …)`)

```ts
  it('keeps every question in C when the session stays in one key', () => {
    store().start(3, { ...settings, earOneKey: true }, T0)
    for (let i = 0; i < 20; i++) {
      expect(store().question!.key).toBe('C')
      store().nextQuestion(T0)
    }
  })

  it('marks a session played with an aid, and only then', () => {
    store().start(2, { ...settings, earCadenceEach: true }, T0)
    store().tick(T0 + 120_000)
    expect(store().lastResult!.aids).toBe(true)
    store().start(2, settings, T0)
    store().tick(T0 + 120_000)
    expect(store().lastResult!.aids).toBeUndefined()
  })

  it('does not count one key as an aid at level 1, which is already in C', () => {
    store().start(1, { ...settings, earOneKey: true }, T0)
    store().tick(T0 + 120_000)
    expect(store().lastResult!.aids).toBeUndefined()
  })
```

- [ ] **Step 2: Run, expect failures**

Run: `cd web && NODE_OPTIONS=--no-experimental-webstorage npx vitest run src/drills/hear-play/store.test.ts`
Expected: FAIL (keys move at L3; `aids` undefined for the aided session).

- [ ] **Step 3: Implement**

Add after `playedMs`:

```ts
/** A listening aid is on. One key changes nothing at level 1, which is C only. */
export function aidsOn(s: Pick<Settings, 'earCadenceEach' | 'earOneKey'>, level: EarLevel) {
  return s.earCadenceEach || (s.earOneKey && level > 1)
}
```

In `result(...)`, after the `...(partial ? { partial: true as const } : {}),` line:

```ts
    ...(aidsOn(s.settings, s.level) ? { aids: true as const } : {}),
```

In `start`, change `question: generateEarQuestion(level, settings.naming, null), inKey: 1,` to:

```ts
      question: generateEarQuestion(level, settings.naming, null, Math.random, { oneKey: settings.earOneKey }), inKey: 1,
```

In `nextQuestion`, change the call to:

```ts
    const question = generateEarQuestion(s.level, s.settings.naming, {
      key: s.question.key, semitones: s.question.semitones, inKey: s.inKey,
    }, Math.random, { oneKey: s.settings.earOneKey })
```

- [ ] **Step 4: Run, expect pass**

Run: `cd web && NODE_OPTIONS=--no-experimental-webstorage npx vitest run src/drills/hear-play/store.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/drills/hear-play/store.ts web/src/drills/hear-play/store.test.ts
git commit -m "Nghe & Đàn store: stay in one key, mark aided sessions"
```

---

### Task 4: Run screen — cadence before every note; badge only on a real key change

**Files:**
- Modify: `web/src/drills/hear-play/pages/RunPhase/RunPhase.tsx` (the play effect around `const cadence = …`, the badge around `question.newKey && !feedback`)
- Test: `web/src/drills/hear-play/pages/RunPhase/RunPhase.test.tsx`

**Interfaces:**
- Consumes: `EarQuestion.keyChanged` (Task 2); `settings.earCadenceEach` on the drill store's session settings.

- [ ] **Step 1: Write failing tests** (add to `describe('Hear & play RunPhase', …)`)

```ts
  it('plays the cadence before every note when asked', () => {
    useEarStore.getState().start(2, { ...useAppStore.getState().settings, earCadenceEach: true }, Date.now())
    renderRun()
    press(q().options[q().correctIndex].keyHint)
    vi.mocked(playSequence).mockClear()
    act(() => { vi.advanceTimersByTime(2000) })
    expect(q().newKey).toBe(false)
    expect(lastPlayed()).toBe(5)
  })

  it('shows "New key" only when the key really changed', () => {
    useEarStore.setState(s => ({ question: { ...s.question!, newKey: true, keyChanged: false } }))
    renderRun()
    expect(screen.queryByText('New key')).toBeNull()
  })
```

- [ ] **Step 2: Run, expect failures**

Run: `cd web && NODE_OPTIONS=--no-experimental-webstorage npx vitest run src/drills/hear-play/pages/RunPhase/RunPhase.test.tsx`
Expected: FAIL (`lastPlayed()` is 1; badge shown).

- [ ] **Step 3: Implement**

In the play effect, change:

```ts
    const cadence = played.current === null || played.current === question || question.newKey
```

to:

```ts
    const cadence = played.current === null || played.current === question || question.newKey
      || s.settings.earCadenceEach
```

Update the comment above the effect with: "With the 'key before every note' aid, the cadence plays before every question."

Change the badge condition `question.newKey && !feedback` to `question.keyChanged && !feedback`.

- [ ] **Step 4: Run, expect pass**

Run: `cd web && NODE_OPTIONS=--no-experimental-webstorage npx vitest run src/drills/hear-play`
Expected: PASS (whole hear-play folder).

- [ ] **Step 5: Commit**

```bash
git add web/src/drills/hear-play/pages/RunPhase/RunPhase.tsx web/src/drills/hear-play/pages/RunPhase/RunPhase.test.tsx
git commit -m "Nghe & Đàn run: cadence before every note on request; badge on real key changes"
```

---

### Task 5: Setup — "Listening" group, disabled one-key at L1, summary tags

**Files:**
- Modify: `web/src/core/components/atoms/Switch/Switch.tsx` (add `disabled`)
- Test: `web/src/core/components/atoms/Switch/Switch.test.tsx`
- Modify: `web/src/core/i18n/translations.ts` (en + vi keys)
- Modify: `web/src/drills/hear-play/pages/SetupPhase/SetupPhase.tsx`
- Test: `web/src/drills/hear-play/pages/SetupPhase/SetupPhase.test.tsx`

**Interfaces:**
- Consumes: `Settings.earCadenceEach/earOneKey` (Task 1); the L1 rule is applied inline as `settings.earOneKey && level !== 1`, matching `aidsOn` (Task 3).
- Produces: `Switch` prop `disabled?: boolean`.

- [ ] **Step 1: Failing Switch test** (add to `describe('Switch', …)`)

```ts
  it('ignores presses when disabled', async () => {
    const onChange = vi.fn()
    render(<Switch checked={false} disabled label="Sound" onChange={onChange} />)
    expect(screen.getByRole('switch')).toBeDisabled()
    await userEvent.click(screen.getByRole('switch'))
    expect(onChange).not.toHaveBeenCalled()
  })
```

- [ ] **Step 2: Failing SetupPhase tests** (add to `describe('Hear & play SetupPhase', …)`)

```ts
  it('saves the listening aids, and greys out one key at level 1', async () => {
    renderSetup()
    await userEvent.click(screen.getByRole('switch', { name: 'Key before every note' }))
    expect(getSettings().earCadenceEach).toBe(true)
    expect(screen.getByRole('switch', { name: 'Stay in one key (C)' })).toBeDisabled()
    expect(screen.getByText('This level is already in C')).toBeInTheDocument()
  })

  it('lets one key be switched on from level 2', async () => {
    useAppStore.getState().updateSettings({ earLevel: 2 })
    renderSetup()
    await userEvent.click(screen.getByRole('switch', { name: 'Stay in one key (C)' }))
    expect(getSettings().earOneKey).toBe(true)
  })

  it('shows a stored one-key setting as off at level 1', () => {
    useAppStore.getState().updateSettings({ earLevel: 1, earOneKey: true })
    renderSetup()
    expect(screen.getByRole('switch', { name: 'Stay in one key (C)' })).toHaveAttribute('aria-checked', 'false')
    expect(screen.queryByText(/One key/)).toBeNull()
  })

  it('tags the summary with the aids in use', () => {
    useAppStore.getState().updateSettings({ earLevel: 3, earOneKey: true, earCadenceEach: true })
    renderSetup()
    expect(screen.getByText(/Key every note · One key/)).toBeInTheDocument()
  })
```

- [ ] **Step 3: Run, expect failures**

Run: `cd web && NODE_OPTIONS=--no-experimental-webstorage npx vitest run src/core/components/atoms/Switch src/drills/hear-play/pages/SetupPhase`
Expected: FAIL (no `disabled`; no switches named "Key before every note").

- [ ] **Step 4: Implement `Switch.disabled`**

```tsx
interface Props {
  checked: boolean
  onChange: (checked: boolean) => void
  /** Accessible name; the visible label sits beside the switch in its row. */
  label: string
  /** Shown but not changeable here (its row's hint says why). */
  disabled?: boolean
}

/** An on/off setting. Use for a yes-or-no choice that needs no picture. */
export function Switch({ checked, onChange, label, disabled = false }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={
        'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-150 ' +
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
        'disabled:cursor-not-allowed disabled:opacity-40 ' +
        (checked ? 'bg-accent' : 'bg-line')
      }
    >
```

(the inner `<span>` is unchanged).

- [ ] **Step 5: Add translations**

In `en`, after `'setup.ear.answer': 'Answer keys',`:

```ts
  'setup.ear.listen': 'Listening',
  'setup.ear.cadenceEach': 'Key before every note',
  'setup.ear.cadenceEach.hint': "The key's chords play before each question",
  'setup.ear.oneKey': 'Stay in one key (C)',
  'setup.ear.oneKey.hint': 'Learn the steps in one key before keys move',
  'setup.ear.oneKey.l1': 'This level is already in C',
  'setup.ear.tag.cadenceEach': 'Key every note',
  'setup.ear.tag.oneKey': 'One key',
  'result.ear.aids': "Listening aids on — doesn't count toward your best",
```

In `vi`, after `'setup.ear.answer': 'Phím trả lời',`:

```ts
  'setup.ear.listen': 'Nghe',
  'setup.ear.cadenceEach': 'Nghe giọng trước mỗi nốt',
  'setup.ear.cadenceEach.hint': 'Hợp âm báo giọng vang trước từng câu',
  'setup.ear.oneKey': 'Giữ một giọng (Do)',
  'setup.ear.oneKey.hint': 'Luyện các bậc trong một giọng trước khi đổi',
  'setup.ear.oneKey.l1': 'Cấp này đã ở giọng Do',
  'setup.ear.tag.cadenceEach': 'Mỗi câu nghe giọng',
  'setup.ear.tag.oneKey': 'Một giọng',
  'result.ear.aids': 'Có trợ giúp nghe — không tính kỷ lục',
```

- [ ] **Step 6: Implement the setup group and tags** in `SetupPhase.tsx`

Add `SpeakerHighIcon` to the `@phosphor-icons/react` import. Replace the `summary` array with:

```ts
  // One key changes nothing at level 1 (C only), so its switch is off and greyed there.
  const oneKey = settings.earOneKey && level !== 1
  const summary = [
    t(`ear.level.${level}` as 'ear.level.1'),
    formatDuration(settings.earDurationSec, t),
    ...(settings.earCadenceEach ? [t('setup.ear.tag.cadenceEach')] : []),
    ...(oneKey ? [t('setup.ear.tag.oneKey')] : []),
  ].join(' · ')
```

Insert into `groups`, between the `DurationPicker` and the `prefs` fieldset:

```tsx
    <fieldset key="listen" className="border-0 p-0">
      <FieldLegend icon={<SpeakerHighIcon size={15} weight="fill" />} label={t('setup.ear.listen')} />
      <div className="divide-y divide-line rounded-2xl border border-line bg-raised">
        <SettingRow label={t('setup.ear.cadenceEach')} hint={t('setup.ear.cadenceEach.hint')}>
          <Switch
            checked={settings.earCadenceEach}
            label={t('setup.ear.cadenceEach')}
            onChange={earCadenceEach => updateSettings({ earCadenceEach })}
          />
        </SettingRow>
        <SettingRow
          label={t('setup.ear.oneKey')}
          hint={t(level === 1 ? 'setup.ear.oneKey.l1' : 'setup.ear.oneKey.hint')}
        >
          <Switch
            checked={oneKey}
            disabled={level === 1}
            label={t('setup.ear.oneKey')}
            onChange={earOneKey => updateSettings({ earOneKey })}
          />
        </SettingRow>
      </div>
    </fieldset>,
```

- [ ] **Step 7: Run, expect pass**

Run: `cd web && NODE_OPTIONS=--no-experimental-webstorage npx vitest run src/core/components/atoms/Switch src/drills/hear-play src/core/i18n`
Expected: PASS (the i18n tests check en/vi key parity).

- [ ] **Step 8: Commit**

```bash
git add web/src/core/components/atoms/Switch web/src/core/i18n/translations.ts web/src/drills/hear-play/pages/SetupPhase
git commit -m "Nghe & Đàn setup: listening aids group, summary tags"
```

---

### Task 6: Result — aids line; no best bar built from an aided score

**Files:**
- Modify: `web/src/drills/hear-play/pages/ResultPhase/ResultPhase.tsx`
- Test: `web/src/drills/hear-play/pages/ResultPhase/ResultPhase.test.tsx`

**Interfaces:**
- Consumes: `SessionResult.aids` (Task 1), `'result.ear.aids'` (Task 5).

- [ ] **Step 1: Write failing tests**

Add `import { recordSession } from '@/progress/progressStore'` to the test imports, then add:

```ts
  it('says an aided session does not count toward the best, and claims no best', () => {
    recordSession(session({ drill: 'hear-play', level: 1, practiceScore: 25 }))
    useEarStore.setState({ phase: 'finished', lastResult: session({ drill: 'hear-play', practiceScore: 25, aids: true }) })
    renderResult()
    expect(screen.getByText("Listening aids on — doesn't count toward your best")).toBeInTheDocument()
    expect(screen.queryByText('Personal best')).toBeNull()
  })

  it('draws no best bar from an aided score when there is no plain best yet', () => {
    useEarStore.setState({ phase: 'finished', lastResult: session({ drill: 'hear-play', practiceScore: 25, aids: true }) })
    renderResult()
    expect(screen.queryByText('Best 25')).toBeNull()
  })

  it('shows no aids line for a plain session', () => {
    useEarStore.setState({ phase: 'finished', lastResult: session({ drill: 'hear-play', practiceScore: 25 }) })
    renderResult()
    expect(screen.queryByText(/Listening aids on/)).toBeNull()
  })
```

- [ ] **Step 2: Run, expect failures**

Run: `cd web && NODE_OPTIONS=--no-experimental-webstorage npx vitest run src/drills/hear-play/pages/ResultPhase`
Expected: FAIL (no aids line; "Personal best" shown because scores tie).

- [ ] **Step 3: Implement**

Replace the `isBest` / `bestScore` lines with:

```ts
  // An aided session never sets a best (see progressStore `aids`), so it is
  // measured only against plain bests, and draws no bar when there is none.
  const aided = result.aids === true
  const isBest = !aided && best !== null && best.practiceScore === result.practiceScore
  const bestScore = best?.practiceScore ?? (aided ? null : result.practiceScore)
```

Right after the `partial ? <EarlyEndSummary …/> : <ResultSummary …/>` block, add:

```tsx
        {aided && <p className="text-center text-sm text-ink-soft">{t('result.ear.aids')}</p>}
```

Change the compare condition to `{!partial && bestScore !== null && (average !== null || !isBest) && (` (the `ScoreCompare` body is unchanged; `bestScore` is now `number` inside it).

- [ ] **Step 4: Run, expect pass**

Run: `cd web && NODE_OPTIONS=--no-experimental-webstorage npx vitest run src/drills/hear-play`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add web/src/drills/hear-play/pages/ResultPhase
git commit -m "Nghe & Đàn result: aided sessions say they don't count for a best"
```

---

### Task 7: Violet action colour for drill 2

**Files:**
- Modify: `web/src/index.css` (after the `:root[data-theme="dark"]` block)
- Modify: `web/src/drills/hear-play/pages/HearPlayDrill/HearPlayDrill.tsx`
- Test: `web/src/drills/hear-play/pages/HearPlayDrill/HearPlayDrill.test.tsx`
- Modify: `web/src/app/pages/HomeScreen/HomeScreen.tsx` (wrap drill 2's `PracticeCard`; wrap `PausedNotice`)
- Test: `web/src/app/pages/HomeScreen/HomeScreen.test.tsx`

- [ ] **Step 1: Write failing tests**

`HearPlayDrill.test.tsx`, add:

```ts
  it('sets its colour scope on <html> while open, and removes it after', () => {
    const { unmount } = render(<MemoryRouter><HearPlayDrill /></MemoryRouter>)
    expect(document.documentElement.dataset.drill).toBe('hear-play')
    unmount()
    expect(document.documentElement.dataset.drill).toBeUndefined()
  })
```

`HomeScreen.test.tsx`, add (it already imports `useAppStore`, `screen`, `renderHome`):

```ts
  it("scopes drill 2's colour on its card and on its paused bar, not drill 1's", () => {
    useAppStore.setState({ pausedSession: { to: '/train/hear-play', secondsLeft: 60, correct: 1, wrong: 0 } })
    renderHome()
    const [noteId, hearPlay] = screen.getAllByRole('link', { name: /Practice now/ })
    expect(hearPlay.closest('[data-drill]')).toHaveAttribute('data-drill', 'hear-play')
    expect(noteId.closest('[data-drill]')).toBeNull()
    expect(screen.getByRole('link', { name: /Resume/ }).closest('[data-drill]')).toHaveAttribute('data-drill', 'hear-play')
  })
```

- [ ] **Step 2: Run, expect failures**

Run: `cd web && NODE_OPTIONS=--no-experimental-webstorage npx vitest run src/drills/hear-play/pages/HearPlayDrill src/app/pages/HomeScreen`
Expected: FAIL (no `data-drill` anywhere).

- [ ] **Step 3: CSS** — in `index.css`, after the `:root[data-theme="dark"] { … }` block:

```css
/* Nghe & Đàn's action colour: violet instead of the app's amber. The scope is
   <html> while the drill is open (its pause sheet portals to <body>), and its
   card and paused bar on home. It sets the Tailwind theme variables: @theme
   resolves --color-cta from --cta once, at :root, so overriding --cta lower
   down would change nothing. */
[data-drill="hear-play"] {
  --color-cta: oklch(0.55 0.2 300);
  --color-cta-ink: oklch(0.99 0 0);
}
[data-theme="dark"][data-drill="hear-play"],
[data-theme="dark"] [data-drill="hear-play"] {
  --color-cta: oklch(0.72 0.15 300);
  --color-cta-ink: oklch(0.17 0.012 258);
}
```

- [ ] **Step 4: HearPlayDrill** — add `useLayoutEffect` to the React import and, at the top of `HearPlayDrill()`:

```tsx
  // Drill 2's colour (index.css) on <html>, so the pause sheet, which portals
  // to <body>, is violet too. Layout effect: Start never paints amber first.
  useLayoutEffect(() => {
    document.documentElement.dataset.drill = 'hear-play'
    return () => { delete document.documentElement.dataset.drill }
  }, [])
```

- [ ] **Step 5: HomeScreen** — wrap drill 2's card:

```tsx
          <div data-drill="hear-play">
            <PracticeCard
              to="/train/hear-play"
              …unchanged props…
            />
          </div>
```

and the paused bar (the route's last segment is the drill id; only `hear-play` has a colour rule):

```tsx
      {pausedSession && (
        <div data-drill={pausedSession.to.split('/').pop()} className="contents">
          <PausedNotice
            …unchanged props…
          />
        </div>
      )}
```

- [ ] **Step 6: Run, expect pass; full suite, typecheck, lint**

Run:
```bash
cd web && NODE_OPTIONS=--no-experimental-webstorage npx vitest run 2>&1 | grep -E "FAIL|Tests " | grep -v rhythm-tap
npx tsc -b 2>&1 | grep error | grep -v "rhythm\|metronome\|RhythmStaff"
npx oxlint --deny-warnings src/app src/core src/drills/hear-play src/progress
```
Expected: only the 6 pre-existing rhythm-tap failures; no type errors outside rhythm files; lint clean.

- [ ] **Step 7: Real-browser check (production build, 375×812, light and dark)**

Build and serve: `cd web && npx vite build && npx vite preview --port 5198` (run in the background; stop it afterwards). With Playwright (`chromium.launch({ channel: 'chrome' })`), assert by computed style:
- home: drill 2's "Practice now" background is violet (hue ≈ 300 in `getComputedStyle(el).backgroundColor`, which Chrome reports as `oklch(...)` or `color(srgb ...)`; compare against drill 1's, which must stay amber);
- `/train/hear-play` setup: Start is violet; `document.documentElement.dataset.drill === 'hear-play'`;
- run screen → ✕ after one answer → the pause sheet's resume button is violet;
- back home: `dataset.drill` is gone and drill 1's buttons are amber;
- repeat with `document.documentElement.dataset.theme = 'dark'`;
- contrast: button text vs background ≥ 4.5:1 in both themes (compute from the two computed colours).
Record the numbers in `tmp/03-10-2026-hear-play-settings/notes.md`.

- [ ] **Step 8: Commit**

```bash
git add web/src/index.css web/src/drills/hear-play/pages/HearPlayDrill web/src/app/pages/HomeScreen
git commit -m "Give Nghe & Đàn a violet action colour"
```

---

### Task 8: Docs (doc-sync) and PR

**Files:**
- Modify: `docs/fe/drill-hear-play.md`, `docs/fe/screens.md`, `docs/fe/data-model.md`, `docs/fe/architecture.md`, `docs/STATUS.md`

- [ ] **Step 1: `drill-hear-play.md`** — new section "Listening aids" (the two switches, defaults, L1 rule, `keyChanged` vs `newKey`, the cadence refresher every block in one key); in "Session, score, pause" add: sessions with an aid carry `aids: true`, count toward minutes/streak/averages, never set a best, and the result says so; a "Colour" line: drill 2's action colour is violet (`[data-drill="hear-play"]`).

- [ ] **Step 2: `screens.md`** — in the Nghe & Đàn section: the setup's "Nghe" group (labels, hints, disabled at L1), summary tags, result line; home: drill 2's card and paused bar use violet.

- [ ] **Step 3: `data-model.md`** — `Settings.earCadenceEach`, `Settings.earOneKey` (defaults false); `SessionResult.aids?: true`; `getBest` skips `partial` and `aids` sessions.

- [ ] **Step 4: `architecture.md`** — theme tokens: a drill may override the action colour with one `[data-drill="<id>"]` rule that sets `--color-cta*`; the scope is `<html>` while the drill route is mounted (portalled sheets) plus home wrappers; never override `--cta`.

- [ ] **Step 5: `STATUS.md`** — "Last updated: <today>" and a Done entry listing the change and the docs touched.

- [ ] **Step 6: Commit, push, open PR**

```bash
git add docs/fe/drill-hear-play.md docs/fe/screens.md docs/fe/data-model.md docs/fe/architecture.md docs/STATUS.md docs/superpowers/specs/2026-10-03-hear-play-settings-design.md docs/superpowers/plans/2026-10-03-hear-play-settings.md
git commit -m "Docs: Nghe & Đàn listening aids and violet colour"
git push -u origin feat/hear-play-aids
gh pr create --base main --title "Nghe & Đàn: listening aids and its own violet colour" --body-file tmp/03-10-2026-hear-play-settings/pr-body.md
```

Write `tmp/03-10-2026-hear-play-settings/pr-body.md` first: a summary of the three parts, the test plan (unit tests per task, browser check numbers from notes.md), and a final line `🤖 Generated with [Claude Code](https://claude.com/claude-code)`. Merge only when the user says so.
