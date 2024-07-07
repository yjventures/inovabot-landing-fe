'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import LLink from '@/components/ui/llink'
import Typography from '@/components/ui/typography'
import { useSignupMutation } from '@/redux/features/authApi'
import { rtkErrorMesage } from '@/utils/error/errorMessage'
import { MailCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm()

  const [signup, { isLoading, isSuccess, isError, error }] = useSignupMutation()

  const [showEmailSendComp, setshowEmailSendComp] = useState(false)

  const onSubmit = data => {
    if (!data.checked) return toast.error('Please agree to the terms and conditions')

    const allData = {
      name: data.firstName + ' ' + data.lastName,
      email: data.email.trim(),
      password: data.password,
      type: 'user'
    }

    signup(allData)
  }

  useEffect(() => {
    if (isSuccess) {
      reset()
      setshowEmailSendComp(true)
      toast.success('Check your email to verify your account')
    }
    if (isError) toast.error(rtkErrorMesage(error))
  }, [isSuccess, isError, error, reset])

  if (showEmailSendComp)
    return (
      <div className='flex items-center justify-center mt-10'>
        <div className='flex flex-col items-center justify-center'>
          <MailCheck size={72} strokeWidth={1} className='text-emerald-500' />
          <Typography variant='h3' className='font-medium text-center mt-5'>
            Check Your Inbox
          </Typography>
          <p className='font-medium text-text-tartiary text-lg text-balance mt-5 max-w-md'>
            We have sent you an email to verify your account. Please check your inbox.
          </p>
        </div>
      </div>
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col min-[500px]:flex-row gap-x-3 mt-4'>
        <Input
          name='firstName'
          placeholder='First Name'
          label='First Name'
          register={register}
          errors={errors}
          showLabel
          required
          labelClassName='text-left'
        />
        <Input
          name='lastName'
          placeholder='Last Name'
          label='Last Name'
          register={register}
          errors={errors}
          showLabel
          required
          labelClassName='text-left'
        />
      </div>

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
        <Checkbox id='terms-check' onCheckedChange={e => setValue('checked', e)} />
        <Label className='text-text-tartiary' htmlFor='terms-check'>
          I agree to all the{' '}
          <a href='#' className='font-medium text-text-secondary'>
            Terms & Conditions
          </a>
        </Label>
      </div>

      <Button variant='black' type='submit' className='w-full mt-5' isLoading={isLoading}>
        Register
      </Button>

      <div className='flex flex-wrap items-center justify-center gap-x-1 mt-5'>
        <p className='text-text-tartiary text-sm'>Already have an account?</p>
        <LLink className='font-medium text-text-secondary'>
          <Button variant='link' className='font-medium underline px-1 text-text-secondary hover:text-sky-600'>
            Login
          </Button>
        </LLink>
      </div>
    </form>
  )
}
