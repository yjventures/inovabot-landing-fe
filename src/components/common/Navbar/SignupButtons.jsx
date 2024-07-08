'use client'

import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { cn } from '@/lib/utils'
import { logoutActions } from '@/utils/auth/logoutActions'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

export default function SignupButtons({ t, className }) {
  const refreshToken = getCookie('refreshToken')
  const dispatch = useDispatch()
  const { refresh } = useRouter()
  return (
    <div className={cn('flex flex-col items-center justify-center lg:flex-row gap-y-3 gap-x-6', className)}>
      {refreshToken ? (
        <Button onClick={() => logoutActions(dispatch, refresh)}>Logout</Button>
      ) : (
        <>
          <LLink href='/login' className='text-text-secondary font-medium'>
            {t.login}
          </LLink>
          <LLink href='/signup'>
            <Button>{t.signup}</Button>
          </LLink>
        </>
      )}
    </div>
  )
}
