import styles from '../styles/DailyBox.module.css'
import folderImg from '../assets/images/folder.png'
import { Link } from 'react-router-dom'

export default function DailyBox({ isDaily = false }) {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.dateBox}>
          <img className={styles.folderImg} src={folderImg} alt='folderImg' />
          <div className={styles.textBox}>
            <div className={styles.date}>7월 13일 (토)</div>
            <div className={styles.anwered}>답변자수 : 30명</div>
          </div>
        </div>
        {isDaily ? (
          <Link to={'/today'} className={styles.button}>
            START
          </Link>
        ) : (
          <Link to={'/answer'} className={styles.button}>
            REVIEW
          </Link>
        )}
      </div>
      <hr className={styles.line} />
    </>
  )
}
