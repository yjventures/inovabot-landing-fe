import BenifitsFeatures from '@/components/pages/benifits/BenifitsFeatures'
import GetStartedCTA from '@/components/pages/benifits/GetStartedCTA'
import { Hero, Testimonials } from '@/components/pages/homepage'
import { getBenifitsDict, getHomepageDict } from '@/utils/i18n/get-dictionary'

export default async function page({ params: { lang } }) {
  const t = await getBenifitsDict(lang)
  const homeT = await getHomepageDict(lang)
  return (
    <main>
      <Hero t={t.hero} />
      <BenifitsFeatures t={t.features} />
      <GetStartedCTA t={t.getStartedCTA} />
      <Testimonials t={homeT.testimonials} />
    </main>
  )
}
