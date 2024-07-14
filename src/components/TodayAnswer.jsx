import React, { useState, useContext } from 'react'
import styles from '../styles/TodayAnswer.module.css'
import documentIcon from '../assets/images/document.png'
import editIcon from '../assets/images/edit.png'
import check from '../assets/images/check.png'
import { AnswerContext } from '../context/AnswerContext'

export default function TodayAnswer({ handleSubmit, answers }) {
  return (
    <>
      <div className={styles.main}>
        {answers.map((answer, index) => (
          <Answer answer={answer} number={index + 1} key={index} />
        ))}
      </div>
      <div className={styles.button} onClick={handleSubmit}>
        제출하기
      </div>
    </>
  )
}

function Answer({ answer, number }) {
  const [final, setFinal] = useState(answer.text)
  const [edit, setEdit] = useState(false)

  const handleChangeFinal = (input) => {
    setFinal(input)
  }

  const handleClickEdit = () => {
    setEdit((prevEdit) => !prevEdit)
  }

  return (
    <div className={styles.answer}>
      <div className={styles.topContainer}>
        <div className={styles.title}>
          <img src={documentIcon} alt='document' className={styles.document} />
          답변 {number}{' '}
        </div>
        <div className={styles.iconContainer} onClick={handleClickEdit}>
          {edit ? (
            <img src={check} className={styles.checkIcon} alt='check' />
          ) : (
            <img src={editIcon} className={styles.icon} alt='edit' />
          )}
        </div>
      </div>
      <div className={styles.content}>
        <textarea
          className={`${styles.contentInput} ${edit ? styles.edit : ''}`}
          maxLength={300}
          onChange={(e) => handleChangeFinal(e.target.value)}
          value={final}
          readOnly={!edit}
        ></textarea>
      </div>
    </div>
  )
}
