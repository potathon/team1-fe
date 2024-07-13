import React, { useState, useEffect, useRef } from 'react'
import play from '../assets/images/play.png'
import microphone from '../assets/images/microphone.png'
import styles from '../styles/Today.module.css'
import Lottie from 'lottie-react'
import playing from '../assets/lotties/playing.json'
import useSpeechRecognition from '../hooks/useSpeechRecognition'

export default function TodayQuestion({
  setQuestionNumber,
  questionNumber,
  setAnswer,
  number,
  isEnd,
  setIsEnd,
}) {
  const [enable, setEnable] = useState(false)
  const [recording, setRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timer, setTimer] = useState(0)
  const [hasListened, setHasListened] = useState(false)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [result, startListening, stopListening] = useSpeechRecognition()
  const intervalRef = useRef(null)

  const message = '자료구조에 대해서 설명하시오'

  useEffect(() => {
    if (number === questionNumber) {
      setEnable(true)
    } else {
      setEnable(false)
    }
  }, [questionNumber, number])

  useEffect(() => {
    if (recording) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev >= 30) {
            stopRecording()
            clearInterval(intervalRef.current)
            return 30
          }
          return prev + 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [recording])

  useEffect(() => {
    if (result.text) {
      setAnswer((prev) => [...prev, { number, text: result.text }])
      setHasAnswered(true)
      console.log(result.text)
    }
    if (result.error) {
      setErrorMessage('Speech recognition error: ' + result.error)
      console.error(result.error)
    }
  }, [result])

  const playQuestion = () => {
    if (hasListened) return
    setIsPlaying(true)
    const utterance = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterance)
    utterance.onend = () => {
      setIsPlaying(false)
      setHasListened(true)
      setTimeout(() => {
        startRecording()
      }, 2000)
    }
  }

  const startRecording = () => {
    if (hasAnswered) return
    setErrorMessage('')
    setTimer(0)
    setRecording(true)
    startListening()
  }

  const stopRecording = () => {
    if (recording) {
      stopListening()
      setRecording(false)
      // 상태 업데이트를 렌더링 단계 이후에 수행
      if (number < 3) {
        setTimeout(() => {
          setQuestionNumber(number + 1)
        }, 0)
      } else {
        setIsEnd(true)
      }
    }
  }

  return (
    <>
      <div className={styles.question}>
        <div className={styles.questionNumber}>질문 {number}</div>
        <div className={styles.questionButtons}>
          <div
            className={`${styles.listenButton} ${
              enable && !isEnd ? styles.enabled : styles.disabled
            }`}
            onClick={enable && !hasListened ? playQuestion : null}
          >
            {isPlaying && !recording ? (
              <div className={styles.playing}>
                <Lottie animationData={playing} />
              </div>
            ) : (
              <>
                <img src={play} className={styles.play} alt='Play' /> 문제
              </>
            )}
          </div>
          <div
            className={`${styles.answerButton} ${
              recording ? styles.enabled : ''
            } ${enable && hasListened && !isEnd ? '' : styles.disabled}`}
            onClick={recording ? stopRecording : null}
          >
            <img
              src={microphone}
              className={styles.microphone}
              alt='Microphone'
            />{' '}
            완료
          </div>
        </div>
      </div>
      {recording && (
        <div className={styles.timer}>남은 시간: {30 - timer}초</div>
      )}
      {errorMessage && <div className={styles.error}>에러: {errorMessage}</div>}
    </>
  )
}
