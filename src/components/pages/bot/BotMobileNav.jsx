'use client'

import { Button } from '@/components/ui/button'
import { Img } from '@/components/ui/img'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useGetAllThreadQuery, useGetBotFAQQuery, useGetThreadMessagesQuery } from '@/redux/features/botApi'
import styles from '@/styles/botStyles.module.scss'
import { AlignRight, HelpCircle, MessageSquare, Plus } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { runBotThread } from './bot.helpers'

export default function BotMobileNav({
  navbarOpen,
  closeNavbar,
  id,
  bot_id,
  setMessage,
  tempMessages,
  setTempMessages,
  setisLoading,
  botData,
  createNewThread,
  isCreateThreadLoading,
  thread_id,
  setthread_id,
  uid
}) {
  const dispatch = useDispatch()
  const { refetch } = useGetThreadMessagesQuery(id)
  const { theme } = useTheme()

  const { data: faqs, isLoading: isFaqLoading, isSuccess: isFaqSuccess } = useGetBotFAQQuery(bot_id)

  // Fetching all the threads for that unique id
  const {
    data: allThreads,
    isSuccess: isAllThreadsSuccess,
    isLoading: isAllThreadsLoading
  } = useGetAllThreadQuery({ unique_id: uid }, { skip: !uid })

  useEffect(() => {
    if (bot_id && uid) {
      if (isAllThreadsSuccess) {
        const thread = allThreads?.data?.at(-1)
        setthread_id(thread?._id)
      }
    }
  }, [allThreads, bot_id, isAllThreadsSuccess, uid, setthread_id])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 bg-dark-gray w-[330px] h-svh flex flex-col items-center justify-between transition-all duration-500 z-50 whitespace-normal',
        {
          'w-0 overflow-hidden whitespace-nowrap': !navbarOpen
        },
        styles.rightMsg
      )}
    >
      <div className='flex flex-col items-center justify-center w-full'>
        <div className='w-full p-3 flex items-center justify-between gap-4 mb-5'>
          <Img
            src={theme === 'dark' && botData?.logo_dark ? botData?.logo_dark : botData?.logo_light}
            alt='logo'
            className='h-7 sm:h-12 w-auto'
          />
          <AlignRight className='text-text-black cursor-pointer size-8' strokeWidth={1.5} onClick={closeNavbar} />
        </div>

        <div className={cn('h-[calc(100vh-92px)] overflow-y-auto pb-5 w-full px-5', styles.font)}>
          <Button
            variant='outline'
            className={cn('w-full bg-transparent hover:bg-transparent', styles.border, styles.font)}
            icon={<Plus />}
            onClick={createNewThread}
            isLoading={isCreateThreadLoading}
          >
            Create new chat
          </Button>
          {isFaqLoading && (
            <div className='space-y-2 py-4'>
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className='w-full h-10' />
              ))}
            </div>
          )}
          {isFaqSuccess && (
            <div className='pb-4 pt-6'>
              <p className='text-lg font-semibold'>FAQs</p>
              {faqs?.data?.length ? (
                faqs?.data?.map(faq => (
                  <p
                    key={faq?._id}
                    className='cursor-pointer py-1'
                    onClick={() => {
                      setMessage(faq?.question)
                      runBotThread({
                        msg: faq?.question,
                        setisLoading,
                        setTempMessages,
                        tempMessages,
                        id,
                        cb: refetch,
                        setMessage,
                        dispatch
                      })
                    }}
                  >
                    <HelpCircle className='size-[18px] inline-block mb-0.5 mr-1' /> {faq?.question}
                  </p>
                ))
              ) : (
                <p>No FAQ found</p>
              )}
            </div>
          )}

          {isAllThreadsLoading && (
            <div className='space-y-2 pb-4'>
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className='w-full h-10' />
              ))}
            </div>
          )}
          {isAllThreadsSuccess && (
            <div className='pb-4'>
              <p className='text-lg font-semibold whitespace-nowrap'>Chat History</p>
              {allThreads?.data?.length ? (
                allThreads?.data?.map(thread => (
                  <p
                    key={thread?._id}
                    className={cn('cursor-pointer py-1', {
                      [`-mx-3 px-3 rounded-lg ${styles.leftMsg}`]: thread_id === thread?._id
                    })}
                    onClick={() => setthread_id(thread?._id)}
                  >
                    <MessageSquare className='size-[18px] inline-block mb-0.5 mr-1' /> {thread?.name || 'No Name'}
                  </p>
                ))
              ) : (
                <p>No Threads Found found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
