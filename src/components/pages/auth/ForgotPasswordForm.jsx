'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LLink from '@/components/ui/llink'
import usePush from '@/hooks/usePush'
import { useForgotPasswordMutation } from '@/redux/features/authApi'
import { rtkErrorMesage } from '@/utils/error/errorMessage'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function ForgotPasswordForm() {
  const push = usePush()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const [sendForgotOTP, { isLoading, isSuccess, isError, error }] = useForgotPasswordMutation()

  const onSubmit = data => {
    const allData = {
      email: data.email.trim().toLowerCase(),
      userType: 'user'
    }

    sendForgotOTP(allData)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Sent Verify OTP Successfully!')
      push(`/forgot-password/verify-otp?email=${watch('email')}`)
    }

    if (isError) toast.error(rtkErrorMesage(error))
  }, [isSuccess, isError, error])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-sm'>
      <Input
        type='email'
        name='email'
        placeholder='Email Address'
        label='Email'
        register={register}
        errors={errors}
        showLabel
        required
        labelClassName='text-left'
      />
      <Button variant='black' type='submit' className='w-full' isLoading={isLoading}>
        Send Reset Instuctions
      </Button>

      <div className='flex flex-wrap items-center justify-center gap-x-1 mt-5'>
        <p className='text-text-tartiary text-sm'>Back to login page?</p>
        <LLink href='/login' className='font-medium text-text'>
          <Button variant='link' className='font-medium underline px-1 text-text-secondary hover:text-sky-600'>
            Back now
          </Button>
        </LLink>
      </div>
    </form>
  )
}
