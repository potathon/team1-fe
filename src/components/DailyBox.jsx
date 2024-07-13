import styles from '../styles/DailyBox.module.css'
import folderImg from '../assets/images/folder.png'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/transformDate'

export default function DailyBox({ data, isDone = true }) {
  const date = formatDate(data?.date)
  return (
    <>
      <div className={styles.box}>
        <div className={styles.dateBox}>
          <img className={styles.folderImg} src={folderImg} alt='folderImg' />
          <div className={styles.textBox}>
            <div className={styles.date}>{date}</div>
            <div className={styles.anwered}>답변자수 : {data.answerCnt}</div>
          </div>
        </div>
        {!isDone ? (
          <Link to={`/today/${data.id}`} className={styles.button}>
            START
          </Link>
        ) : (
          <Link to={`/answer/${data.id}`} className={styles.button}>
            REVIEW
          </Link>
        )}
      </div>
      <hr className={styles.line} />
    </>
  )
}
