import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

const tags = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  'body-small': 'p',
  small: 'span'
}

const sizes = {
  h1: 'font-semibold text-3xl lg:text-4xl xl:text-5xl',
  h2: 'font-semibold text-2xl lg:text-3xl xl:text-4xl',
  h3: 'font-semibold text-xl lg:text-2xl xl:text-3xl',
  h4: 'font-semibold text-xl sm:text-2xl',
  h5: 'font-semibold text-lg sm:text-xl',
  h6: 'font-semibold',
  body: 'text-base',
  'body-small': 'text-sm sm:text-xs'
}

const Typography = forwardRef(({ variant, children, className, as, ...rest }, ref) => {
  const sizeClasses = sizes[variant]
  const Tag = as || tags[variant]

  return (
    <Tag ref={ref} className={cn(sizeClasses, className)} {...rest}>
      {children}
    </Tag>
  )
})

Typography.displayName = 'Typography'

export default Typography
