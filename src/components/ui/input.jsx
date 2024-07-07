'use client'

import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { Label } from './label'

const Input = forwardRef(
  (
    {
      className,
      type,
      icon,
      errors,
      register,
      name,
      hookFormConfig,
      label,
      showLabel,
      labelClassName,
      required,
      ...props
    },
    ref
  ) => {
    const [showPassword, setshowPassword] = useState(false)
    return (
      <div className={cn({ 'flex flex-col gap-y-2': label && showLabel })}>
        {label && showLabel && (
          <Label className={cn('text-text-tartiary', labelClassName)}>
            {label}
            {required ? '*' : null}
          </Label>
        )}
        <div className='pb-1'>
          <div className='relative'>
            <input
              type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
              className={cn(
                'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                { 'pl-10': icon },
                className
              )}
              ref={ref}
              {...register(name, { required, ...hookFormConfig })}
              {...props}
            />
            {type === 'password' ? (
              <>
                {showPassword ? (
                  <Eye
                    className='absolute right-3 top-1/2 -translate-y-1/2 size-6 cursor-pointer'
                    onClick={() => setshowPassword(false)}
                  />
                ) : (
                  <EyeOff
                    className='absolute right-3 top-1/2 -translate-y-1/2 size-6 cursor-pointer'
                    onClick={() => setshowPassword(true)}
                  />
                )}
              </>
            ) : null}
            {icon && (
              <div
                className={cn(
                  'absolute inset-y-0 left-2.5 top-0 flex items-center [&>svg]:size-6 text-muted-foreground',
                  {}
                )}
              >
                {icon}
              </div>
            )}
          </div>
          {required ? (
            <>
              {errors[name] && errors[name]?.type === 'required' ? (
                <span className='text-red-500 text-sm h-5 leading-none'>{label} is required</span>
              ) : (
                <div className='w-full h-6' />
              )}
            </>
          ) : null}
        </div>
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }

// flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
