import React from "react";
import styles from "./Banner.module.css";
import { useSelector } from "react-redux";

const Banner = () => {
  const { popularMovie } = useSelector((state: any) => {
    return state.movies.data;
  });

  return (
    <section className={styles.banner}>
      {popularMovie && (
        <article id={styles.main_outer_con} className={styles.img_con}>
          {/* 젤 좌측 배너 */}
          <div
            className={styles.banner_img}
            style={{
              transform: "scale(0.97)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${popularMovie.results[1].poster_path})`,
            }}
          ></div>
          {/* 2번째 배너 */}
          <div className={styles.img_con}>
            <div
              className={styles.banner_img}
              style={{
                transform: "scale(1.0)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${popularMovie.results[4].poster_path})`,
              }}
            ></div>
          </div>
          {/* 메인 배너(인기영화 1순위) */}
          <div className={styles.img_con}>
            <div
              className={styles.banner_img}
              style={{
                transform: "scale(1.01)",
                backgroundSize: "cover",
                width: "600px",
                zIndex: "20",
                backgroundPosition: "center",
                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${popularMovie.results[0].poster_path}`,
              }}
            ></div>
            <h1 className={styles.banner_title}>
              {popularMovie.results[0].title}
            </h1>
            <p className={styles.banner_overview}>
              {popularMovie.results[0].overview}
            </p>
          </div>
          {/* 4넌째 영화 */}
          <div className={styles.img_con}>
            <div
              className={styles.banner_img}
              style={{
                transform: "scale(1.0)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${popularMovie.results[2].poster_path})`,
              }}
            ></div>
          </div>
          {/* 오른쪽 끝 마지막 영화 */}
          <div className={styles.img_con}>
            <div
              className={styles.banner_img}
              style={{
                transform: "scale(0.97)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${popularMovie.results[3].poster_path})`,
              }}
            ></div>
          </div>
        </article>
      )}
    </section>
  );
};

export default Banner;
