import TagLine from '@/components/common/TagLine'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'

export default function CTA({ t }) {
  return (
    <section className='w-full py-20 bg-dark-gray'>
      <div className='container flex flex-col items-center justify-center'>
        <TagLine className='uppercase'>{t.tag}</TagLine>
        <Typography
          variant='h2'
          className='text-balance text-center text-white pt-10 pb-8 leading-loose text-2xl md:text-3xl lg:text-5xl max-w-2/3'
        >
          {t.title}
        </Typography>
        <p className='text-text-tartiary text-center max-w-[75%] font-medium text-lg'>{t.description}</p>
        <Button className='my-10'>{t.cta}</Button>
        <div className='rounded-2xl overflow-hidden max-w-[950px] w-full aspect-video'>
          <iframe
            src='https://www.youtube.com/embed/k85mRPqvMbE?si=Sm5m7JmCudUXNUhE'
            title='YouTube video player'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerpolicy='strict-origin-when-cross-origin'
            allowfullscreen
            className='w-full h-full'
          ></iframe>
        </div>
      </div>
    </section>
  )
}
