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

const aiChatbotDict = {
  en: () => import('./../../dictionaries/pages/ai-chatbot/en.json').then(m => m.default),
  ar: () => import('./../../dictionaries/pages/ai-chatbot/ar.json').then(m => m.default)
}

const benifitsDict = {
  en: () => import('./../../dictionaries/pages/benifits/en.json').then(m => m.default),
  ar: () => import('./../../dictionaries/pages/benifits/ar.json').then(m => m.default)
}

const inboundSalesDict = {
  en: () => import('./../../dictionaries/pages/inbound-sales/en.json').then(m => m.default),
  ar: () => import('./../../dictionaries/pages/inbound-sales/ar.json').then(m => m.default)
}

const authDict = {
  en: () => import('./../../dictionaries/pages/auth/en.json').then(m => m.default),
  ar: () => import('./../../dictionaries/pages/auth/ar.json').then(m => m.default)
}

export const getCommonDict = getDict(commonDict)
export const getHomepageDict = getDict(homepageDict)
export const getAiChatbotDict = getDict(aiChatbotDict)
export const getBenifitsDict = getDict(benifitsDict)
export const getInboundSalesDict = getDict(inboundSalesDict)
export const getAuthDict = getDict(authDict)
