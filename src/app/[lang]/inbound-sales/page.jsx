import { AskAgent, Clients, Hero } from '@/components/pages/homepage'
import { getHomepageDict, getInboundSalesDict } from '@/utils/i18n/get-dictionary'

export default async function InboundSalesPage({ params: { lang } }) {
  const t = await getInboundSalesDict(lang)
  const homeT = await getHomepageDict(lang)
  return (
    <main>
      <AskAgent t={homeT.askAgent} />
      <Hero t={t.hero} />
      <Clients t={homeT.clients} />
    </main>
  )
}
