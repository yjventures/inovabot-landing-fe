import heroImg from '@/assets/images/pages/homepage/header/hero.png'
import patternImg from '@/assets/images/pages/homepage/header/pattern.png'
import { Button } from '@/components/ui/button'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { cn } from '@/lib/utils'

export default function GetStartedCTA({ t }) {
  return (
    <section className='py-20'>
      <div className='container flex flex-col md:flex-row items-center justify-normal md:justify-between gap-x-5 xl:gap-x-10 gap-y-12'>
        <div className='w-full md:w-1/2 order-2 md:order-1 pr-5 md:pr-0'>
          <Typography
            variant='h1'
            className='text-balance leading-loose pt-8 pb-9 text-3xl md:text-4xl lg:text-6xl max-w-full sm:max-w-[75%]'
          >
            {t.title}
          </Typography>
          <Typography variant='description' className='max-w-full sm:max-w-[75%]'>
            {t.description}
          </Typography>
          <div className={cn('flex items-center gap-x-4 pt-6 pb-10', { 'flex-col gap-y-3 items-start': t.cta2 })}>
            <div className='flex items-center gap-x-4'>
              <Button>{t.cta}</Button>
              {t.cta2 ? <Button variant='outline'>{t.cta2}</Button> : null}
            </div>
            <p className='text-text-secondary font-medium text-lg'>{t.creditCardText}</p>
          </div>
        </div>
        <div className='w-full max-w-full sm:max-w-[75%] mt-10 md:mt-0 md:w-1/2 order-1 md:order-2 relative'>
          <Img
            src={patternImg}
            alt='pattern'
            sizes='312px'
            className='w-auto h-1/2 absolute top-1/2 left-0 -translate-y-1/2 z-[1]'
          />
          <Img src={heroImg} alt='hero' sizes='100vw' className='w-full h-auto inset-0 z-[3] relative' />
        </div>
      </div>
    </section>
  )
}
