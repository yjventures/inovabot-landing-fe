//import bg from '@/assets/images/pages/auth/signup-hero.png'
import { Input } from '@/components/ui/input'
import Typography from '@/components/ui/typography'

export default function SignupPage() {
  return (
    <main className='p-10 flex min-h-screen items-center'>
      <div className='w-1/2 h-screen' style={{ backgroundImage: `url(/signup-hero.png)` }}>
        {/* <Img src={bg} alt='Inova signup' className='w-full h-auto object-cover' /> */}
      </div>
      <div className='w-1/2 flex flex-col items-center justify-center text-center text-balance'>
        <Typography variant='h3'>Welcome to Inova!</Typography>
        <p className='text-text-secondary font-medium'>Register now and start your adventure.</p>

        <Input />
        <Input />
        <Input />
      </div>
    </main>
  )
}
