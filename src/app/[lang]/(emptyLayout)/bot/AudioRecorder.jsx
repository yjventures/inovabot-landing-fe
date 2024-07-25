import botData from '@/constants/bot-page-temp.json'
import { Mic, StopCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioURL, setAudioURL] = useState('')
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const canvasRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)

  useEffect(() => {
    if (isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
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
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
          const audioURL = URL.createObjectURL(audioBlob)
          setAudioURL(audioURL)
          audioChunksRef.current = []
        }
        mediaRecorderRef.current.start()
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
  }

  const handleSaveAudio = () => {
    if (audioChunksRef.current.length > 0) {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
      const url = window.URL.createObjectURL(audioBlob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = 'recording.webm'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    }
  }

  return (
    <div className='flex items-center gap-x-3'>
      {isRecording ? (
        <StopCircle
          className='size-8 cursor-pointer mt-2'
          style={{ color: botData.colors.font }}
          variant='icon'
          onClick={handleStopRecording}
          disabled={!isRecording}
        />
      ) : (
        <Mic
          className='size-8 cursor-pointer mt-2'
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
      {audioURL && <audio controls src={audioURL} />}
    </div>
  )
}

export default AudioRecorder
