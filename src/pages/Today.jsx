import Layout from '../components/Layout'
import styles from '../styles/Today.module.css'
import folder from '../assets/images/folder.png'
import voidImg from '../assets/images/voidImg.png'
import Warning from '../components/Warning'
import TodayQuestion from '../components/TodayQuestion'
import { useState, useEffect } from 'react'
import TodayAnswer from '../components/TodayAnswer'
import { useParams } from 'react-router-dom'

export default function Today() {
  const [isEnd, setIsEnd] = useState(false)
  const [answer1, setAnswer1] = useState('')
  const [answer2, setAnswer2] = useState('')
  const [answer3, setAnswer3] = useState('')

  useEffect(() => {
    console.log(isEnd)
    console.log(answer1[0]?.text, answer2[0]?.text, answer3[0]?.text)
  }, [isEnd, answer1, answer2, answer3])

  return (
    <Layout>
      <div className={styles.main}>
        <h1 className={styles.title}>데일리</h1>
        <div className={styles.container}>
          <div className={styles.date}>
            <img alt='folder' src={folder} className={styles.folder} />
            <div className={styles.date}>7월 13일 (토)</div>
          </div>
          <div className={styles.mainBottom}>
            <div className={styles.left}>
              <TodayQuestionList
                isEnd={setIsEnd}
                setIsEnd={setIsEnd}
                setAnswer1={setAnswer1}
                setAnswer2={setAnswer2}
                setAnswer3={setAnswer3}
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
            answer1={answer1[0]?.text}
            answer2={answer2[0]?.text}
            answer3={answer3[0]?.text}
          />
        ) : (
          <Warning />
        )}
      </div>
    </Layout>
  )
}

function TodayQuestionList({
  isEnd,
  setIsEnd,
  setAnswer1,
  setAnswer2,
  setAnswer3,
}) {
  const [questionNum, setQuestionNumber] = useState(1)
  const [data, setData] = useState([])

  const id = useParams().id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://goldenteam.site/daily/test/${id}`)

        if (response.ok) {
          const responseData = await response.json()
          setData(responseData)
        }
      } catch (err) {
        console.log('Error fetch data', err)
      }
    }

    fetchData()
  }, [id])

  return data ? (
    <div className={styles.questions}>
      <TodayQuestion
        setQuestionNumber={setQuestionNumber}
        setAnswer={setAnswer1}
        question={data[0].question}
        questionNumber={questionNum}
        number={1}
      />
      <TodayQuestion
        setAnswer={setAnswer2}
        setQuestionNumber={setQuestionNumber}
        question={data[1].question}
        questionNumber={questionNum}
        number={2}
      />
      <TodayQuestion
        setAnswer={setAnswer3}
        questionNumber={questionNum}
        question={data[2].question}
        isEnd={isEnd}
        setIsEnd={setIsEnd}
        number={3}
      />
    </div>
  ) : null
}
