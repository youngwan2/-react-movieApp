import { type ReactElement } from 'react'
import styles from './NotPath.module.css'
import { useNavigate } from 'react-router-dom'

const NotPath = (): ReactElement => {
  const navigate = useNavigate()
  return (
    <article className={styles.not_path}>
      <div className={styles.not_path_inner_con}>
        <h1>
          The path does not exist. Would you like to go back to the previous
          page?
        </h1>
        <h3 style={{ padding: '15px', color: 'GrayText' }}>
          해당 경로는 존재하지 않는 페이지 입니다. 이전 페이지로
          돌아가시겠습니까?
        </h3>
        <button
          className={styles.not_path_backButton}
          onClick={() => {
            navigate(-1)
          }}
        >
          {' '}
          Go back{' '}
        </button>
      </div>
    </article>
  )
}

export default NotPath
