import logo from '@/assets/temp/logo.png'
import rigmtImg from '@/assets/temp/right-img.png'
import { Img } from '@/components/ui/img'
import botData from '@/constants/bot-page-temp.json'
import { cn } from '@/lib/utils'
import { useGetThreadMessagesQuery } from '@/redux/features/botApi'
import { X } from 'lucide-react'
import { faqs, fetchData } from './BotContainer'

export default function BotMobileNav({
  navbarOpen,
  setnavbarOpen,
  id,
  message,
  setMessage,
  tempMessages,
  setTempMessages,
  isLoading,
  setisLoading
}) {
  const { refetch } = useGetThreadMessagesQuery(id)
  return (
    <nav
      className={cn(
        'fixed top-0 right-0 bg-dark-gray w-[330px] h-svh flex flex-col items-center justify-between transition-all duration-500 z-50',
        {
          '-right-[330px]': !navbarOpen
        }
      )}
      style={{
        backgroundColor: botData.colors.primary,
        color: botData.colors.font,
        borderColor: botData.colors.font
      }}
    >
      <div className='flex flex-col items-center justify-center w-full'>
        <div className='w-full p-3 flex items-center justify-between gap-4 mb-5'>
          <X className='text-text-white opacity-0 w-8 h-8 select-none' />
          <Img src={logo} alt='Wasal' sizes='250px' className='w-12' />
          <X className='text-white cursor-pointer w-8 h-8' strokeWidth={1.5} onClick={() => setnavbarOpen(false)} />
        </div>

        <div className='h-[calc(100vh-92px)] overflow-y-auto pb-5'>
          <div
            className='w-full flex-col gap-y-5 py-4 my-5 self-start'
            style={{
              backgroundColor: botData.colors.primary,
              color: botData.colors.font,
              borderColor: botData.colors.font
            }}
          >
            {faqs.map(faq => (
              <p
                key={faq}
                className='font-medium cursor-pointer border-b px-3 py-2'
                onClick={() => {
                  setMessage(faq)
                  fetchData({
                    msg: faq,
                    setisLoading,
                    setTempMessages,
                    tempMessages,
                    id,
                    cb: refetch,
                    setMessage
                  })
                  setnavbarOpen(false)
                }}
              >
                {faq}
              </p>
            ))}
          </div>

          <Img src={rigmtImg} alt='right image' className='w-full h-auto px-5 mb-10' />
        </div>
      </div>
    </nav>
  )
}
