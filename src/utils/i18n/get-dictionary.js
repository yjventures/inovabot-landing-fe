import 'server-only'

const getDict = dict => async lang => dict[lang]?.() ?? dict.en()

const dicts = {
  en: () => import('./../../dictionaries/en.json').then(m => m.default),
  ar: () => import('./../../dictionaries/ar.json').then(m => m.default)
}

export const dict = getDict(dicts)
