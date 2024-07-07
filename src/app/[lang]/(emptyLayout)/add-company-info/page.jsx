import AddCompanyInfoForm from '@/components/pages/add-company-info/AddCompanyInfoForm'
import Typography from '@/components/ui/typography'
import { getCompanyInfoDict } from '@/utils/i18n/get-dictionary'

export const metadata = {
  title: 'Add Company Info | Inova'
}

export default async function AddCompanyInfo({ params: { lang } }) {
  const dict = await getCompanyInfoDict(lang)
  const t = dict.companyInfo
  return (
    <div className='container py-10'>
      <Typography variant='h2' className='font-medium'>
        {t.title}
      </Typography>
      <p className='text-balance font-medium text-lg text-text-tartiary mt-1 max-w-xl'>{t.description}</p>

      <AddCompanyInfoForm t={t.form} />
    </div>
  )
}
