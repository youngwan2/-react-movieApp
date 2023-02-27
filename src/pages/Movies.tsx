import React from "react";
import styles from "./Movies.module.css";
import MoviesSide from "../components/movies/MovieSide";
import MoviesCard from "../components/movies/MoviesCard";
import TopShift from "../components/movies/TopShift";
import { useEffect, useState } from "react";

const Movies = () => {
  const [display, setDisplay] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 6000);
  }, []);

  const onScrollFunc = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScrollFunc);
    // return window.removeEventListener('scroll',onScrollFunc)
  }, []);
  
  return (
    <div className={styles.movies}>
      {display === true ? (
        <div className={styles.movies_disappear_box}>
          <div className={styles.box_content}>
            {" "}
            Thank you for visiting. Hope you have a good time!.
          </div>
        </div>
      ) : null}

      <div className={styles.movies_container}>
        <MoviesSide />
        <MoviesCard />
        {scrollY > 50 ? <TopShift /> : null}
      </div>
    </div>
  );
};

export default Movies;
