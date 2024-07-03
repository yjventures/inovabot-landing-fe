import { Hero } from '@/components/pages/homepage'
import { getBenifitsDict } from '@/utils/i18n/get-dictionary'

export default async function page({ params: { lang } }) {
  const t = await getBenifitsDict(lang)
  return (
    <main>
      <Hero t={t.hero} />
    </main>
  )
}
