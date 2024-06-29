'use client'

import logo from '@/assets/images/ui/logo.png'
import { Button } from '../ui/button'
import { Img } from '../ui/img'
import LLink from '../ui/llink'

export default function Navbar({ t }) {
  return (
    <header className='fixed w-full top-0 left-0 right-0 h-20 backdrop-blur-lg z-50'>
      <nav className='container flex items-center justify-between h-full'>
        <Img src={logo} alt='Inova' className='w-48 h-auto' />
        <ul className='flex gap-x-5 text-text-secondary font-medium'>
          {t.navLinks?.map(link => (
            <li key={link.id}>
              <LLink href={link.href}>{link.title}</LLink>
            </li>
          ))}
        </ul>

        <div className='space-x-6'>
          <LLink href='/login' className='text-text-secondary font-medium'>
            {t.login}
          </LLink>
          <LLink href='/signup'>
            <Button>{t.signup}</Button>
          </LLink>
        </div>
      </nav>
    </header>
  )
}
