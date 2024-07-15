/* eslint-disable react/no-children-prop */
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import MarkdownRenderer from '@/components/ui/markdown-renderer'
import { Skeleton } from '@/components/ui/skeleton'
import { API_URL } from '@/configs'
import botData from '@/constants/bot-page-temp.json'
import { cn } from '@/lib/utils'
import { useGetThreadMessagesQuery } from '@/redux/features/botApi'
import { XhrSource } from '@/utils/form/eventStream'
import { Send } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
// import lightBg from './../../../../../public/temp/light-bg.jpg'
import lightBg from '@/assets/temp/light-bg.jpg'
import logo from '@/assets/temp/logo.png'
import { Img } from '@/components/ui/img'

const faqs = [
  'What is Binary Search?',
  'What is the time complexity of Binary Search?',
  'What is the space complexity of Binary Search?',
  'What is the difference between Linear Search and Binary Search?',
  'What are the applications of Binary Search?'
]

export default function Bot({ id }) {
  console.log(botData)
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

  return (
    <main className='relative h-screen'>
      <nav className='fixed top-0 left-0 w-full h-20 z-20'>
        <Img src={logo} alt='logo' className='h-2/3 w-auto' />
      </nav>
      <Img src={lightBg} alt='Light background' className='fixed w-full h-screen inset-0 object-cover' />
      <div className='px-5 pt-20 pb-5 h-[calc(100vh-90px)] overflow-hidden relative flex gap-x-5'>
        <div className='w-80 h-auto inline-flex flex-col gap-y-3 px-3 py-4 bg-gray-50 rounded-xl self-start'>
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
                  className={cn('flex', {
                    'pl-20 justify-end': msg.role === 'user',
                    'pr-20 justify-start': msg.role === 'assistant'
                  })}
                >
                  <MarkdownRenderer
                    style={{
                      fontSize: '50px',
                      backgroundColor: `${msg.role === 'user' ? botData.colors.primary : botData.colors.secondary}`
                    }}
                    className={cn(
                      'max-w-3xl my-3 p-2 text-sm border rounded-lg',
                      {
                        'ml-auto': msg.role === 'user',
                        'mr-auto': msg.role === 'assistant'
                      }
                      // {
                      //   [msg.role === 'user' ? `bg-['${botData.colors.primary}'] rounded-ee-none` : '']:
                      //     msg.role === 'user',
                      //   [msg.role === 'assistant' ? `bg-[${botData.colors.secondary}] rounded-es-none` : '']:
                      //     msg.role === 'assistant'
                      // }
                    )}
                    codeClassName='bg-rose-200 font-semibold px-1 py-0.5 text-rose-800 rounded-sm'
                  >
                    {msg.content[0].text.value}
                  </MarkdownRenderer>
                </div>
              ))
            : null}
          <div ref={endOfMessagesRef} />
        </div>
        <div className='w-52 h-52 bg-red-400' />
      </div>
      <div className='fixed bottom-5 left-1/2 -translate-x-1/2 max-w-6xl w-full'>
        <div className='flex items-center justify-between rounded-lg p-3 gap-x-3'>
          <Input
            type='text'
            containerClassName='w-full max-w-full h-12'
            className='w-full max-w-full h-12'
            placeholder='Type a message...'
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <Button size='icon' variant='black' onClick={fetchData} className='size-11'>
            <Send className='size-5' strokeWidth={2} />
          </Button>
        </div>
      </div>
    </main>
  )
}
