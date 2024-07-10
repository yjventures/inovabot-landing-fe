import CaseStudyAbout from '@/components/pages/case-study/CaseStudyAbout'
import CaseStudyHeader from '@/components/pages/case-study/CaseStudyHeader'
import Results from '@/components/pages/case-study/Results'
import WhatWeDid from '@/components/pages/case-study/WhatWeDid'
import { getCaseStudyDict } from '@/utils/i18n/get-dictionary'

export const metadata = {
  title: 'Case Study | Inova'
}

export default async function CaseStudyPage({ params: { lang } }) {
  const t = await getCaseStudyDict(lang)
  return (
    <main>
      <CaseStudyHeader t={t.header} />
      <CaseStudyAbout t={t.about} />
      <WhatWeDid t={t.whatWeDid} />
      <Results t={t.results} />
    </main>
  )
}
