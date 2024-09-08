'use client'

import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import Typography from '@/components/ui/typography'
import { logoutActions } from '@/utils/auth/logoutActions'
import { Check, Home, LayoutGrid } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function PaymentSuccess() {
  const dispatch = useDispatch()
  const { refresh } = useRouter()

  useEffect(() => {
    logoutActions(dispatch, refresh)
  }, [dispatch, refresh])

  return (
    <div className='bg-primary-foreground h-screen flex items-center justify-center px-5'>
      <div className='bg-background py-5 sm:py-6 px-5 sm:px-8 rounded-xl shadow-lg flex flex-col items-center justify-center'>
        <div className='bg-emerald-600 rounded-full p-2'>
          <Check size={80} className='text-white' />
        </div>

        <div className='text-center text-balance space-y-3 mt-6'>
          <Typography variant='h3' className='text-center'>
            Payment Successful!
          </Typography>
          <p className='text-text-secondary font-medium my-2'>Thank you for completing your secure online payment.</p>
          <p className='text-text-tartiary font-medium text-lg'>Continue your journey creating a bot!</p>
          <div className='py-5 text-center flex flex-wrap items-center justify-center gap-x-6 gap-y-3'>
            <LLink href='/'>
              <Button icon={<Home />}>Back to Home</Button>
            </LLink>
            <LLink href='/login'>
              <Button variant='success' icon={<LayoutGrid />}>
                Go to Dashboard
              </Button>
            </LLink>
          </div>
        </div>
      </div>
    </div>
  )
}
