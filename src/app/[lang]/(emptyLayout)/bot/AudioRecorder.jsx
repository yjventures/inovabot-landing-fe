import { API_URL } from '@/configs'
import botData from '@/constants/bot-page-temp.json'
import { axiosInstance } from '@/lib/axios/interceptor'
import { Mic, Square } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioURL, setAudioURL] = useState('')
  const [audioBlob, setaudioBlob] = useState(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const canvasRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)

  useEffect(() => {
    if (isRecording) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
          const source = audioContextRef.current.createMediaStreamSource(stream)
          analyserRef.current = audioContextRef.current.createAnalyser()
          source.connect(analyserRef.current)
          // drawVisualizer()

          mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' })
          mediaRecorderRef.current.ondataavailable = event => {
            audioChunksRef.current.push(event.data)
          }
          mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
            setaudioBlob(blob)
            const audioURL = URL.createObjectURL(blob)
            setAudioURL(audioURL)
            audioChunksRef.current = []
          }
          mediaRecorderRef.current.start()
        })
        .catch(err => {
          console.error(err?.message)
          toast.error('Mic not found or not permitted!')
          setIsRecording(false)
        })
    } else if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
    }
  }, [isRecording])

  const drawVisualizer = () => {
    if (!analyserRef.current) return
    const canvas = canvasRef.current
    const canvasCtx = canvas.getContext('2d')
    analyserRef.current.fftSize = 2048
    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      requestAnimationFrame(draw)
      analyserRef.current.getByteTimeDomainData(dataArray)
      canvasCtx.fillStyle = 'rgb(200, 200, 200)'
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height)
      canvasCtx.lineWidth = 2
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)'
      canvasCtx.beginPath()
      const sliceWidth = (canvas.width * 1.0) / bufferLength
      let x = 0
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0
        const y = (v * canvas.height) / 2
        if (i === 0) {
          canvasCtx.moveTo(x, y)
        } else {
          canvasCtx.lineTo(x, y)
        }
        x += sliceWidth
      }
      canvasCtx.lineTo(canvas.width, canvas.height / 2)
      canvasCtx.stroke()
    }
    draw()
  }

  const handleStartRecording = () => {
    setIsRecording(true)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    handleSaveAudio()
  }

  // const handleSaveAudio = () => {
  //   if (audioChunksRef.current.length > 0) {
  //     const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
  //     const url = window.URL.createObjectURL(audioBlob)
  //     const a = document.createElement('a')
  //     a.style.display = 'none'
  //     a.href = url
  //     a.download = 'recording.webm'
  //     document.body.appendChild(a)
  //     a.click()
  //     window.URL.revokeObjectURL(url)
  //     document.body.removeChild(a)
  //   }
  // }

  const handleSaveAudio = async () => {
    console.log('INIT')
    if (audioBlob) {
      console.log('HAS AUDIO')
      const audioFile = new File([audioBlob], 'recording.webm', { type: 'audio/webm' })
      // try {
      //   const uploadedUrl = await uploadFile(audioFile)
      //   if (uploadedUrl) {
      //     // Handle successful upload, e.g., show a message or update state
      //     console.log('File uploaded successfully:', uploadedUrl)
      //   }
      // } catch (error) {
      //   console.error('Error uploading file', error)
      // }
      const formData = new FormData()
      formData.append('file', audioFile)

      try {
        const response = await axiosInstance.post(`${API_URL}/audio/transcript`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        if (response?.data) {
          console.log(response)
        }
      } catch (error) {
        console.error('Error uploading file', error)
      }
    }
  }

  return (
    <div className='flex items-center gap-x-3'>
      {isRecording ? (
        <div onClick={handleStopRecording} className='relative cursor-pointer'>
          <Square
            className='size-10 cursor-pointer border-[3px] p-2 rounded-full text-red-500 border-red-500'
            strokeWidth={2.7}
            //style={{ color: botData.colors.font }}
            variant='icon'
            disabled={!isRecording}
          />
          <div className='absolute top-0 left-0 w-full h-full rounded-full animate-ping border-2 border-red-500 p-2 z-20' />
        </div>
      ) : (
        <Mic
          className='size-10 cursor-pointer border-[3px] p-2 rounded-full'
          strokeWidth={2.7}
          style={{ color: botData.colors.font }}
          variant='icon'
          onClick={handleStartRecording}
          disabled={isRecording}
        />
      )}

      {/* <canvas ref={canvasRef} width='300' height='150'></canvas>
      {audioURL && <audio controls src={audioURL} />}
      <Button onClick={handleSaveAudio} disabled={!audioURL}>
        Save Audio
      </Button> */}
    </div>
  )
}

export default AudioRecorder
