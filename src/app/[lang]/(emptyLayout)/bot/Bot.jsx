/* eslint-disable react/no-children-prop */
'use client'

import { API_URL } from '@/configs'
import { cn } from '@/lib/utils'
import { useGetThreadMessagesQuery } from '@/redux/features/botApi'
import { XhrSource } from '@/utils/form/eventStream'
import { useMemo, useState } from 'react'
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

  const [message, setmessage] = useState('')

  const prompt = useMemo(
    () => ({
      thread_id: id,
      message,
      instructions: 'You are a genius programmer and professor at MIT'
    }),
    [id, message]
  )

  const { data: messagesList, isLoading, isSuccess, refetch } = useGetThreadMessagesQuery(id)

  console.log(messagesList)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`${API_URL}/threads/run/${id}`, {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json, text/plain, */*',
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(prompt)
  //       })

  //       if (!response.ok) throw new Error('Network response was not ok')

  //       const reader = response.body.getReader()
  //       const decoder = new TextDecoder()

  //       let result
  //       while (true) {
  //         result = await reader.read()
  //         if (result.done) break
  //         if (result.value) {
  //           const chunk = decoder.decode(result.value, { stream: true })
  //           const text = chunk
  //             .split('\n')
  //             .map(line => line.replace(/^data: /, '').replace(/(^"|"$)/g, ''))
  //             .join('')

  //           // Incrementally update the data
  //           setData(prevData => prevData + text)
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Fetch error: ', error)
  //     }
  //   }

  //   //fetchData()
  // }, [id, prompt])

  const fetchData = async () => {
    const xs = XhrSource(`${API_URL}/threads/run/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prompt)
    })

    xs.addEventListener('error', e => {
      //outputEl.textContent += 'ERROR: ' + e.reason
      console.log(e.reason)
    })

    xs.addEventListener('close', e => {
      console.log('DONE')
      // outputEl.textContent += '\nDONE'
    })

    xs.addEventListener('message', e => {
      const msg = JSON.parse(e.data)

      setData(prev => prev + msg)
      console.log(msg)
      //outputEl.textContent += msg.content
    })
  }

  return (
    <main className='bg-[#F9F9FC]'>
      <div className='max-w-6xl mx-auto py-10'>
        <div>
          {messagesList?.messages?.map(msg => (
            <Markdown
              key={msg.id}
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
          ))}
        </div>
      </div>
    </main>
  )
}
