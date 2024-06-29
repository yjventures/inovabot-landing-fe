import desc1Img from '@/assets/images/pages/homepage/descriptions/desc1.png'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'

export default function Description1({ t }) {
  return (
    <section className='py-32 container flex flex-col min-[850px]:flex-row items-center justify-center gap-x-10 xl:gap-x-20 gap-y-10'>
      <div className='w-full min-[850px]:w-3/5'>
        <Img src={desc1Img} alt='description1' className='max-w-[85%] mx-auto min-[850px]:mx-0' sizes='100vw' />
      </div>
      <div className='w-full min-[850px]:w-2/5'>
        <Typography variant='h2' className='text-balance leading-loose pb-9 text-2xl md:text-3xl lg:text-5xl max-w-2/3'>
          {t.title}
        </Typography>
        <ul className='space-y-3 pl-5'>
          {t.listItems.map((item, index) => (
            <li key={index} className='text-lg text-text-dark list-disc list-item text-balance'>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
