'use client'

import logo from '@/assets/images/ui/logo.png'
import { Img } from '@/components/ui/img'
import LLink from '@/components/ui/llink'
import { API_URL } from '@/configs'
import { useEffect, useState } from 'react'

export default function Bot({ id }) {
  const [data, setdata] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/threads/run/${id}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            thread_id: id,
            message: 'Write a js function that can remove duplicate values from an array',
            instructions: 'You are a genius programmer and professor at MIT'
          })
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
            console.log(chunk)

            // Remove the 'data: ' prefix, quotes, and trim whitespace
            const lines = chunk.split('\n').map(line =>
              line
                .replace(/^data: /, '')
                .replace(/(^"|"$)/g, '')
                .trim()
            )

            lines.forEach(line => {
              if (line) {
                setdata(prev => prev + line + ' ') // This will print each cleaned line
              }
            })
          }
        }
      } catch (error) {
        console.error('Fetch error: ', error)
      }
    }

    fetchData()
  }, [id])

  return (
    <div>
      <nav className='fixed left-0 top-0 right-0 w-full h-20'>
        <LLink href='/' className='mb-5'>
          <Img src={logo} alt='Inova' className='w-32 h-auto' />
        </LLink>
      </nav>

      {/* <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, data, ...props }) {
            const match = /language-(\w+)/.exec(className || '')

            return !inline && match ? (
              <SyntaxHighlighter style={dracula} PreTag='div' language={match[1]} {...props}>
                {String(data).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {data}
              </code>
            )
          }
        }}
      >
        {markdown}
      </Markdown> */}
      <p>{data}</p>
    </div>
  )
}
