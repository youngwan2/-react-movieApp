import React from "react";
import styles from './Banner.module.css'
import { useSelector } from "react-redux";

const Banner = () => {
  const { popularMovie } = useSelector((state: any) => {
    
    return state.movies.data;
  });

  return (
    <div className={styles.banner}>
      {popularMovie && (
        <div className={styles.img_con}>
          <div
            className={styles.banner_img}
            style={{
              transform: "scale(0.97)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage:
                "url(" +
                `https://image.tmdb.org/t/p/w500/${popularMovie.results[1].poster_path}` +
                ")",
            }}
          ></div>

          <div className={styles.img_con}>
            <div
              className={styles.banner_img}
              style={{
                transform: "scale(1.0)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage:
                  "url(" +
                  `https://image.tmdb.org/t/p/w500/${popularMovie.results[4].poster_path}` +
                  ")",
              }}
            ></div>
          </div>

          <div className={styles.img_con}>
            <div
              className={styles.banner_img}
              style={{
                transform: "scale(1.01)",
                backgroundSize: "cover",
                width: "600px",
                zIndex: "20",
                backgroundPosition: "center",
                backgroundImage:
                  "url(" +
                  `https://image.tmdb.org/t/p/w500/${popularMovie.results[0].poster_path}` +
                  ")",
              }}
            ></div>
            <h1 className={styles.banner_title}>{popularMovie.results[0].title}</h1>
            <p className={styles.banner_overview}>
              {popularMovie.results[0].overview}
            </p>
          </div>
          <div className={styles.img_con}>
            <div
              className={styles.banner_img}
              style={{
                transform: "scale(1.0)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage:
                  "url(" +
                  `https://image.tmdb.org/t/p/w500/${popularMovie.results[2].poster_path}` +
                  ")",
              }}
            ></div>
          </div>

          <div className={styles.img_con}>
            <div
              className={styles.banner_img}
              style={{
                transform: "scale(0.97)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage:
                  "url(" +
                  `https://image.tmdb.org/t/p/w500/${popularMovie.results[3].poster_path}` +
                  ")",
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
