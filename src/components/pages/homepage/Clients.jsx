import logo1 from '@/assets/images/pages/homepage/clients/logo1.png'
import logo2 from '@/assets/images/pages/homepage/clients/logo2.png'
import logo3 from '@/assets/images/pages/homepage/clients/logo3.png'
import logo4 from '@/assets/images/pages/homepage/clients/logo4.png'
import TagLine from '@/components/common/TagLine'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'

export default function Clients({ t }) {
  return (
    <section className='container flex flex-col items-center justify-center py-20'>
      <TagLine>{t.tag}</TagLine>
      <Typography
        variant='h2'
        className='text-balance leading-loose pt-8 pb-9 text-2xl md:text-3xl lg:text-5xl max-w-2/3'
      >
        {t.title}
      </Typography>
      <Typography variant='description' className='max-w-2/3'>
        {t.description}
      </Typography>

      <div className='grid grid-cols-2 md:grid-cols-4 w-full gap-4 md:gap-8 lg:gap-10 pt-10'>
        <Img src={logo1} alt='logo1' className='p-6 sm:p-5 md:p-10 bg-primary-foreground' sizes='400px' />
        <Img src={logo2} alt='logo2' className='p-6 sm:p-5 md:p-10 bg-primary-foreground' sizes='400px' />
        <Img src={logo3} alt='logo3' className='p-6 sm:p-5 md:p-10 bg-primary-foreground' sizes='400px' />
        <Img src={logo4} alt='logo4' className='p-6 sm:p-5 md:p-10 bg-primary-foreground' sizes='400px' />
      </div>
    </section>
  )
}
