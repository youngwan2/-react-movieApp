/* eslint-disable multiline-ternary */
import { type ReactElement, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './MoviesCard.module.css'
import {
  type SearchDateType,
  type SearchDateTypeMapFunc
} from '../../util/type/MoviesCard'
import MoviesCardContent from './MoviesCardContent'

const MoviesCard = (): ReactElement => {
  const [alert, setAlert] = useState('')

  const navigate = useNavigate()
  const searchDate = useSelector((state: SearchDateType) => {
    const results = state.sortBySearch.data.results
    return results
  })

  const hasSearchData = searchDate !== undefined && searchDate.length > 0
  useEffect(() => {
    const hasSearchData = searchDate !== undefined && searchDate.length < 1
    if (Array.isArray(searchDate) && hasSearchData) {
      setAlert("The information you are looking for does not exist. I'm sorry.")
    } else {
      setAlert('')
    }
  }, [searchDate])

  return (
    <ul className={styles.movies_card}>
      {searchDate !== undefined && hasSearchData ? (
        searchDate.map((data: SearchDateTypeMapFunc, i: number) => {
          return (
            <li
              key={i}
              className={styles.movies_card_img}
              style={{
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(https://image.tmdb.org/t/p/w300${data.poster_path})`
              }}
              onClick={() => {
                window.scrollTo({ top: 0 })
                navigate(`/movieapp/detail/${data.id}`)
              }}
            >
              <MoviesCardContent data={data} />
            </li>
          )
        })
      ) : (
        <div className={styles.alert}>
          <span>{alert}</span>
        </div>
      )}
    </ul>
  )
}

export default MoviesCard
