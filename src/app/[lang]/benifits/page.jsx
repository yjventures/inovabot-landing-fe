import BenifitsFeatures from '@/components/pages/benifits/BenifitsFeatures'
import { Hero, NewsLetter, Testimonials } from '@/components/pages/homepage'
import { getBenifitsDict, getHomepageDict } from '@/utils/i18n/get-dictionary'

export default async function page({ params: { lang } }) {
  const t = await getBenifitsDict(lang)
  const homeT = await getHomepageDict(lang)
  return (
    <main>
      <Hero t={t.hero} />
      <BenifitsFeatures t={t.features} />
      <Testimonials t={homeT.testimonials} />
      <NewsLetter t={homeT.newsLetter} />
    </main>
  )
}
