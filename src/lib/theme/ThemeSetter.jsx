'use client'

import { useGetWebfrontQuery } from '@/redux/features/webfrontApi'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

export default function ThemeSetter({ children }) {
  const { theme, systemTheme } = useTheme()
  const { data, isSuccess, isLoading } = useGetWebfrontQuery({ type: 'variables' })

  const setVariables = variables => {
    const root = document.documentElement
    Object.keys(variables).forEach(key => {
      const cssVar = `--${key.replace(/_/g, '-')}`
      root.style.setProperty(cssVar, variables[key])
    })
    root.offsetHeight
  }

  useEffect(() => {
    if (isSuccess) {
      const currentTheme = theme === 'system' ? systemTheme : theme
      if (currentTheme === 'light') {
        setVariables(data?.data?.variables?.defaultVariables)
      } else {
        setVariables(data?.data?.variables?.darkVariables)
      }
    }
  }, [isSuccess, theme, systemTheme, data])
  //if (isLoading) return <></>
  return children
}
