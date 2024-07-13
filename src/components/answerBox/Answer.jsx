import styles from '../../styles/AnswerBox.module.css'

export default function MyAnswer() {
  return (
    <div className={styles.answerBox}>
      <div className={styles.answer}>
        데이터베이스 정규화는 데이터 중복을 최소화하고 데이터 무결성을 보장하기
        위해 데이터베이스 테이블을 구조화하는 과정입니다. 정규화는 여러 단계로
        이루어지며, 각 단계는 특정 규칙을 적용하여 테이블을 분해합니다
      </div>
    </div>
  )
}
