import { cn } from '@/lib/utils'

export default function TagLine({ className, children }) {
  return (
    <p className={cn('text-white bg-primary px-3 py-1 text-xs rounded-full inline-block', className)}>{children}</p>
  )
}
