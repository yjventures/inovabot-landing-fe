import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { cn } from '@/lib/utils'

export default function SignupButtons({ t, className }) {
  return (
    <div className={cn('flex flex-col lg:flex-row gap-y-3 gap-x-6', className)}>
      <LLink href='/login' className='text-text-secondary font-medium'>
        {t.login}
      </LLink>
      <LLink href='/signup'>
        <Button>{t.signup}</Button>
      </LLink>
    </div>
  )
}
