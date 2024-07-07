'use client'

import Typography from '@/components/ui/typography'
import usePush from '@/hooks/usePush'
import { useSignupVerifyMutation } from '@/redux/features/authApi'
import { rtkErrorMesage } from '@/utils/error/errorMessage'
import { MailCheck, MailSearch, MailX } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function SignupVerifyForm() {
  const push = usePush()
  const params = useSearchParams()
  const code = params.has('code') && params.get('code')

  const [verifyEmail, { isLoading, isSuccess, isError, error }] = useSignupVerifyMutation()

  useEffect(() => {
    if (code) {
      verifyEmail({ link: code })
    }
  }, [code, verifyEmail])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Email verified successfully')

      setTimeout(() => {
        push('/login')
      }, 2000)
    }

    if (isError) toast.error(rtkErrorMesage(error))
  }, [isSuccess, isError, error])

  return (
    <div className='flex items-center justify-center'>
      {isLoading ? (
        <div className='flex flex-col items-center justify-center'>
          <MailSearch size={72} strokeWidth={1} className='text-sky-500' />
          <Typography variant='h3' className='font-medium text-center mt-5'>
            Verifying Email...
          </Typography>
          <p className='font-medium text-text-tartiary text-lg text-balance mt-5 max-w-md'>
            Please wait till we verify your email address.
          </p>
        </div>
      ) : null}

      {isSuccess ? (
        <div className='flex flex-col items-center justify-center'>
          <MailCheck size={72} strokeWidth={1} className='text-emerald-500' />
          <Typography variant='h3' className='font-medium text-center mt-5'>
            Email is verified
          </Typography>
          <p className='font-medium text-text-tartiary text-lg text-balance mt-5 max-w-md'>
            Email verification successfull. Soon you will be redirected to login page.
          </p>
        </div>
      ) : null}

      {isError ? (
        <div className='flex flex-col items-center justify-center'>
          <MailX size={72} strokeWidth={1} className='text-red-500' />
          <Typography variant='h3' className='font-medium text-center mt-5'>
            Email verification failed
          </Typography>
          <p className='font-medium text-text-tartiary text-lg text-balance mt-5 max-w-md'>{rtkErrorMesage(error)}</p>
        </div>
      ) : null}
    </div>
  )
}
