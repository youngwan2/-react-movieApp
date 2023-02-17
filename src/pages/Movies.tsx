import React from "react";
import styles from './Movies.module.css'
import MoviesSide from "../components/movies/MovieSide";
import MoviesCard from "../components/movies/MoviesCard"
import TopShift from "../components/movies/TopShift";
import { useEffect, useState } from "react";

const Movies = () => {
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 6000);
  }, []);
  return (
    <div className={styles.movies}>
      {display === true ? (
        <div className={styles.movies_disappear_box}>
          <div className={styles.box_content}>
            {" "}
            방문해주셔서 감사합니다. 오늘도 좋은 하루 되세요.
          </div>
        </div>
      ) : null}

      <div className={styles.movies_container}>
        <MoviesSide />
        <MoviesCard />
        <TopShift />
      </div>
    </div>
  );
}

export default Movies;
