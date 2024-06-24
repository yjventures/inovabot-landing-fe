import Typography from '@/components/ui/typography'
import { Crown, Languages, MousePointerClick, WandSparkles } from 'lucide-react'
import Card from './Card'

const cards = [
  {
    id: 1,
    icon: Crown,
    title: 'Engage with every visitor',
    description: 'Help them find exactly what they are looking for'
  },
  {
    id: 2,
    icon: MousePointerClick,
    title: 'Find the right products',
    description: 'Instantly direct visitors to the relevant case studies and offerings.'
  },
  {
    id: 3,
    icon: WandSparkles,
    title: 'Capture leads seamlessly',
    description: 'Say goodbye to missed opportunities.'
  },
  {
    id: 4,
    icon: Languages,
    title: 'Multiple languages',
    description: 'Communicate in over 175 languages.'
  }
]

export default function LeadGeneration() {
  return (
    <section className='container p-10 rounded-2xl bg-gray-100 mb-20'>
      <Typography variant='h3' className='text-center text-balance'>
        Turn Your Website into a Lead Generation Machine
      </Typography>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10'>
        {cards.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </section>
  )
}
