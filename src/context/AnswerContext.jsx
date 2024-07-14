import React, { createContext, useState } from 'react'

export const AnswerContext = createContext()

export const AnswerProvider = ({ children }) => {
  const [answers, setAnswers] = useState(['', '', ''])
  const [recordings, setRecordings] = useState([null, null, null])
  const [isEnd, setIsEnd] = useState(false)

  const handleSetAnswer = (index, text) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers]
      newAnswers[index] = text
      return newAnswers
    })
  }

  const handleSetRecording = (index, file) => {
    setRecordings((prevRecordings) => {
      const newRecordings = [...prevRecordings]
      newRecordings[index] = file
      return newRecordings
    })
  }

  const contextValue = {
    answers,
    setAnswers: handleSetAnswer,
    recordings,
    setRecordings: handleSetRecording,
    isEnd,
    setIsEnd,
  }

  return (
    <AnswerContext.Provider value={contextValue}>
      {children}
    </AnswerContext.Provider>
  )
}
