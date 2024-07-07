import AddCompanyInfoForm from '@/components/pages/add-company-info/AddCompanyInfoForm'
import Typography from '@/components/ui/typography'

export const metadata = {
  title: 'Add Company Info | Inova'
}

export default function AddCompanyInfo() {
  return (
    <div className='container py-10'>
      <Typography variant='h2' className='font-medium'>
        Add Company Info
      </Typography>
      <p className='text-balance font-medium text-lg text-text-tartiary mt-1 max-w-xl'>
        Add Company info to get started. Use correct information to avoid any issues.
      </p>

      <AddCompanyInfoForm />
    </div>
  )
}
