import bg from '@/assets/images/pages/auth/signup-hero.png'
import { Img } from '@/components/ui/img'
import { Input } from '@/components/ui/input'
import Typography from '@/components/ui/typography'

export default function SignupPage() {
  return (
    <main className='flex h-screen items-center'>
      <div className='w-1/2 h-screen p-6'>
        <Img src={bg} alt='Inova signup' className='w-full h-full object-cover rounded-lg' />
      </div>
      <div className='w-1/2 flex flex-col items-center justify-center text-center text-balance p-6'>
        <Typography variant='h3' className='font-medium'>
          Welcome to Inova!
        </Typography>
        <p className='text-text-tartiary'>Register now and start your adventure.</p>

        <Input />
        <Input />
        <Input />
      </div>
    </main>
  )
}
