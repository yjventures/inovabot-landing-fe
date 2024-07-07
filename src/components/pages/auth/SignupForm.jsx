'use client'

import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = data => {
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-x-3'>
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
    </form>
  )
}
