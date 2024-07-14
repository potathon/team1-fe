import styles from '../../styles/AnswerBox.module.css'

export default function Feedback({ feedback }) {
  return (
    <div className={styles.feedbackBox}>
      <div className={styles.answer}>{feedback}</div>
    </div>
  )
}
