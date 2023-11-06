import { useState, type KeyboardEvent, type ReactElement } from 'react'
import styles from './Search.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { API_KEY } from '../../pages/HomePage'
import { baseSet } from '../../store/slice/movieSlice'
import { useNavigate } from 'react-router-dom'
import {
  sortBySearchData,
  isDisplay
} from '../../store/slice/sortbySearchSlice'
import { useDispatch } from 'react-redux'

const Search = (): ReactElement => {
  const dispatch = useDispatch()
  const [display, setDisplay] = useState('')
  const [inputVal, setInputVal] = useState('')
  const navigate = useNavigate()

  // 검색된 영화를 가져오는 API
  const getSearchMovieData = async (inputVal: string): Promise<void> => {
    try {
      const response = await baseSet.get(
        `/3/search/movie?api_key=${API_KEY}&language=ko-KR&page=1&include_adult=false&query=${inputVal}`
      )
      const copy = response.data // 서버에서 받아온 데이터
      dispatch(sortBySearchData(copy)) // 데이터를 디스패치를 통해 스토어로 전달한다.
    } catch (error) {
      console.error('검색실패:', error)
    }
  }

  // 검색창을 나타나게하거나 사라지게 하는 함수
  const inputAppearFunc = (): void => {
    display === '' ? setDisplay(styles.display) : setDisplay('')
  }

  // 사용자가 엔터 입력 시 실행되는 함수
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    const keyCode = e.key
    if (inputVal !== '' && keyCode === 'Enter') {
      navigate('/movieapp/movies')
      getSearchMovieData(inputVal).catch(console.error)
      dispatch(isDisplay(false))
      e.currentTarget.value = ''
    }
  }

  return (
    <article className={styles.search}>
      {/* 돋보기 이모티콘 */}
      <span onClick={inputAppearFunc} role='button' aria-label='검색창 아이콘' className={`${styles.search_icon_outer} ${display}`}>
        <FontAwesomeIcon
          className={styles.search_icon}
          icon={faMagnifyingGlass}

        />
      </span>

      {/* 검색창 */}
      <form onSubmit={(e) => {
        e.preventDefault()
      }} className={`${styles.search_input_container}`}>
        <label htmlFor="search" className={styles.search_icon_inner}>
          <FontAwesomeIcon icon={faMagnifyingGlass} onClick={inputAppearFunc} />
        </label>
        <input
          id="search"
          placeholder=""
          className={styles.search_user_input}
          type={'search'}
          onChange={(event) => {
            const copy = event.target.value
            setInputVal(copy)
            navigate('/movieapp/movies')
          }}
          onKeyDown={onKeyDown}
        ></input>
      </form>
    </article>
  )
}

export default Search
