import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Today.module.css'
import folder from '../assets/images/folder.png'
import voidImg from '../assets/images/voidImg.png'
import Warning from '../components/Warning'
import TodayQuestionList from '../components/TodayQuestionList'
import TodayAnswer from '../components/TodayAnswer'
import { useParams } from 'react-router-dom'
import { formatDate } from '../utils/transformDate'

export default function Today() {
  const [isEnd, setIsEnd] = useState(false)
  const [answers, setAnswers] = useState(['', '', ''])
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

  return (
    <Layout>
      <div className={styles.main}>
        <h1 className={styles.title}>데일리</h1>
        <div className={styles.container}>
          <div className={styles.date}>
            <img alt='folder' src={folder} className={styles.folder} />
            <div className={styles.date}>
              {data.length > 0 ? formatDate(data[0].date) : ''}
            </div>
          </div>
          <div className={styles.mainBottom}>
            <div className={styles.left}>
              <TodayQuestionList
                data={data}
                isEnd={isEnd}
                setIsEnd={setIsEnd}
                setAnswers={setAnswers}
              />
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
          />
        ) : (
          <Warning />
        )}
      </div>
    </Layout>
  )
}
