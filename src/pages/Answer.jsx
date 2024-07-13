import Layout from '../components/Layout'
import MyAnswer from '../components/answerBox/MyAnswer'
import styles from '../styles/AnswerPage.module.css'

export default function Answer() {
  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>나의 답변</div>
          <div className={styles.date}>7월 13일 토요일</div>
        </div>

        <div className={styles.container}>
          <MyAnswer />
          <MyAnswer />
          <MyAnswer />
        </div>
      </div>
    </Layout>
  )
}
