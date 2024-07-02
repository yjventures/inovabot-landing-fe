import { Hero } from '@/components/pages/homepage'
import { getAiChatbotDict } from '@/utils/i18n/get-dictionary'

export const metadata = {
  title: 'Inova | AI Solutions'
}

export default async function AiChatbotPage({ params: { lang } }) {
  const t = await getAiChatbotDict(lang)
  return (
    <main>
      <Hero t={t.hero} />
    </main>
  )
}
