'use client'

import Spinner from '@/assets/icons/Spinner'
import { API_URL } from '@/configs'
import botData from '@/constants/bot-page-temp.json'
import { axiosInstance } from '@/lib/axios/interceptor'
import { Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'

export default function FileUploader({ id, cb }) {
  const inputRef = useRef()
  const [isUploading, setisUploading] = useState(false)

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

        if (response.status === 200) {
          toast.success('File uploaded successfully!')
        }
        if (inputRef.current) {
          inputRef.current.value = ''
        }
      }
    } catch (error) {
      setisUploading(false)
      toast.error('Error uploading Document!')
      console.error('Error uploading file', error)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  return (
    <>
      <input ref={inputRef} type='file' className='hidden' onChange={uploadFile} accept='.pdf,.doc,.docx,.txt' />

      {isUploading ? (
        <div className='border-[3px] p-1 rounded-full'>
          <Spinner className='animate-spin text-white' />
        </div>
      ) : (
        <Upload
          className='size-10 cursor-pointer border-[3px] p-2 rounded-full'
          strokeWidth={2.7}
          style={{ color: botData.colors.font }}
          variant='icon'
          onClick={() => inputRef.current.click()}
        />
      )}
    </>
  )
}
