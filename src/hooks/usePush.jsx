'use client'

import { useParams, useRouter } from 'next/navigation'

export default function usePush() {
  const { lang } = useParams()
  const { push } = useRouter()

  const localizedPush = (path, options) => {
    const localizedPath = `/${lang}${path}`
    push(localizedPath, undefined, options)
  }

  return localizedPush
}
