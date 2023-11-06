import styles from './Home.module.css'
import { useEffect, useState, memo } from 'react'
import { getMovieData } from '../store/slice/movieSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Banner from '../components/home/Banner'
import MovieSlide from '../components/home/MovieSlide'
import Spinner from '../components/spinner/Spinner'

export const API_KEY = process.env.REACT_APP_API_KEY

const Home = memo(() => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  const { popularMovie, topRateMovie, isComingMovie } = useAppSelector(
    (state: any) => {
      return state.movies.data
    }
  )

  useEffect(() => {
    // 영화 데이터를 요청한다.
    dispatch(getMovieData()).catch(console.error)
    setLoading(false)
  }, [dispatch])

  return (
    <section className={styles.home}>
      {loading
        ? (
        <Spinner />
          )
        : (
        <article className={styles.main_container}>
          <Banner />
          <h1 className={styles.slide_title}>인기 있는 영화</h1>
          <MovieSlide movies={popularMovie} />
          <h1 className={styles.slide_title}>평점 높은 영화</h1>
          <MovieSlide movies={topRateMovie} />
          <h1 className={styles.slide_title}>최근에 나온 영화</h1>
          <MovieSlide movies={isComingMovie} />
        </article>
          )}
    </section>
  )
})

Home.displayName = 'Home'
export default Home