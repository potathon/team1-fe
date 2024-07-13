import Layout from '../components/Layout'
import styles from '../styles/DailyListPage.module.css'
import DailyBox from '../components/DailyBox'

export default function DailyList() {
  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.title}>데일리</div>
        <div className={styles.container}>
          <DailyBox isDaily={true} />
          <DailyBox />
          <DailyBox />
          <DailyBox />
          <DailyBox />
        </div>
      </div>
    </Layout>
  )
}
