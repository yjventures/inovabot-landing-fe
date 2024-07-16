/* eslint-disable react/no-children-prop */
'use client'

import { Input } from '@/components/ui/input'
import MarkdownRenderer from '@/components/ui/markdown-renderer'
import { Skeleton } from '@/components/ui/skeleton'
import { API_URL } from '@/configs'
import botData from '@/constants/bot-page-temp.json'
import { cn } from '@/lib/utils'
import { useGetThreadMessagesQuery } from '@/redux/features/botApi'
import { XhrSource } from '@/utils/form/eventStream'
import { useEffect, useMemo, useRef, useState } from 'react'
// import lightBg from './../../../../../public/temp/light-bg.jpg'
import avatarImg from '@/assets/temp/avatar.png'
import botImg from '@/assets/temp/bot.png'
import logo from '@/assets/temp/logo.png'
import rigmtImg from '@/assets/temp/right-img.png'
import lightBg from '@/assets/temp/violet-bg.jpg'
import { Img } from '@/components/ui/img'

const faqs = [
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

export default function Bot({ id }) {
  const [message, setMessage] = useState('')
  const [isLoading, setisLoading] = useState('')
  const [tempMessages, setTempMessages] = useState([]) // For temporary messages
  const endOfMessagesRef = useRef(null) // Ref for the last message element

  const prompt = useMemo(
    () => ({
      thread_id: id,
      message,
      instructions: 'You are a genius programmer and professor at MIT'
    }),
    [id, message]
  )

  const { data: messagesList, isLoading: isListLoading, isSuccess, refetch } = useGetThreadMessagesQuery(id)

  useEffect(() => {
    if (isSuccess) {
      setTempMessages(messagesList?.messages || [])
    }
  }, [messagesList, isSuccess])

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [tempMessages])

  const fetchData = async () => {
    // Show the user's message immediately
    const newMessage = {
      id: `temp-${Date.now()}`,
      role: 'user',
      content: [{ text: { value: message } }]
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
      console.log(e.reason)
    })

    xs.addEventListener('close', async () => {
      await refetch()
    })

    xs.addEventListener('message', e => {
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

  useEffect(() => {
    document.documentElement.style.setProperty('--bot-primary-color', botData.colors.primary)
    document.documentElement.style.setProperty('--bot-secondary-color', botData.colors.secondary)
    document.documentElement.style.setProperty('--bot-font-color', botData.colors.font)
  }, [])

  return (
    <main className='relative h-screen px-10'>
      <nav className='fixed top-0 left-0 w-full h-32 z-20 container flex items-center'>
        <Img src={logo} alt='logo' className='h-1/2 w-auto' />
      </nav>
      <Img src={lightBg} alt='Light background' className='fixed w-full h-screen inset-0 object-cover' />
      <div className='px-5 pt-32 pb-5 h-[calc(100vh-76px)] overflow-hidden relative flex gap-x-5'>
        <div
          className='w-80 h-96 overflow-y-auto inline-flex flex-col gap-y-5 px-3 py-4 mt-20 rounded-xl self-start border-2'
          style={{
            backgroundColor: botData.colors.primary,
            color: botData.colors.font,
            borderColor: botData.colors.font
          }}
        >
          {faqs.map(faq => (
            <p
              key={faq}
              className='font-medium cursor-pointer'
              onClick={() => {
                setMessage(faq)
                fetchData()
              }}
            >
              {faq}
            </p>
          ))}
        </div>
        <div className='max-w-7xl mx-auto overflow-y-auto h-full'>
          {isListLoading ? (
            <div className='flex flex-col my-3 gap-y-5'>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={cn('flex', { 'justify-end': index % 2, 'justify-start': !index % 2 })}>
                  <Skeleton className='w-2/3 h-40 mb-2' />
                </div>
              ))}
            </div>
          ) : null}

          {isSuccess
            ? tempMessages?.map(msg => (
                <div
                  key={msg.id}
                  className={cn('flex gap-x-2 px-3', {
                    'pl-20 justify-end': msg.role === 'user',
                    'pr-20 justify-start': msg.role === 'assistant'
                  })}
                >
                  {msg.role === 'assistant' && (
                    <Img src={botImg} alt='Bot' className='size-10 aspect-square object-cover mt-4 rounded-full' />
                  )}
                  <div
                    style={{
                      backgroundColor: `${msg.role === 'user' ? botData.colors.primary : botData.colors.secondary}`,
                      color: botData.colors.font
                    }}
                    className={cn('max-w-3xl my-3 p-2 text-sm rounded-lg', {
                      'ml-auto border-2': msg.role === 'user',
                      'mr-auto': msg.role === 'assistant'
                    })}
                  >
                    <MarkdownRenderer
                      className='markdown text-sm'
                      codeClassName='bg-rose-200 font-semibold px-1 py-0.5 text-rose-800 rounded-sm'
                    >
                      {msg.content[0].text.value}
                    </MarkdownRenderer>
                  </div>
                  {msg.role === 'user' && (
                    <Img
                      src={avatarImg}
                      alt='Avatar'
                      className='size-10 aspect-square object-cover mt-4 rounded-full'
                    />
                  )}
                </div>
              ))
            : null}
          <div ref={endOfMessagesRef} />
        </div>
        <Img src={rigmtImg} alt='right image' className='w-80 h-auto self-start mt-20' />
      </div>
      <div className='fixed bottom-5 left-1/2 -translate-x-1/2 max-w-4xl w-full'>
        <div className='flex items-center justify-between rounded-xl gap-x-3 bg-white'>
          <Input
            type='text'
            containerClassName='w-full max-w-full h-14'
            className='w-full max-w-full h-14 border-none focus-visible:ring-0'
            placeholder='Type a message...'
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 64 64'
            id='send'
            className='size-8 cursor-pointer text-violet-800 mr-2 fill-current'
            onClick={fetchData}
          >
            <defs>
              <clipPath id='a'>
                <rect width='64' height='64'></rect>
              </clipPath>
            </defs>
            <g clip-path='url(#a)'>
              <path d=' M 8.216 36.338 L 26.885 32.604 C 28.552 32.271 28.552 31.729 26.885 31.396 L 8.216 27.662 C 7.104 27.44 6.021 26.356 5.799 25.245 L 2.065 6.576 C 1.731 4.908 2.714 4.133 4.259 4.846 L 61.228 31.139 C 62.257 31.614 62.257 32.386 61.228 32.861 L 4.259 59.154 C 2.714 59.867 1.731 59.092 2.065 57.424 L 5.799 38.755 C 6.021 37.644 7.104 36.56 8.216 36.338 Z '></path>
            </g>
          </svg>
        </div>
      </div>
    </main>
  )
}
