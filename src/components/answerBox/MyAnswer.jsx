import BoxTitle from './BoxTitle'
import Question from './Question'
import Answer from './Answer'
import Feedback from './Feedback'
import styles from '../../styles/AnswerPage.module.css'
import cutter from '../../utils/cutter'
import { useState, useEffect } from 'react'

export default function MyAnswer({
  num,
  question,
  recodeUrl,
  answer,
  feedback,
}) {
  console.log(feedback)

  const [cuttedFeedback, setCuttedFeedback] = useState('')

  useEffect(() => {
    async function processCutting() {
      try {
        const cutted = await cutter(feedback)
        setCuttedFeedback(cutted)
      } catch (error) {
        console.error(error)
      }
    }
    processCutting()
  }, [feedback])

  return (
    <div className={styles.myAnswer}>
      <BoxTitle num={num} text={'질문'} />
      <Question question={question} recodeUrl={recodeUrl} />
      <Answer answer={answer} />
      <BoxTitle num={num} text={'피드백'} />
      <Feedback feedback={cuttedFeedback} />
    </div>
  )
}
