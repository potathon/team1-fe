import styles from '../styles/DailyBox.module.css'
import folderImg from '../assets/images/folder.png'

export default function DailyBox() {
  return (
    <div className={styles.box}>
      <div className={styles.dateBox}>
        <img className={styles.folderImg} src={folderImg} alt='folderImg' />
        <div className={styles.textBox}>
          <div className={styles.date}>7월 13일 (토)</div>
          <div className={styles.anwered}>답변자수 : 30명</div>
        </div>
      </div>
      <button className={styles.button}>START</button>
    </div>
  )
}
