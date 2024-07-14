import styles from '../../styles/AnswerBox.module.css'

export default function Answer({ answer }) {
  return (
    <div className={styles.answerBox}>
      <div className={styles.answer}>{answer}</div>
    </div>
  )
}
