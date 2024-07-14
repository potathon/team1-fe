import React, { useState, useEffect, useRef, useContext } from 'react'
import play from '../assets/images/play.png'
import microphone from '../assets/images/microphone.png'
import styles from '../styles/Today.module.css'
import Lottie from 'lottie-react'
import playing from '../assets/lotties/playing.json'
import useSpeechRecognition from '../hooks/useSpeechRecognition'
import useAudioRecorder from '../hooks/useAudioRecorder'
import { AnswerContext } from '../context/AnswerContext'

export default function TodayQuestion({
  setQuestionNumber,
  questionNumber,
  question,
  questionId, // Ensure questionId is received here
  number,
}) {
  const { setAnswers, setRecordings, isEnd, setIsEnd } =
    useContext(AnswerContext)
  const [enable, setEnable] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timer, setTimer] = useState(0)
  const [hasListened, setHasListened] = useState(false)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [result, startListening, stopListening] = useSpeechRecognition()
  const {
    recording,
    audioBlob,
    startRecording: startAudioRecording,
    stopRecording: stopAudioRecording,
  } = useAudioRecorder()
  const intervalRef = useRef(null)

  const message = question

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
      setTimeout(() => {
        setAnswers(number - 1, { questionId, text: result.text }) // Ensure questionId is set here
      }, 0)
      setHasAnswered(true)
      console.log('Converted Text:', result.text)
    }
    if (result.error) {
      setErrorMessage('Speech recognition error: ' + result.error)
      console.error(result.error)
    }
  }, [result.text])

  useEffect(() => {
    if (audioBlob) {
      setRecordings(number - 1, audioBlob)
      if (number < 3) {
        setTimeout(() => {
          setQuestionNumber(number + 1)
        }, 0)
      } else {
        setTimeout(() => {
          setIsEnd(true)
        }, 0)
      }
    }
  }, [audioBlob])

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
    startAudioRecording()
    startListening()
  }

  const stopRecording = () => {
    if (recording) {
      stopListening()
      stopAudioRecording()
    }
  }

  return (
    <>
      <div className={styles.question}>
        <div className={styles.questionContainer}>
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
          <div className={styles.timerContainer}>
            <div className={styles.timerBar}>
              <div
                className={styles.timerProgress}
                style={{ width: `${(timer / 30) * 100}%` }}
              ></div>
            </div>
            <div className={styles.timerText}>남은 시간: {30 - timer}초</div>
          </div>
        )}
      </div>

      {errorMessage && <div className={styles.error}>에러: {errorMessage}</div>}
    </>
  )
}
