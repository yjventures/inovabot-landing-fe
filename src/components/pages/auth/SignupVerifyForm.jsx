'use client'

import Typography from '@/components/ui/typography'
import usePush from '@/hooks/usePush'
import { useSignupVerifyMutation } from '@/redux/features/authApi'
import { rtkErrorMesage } from '@/utils/error/errorMessage'
import { MailCheck, MailSearch, MailX } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function SignupVerifyForm({ t }) {
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
      toast.success(t.emailVerifiedDescription)

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
            {t.verifyingEmailTitle}
          </Typography>
          <p className='font-medium text-text-tartiary text-lg text-balance mt-5 max-w-md'>
            {t.verifyingEmailDescription}
          </p>
        </div>
      ) : null}

      {isSuccess ? (
        <div className='flex flex-col items-center justify-center'>
          <MailCheck size={72} strokeWidth={1} className='text-emerald-500' />
          <Typography variant='h3' className='font-medium text-center mt-5'>
            {t.emailVerifiedTitle}
          </Typography>
          <p className='font-medium text-text-tartiary text-lg text-balance mt-5 max-w-md'>
            {t.emailVerifiedDescription}
          </p>
        </div>
      ) : null}

      {isError ? (
        <div className='flex flex-col items-center justify-center'>
          <MailX size={72} strokeWidth={1} className='text-red-500' />
          <Typography variant='h3' className='font-medium text-center mt-5'>
            {t.emailVerificationFailedTitle}
          </Typography>
          <p className='font-medium text-text-tartiary text-lg text-balance mt-5 max-w-md'>{rtkErrorMesage(error)}</p>
        </div>
      ) : null}
    </div>
  )
}
