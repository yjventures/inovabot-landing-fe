import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'

export default function PaymentSuccessPage() {
  return (
    <div className='bg-primary-foreground h-screen flex items-center justify-center px-5'>
      <div className='bg-background py-5 sm:py-6 px-5 sm:px-8 rounded-xl shadow-lg'>
        <svg viewBox='0 0 24 24' className='text-green-600 w-16 h-16 mx-auto my-6'>
          <path
            fill='currentColor'
            d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'
          ></path>
        </svg>
        <div className='text-center'>
          <Typography variant='h3' className='text-center'>
            Payment Successful!
          </Typography>
          <p className='text-text-secondary font-medium my-2'>Thank you for completing your secure online payment.</p>
          <p className='text-text-tartiary font-medium text-lg'>Continue your journey creating a bot!</p>
          <div className='py-5 text-center flex flex-wrap items-center justify-center gap-x-6 gap-y-3'>
            <Button variant='success'>Back to Home</Button>
            <Button>Go to Dashboard</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
