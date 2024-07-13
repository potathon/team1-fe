import Layout from '../components/Layout'
import potatoRoadImg from '../assets/images/potatoRoad.png'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout>
      <div className={styles.mainImg}>
        <img
          src={potatoRoadImg}
          alt='potatoRoad'
          className={styles.potatoRoadImg}
        />
      </div>
      <button>튀김기 입장</button>
    </Layout>
  )
}
