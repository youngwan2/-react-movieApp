/* eslint-disable jsx-a11y/iframe-has-title */
import { useEffect, useState, useCallback } from "react";
import styles from "./Player.module.css";
import { API_KEY } from "../../pages/Home";
import { baseSet } from "../../slice/movieSlice";
import ReactPlayer from "react-player";

interface PlayerType {
  id: number;
  children: string;
  appear: boolean;
  setAppear: Function;
}

const Player = ({ id, appear, setAppear }: PlayerType) => {
  const [previewMovie, setPreviewMovie] = useState();

  // 예고편 영상을 읽어온다.
  const getPreviewMovie = useCallback(() => {
    baseSet
      .get(`/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((res) => {
        return setPreviewMovie(res.data.results[0].key);
      })
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    if (appear) {
      return getPreviewMovie();
    }
  }, [appear, getPreviewMovie]);

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
          setAppear(false);
        }}
        className={styles.layout}
      ></div>
    </article>
  );
};

export default Player;
