import { useEffect, useState } from "react";
import styles from "./Banner.module.css";
import { useAppSelector } from "../../app/hooks";

const Banner = () => {
  const { popularMovie } = useAppSelector((state:any) => {
    return state.movies.data;
  });

  // 스크롤 값 저장
  const [scrollY, setScrollY] = useState(100);

  // 스크롤 이벤트 실행 시 scrollY 저장 후 전달하는 함수
  const scrollEventFunc = () => {
    const scrollY =  (-window.scrollY) / 10 + 90;
    const copy =Number(scrollY.toFixed())
    if (scrollY <= 0) {
      return;
    } else setScrollY(copy);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollEventFunc);
  });

  return (
    <section style={{ opacity: `${scrollY}%` }} className={styles.banner}>
      {popularMovie && (
        <article id={styles.banner_main_outer_con} className={styles.img_con}>
          {/* 젤 좌측 배너 */}
          <div
            className={styles.banner_img}
            style={{
              zIndex: "2",
              transform: "scale(0.98)",
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
                zIndex: "3",
                transform: "scale(1.03)",
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
                transform: "scale(1.06)",
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
                zIndex: "3",
                transform: "scale(1.03)",
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
                zIndex: "2",
                transform: "scale(0.98)",
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
