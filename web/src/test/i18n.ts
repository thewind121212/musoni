import { translate, type Translate } from '@/core/i18n/translate'

/** The translator pure components take as `t`, bound to English for readable assertions. */
export const t: Translate = (key, params) => translate('en', key, params)
