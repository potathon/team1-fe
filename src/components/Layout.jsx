import styles from '../styles/Layout.module.css'
import Header from './LoginHeader'

export default function Layout({ children }) {
  return (
    <div className={styles.main}>
      <Header />
      {children}
    </div>
  )
}
