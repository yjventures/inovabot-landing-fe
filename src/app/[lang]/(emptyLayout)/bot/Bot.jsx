/* eslint-disable react/no-children-prop */
'use client'

import { API_URL } from '@/configs'
import { XhrSource } from '@/utils/form/eventStream'
import { useEffect, useMemo, useState } from 'react'
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

  const prompt = useMemo(
    () => ({
      thread_id: id,
      message: 'Write a js function that can remove duplicate values from an array',
      instructions: 'You are a genius programmer and professor at MIT'
    }),
    [id]
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/threads/run/${id}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(prompt)
        })

        if (!response.ok) throw new Error('Network response was not ok')

        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        let result
        while (true) {
          result = await reader.read()
          if (result.done) break
          if (result.value) {
            const chunk = decoder.decode(result.value, { stream: true })
            const text = chunk
              .split('\n')
              .map(line => line.replace(/^data: /, '').replace(/(^"|"$)/g, ''))
              .join('')

            // Incrementally update the data
            setData(prevData => prevData + text)
          }
        }
      } catch (error) {
        console.error('Fetch error: ', error)
      }
    }

    //fetchData()
  }, [id, prompt])

  useEffect(() => {
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
    fetchData()
  }, [id, prompt, data])

  return (
    <div className='container py-10'>
      <Markdown
        className='prose w-full'
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
        {data}
      </Markdown>
    </div>
  )
}
