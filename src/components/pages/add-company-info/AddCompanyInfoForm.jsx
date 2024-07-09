'use client'

import { Button } from '@/components/ui/button'
import DnDUpload from '@/components/ui/dnd-upload'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import usePush from '@/hooks/usePush'
import { useAddCompanyInfoMutation } from '@/redux/features/companiesApi'
import { rtkErrorMesage } from '@/utils/error/errorMessage'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function AddCompanyInfoForm({ t }) {
  const push = usePush()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  const [addInfo, { isSuccess, isLoading, isError, error }] = useAddCompanyInfoMutation()

  const onSubmit = data => addInfo(data)

  useEffect(() => {
    if (isSuccess) {
      toast.success(t.success)
      push('/subscribe')
    }

    if (isError) toast.error(rtkErrorMesage(error))
  }, [isSuccess, isError, error])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-background rounded-2xl p-6 mt-5 inline-flex flex-col w-full max-w-xl'
    >
      <DnDUpload label={t.companyLogo} accept='image/*' className='max-w-lg' cb={e => setValue('logo', e)} />

      <Input
        name='name'
        register={register}
        errors={errors}
        label={t.companyName}
        placeholder={t.companyName}
        required
        showLabel
        className='max-w-lg'
        labelClassName='mt-6'
      />
      <Input
        name='industry'
        register={register}
        errors={errors}
        label={t.companyIndustry}
        placeholder={t.companyIndustry}
        required
        showLabel
        className='max-w-lg'
      />
      <Input
        type='url'
        name='web_url'
        register={register}
        errors={errors}
        label={t.companyWebsite}
        placeholder={t.companyWebsite}
        required
        showLabel
        className='max-w-lg'
      />
      <Textarea
        name='address'
        register={register}
        errors={errors}
        label={t.companyAddress}
        placeholder={t.companyAddress}
        required
        showLabel
        className='max-w-lg'
      />
      <Textarea
        name='description'
        register={register}
        errors={errors}
        label={t.companyDescription}
        placeholder={t.companyDescription}
        required
        showLabel
        className='max-w-lg'
        rows={5}
      />

      <Button type='submit' variant='black' className='w-full max-w-lg' isLoading={isLoading}>
        {t.save}
      </Button>
    </form>
  )
}
