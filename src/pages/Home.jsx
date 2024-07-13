import Layout from '../components/Layout'
import potatoRoadImg from '../assets/images/potatoRoad.png'
import styles from '../styles/Home.module.css'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigator = useNavigate()
  const handleButtonClick = () => {
    navigator('/dailyList')
  }
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.mainImg}>
          <img
            src={potatoRoadImg}
            alt='potatoRoad'
            className={styles.potatoRoadImg}
          />
        </div>
        <button className={styles.startBnt} onClick={handleButtonClick}>
          튀김기 입장
        </button>
      </div>
    </Layout>
  )
}
