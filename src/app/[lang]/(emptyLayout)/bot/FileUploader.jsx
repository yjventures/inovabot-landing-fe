'use client'

import Spinner from '@/assets/icons/Spinner'
import { API_URL } from '@/configs'
import botData from '@/constants/bot-page-temp.json'
import { axiosInstance } from '@/lib/axios/interceptor'
import { Upload } from 'lucide-react'
import { useRef, useState } from 'react'

export default function FileUploader({ id, cb }) {
  const inputRef = useRef()
  const [isUploading, setisUploading] = useState(false)
  if (isUploading) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }

  const uploadFile = async e => {
    const file = e.target.files?.[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('thread_id', id)

    try {
      setisUploading(true)
      const response = await axiosInstance.post(`${API_URL}/threads/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response?.data) {
        setisUploading(false)
        console.log(response)
        //cb(response?.data?.uploadedUrl)
        // FIXME: fix the inputref reset thing, value is undefined here
        inputRef.current.value = ''
      }
    } catch (error) {
      setisUploading(false)
      console.error('Error uploading file', error)
      inputRef.current.value = ''
    }
  }

  return (
    <>
      <input ref={inputRef} type='file' className='hidden' onChange={uploadFile} />
      <Upload
        className='size-10 cursor-pointer border-[3px] p-2 rounded-full'
        strokeWidth={2.7}
        style={{ color: botData.colors.font }}
        variant='icon'
        onClick={() => inputRef.current.click()}
      />
    </>
  )
}
