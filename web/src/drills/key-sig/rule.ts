import type { Naming } from '@/core/music/types'
import type { Translate } from '@/core/i18n/translate'
import { label } from '@/core/music/pitch'
import { S } from './strings'
import { majorRule, tonicOf, type Mode, type NoteName } from './signatures'

const nameOf = (n: NoteName, naming: Naming) => label(n.letter, n.accidental, naming)

/** "La trưởng", "Fa# thứ": the key a signature stands for, in the reader's naming. */
export function keyName(fifths: number, mode: Mode, naming: Naming, t: Translate): string {
  return t(mode === 'major' ? S['key.major'] : S['key.minor'], { key: nameOf(tonicOf(fifths, mode), naming) })
}

/** "3 thăng", "1 giáng", "không dấu". */
function signatureText(fifths: number, t: Translate): string {
  if (fifths === 0) return t(S['signature.none'])
  return fifths > 0 ? t(S['signature.sharps'], { count: fifths }) : t(S['signature.flats'], { count: -fifths })
}

/**
 * The line under the staff once answered: the key and the rule that finds it
 * from the signature. "La trưởng: 3 thăng, thăng cuối Sol# + nửa cung";
 * "Mib trưởng: 3 giáng, giáng áp chót Mib"; "Do trưởng: không dấu"; "Fa
 * trưởng: một giáng". A minor key is found through its relative major: "Fa#
 * thứ: 3 thăng như La trưởng, xuống quãng 3 thứ".
 */
export function ruleText(fifths: number, mode: Mode, naming: Naming, t: Translate): string {
  const key = keyName(fifths, mode, naming, t)
  if (mode === 'minor') {
    return t(S['rule.minor'], { key, signature: signatureText(fifths, t), major: keyName(fifths, 'major', naming, t) })
  }
  const rule = majorRule(fifths)
  switch (rule.kind) {
    case 'none': return t(S['rule.none'], { key })
    case 'oneFlat': return t(S['rule.oneFlat'], { key })
    case 'sharps': return t(S['rule.sharps'], { key, count: rule.count, last: nameOf(rule.last, naming) })
    case 'flats': return t(S['rule.flats'], { key, count: rule.count, penultimate: nameOf(rule.penultimate, naming) })
  }
}
