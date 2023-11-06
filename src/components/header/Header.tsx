import { type ReactElement, useState } from 'react'
import styles from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Search from './Search'

const Header = (): ReactElement => {
  const [menuDisplay, setMenuDisplay] = useState('')

  const displayFunc = (): void => {
    if (menuDisplay === '') {
      setMenuDisplay(styles.display_on)
    } else setMenuDisplay('')
  }
  const navigate = useNavigate()
  return (
    <header className={styles.header}>
      <div className={styles.header_logo_menu_con}>
        <img
          className={styles.header_logo}
          onClick={() => {
            navigate('/movieapp')
          }}
          width={90}
          height={45}
          src={process.env.PUBLIC_URL + '/title2.png'}
          alt="site_name"
        ></img>

        <nav className={`${styles.header_menu} ${menuDisplay}`}>
          <Link className={styles.link} to={'/movieapp'}>
            홈으로
          </Link>
          <Link className={styles.link} to={'/movieapp/movies'}>
            영화정보
          </Link>
        </nav>
      </div>
      <div className={styles.header_icon_box}>
        <Search />
        {/* 메뉴 버튼 */}
        <FontAwesomeIcon
          onClick={displayFunc}
          className={styles.menu}
          icon={faBars}
        ></FontAwesomeIcon>
      </div>
    </header>
  )
}

export default Header
