import React, { useState, useEffect, useContext } from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Today.module.css'
import folder from '../assets/images/folder.png'
import voidImg from '../assets/images/voidImg.png'
import Warning from '../components/Warning'
import TodayQuestionList from '../components/TodayQuestionList'
import TodayAnswer from '../components/TodayAnswer'
import { useParams, useNavigate } from 'react-router-dom'
import { formatDate } from '../utils/transformDate'
import { AnswerContext } from '../context/AnswerContext'

export default function Today() {
  const { answers, isEnd, setIsEnd, setAnswers, recordings, setRecordings } =
    useContext(AnswerContext)
  const [data, setData] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://goldenteam.site/api/daily/test/${id}`
        )
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
    const userId = localStorage.getItem('userId')
    const formData = new FormData()

    console.log(answers)
    const replies = answers.map((answer, index) => ({
      questionId: answer.questionId, // Ensure questionId is used here
      answer: answer.text,
    }))

    const dailyCompleteDto = JSON.stringify({
      userId: userId,
      replies: replies,
    })

    formData.append('dailyCompleteDto', dailyCompleteDto)

    recordings.forEach((recording, index) => {
      if (recording) {
        formData.append('records', recording)
      }
    })

    // Submission logic here
    // const response = await fetch(
    //   `https://goldenteam.site/api/daily/test/${id}`,
    //   {
    //     method: 'POST',
    //     body: formData,
    //   }
    // )
    // if (response.ok) {
    //   console.log('Submission successful')
    // } else {
    //   console.log('Submission failed')
    // }
    alert('챌린지 출석 완료 🍟')
    navigate('/dailyList')
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
          <TodayAnswer answers={answers} handleSubmit={handleSubmit} />
        ) : (
          <Warning />
        )}
      </div>
    </Layout>
  )
}
