import styles from '../../styles/AnswerBox.module.css'
import volumeImg from '../../assets/images/Volume up.png'

export default function Question({ question }) {
  return (
    <div className={styles.questionContainer}>
      <div className={styles.question}>{question}</div>
      <button className={styles.listenBnt}>
        <img className={styles.volumeImg} src={volumeImg} alt='volumeImg' />
        <p className={styles.bntText}>듣기</p>
      </button>
    </div>
  )
}
