'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import LLink from '@/components/ui/llink'
import usePush from '@/hooks/usePush'
import { useLoginMutation } from '@/redux/features/authApi'
import { calculateTokenExpiration } from '@/utils/auth/calculateTokenExpiration'
import { rtkErrorMesage } from '@/utils/error/errorMessage'
import { setCookie } from 'cookies-next'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function LoginForm() {
  const push = usePush()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm()

  const [login, { isLoading, isSuccess, isError, error, data }] = useLoginMutation()

  const onSubmit = data => {
    const allData = {
      email: data.email.trim(),
      password: data.password,
      type: 'email',
      userType: 'user'
    }

    login(allData)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Logged in successfully!')

      const {
        user: { accessToken, refreshToken, ...userData }
      } = data

      if (watch('rememberMe')) {
        setCookie('refreshToken', refreshToken, { maxAge: calculateTokenExpiration(refreshToken) })
        setCookie('accessToken', accessToken, { maxAge: calculateTokenExpiration(accessToken) })
        setCookie('userData', JSON.stringify(userData), {
          maxAge: calculateTokenExpiration(refreshToken)
        })
      } else {
        setCookie('refreshToken', refreshToken)
        setCookie('accessToken', accessToken)
        setCookie('userData', JSON.stringify(userData))
      }

      push('/')
    }
    if (isError) toast.error(rtkErrorMesage(error))
  }, [isSuccess, isError, error, reset])

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

      <div className='flex items-center gap-x-2'>
        <Checkbox id='remember-me' onCheckedChange={e => setValue('rememberMe', e)} />
        <Label className='text-text' htmlFor='remember-me'>
          Remember Me
        </Label>
      </div>

      <Button variant='black' type='submit' className='w-full mt-5' isLoading={isLoading}>
        Login
      </Button>

      <div className='flex flex-wrap items-center justify-center gap-x-1 mt-5'>
        <p className='text-text-tartiary text-sm'>Don&apos;t have an account?</p>
        <LLink href='/signup' className='font-medium text-text'>
          <Button variant='link' className='font-medium underline px-1 text-text-secondary hover:text-sky-600'>
            Signup
          </Button>
        </LLink>
      </div>
    </form>
  )
}
