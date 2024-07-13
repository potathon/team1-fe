import { useState, useRef, useEffect } from 'react'

export default function useAudioRecorder() {
  const [recording, setRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error(
        'MediaDevices API or getUserMedia method is not supported in this browser.'
      )
      return
    }
  }, [])

  const startRecording = async () => {
    if (recording) return

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorderRef.current = new MediaRecorder(stream)
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data)
    }
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
      setAudioBlob(audioBlob)
      audioChunksRef.current = []
    }
    mediaRecorderRef.current.start()
    setRecording(true)
  }

  const stopRecording = () => {
    if (!recording || !mediaRecorderRef.current) return

    mediaRecorderRef.current.stop()
    setRecording(false)
  }

  const resetRecording = () => {
    setAudioBlob(null)
  }

  return {
    recording,
    audioBlob,
    startRecording,
    stopRecording,
    resetRecording,
  }
}
