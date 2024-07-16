'use client'

import { useState } from 'react'
import Bot from './Bot'
import BotMobileNav from './BotMobileNav'

export default function BotContainer() {
  const [navbarOpen, setnavbarOpen] = useState(false)
  return (
    <>
      <Bot id='668fadec9577e0dfdeaf9430' setnavbarOpen={setnavbarOpen} />
      <BotMobileNav navbarOpen={navbarOpen} setnavbarOpen={setnavbarOpen} />
    </>
  )
}
