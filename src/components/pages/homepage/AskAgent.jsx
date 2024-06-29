import { PlaceholderAnimation } from '@/components/ui/placeholder-animation'

export default function AskAgent({ t }) {
  return (
    <section className='py-20'>
      <PlaceholderAnimation title={t.title} placeholders={t.placeholders} />
    </section>
  )
}
