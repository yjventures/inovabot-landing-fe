'use client'

import TagLine from '@/components/common/TagLine'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import Typography from '@/components/ui/typography'
import { CheckIcon } from 'lucide-react'
import { useState } from 'react'

export default function PricingPlans({ t }) {
  const frequencies = [
    { value: 'monthly', label: t.molnthly, priceSuffix: '/month' },
    { value: 'annually', label: t.annually, priceSuffix: '/year' }
  ]

  const [frequency, setFrequency] = useState(frequencies[0])

  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
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
            <div key={tier.id} className='rounded-lg p-8 text-center bg-primary-foreground'>
              <Typography variant='h4' id={tier.id}>
                {tier.name}
              </Typography>
              <p className='mt-4 text-sm leading-6 text-text-tartiary'>{tier.description}</p>
              <div className='flex items-center justify-center'>
                <p className='mt-6 flex items-baseline gap-x-1'>
                  <span className='mb-auto text-xl font-bold -translate-y-2 text-text'>$</span>
                  <span className='text-5xl font-bold tracking-tight text-text'>{tier.price[frequency.value]}</span>
                  <span className='text-sm font-semibold leading-6 text-text-secondary'>{frequency.priceSuffix}</span>
                </p>
              </div>
              <Button className='w-full mt-5'>Get Started Now</Button>
              <ul role='list' className='mt-8 space-y-3 text-sm leading-6 text-text-secondary'>
                {tier.features.map(feature => (
                  <li key={feature} className='flex items-start gap-x-3 text-xs text-left'>
                    <div className='bg-primary p-0.5 rounded-full'>
                      <CheckIcon className='size-3 flex-none text-white' aria-hidden='true' />
                    </div>
                    <p>{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
