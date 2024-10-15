'use client'

import ThemeSwitcher from '@/components/common/ThemeSwitcher'
import { Img } from '@/components/ui/img'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import styles from '@/styles/botStyles.module.scss'
import { AlignLeft } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function BotNav({ botData, openNavbar }) {
  const { theme } = useTheme()
  return (
    <nav className='fixed top-0 left-0 w-full h-[72px] z-20 backdrop-blur-lg'>
      <div className='flex items-center justify-between h-full container py-3'>
        <div className='flex items-center gap-x-2 h-full'>
          <AlignLeft
            strokeWidth={1.5}
            className={cn('size-7 sm:size-10 cursor-pointer inline-block text-text-black')}
            onClick={openNavbar}
          />
          {botData ? (
            <Img
              src={theme === 'dark' && botData?.logo_dark ? botData?.logo_dark : botData?.logo_light}
              alt='logo'
              className='h-10 sm:h-full w-auto'
            />
          ) : (
            <Skeleton className='w-28 h-12 rounded-lg' />
          )}
        </div>
        <div className={cn('size-10 flex items-center justify-center rounded-full', styles.rightMsg)}>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  )
}
