'use client'

import { API_URL } from '@/configs'
import { axiosInstance } from '@/lib/axios/interceptor'
import { useCreateThreadMutation, useGetBotFAQQuery, useGetBotUsingSlugQuery } from '@/redux/features/botApi'
import { rtkErrorMesage } from '@/utils/error/errorMessage'
import { XhrSource } from '@/utils/form/eventStream'
import { getCookie, setCookie } from 'cookies-next'
import { useTheme } from 'next-themes'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Bot from './Bot'
import BotMobileNav from './BotMobileNav'

export const fetchData = async ({
  msg,
  setisLoading,
  setTempMessages,
  tempMessages,
  setMessage,
  id,
  cb,
  setaudioURL,
  controller = null,
  instructions
}) => {
  const prompt = {
    thread_id: id,
    message: msg,
    instructions: instructions || 'You are already instructed, give answer as the previous commands'
  }

  const newMessage = {
    id: `temp-${Date.now()}`,
    role: 'user',
    content: [{ text: { value: msg } }]
  }
  const newAssistantMessage = {
    id: `temp-${Date.now() + 1}`,
    role: 'assistant',
    content: [{ text: { value: '' } }]
  }
  setTempMessages([...tempMessages, newMessage, newAssistantMessage])
  setisLoading(true)
  setaudioURL(null)

  let msgRes = ''

  try {
    const xs = XhrSource(`${API_URL}/threads/run/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prompt)
    })

    xs.addEventListener('error', e => {
      setisLoading(false)
      console.error(e.reason)
    })

    xs.addEventListener('close', async () => {
      await cb()

      const res = await axiosInstance.post(
        `${API_URL}/audios/text-to-speech`,
        { message: msgRes },
        { responseType: 'blob' }
      )

      const url = URL.createObjectURL(res.data)
      setaudioURL(url)
    })

    xs.addEventListener('message', e => {
      setisLoading(false)
      const msg = JSON.parse(e.data)
      setTempMessages(prev => {
        const updatedMessages = [...prev]
        const lastMessageIndex = updatedMessages.findIndex(m => m.id === newAssistantMessage.id)
        if (lastMessageIndex !== -1) {
          updatedMessages[lastMessageIndex].content[0].text.value += msg
          msgRes += msg
        }
        return updatedMessages
      })
    })

    controller.current = xs
  } catch (error) {
    console.error('Fetch error:', error)
  }

  setMessage('')
}

export default function BotContainer() {
  const [bot_id, setbot_id] = useState(undefined)
  const [thread_id, setthread_id] = useState(undefined)

  const { slug } = useParams()
  const { data, isSuccess } = useGetBotUsingSlugQuery(slug)

  const [createThread, { isSuccess: isThreadSuccess, isError, error, data: threadData }] = useCreateThreadMutation()

  const { theme } = useTheme()

  useEffect(() => {
    if (isSuccess) {
      console.log(data?.data?._id)
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

  const { data: faqs, isLoading: isFaqLoading } = useGetBotFAQQuery(bot_id)

  const localBotData = getCookie('botData')

  useEffect(() => {
    if (localBotData && bot_id) {
      const botDataParsed = JSON.parse(localBotData)
      const localBotId = botDataParsed.bot_id

      if (localBotId === bot_id) setthread_id(botDataParsed.thread_id)
      else createThread({ bot_id, thread_id: 'new' })
    } else if (!localBotData && bot_id) createThread({ bot_id, thread_id: 'new' })
  }, [localBotData, bot_id, createThread])

  const [navbarOpen, setnavbarOpen] = useState(false)

  // Bot States
  const [message, setMessage] = useState('')
  const [isLoading, setisLoading] = useState('')
  const [tempMessages, setTempMessages] = useState([])
  const [audioURL, setaudioURL] = useState(null)

  useEffect(() => {
    if (isThreadSuccess && bot_id) {
      const newThreadId = threadData?.thread?._id
      setthread_id(newThreadId)
      setCookie('botData', JSON.stringify({ bot_id, thread_id: newThreadId }))
    }

    if (isError) toast.error(rtkErrorMesage(error))
  }, [isThreadSuccess, isError, error, threadData, bot_id])

  return (
    <>
      <Bot
        id={thread_id}
        botData={data?.data}
        setnavbarOpen={setnavbarOpen}
        message={message}
        setMessage={setMessage}
        tempMessages={tempMessages}
        setTempMessages={setTempMessages}
        isLoading={isLoading}
        setisLoading={setisLoading}
        audioURL={audioURL}
        setaudioURL={setaudioURL}
        faqs={faqs}
        isFaqLoading={isFaqLoading}
      />
      <BotMobileNav
        id={thread_id}
        botData={data?.data}
        navbarOpen={navbarOpen}
        setnavbarOpen={setnavbarOpen}
        message={message}
        setMessage={setMessage}
        tempMessages={tempMessages}
        setTempMessages={setTempMessages}
        isLoading={isLoading}
        setisLoading={setisLoading}
        setaudioURL={setaudioURL}
        faqs={faqs}
        isFaqLoading={isFaqLoading}
      />
    </>
  )
}
