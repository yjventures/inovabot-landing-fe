import bg from '@/assets/images/pages/auth/signup-hero.png'
import ForgotVerifyForm from '@/components/pages/auth/ForgotVerifyForm'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'

export const metadata = {
  title: 'Verify OTP | Inova'
}

export default function ForgotOTPVefiryPage() {
  return (
    <main className='flex h-screen items-center bg-primary-foreground'>
      <div className='hidden lg:block w-1/2 h-screen p-6'>
        <Img src={bg} alt='Inova signup' className='w-full h-full object-cover rounded-lg' />
      </div>
      <div className='w-full lg:w-1/2 flex flex-col items-center justify-center text-center text-balance px-5 lg:p-6'>
        <Typography variant='h3' className='font-medium'>
          Verify OTP
        </Typography>
        <p className='text-text-tartiary mt-2 mb-8'>Input the OTP that is sent to your Email</p>

        <ForgotVerifyForm />
      </div>
    </main>
  )
}
