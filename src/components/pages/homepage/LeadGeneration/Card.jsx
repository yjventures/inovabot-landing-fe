import Typography from '@/components/ui/typography'

export default function Card({ card }) {
  return (
    <div>
      <div className='p-3 bg-slate-400 rounded-full inline-block'>
        <card.icon className='size-7 text-slate-600 rounded-full' strokeWidth={1.5} />
      </div>
      <Typography variant='h5' className='text-2xl font-semibold text-balance text-gray-600 mt-2 mb-4'>
        {card.title}
      </Typography>
      <p className='text-gray-500 text-xl'>{card.description}</p>
    </div>
  )
}
