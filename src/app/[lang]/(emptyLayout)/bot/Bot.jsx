/* eslint-disable react/no-children-prop */
'use client'

import MarkdownRenderer from '@/components/ui/markdown-renderer'
import { Skeleton } from '@/components/ui/skeleton'
import botData from '@/constants/bot-page-temp.json'
import { cn } from '@/lib/utils'
import { useGetThreadMessagesQuery } from '@/redux/features/botApi'
import { useEffect, useRef, useState } from 'react'
// import lightBg from './../../../../../public/temp/light-bg.jpg'
import avatarImg from '@/assets/temp/avatar.png'
import botImg from '@/assets/temp/bot.png'
import logo from '@/assets/temp/logo.png'
import rigmtImg from '@/assets/temp/right-img.png'
import lightBg from '@/assets/temp/violet-bg.jpg'
import Spinner from '@/components/icons/Spinner'
import { Img } from '@/components/ui/img'
import { Textarea } from '@/components/ui/textarea'
import { AlignRight, PlayCircle, StopCircle } from 'lucide-react'
import AudioRecorder from './AudioRecorder'
import { faqs, fetchData } from './BotContainer'
import FileUploader from './FileUploader'

export default function Bot({
  id,
  setnavbarOpen,
  message,
  setMessage,
  tempMessages,
  setTempMessages,
  isLoading,
  setisLoading,
  audioURL,
  setaudioURL
}) {
  const audioRef = useRef(null)
  const endOfMessagesRef = useRef(null) // Ref for the last message element

  const [isPlaying, setisPlaying] = useState(false)

  const { data: messagesList, isLoading: isListLoading, isSuccess, refetch } = useGetThreadMessagesQuery(id)

  useEffect(() => {
    if (isSuccess) {
      setTempMessages(messagesList?.messages || [])
    }
  }, [messagesList, isSuccess, setTempMessages])

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [tempMessages])

  useEffect(() => {
    if (audioURL) {
      scrollToBottom()
    }
  }, [audioURL])

  useEffect(() => {
    document.documentElement.style.setProperty('--bot-primary-color', botData.colors.primary)
    document.documentElement.style.setProperty('--bot-secondary-color', botData.colors.secondary)
    document.documentElement.style.setProperty('--bot-font-color', botData.colors.font)
  }, [])

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setisPlaying(true)
    }
  }

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setisPlaying(false)
    }
  }

  const handleFAQTrigger = () => {
    setMessage(faq)
    fetchData({
      msg: faq,
      setisLoading,
      setTempMessages,
      tempMessages,
      id,
      cb: () => {
        refetch()
        setisPlaying(false)
      },
      setMessage,
      setaudioURL
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (message === '') return

    fetchData({
      msg: message,
      setisLoading,
      setTempMessages,
      tempMessages,
      id,
      cb: refetch,
      setMessage,
      setaudioURL
    })
  }

  return (
    <main className='relative h-screen'>
      {isLoading ? (
        <div
          className='fixed right-5 top-5 z-50 px-4 py-3 border-2 rounded-xl flex items-center gap-x-2'
          style={{
            backgroundColor: botData.colors.primary,
            color: botData.colors.font,
            borderColor: botData.colors.font
          }}
        >
          <p className='text-xl font-semibold'>{botData.name} is thinking...</p>
          <Spinner className='animate-spin size-9' />
        </div>
      ) : null}
      <nav className='fixed top-0 left-0 w-full h-32 z-20 container flex items-center justify-between'>
        <Img src={logo} alt='logo' className='h-1/2 w-auto' />
        <AlignRight
          className='size-10 text-white cursor-pointer inline-block xl:hidden'
          onClick={() => setnavbarOpen(prev => !prev)}
        />
      </nav>
      <Img src={lightBg} alt='Light background' className='fixed w-full h-screen inset-0 object-cover' />
      <div className='px-0 xl:px-5 pt-32 pb-2 h-[calc(100vh-76px)] overflow-hidden relative flex gap-x-3'>
        <div
          className={cn(
            'w-72 h-96 overflow-y-auto hidden xl:inline-flex flex-col gap-y-5 px-3 py-4 mt-20 rounded-xl self-start border-2 custom-scrollbar'
          )}
          style={{
            backgroundColor: botData.colors.primary,
            color: botData.colors.font,
            borderColor: botData.colors.font
          }}
        >
          {faqs.map(faq => (
            <p key={faq} className='font-medium cursor-pointer' onClick={handleFAQTrigger}>
              {faq}
            </p>
          ))}
        </div>
        <div className={cn('max-w-7xl mx-auto overflow-y-auto custom-scrollbar')}>
          {/*BUG: while loading, skeleton doesn't show*/}
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
            ? tempMessages?.map((msg, i) => (
                <div
                  key={msg.id}
                  className={cn('flex flex-col sm:flex-row gap-x-2 px-3 max-w-3xl', {
                    'pl-24 justify-end': msg.role === 'user',
                    'pr-24 justify-start': msg.role === 'assistant'
                  })}
                >
                  {msg.role === 'assistant' && (
                    <Img src={botImg} alt='Bot' className='size-10 aspect-square object-cover mt-1 rounded-full' />
                  )}
                  <div className='flex flex-col'>
                    <div
                      style={{
                        backgroundColor: `${msg.role === 'user' ? botData.colors.primary : botData.colors.secondary}`,
                        color: botData.colors.font
                      }}
                      className={cn('w-full my-1 text-sm rounded-lg', {
                        'ml-auto border-2 order-2 sm:order-1 p-2': msg.role === 'user',
                        'mr-auto px-2': msg.role === 'assistant'
                      })}
                    >
                      <MarkdownRenderer
                        className='markdown text-sm'
                        codeClassName='bg-rose-200 font-semibold px-1 py-0.5 text-rose-800 rounded-sm'
                      >
                        {msg.content[0].text.value}
                      </MarkdownRenderer>
                    </div>

                    {msg.role === 'assistant' && i + 1 === tempMessages?.length && audioURL !== null ? (
                      <>
                        {isPlaying ? (
                          <StopCircle className='size-10 text-red-500 cursor-pointer' onClick={stopAudio} />
                        ) : (
                          <PlayCircle className='size-10 text-green-500 cursor-pointer' onClick={playAudio} />
                        )}

                        <audio ref={audioRef} src={audioURL} controls className='hidden' onEnded={stopAudio} />
                      </>
                    ) : null}
                  </div>
                  {msg.role === 'user' && (
                    <Img
                      src={avatarImg}
                      alt='Avatar'
                      className='size-10 aspect-square object-cover mt-1 rounded-full ml-auto sm:ml-0 order-1 sm:order-2'
                    />
                  )}
                </div>
              ))
            : null}
          <div ref={endOfMessagesRef} />
        </div>
        <Img src={rigmtImg} alt='right image' className='w-80 hidden xl:block h-auto self-start mt-20' />
      </div>
      <div className='fixed bottom-5 left-1/2 -translate-x-1/2 max-w-4xl w-full px-5 flex items-center gap-x-3'>
        <form onSubmit={handleSubmit} className='flex items-center justify-between rounded-xl gap-x-3 bg-white w-full'>
          <Textarea
            type='text'
            containerClassName='w-full max-w-full min-h-14'
            className='w-full max-w-full min-h-14 border-none focus-visible:ring-0 resize-none'
            placeholder='Type a message...'
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={1}
            onKeyDown={e => (e.key === 'Enter' && !e.shiftKey ? handleSubmit(e) : null)}
          />
          <button type='submit'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 64 64'
              id='send'
              className='size-8 cursor-pointer text-violet-800 mr-2 fill-current'
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
          </button>
        </form>
        <AudioRecorder
          id={id}
          message={message}
          setMessage={setMessage}
          tempMessages={tempMessages}
          setTempMessages={setTempMessages}
          isLoading={isLoading}
          setisLoading={setisLoading}
          setaudioURL={setaudioURL}
        />
        <FileUploader id={id} />
      </div>
    </main>
  )
}
