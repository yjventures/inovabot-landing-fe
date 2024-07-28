'use client'

import { API_URL } from '@/configs'
import { axiosInstance } from '@/lib/axios/interceptor'
import { XhrSource } from '@/utils/form/eventStream'
import { useState } from 'react'
import Bot from './Bot'
import BotMobileNav from './BotMobileNav'

export const faqs = [
  'What is Binary Search?',
  'What is the time complexity of Binary Search?',
  'What is the space complexity of Binary Search?',
  'What is the difference between Linear Search and Binary Search?',
  'What are the applications of Binary Search?',
  'What is the Binary Search Algorithm?',
  'What is the Binary Search Tree?',
  'What is the Binary Search Tree Data Structure?',
  'What are the properties of Binary Search Tree?'
]

export const fetchData = async ({
  msg,
  setisLoading,
  setTempMessages,
  tempMessages,
  setMessage,
  id,
  cb,
  setaudioURL,
  controller = null
}) => {
  const prompt = {
    thread_id: id,
    message: msg,
    instructions: 'You are a genius programmer and professor at MIT'
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

export default function BotContainer({ threadId }) {
  const [navbarOpen, setnavbarOpen] = useState(false)

  // Bot States
  const [message, setMessage] = useState('')
  const [isLoading, setisLoading] = useState('')
  const [tempMessages, setTempMessages] = useState([])
  const [audioURL, setaudioURL] = useState(null)

  return (
    <>
      <Bot
        id={threadId}
        setnavbarOpen={setnavbarOpen}
        message={message}
        setMessage={setMessage}
        tempMessages={tempMessages}
        setTempMessages={setTempMessages}
        isLoading={isLoading}
        setisLoading={setisLoading}
        audioURL={audioURL}
        setaudioURL={setaudioURL}
      />
      <BotMobileNav
        id={threadId}
        navbarOpen={navbarOpen}
        setnavbarOpen={setnavbarOpen}
        message={message}
        setMessage={setMessage}
        tempMessages={tempMessages}
        setTempMessages={setTempMessages}
        isLoading={isLoading}
        setisLoading={setisLoading}
        setaudioURL={setaudioURL}
      />
    </>
  )
}
