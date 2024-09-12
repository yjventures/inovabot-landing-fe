import { API_URL } from '@/configs'
import { XhrSource } from '@/utils/form/eventStream'

export const runBotThread = async ({ msg, setisLoading, setTempMessages, tempMessages, setMessage, id, cb }) => {
  const prompt = {
    thread_id: id,
    message: msg
  }

  const newMessage = {
    id: `temp-${Date.now()}`,
    role: 'user',
    content: [{ text: { value: msg } }]
  }
  const newAssistantMessage = {
    id: `temp-${Date.now() + 1}`,
    role: 'assistant',
    content: [{ text: { value: '' } }]
  }
  setTempMessages([...tempMessages, newMessage, newAssistantMessage])
  setisLoading(true)

  let msgRes = ''
  let xs = null // Declare xs outside to reference in event handlers

  try {
    xs = XhrSource(`${API_URL}/threads/run/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prompt)
    })

    xs.addEventListener('error', (e: ErrorEvent) => {
      setisLoading(false)
      console.error(e.message)
      if (xs) xs.close() // Close the stream on error
    })

    xs.addEventListener('close', async () => {
      setisLoading(false)
      await cb()
      if (xs) xs.close() // Ensure the stream is closed after completion
    })

    xs.addEventListener('message', (e: MessageEvent) => {
      const msg = JSON.parse(e.data)
      console.log(msg)
      setTempMessages(prev => {
        const updatedMessages = [...prev]
        const lastMessageIndex = updatedMessages.findIndex(m => m.id === newAssistantMessage.id)
        if (lastMessageIndex !== -1) {
          updatedMessages[lastMessageIndex].content[0].text.value += msg
          msgRes += msg
        }
        return updatedMessages
      })
    })
  } catch (error) {
    console.error('Fetch error:', error)
    if (xs) xs.close() // Ensure the stream is closed on error
  }

  setMessage('')
}
