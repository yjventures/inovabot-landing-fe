import Hero from '@/components/pages/homepage/Hero'
import Marquee from '@/components/pages/homepage/Marquee'
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
        <Marquee />
      </div>
    </div>
  )
}
