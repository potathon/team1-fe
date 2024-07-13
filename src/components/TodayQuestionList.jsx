import React, { useState, useContext } from 'react'
import TodayQuestion from '../components/TodayQuestion'
import styles from '../styles/Today.module.css'
import { AnswerContext } from '../context/AnswerContext'

export default function TodayQuestionList({ data }) {
  const [questionNum, setQuestionNumber] = useState(1)
  const { setAnswers, setRecordings, isEnd, setIsEnd } =
    useContext(AnswerContext)

  return (
    <div className={styles.questions}>
      {data?.questions?.map((item, index) => (
        <TodayQuestion
          key={index}
          setQuestionNumber={setQuestionNumber}
          setAnswer={(text) => setAnswers(index, text)}
          setRecording={(file) => setRecordings(index, file)}
          question={item.question}
          questionId={item.questionId} // Ensure questionId is passed here
          questionNumber={questionNum}
          number={index + 1}
          isEnd={isEnd}
          setIsEnd={setIsEnd}
        />
      ))}
    </div>
  )
}
