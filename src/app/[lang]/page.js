import Hero from '@/components/pages/homepage/Hero'
import Nav from '@/components/pages/homepage/Nav'

export const metadata = {
  title: 'Inova | AI Solutions'
}

export default function Home() {
  return (
    <div className='container'>
      <Nav />
      <div className='mt-20'>
        <Hero />
      </div>
    </div>
  )
}
