import styles from '../styles/Warning.module.css'
import MessageCircle from '../assets/images/Message circle.png'

export default function Warning() {
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <img alt='message' src={MessageCircle} className={styles.chat} />
        유의사항
      </div>
      <div className={styles.contents}>
        <div className={styles.content}>1. 문제는 1번만 들을 수 있습니다.</div>
        <div className={styles.content}>
          2. 답변 시간은 총 30초 이내로, 30초를 초과하여 답변할 시 30초 길이의
          답변만 저장이 됩니다.
        </div>
        <div className={styles.content}>
          3. 답변은 각 문제 당 1번 씩만 답할 수 있습니다.
        </div>
        <div className={styles.content}>
          4. 3 문제 모두 답변완료 시, 자신의 답변을 확인할 수 있으며 수정이
          가능합니다.
        </div>
      </div>
    </div>
  )
}
