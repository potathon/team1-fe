import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import MyAnswer from '../components/answerBox/MyAnswer'
import styles from '../styles/AnswerPage.module.css'
import { useParams } from 'react-router-dom'
import { formatDate } from '../utils/transformDate'

export default function Answer() {
  const { id } = useParams()
  console.log(id)
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://goldenteam.site/daily/${id}`)
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

  const date = formatDate(data?.date)

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>나의 답변</div>
          <div className={styles.date}>{date}</div>
        </div>

        <div className={styles.container}>
          <MyAnswer
            key={data?.questions[0]?.question}
            question={data?.questions[0]?.question}
            answer={data?.questions[0]?.answer}
            recodeUrl={data?.questions[0]?.recodeUrl}
          />
          <MyAnswer
            key={data?.questions[1]?.question}
            question={data?.questions[1]?.question}
            answer={data?.questions[1]?.answer}
            recodeUrl={data?.questions[1]?.recodeUrl}
          />
          <MyAnswer
            key={data?.questions[2]?.question}
            question={data?.questions[2]?.question}
            answer={data?.questions[2]?.answer}
            recodeUrl={data?.questions[2]?.recodeUrl}
          />
        </div>
      </div>
    </Layout>
  )
}
