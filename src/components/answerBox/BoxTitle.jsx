import styles from '../../styles/AnswerBox.module.css'
import documentImg from '../../assets/images/document.png'

export default function BoxTitle({ num }) {
  return (
    <div className={styles.titleContainer}>
      <img className={styles.documentImg} src={documentImg} alt='documentImg' />
      <div className={styles.title}>질문 {num}</div>
    </div>
  )
}
