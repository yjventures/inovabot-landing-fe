import bottomLeftImg from '@/assets/images/pages/homepage/newsletter/bottom-left.png'
import bottomRightImg from '@/assets/images/pages/homepage/newsletter/bottom-right.png'
import topLeftImg from '@/assets/images/pages/homepage/newsletter/top-left.png'
import topRightImg from '@/assets/images/pages/homepage/newsletter/top-right.png'
import { Button } from '@/components/ui/button'
import { Img } from '@/components/ui/img'
import { Input } from '@/components/ui/input'
import Typography from '@/components/ui/typography'

export default function NewsLetter({ t }) {
  return (
    <section className='py-32 bg-dark-gray'>
      <div className='container'>
        <div className='flex flex-col items-center text-center justify-center py-28 px-16 rounded-2xl bg-white relative overflow-hidden'>
          <Typography variant='h2' className='text-balance leading-loose text-2xl md:text-3xl lg:text-5xl max-w-[75%]'>
            {t.title}
          </Typography>
          <Typography variant='description' className='max-w-[75%] pt-4 pb-6'>
            {t.description}
          </Typography>

          <div className='flex flex-col gap-y-2'>
            <div className='flex items-center gap-x-5'>
              <Input placeholder={t.placeholder} className='w-full md:w-96' />
              <Button>{t.cta}</Button>
            </div>
            <div className='flex items-center gap-x-1 text-left self-start text-xs font-medium'>
              <p className='text-text-secondary'>{t.privacy}</p>
              <a href='#' className='text-violet-700'>
                {t.privacyCta}
              </a>
            </div>
          </div>

          <Img src={topLeftImg} alt='top-left' className='absolute w-32 h-auto top-0 left-0 z-0' />
          <Img src={topRightImg} alt='top-right' className='absolute w-36 h-auto top-5 right-5 z-0' />
          <Img src={bottomLeftImg} alt='bottom-left' className='absolute w-36 h-auto bottom-5 left-5 z-0' />
          <Img src={bottomRightImg} alt='bottom-right' className='absolute w-32 h-auto bottom-0 right-0 z-0' />
        </div>
      </div>
    </section>
  )
}
