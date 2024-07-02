import AskAgent from '@/components/pages/homepage/AskAgent'
import CTA from '@/components/pages/homepage/CTA'
import CTA2 from '@/components/pages/homepage/CTA2'
import Clients from '@/components/pages/homepage/Clients'
import Description1 from '@/components/pages/homepage/Description1'
import Description2 from '@/components/pages/homepage/Description2'
import Description3 from '@/components/pages/homepage/Description3'
import Features from '@/components/pages/homepage/Features'
import Hero from '@/components/pages/homepage/Hero'
import Marquee from '@/components/pages/homepage/Marquee'
import NewsLetter from '@/components/pages/homepage/NewsLetter'
import PricingComparison from '@/components/pages/homepage/PricingComparison'
import Testimonials from '@/components/pages/homepage/Testimonials'
import PricingPlans from '@/components/pages/homepage/pricingPlans'
import { getHomepageDict } from '@/utils/i18n/get-dictionary'

export const metadata = {
  title: 'Inova | AI Solutions'
}

export default async function Home({ params: { lang } }) {
  const t = await getHomepageDict(lang)
  return (
    <main>
      <AskAgent t={t.askAgent} />
      <Hero t={t.hero} />
      <Clients t={t.clients} />
      <Marquee />
      <Features t={t.features} />
      <CTA t={t.cta} />
      <Description1 t={t.description1} />
      <Description2 t={t.description2} />
      <Description3 t={t.description3} />
      <CTA2 t={t.cta2} />
      <PricingPlans t={t.pricingPlans} />
      <PricingComparison t={t.pricingComparison} />
      <Testimonials t={t.testimonials} />
      <NewsLetter t={t.newsLetter} />
    </main>
  )
}
