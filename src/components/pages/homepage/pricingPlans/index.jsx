'use client'

import TagLine from '@/components/common/TagLine'
import { Switch } from '@/components/ui/switch'
import Typography from '@/components/ui/typography'
import { useState } from 'react'
import PricingCard from './PricingCard'

export default function PricingPlans({ t }) {
  const frequencies = [
    { value: 'monthly', label: t.monthly, priceSuffix: '/month' },
    { value: 'annually', label: t.annually, priceSuffix: '/year' }
  ]

  const [frequency, setFrequency] = useState(frequencies[0])

  return (
    <div className='pt-20 pb-10 container'>
      <div className='mx-auto max-w-4xl text-center'>
        <TagLine variant='light'>{t.tag}</TagLine>
        <Typography
          variant='h2'
          className='text-balance text-center leading-loose py-5 text-2xl md:text-3xl lg:text-5xl'
        >
          {t.title}
        </Typography>
      </div>

      <div className='flex items-center justify-center'>
        <Typography variant='description' className='text-sm sm:text-xl'>
          Billed Monthly
        </Typography>
        <Switch
          className='mx-2'
          size='lg'
          onCheckedChange={e => (e ? setFrequency(frequencies[1]) : setFrequency(frequencies[0]))}
        />
        <Typography variant='description' className='text-text text-sm sm:text-xl'>
          Billed Anually
        </Typography>
      </div>

      <div className='isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4'>
        {t.plans.map(tier => (
          <PricingCard key={tier.id} tier={tier} frequency={frequency} />
        ))}
      </div>
    </div>
  )
}
