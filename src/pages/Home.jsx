import Layout from '../components/Layout'
import potatoRoadImg from '../assets/images/potatoRoad.png'
import potato from '../assets/images/potato.gif'
import styles from '../styles/HomePage.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Home() {
  const [token, setToken] = useState('')
  const [error, setError] = useState(false)
  const navigator = useNavigate()
  const handleButtonClick = async () => {
    const data = JSON.stringify({ token })
    try {
      const response = await fetch('https://goldenteam.site/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      })

      if (response.ok) {
        const responseData = await response.json()
        localStorage.setItem('userId', responseData.id)
        navigator('/dailyList')
        setError(false)
      } else {
        setError(true)
      }
    } catch (error) {
      setError(true)
    }
  }

  const changeToken = (input) => {
    setToken(input)
  }

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.mainImg}>
            <img src={potato} alt='potato' className={styles.potato} />
            <img
              src={potatoRoadImg}
              alt='potatoRoad'
              className={styles.potatoRoadImg}
            />
          </div>
          <div className={styles.title}>
            감자깎기
            <input
              value={token}
              onChange={(e) => changeToken(e.target.value)}
              className={styles.tokenInput}
              type='password'
            />
          </div>
          <button className={styles.startBnt} onClick={handleButtonClick}>
            튀김기 입장
          </button>
          {error && <div className={styles.error}>감자깎기 실패 ㅜㅜ</div>}
        </div>
      </div>
    </Layout>
  )
}
