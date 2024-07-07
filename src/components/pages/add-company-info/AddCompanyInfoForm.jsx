'use client'

import { Button } from '@/components/ui/button'
import DnDUpload from '@/components/ui/dnd-upload'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'

export default function AddCompanyInfoForm({ t }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  const onSubmit = data => {
    console.log(data)
  }

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

      <Button type='submit' variant='black' className='w-full max-w-lg'>
        {t.save}
      </Button>
    </form>
  )
}
