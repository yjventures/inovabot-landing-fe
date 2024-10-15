'use client'

import { useCreateThreadMutation, useGetBotUsingSlugQuery } from '@/redux/features/botApi'
import { rtkErrorMesage } from '@/utils/error/errorMessage'
import uuid from '@/utils/form/uuid'
import { getCookie, setCookie } from 'cookies-next'
import { useTheme } from 'next-themes'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import BotContainer from './BotContainer'
import BotMobileNav from './BotMobileNav'

export default function BotPageComponent() {
  const [bot_id, setbot_id] = useState(undefined)
  const [thread_id, setthread_id] = useState(undefined)
  const [uid, setuid] = useState(undefined)

  const [
    createThread,
    { isSuccess: isThreadSuccess, isError, error, data: threadData, isLoading: isCreateThreadLoading }
  ] = useCreateThreadMutation()

  useEffect(() => {
    if (bot_id) {
      const localUid = getCookie('uid')
      if (localUid) setuid(localUid)
      else {
        const newUid = uuid()
        setCookie('uid', newUid)
        setuid(newUid)
        createThread({ bot_id, thread_id: 'new', name: 'Untitled Thread', unique_id: newUid })
      }
    }
  }, [bot_id, createThread])

  const { slug } = useParams()
  const { data, isSuccess } = useGetBotUsingSlugQuery(slug)

  // Setting the bot variables only for bot page
  const { theme } = useTheme()
  useEffect(() => {
    if (isSuccess) {
      setbot_id(data?.data?._id)

      if (theme === 'light') {
        document.documentElement.style.setProperty('--bot-primary-color', data?.data?.primary_color)
        document.documentElement.style.setProperty('--bot-secondary-color', data?.data?.secondary_color)
        document.documentElement.style.setProperty('--bot-font-color', data?.data?.font_color)
      } else if (theme === 'dark') {
        document.documentElement.style.setProperty('--bot-primary-color', data?.data?.primary_color_dark)
        document.documentElement.style.setProperty('--bot-secondary-color', data?.data?.secondary_color_dark)
        document.documentElement.style.setProperty('--bot-font-color', data?.data?.font_color_dark)
      }
    }
  }, [isSuccess, data, theme])

  const [navbarOpen, setnavbarOpen] = useState(true)

  // Bot States
  const [message, setMessage] = useState('')
  const [isLoading, setisLoading] = useState('')
  const [tempMessages, setTempMessages] = useState([])
  const [current_run, setcurrent_run] = useState(undefined)

  useEffect(() => {
    if (isThreadSuccess && bot_id) {
      console.log(threadData)
      const newThreadId = threadData?.thread?._id
      setthread_id(newThreadId)
    }

    if (isError) toast.error(rtkErrorMesage(error))
  }, [isThreadSuccess, isError, error, threadData, bot_id])

  const closeNavbar = () => {
    setnavbarOpen(false)
    setCookie('navbarOpen', false)
  }

  const openNavbar = () => {
    setnavbarOpen(true)
    setCookie('navbarOpen', true)
  }

  useEffect(() => {
    const isNavbarOpen = getCookie('navbarOpen')
    if (isNavbarOpen === 'true') setnavbarOpen(true)
    else setnavbarOpen(false)
  }, [])

  return (
    <div>
      <BotContainer
        id={thread_id}
        botData={data?.data}
        navbarOpen={navbarOpen}
        openNavbar={openNavbar}
        message={message}
        setMessage={setMessage}
        tempMessages={tempMessages}
        setTempMessages={setTempMessages}
        isLoading={isLoading}
        setisLoading={setisLoading}
        current_run={current_run}
        setcurrent_run={setcurrent_run}
      />
      <BotMobileNav
        uid={uid}
        bot_id={bot_id}
        id={thread_id}
        botData={data?.data}
        navbarOpen={navbarOpen}
        closeNavbar={closeNavbar}
        setMessage={setMessage}
        tempMessages={tempMessages}
        setTempMessages={setTempMessages}
        setisLoading={setisLoading}
        isCreateThreadLoading={isCreateThreadLoading}
        createNewThread={() => createThread({ bot_id, thread_id: 'new', name: 'Untitled Thread', unique_id: uid })}
        setthread_id={setthread_id}
        thread_id={thread_id}
      />
    </div>
  )
}
