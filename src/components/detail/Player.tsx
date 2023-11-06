import { useEffect, useState, useCallback, type ReactElement } from 'react'
import styles from './Player.module.css'
import { API_KEY } from '../../pages/HomePage'
import { baseSet } from '../../store/slice/movieSlice'
import ReactPlayer from 'react-player'

interface PlayerType {
  id: number
  children: string
  appear: boolean
  setAppear: (p: boolean) => void
}

const Player = ({ id, appear, setAppear }: PlayerType): ReactElement => {
  const [previewMovie, setPreviewMovie] = useState<any>()

  // 예고편 영상을 읽어온다.
  const getPreviewMovie = useCallback(() => {
    baseSet
      .get(`/3/movie/${id}/videos?api_key=${API_KEY}&language=ko-KR`)
      .then((res) => {
        console.log(res)
        setPreviewMovie(res.data.results[0].key)
      })
      .catch(console.error)
  }, [id])

  useEffect(() => {
    if (appear) {
      getPreviewMovie()
    }
  }, [appear, getPreviewMovie])

  return (
    <article className={styles.Player}>
      <ReactPlayer
        className={styles.preview_videos}
        controls
        type="movie"
        url={`http://www.youtube.com/watch?v=${previewMovie}`}
      ></ReactPlayer>
      <div
        onClick={() => {
          setAppear(false)
        }}
        className={styles.layout}
      ></div>
    </article>
  )
}

export default Player
