import { type ReactElement } from 'react'
import styles from './Spinner.module.css'

const Spinner = (): ReactElement => {
  return <article className={styles.loading_spinner}></article>
}

export default Spinner
