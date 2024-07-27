'use client'

import { API_URL } from '@/configs'
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

export const fetchData = async ({ msg, setisLoading, setTempMessages, tempMessages, setMessage, id, cb }) => {
  const prompt = {
    thread_id: id,
    message: msg,
    instructions: 'You are a genius programmer and professor at MIT'
  }

  // Show the user's message immediately
  setisLoading(true)
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

  const xs = XhrSource(`${API_URL}/threads/run/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prompt)
  })

  xs.addEventListener('error', e => {
    setisLoading(false)
    console.log(e.reason)
  })

  xs.addEventListener('close', async () => {
    await cb()
  })

  xs.addEventListener('message', e => {
    setisLoading(false)
    const msg = JSON.parse(e.data)
    setTempMessages(prev => {
      const updatedMessages = [...prev]
      const lastMessageIndex = updatedMessages.findIndex(m => m.id === newAssistantMessage.id)
      if (lastMessageIndex !== -1) {
        updatedMessages[lastMessageIndex].content[0].text.value += msg
      }
      return updatedMessages
    })
  })

  setMessage('')
}

export default function BotContainer({ threadId }) {
  const [navbarOpen, setnavbarOpen] = useState(false)

  // Bot States
  const [message, setMessage] = useState('')
  const [isLoading, setisLoading] = useState('')
  const [tempMessages, setTempMessages] = useState([])

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
      />
    </>
  )
}
