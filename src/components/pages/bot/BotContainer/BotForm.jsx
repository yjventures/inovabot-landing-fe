'use client'

import logoWhite from '@/assets/images/ui/logo-white.png'
import logoDark from '@/assets/images/ui/logo.png'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Img } from '@/components/ui/img'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useGenThreadNameMutation, useGetThreadMessagesQuery, useUpdateThreadMutation } from '@/redux/features/botApi'
import styles from '@/styles/botStyles.module.scss'
import { Plus } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AudioRecorder from '../AudioRecorder'
import { runBotThread } from '../bot.helpers'
import FileUploader from '../FileUploader'
import SendIcon from './SendIcon'

export default function BotForm({
  id,
  navbarOpen,
  message,
  setMessage,
  tempMessages,
  setTempMessages,
  isLoading,
  setisLoading,
  setaudioURL
}) {
  const dispatch = useDispatch()
  const { refetch } = useGetThreadMessagesQuery(id)

  const [genName, { isSuccess, data }] = useGenThreadNameMutation()
  const [updateThread] = useUpdateThreadMutation()
  const cb = () => {
    refetch()
    if (tempMessages.length === 4) {
      const messagesTogether = tempMessages.map(m => m.content[0].text.value).join('\n')
      genName({ text: messagesTogether })
    }
  }

  useEffect(() => {
    if (isSuccess) {
      updateThread({ id, body: { name: data?.message } })
    }
  }, [isSuccess, data, id, updateThread])

  const handleSubmit = e => {
    e.preventDefault()
    if (message === '') return

    runBotThread({
      msg: message,
      setisLoading,
      setTempMessages,
      tempMessages,
      id,
      cb,
      setMessage,
      setaudioURL,
      dispatch
    })
  }

  const { theme } = useTheme()

  return (
    <div
      className={cn(
        'fixed bottom-0 left-1/2 -translate-x-1/2 w-full pb-3 backdrop-blur-lg transition-all duration-500',
        { 'lg:pl-80': navbarOpen }
      )}
    >
      <div className='max-w-5xl mx-auto flex items-center gap-x-3 px-5'>
        <form
          onSubmit={handleSubmit}
          className='flex items-center justify-between rounded-xl gap-x-3 w-full bg-background shadow-md'
        >
          <Textarea
            type='text'
            containerClassName='w-full max-w-full min-h-14'
            className='w-full max-w-full min-h-14 border-none focus-visible:ring-0 resize-none'
            placeholder='Ask anything...'
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={1}
            onKeyDown={e => (e.key === 'Enter' && !e.shiftKey ? handleSubmit(e) : null)}
          />
          <button type='submit'>
            <SendIcon />
          </button>
        </form>
        <div className='hidden md:flex items-center gap-x-2'>
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

        <DropdownMenu>
          <DropdownMenuTrigger className='inline-block md:hidden'>
            <div className={cn('border-2 p-2.5 rounded-lg', styles.borderPrimary)}>
              <Plus className={cn('size-7', styles.textPrimary)} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={cn('bg-transparent min-w-16 border-2', styles.borderPrimary)}>
            <DropdownMenuLabel>
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
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <FileUploader id={id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='w-full max-w-5xl mx-auto flex items-center justify-center px-5 gap-x-3 pt-3'>
        <p className='text-xl font-medium'>Powered By</p>
        <Img src={theme === 'dark' && logoWhite ? logoWhite : logoDark} alt='logo' className='h-8 w-auto' />
      </div>
    </div>
  )
}
