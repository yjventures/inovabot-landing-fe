'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LLink from '@/components/ui/llink'
import usePush from '@/hooks/usePush'
import { useResetPasswordMutation } from '@/redux/features/authApi'
import { rtkErrorMesage } from '@/utils/error/errorMessage'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function ResetPasswordForm() {
  const push = usePush()
  const params = useSearchParams()
  const userId = params.has('id') && params.get('id')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [resetPassword, { isLoading, isSuccess, isError, error }] = useResetPasswordMutation()

  const onSubmit = data => {
    if (data.password !== data.confirmPassword) return toast.error('Password does not match!')
    resetPassword({ id: userId, password: data.password })
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Password reset successfully!')
      push('/login')
    }

    if (isError) toast.error(rtkErrorMesage(error))
  }, [isSuccess, isError, error])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-sm'>
      <Input
        type='password'
        name='password'
        placeholder='********'
        label='Password'
        register={register}
        errors={errors}
        showLabel
        required
        labelClassName='text-left'
      />
      <Input
        type='password'
        name='confirmPassword'
        placeholder='********'
        label='Confirm Password'
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
        <p className='text-text-tartiary text-sm'>Don&apos;t have account?</p>
        <LLink href='/signup' className='font-medium text-text'>
          <Button variant='link' className='font-medium underline px-1 text-text-secondary hover:text-sky-600'>
            Signup
          </Button>
        </LLink>
      </div>
    </form>
  )
}
