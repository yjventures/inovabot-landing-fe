import Clients from '@/components/pages/homepage/Clients'
import Hero from '@/components/pages/homepage/Hero'
import { getHomepageDict } from '@/utils/i18n/get-dictionary'

export const metadata = {
  title: 'Inova | AI Solutions'
}

export default async function Home({ params: { lang } }) {
  const t = await getHomepageDict(lang)
  return (
    <main>
      <Hero t={t.hero} />
      <Clients t={t.clients} />
    </main>
  )
}
