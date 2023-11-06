import { useState, type ReactElement, type SyntheticEvent } from 'react'
import styles from './DetailContents.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonRunning, faCalendar, faP, faVideoCamera } from '@fortawesome/free-solid-svg-icons'

import Player from './Player'

interface PropsType {
  detailInfo: any
  id?: string
}

const DetailContents = ({ detailInfo, id }: PropsType): ReactElement => {
  // 포스터 이미지가 존재하지 않는 경우 해당 에러를 대체하는 이미지를 타겟의 src 주소로 설정
  const imageOnErrorHandler = (e: SyntheticEvent<HTMLImageElement>): void => {
    e.currentTarget.src = process.env.PUBLIC_URL + '/not_find_img.png'
  }

  const [videoAppear, setVideoAppear] = useState(false)
  return (
    <article
          className={styles.detail}
          style={{
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: `url(https://image.tmdb.org/t/p/w300${detailInfo?.backdrop_path})`
          }}
        >
          <figure className={styles.detail_preview_video}>
            <img
              className={styles.detail_img}
              alt={`${detailInfo.title}의 미리보기 포스터 이미지`}
              width={400}
              height={500}
              src={`https://image.tmdb.org/t/p/w300${detailInfo.poster_path}`}
              onError={imageOnErrorHandler}
            ></img>
          </figure>
          <section className={styles.detail_contents}>
            <h2 className={styles.detail_title}>{detailInfo.title}</h2>
            <button
              onClick={() => {
                setVideoAppear(true)
              }}
              className={styles.video_icon}
            >
              <FontAwesomeIcon icon={faVideoCamera}></FontAwesomeIcon>
            </button>
            <p>
              <FontAwesomeIcon className="calendar" icon={faCalendar} />{' '}
              {detailInfo.release_date}
            </p>
            {/* 장르 */}
            {detailInfo.genres !== undefined
              ? detailInfo.genres.map(
                (data: { id: number, name: string }) => {
                  return (
                      <span key={data.id} className={styles.detail_genres}>
                        {data.name}
                      </span>
                  )
                }
              )
              : null}
            {/* 상영 시간 */}
            <p className={styles.detail_runtime}>
              <FontAwesomeIcon
                className={'person_running'}
                icon={faPersonRunning}
              />
              {detailInfo.runtime} min
            </p>
            {/* 관객 평점 */}
            <p className={styles.detail_vote_average}>
              <FontAwesomeIcon className="point" icon={faP}></FontAwesomeIcon>
              {Math.ceil(detailInfo.vote_average * 10)} points
            </p>
            <p className={styles.detail_overview}>
              {detailInfo.overview !== undefined ? detailInfo.overview : 1 }
            </p>
          </section>
          {videoAppear
            ? (
            <Player
              id={Number(id)}
              setAppear={setVideoAppear}
              appear={videoAppear}
            >
              {' '}
            </Player>
              )
            : null}
        </article>
  )
}
export default DetailContents
