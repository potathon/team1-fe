import styles from '../styles/Header.module.css'

export default function LoginHeader() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logo}>🍟 싹난 감자</div>
        <div className={styles.right}>
          <div className={styles.logIn}>로그인</div>
        </div>
      </div>
    </div>
  )
}
