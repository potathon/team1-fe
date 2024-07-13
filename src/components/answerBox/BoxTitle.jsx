import styles from '../../styles/AnswerBox.module.css'
import documentImg from '../../assets/images/document.png'

export default function BoxTitle() {
  return (
    <div className={styles.titleContainer}>
      <img className={styles.documentImg} src={documentImg} alt='documentImg' />
      <div className={styles.title}>질문1</div>
    </div>
  )
}
