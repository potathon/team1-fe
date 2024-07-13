import BoxTitle from './BoxTitle'
import Question from './Question'
import Answer from './Answer'
import styles from '../../styles/AnswerPage.module.css'

export default function MyAnswer({ num, question, recodeUrl, answer }) {
  return (
    <div className={styles.myAnswer}>
      <BoxTitle num={num} />
      <Question question={question} recodeUrl={recodeUrl} />
      <Answer answer={answer} />
    </div>
  )
}
