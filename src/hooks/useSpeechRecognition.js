import { useState, useEffect } from 'react'

const useSpeechRecognition = () => {
  const [result, setResult] = useState({
    text: '',
    error: null,
  })
  const [recognition, setRecognition] = useState(null)
  const [isListening, setIsListening] = useState(false)

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
      newRecognition.continuous = true
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
    if (!isListening) {
      recognition.start()
      setIsListening(true)
    }
  }

  const stopListening = () => {
    if (recognition && isListening) {
      setTimeout(() => {
        recognition.stop()
        setIsListening(false)
      }, 2000)
    }
  }

  const handleResult = (event) => {
    const transcript = Array.from(event.results)
      .filter((result) => result.isFinal)
      .map((result) => result[0].transcript)
      .join('')

    setResult(() => ({
      text: transcript,
      error: null,
    }))
  }

  const handleError = (event) => {
    setResult((prevResult) => ({
      text: prevResult.text,
      error: `SpeechRecognition error: ${event.error}`,
    }))
    stopListening()
  }

  const handleEnd = () => {
    if (isListening) {
      recognition.start()
    }
  }

  return [result, startListening, stopListening]
}

export default useSpeechRecognition
