import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className='min-h-dvh container flex flex-col lg:flex-row items-center justify-center gap-y-10 lg:justify-between'>
      <div className='w-full lg:w-1/2'>
        <p className='text-sky-700 uppercase text-balance'>CONVERT VISITORS TO BUYERS WITH INOVA&apos;S AI BOT</p>
        <h1 className='text-7xl font-medium text-balance my-7'>AI-Powered Sales Agent for Your Website</h1>
        <p className='text-xl font-medium text-gray-500'>
          Unlock the power of AI to engage visitors, book meetings, qualify leads, and close deals effortlessly.
        </p>
        <div className='mt-6 inline-flex flex-col items-center gap-y-2'>
          <Button className='flex items-center gap-x-3 rounded-full h-14 px-10'>
            Request A Demo <ArrowRight className='size-5' />
          </Button>
          <p className='text-sm text-gray-500'>No credit card required</p>
        </div>
      </div>

      <div className='w-full lg:w-1/2'>
        <video controls autoPlay muted loop playsInline className='w-full rounded-2xl shadow-xl'>
          <source src='/hero.mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  )
}
