import 'server-only'

const getDict = dict => async lang => dict[lang]?.() ?? dict.en()

const commonDict = {
  en: () => import('./../../dictionaries/common/en.json').then(m => m.default),
  ar: () => import('./../../dictionaries/common/ar.json').then(m => m.default)
}

const homepageDict = {
  en: () => import('./../../dictionaries/pages/homepage/en.json').then(m => m.default),
  ar: () => import('./../../dictionaries/pages/homepage/ar.json').then(m => m.default)
}

export const getCommonDict = getDict(commonDict)
export const getHomepageDict = getDict(homepageDict)
