import Layout from '../components/Layout'
import styles from '../styles/DailyListPage.module.css'
import DailyBox from '../components/DailyBox'
import { useState, useEffect } from 'react'

export default function DailyList() {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://goldenteam.site/daily')

        if (response.ok) {
          const responseData = await response.json()
          setData(responseData ?? '')
          console.log(responseData)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.title}>데일리</div>
        <div className={styles.container}>
          {data?.map((daily) => {
            return (
              <DailyBox key={daily.id} isDone={daily.isDone} data={daily} />
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
