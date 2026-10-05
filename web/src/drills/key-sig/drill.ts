import { HashIcon } from '@phosphor-icons/react'
import { defineDrill } from '@/app/drill'
import { KEY_SIG_DEFAULT_DURATION_SECONDS } from '@/config/constants'
import { S, levelDetailKey, levelKey } from './strings'

/** Hóa biểu: read a key signature, tap its key's home note. Design: docs/fe/drill-key-sig.md. */
export default defineDrill({
  id: 'key-sig',
  page: () => import('./pages/KeySigDrill').then(m => m.KeySigDrill),
  icon: HashIcon,
  title: S.title,
  description: S.what,
  short: S.short,
  starter: S.starter,
  group: 'read',
  order: 20,
  levels: [1, 2, 3, 4].map(l => ({ name: levelKey(l), detail: levelDetailKey(l) })),
  defaults: { level: 1, durationSec: KEY_SIG_DEFAULT_DURATION_SECONDS },
  // Chapter 3's key-signature lesson. Until it is written, the drill opens
  // from "Xem tất cả" (and stays open once played).
  unlockedBy: 'major-scales-keys/key-signatures',
})
