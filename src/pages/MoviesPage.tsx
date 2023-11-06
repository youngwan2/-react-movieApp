import styles from './Movies.module.css'
import MoviesSide from '../components/movies/MovieSide'
import MoviesCard from '../components/movies/MoviesCard'
import TopShift from '../components/movies/TopShift'
import { useEffect, useState, type ReactElement } from 'react'

const Movies = (): ReactElement => {
  const [scrollY, setScrollY] = useState(0) // 스크롤 Y 값 저장

  const onScrollFunc = (): void => {
    setScrollY(window.scrollY)
  }

  useEffect(() => {
    scrollY > 50
      ? window.removeEventListener('scroll', onScrollFunc)
      : window.addEventListener('scroll', onScrollFunc)
  }, [scrollY])

  return (
    <section className={styles.movies}>
      <div className={styles.movies_container}>
        <MoviesSide />
        <MoviesCard />
        {scrollY > 50 ? <TopShift /> : null}
      </div>
    </section>
  )
}

export default Movies
