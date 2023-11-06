/* eslint-disable multiline-ternary */
import { type ReactElement, type SyntheticEvent } from 'react'
import { type CastType, type CastListType } from './Cast.types'
import styles from './Cast.module.css'
import NotFind from './NotFind'

const Cast = ({ apiData }: CastType): ReactElement => {
  // 이미지 로드가 실패한 경우 보여줄 대체 이미지를 설정한다.
  const imageOnErrorHandler = (event: SyntheticEvent<HTMLImageElement>): void => {
    event.currentTarget.src = process.env.PUBLIC_URL + '/not-profile.png'
  }
  return (
    <section className={styles.cast}>
      {apiData.cast[0] !== undefined ? (
        apiData.cast.map((cast: CastListType) => {
          return (
            <section className={styles.cast_info} key={cast.name}>
              <img
                className={styles.cast_img}
                src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                alt="profile_img"
                onError={imageOnErrorHandler}
              ></img>
              <h4 className={styles.cast_name}>{cast.name}</h4>
              <p style={{ color: 'white' }}>{'(' + cast.character + ')'}</p>
            </section>
          )
        })
      ) : (
        <NotFind />
      )}
    </section>
  )
}

export default Cast
