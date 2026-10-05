import { createElement } from 'react'
import { DotIcon } from '@phosphor-icons/react'
import { defineDrill, type DrillDefinition, type DrillOptions } from '@/app/drill'
import { defineStrings } from '@/core/i18n/translate'

const S = defineStrings('fake', {
  title: 'Fake drill', what: 'Answers fake questions', starter: 'answer one fake question',
  'level.1': 'Easy', 'level.2': 'Hard',
}, {
  title: 'Bài giả', what: 'Trả lời câu hỏi giả', starter: 'trả lời một câu giả',
  'level.1': 'Dễ', 'level.2': 'Khó',
})

/**
 * A drill no shared file knows about, for tests of the registry wiring: add it
 * with `addDrills(fakeDrill())` and the app must route, list, preset and
 * unlock it from this entry alone. Its page says "fake drill page".
 */
export function fakeDrill(over: Partial<DrillDefinition<DrillOptions>> = {}) {
  return defineDrill<DrillOptions>({
    id: 'fake',
    page: async () => () => createElement('p', null, 'fake drill page'),
    icon: DotIcon,
    title: S.title,
    description: S.what,
    starter: S.starter,
    group: 'read',
    order: 50,
    levels: [{ name: S['level.1'] }, { name: S['level.2'] }],
    defaults: { level: 1, durationSec: 60, mode: 'a' },
    presetOptions: ['mode'],
    ...over,
  })
}
