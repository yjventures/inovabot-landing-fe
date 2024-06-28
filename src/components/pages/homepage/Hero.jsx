import heroImg from '@/assets/images/pages/homepage/header/hero.png'
import logo1 from '@/assets/images/pages/homepage/header/logo1.png'
import logo2 from '@/assets/images/pages/homepage/header/logo2.png'
import logo3 from '@/assets/images/pages/homepage/header/logo3.png'
import logo4 from '@/assets/images/pages/homepage/header/logo4.png'
import { Button } from '@/components/ui/button'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'

export default function Hero({ t }) {
  return (
    <section className='bg-primary-foreground -mt-20 py-20 md:py-0'>
      <div className='pl-5 md:pl-8 flex flex-col md:flex-row items-center justify-normal md:justify-between gap-x-5 xl:gap-x-10 gap-y-12 min-h-dvh'>
        <div className='w-full md:w-1/2 order-2 md:order-1 pr-5 md:pr-0'>
          <p className='text-white bg-primary px-3 py-1 text-xs rounded-full inline-block'>{t.headerTag}</p>
          <Typography variant='h1' className='text-balance leading-loose pt-8 pb-9 text-3xl md:text-4xl lg:text-6xl'>
            {t.title}
          </Typography>
          <p className='text-text-secondary text-xl font-medium'>{t.description}</p>
          <div className='flex items-center gap-x-4 pt-6 pb-10'>
            <Button>{t.cta}</Button>
            <p className='text-text-secondary font-medium text-lg'>{t.creditCardText}</p>
          </div>

          <div className='space-y-2.5'>
            <p className='text-sm font-medium text-text-tartiary'>{t.brandsTitle}</p>
            <div className='flex items-center gap-x-5'>
              <Img src={logo1} sizes='120px' alt='logo1' className='w-[102px] h-auto' />
              <Img src={logo2} sizes='120px' alt='logo2' className='w-[102px] h-auto' />
              <Img src={logo3} sizes='120px' alt='logo3' className='w-[102px] h-auto' />
              <Img src={logo4} sizes='120px' alt='logo4' className='w-[102px] h-auto' />
            </div>
          </div>
        </div>
        <div className='w-full max-w-2/3 mt-10 md:mt-0 md:w-1/2 order-1 md:order-2'>
          <Img src={heroImg} alt='hero' sizes='100vw' className='w-full h-auto' />
        </div>
      </div>
    </section>
  )
}
