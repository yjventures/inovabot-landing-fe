import closingQuote from '@/assets/images/pages/homepage/testimonials/closing-quote.png'
import openingQuote from '@/assets/images/pages/homepage/testimonials/opening-quote.png'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'

export default function Testimonial({ testimonial }) {
  return (
    <div className='flex items-center justify-between px-20'>
      <div className='w-1/2 flex items-center gap-x-3'>
        <Img
          src={testimonial.img}
          alt='Person 1'
          className='w-[88px] aspect-square object-cover overflow-hidden rounded-full'
        />
        <div className='space-y-2'>
          <Typography variant='h6'>{testimonial.name}</Typography>
          <Typography variant='description'>{testimonial.designation}</Typography>
        </div>
      </div>

      <div className='w-1/2 p-3 relative'>
        <Img src={openingQuote} alt='Opening quote' className='absolute top-0 left-0 w-24 h-auto' />
        <Img src={closingQuote} alt='Opening quote' className='absolute bottom-0 right-0 w-24 h-auto' />
        <p className='text-text font-semibold text-2xl relative'>{testimonial.testimonial}</p>
      </div>
    </div>
  )
}
