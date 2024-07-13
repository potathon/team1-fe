import React, { useState, useEffect, useContext } from 'react' // 수정된 부분
import Layout from '../components/Layout'
import styles from '../styles/Today.module.css'
import folder from '../assets/images/folder.png'
import voidImg from '../assets/images/voidImg.png'
import Warning from '../components/Warning'
import TodayQuestionList from '../components/TodayQuestionList'
import TodayAnswer from '../components/TodayAnswer'
import { useParams } from 'react-router-dom'
import { formatDate } from '../utils/transformDate'
import { AnswerContext } from '../context/AnswerContext' // 수정된 부분

export default function Today() {
  const { answers, isEnd, setIsEnd, setAnswers, recordings, setRecordings } =
    useContext(AnswerContext) // 수정된 부분
  const [data, setData] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://goldenteam.site/daily/test/${id}`)
        if (response.ok) {
          const responseData = await response.json()
          setData(responseData)
        }
      } catch (err) {
        console.log('Error fetching data', err)
      }
    }

    fetchData()
  }, [id])

  const handleSubmit = async () => {
    const formData = new FormData()
    answers.forEach((answer, index) => {
      formData.append(`answer${index + 1}`, answer)
      if (recordings[index]) {
        formData.append(`recording${index + 1}`, recordings[index])
      }
    })

    // Submission logic here
  }

  return (
    <Layout>
      <div className={styles.main}>
        <h1 className={styles.title}>데일리</h1>
        <div className={styles.container}>
          <div className={styles.date}>
            <img alt='folder' src={folder} className={styles.folder} />
            <div className={styles.date}>{formatDate(data.date)}</div>
          </div>
          <div className={styles.mainBottom}>
            <div className={styles.left}>
              <TodayQuestionList data={data} />
            </div>
            <div className={styles.right}>
              <img alt='void' src={voidImg} className={styles.void} />
            </div>
          </div>
        </div>
        <hr className={styles.line} />
        {isEnd ? (
          <TodayAnswer
            answer1={answers[0]}
            answer2={answers[1]}
            answer3={answers[2]}
            handleSubmit={handleSubmit}
          />
        ) : (
          <Warning />
        )}
      </div>
    </Layout>
  )
}
