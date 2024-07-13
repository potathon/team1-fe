import Layout from '../components/Layout'
import styles from '../styles/DailyList.module.css'
import folderImg from '../assets/images/folder.png'
import DailyBox from '../components/DailyBox'

export default function DailyList() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.title}>데일리</div>
        <div className={styles.boxContainer}>
          <DailyBox />
          <DailyBox />
          <DailyBox />
          <DailyBox />
          <DailyBox />

        </div>
      </div>
    </Layout>
  )
}
