'use client'

import { useState } from 'react'
import Bot from './Bot'
import BotMobileNav from './BotMobileNav'

export default function BotContainer({ botId }) {
  const [navbarOpen, setnavbarOpen] = useState(false)
  return (
    <>
      <Bot id={botId} setnavbarOpen={setnavbarOpen} />
      <BotMobileNav navbarOpen={navbarOpen} setnavbarOpen={setnavbarOpen} />
    </>
  )
}
