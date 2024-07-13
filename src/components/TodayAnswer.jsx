import styles from '../styles/TodayAnswer.module.css'
import { useState } from 'react'
import documentIcon from '../assets/images/document.png'
import editIcon from '../assets/images/edit.png'
import check from '../assets/images/check.png'

export default function TodayAnswer({ answer1, answer2, answer3 }) {
  return (
    <>
      <div className={styles.main}>
        <Answer answer={answer1} number={1} />
        <Answer answer={answer2} number={2} />
        <Answer answer={answer3} number={3} />
      </div>
      <div className={styles.button}>제출하기</div>
    </>
  )
}

function Answer({ answer, number }) {
  const [final, setFinal] = useState(answer)
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
          readOnly={!edit} // edit 상태에 따라 readOnly 속성을 동적으로 설정
        ></textarea>
      </div>
    </div>
  )
}
