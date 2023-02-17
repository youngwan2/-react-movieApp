import React, { useState } from "react";
import styles from "./Player.module.css";
import { API_KEY } from "../../pages/Home";
import { baseSet } from "../../slice/MovieSlice";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons";

interface PlayerType {
  id: number;
  children: string;
}

const Player: React.FC<PlayerType> = ({ id }) => {
  const [previewMovie, setPreviewMovie] = useState();
  const [playerState, setPlayerState] = useState(false);
  const getPreviewMovie = () => {
    baseSet
      .get(`/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((res) => {
        return setPreviewMovie(res.data.results[0].key);
      });
  };

  return (
    <div className={styles.Player}>
      <div
        className={styles.play_btn}
        onClick={() => {
          getPreviewMovie();
          setPlayerState(playerState === true ? false : true);
        }}
      >
        <FontAwesomeIcon icon={faVideoCamera}></FontAwesomeIcon>
      </div>
      {playerState === true ? (
        <div>
          <ReactPlayer
            className={styles.preview_videos}
            controls
            type="movie"
            url={`http://www.youtube.com/watch?v=${previewMovie}`}
          ></ReactPlayer>
        </div>
      ) : null}

      {playerState === true ? (
        <div
          id={styles.play_movie_layout}
          onClick={() => {
            setPlayerState(false);
          }}
        ></div>
      ) : null}
    </div>
  );
};

export default Player;
