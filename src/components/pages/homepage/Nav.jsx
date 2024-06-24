import { Button } from '@/components/ui/button'

export default function Nav() {
  return (
    <nav className='fixed top-0 left-0 right-0 h-20 bg-gray-200'>
      <div className='container flex items-center justify-between h-full'>
        <p className='font-medium tracking-widest text-xl'>INOVA</p>
        <Button>Request For Demo</Button>
      </div>
    </nav>
  )
}
