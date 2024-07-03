import { Hero } from '@/components/pages/homepage'
import { getInboundSalesDict } from '@/utils/i18n/get-dictionary'

export default async function InboundSalesPage({ params: { lang } }) {
  const t = await getInboundSalesDict(lang)
  return (
    <main>
      <Hero t={t.hero} />
    </main>
  )
}
