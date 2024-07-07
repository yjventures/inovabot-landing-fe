import bg from '@/assets/images/pages/auth/signup-hero.png'
import ForgotPasswordForm from '@/components/pages/auth/ForgotPasswordForm'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'

export const metadata = {
  title: 'Forgot Password | Inova'
}

export default function ForgotPasswordPage() {
  return (
    <main className='flex h-screen items-center bg-primary-foreground'>
      <div className='hidden lg:block w-1/2 h-screen p-6'>
        <Img src={bg} alt='Inova signup' className='w-full h-full object-cover rounded-lg' />
      </div>
      <div className='w-full lg:w-1/2 flex flex-col items-center justify-center text-center text-balance px-5 lg:p-6'>
        <Typography variant='h3' className='font-medium'>
          Forgot Password
        </Typography>
        <p className='text-text-tartiary mt-2 mb-8 max-w-md'>
          Enter the email address you used when joined and we&apos;ll send reset instructions to reset your password.
        </p>
        <ForgotPasswordForm />
      </div>
    </main>
  )
}
