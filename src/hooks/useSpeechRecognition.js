import { useState, useEffect } from 'react'

const useSpeechRecognition = () => {
  const [result, setResult] = useState({
    text: '',
    error: null,
  })
  const [recognition, setRecognition] = useState(null)

  useEffect(() => {
    const initRecognition = () => {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition

      if (!SpeechRecognition) {
        console.error('SpeechRecognition이 지원되지 않습니다.')
        return null
      }

      const newRecognition = new SpeechRecognition()
      newRecognition.lang = 'ko-KR'
      newRecognition.interimResults = false
      newRecognition.maxAlternatives = 1

      newRecognition.addEventListener('result', handleResult)
      newRecognition.addEventListener('error', handleError)
      newRecognition.addEventListener('end', handleEnd)

      return newRecognition
    }

    const speechRecognition = initRecognition()
    setRecognition(speechRecognition)

    return () => {
      if (speechRecognition) {
        speechRecognition.removeEventListener('result', handleResult)
        speechRecognition.removeEventListener('error', handleError)
        speechRecognition.removeEventListener('end', handleEnd)
      }
    }
  }, [])

  const startListening = () => {
    if (!recognition) {
      setResult({ text: '', error: 'SpeechRecognition이 지원되지 않습니다.' })
      return
    }

    recognition.start()
  }

  const stopListening = () => {
    if (recognition) {
      recognition.stop()
    }
  }

  const handleResult = (event) => {
    const text = event.results[0][0].transcript
    setResult((prevResult) => ({
      text: prevResult.text + text,
      error: null,
    }))
  }

  const handleError = (event) => {
    setResult({
      text: '',
      error: `SpeechRecognition error: ${event.error}`,
    })
    stopListening()
  }

  const handleEnd = () => {
    if (recognition && recognition.continuous) {
      recognition.start()
    }
  }

  return [result, startListening, stopListening]
}

export default useSpeechRecognition
