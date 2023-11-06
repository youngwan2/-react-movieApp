import styles from './SlideCard.module.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { type SlideCardType } from '../../util/type/SlideCardType'
import { type ReactElement } from 'react'

interface GenreReduxType {
  movies: {
    data: {
      genreInfo: {
        genres: [{ id: number, name: string }]
      }
    }
  }
}

interface GenreArrayType {
  [x: string]: any
  id: number
  name: string
}

/* 메인 화면에서 하단에 슬라이드로 보여지는 이미지와 콘텐츠 */
const SlideCard = ({ movieList }: SlideCardType): ReactElement => {
  const navigate = useNavigate()

  return (
    <article
      onClick={() => {
        window.scrollTo({ top: 0 })
        navigate(`/movieapp/detail/${movieList.id}`)
      }}
      className={styles.slide_card}
    >
      {/* 영화 이미지 */}
      <div
        aria-label={`${movieList.title}의 영화 포스터`}
        role='img'
        style={{
          height: '250px',
          borderRadius: '5px',
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
          backgroundImage: `url(https://image.tmdb.org/t/p/w300${movieList.poster_path})`
        }}
      >
        {/* 영화 정보 */}
      <SlideCardContent movieList={movieList}/>
      </div>
    </article>
  )
}

const SlideCardContent = ({ movieList }: SlideCardType): ReactElement => {
  const genre = useSelector<GenreReduxType>((state) => {
    return state.movies.data.genreInfo.genres
  }) as GenreArrayType

  return (
    <article className={styles.slide_card_contents}>
      <strong className={styles.title}>{movieList.title}</strong>
      {movieList.genre_ids.map((ids: number) => {
        return (
          <span className={styles.genre} key={ids}>
            {genre.find((g: GenreArrayType) => g.id === ids).name}
          </span>
        )
      })}
      <p>{movieList.release_date}</p>
      <p>{movieList.adult ? '18 +' : 'Under 18'}</p>
      <p>
        <span>{movieList.vote_average} P (</span>
        <span>{movieList.vote_count} people)</span>
      </p>
  </article>

  )
}

export default SlideCard
