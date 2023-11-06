import styles from './MovieSide.module.css'
import { useState, useEffect, type ReactElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortBySearchData } from '../../store/slice/sortbySearchSlice'
import { getMovieSortBy } from '../../api/api'
import SortBy from '../sortBy/SortBy'
import SortByData from '../sortBy/SortByDate'
import SortByGenre from '../sortBy/SortByGenre'
import Pagination from '../sortBy/pagination/Pagination'

interface paginationDisplayType {
  isDisplayed: boolean
}

const MoviesSide = (): ReactElement => {
  const dispatch = useDispatch()
  const globalPaginationDisplayState = useSelector<paginationDisplayType>((state) => {
    return state.isDisplayed
  }) as any

  // Movies 페이지 접속 시 기본은 sortBy의 인기순을 값으로 한다.
  // 그 외 filter나 genre 별 검색 시에 페이지네이션 영역은 일반적으로 보이지 않도록 설정
  // 즉, sortBy 를 제외하고, sortByDate, sortByGenre 때는 안보이게 설정함.
  const [paginationDisplayState, setPaginationDisplayState] = useState(true)
  const [barHiddenState, setBarHiddenState] = useState(true)
  const [pageNumber, setPageNumber] = useState<number>(1)

  // 분류별 영화 정보 저장
  const [currentSort, setCurrentSort] = useState('popularity.desc')

  // 사이드바 나타나기/숨기기 함수
  const [display, setDisplay] = useState('')
  const sidebarAppearFunc = (): void => {
    setBarHiddenState((barHiddenState) => !barHiddenState)
    barHiddenState ? setDisplay(styles.sidebar_appear) : setDisplay('')
  }

  const fetchMovies = async (): Promise<void> => {
    try {
      const movies = await getMovieSortBy(currentSort, pageNumber)
      dispatch(sortBySearchData(movies))
    } catch (error) {
      console.error(error)
    }
  }

  // selectVal이나 현재 페이지 숫자가 바뀔 때만 API 내 함수 실행
  useEffect(() => {
    void fetchMovies()
  }, [currentSort, getMovieSortBy, pageNumber])

  // 리덕스 스토어에서 가져온 boolean 값을
  // 페이지네이션을 온/오프 하는 setState 함수의 인자로 전달
  // 검색창을 통해 영화 검색 시 불필요한 페이지네이션 영역을 숨긴다.
  useEffect(() => {
    setPaginationDisplayState(globalPaginationDisplayState)
  }, [globalPaginationDisplayState])

  return (
    <article className={styles.movie_side}>
      <div className={`${styles.movie_side_inner} ${display}`}>
        {/* side tap 닫는 버튼 */}
        <button
          className={styles.sidebar_hidden_btn_inner}
          onClick={sidebarAppearFunc}
        >
          X
        </button>

        {/* side tap 콘텐츠 중 sort by 영역  */}
        <SortBy
          setCurrentSort={setCurrentSort}
          setPage={setPageNumber}
          isDisplayVal={globalPaginationDisplayState}
        />
        <SortByData setPage={setPageNumber} />
        <SortByGenre setPage={setPageNumber} />
      </div>

      {/* 좌측의 sort tap 여는 버튼 */}
      <button className={styles.sidebar_hidden_btn} onClick={sidebarAppearFunc}>
        ▶
      </button>

      {/* 페이지네이션 표시 영역 */}
      {paginationDisplayState
        ? (
        <Pagination setPage={setPageNumber} currentPageNum={pageNumber} />
          )
        : null}
    </article>
  )
}

export default MoviesSide
