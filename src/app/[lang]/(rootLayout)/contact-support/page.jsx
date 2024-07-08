import BenifitsFeatures from '@/components/pages/contact-support/BenifitsFeatures'
import GetStartedCTA from '@/components/pages/contact-support/GetStartedCTA'
import { Hero, Testimonials } from '@/components/pages/homepage'
import { getContactSupportDict, getHomepageDict } from '@/utils/i18n/get-dictionary'

export default async function ContactSupportPage({ params: { lang } }) {
  const t = await getContactSupportDict(lang)
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
