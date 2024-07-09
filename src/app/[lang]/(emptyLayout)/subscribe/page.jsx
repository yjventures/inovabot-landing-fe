import PricingPlans from '@/components/pages/subscribe/PricingPlans'
import Typography from '@/components/ui/typography'
import { getSubscribeDict } from '@/utils/i18n/get-dictionary'

export const metadata = {
  title: 'Subscribe | Inova'
}

export default async function Subscribe({ params: { lang } }) {
  const t = await getSubscribeDict(lang)
  return (
    <main className='container'>
      <Typography
        variant='h2'
        className='text-balance text-center pt-10 pb-8 leading-loose text-2xl md:text-3xl lg:text-5xl max-w-full'
      >
        {t.title}
      </Typography>
      <p className='text-text-tartiary text-center max-w-full font-medium text-lg'>{t.description}</p>
      <PricingPlans />
    </main>
  )
}
