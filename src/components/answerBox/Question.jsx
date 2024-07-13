import styles from '../../styles/AnswerBox.module.css'
import volumeImg from '../../assets/images/Volume up.png'
import testAudio from '../../assets/sound/ta-da_yrvBrlS.mp3'

export default function Question({ question, recodeUrl }) {
  const audioPlayer = document.querySelector('#audio')
  const handleButtonClick = async () => {
    console.log('정상 재생', audioPlayer.src)
    await audioPlayer.play()
    console.log('로딩 확인')
  }

  return (
    <div className={styles.questionContainer}>
      <div className={styles.question}>{question}</div>
      <audio id='audio' src={testAudio} type='audio/mpeg'></audio>
      <button className={styles.listenBnt} onClick={handleButtonClick}>
        <img className={styles.volumeImg} src={volumeImg} alt='volumeImg' />
        <p className={styles.bntText}>듣기</p>
      </button>
    </div>
  )
}
