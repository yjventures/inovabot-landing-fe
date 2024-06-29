import Typography from '@/components/ui/typography'
import { Languages, LineChartIcon, MessagesSquare, Users } from 'lucide-react'
import { createElement } from 'react'

export default function Features({ t }) {
  const featureIcons = [MessagesSquare, LineChartIcon, Users, Languages]

  return (
    <section className='container grid grid-cols-4 py-20 gap-5'>
      {t.map((feature, index) => (
        <div key={feature.id} className='text-balance text-center flex flex-col items-center gap-y-4'>
          <div className='size-16 flex items-center justify-center bg-primary rounded-lg'>
            {featureIcons[index] && createElement(featureIcons[index], { className: 'text-white' })}
          </div>
          <Typography variant='h4' className='max-w-[75%]'>
            {feature.title}
          </Typography>
          <Typography variant='description' className='text-base'>
            {feature.description}
          </Typography>
        </div>
      ))}
    </section>
  )
}
