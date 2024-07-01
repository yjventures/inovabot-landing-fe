'use client'

import logo from '@/assets/images/ui/logo.png'
import { AlignRight } from 'lucide-react'
import { useState } from 'react'
import { Img } from '../../ui/img'
import LLink from '../../ui/llink'
import MobileNavbar from './MobileNavbar'
import SignupButtons from './SignupButtons'

export default function Navbar({ t }) {
  const [navbarOpen, setnavbarOpen] = useState(false)
  return (
    <>
      <header className='fixed w-full top-0 left-0 right-0 h-20 backdrop-blur-lg z-40'>
        <nav className='container flex items-center justify-between h-full'>
          <Img src={logo} alt='Inova' className='w-auto h-1/2' />
          <ul className='hidden lg:flex gap-x-5 text-text-secondary font-medium'>
            {t.navLinks?.map(link => (
              <li key={link.id}>
                <LLink href={link.href}>{link.title}</LLink>
              </li>
            ))}
          </ul>

          <div className='flex items-center gap-x-3'>
            <SignupButtons t={t} className='hidden lg:flex' />

            <AlignRight
              className='inline-block lg:hidden w-6 h-6 text-text-white cursor-pointer'
              onClick={() => setnavbarOpen(!navbarOpen)}
            />
          </div>
        </nav>
      </header>
      <MobileNavbar navbarOpen={navbarOpen} setnavbarOpen={setnavbarOpen} t={t} />
    </>
  )
}
