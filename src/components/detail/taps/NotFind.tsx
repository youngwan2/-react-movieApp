import { type ReactElement } from 'react'
import styles from './NotFind.module.css'

const NotFind = (): ReactElement => {
  return (
    <p className={styles.not_find_message}>
      {"The information you are looking for does not exist. I'm sorry."} <br />
      {'죄송합니다. 현재 보려고 하는 정보는 존재하지 않습니다.'}
    </p>
  )
}

export default NotFind
