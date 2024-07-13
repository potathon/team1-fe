import TodayQuestion from '../components/TodayQuestion'
import styles from '../styles/Today.module.css'
import React, { useState, useEffect } from 'react'

export default function TodayQuestionList({
  data,
  isEnd,
  setIsEnd,
  setAnswers,
}) {
  const [questionNum, setQuestionNumber] = useState(1)

  if (data.length === 0) return null

  const handleSetAnswer = (index, text) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers]
      newAnswers[index] = text
      return newAnswers
    })
  }

  return (
    <div className={styles.questions}>
      {data.map((item, index) => (
        <TodayQuestion
          key={index}
          setQuestionNumber={setQuestionNumber}
          setAnswer={(text) => handleSetAnswer(index, text)}
          question={item.question}
          questionNumber={questionNum}
          number={index + 1}
          isEnd={isEnd}
          setIsEnd={setIsEnd}
        />
      ))}
    </div>
  )
}
