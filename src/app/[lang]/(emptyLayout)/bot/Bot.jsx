/* eslint-disable react/no-children-prop */
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { API_URL } from '@/configs'
import { cn } from '@/lib/utils'
import { useGetThreadMessagesQuery } from '@/redux/features/botApi'
import { XhrSource } from '@/utils/form/eventStream'
import { Send } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

const formatTextToMarkdown = text => {
  // Replace new lines with double new lines to make markdown line breaks
  let formattedText = text.replace(/\n/g, '\n\n')

  // Escape backticks to prevent code block issues
  formattedText = formattedText.replace(/`/g, '\\`')

  // Handle indentation for code blocks (assuming the text marks code blocks with ```)
  formattedText = formattedText.replace(/```/g, '```\n')

  return formattedText
}

export default function Bot({ id }) {
  const [data, setData] = useState('')
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

    // xs.send()

    setMessage('') // Clear the input
  }

  return (
    <main className='bg-[#F9F9FC] relative h-screen'>
      <div className='px-5 pt-10 pb-5 h-[calc(100vh-90px)] overflow-y-auto'>
        <div className='max-w-6xl mx-auto'>
          {tempMessages?.map(msg => (
            <div key={msg.id} className={cn({ 'ml-20': msg.role === 'user', 'mr-20': msg.role === 'assistant' })}>
              <Markdown
                className={cn('w-full max-w-3xl prose my-3 p-2 text-sm border rounded-lg', {
                  'ml-auto bg-white rounded-ee-none': msg.role === 'user',
                  'mr-auto bg-[#F0F1F3] rounded-es-none': msg.role === 'assistant'
                })}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')

                    return !inline && match ? (
                      <SyntaxHighlighter style={dracula} PreTag='div' language={match[1]} {...props}>
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code
                        className='after:hidden before:hidden bg-rose-200 font-semibold px-1 py-0.5 text-rose-800 rounded-sm'
                        {...props}
                      >
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {msg.content[0].text.value}
              </Markdown>
            </div>
          ))}
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
