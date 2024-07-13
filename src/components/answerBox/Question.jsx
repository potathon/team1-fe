import styles from '../../styles/AnswerBox.module.css'
import volumeImg from '../../assets/images/Volume up.png'

export default function Question() {
  return (
    <div className={styles.questionContainer}>
      <div className={styles.question}>
        데이터베이스 정규화란 무엇이며, 정규화의 장단점에 대해 설명해주세요
        데이터베이스 정규화란 무엇이며, 정규화의 장단점에 대해 설명해주세요
        데이터베이스 정규화란 무엇이며, 정규화의 장단점에 대해 설명해주세요
        데이터베이스 정규화란 무엇이며, 정규화의 장단점에 대해 설명해주세요
      </div>
      <button className={styles.listenBnt}>
        <img className={styles.volumeImg} src={volumeImg} alt='volumeImg' />
        <p className={styles.bntText}>듣기</p>
      </button>
    </div>
  )
}
