/* eslint-disable react/no-children-prop */
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import MarkdownRenderer from '@/components/ui/markdown-renderer'
import { Skeleton } from '@/components/ui/skeleton'
import { API_URL } from '@/configs'
import { cn } from '@/lib/utils'
import { useGetThreadMessagesQuery } from '@/redux/features/botApi'
import { XhrSource } from '@/utils/form/eventStream'
import { Send } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function Bot({ id }) {
  const [message, setMessage] = useState('')
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

  const { data: messagesList, isLoading, isSuccess, refetch } = useGetThreadMessagesQuery(id)

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
    <main className='bg-[#F9F9FC] relative h-screen'>
      <div className='px-5 pt-10 pb-5 h-[calc(100vh-90px)] overflow-y-auto'>
        <div className='max-w-6xl mx-auto'>
          {isLoading ? (
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
                    className={cn('max-w-3xl my-3 p-2 text-sm border rounded-lg', {
                      'ml-auto bg-white rounded-ee-none': msg.role === 'user',
                      'mr-auto bg-[#F0F1F3] rounded-es-none': msg.role === 'assistant'
                    })}
                    codeClassName='bg-rose-200 font-semibold px-1 py-0.5 text-rose-800 rounded-sm'
                  >
                    {msg.content[0].text.value}
                  </MarkdownRenderer>
                </div>
              ))
            : null}
          <div ref={endOfMessagesRef} />
        </div>
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
