'use client'

import { useForm } from 'react-hook-form'

export default function AddCompanyInfoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = data => {
    console.log(data)
  }

  return <form onSubmit={handleSubmit(onSubmit)}></form>
}
