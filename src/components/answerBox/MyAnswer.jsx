import BoxTitle from './BoxTitle'
import Question from './Question'
import Answer from './Answer'
import styles from '../../styles/AnswerPage.module.css'

export default function MyAnswer() {
  return (
    <div className={styles.myAnswer}>
      <BoxTitle />
      <Question />
      <Answer />
    </div>
  )
}
