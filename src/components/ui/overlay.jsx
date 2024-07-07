import { lottieDefaultOptions } from '@/constants/lottieDefaultOptions'
import { cn } from '@/lib/utils'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Lottie from 'react-lottie'

export default function Overlay({ isOpen, animationData, text }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    document.documentElement.classList.add('overflow-y-hidden')
    overlayRef.current = document.getElementById('modal-container')

    return () => {
      document.documentElement.classList.remove('overflow-y-hidden')
      overlayRef.current = null
    }
  }, [])

  return isOpen
    ? createPortal(
        <div
          className={cn(
            'w-full min-h-screen flex items-center justify-center fixed left-0 top-0 backdrop-blur-md z-[100] bg-white/5'
          )}
        >
          <div className='max-w-md'>
            <Lottie options={lottieDefaultOptions(animationData)} />
            {text ? (
              <p className='text-sky-700 text-center px-5 text-balance text-lg font-medium'>{text}</p>
            ) : (
              <div className='w-full h-7' />
            )}
          </div>
        </div>,
        overlayRef.current
      )
    : null
}
