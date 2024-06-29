import { PlaceholderAnimation } from '@/components/ui/placeholder-animation'

export default function AskAgent({ t }) {
  return (
    <section>
      <PlaceholderAnimation title={t.title} placeholders={t.placeholders} />
    </section>
  )
}
