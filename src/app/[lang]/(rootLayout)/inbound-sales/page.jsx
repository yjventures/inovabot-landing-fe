import { AskAgent, Clients, Description1, Description2, Description3, Hero } from '@/components/pages/homepage'
import { getHomepageDict, getInboundSalesDict } from '@/utils/i18n/get-dictionary'

export default async function InboundSalesPage({ params: { lang } }) {
  const t = await getInboundSalesDict(lang)
  const homeT = await getHomepageDict(lang)
  return (
    <main>
      <AskAgent t={homeT.askAgent} />
      <Hero t={t.hero} />
      <Clients t={homeT.clients} />
      <Description1 t={t.description1} />
      <Description2 t={t.description2} />
      <Description3 t={t.description3} />
      <Description2 t={t.description4} />
      <Description3 t={t.description5} />
    </main>
  )
}
