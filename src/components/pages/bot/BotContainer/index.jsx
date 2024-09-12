/* eslint-disable react/no-children-prop */
'use client'

import logoWhite from '@/assets/images/ui/logo-white.png'
import logo from '@/assets/images/ui/logo.png'
import avatarImg from '@/assets/temp/avatar.png'
import botImg from '@/assets/temp/bot.png'
import Spinner from '@/components/icons/Spinner'

import { Img } from '@/components/ui/img'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useGetThreadMessagesQuery } from '@/redux/features/botApi'
import styles from '@/styles/botStyles.module.scss'
import { Copy, PlayCircle, StopCircle, StopCircleIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { runBotThread } from '../bot.helpers'
import BotForm from './BotForm'
import BotNav from './BotNav'

export default function BotContainer({
  id,
  setnavbarOpen,
  message,
  setMessage,
  tempMessages,
  setTempMessages,
  isLoading,
  setisLoading,
  audioURL,
  setaudioURL,
  faqs,
  isFaqLoading,
  botData,
  current_run,
  setcurrent_run
}) {
  // Refs
  const audioRef = useRef(null)
  const endOfMessagesRef = useRef(null)
  const abortControllerRef = useRef(null)
  const chatContainerRef = useRef(null)

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

  const handleFAQTrigger = faq => {
    setMessage(faq?.question)
    runBotThread({
      msg: faq?.question,
      setisLoading,
      setTempMessages,
      tempMessages,
      id,
      cb: () => {
        refetch()
        setisPlaying(false)
      },
      setMessage,
      setaudioURL,
      controller: abortControllerRef,
      instructions: faq?.objective
    })
  }

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.close() // Abort current fetch
    }
  }

  const copyToClipBoard = text => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const { theme } = useTheme()

  return (
    <main
      className='relative h-screen bg-cover bg-center pl-0 lg:pl-8 xl:pl-10'
      style={{ backgroundImage: `url(${theme === 'dark' && botData?.bg_dark ? botData?.bg_dark : botData?.bg_light})` }}
    >
      {isLoading ? (
        <div
          className={cn(
            'fixed right-5 top-5 z-50 px-4 py-3 border-2 rounded-xl flex items-center gap-x-2',
            styles.rightMsg
          )}
        >
          <p className='text-xl font-semibold'>{botData.name} is thinking...</p>
          <Spinner className='animate-spin size-9' />
          <StopCircleIcon className='size-9 cursor-pointer' onClick={handleStop} />
        </div>
      ) : null}

      <BotNav botData={botData} setnavbarOpen={setnavbarOpen} />
      <div className='pt-24 pb-2 h-[calc(100vh-100px)] overflow-hidden relative flex gap-x-3'>
        {isFaqLoading ? (
          <Skeleton className='w-72 h-96' />
        ) : (
          <div
            className={cn(
              'w-72 max-h-full min-h-96 overflow-y-auto hidden lg:inline-flex flex-col gap-y-5 px-3 py-4 rounded-xl self-start border-2 custom-scrollbar',
              styles.rightMsg,
              styles.border
            )}
          >
            {faqs?.data?.map(faq => (
              <p key={faq?._id} className='font-medium cursor-pointer' onClick={() => handleFAQTrigger(faq)}>
                {faq?.question}
              </p>
            ))}
          </div>
        )}

        <div className={cn('w-full lg:w-[calc(100%-288px)] overflow-y-auto custom-scrollbar')} ref={chatContainerRef}>
          {id && isListLoading ? (
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
                  className={cn('flex flex-col sm:flex-row gap-x-2 px-3', {
                    'pl-14 sm:pl-16 md:pl-24 justify-end': msg.role === 'user',
                    'pr-14 sm:pr-16 md:pr-24 justify-start': msg.role === 'assistant'
                  })}
                >
                  {msg.role === 'assistant' && (
                    <Img
                      src={botData.bot_logo || botImg}
                      alt='Bot'
                      className='size-10 aspect-square object-cover mt-1 rounded-full'
                    />
                  )}
                  <div className='flex flex-col'>
                    <div className='group'>
                      <div
                        className={cn(
                          'w-full my-1 text-sm rounded-lg',
                          {
                            'ml-auto order-2 sm:order-1 p-2': msg.role === 'user',
                            'mr-auto p-2': msg.role === 'assistant'
                          },
                          msg.role === 'user' ? styles.rightMsg : styles.leftMsg
                        )}
                      >
                        {/* <MarkdownRenderer
                          className='markdown text-sm max-w-4xl'
                          codeClassName='bg-rose-200 font-semibold px-1 py-0.5 text-rose-800 rounded-sm'
                        >
                          {msg.content[0].text.value}
                        </MarkdownRenderer> */}
                        <div
                          dangerouslySetInnerHTML={{ __html: msg?.content?.[0]?.text?.value }}
                          className={cn(styles.text, 'prose')}
                        ></div>
                      </div>

                      {msg.role === 'assistant' && (
                        <Copy
                          className={cn(
                            'cursor-pointer size-5 opacity-0 group-hover:opacity-100 transition-opacity ml-2',
                            styles.text
                          )}
                          onClick={() => copyToClipBoard(msg?.content?.[0]?.text?.value)}
                        />
                      )}
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
                      src={botData.user_logo || avatarImg}
                      alt='Avatar'
                      className='size-10 aspect-square object-cover mt-1 rounded-full ml-auto sm:ml-0 order-1 sm:order-2'
                    />
                  )}
                </div>
              ))
            : null}
          <div ref={endOfMessagesRef} />
        </div>
      </div>
      <BotForm
        id={id}
        message={message}
        setMessage={setMessage}
        tempMessages={tempMessages}
        setTempMessages={setTempMessages}
        isLoading={isLoading}
        setisLoading={setisLoading}
        setaudioURL={setaudioURL}
      />

      <div className='fixed bottom-2 left-1/2 -translate-x-1/2 w-full max-w-5xl flex items-center justify-center px-5 gap-x-3'>
        <p className='text-xl font-medium'>Powered By</p>
        <Img src={theme === 'dark' && logoWhite ? logoWhite : logo} alt='logo' className='h-8 w-auto' />
      </div>
    </main>
  )
}
