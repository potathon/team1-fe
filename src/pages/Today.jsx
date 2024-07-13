import Layout from '../components/Layout'
import styles from '../styles/Today.module.css'
import folder from '../assets/images/folder.png'
import voidImg from '../assets/images/voidImg.png'
import Warning from '../components/Warning'
import TodayQuestion from '../components/TodayQuestion'
import { useState, useEffect } from 'react'
import TodayAnswer from '../components/TodayAnswer'

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
            <div className={styles.date}>7월 13일</div>
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
        {/* {isEnd ? (
          <TodayAnswer answer1={answer1} answer2={answer2} answer3={answer3} />
        ) : (
          <Warning />
        )} */}
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

  return (
    <div className={styles.questions}>
      <TodayQuestion
        setQuestionNumber={setQuestionNumber}
        setAnswer={setAnswer1}
        questionNumber={questionNum}
        number={1}
      />
      <TodayQuestion
        setAnswer={setAnswer2}
        setQuestionNumber={setQuestionNumber}
        questionNumber={questionNum}
        number={2}
      />
      <TodayQuestion
        setAnswer={setAnswer3}
        questionNumber={questionNum}
        isEnd={isEnd}
        setIsEnd={setIsEnd}
        number={3}
      />
    </div>
  )
}
